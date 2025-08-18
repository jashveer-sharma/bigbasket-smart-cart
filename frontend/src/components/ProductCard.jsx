import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useToast } from './ToastProvider'

export default function ProductCard({ p }) {
  const { addProduct, setQty, items } = useCart()
  const { notify } = useToast()
  const found = items.find(it => it.id === p.id)
  const [qty, setLocalQty] = useState(found?.qty || 0)

  // 🔗 Backend URL (update if different)
  const API_BASE = "http://localhost:5000/api/cart"

  async function syncWithBackend(productId, newQty) {
    try {
      await fetch(`${API_BASE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, qty: newQty })
      })
    } catch (err) {
      console.error("Failed to sync cart with backend", err)
      notify("⚠️ Could not sync with server. Using local cart.")
    }
  }

  function add() {
    addProduct(p, 1)
    setLocalQty(qty + 1)
    syncWithBackend(p.id, qty + 1)
    notify(`Added ${p.name} to cart ✅`)
  }

  function inc() {
    const newQty = (found?.qty || 0) + 1
    setQty(p.id, newQty)
    setLocalQty(newQty)
    syncWithBackend(p.id, newQty)
  }

  function dec() {
    const newQty = Math.max(0, (found?.qty || 0) - 1)
    setQty(p.id, newQty)
    setLocalQty(newQty)
    syncWithBackend(p.id, newQty)
  }

  return (
    <div className="card product-card">
      <img className="product-img" src={p.image} alt={p.name} />
      <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
      <div style={{ color: '#667', fontSize: 12 }}>{p.weight}</div>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="price">₹{p.price}</div>
        {qty > 0 ? (
          <div className="qty">
            <button onClick={dec}>-</button>
            <div>{qty}</div>
            <button onClick={inc}>+</button>
          </div>
        ) : (
          <button className="btn" onClick={add}>Add</button>
        )}
      </div>
    </div>
  )
}
