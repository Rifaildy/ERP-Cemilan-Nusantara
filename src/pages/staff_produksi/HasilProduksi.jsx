"use client"

import { useState } from "react"
import { hasilProduksi, resepProduk } from "../../data/produksi"
import { produkJadi } from "../../data/inventory-produk"

export default function HasilProduksi() {
  const [filterTanggal, setFilterTanggal] = useState("2024-01-16")

  const filteredHasil = hasilProduksi.filter((hasil) => hasil.tanggalProduksi === filterTanggal)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hasil Produksi</h1>
        <p className="mt-2 text-gray-600">Laporan hasil produksi dengan perhitungan HPP otomatis dan traceability</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter Tanggal:</label>
          <input
            type="date"
            value={filterTanggal}
            onChange={(e) => setFilterTanggal(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Hasil Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredHasil.map((hasil) => {
          const resep = resepProduk.find((r) => r.id === hasil.resepId)
          const produk = produkJadi.find((p) => p.id === hasil.produkId)

          return (
            <div key={hasil.id} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-gray-900">{hasil.id}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          hasil.statusQC === "Lolos"
                            ? "bg-green-100 text-green-800"
                            : hasil.statusQC === "Lolos dengan Catatan"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {hasil.statusQC}
                      </span>
                    </div>
                    <p className="mt-1 text-lg font-medium text-gray-700">{produk?.nama}</p>
                    <p className="text-sm text-gray-500">Batch: {hasil.batchNumber}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Total Output</div>
                    <div className="text-3xl font-bold text-green-600">{hasil.qtyLolos}</div>
                    <div className="text-xs text-gray-500">dari {hasil.qtyProduksi} produksi</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500">Tanggal Produksi</div>
                    <div className="text-sm font-medium text-gray-900">{hasil.tanggalProduksi}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Tanggal Kedaluwarsa</div>
                    <div className="text-sm font-medium text-gray-900">{hasil.tanggalKedaluwarsa}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Qty Produksi</div>
                    <div className="text-sm font-medium text-gray-900">{hasil.qtyProduksi} pcs</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Qty Lolos QC</div>
                    <div className="text-sm font-medium text-green-600">{hasil.qtyLolos} pcs</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Qty Reject</div>
                    <div className="text-sm font-medium text-red-600">{hasil.qtyReject} pcs</div>
                  </div>
                </div>

                {/* HPP Calculation */}
                <div className="border-t pt-4 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Perhitungan HPP (Harga Pokok Produksi):</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-600">HPP per Unit</div>
                      <div className="text-2xl font-bold text-orange-600">
                        Rp {hasil.hppPerUnit.toLocaleString("id-ID")}
                      </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-600">Total HPP</div>
                      <div className="text-2xl font-bold text-orange-600">
                        Rp {hasil.totalHPP.toLocaleString("id-ID")}
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-600">Harga Jual per Unit</div>
                      <div className="text-2xl font-bold text-green-600">
                        Rp {produk?.hargaJual.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keterangan */}
                {hasil.keterangan && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="text-xs font-medium text-gray-700">Keterangan QC:</div>
                    <div className="text-sm text-gray-900 mt-1">{hasil.keterangan}</div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-4">
                  <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                    Cetak Label Batch
                  </button>
                  <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
                    Lihat Detail Resep
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                    Update Inventory
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Hasil</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{hasilProduksi.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Produksi</div>
          <div className="mt-2 text-3xl font-bold text-blue-600">
            {hasilProduksi.reduce((sum, h) => sum + h.qtyProduksi, 0)} pcs
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Lolos QC</div>
          <div className="mt-2 text-3xl font-bold text-green-600">
            {hasilProduksi.reduce((sum, h) => sum + h.qtyLolos, 0)} pcs
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total HPP</div>
          <div className="mt-2 text-2xl font-bold text-orange-600">
            Rp {(hasilProduksi.reduce((sum, h) => sum + h.totalHPP, 0) / 1000000).toFixed(1)}jt
          </div>
        </div>
      </div>
    </div>
  )
}
