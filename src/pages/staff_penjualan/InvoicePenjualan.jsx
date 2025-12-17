"use client"

import { useState } from "react"
import { invoices, salesOrders } from "../../data/penjualan"

export default function InvoicePenjualan() {
  const [allInvoices, setAllInvoices] = useState(invoices)
  const [filterStatus, setFilterStatus] = useState("All")
  const [showModal, setShowModal] = useState(false)

  const filteredInvoices = filterStatus === "All" ? allInvoices : allInvoices.filter((i) => i.status === filterStatus)

  const statusColors = {
    Outstanding: "bg-red-100 text-red-800",
    Partial: "bg-yellow-100 text-yellow-800",
    Paid: "bg-green-100 text-green-800",
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Invoice Penjualan</h1>
          <p className="text-gray-600">Generate invoice otomatis dan track pembayaran</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <span>+</span>
          Buat Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Invoice</div>
          <div className="text-2xl font-bold text-gray-800">{allInvoices.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Nilai</div>
          <div className="text-2xl font-bold text-blue-600">
            Rp {allInvoices.reduce((sum, i) => sum + i.total, 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Terbayar</div>
          <div className="text-2xl font-bold text-green-600">
            Rp {allInvoices.reduce((sum, i) => sum + i.dibayar, 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Outstanding</div>
          <div className="text-2xl font-bold text-red-600">
            Rp {allInvoices.reduce((sum, i) => sum + i.sisa, 0).toLocaleString("id-ID")}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex gap-2">
          {["All", "Outstanding", "Partial", "Paid"].map((status) => (
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No. Invoice</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">SO Reference</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Dibayar</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sisa</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Jatuh Tempo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{invoice.id}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{invoice.tanggal}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{invoice.soId}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  Rp {invoice.total.toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 text-sm text-green-600">Rp {invoice.dibayar.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3 text-sm text-red-600">Rp {invoice.sisa.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{invoice.jatuhTempo}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[invoice.status]}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Print</button>
                  {invoice.status !== "Paid" && (
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">Bayar</button>
                  )}
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
              <h2 className="text-xl font-bold text-gray-800">Generate Invoice</h2>
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
                    .filter((so) => so.status === "Confirmed" || so.status === "Delivered")
                    .map((so) => (
                      <option key={so.id} value={so.id}>
                        {so.id} - {so.customer.nama} - Rp {so.total.toLocaleString("id-ID")}
                      </option>
                    ))}
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-sm text-blue-800">
                  <strong>Auto Generate:</strong> Invoice akan digenerate otomatis dari data Sales Order. Sistem akan
                  membuat jurnal piutang secara otomatis.
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg">
                  Batal
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Generate Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
