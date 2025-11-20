import React, { useEffect, useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/init'
import { useAuth } from '../auth/AuthContext'
import { getCategoriesOnce } from '../utils/categories'

export default function AddExpense(){
  const { user } = useAuth()
  const [amount,setAmount]=useState('')
  const [category,setCategory]=useState('')
  const [description,setDescription]=useState('')
  const [date,setDate]=useState(new Date().toISOString().slice(0,10))
  const [notes,setNotes]=useState('')
  const [categories,setCategories]=useState([])

  useEffect(()=>{
    getCategoriesOnce().then(arr=>{
      setCategories(arr)
      if(arr.length) setCategory(arr[0].name)
    })
  },[])

  async function submit(e){
    e.preventDefault()
    if(!user) return alert('Not authenticated')
    const payload = {
      userId: user.uid,
      groupId: null,
      amount: parseFloat(amount) || 0,
      category,
      description: description || null,
      date,
      notes,
      createdAt: serverTimestamp()
    }
    try{
      await addDoc(collection(db,'expenses'), payload)
      setAmount(''); setDescription(''); setNotes('')
      alert('Saved')
    }catch(e){
      console.error(e)
      alert('Failed to save')
    }
  }

  const currentDescriptions = categories.find(c=>c.name===category)?.descriptions || []

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3">Add Expense</h3>
      <form onSubmit={submit} className="grid grid-cols-1 gap-3">
        <div className="grid grid-cols-2 gap-3">
          <input className="p-2 border rounded" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
          <input type="date" className="p-2 border rounded" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <select className="p-2 border rounded" value={category} onChange={e=>setCategory(e.target.value)}>
            {categories.map(c=> <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <select className="p-2 border rounded" value={description} onChange={e=>setDescription(e.target.value)}>
            <option value="">-- (optional) description --</option>
            {currentDescriptions.map((d,i)=> <option key={i} value={d}>{d}</option>)}
          </select>
        </div>
        <input className="p-2 border rounded" placeholder="Notes (optional)" value={notes} onChange={e=>setNotes(e.target.value)} />
        <button className="bg-teal-500 text-white p-3 rounded font-medium">Save Expense</button>
      </form>
    </div>
  )
}
