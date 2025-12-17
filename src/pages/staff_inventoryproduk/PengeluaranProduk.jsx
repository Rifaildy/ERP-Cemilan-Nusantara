"use client"

import { useState } from "react"
import { pengeluaranProduk, produkJadi } from "../../data/inventory-produk"

export default function PengeluaranProduk() {
  const [filterJenis, setFilterJenis] = useState("Semua")

  const filteredPengeluaran = pengeluaranProduk.filter((out) => {
    if (filterJenis === "Semua") return true
    return out.jenisPengeluaran === filterJenis
  })

  const jenisList = ["Semua", "Penjualan", "Sample", "Reject/Rusak"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengeluaran Produk</h1>
        <p className="mt-2 text-gray-600">
          Kelola pengeluaran produk dengan sistem FIFO otomatis berdasarkan tanggal kedaluwarsa
        </p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter Jenis:</label>
          <div className="flex space-x-2">
            {jenisList.map((jenis) => (
              <button
                key={jenis}
                onClick={() => setFilterJenis(jenis)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filterJenis === jenis ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {jenis}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pengeluaran Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPengeluaran.map((out) => {
          const totalQty = out.items.reduce((sum, item) => sum + item.qty, 0)

          return (
            <div key={out.id} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-gray-900">{out.id}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          out.jenisPengeluaran === "Penjualan"
                            ? "bg-green-100 text-green-800"
                            : out.jenisPengeluaran === "Sample"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {out.jenisPengeluaran}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        {out.status}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-600">{out.customer}</p>
                    <p className="text-sm text-gray-500">Ref: {out.referensiId}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Tanggal</div>
                    <div className="text-lg font-bold text-gray-900">{out.tanggal}</div>
                    <div className="text-sm text-gray-500">Total: {totalQty} pcs</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500">PIC Gudang</div>
                    <div className="text-sm font-medium text-gray-900">{out.picGudang}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Jumlah Item</div>
                    <div className="text-sm font-medium text-gray-900">{out.items.length} jenis produk</div>
                  </div>
                </div>

                {/* Item Detail dengan FIFO Info */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Detail Pengeluaran (FIFO):</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Produk</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Batch</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Lokasi</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Qty</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {out.items.map((item, idx) => {
                          const produk = produkJadi.find((p) => p.id === item.produkId)

                          return (
                            <tr key={idx} className="bg-white">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {produk?.nama}
                                <div className="text-xs text-gray-500">{item.produkId}</div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 font-mono text-xs">{item.batch}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                                  {item.lokasiRak}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                                {item.qty} pcs
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">{item.keterangan || "-"}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-4">
                  <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                    Cetak Surat Jalan
                  </button>
                  <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Transaksi</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{pengeluaranProduk.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Penjualan</div>
          <div className="mt-2 text-3xl font-bold text-green-600">
            {pengeluaranProduk.filter((p) => p.jenisPengeluaran === "Penjualan").length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Produk Keluar</div>
          <div className="mt-2 text-3xl font-bold text-blue-600">
            {pengeluaranProduk.reduce((sum, out) => sum + out.items.reduce((s, i) => s + i.qty, 0), 0)} pcs
          </div>
        </div>
      </div>
    </div>
  )
}
