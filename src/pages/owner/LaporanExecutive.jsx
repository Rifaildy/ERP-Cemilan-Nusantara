"use client"

import { useState } from "react"
import { salesOrders, invoices } from "../../data/penjualan"
import { laporanLabaRugi, neraca } from "../../data/akuntansi"
import { kasBank } from "../../data/keuangan"
import { purchaseOrders } from "../../data/inventory-bahan"
import { pesananProduksi } from "../../data/produksi"
import { produkJadi } from "../../data/inventory-produk"

export default function LaporanExecutive() {
  const [periode, setPeriode] = useState("Januari 2024")

  // Financial KPIs
  const revenue = laporanLabaRugi.pendapatan.total
  const grossProfit = laporanLabaRugi.labaKotor
  const netProfit = laporanLabaRugi.labaBersih
  const totalAssets = neraca.aset.totalAset
  const totalLiabilities = neraca.liabilitas.totalLiabilitas
  const totalEquity = neraca.ekuitas.totalEkuitas
  const cashBalance = kasBank.reduce((sum, acc) => sum + acc.saldo, 0)

  // Operational KPIs
  const totalOrders = salesOrders.length
  const totalProduction = pesananProduksi.length
  const totalPO = purchaseOrders.length
  const totalProducts = produkJadi.reduce((sum, p) => sum + p.stok, 0)

  // Ratios
  const grossProfitMargin = ((grossProfit / revenue) * 100).toFixed(1)
  const netProfitMargin = ((netProfit / revenue) * 100).toFixed(1)
  const debtToEquity = ((totalLiabilities / totalEquity) * 100).toFixed(1)
  const currentRatio = (neraca.aset.asetLancar.total / neraca.liabilitas.liabilitasJangkaPendek.total).toFixed(2)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Executive Dashboard</h1>
          <p className="text-gray-600">Ringkasan komprehensif kinerja perusahaan</p>
        </div>
        <div className="flex gap-2">
          <select
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option>Januari 2024</option>
            <option>Q1 2024</option>
            <option>2024</option>
          </select>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Export Report</button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="text-blue-100 text-sm mb-1">Revenue</div>
          <div className="text-3xl font-bold">Rp {revenue.toLocaleString("id-ID")}</div>
          <div className="text-blue-100 text-sm mt-2">Total Pendapatan</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="text-green-100 text-sm mb-1">Gross Profit</div>
          <div className="text-3xl font-bold">Rp {grossProfit.toLocaleString("id-ID")}</div>
          <div className="text-green-100 text-sm mt-2">{grossProfitMargin}% Margin</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <div className="text-purple-100 text-sm mb-1">Net Profit</div>
          <div className="text-3xl font-bold">Rp {netProfit.toLocaleString("id-ID")}</div>
          <div className="text-purple-100 text-sm mt-2">{netProfitMargin}% Margin</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
          <div className="text-orange-100 text-sm mb-1">Cash Balance</div>
          <div className="text-3xl font-bold">Rp {cashBalance.toLocaleString("id-ID")}</div>
          <div className="text-orange-100 text-sm mt-2">Kas & Bank</div>
        </div>
      </div>

      {/* Financial Position */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Posisi Keuangan</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700 font-medium">Total Aset</span>
              <span className="text-blue-600 font-bold">Rp {totalAssets.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-gray-700 font-medium">Total Liabilitas</span>
              <span className="text-red-600 font-bold">Rp {totalLiabilities.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-medium">Total Ekuitas</span>
              <span className="text-green-600 font-bold">Rp {totalEquity.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Operational Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Sales Orders</span>
              <span className="text-gray-900 font-bold">{totalOrders}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Production Orders</span>
              <span className="text-gray-900 font-bold">{totalProduction}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Purchase Orders</span>
              <span className="text-gray-900 font-bold">{totalPO}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Financial Ratios</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-sm">Gross Profit Margin</div>
              <div className="text-2xl font-bold text-gray-900">{grossProfitMargin}%</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-sm">Current Ratio</div>
              <div className="text-2xl font-bold text-gray-900">{currentRatio}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-sm">Debt to Equity</div>
              <div className="text-2xl font-bold text-gray-900">{debtToEquity}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Breakdown</h3>
          <div className="space-y-3">
            {["Distributor", "Toko Ritel", "Reseller"].map((type) => {
              const typeRevenue = salesOrders
                .filter((so) => so.customer.tipe === type)
                .reduce((sum, so) => sum + so.total, 0)
              const percentage = ((typeRevenue / revenue) * 100).toFixed(1)

              return (
                <div key={type} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">{type}</span>
                    <span className="text-gray-900 font-bold">Rp {typeRevenue.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 rounded-full h-2" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{percentage}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Expense Breakdown</h3>
          <div className="space-y-2">
            {[
              { label: "HPP", value: laporanLabaRugi.hpp.total, color: "red" },
              { label: "Gaji & Upah", value: laporanLabaRugi.bebanOperasional.gajiUpah, color: "blue" },
              {
                label: "Utilitas",
                value: laporanLabaRugi.bebanOperasional.listrik + laporanLabaRugi.bebanOperasional.air,
                color: "yellow",
              },
              { label: "Marketing", value: laporanLabaRugi.bebanOperasional.marketing, color: "purple" },
              {
                label: "Lainnya",
                value:
                  laporanLabaRugi.bebanOperasional.total -
                  laporanLabaRugi.bebanOperasional.gajiUpah -
                  laporanLabaRugi.bebanOperasional.marketing -
                  (laporanLabaRugi.bebanOperasional.listrik + laporanLabaRugi.bebanOperasional.air),
                color: "gray",
              },
            ].map((item) => {
              const totalExpense = laporanLabaRugi.hpp.total + laporanLabaRugi.bebanOperasional.total
              const percentage = ((item.value / totalExpense) * 100).toFixed(1)

              return (
                <div key={item.label} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">Rp {item.value.toLocaleString("id-ID")}</span>
                    <span className="text-xs text-gray-500">{percentage}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Performance Trend</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {[
            { bulan: "Jan", revenue: 122250000, profit: 2750000 },
            { bulan: "Feb", revenue: 0, profit: 0 },
            { bulan: "Mar", revenue: 0, profit: 0 },
          ].map((data) => {
            const maxRevenue = 122250000
            const revenueHeight = data.revenue > 0 ? (data.revenue / maxRevenue) * 100 : 0

            return (
              <div key={data.bulan} className="flex-1 flex flex-col items-center">
                <div className="w-full flex gap-1">
                  <div
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${revenueHeight}%`, minHeight: revenueHeight > 0 ? "20px" : "0" }}
                    title="Revenue"
                  ></div>
                </div>
                <div className="text-sm font-medium text-gray-700 mt-2">{data.bulan}</div>
                {data.revenue > 0 && (
                  <div className="text-xs text-gray-500 mt-1">{(data.revenue / 1000000).toFixed(0)}M</div>
                )}
              </div>
            )
          })}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-yellow-500 text-xl">⚠️</span>
            <div>
              <div className="font-bold text-yellow-800 mb-1">Attention Required</div>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 3 bahan baku akan kedaluwarsa dalam 30 hari</li>
                <li>
                  • Outstanding piutang: Rp {invoices.reduce((sum, i) => sum + i.sisa, 0).toLocaleString("id-ID")}
                </li>
                <li>• 5 invoice jatuh tempo minggu ini</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-green-500 text-xl">✓</span>
            <div>
              <div className="font-bold text-green-800 mb-1">System Health</div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Semua modul terintegrasi sempurna</li>
                <li>• Penjurnalan otomatis berjalan normal</li>
                <li>• Laporan real-time update</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
