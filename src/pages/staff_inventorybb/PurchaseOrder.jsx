"use client"

import { useState } from "react"
import { purchaseOrders, bahanBaku, suppliers } from "../../data/inventory-bahan"
import DashboardLayout from "../../components/DashboardLayout"
import { LayoutDashboard, Package, ShoppingCart, Truck, ClipboardList } from "lucide-react"

export default function PurchaseOrder({ setCurrentPage, currentPage }) {
  const [filterStatus, setFilterStatus] = useState("Semua")
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Filter data
  const filteredPO = purchaseOrders.filter((po) => {
    if (filterStatus === "Semua") return true
    return po.status === filterStatus
  })

  const statusList = ["Semua", "Pending", "Dalam Pengiriman", "Diterima"]

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Dalam Pengiriman":
        return "bg-blue-100 text-blue-800"
      case "Diterima":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
    { icon: Package, label: "Stok Bahan Baku", page: "stok-bahan" },
    { icon: ShoppingCart, label: "Purchase Order (PO)", page: "purchase-order" },
    { icon: Truck, label: "Penerimaan Barang", page: "penerimaan-bahan" },
    { icon: ClipboardList, label: "Retur Supplier", page: "retur-bahan" },
  ]

  return (
    <DashboardLayout menuItems={menuItems} currentPage={currentPage} setCurrentPage={setCurrentPage}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Purchase Order</h1>
            <p className="mt-2 text-gray-600">Kelola pemesanan bahan baku dari supplier</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
          >
            + Buat PO Baru
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

        {/* PO Cards */}
        <div className="grid grid-cols-1 gap-6">
          {filteredPO.map((po) => {
            const supplier = suppliers.find((s) => s.id === po.supplierId)
            return (
              <div key={po.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-bold text-gray-900">{po.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(po.status)}`}>
                          {po.status}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-600">{supplier?.nama}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Total Nilai</div>
                      <div className="text-2xl font-bold text-orange-600">
                        Rp {po.totalNilai.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500">Tanggal PO</div>
                      <div className="text-sm font-medium text-gray-900">{po.tanggalPO}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Estimasi Tiba</div>
                      <div className="text-sm font-medium text-gray-900">{po.estimasiKedatangan}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Jumlah Item</div>
                      <div className="text-sm font-medium text-gray-900">{po.items.length} items</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Keterangan</div>
                      <div className="text-sm font-medium text-gray-900">{po.keterangan}</div>
                    </div>
                  </div>

                  {/* Item Detail */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Detail Item:</h4>
                    <div className="space-y-2">
                      {po.items.map((item, idx) => {
                        const bahan = bahanBaku.find((b) => b.id === item.bahanId)
                        return (
                          <div key={idx} className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded">
                            <div className="flex-1">
                              <span className="font-medium text-gray-900">{bahan?.nama}</span>
                              <span className="text-gray-600 ml-2">({item.bahanId})</span>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold text-gray-900">{item.qty.toLocaleString("id-ID")}</span>
                              <span className="text-gray-600"> {bahan?.satuan}</span>
                              <span className="text-gray-500 ml-2">@Rp {item.harga.toLocaleString("id-ID")}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-4">
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                      Lihat Detail
                    </button>
                    {po.status === "Pending" && (
                      <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
                        Update Status
                      </button>
                    )}
                    {po.status === "Dalam Pengiriman" && (
                      <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                        Terima Barang
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
            <div className="text-sm font-medium text-gray-600">Total PO</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{purchaseOrders.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Pending</div>
            <div className="mt-2 text-3xl font-bold text-yellow-600">
              {purchaseOrders.filter((p) => p.status === "Pending").length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Dalam Pengiriman</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">
              {purchaseOrders.filter((p) => p.status === "Dalam Pengiriman").length}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
