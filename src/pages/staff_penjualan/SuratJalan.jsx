"use client"

import { useState } from "react"
import { suratJalan, salesOrders } from "../../data/penjualan"

export default function SuratJalan() {
  const [deliveries, setDeliveries] = useState(suratJalan)
  const [showModal, setShowModal] = useState(false)

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    "On Delivery": "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Surat Jalan</h1>
          <p className="text-gray-600">Generate surat jalan otomatis dari sales order</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <span>+</span>
          Buat Surat Jalan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Surat Jalan</div>
          <div className="text-2xl font-bold text-gray-800">{deliveries.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {deliveries.filter((d) => d.status === "Pending").length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">On Delivery</div>
          <div className="text-2xl font-bold text-blue-600">
            {deliveries.filter((d) => d.status === "On Delivery").length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Delivered</div>
          <div className="text-2xl font-bold text-green-600">
            {deliveries.filter((d) => d.status === "Delivered").length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No. Surat Jalan</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">SO Reference</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Driver</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No. Polisi</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{delivery.id}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{delivery.tanggal}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{delivery.soId}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{delivery.driver}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{delivery.noPol}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[delivery.status]}`}>
                    {delivery.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Print</button>
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Generate Surat Jalan</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Sales Order</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">-- Pilih SO --</option>
                  {salesOrders
                    .filter((so) => so.status === "Confirmed" || so.status === "Processing")
                    .map((so) => (
                      <option key={so.id} value={so.id}>
                        {so.id} - {so.customer.nama}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Nama Driver"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Polisi Kendaraan</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="B 1234 XYZ"
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-sm text-green-800">
                  <strong>Auto Generate:</strong> Surat jalan akan digenerate otomatis dengan nomor urut dan detail dari
                  SO yang dipilih.
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg">
                  Batal
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Generate & Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
