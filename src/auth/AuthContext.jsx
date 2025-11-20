import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/init'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/init'

const AuthContext = createContext()
export function useAuth(){ return useContext(AuthContext) }

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if(u){
        try{
          const docRef = doc(db, 'users', u.uid)
          const snap = await getDoc(docRef)
          setProfile(snap.exists() ? snap.data() : null)
        }catch(e){
          console.error(e)
        }
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return ()=> unsub()
  },[])

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
