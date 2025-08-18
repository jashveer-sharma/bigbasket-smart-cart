import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { findProduct } from '../data/catalog'
import { useToast } from '../components/ToastProvider'

export default function AutoCart(){
  const [text, setText] = useState('Milk, Bread, Eggs, Tomato, Onion, Paneer Fresh 200g')
  const [result, setResult] = useState(null)
  const { addProduct } = useCart()
  const { notify } = useToast()

  function handleProcess(){
    const tokens = text.split(/\n|,/).map(t=>t.trim()).filter(Boolean)
    const added = []
    const notFound = []
    tokens.forEach(tok=> {
      const p = findProduct(tok)
      if(p){ addProduct(p, 1); added.push(p.name) }
      else notFound.push(tok)
    })
    setResult({added, notFound})
    notify(`AutoCart added ${added.length} items ✅`)
  }

  return (
    <div className="container" style={{padding:'18px 0'}}>
      <div className="section-title">AutoCart (paste your list)</div>
      <div className="panel">
        <textarea rows={6} style={{width:'100%', padding:12, border:'1px solid #e5e7eb', borderRadius:10}} value={text} onChange={e=>setText(e.target.value)} placeholder="Enter items separated by commas or new lines"/>
        <div style={{marginTop:10, display:'flex', gap:8}}>
          <button className="btn" onClick={handleProcess}>Add to Cart</button>
        </div>
      </div>
      {result && (
        <div className="row" style={{marginTop:16}}>
          <div className="panel" style={{flex:1}}>
            <div style={{fontWeight:800, marginBottom:8}}>Added</div>
            <ul>{result.added.map((n,i)=><li key={i}>✅ {n}</li>)}</ul>
          </div>
          <div className="panel" style={{flex:1}}>
            <div style={{fontWeight:800, marginBottom:8}}>Not Available</div>
            {result.notFound.length===0 ? <div>All available 🎉</div> : <ul>{result.notFound.map((n,i)=><li key={i}>❌ {n}</li>)}</ul>}
          </div>
        </div>
      )}
    </div>
  )
}