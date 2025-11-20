import React, { useEffect, useState } from 'react'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/init'
import { useAuth } from '../auth/AuthContext'
import { exportToCSV } from '../utils/csvExport'

export default function ExpenseList(){
  const { user } = useAuth()
  const [expenses, setExpenses] = useState([])

  useEffect(()=>{
    if(!user) return
    const q = query(collection(db,'expenses'), where('userId','==', user.uid), orderBy('date','desc'))
    const unsub = onSnapshot(q, snap=>{
      const arr = []
      snap.forEach(doc=> arr.push({id: doc.id, ...doc.data()}))
      setExpenses(arr)
    })
    return ()=> unsub()
  },[user])

  function downloadCSV(){
    const data = expenses.map(e=>({
      Date: e.date,
      Category: e.category,
      Description: e.description || '',
      Amount: e.amount,
      Notes: e.notes || ''
    }))
    exportToCSV(data, `expenses-${new Date().toISOString().slice(0,10)}.csv`)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">My Expenses</h3>
        <div className="flex items-center gap-2">
          <button onClick={downloadCSV} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded">Export CSV</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left border-b">
            <tr><th className="py-2">Date</th><th>Category</th><th>Description</th><th className="text-right">Amount</th></tr>
          </thead>
          <tbody>
            {expenses.map(e=>(
              <tr key={e.id} className="odd:bg-gray-50">
                <td className="py-2">{e.date}</td>
                <td>{e.category}</td>
                <td>{e.description || '-'}</td>
                <td className="text-right font-medium">{e.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
