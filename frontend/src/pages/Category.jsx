import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { fetchProducts, searchProducts } from '../api'
import { useToast } from '../components/ToastProvider'

export default function Category() {
  const { slug } = useParams()
  const [sp] = useSearchParams()
  const query = sp.get('q')
  const { notify } = useToast()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        let data
        if (slug === 'search') {
          data = await searchProducts(query)
        } else {
          const all = await fetchProducts()
          data = all.filter(p => p.category === slug)
        }
        setItems(data)
      } catch (err) {
        notify("Failed to load products ❌", "error")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug, query])

  return (
    <div className="container" style={{ padding: '18px 0' }}>
      <div className="section-title">
        {slug === 'search'
          ? `Search results for "${query}"`
          : slug.replace('-', ' ').replace('-', ' ')}
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : items.length === 0 ? (
        <div>No items found.</div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))' }}>
          {items.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  )
}
