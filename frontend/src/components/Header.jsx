import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Header(){
  const {count, search} = useCart()
  const {user} = useAuth()
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  function onSearch(e){
    e.preventDefault()
    if(!q.trim()) return
    navigate(`/category/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header>
      <div className="container header-top">
        <Link to="/" className="logo">bigbasket</Link>
        <form className="search" onSubmit={onSearch}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search for fruits, veggies and more..." />
          <button className="btn">Search</button>
        </form>
        <nav className="nav">
          {/* ✅ Added Home tab */}
          <Link to="/" className={`pill ${location.pathname === "/" ? "active" : ""}`}>🏠 Home</Link>

          <Link to="/autocart" className="pill">✨ AutoCart</Link>
          <Link to="/recipes" className="pill">🧑‍🍳 Recipes</Link>
          <Link to="/vending" className="pill">🧃 Vending</Link>
          <Link to="/cart" className="icon-btn">🛒 Cart <span className="count">{count}</span></Link>
          {user 
            ? <Link to="/profile" className="icon-btn">👤 {user.name.split(' ')[0]}</Link> 
            : <Link to="/login" className="icon-btn">🔑 Login</Link>
          }
        </nav>
      </div>
      <div className="container" style={{padding:'8px 0 12px'}}>
        <div className="row">
          {['fruits-vegetables','dairy','snacks','beverages','staples','kitchen','personal-care','household'].map(slug=> (
            <Link key={slug} to={`/category/${slug}`} className="category-chip">
              {slug.replace('-',' ').replace('-',' ')}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
