"use client"

import { useState } from "react"
import { jurnalUmum } from "../../data/akuntansi"

export default function JurnalUmum() {
  const [journals, setJournals] = useState(jurnalUmum)
  const [showDetail, setShowDetail] = useState(null)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Jurnal Umum (General Journal)</h1>
          <p className="text-gray-600">Penjurnalan otomatis dari semua transaksi modul</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Filter Periode</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Export Excel</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Jurnal</div>
          <div className="text-2xl font-bold text-gray-800">{journals.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Debit</div>
          <div className="text-2xl font-bold text-blue-600">
            Rp {journals.reduce((sum, j) => sum + j.totalDebit, 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Kredit</div>
          <div className="text-2xl font-bold text-green-600">
            Rp {journals.reduce((sum, j) => sum + j.totalKredit, 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Status</div>
          <div className="text-2xl font-bold text-green-600">Balanced</div>
        </div>
      </div>

      {/* Journal Entries */}
      <div className="space-y-4">
        {journals.map((journal) => (
          <div key={journal.id} className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">{journal.id}</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{journal.status}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {journal.tanggal} • Ref: {journal.referensi}
                  </div>
                  <div className="text-sm text-gray-900 mt-1">{journal.deskripsi}</div>
                </div>
                <button
                  onClick={() => setShowDetail(showDetail === journal.id ? null : journal.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {showDetail === journal.id ? "Hide" : "Show"} Detail
                </button>
              </div>
            </div>

            {showDetail === journal.id && (
              <div className="p-4">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Kode Akun</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Nama Akun</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700">Debit</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700">Kredit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {journal.entries.map((entry, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-sm text-gray-600">{entry.akun}</td>
                        <td className="px-3 py-2 text-sm text-gray-900">{entry.namaAkun}</td>
                        <td className="px-3 py-2 text-sm text-right">
                          {entry.debit > 0 ? (
                            <span className="text-blue-600 font-medium">Rp {entry.debit.toLocaleString("id-ID")}</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-sm text-right">
                          {entry.kredit > 0 ? (
                            <span className="text-green-600 font-medium">
                              Rp {entry.kredit.toLocaleString("id-ID")}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-bold">
                      <td colSpan="2" className="px-3 py-2 text-sm text-gray-900">
                        Total
                      </td>
                      <td className="px-3 py-2 text-sm text-right text-blue-600">
                        Rp {journal.totalDebit.toLocaleString("id-ID")}
                      </td>
                      <td className="px-3 py-2 text-sm text-right text-green-600">
                        Rp {journal.totalKredit.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Auto Journal Info */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-green-500 text-xl">🤖</span>
          <div className="text-sm text-green-800">
            <strong>Penjurnalan Otomatis:</strong> Semua jurnal dibuat otomatis dari transaksi di modul lain:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Penjualan → Piutang & Pendapatan</li>
              <li>Pembelian → Persediaan & Hutang</li>
              <li>Pembayaran → Kas/Bank</li>
              <li>Produksi → HPP & Persediaan</li>
              <li>Biaya → Beban Operasional</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
