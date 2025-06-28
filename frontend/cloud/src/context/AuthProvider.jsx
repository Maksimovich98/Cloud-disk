// Здесь — только React-компонент
import React, { useState, useEffect } from 'react'
import { onAuthStateChanged }          from 'firebase/auth'
import { auth }                        from '../firebase'
import AuthContext                     from './AuthContext'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}
