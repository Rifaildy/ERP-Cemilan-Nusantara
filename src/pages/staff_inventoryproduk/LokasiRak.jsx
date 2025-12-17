"use client"

import { useState } from "react"
import { lokasiRak, produkJadi } from "../../data/inventory-produk"
import DashboardLayout from "../../components/DashboardLayout"
import { LayoutDashboard, Package, TruckIcon, AlertTriangle, Archive } from "lucide-react"

export default function LokasiRak({ setCurrentPage, currentPage }) {
  const [filterZona, setFilterZona] = useState("Semua")

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
    { icon: Package, label: "Stok Barang Jadi", page: "stok-produk" },
    { icon: TruckIcon, label: "Pengeluaran Barang", page: "pengeluaran-produk" },
    { icon: Archive, label: "Manajemen Lokasi Rak", page: "lokasi-rak" },
    { icon: AlertTriangle, label: "Produk Kedaluwarsa", page: "peringatan-kedaluwarsa" },
  ]

  const filteredLokasi = lokasiRak.filter((lok) => {
    if (filterZona === "Semua") return true
    return lok.zona === filterZona
  })

  const zonaList = ["Semua", ...new Set(lokasiRak.map((l) => l.zona))]

  // Group by zona
  const lokasiByZona = zonaList.slice(1).map((zona) => {
    const raks = lokasiRak.filter((l) => l.zona === zona)
    const totalKapasitas = raks.reduce((sum, r) => sum + r.kapasitas, 0)
    const totalTerisi = raks.reduce((sum, r) => sum + r.terisi, 0)
    const utilisasi = ((totalTerisi / totalKapasitas) * 100).toFixed(1)

    return {
      zona,
      raks,
      totalKapasitas,
      totalTerisi,
      utilisasi,
    }
  })

  return (
    <DashboardLayout menuItems={menuItems} currentPage={currentPage} setCurrentPage={setCurrentPage}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Lokasi Rak (Bin Location)</h1>
          <p className="mt-2 text-gray-600">Kelola lokasi penyimpanan produk jadi di gudang</p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter Zona:</label>
            <div className="flex space-x-2">
              {zonaList.map((zona) => (
                <button
                  key={zona}
                  onClick={() => setFilterZona(zona)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filterZona === zona ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Zona {zona}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Zona Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lokasiByZona.map((zona) => (
            <div key={zona.zona} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Zona {zona.zona}</h3>
                  <p className="text-sm text-gray-600">{zona.raks.length} lokasi rak</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-600">{zona.utilisasi}%</div>
                  <div className="text-xs text-gray-500">Utilisasi</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kapasitas:</span>
                  <span className="font-semibold text-gray-900">{zona.totalKapasitas} pcs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Terisi:</span>
                  <span className="font-semibold text-blue-600">{zona.totalTerisi} pcs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kosong:</span>
                  <span className="font-semibold text-green-600">{zona.totalKapasitas - zona.totalTerisi} pcs</span>
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${zona.utilisasi}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Lokasi Rak */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Detail Lokasi Rak</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lokasi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zona</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produk</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Terisi</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Kapasitas</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Utilisasi</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLokasi.map((lok) => {
                  const produk = produkJadi.find((p) => p.id === lok.produkId)
                  const utilisasi = ((lok.terisi / lok.kapasitas) * 100).toFixed(1)
                  const isEmpty = lok.terisi === 0

                  return (
                    <tr key={lok.id} className={isEmpty ? "bg-green-50" : "bg-white"}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{lok.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          Zona {lok.zona}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {produk ? (
                          <div>
                            <div className="font-medium text-gray-900">{produk.nama}</div>
                            <div className="text-xs text-gray-500">{produk.id}</div>
                          </div>
                        ) : (
                          <span className="text-green-600 font-medium">Kosong</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-blue-600">
                        {lok.terisi}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                        {lok.kapasitas}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-lg font-bold text-gray-900">{utilisasi}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div
                            className={`h-1 rounded-full ${
                              utilisasi >= 90 ? "bg-red-500" : utilisasi >= 70 ? "bg-yellow-500" : "bg-green-500"
                            }`}
                            style={{ width: `${utilisasi}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isEmpty
                              ? "bg-green-100 text-green-800"
                              : utilisasi >= 90
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {isEmpty ? "Tersedia" : utilisasi >= 90 ? "Penuh" : "Terisi"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-orange-600 hover:text-orange-900 font-medium">Kelola</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Total Lokasi</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{lokasiRak.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Lokasi Terisi</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">{lokasiRak.filter((l) => l.terisi > 0).length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Lokasi Kosong</div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              {lokasiRak.filter((l) => l.terisi === 0).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Utilisasi Total</div>
            <div className="mt-2 text-3xl font-bold text-orange-600">
              {(
                (lokasiRak.reduce((sum, l) => sum + l.terisi, 0) / lokasiRak.reduce((sum, l) => sum + l.kapasitas, 0)) *
                100
              ).toFixed(1)}
              %
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
