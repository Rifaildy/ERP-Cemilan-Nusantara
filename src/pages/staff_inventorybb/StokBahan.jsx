"use client"

import { useState } from "react"
import { bahanBaku, stokBahanBaku, suppliers } from "../../data/inventory-bahan"

export default function StokBahan() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterKategori, setFilterKategori] = useState("Semua")

  // Gabungkan data bahan baku dengan stok
  const dataStok = bahanBaku.map((bahan) => {
    const stokItems = stokBahanBaku.filter((s) => s.bahanId === bahan.id)
    const totalStok = stokItems.reduce((sum, s) => sum + s.stok, 0)
    const supplier = suppliers.find((sup) => sup.id === bahan.supplier)

    // Hitung hari sampai kedaluwarsa terdekat
    let hariKedaluwarsa = null
    let statusStok = "Normal"

    if (stokItems.length > 0) {
      const today = new Date("2024-01-18")
      const tanggalKedaluwarsaList = stokItems.map((s) => new Date(s.tanggalKedaluwarsa))
      const tanggalTerdekat = new Date(Math.min(...tanggalKedaluwarsaList))
      hariKedaluwarsa = Math.ceil((tanggalTerdekat - today) / (1000 * 60 * 60 * 24))
    }

    if (totalStok <= bahan.stokMinimum) statusStok = "Kritis"
    else if (totalStok <= bahan.stokMinimum * 1.2) statusStok = "Rendah"
    else if (hariKedaluwarsa && hariKedaluwarsa <= 3) statusStok = "Kadaluwarsa"

    return {
      ...bahan,
      totalStok,
      supplierNama: supplier?.nama || "-",
      statusStok,
      hariKedaluwarsa,
      batches: stokItems,
    }
  })

  // Filter data
  const filteredData = dataStok.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    const matchKategori = filterKategori === "Semua" || item.kategori === filterKategori
    return matchSearch && matchKategori
  })

  const kategoriList = ["Semua", ...new Set(bahanBaku.map((b) => b.kategori))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Stok Bahan Baku</h1>
        <p className="mt-2 text-gray-600">Monitoring real-time stok bahan baku dengan sistem FIFO/FEFO</p>
      </div>

      {/* Filter dan Search */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cari Bahan Baku</label>
            <input
              type="text"
              placeholder="Cari nama bahan..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Bahan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min/Max
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.kategori}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="font-semibold text-gray-900">{item.totalStok.toLocaleString("id-ID")}</span>
                    <span className="text-gray-600"> {item.satuan}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.stokMinimum} / {item.stokMaksimum}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.statusStok === "Kritis"
                          ? "bg-red-100 text-red-800"
                          : item.statusStok === "Rendah"
                            ? "bg-yellow-100 text-yellow-800"
                            : item.statusStok === "Kadaluwarsa"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.statusStok}
                      {item.hariKedaluwarsa && item.hariKedaluwarsa <= 5 ? ` (${item.hariKedaluwarsa}h)` : ""}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.supplierNama}</td>
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
          <div className="text-sm font-medium text-gray-600">Total Item</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{dataStok.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Stok Normal</div>
          <div className="mt-2 text-3xl font-bold text-green-600">
            {dataStok.filter((d) => d.statusStok === "Normal").length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Stok Rendah</div>
          <div className="mt-2 text-3xl font-bold text-yellow-600">
            {dataStok.filter((d) => d.statusStok === "Rendah").length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Stok Kritis</div>
          <div className="mt-2 text-3xl font-bold text-red-600">
            {dataStok.filter((d) => d.statusStok === "Kritis").length}
          </div>
        </div>
      </div>
    </div>
  )
}
