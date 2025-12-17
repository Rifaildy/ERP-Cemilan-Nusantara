"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Factory, Package, Wallet } from "lucide-react"

const LoginPage = () => {
  const { login, loading, error } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(username, password)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Bagian Kiri: Branding */}
        <div className="md:w-1/2 bg-gradient-to-br from-primary-500 to-primary-700 p-8 flex flex-col justify-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">Cemilan Nusantara</h1>
            <p className="text-primary-100 text-lg mb-6">Sistem Informasi ERP</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <Factory className="w-6 h-6 text-secondary-500" />
                <span>Manajemen Produksi Real-time</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <Package className="w-6 h-6 text-secondary-500" />
                <span>Inventory FIFO System</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <Wallet className="w-6 h-6 text-secondary-500" />
                <span>Keuangan & Akuntansi Otomatis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="md:w-1/2 p-8 md:p-12 bg-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-corporate-900">Selamat Datang</h2>
            <p className="text-gray-500">Silakan masuk untuk mengakses sistem</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg shadow-primary-500/30 flex justify-center items-center"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Masuk ke Sistem"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
            &copy; 2025 CV. Cemilan Nusantara IT Division
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
