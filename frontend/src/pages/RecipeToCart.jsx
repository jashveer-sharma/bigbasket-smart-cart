import { useState } from 'react'
import { ingredientsFor } from '../utils/recipes'
import { findProduct } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/ToastProvider'

export default function RecipeToCart() {
  const [recipe, setRecipe] = useState('Paneer Butter Masala')
  const [query, setQuery] = useState('Paneer Butter Masala')
  const { addProduct } = useCart()
  const { notify } = useToast()

  const list = ingredientsFor(query) || []
  const items = list.map(n => ({ name: n, product: findProduct(n) }))
  const available = items.filter(x => x.product)
  const unavailable = items.filter(x => !x.product)

  function handleFind() {
    if (!recipe.trim()) {
      notify("Please type a recipe name ❌")
      return
    }
    setQuery(recipe)
    notify(`Looking up ingredients for ${recipe} 🍳`)
  }

  function addAll() {
    if (available.length === 0) {
      notify("No ingredients available to add ❌")
      return
    }
    available.forEach(x => addProduct(x.product, 1))
    notify(`Added ${available.length} ingredients to cart ✅`)
  }

  return (
    <div className="container" style={{ padding: '18px 0' }}>
      <div className="section-title">🧑‍🍳 Recipe to Cart</div>

      {/* Input + Find button */}
      <div className="panel">
        <div className="row" style={{ alignItems: 'center' }}>
          <input
            value={recipe}
            onChange={e => setRecipe(e.target.value)}
            placeholder="Type a recipe e.g., Paneer Butter Masala"
            style={{
              flex: 1,
              padding: 10,
              border: '1px solid #e5e7eb',
              borderRadius: 10
            }}
          />
          <button className="btn" onClick={handleFind}>Find</button>
        </div>
      </div>

      {/* Results */}
      {list.length > 0 ? (
        <div className="row" style={{ marginTop: 16 }}>
          <div className="panel" style={{ flex: 1 }}>
            <div style={{ fontWeight: 800 }}>✅ Available</div>
            {available.length > 0 ? (
              <ul>
                {available.map((x, i) => (
                  <li key={i}>✅ {x.name}</li>
                ))}
              </ul>
            ) : (
              <div>No matches in catalog ❌</div>
            )}
          </div>

          <div className="panel" style={{ flex: 1 }}>
            <div style={{ fontWeight: 800 }}>❌ Not Available</div>
            {unavailable.length === 0 ? (
              <div>All available 🎉</div>
            ) : (
              <ul>
                {unavailable.map((x, i) => (
                  <li key={i}>❌ {x.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 16, color: '#667' }}>
          No recipe selected. Try <b>Paneer Butter Masala</b>, <b>Masala Chai</b>, or <b>Masala Dosa</b>.
        </div>
      )}

      {/* Add All */}
      {list.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={addAll}>
            Add All Available to Cart
          </button>
        </div>
      )}
    </div>
  )
}
