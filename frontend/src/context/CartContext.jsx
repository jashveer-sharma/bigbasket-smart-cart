import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import catalog, { findProduct, findProductsByQuery } from '../data/catalog'

const CartContext = createContext()

export function CartProvider({children}){
  const [items, setItems] = useState(() => {
    const s = localStorage.getItem('cart-items')
    return s ? JSON.parse(s) : []
  })

  useEffect(()=>{
    localStorage.setItem('cart-items', JSON.stringify(items))
  }, [items])

  const total = useMemo(()=>{
    return items.reduce((sum, it)=> sum + it.price * it.qty, 0)
  }, [items])

  const count = useMemo(()=>items.reduce((c, it)=> c + it.qty, 0), [items])

  function addProduct(product, qty=1){
    setItems(prev => {
      const i = prev.findIndex(p=>p.id===product.id)
      if(i>=0){
        const copy=[...prev]; copy[i]={...copy[i], qty: copy[i].qty + qty}
        return copy
      }
      return [...prev, {...product, qty}]
    })
  }

  function addByName(name, qty=1){
    const p = findProduct(name)
    if(p) addProduct(p, qty)
    return !!p
  }

  function remove(id){
    setItems(prev => prev.filter(p=>p.id!==id))
  }

  function setQty(id, qty){
    setItems(prev=> prev.map(p=> p.id===id ? {...p, qty: Math.max(0, qty)} : p).filter(p=>p.qty>0))
  }

  function clear(){ setItems([]) }

  function search(query){
    return findProductsByQuery(query)
  }

  return <CartContext.Provider value={{items, addProduct, addByName, remove, setQty, clear, total, count, search}}>
    {children}
  </CartContext.Provider>
}

export function useCart(){ return useContext(CartContext) }