"use client"

import { useState } from "react"
import { kapasitasMesin, pesananProduksi, resepProduk } from "../../data/produksi"

export default function SimulasiKapasitas() {
  const [selectedDate, setSelectedDate] = useState("2024-01-18")

  // Calculate current capacity usage
  const activeProduction = pesananProduksi.filter(
    (p) => p.status === "Dalam Produksi" || p.status === "Menunggu Produksi",
  )

  const totalBatchNeeded = activeProduction.reduce((sum, p) => sum + p.jumlahBatch, 0)

  const availableMachines = kapasitasMesin.filter((m) => m.status === "Aktif")
  const totalDailyCapacity = availableMachines.reduce((sum, m) => sum + m.kapasitasHarian, 0)

  const capacityUsagePercentage = ((totalBatchNeeded / totalDailyCapacity) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Simulasi Kapasitas Produksi</h1>
        <p className="mt-2 text-gray-600">Analisis kapasitas mesin sebelum menerima pesanan tambahan</p>
      </div>

      {/* Capacity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Kapasitas Harian</div>
          <div className="mt-2 text-3xl font-bold text-blue-600">{totalDailyCapacity}</div>
          <div className="text-xs text-gray-500">batch/hari</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Terpakai</div>
          <div className="mt-2 text-3xl font-bold text-orange-600">{totalBatchNeeded}</div>
          <div className="text-xs text-gray-500">batch</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Sisa Kapasitas</div>
          <div className="mt-2 text-3xl font-bold text-green-600">{totalDailyCapacity - totalBatchNeeded}</div>
          <div className="text-xs text-gray-500">batch tersedia</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Utilisasi</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{capacityUsagePercentage}%</div>
          <div className="text-xs text-gray-500">dari kapasitas</div>
        </div>
      </div>

      {/* Capacity Bar */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visualisasi Kapasitas</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">Kapasitas Terpakai</span>
            <span className="font-bold text-gray-900">
              {totalBatchNeeded} / {totalDailyCapacity} batch
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className={`h-6 rounded-full ${
                capacityUsagePercentage >= 90
                  ? "bg-red-500"
                  : capacityUsagePercentage >= 70
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
              style={{ width: `${capacityUsagePercentage}%` }}
            >
              <span className="flex items-center justify-center h-full text-white text-sm font-bold">
                {capacityUsagePercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Machine Status */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Status Mesin</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Mesin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Mesin</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Kapasitas Harian</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {kapasitasMesin.map((mesin) => (
                <tr key={mesin.id} className={mesin.status === "Maintenance" ? "bg-red-50" : "bg-white"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mesin.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mesin.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                    {mesin.kapasitasHarian} {mesin.satuan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        mesin.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {mesin.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulation Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulasi Pesanan Baru</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Produk</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
              <option>Pilih Resep Produk...</option>
              {resepProduk.map((resep) => (
                <option key={resep.id} value={resep.id}>
                  {resep.namaProduk}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Batch</label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Tanggal</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <button className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
          Jalankan Simulasi
        </button>
      </div>

      {/* Capacity Alert */}
      {capacityUsagePercentage >= 80 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-yellow-900">Peringatan Kapasitas Tinggi</h4>
              <p className="mt-1 text-sm text-yellow-800">
                Kapasitas produksi mencapai {capacityUsagePercentage}%. Pertimbangkan untuk menambah shift atau mesin
                jika ada pesanan tambahan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
