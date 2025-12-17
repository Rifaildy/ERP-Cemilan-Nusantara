"use client"

import { useState } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import { LayoutDashboard, FileText, TrendingUp, BarChart3 } from "lucide-react"
import { stokBahan, purchaseOrders } from "../../data/inventory-bahan"
import { pesananProduksi } from "../../data/produksi"
import { produkJadi } from "../../data/inventory-produk"
import { salesOrders } from "../../data/penjualan"

export default function MonitoringOperasional({ setCurrentPage }) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
    { icon: FileText, label: "Laporan Executive", page: "laporan-executive" },
    { icon: TrendingUp, label: "Monitoring Operasional", page: "monitoring-operasional" },
    { icon: BarChart3, label: "Analisis Kinerja", page: "analisis-kinerja" },
  ]

  const [activeTab, setActiveTab] = useState("inventory")

  // Inventory Metrics
  const totalBahan = stokBahan.reduce((sum, b) => sum + b.stok, 0)
  const lowStockBahan = stokBahan.filter((b) => b.statusStok === "Low Stock").length
  const expiringSoon = stokBahan.filter((b) => {
    const daysToExpiry = Math.ceil((new Date(b.kadaluwarsa) - new Date()) / (1000 * 60 * 60 * 24))
    return daysToExpiry <= 30 && daysToExpiry > 0
  }).length

  const totalProduk = produkJadi.reduce((sum, p) => sum + p.stok, 0)
  const lowStockProduk = produkJadi.filter((p) => p.stok < 500).length

  // Production Metrics
  const ongoingProduction = pesananProduksi.filter((p) => p.status === "Dalam Produksi").length
  const completedProduction = pesananProduksi.filter((p) => p.status === "Selesai").length

  // Sales Metrics
  const pendingOrders = salesOrders.filter((so) => so.status === "Confirmed" || so.status === "Processing").length
  const shippedOrders = salesOrders.filter((so) => so.status === "Shipped").length

  // Procurement Metrics
  const pendingPO = purchaseOrders.filter((po) => po.status === "Pending").length
  const receivedPO = purchaseOrders.filter((po) => po.status === "Received").length

  return (
    <DashboardLayout menuItems={menuItems} currentPage="monitoring-operasional" setCurrentPage={setCurrentPage}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Monitoring Operasional</h1>
            <p className="text-gray-600">Real-time monitoring semua operasional perusahaan</p>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Perbarui Data</button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-600 text-sm">Status Inventori</div>
            <div className="text-2xl font-bold text-gray-800">{totalBahan + totalProduk} items</div>
            <div className="text-sm text-orange-600 mt-1">{lowStockBahan + lowStockProduk} stok rendah</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-600 text-sm">Produksi Aktif</div>
            <div className="text-2xl font-bold text-blue-600">{ongoingProduction}</div>
            <div className="text-sm text-gray-600 mt-1">{completedProduction} selesai</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-600 text-sm">Pesanan Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
            <div className="text-sm text-gray-600 mt-1">{shippedOrders} dikirim</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-600 text-sm">Pesanan Pembelian</div>
            <div className="text-2xl font-bold text-purple-600">{pendingPO}</div>
            <div className="text-sm text-gray-600 mt-1">{receivedPO} diterima</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-2">
            {[
              { id: "inventory", label: "Inventori" },
              { id: "production", label: "Produksi" },
              { id: "sales", label: "Penjualan" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Tab */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Stok Bahan Baku</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Total Item</span>
                    <span className="text-blue-600 font-bold">{stokBahan.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Total Stok</span>
                    <span className="text-green-600 font-bold">{totalBahan.toLocaleString()} kg</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Peringatan Stok Rendah</span>
                    <span className="text-orange-600 font-bold">{lowStockBahan} item</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-gray-700">Kadaluwarsa Segera (30h)</span>
                    <span className="text-red-600 font-bold">{expiringSoon} item</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Stok Produk Jadi</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Total SKU</span>
                    <span className="text-blue-600 font-bold">{produkJadi.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Total Stok</span>
                    <span className="text-green-600 font-bold">{totalProduk.toLocaleString()} pcs</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Peringatan Stok Rendah</span>
                    <span className="text-orange-600 font-bold">{lowStockProduk} SKU</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">Lokasi Bin Digunakan</span>
                    <span className="text-purple-600 font-bold">8 / 12</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Bahan Baku Stok Rendah</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nama Bahan</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stok Saat Ini</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stok Minimum</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stokBahan
                      .filter((b) => b.statusStok === "Low Stock")
                      .slice(0, 5)
                      .map((bahan) => (
                        <tr key={bahan.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{bahan.namaBahan}</td>
                          <td className="px-4 py-3 text-sm text-orange-600 font-medium">{bahan.stok} kg</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{bahan.minStock} kg</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">
                              Stok Rendah
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Production Tab */}
        {activeTab === "production" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-gray-600 text-sm">Total Pesanan</div>
                <div className="text-2xl font-bold text-gray-800">{pesananProduksi.length}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-gray-600 text-sm">Dalam Proses</div>
                <div className="text-2xl font-bold text-blue-600">{ongoingProduction}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-gray-600 text-sm">Selesai</div>
                <div className="text-2xl font-bold text-green-600">{completedProduction}</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Pesanan Produksi Berjalan</h3>
              <div className="space-y-3">
                {pesananProduksi
                  .filter((p) => p.status === "Dalam Produksi")
                  .map((prod) => (
                    <div key={prod.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-gray-900">{prod.id}</div>
                          <div className="text-sm text-gray-600">{prod.resepId}</div>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{prod.status}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Target: </span>
                          <span className="font-medium">{prod.totalOutput} pcs</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Batch: </span>
                          <span className="font-medium">{prod.jumlahBatch} batch</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Jatuh Tempo: </span>
                          <span className="font-medium">{prod.tanggalTargetSelesai}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                {pesananProduksi.filter((p) => p.status === "Dalam Produksi").length === 0 && (
                  <p className="text-gray-500 text-center py-4">Tidak ada pesanan produksi yang sedang berjalan</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === "sales" && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { status: "Confirmed", label: "Dikonfirmasi" },
                { status: "Processing", label: "Diproses" },
                { status: "Shipped", label: "Dikirim" },
                { status: "Delivered", label: "Terkirim" },
              ].map(({ status, label }) => {
                const count = salesOrders.filter((so) => so.status === status).length
                const colors = {
                  Confirmed: "blue",
                  Processing: "yellow",
                  Shipped: "purple",
                  Delivered: "green",
                }
                const color = colors[status]

                return (
                  <div key={status} className="bg-white rounded-lg shadow p-4">
                    <div className="text-gray-600 text-sm">{label}</div>
                    <div className={`text-2xl font-bold text-${color}-600`}>{count}</div>
                  </div>
                )
              })}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Pesanan Penjualan Terbaru</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID Pesanan</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Pelanggan</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {salesOrders.slice(0, 8).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{order.customer.nama}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          Rp {order.total.toLocaleString("id-ID")}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status === "Delivered"
                              ? "Terkirim"
                              : order.status === "Shipped"
                                ? "Dikirim"
                                : order.status === "Processing"
                                  ? "Diproses"
                                  : "Dikonfirmasi"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
