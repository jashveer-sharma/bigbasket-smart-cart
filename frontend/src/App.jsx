import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Category from './pages/Category'
import AutoCart from './pages/AutoCart'
import RecipeToCart from './pages/RecipeToCart'
import VendingMachine from './pages/VendingMachine'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Profile from './pages/Profile'
import BackToTop from "./components/BackToTop"

function NotFound() {
  return (
    <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p>Oops! This page doesn’t exist.</p>
      <a href="/" className="btn" style={{ marginTop: 12 }}>
        ⬅ Back to Home
      </a>
    </div>
  )
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/autocart" element={<AutoCart />} />
          <Route path="/recipes" element={<RecipeToCart />} />
          <Route path="/vending" element={<VendingMachine />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          {/* Fallback for unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
       <BackToTop /> 
    </div>
  )
}
