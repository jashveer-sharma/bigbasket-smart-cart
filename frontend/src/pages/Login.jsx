import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/ToastProvider'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [name, setName] = useState('John Doe')
  const [phone, setPhone] = useState('9999999999')
  const [address, setAddress] = useState('Bangalore, India')
  const { login } = useAuth()
  const { notify } = useToast()
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    login({name, phone, address})
    notify('Logged in ✅')
    navigate('/profile')
  }

  return (
    <div className="container" style={{padding:'18px 0'}}>
      <div className="section-title">Login</div>
      <form className="panel" onSubmit={handleSubmit}>
        <div className="row">
          <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Name" style={{flex:1, padding:10, border:'1px solid #e5e7eb', borderRadius:10}}/>
          <input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" style={{flex:1, padding:10, border:'1px solid #e5e7eb', borderRadius:10}}/>
        </div>
        <textarea required value={address} onChange={e=>setAddress(e.target.value)} placeholder="Address" rows={3} style={{marginTop:8, width:'100%', padding:10, border:'1px solid #e5e7eb', borderRadius:10}}/>
        <div style={{marginTop:10}}><button className="btn">Continue</button></div>
      </form>
    </div>
  )
}