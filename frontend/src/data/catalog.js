// frontend/src/data/catalog.js

const catalog = [
  {
    id: 1,
    name: "Apple",
    category: "fruits-vegetables",
    weight: "1kg",
    price: 120,
    image: "https://via.placeholder.com/150?text=Apple"
  },
  {
    id: 2,
    name: "Milk",
    category: "dairy",
    weight: "1L",
    price: 60,
    image: "https://via.placeholder.com/150?text=Milk"
  },
  {
    id: 3,
    name: "Chips",
    category: "snacks",
    weight: "100g",
    price: 30,
    image: "https://via.placeholder.com/150?text=Chips"
  },
  {
    id: 4,
    name: "Cola",
    category: "beverages",
    weight: "500ml",
    price: 40,
    image: "https://via.placeholder.com/150?text=Cola"
  },
]

// 🔎 helpers
export function byCategory(slug) {
  return catalog.filter(p => p.category === slug)
}

export function findProduct(name) {
  if (!name) return null
  const lower = name.toLowerCase()
  return catalog.find(p => p.name.toLowerCase().includes(lower))
}

export function findProductsByQuery(query) {
  if (!query) return []
  const lower = query.toLowerCase()
  return catalog.filter(p =>
    p.name.toLowerCase().includes(lower) ||
    p.category.toLowerCase().includes(lower)
  )
}

export default catalog
