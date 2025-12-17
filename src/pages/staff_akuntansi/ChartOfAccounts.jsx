"use client"

import { useState } from "react"
import { chartOfAccounts } from "../../data/akuntansi"

export default function ChartOfAccounts() {
  const [accounts, setAccounts] = useState(chartOfAccounts)
  const [filterKategori, setFilterKategori] = useState("All")
  const [showModal, setShowModal] = useState(false)

  const categories = ["All", ...new Set(accounts.map((a) => a.kategori))]
  const filteredAccounts = filterKategori === "All" ? accounts : accounts.filter((a) => a.kategori === filterKategori)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Chart of Accounts (COA)</h1>
          <p className="text-gray-600">Master akun untuk penjurnalan otomatis</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <span>+</span>
          Tambah Akun
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-blue-700 text-sm mb-1">Total Aset</div>
          <div className="text-2xl font-bold text-blue-600">
            Rp{" "}
            {accounts
              .filter((a) => a.kode.startsWith("1-"))
              .reduce((sum, a) => sum + a.saldo, 0)
              .toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-700 text-sm mb-1">Total Liabilitas</div>
          <div className="text-2xl font-bold text-red-600">
            Rp{" "}
            {Math.abs(
              accounts.filter((a) => a.kode.startsWith("2-")).reduce((sum, a) => sum + a.saldo, 0),
            ).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-green-700 text-sm mb-1">Total Ekuitas</div>
          <div className="text-2xl font-bold text-green-600">
            Rp{" "}
            {Math.abs(
              accounts.filter((a) => a.kode.startsWith("3-")).reduce((sum, a) => sum + a.saldo, 0),
            ).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-purple-700 text-sm mb-1">Total Akun</div>
          <div className="text-2xl font-bold text-purple-600">{accounts.length}</div>
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
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Kode Akun</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nama Akun</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Kategori</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tipe</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Saldo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAccounts.map((account) => (
              <tr key={account.kode} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{account.kode}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{account.nama}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{account.kategori}</span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      account.tipe === "Debit" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {account.tipe}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  Rp {Math.abs(account.saldo).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Edit</button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Ledger</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl">ℹ️</span>
          <div className="text-sm text-blue-800">
            <strong>Chart of Accounts (COA)</strong> adalah master data akun yang digunakan untuk penjurnalan otomatis.
            Setiap transaksi dari modul lain akan otomatis dijurnal ke akun-akun ini.
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Tambah Akun Baru</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Akun</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="1-1004"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Akun</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Aset Lancar</option>
                  <option>Aset Tetap</option>
                  <option>Liabilitas Jangka Pendek</option>
                  <option>Liabilitas Jangka Panjang</option>
                  <option>Ekuitas</option>
                  <option>Pendapatan</option>
                  <option>HPP</option>
                  <option>Beban Operasional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Normal</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Debit</option>
                  <option>Kredit</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg">
                  Batal
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Simpan Akun
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
