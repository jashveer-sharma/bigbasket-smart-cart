import { useCart } from "../context/CartContext";
import { useToast } from "../components/ToastProvider";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, setQty, removeProduct, clearCart } = useCart();
  const { notify } = useToast();

  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  function handleRefund() {
    alert(
      "Instant Refund Demo 🟢\n\nRefunds are approved after delivery man + receiver verify items together.\nIf a valid refund is requested, money is transferred within 5 minutes."
    );
  }

  return (
    <div className="container" style={{ padding: "20px 0" }}>
      <div className="section-title">🛒 Your Cart</div>

      {items.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/" className="btn">
            Back to Home
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {items.map((it) => (
              <div key={it.id} className="cart-item">
                <img
                  src={it.image}
                  alt={it.name}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <div style={{ flex: 1, marginLeft: 10 }}>
                  <div style={{ fontWeight: 600 }}>{it.name}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{it.weight}</div>
                  <div style={{ fontSize: 13 }}>₹{it.price}</div>
                </div>
                <div className="qty">
                  <button onClick={() => setQty(it.id, Math.max(0, it.qty - 1))}>
                    -
                  </button>
                  <div>{it.qty}</div>
                  <button onClick={() => setQty(it.id, it.qty + 1)}>+</button>
                </div>
                <button
                  className="btn btn-light"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    removeProduct(it.id);
                    notify(`Removed ${it.name} ❌`, "error");
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="panel" style={{ marginTop: 20 }}>
            <div style={{ fontWeight: 600 }}>
              Total Items: {items.reduce((a, b) => a + b.qty, 0)}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>
              Total: ₹{total.toFixed(2)}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button className="btn" onClick={() => notify("Checkout coming soon!")}>
                Proceed to Checkout
              </button>
              <button
                className="btn btn-light"
                onClick={() => {
                  clearCart();
                  notify("Cart cleared ❌", "error");
                }}
              >
                Clear Cart
              </button>
              <button className="btn btn-accent" onClick={handleRefund}>
                Instant Refund Demo
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
