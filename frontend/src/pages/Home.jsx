import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { byCategory } from '../data/catalog'
import { useToast } from '../components/ToastProvider'

export default function Home(){
  const snacks = byCategory('snacks').slice(0,8)
  const fv = byCategory('fruits-vegetables').slice(0,8)
  const { notify } = useToast()

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <div className="row" style={{alignItems:'center', justifyContent:'space-between'}}>
            <div>
              <h1 style={{margin:'6px 0'}}>Fresh groceries, faster.</h1>
              <div className="cta">
                <Link 
                  className="btn" 
                  to="/autocart"
                  onClick={() => notify("Try AutoCart: paste your grocery list 🛒")}
                >
                  ✨ Try AutoCart
                </Link>
                <Link className="btn btn-outline" to="/recipes">🧑‍🍳 Recipe-to-Cart</Link>
                <Link className="btn btn-outline" to="/vending">🧃 Vending Machine</Link>
              </div>
              <div style={{marginTop:8, color:'#667'}}>
                Live now: our special features – AutoCart, Recipe-to-Cart, and Vending 🚀
              </div>
            </div>

            {/* Popular Categories */}
            <div className="panel">
              <div style={{fontWeight:800, marginBottom:8, color:'var(--green)'}}>
                Popular categories
              </div>
              <div className="row">
                {[
                  ['fruits-vegetables','Fruits & Vegetables'],
                  ['dairy','Dairy'],
                  ['snacks','Snacks'],
                  ['beverages','Beverages'],
                  ['staples','Staples'],
                  ['kitchen','Kitchen'],
                  ['personal-care','Personal Care'],
                  ['household','Household']
                ].map(([slug,label])=> (
                  <Link key={slug} to={`/category/${slug}`} className="pill">{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Sections */}
      <div className="container">
        <div className="section-title">Trending Snacks</div>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))'}}>
          {snacks.map(p=> <ProductCard key={p.id} p={p} />)}
        </div>

        <div className="section-title" style={{marginTop:18}}>Fresh Picks</div>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))'}}>
          {fv.map(p=> <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  )
}
