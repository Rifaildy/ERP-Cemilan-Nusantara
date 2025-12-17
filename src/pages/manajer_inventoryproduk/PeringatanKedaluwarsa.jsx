"use client"

import { stokProdukJadi, produkJadi } from "../../data/inventory-produk"

export default function PeringatanKedaluwarsa() {
  const today = new Date("2024-01-18")

  // Calculate expiry for all stock
  const stokWithExpiry = stokProdukJadi.map((stok) => {
    const produk = produkJadi.find((p) => p.id === stok.produkId)
    const expiryDate = new Date(stok.tanggalKedaluwarsa)
    const daysToExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))

    let urgency = "Normal"
    let prioritas = 4
    if (daysToExpiry <= 7) {
      urgency = "Sangat Urgent"
      prioritas = 1
    } else if (daysToExpiry <= 14) {
      urgency = "Urgent"
      prioritas = 2
    } else if (daysToExpiry <= 30) {
      urgency = "Perhatian"
      prioritas = 3
    }

    return {
      ...stok,
      produk,
      daysToExpiry,
      urgency,
      prioritas,
    }
  })

  // Sort by priority (most urgent first)
  const sortedStok = stokWithExpiry.sort((a, b) => a.prioritas - b.prioritas)

  // Get urgent items
  const urgentItems = sortedStok.filter((s) => s.urgency !== "Normal")
  const criticalItems = sortedStok.filter((s) => s.urgency === "Sangat Urgent")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Peringatan Kedaluwarsa Produk</h1>
        <p className="mt-2 text-gray-600">Monitoring produk mendekati tanggal kedaluwarsa untuk optimasi FIFO</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Batch</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{stokProdukJadi.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Sangat Urgent</div>
          <div className="mt-2 text-3xl font-bold text-red-600">{criticalItems.length}</div>
          <div className="text-xs text-gray-500">≤ 7 hari</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Urgent</div>
          <div className="mt-2 text-3xl font-bold text-orange-600">
            {sortedStok.filter((s) => s.urgency === "Urgent").length}
          </div>
          <div className="text-xs text-gray-500">≤ 14 hari</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Perhatian</div>
          <div className="mt-2 text-3xl font-bold text-yellow-600">
            {sortedStok.filter((s) => s.urgency === "Perhatian").length}
          </div>
          <div className="text-xs text-gray-500">≤ 30 hari</div>
        </div>
      </div>

      {/* Critical Alert */}
      {criticalItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-red-900">Peringatan Kritis: Produk Segera Kedaluwarsa</h4>
              <p className="mt-1 text-sm text-red-800">
                Ada {criticalItems.length} batch produk yang akan kedaluwarsa dalam 7 hari. Segera prioritaskan
                penjualan!
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {criticalItems.map((item) => (
              <div key={item.batch} className="bg-white border border-red-300 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-900">{item.produk?.nama}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Batch: {item.batch} | Lokasi: {item.lokasiRak}
                    </div>
                    <div className="text-sm text-gray-600">Stok: {item.qty} pcs</div>
                  </div>
                  <div className="text-right">
                    <div className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold">{item.urgency}</div>
                    <div className="mt-2 text-3xl font-bold text-red-600">{item.daysToExpiry}</div>
                    <div className="text-xs text-gray-500">hari lagi</div>
                    <div className="text-xs text-gray-500 mt-1">Exp: {item.tanggalKedaluwarsa}</div>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 font-medium">
                    Buat Promo Khusus
                  </button>
                  <button className="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 font-medium">
                    Notifikasi Sales
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Items with Expiry Warning */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Monitoring Semua Batch (Urutan FIFO)</h3>
          <p className="text-sm text-gray-600 mt-1">Diurutkan berdasarkan prioritas kedaluwarsa</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioritas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lokasi</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stok</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tgl Produksi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kedaluwarsa</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Sisa Hari</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedStok.map((item, idx) => (
                <tr
                  key={item.batch}
                  className={
                    item.urgency === "Sangat Urgent"
                      ? "bg-red-50"
                      : item.urgency === "Urgent"
                        ? "bg-orange-50"
                        : item.urgency === "Perhatian"
                          ? "bg-yellow-50"
                          : "bg-white"
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-gray-900">#{idx + 1}</div>
                      {idx === 0 && (
                        <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">
                          JUAL DULU
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.produk?.nama}</div>
                    <div className="text-xs text-gray-500">{item.produkId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{item.batch}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                      {item.lokasiRak}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                    {item.qty} pcs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.tanggalProduksi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.tanggalKedaluwarsa}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`text-2xl font-bold ${
                        item.daysToExpiry <= 7
                          ? "text-red-600"
                          : item.daysToExpiry <= 14
                            ? "text-orange-600"
                            : item.daysToExpiry <= 30
                              ? "text-yellow-600"
                              : "text-green-600"
                      }`}
                    >
                      {item.daysToExpiry}
                    </span>
                    <div className="text-xs text-gray-500">hari</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.urgency === "Sangat Urgent"
                          ? "bg-red-500 text-white"
                          : item.urgency === "Urgent"
                            ? "bg-orange-500 text-white"
                            : item.urgency === "Perhatian"
                              ? "bg-yellow-500 text-white"
                              : "bg-green-500 text-white"
                      }`}
                    >
                      {item.urgency}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
