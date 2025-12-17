"use client"

import { useState } from "react"
import { salesOrders, customers } from "../../data/penjualan"
import { laporanLabaRugi } from "../../data/akuntansi"
import { pesananProduksi } from "../../data/produksi"
import { stokBahan } from "../../data/inventory-bahan"

export default function AnalisisKinerja() {
  const [periode, setPeriode] = useState("Januari 2024")

  // Sales Analysis
  const totalRevenue = salesOrders.reduce((sum, so) => sum + so.total, 0)
  const avgOrderValue = totalRevenue / salesOrders.length
  const topCustomer = customers
    .map((cust) => {
      const custOrders = salesOrders.filter((so) => so.customer.id === cust.id)
      const total = custOrders.reduce((sum, so) => sum + so.total, 0)
      return { ...cust, total, orders: custOrders.length }
    })
    .sort((a, b) => b.total - a.total)[0]

  // Production Efficiency
  const completedProduction = pesananProduksi.filter((p) => p.status === "Completed")
  const productionEfficiency =
    completedProduction.length > 0
      ? (
          completedProduction.reduce((sum, p) => {
            const efficiency = (p.hasilQty / p.targetQty) * 100
            return sum + efficiency
          }, 0) / completedProduction.length
        ).toFixed(1)
      : 0

  // Profitability
  const grossMargin = ((laporanLabaRugi.labaKotor / laporanLabaRugi.pendapatan.total) * 100).toFixed(1)
  const netMargin = ((laporanLabaRugi.labaBersih / laporanLabaRugi.pendapatan.total) * 100).toFixed(1)
  const operatingMargin = ((laporanLabaRugi.labaOperasional / laporanLabaRugi.pendapatan.total) * 100).toFixed(1)

  // Inventory Turnover
  const avgInventory = stokBahan.reduce((sum, b) => sum + b.stok * b.hargaPerKg, 0)
  const inventoryTurnover = (laporanLabaRugi.hpp.bahanBaku / avgInventory).toFixed(2)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analisis Kinerja</h1>
          <p className="text-gray-600">KPI dan metrik kinerja perusahaan</p>
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
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Export Analysis</button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm mb-2">Gross Margin</div>
          <div className="text-3xl font-bold text-green-600">{grossMargin}%</div>
          <div className="text-sm text-gray-500 mt-1">Target: 45%</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm mb-2">Net Margin</div>
          <div className="text-3xl font-bold text-blue-600">{netMargin}%</div>
          <div className="text-sm text-gray-500 mt-1">Target: 3%</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm mb-2">Production Efficiency</div>
          <div className="text-3xl font-bold text-purple-600">{productionEfficiency}%</div>
          <div className="text-sm text-gray-500 mt-1">Target: 95%</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm mb-2">Inventory Turnover</div>
          <div className="text-3xl font-bold text-orange-600">{inventoryTurnover}x</div>
          <div className="text-sm text-gray-500 mt-1">Target: 6x</div>
        </div>
      </div>

      {/* Profitability Analysis */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Analisis Profitabilitas</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-center mb-3">
              <div className="text-gray-600 text-sm mb-1">Gross Profit Margin</div>
              <div className="text-4xl font-bold text-green-600">{grossMargin}%</div>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Revenue:</span>
                <span className="font-medium">Rp {laporanLabaRugi.pendapatan.total.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span>HPP:</span>
                <span className="font-medium text-red-600">
                  (Rp {laporanLabaRugi.hpp.total.toLocaleString("id-ID")})
                </span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-center mb-3">
              <div className="text-gray-600 text-sm mb-1">Operating Margin</div>
              <div className="text-4xl font-bold text-blue-600">{operatingMargin}%</div>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Laba Kotor:</span>
                <span className="font-medium">Rp {laporanLabaRugi.labaKotor.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span>Beban Op:</span>
                <span className="font-medium text-red-600">
                  (Rp {laporanLabaRugi.bebanOperasional.total.toLocaleString("id-ID")})
                </span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-center mb-3">
              <div className="text-gray-600 text-sm mb-1">Net Profit Margin</div>
              <div className="text-4xl font-bold text-purple-600">{netMargin}%</div>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Laba Op:</span>
                <span className="font-medium">Rp {laporanLabaRugi.labaOperasional.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span>Laba Bersih:</span>
                <span className="font-medium text-green-600">
                  Rp {laporanLabaRugi.labaBersih.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Performance */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Sales Performance</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Orders</span>
                <span className="text-2xl font-bold text-gray-900">{salesOrders.length}</span>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Avg Order Value</span>
                <span className="text-2xl font-bold text-gray-900">Rp {avgOrderValue.toLocaleString("id-ID")}</span>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-gray-600 mb-2">Top Customer</div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{topCustomer.nama}</div>
                  <div className="text-sm text-gray-500">{topCustomer.orders} orders</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">Rp {topCustomer.total.toLocaleString("id-ID")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Production Performance</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Production Orders</span>
                <span className="text-2xl font-bold text-gray-900">{pesananProduksi.length}</span>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Completed</span>
                <span className="text-2xl font-bold text-green-600">{completedProduction.length}</span>
              </div>
              <div className="text-sm text-gray-500">
                {((completedProduction.length / pesananProduksi.length) * 100).toFixed(1)}% completion rate
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Avg Efficiency</span>
                <span className="text-2xl font-bold text-purple-600">{productionEfficiency}%</span>
              </div>
              <div className="text-sm text-gray-500">Output vs target</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Structure */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Cost Structure Analysis</h3>
        <div className="space-y-3">
          {[
            { label: "Bahan Baku", value: laporanLabaRugi.hpp.bahanBaku, category: "HPP" },
            { label: "Tenaga Kerja Langsung", value: laporanLabaRugi.hpp.tenagaKerja, category: "HPP" },
            { label: "Overhead Pabrik", value: laporanLabaRugi.hpp.overhead, category: "HPP" },
            { label: "Gaji & Upah", value: laporanLabaRugi.bebanOperasional.gajiUpah, category: "Operasional" },
            {
              label: "Utilitas",
              value: laporanLabaRugi.bebanOperasional.listrik + laporanLabaRugi.bebanOperasional.air,
              category: "Operasional",
            },
            { label: "Marketing", value: laporanLabaRugi.bebanOperasional.marketing, category: "Operasional" },
            {
              label: "Lainnya",
              value:
                laporanLabaRugi.bebanOperasional.pengiriman +
                laporanLabaRugi.bebanOperasional.pemeliharaan +
                laporanLabaRugi.bebanOperasional.administrasi,
              category: "Operasional",
            },
          ].map((item) => {
            const totalCost = laporanLabaRugi.hpp.total + laporanLabaRugi.bebanOperasional.total
            const percentage = ((item.value / totalCost) * 100).toFixed(1)

            return (
              <div key={item.label} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium text-gray-900">{item.label}</span>
                    <span className="ml-2 text-xs text-gray-500">({item.category})</span>
                  </div>
                  <span className="font-bold text-gray-900">Rp {item.value.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 rounded-full h-2" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-12 text-right">{percentage}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
