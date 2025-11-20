import React from 'react'
import AddExpense from '../expenses/AddExpense'
import ExpenseList from '../expenses/ExpenseList'
import { auth, logout } from '../firebase/init'
import { useAuth } from '../auth/AuthContext'

export default function Dashboard(){
  const { user } = useAuth()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Welcome{user?.displayName ? `, ${user.displayName}` : ''}</h2>
          <div className="text-sm text-gray-600">{user?.email}</div>
        </div>
        <div>
          <button className="px-3 py-2 bg-gray-100 rounded" onClick={()=>logout()}>Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AddExpense/>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <ExpenseList/>
        </div>
      </div>
    </div>
  )
}
