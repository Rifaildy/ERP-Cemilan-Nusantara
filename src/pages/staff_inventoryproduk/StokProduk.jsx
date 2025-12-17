"use client"

import { useState } from "react"
import { produkJadi, stokProdukJadi } from "../../data/inventory-produk"
import DashboardLayout from "../../components/DashboardLayout"
import { LayoutDashboard, Package, TruckIcon, AlertTriangle, Archive } from "lucide-react"

export default function StokProduk({ setCurrentPage, currentPage }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterKategori, setFilterKategori] = useState("Semua")

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
    { icon: Package, label: "Stok Barang Jadi", page: "stok-produk" },
    { icon: TruckIcon, label: "Pengeluaran Barang", page: "pengeluaran-produk" },
    { icon: Archive, label: "Manajemen Lokasi Rak", page: "lokasi-rak" },
    { icon: AlertTriangle, label: "Produk Kedaluwarsa", page: "peringatan-kedaluwarsa" },
  ]

  // Calculate stock for each product
  const dataStokProduk = produkJadi.map((produk) => {
    const stokItems = stokProdukJadi.filter((s) => s.produkId === produk.id)
    const totalStok = stokItems.reduce((sum, s) => sum + s.qty, 0)
    const totalNilai = totalStok * produk.hargaJual

    // Check expiry warning
    const today = new Date("2024-01-18")
    let nearestExpiry = null
    let daysToExpiry = null

    if (stokItems.length > 0) {
      const expiryDates = stokItems.map((s) => new Date(s.tanggalKedaluwarsa))
      nearestExpiry = new Date(Math.min(...expiryDates))
      daysToExpiry = Math.ceil((nearestExpiry - today) / (1000 * 60 * 60 * 24))
    }

    let statusStok = "Normal"
    if (totalStok <= produk.minStok) statusStok = "Kritis"
    else if (totalStok <= produk.minStok * 1.2) statusStok = "Rendah"
    else if (daysToExpiry && daysToExpiry <= 30) statusStok = "Perhatian Expired"

    return {
      ...produk,
      totalStok,
      totalNilai,
      batches: stokItems.length,
      daysToExpiry,
      statusStok,
    }
  })

  // Filter data
  const filteredData = dataStokProduk.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    const matchKategori = filterKategori === "Semua" || item.kategori === filterKategori
    return matchSearch && matchKategori
  })

  const kategoriList = ["Semua", ...new Set(produkJadi.map((p) => p.kategori))]

  return (
    <DashboardLayout menuItems={menuItems} currentPage={currentPage} setCurrentPage={setCurrentPage}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stok Produk Jadi</h1>
          <p className="mt-2 text-gray-600">
            Monitoring real-time stok produk jadi dengan sistem FIFO dan bin location
          </p>
        </div>

        {/* Filter dan Search */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cari Produk</label>
              <input
                type="text"
                placeholder="Cari nama produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter Kategori</label>
              <select
                value={filterKategori}
                onChange={(e) => setFilterKategori(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {kategoriList.map((kat) => (
                  <option key={kat} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabel Stok */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Produk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stok
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Min/Max
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Nilai
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.kategori}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="font-semibold text-gray-900">{item.totalStok}</span>
                      <span className="text-gray-600"> pcs</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.minStok} / {item.maxStok}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.batches} batch</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.statusStok === "Kritis"
                            ? "bg-red-100 text-red-800"
                            : item.statusStok === "Rendah"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.statusStok === "Perhatian Expired"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.statusStok}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600">
                      Rp {item.totalNilai.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-orange-600 hover:text-orange-900 font-medium">Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Total Produk</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{dataStokProduk.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Total Stok</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">
              {dataStokProduk.reduce((sum, d) => sum + d.totalStok, 0)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Stok Kritis</div>
            <div className="mt-2 text-3xl font-bold text-red-600">
              {dataStokProduk.filter((d) => d.statusStok === "Kritis").length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Total Nilai Inventory</div>
            <div className="mt-2 text-2xl font-bold text-orange-600">
              Rp {(dataStokProduk.reduce((sum, d) => sum + d.totalNilai, 0) / 1000000).toFixed(1)}jt
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
