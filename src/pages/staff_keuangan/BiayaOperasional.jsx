"use client"

import { useState } from "react"
import { biayaOperasional } from "../../data/keuangan"

export default function BiayaOperasional() {
  const [expenses, setExpenses] = useState(biayaOperasional)
  const [filterKategori, setFilterKategori] = useState("All")
  const [showModal, setShowModal] = useState(false)

  const filteredExpenses = filterKategori === "All" ? expenses : expenses.filter((e) => e.kategori === filterKategori)

  const categories = ["All", ...new Set(expenses.map((e) => e.kategori))]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Biaya Operasional</h1>
          <p className="text-gray-600">Pencatatan dan monitoring biaya operasional perusahaan</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <span>+</span>
          Catat Biaya
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Biaya</div>
          <div className="text-2xl font-bold text-gray-800">
            Rp {expenses.reduce((sum, e) => sum + e.jumlah, 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Gaji & Upah</div>
          <div className="text-2xl font-bold text-blue-600">
            Rp{" "}
            {expenses
              .filter((e) => e.kategori === "Gaji & Upah")
              .reduce((sum, e) => sum + e.jumlah, 0)
              .toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Utilitas</div>
          <div className="text-2xl font-bold text-yellow-600">
            Rp{" "}
            {expenses
              .filter((e) => e.kategori === "Utilitas")
              .reduce((sum, e) => sum + e.jumlah, 0)
              .toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Items</div>
          <div className="text-2xl font-bold text-purple-600">{expenses.length}</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Breakdown per Kategori</h3>
        <div className="grid grid-cols-3 gap-4">
          {categories
            .filter((cat) => cat !== "All")
            .map((kategori) => {
              const total = expenses.filter((e) => e.kategori === kategori).reduce((sum, e) => sum + e.jumlah, 0)
              const percentage = ((total / expenses.reduce((sum, e) => sum + e.jumlah, 0)) * 100).toFixed(1)

              return (
                <div key={kategori} className="border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-600 text-sm mb-1">{kategori}</div>
                  <div className="text-xl font-bold text-gray-900 mb-2">Rp {total.toLocaleString("id-ID")}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 rounded-full h-2" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{percentage}%</span>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterKategori(cat)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterKategori === cat ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Kategori</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Deskripsi</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Departemen</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Jumlah</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{expense.id}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{expense.tanggal}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{expense.kategori}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{expense.deskripsi}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{expense.departemen}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  Rp {expense.jumlah.toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      expense.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {expense.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Catat Biaya Operasional</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Biaya</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Gaji & Upah</option>
                  <option>Utilitas</option>
                  <option>Logistik</option>
                  <option>Pemeliharaan</option>
                  <option>Marketing</option>
                  <option>Administrasi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departemen</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Produksi</option>
                  <option>Penjualan</option>
                  <option>Admin</option>
                  <option>Semua</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Biaya</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-sm text-blue-800">
                  <strong>Auto Journal:</strong> Biaya operasional akan otomatis dijurnal ke akun beban yang sesuai.
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg">
                  Batal
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Simpan Biaya
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
