import { useState } from 'react'
import { byCategory } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/ToastProvider'

export default function VendingMachine() {
  const snacks = byCategory('snacks').slice(0, 10)
  const beverages = byCategory('beverages').slice(0, 10)
  const items = [...snacks, ...beverages]
  const { addProduct } = useCart()
  const { notify } = useToast()

  const [last, setLast] = useState(null)

  function pick(p) {
    addProduct(p, 1)
    notify(`🧃 ${p.name} dispensed (added to cart)`)
    setLast(p)
  }

  function surpriseMe() {
    const random = items[Math.floor(Math.random() * items.length)]
    pick(random)
  }

  return (
    <div className="container" style={{ padding: '18px 0' }}>
      <div className="section-title">Vending Machine</div>
      <div className="vending-wrap">
        <div className="slots">
          {items.map(p => (
            <div
              key={p.id}
              className="slot"
              onClick={() => pick(p)}
              style={{ cursor: 'pointer' }}
            >
              <img src={p.image} alt={p.name} />
              <div style={{ fontSize: 12, marginTop: 6 }}>{p.name}</div>
              <div style={{ fontWeight: 800 }}>₹{p.price}</div>
            </div>
          ))}
        </div>
        <div className="glass"></div>
      </div>

      <div style={{ marginTop: 10, color: '#667' }}>
        Tap a slot to add to cart. Looks and feels like a real machine (glass overlay, grid slots).
      </div>

      {/* 🎲 Surprise Me button */}
      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={surpriseMe}>🎲 Surprise Me</button>
      </div>

      {/* ✅ Last dispensed */}
      {last && (
        <div style={{ marginTop: 12, fontWeight: 700 }}>
          Last dispensed: {last.name} ✅
        </div>
      )}
    </div>
  )
}
