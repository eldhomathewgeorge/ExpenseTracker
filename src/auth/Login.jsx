import React, { useState } from 'react'
import { signInWithGoogle } from '../firebase/init'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()

  async function handleGoogle(){
    setError(''); setLoading(true)
    try{
      await signInWithGoogle()
      nav('/')
    }catch(e){
      console.error(e)
      setError(e.message || 'Google sign-in failed')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
      {error && <div className="bg-red-50 text-red-700 p-2 rounded mb-3">{error}</div>}
      <button onClick={handleGoogle} className="w-full bg-blue-600 text-white p-3 rounded font-medium">
        Continue with Google
      </button>
      <p className="mt-3 text-sm text-gray-600">You will be signed in with your Google account.</p>
    </div>
  )
}
