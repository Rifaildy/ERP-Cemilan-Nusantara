"use client"

import { useState } from "react"
import { jadwalJatuhTempo } from "../../data/keuangan"

export default function JadwalJatuhTempo() {
  const [schedules, setSchedules] = useState(jadwalJatuhTempo)
  const [filterType, setFilterType] = useState("All")

  const filteredSchedules = filterType === "All" ? schedules : schedules.filter((s) => s.tipe === filterType)

  const kasIn = schedules.filter((s) => s.kategori === "Cash In").reduce((sum, s) => sum + s.jumlah, 0)
  const kasOut = schedules.filter((s) => s.kategori === "Cash Out").reduce((sum, s) => sum + s.jumlah, 0)
  const netCashFlow = kasIn - kasOut

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kalender Jatuh Tempo</h1>
          <p className="text-gray-600">Monitor jadwal piutang & hutang dengan notifikasi otomatis</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Export Calendar</button>
      </div>

      {/* Cash Flow Projection */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="text-green-100 text-sm mb-1">Expected Cash In</div>
          <div className="text-3xl font-bold">Rp {kasIn.toLocaleString("id-ID")}</div>
          <div className="text-green-100 text-sm mt-2">
            {schedules.filter((s) => s.kategori === "Cash In").length} piutang
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow p-6 text-white">
          <div className="text-red-100 text-sm mb-1">Expected Cash Out</div>
          <div className="text-3xl font-bold">Rp {kasOut.toLocaleString("id-ID")}</div>
          <div className="text-red-100 text-sm mt-2">
            {schedules.filter((s) => s.kategori === "Cash Out").length} hutang
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="text-blue-100 text-sm mb-1">Net Cash Flow</div>
          <div className="text-3xl font-bold">Rp {netCashFlow.toLocaleString("id-ID")}</div>
          <div className="text-blue-100 text-sm mt-2">{netCashFlow > 0 ? "Surplus" : "Deficit"}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <div className="text-purple-100 text-sm mb-1">Total Items</div>
          <div className="text-3xl font-bold">{schedules.length}</div>
          <div className="text-purple-100 text-sm mt-2">Jatuh tempo mendatang</div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex gap-2">
          {["All", "Piutang", "Hutang"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === type ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline View */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Timeline Jatuh Tempo</h3>
        <div className="space-y-3">
          {filteredSchedules
            .sort((a, b) => new Date(a.jatuhTempo) - new Date(b.jatuhTempo))
            .map((schedule) => (
              <div
                key={schedule.id}
                className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                  schedule.kategori === "Cash In" ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{new Date(schedule.jatuhTempo).getDate()}</div>
                    <div className="text-xs text-gray-600">
                      {new Date(schedule.jatuhTempo).toLocaleDateString("id-ID", { month: "short" })}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          schedule.kategori === "Cash In" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {schedule.tipe}
                      </span>
                      <span className="font-medium text-gray-900">{schedule.referensi}</span>
                    </div>
                    <div className="text-sm text-gray-600">{schedule.pihak}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xl font-bold ${
                      schedule.kategori === "Cash In" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {schedule.kategori === "Cash In" ? "+" : "-"}Rp {schedule.jumlah.toLocaleString("id-ID")}
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-1">Set Reminder</button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl">🔔</span>
          <div className="text-sm text-blue-800">
            <strong>Notifikasi Otomatis:</strong> Sistem akan mengirim notifikasi H-7, H-3, dan H-1 sebelum jatuh tempo.
            Status akan otomatis update saat pembayaran dicatat.
          </div>
        </div>
      </div>
    </div>
  )
}
