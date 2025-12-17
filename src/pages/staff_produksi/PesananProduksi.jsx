"use client"

import { useState } from "react"
import { pesananProduksi, resepProduk } from "../../data/produksi"

export default function PesananProduksi() {
  const [filterStatus, setFilterStatus] = useState("Semua")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredPesanan = pesananProduksi.filter((pesanan) => {
    if (filterStatus === "Semua") return true
    return pesanan.status === filterStatus
  })

  const statusList = ["Semua", "Menunggu Produksi", "Dalam Produksi", "Selesai"]

  const getStatusColor = (status) => {
    switch (status) {
      case "Menunggu Produksi":
        return "bg-yellow-100 text-yellow-800"
      case "Dalam Produksi":
        return "bg-blue-100 text-blue-800"
      case "Selesai":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrioritasColor = (prioritas) => {
    switch (prioritas) {
      case "Tinggi":
        return "bg-red-100 text-red-800"
      case "Normal":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pesanan Produksi</h1>
          <p className="mt-2 text-gray-600">Kelola jadwal produksi dengan sistem booking bahan baku otomatis</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
        >
          + Buat Pesanan Produksi
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter Status:</label>
          <div className="flex space-x-2">
            {statusList.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filterStatus === status ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pesanan Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPesanan.map((pesanan) => {
          const resep = resepProduk.find((r) => r.id === pesanan.resepId)
          const totalHPP = resep ? resep.hpp * pesanan.totalOutput : 0

          return (
            <div key={pesanan.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-gray-900">{pesanan.id}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(pesanan.status)}`}
                      >
                        {pesanan.status}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPrioritasColor(pesanan.prioritas)}`}
                      >
                        {pesanan.prioritas}
                      </span>
                    </div>
                    <p className="mt-1 text-lg font-medium text-gray-700">{resep?.namaProduk}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Target Output</div>
                    <div className="text-3xl font-bold text-orange-600">{pesanan.totalOutput}</div>
                    <div className="text-xs text-gray-500">{pesanan.jumlahBatch} batch</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500">Tanggal Pesanan</div>
                    <div className="text-sm font-medium text-gray-900">{pesanan.tanggalPesanan}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Target Selesai</div>
                    <div className="text-sm font-medium text-gray-900">{pesanan.tanggalTargetSelesai}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Estimasi HPP</div>
                    <div className="text-sm font-medium text-orange-600">Rp {totalHPP.toLocaleString("id-ID")}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">HPP per Unit</div>
                    <div className="text-sm font-medium text-gray-900">Rp {resep?.hpp.toLocaleString("id-ID")}</div>
                  </div>
                </div>

                {pesanan.tanggalMulaiProduksi && (
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <div className="text-sm font-medium text-blue-900">
                      Produksi dimulai: {pesanan.tanggalMulaiProduksi}
                      {pesanan.tanggalSelesai && ` | Selesai: ${pesanan.tanggalSelesai}`}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Keterangan:</span> {pesanan.keterangan}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-4">
                  <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                    Lihat Resep
                  </button>
                  {pesanan.status === "Menunggu Produksi" && (
                    <>
                      <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
                        Simulasi Kapasitas
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                        Mulai Produksi
                      </button>
                    </>
                  )}
                  {pesanan.status === "Dalam Produksi" && (
                    <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                      Monitor Progress
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Pesanan</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{pesananProduksi.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Menunggu Produksi</div>
          <div className="mt-2 text-3xl font-bold text-yellow-600">
            {pesananProduksi.filter((p) => p.status === "Menunggu Produksi").length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Dalam Produksi</div>
          <div className="mt-2 text-3xl font-bold text-blue-600">
            {pesananProduksi.filter((p) => p.status === "Dalam Produksi").length}
          </div>
        </div>
      </div>
    </div>
  )
}
