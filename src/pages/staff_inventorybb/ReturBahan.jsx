"use client"

import { useState } from "react"
import { returBahan, bahanBaku, suppliers } from "../../data/inventory-bahan"
import DashboardLayout from "../../components/DashboardLayout"
import { LayoutDashboard, Package, ShoppingCart, Truck, ClipboardList } from "lucide-react"

export default function ReturBahan({ setCurrentPage, currentPage }) {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case "Diajukan":
        return "bg-yellow-100 text-yellow-800"
      case "Disetujui":
        return "bg-green-100 text-green-800"
      case "Ditolak":
        return "bg-red-100 text-red-800"
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
            <h1 className="text-3xl font-bold text-gray-900">Retur Bahan</h1>
            <p className="mt-2 text-gray-600">Kelola retur bahan baku yang tidak sesuai kualitas ke supplier</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
          >
            + Ajukan Retur
          </button>
        </div>

        {/* List Retur */}
        <div className="grid grid-cols-1 gap-6">
          {returBahan.map((retur) => {
            const supplier = suppliers.find((s) => s.id === retur.supplierId)

            return (
              <div key={retur.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-bold text-gray-900">{retur.id}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(retur.status)}`}
                        >
                          {retur.status}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-600">{supplier?.nama}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Total Nilai Retur</div>
                      <div className="text-2xl font-bold text-red-600">
                        Rp {retur.totalNilai.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500">Tanggal Retur</div>
                      <div className="text-sm font-medium text-gray-900">{retur.tanggalRetur}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Ref. Penerimaan</div>
                      <div className="text-sm font-medium text-gray-900">{retur.rcvId}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Jumlah Item</div>
                      <div className="text-sm font-medium text-gray-900">{retur.items.length} items</div>
                    </div>
                  </div>

                  {/* Item Detail */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Detail Item Retur:</h4>
                    <div className="space-y-3">
                      {retur.items.map((item, idx) => {
                        const bahan = bahanBaku.find((b) => b.id === item.bahanId)
                        const subtotal = item.qty * item.harga

                        return (
                          <div key={idx} className="bg-red-50 border border-red-200 p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-semibold text-gray-900">{bahan?.nama}</div>
                                <div className="text-xs text-gray-500">{item.bahanId}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-red-600">Rp {subtotal.toLocaleString("id-ID")}</div>
                                <div className="text-xs text-gray-600">
                                  {item.qty} {bahan?.satuan} @Rp {item.harga.toLocaleString("id-ID")}
                                </div>
                              </div>
                            </div>
                            <div className="border-t border-red-200 pt-2 mt-2">
                              <div className="text-xs font-medium text-gray-700">Alasan Retur:</div>
                              <div className="text-sm text-red-700 font-medium">{item.alasan}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Keterangan */}
                  {retur.keterangan && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-xs font-medium text-gray-700">Keterangan:</div>
                      <div className="text-sm text-gray-900 mt-1">{retur.keterangan}</div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-4">
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                      Cetak Surat Retur
                    </button>
                    {retur.status === "Diajukan" && (
                      <>
                        <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
                          Edit Retur
                        </button>
                        <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium">
                          Batalkan
                        </button>
                      </>
                    )}
                    {retur.status === "Disetujui" && (
                      <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                        Update Hutang
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
            <div className="text-sm font-medium text-gray-600">Total Retur</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{returBahan.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Diajukan</div>
            <div className="mt-2 text-3xl font-bold text-yellow-600">
              {returBahan.filter((r) => r.status === "Diajukan").length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Total Nilai Retur</div>
            <div className="mt-2 text-2xl font-bold text-red-600">
              Rp {returBahan.reduce((sum, r) => sum + r.totalNilai, 0).toLocaleString("id-ID")}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
