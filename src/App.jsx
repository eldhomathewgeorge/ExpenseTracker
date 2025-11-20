import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import PrivateRoute from './auth/PrivateRoute'
import Login from './auth/Login'
import Dashboard from './pages/Dashboard'
import AnalysisPage from './pages/AnalysisPage'
import CategoryManager from './pages/CategoryManager'

function Header(){
  return (
    <header className="bg-white/80 sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">FT</div>
          <h1 className="text-xl font-semibold">Expense Tracker</h1>
        </div>
        <nav className="space-x-4 text-sm hidden md:block">
          <a href="/" className="hover:underline">Home</a>
          <a href="/analysis" className="hover:underline">Analysis</a>
          <a href="/categories" className="hover:underline">Categories</a>
        </nav>
      </div>
    </header>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            } />
            <Route path="/analysis" element={
              <PrivateRoute>
                <AnalysisPage/>
              </PrivateRoute>
            } />
            <Route path="/categories" element={
              <PrivateRoute>
                <CategoryManager/>
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}
