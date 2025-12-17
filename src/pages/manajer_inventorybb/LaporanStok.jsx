"use client"

import { useState } from "react"
import { bahanBaku, stokBahanBaku, suppliers } from "../../data/inventory-bahan"

export default function LaporanStok() {
  const [dateRange, setDateRange] = useState({
    start: "2024-01-01",
    end: "2024-01-18",
  })

  // Prepare stock data
  const stockReport = bahanBaku.map((bahan) => {
    const stokItems = stokBahanBaku.filter((s) => s.bahanId === bahan.id)
    const totalStok = stokItems.reduce((sum, s) => sum + s.stok, 0)
    const totalNilai = totalStok * bahan.hargaBeli
    const supplier = suppliers.find((sup) => sup.id === bahan.supplier)

    const statusStok =
      totalStok <= bahan.stokMinimum ? "Kritis" : totalStok <= bahan.stokMinimum * 1.2 ? "Rendah" : "Normal"

    return {
      ...bahan,
      totalStok,
      totalNilai,
      supplierNama: supplier?.nama || "-",
      statusStok,
      batches: stokItems.length,
    }
  })

  const totalInventoryValue = stockReport.reduce((sum, item) => sum + item.totalNilai, 0)
  const criticalItems = stockReport.filter((item) => item.statusStok === "Kritis")
  const lowStockItems = stockReport.filter((item) => item.statusStok === "Rendah")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan Stok Bahan Baku</h1>
          <p className="mt-2 text-gray-600">Analisis komprehensif inventory bahan baku</p>
        </div>
        <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
          Export PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Nilai Inventory</div>
          <div className="mt-2 text-2xl font-bold text-orange-600">
            Rp {(totalInventoryValue / 1000000).toFixed(2)}jt
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Item</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{stockReport.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Stok Kritis</div>
          <div className="mt-2 text-3xl font-bold text-red-600">{criticalItems.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Stok Rendah</div>
          <div className="mt-2 text-3xl font-bold text-yellow-600">{lowStockItems.length}</div>
        </div>
      </div>

      {/* Critical Items Alert */}
      {criticalItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-900 mb-4">Peringatan: Item Stok Kritis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criticalItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded border border-red-300">
                <div className="font-semibold text-gray-900">{item.nama}</div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <span className="text-2xl font-bold text-red-600">{item.totalStok}</span>
                    <span className="text-gray-600 ml-1">{item.satuan}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Min: {item.stokMinimum}</div>
                    <button className="mt-1 px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600">
                      Buat PO
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Stock Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Detail Stok per Item</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Bahan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stok</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Batch</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Harga/Unit</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Nilai</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stockReport.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.kategori}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold">
                    {item.totalStok.toLocaleString("id-ID")} {item.satuan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">{item.batches}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    Rp {item.hargaBeli.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-orange-600">
                    Rp {item.totalNilai.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.statusStok === "Kritis"
                          ? "bg-red-100 text-red-800"
                          : item.statusStok === "Rendah"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.statusStok}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="6" className="px-6 py-4 text-right font-bold text-gray-900">
                  Total Nilai Inventory:
                </td>
                <td className="px-6 py-4 text-right font-bold text-orange-600 text-lg">
                  Rp {totalInventoryValue.toLocaleString("id-ID")}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Stock by Category */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Nilai Inventory per Kategori</h3>
        <div className="space-y-3">
          {[...new Set(bahanBaku.map((b) => b.kategori))].map((kategori) => {
            const itemsInCategory = stockReport.filter((item) => item.kategori === kategori)
            const totalValue = itemsInCategory.reduce((sum, item) => sum + item.totalNilai, 0)
            const percentage = ((totalValue / totalInventoryValue) * 100).toFixed(1)

            return (
              <div key={kategori}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">{kategori}</span>
                  <span className="text-gray-900 font-semibold">
                    Rp {totalValue.toLocaleString("id-ID")} ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
