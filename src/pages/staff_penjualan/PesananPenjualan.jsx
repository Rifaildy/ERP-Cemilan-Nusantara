"use client"

import { useState } from "react"
import { salesOrders, customers } from "../../data/penjualan"

export default function PesananPenjualan() {
  const [orders, setOrders] = useState(salesOrders)
  const [filterStatus, setFilterStatus] = useState("All")
  const [showModal, setShowModal] = useState(false)

  const filteredOrders = filterStatus === "All" ? orders : orders.filter((o) => o.status === filterStatus)

  const statusColors = {
    Confirmed: "bg-blue-100 text-blue-800",
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pesanan Penjualan (Sales Order)</h1>
          <p className="text-gray-600">Kelola pesanan dari pelanggan dengan cek stok real-time</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <span>+</span>
          Buat Sales Order
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Pesanan</div>
          <div className="text-2xl font-bold text-gray-800">{orders.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Confirmed</div>
          <div className="text-2xl font-bold text-blue-600">
            {orders.filter((o) => o.status === "Confirmed").length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Processing</div>
          <div className="text-2xl font-bold text-yellow-600">
            {orders.filter((o) => o.status === "Processing").length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Nilai</div>
          <div className="text-2xl font-bold text-green-600">
            Rp {orders.reduce((sum, o) => sum + o.total, 0).toLocaleString("id-ID")}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex gap-2">
          {["All", "Confirmed", "Processing", "Shipped", "Delivered"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === status ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID Pesanan</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Items</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{order.tanggal}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="font-medium text-gray-900">{order.customer.nama}</div>
                  <div className="text-gray-500">{order.customer.tipe}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{order.items.length} items</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  Rp {order.total.toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Create SO */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Buat Sales Order Baru</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Customer</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="">-- Pilih Customer --</option>
                  {customers.map((cust) => (
                    <option key={cust.id} value={cust.id}>
                      {cust.nama} - {cust.tipe}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Termin Pembayaran</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>Cash</option>
                  <option>NET 14</option>
                  <option>NET 30</option>
                  <option>NET 45</option>
                  <option>NET 60</option>
                </select>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Item Produk</label>
                  <button className="text-orange-500 text-sm font-medium">+ Tambah Item</button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="Nama Produk"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        placeholder="Qty"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="number"
                        placeholder="Harga"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-600">Stok: 2500</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 text-lg">ℹ</span>
                  <div className="text-sm text-blue-800">
                    <strong>Cek Stok Real-Time:</strong> Sistem akan mengecek ketersediaan stok dan melakukan booking
                    otomatis untuk mencegah double selling.
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg">
                  Batal
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Simpan Sales Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
