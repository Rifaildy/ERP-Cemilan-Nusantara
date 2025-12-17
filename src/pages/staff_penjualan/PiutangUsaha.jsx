"use client"

import { useState } from "react"
import { piutang } from "../../data/penjualan"

export default function PiutangUsaha() {
  const [receivables, setReceivables] = useState(piutang)

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
          <h1 className="text-2xl font-bold text-gray-800">Piutang Usaha (Accounts Receivable)</h1>
          <p className="text-gray-600">Track dan kelola piutang customer secara terintegrasi</p>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2">
          <span>+</span>
          Catat Pembayaran
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Piutang</div>
          <div className="text-2xl font-bold text-gray-800">
            Rp {receivables.reduce((sum, r) => sum + r.totalPiutang, 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Terbayar</div>
          <div className="text-2xl font-bold text-green-600">
            Rp {receivables.reduce((sum, r) => sum + r.terbayar, 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Outstanding</div>
          <div className="text-2xl font-bold text-red-600">
            Rp {receivables.reduce((sum, r) => sum + r.sisa, 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total AR</div>
          <div className="text-2xl font-bold text-blue-600">{receivables.length}</div>
        </div>
      </div>

      {/* Aging Analysis */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Aging Analysis</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-green-700 font-medium mb-1">Current (0-30 days)</div>
            <div className="text-2xl font-bold text-green-600">
              Rp{" "}
              {receivables
                .filter((r) => r.umurPiutang <= 30)
                .reduce((sum, r) => sum + r.sisa, 0)
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
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID Piutang</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Invoice</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
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
            {receivables.map((ar) => (
              <tr key={ar.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{ar.id}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{ar.invoiceId}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="font-medium text-gray-900">{ar.customer.nama}</div>
                  <div className="text-gray-500">{ar.customer.tipe}</div>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  Rp {ar.totalPiutang.toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 text-sm text-green-600">Rp {ar.terbayar.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3 text-sm text-red-600">Rp {ar.sisa.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{ar.jatuhTempo}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{ar.umurPiutang} hari</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[ar.status]}`}>{ar.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">Bayar</button>
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
            <strong>Terintegrasi Otomatis:</strong> Data piutang diupdate otomatis dari invoice penjualan. Setiap
            pembayaran yang dicatat akan otomatis update status piutang dan membuat jurnal di modul akuntansi.
          </div>
        </div>
      </div>
    </div>
  )
}
