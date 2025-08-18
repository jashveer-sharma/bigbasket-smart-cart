import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/ToastProvider'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { notify } = useToast()

  function handlePlaceOrder() {
    if (!items.length) {
      notify("Your cart is empty ❌", "error")
      return
    }
    notify("Order placed successfully ✅")
    clearCart()
  }

  function handleRefund() {
    notify("Refund demo: Delivery agent + customer verify items. Instant refund within 5 mins if valid ✅")
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '18px 0' }}>
        <div className="section-title">Checkout</div>
        <div className="panel">
          <div>Your cart is empty 🛒</div>
          <Link to="/" className="btn" style={{ marginTop: 12 }}>
            Go Shopping →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '18px 0' }}>
      <div className="section-title">Checkout (demo)</div>

      <div className="panel">
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Order Summary</div>
        <ul>
          {items.map(it => (
            <li key={it.id}>
              {it.qty} × {it.name} — ₹{(it.qty * it.price).toFixed(0)}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 8, fontWeight: 800 }}>
          Total: ₹{total.toFixed(0)}
        </div>
        <div style={{ marginTop: 8, color: '#667' }}>
          Payment and delivery flows are mocked for hackathon demo.
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <button className="btn" onClick={handlePlaceOrder}>Place Order</button>
          <button className="btn btn-light" onClick={handleRefund}>Instant Refund Demo</button>
        </div>
      </div>
    </div>
  )
}
