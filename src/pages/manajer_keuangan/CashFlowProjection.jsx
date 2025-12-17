"use client"

import { useState } from "react"
import { kasBank, arusKasMasuk, arusKasKeluar, jadwalJatuhTempo } from "../../data/keuangan"

export default function CashFlowProjection() {
  const [periode, setPeriode] = useState("Februari 2024")

  const currentBalance = kasBank.reduce((sum, acc) => sum + acc.saldo, 0)
  const expectedIn = jadwalJatuhTempo.filter((s) => s.kategori === "Cash In").reduce((sum, s) => sum + s.jumlah, 0)
  const expectedOut = jadwalJatuhTempo.filter((s) => s.kategori === "Cash Out").reduce((sum, s) => sum + s.jumlah, 0)
  const projectedBalance = currentBalance + expectedIn - expectedOut

  // Historical data
  const historicalCashIn = arusKasMasuk.reduce((sum, k) => sum + k.jumlah, 0)
  const historicalCashOut = arusKasKeluar.reduce((sum, k) => sum + k.jumlah, 0)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cash Flow Projection</h1>
          <p className="text-gray-600">Proyeksi arus kas dan analisis likuiditas</p>
        </div>
        <div className="flex gap-2">
          <select
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option>Februari 2024</option>
            <option>Maret 2024</option>
            <option>Q1 2024</option>
          </select>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Export Report</button>
        </div>
      </div>

      {/* Projection Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm mb-1">Saldo Saat Ini</div>
          <div className="text-2xl font-bold text-gray-900">Rp {currentBalance.toLocaleString("id-ID")}</div>
          <div className="text-sm text-gray-500 mt-1">Real-time balance</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm mb-1">Expected Cash In</div>
          <div className="text-2xl font-bold text-green-600">+Rp {expectedIn.toLocaleString("id-ID")}</div>
          <div className="text-sm text-gray-500 mt-1">From receivables</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm mb-1">Expected Cash Out</div>
          <div className="text-2xl font-bold text-red-600">-Rp {expectedOut.toLocaleString("id-ID")}</div>
          <div className="text-sm text-gray-500 mt-1">From payables</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="text-blue-100 text-sm mb-1">Projected Balance</div>
          <div className="text-2xl font-bold">Rp {projectedBalance.toLocaleString("id-ID")}</div>
          <div className="text-blue-100 text-sm mt-1">
            {projectedBalance > currentBalance ? "↑ Increase" : "↓ Decrease"}
          </div>
        </div>
      </div>

      {/* Historical vs Projection */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Historical vs Projection</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-medium text-gray-600 mb-3">Januari 2024 (Actual)</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-gray-700">Cash In</span>
                <span className="font-bold text-green-600">Rp {historicalCashIn.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm text-gray-700">Cash Out</span>
                <span className="font-bold text-red-600">Rp {historicalCashOut.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                <span className="text-sm font-medium text-gray-700">Net Cash Flow</span>
                <span className="font-bold text-blue-600">
                  Rp {(historicalCashIn - historicalCashOut).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-600 mb-3">{periode} (Projected)</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-gray-700">Cash In</span>
                <span className="font-bold text-green-600">Rp {expectedIn.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm text-gray-700">Cash Out</span>
                <span className="font-bold text-red-600">Rp {expectedOut.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                <span className="text-sm font-medium text-gray-700">Net Cash Flow</span>
                <span className="font-bold text-blue-600">Rp {(expectedIn - expectedOut).toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Proyeksi Mingguan</h3>
        <div className="space-y-4">
          {[
            { minggu: "Minggu 1 (1-7 Feb)", in: 15000000, out: 20000000 },
            { minggu: "Minggu 2 (8-14 Feb)", in: 23500000, out: 12500000 },
            { minggu: "Minggu 3 (15-21 Feb)", in: 28000000, out: 18000000 },
            { minggu: "Minggu 4 (22-28 Feb)", in: 31920000, out: 8500000 },
          ].map((week, idx) => {
            const netFlow = week.in - week.out
            return (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-3">{week.minggu}</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Cash In</div>
                    <div className="text-lg font-bold text-green-600">Rp {week.in.toLocaleString("id-ID")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Cash Out</div>
                    <div className="text-lg font-bold text-red-600">Rp {week.out.toLocaleString("id-ID")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Net Flow</div>
                    <div className={`text-lg font-bold ${netFlow > 0 ? "text-blue-600" : "text-orange-600"}`}>
                      {netFlow > 0 ? "+" : ""}Rp {netFlow.toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Liquidity Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-yellow-500 text-xl">⚠️</span>
          <div className="text-sm text-yellow-800">
            <strong>Liquidity Alert:</strong> Minggu 1 Februari menunjukkan net cash flow negatif. Pertimbangkan untuk
            mengatur ulang jadwal pembayaran hutang atau mempercepat penagihan piutang.
          </div>
        </div>
      </div>
    </div>
  )
}
