import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({children}){
  const [user, setUser] = useState(()=>{
    const s = localStorage.getItem('bb-user')
    return s ? JSON.parse(s) : null
  })

  useEffect(()=>{
    if(user) localStorage.setItem('bb-user', JSON.stringify(user))
    else localStorage.removeItem('bb-user')
  }, [user])

  function login(payload){ setUser(payload) }
  function logout(){ setUser(null) }

  return <AuthContext.Provider value={{user, login, logout}}>
    {children}
  </AuthContext.Provider>
}

export function useAuth(){ return useContext(AuthContext) }