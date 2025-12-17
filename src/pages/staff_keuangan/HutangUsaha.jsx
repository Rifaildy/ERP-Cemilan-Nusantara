"use client"

import { useState } from "react"
import { hutangUsaha } from "../../data/keuangan"

export default function HutangUsaha() {
  const [payables, setPayables] = useState(hutangUsaha)

  const statusColors = {
    Current: "bg-green-100 text-green-800",
    "30 Days": "bg-yellow-100 text-yellow-800",
    "60 Days": "bg-orange-100 text-orange-800",
    "90+ Days": "bg-red-100 text-red-800",
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hutang Usaha (Accounts Payable)</h1>
          <p className="text-gray-600">Kelola hutang supplier terintegrasi dengan pembelian</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <span>+</span>
          Catat Pembayaran
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Hutang</div>
          <div className="text-2xl font-bold text-gray-800">
            Rp {payables.reduce((sum, p) => sum + p.totalHutang, 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Terbayar</div>
          <div className="text-2xl font-bold text-green-600">
            Rp {payables.reduce((sum, p) => sum + p.terbayar, 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Outstanding</div>
          <div className="text-2xl font-bold text-red-600">
            Rp {payables.reduce((sum, p) => sum + p.sisa, 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total AP</div>
          <div className="text-2xl font-bold text-blue-600">{payables.length}</div>
        </div>
      </div>

      {/* Aging Analysis */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Aging Analysis Hutang</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-green-700 font-medium mb-1">Current (0-30 days)</div>
            <div className="text-2xl font-bold text-green-600">
              Rp{" "}
              {payables
                .filter((p) => p.umurHutang <= 30)
                .reduce((sum, p) => sum + p.sisa, 0)
                .toLocaleString("id-ID")}
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-yellow-700 font-medium mb-1">31-60 days</div>
            <div className="text-2xl font-bold text-yellow-600">Rp 0</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="text-orange-700 font-medium mb-1">61-90 days</div>
            <div className="text-2xl font-bold text-orange-600">Rp 0</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-700 font-medium mb-1">90+ days</div>
            <div className="text-2xl font-bold text-red-600">Rp 0</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID Hutang</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Referensi PO</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Supplier</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Terbayar</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sisa</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Jatuh Tempo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Umur</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payables.map((ap) => (
              <tr key={ap.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{ap.id}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{ap.referensi}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{ap.supplier}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  Rp {ap.totalHutang.toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 text-sm text-green-600">Rp {ap.terbayar.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3 text-sm text-red-600">Rp {ap.sisa.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{ap.jatuhTempo}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{ap.umurHutang} hari</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[ap.status]}`}>{ap.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Bayar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Integration Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl">🔄</span>
          <div className="text-sm text-blue-800">
            <strong>Terintegrasi Otomatis:</strong> Hutang usaha tercatat otomatis dari PO yang dibuat di modul
            inventory bahan baku. Retur bahan juga otomatis mengurangi hutang. Setiap pembayaran akan update jurnal
            akuntansi.
          </div>
        </div>
      </div>
    </div>
  )
}
