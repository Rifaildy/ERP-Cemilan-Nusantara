"use client"

import { useState } from "react"
import { salesOrders, customers, invoices } from "../../data/penjualan"

export default function LaporanPenjualan() {
  const [periode, setPeriode] = useState("Januari 2024")

  // Calculate metrics
  const totalPenjualan = salesOrders.reduce((sum, so) => sum + so.total, 0)
  const totalInvoice = invoices.reduce((sum, inv) => inv.total, 0)
  const totalTerbayar = invoices.reduce((sum, inv) => sum + inv.dibayar, 0)
  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.sisa, 0)

  // Top customers
  const customerSales = customers
    .map((cust) => {
      const custOrders = salesOrders.filter((so) => so.customer.id === cust.id)
      const total = custOrders.reduce((sum, so) => sum + so.total, 0)
      return { ...cust, totalPenjualan: total, jumlahOrder: custOrders.length }
    })
    .filter((c) => c.totalPenjualan > 0)
    .sort((a, b) => b.totalPenjualan - a.totalPenjualan)
    .slice(0, 5)

  // Product performance
  const productSales = {}
  salesOrders.forEach((so) => {
    so.items.forEach((item) => {
      if (!productSales[item.produk]) {
        productSales[item.produk] = { qty: 0, total: 0 }
      }
      productSales[item.produk].qty += item.qty
      productSales[item.produk].total += item.subtotal
    })
  })

  const topProducts = Object.entries(productSales)
    .map(([produk, data]) => ({ produk, ...data }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Laporan Penjualan</h1>
          <p className="text-gray-600">Analisis kinerja penjualan dan customer</p>
        </div>
        <div className="flex gap-2">
          <select
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option>Januari 2024</option>
            <option>Februari 2024</option>
            <option>Q1 2024</option>
          </select>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Export Excel</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="text-blue-100 text-sm mb-1">Total Penjualan</div>
          <div className="text-3xl font-bold">Rp {totalPenjualan.toLocaleString("id-ID")}</div>
          <div className="text-blue-100 text-sm mt-2">+12% vs bulan lalu</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="text-green-100 text-sm mb-1">Total Terbayar</div>
          <div className="text-3xl font-bold">Rp {totalTerbayar.toLocaleString("id-ID")}</div>
          <div className="text-green-100 text-sm mt-2">
            {((totalTerbayar / totalPenjualan) * 100).toFixed(1)}% collection rate
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
          <div className="text-orange-100 text-sm mb-1">Outstanding</div>
          <div className="text-3xl font-bold">Rp {totalOutstanding.toLocaleString("id-ID")}</div>
          <div className="text-orange-100 text-sm mt-2">
            {((totalOutstanding / totalPenjualan) * 100).toFixed(1)}% unpaid
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <div className="text-purple-100 text-sm mb-1">Total Orders</div>
          <div className="text-3xl font-bold">{salesOrders.length}</div>
          <div className="text-purple-100 text-sm mt-2">
            Rata-rata: Rp {(totalPenjualan / salesOrders.length).toLocaleString("id-ID")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Top Customers */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top 5 Customer</h3>
          <div className="space-y-3">
            {customerSales.map((cust, idx) => (
              <div key={cust.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{cust.nama}</div>
                    <div className="text-sm text-gray-500">{cust.jumlahOrder} orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">Rp {cust.totalPenjualan.toLocaleString("id-ID")}</div>
                  <div className="text-sm text-gray-500">{cust.tipe}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top 5 Produk Terlaris</h3>
          <div className="space-y-3">
            {topProducts.map((prod, idx) => (
              <div key={prod.produk} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{prod.produk}</div>
                    <div className="text-sm text-gray-500">{prod.qty} pcs terjual</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">Rp {prod.total.toLocaleString("id-ID")}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales by Type */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Penjualan per Tipe Customer</h3>
        <div className="grid grid-cols-3 gap-4">
          {["Distributor", "Toko Ritel", "Reseller"].map((tipe) => {
            const typeOrders = salesOrders.filter((so) => so.customer.tipe === tipe)
            const typeTotal = typeOrders.reduce((sum, so) => sum + so.total, 0)
            const percentage = ((typeTotal / totalPenjualan) * 100).toFixed(1)

            return (
              <div key={tipe} className="border border-gray-200 rounded-lg p-4">
                <div className="text-gray-600 text-sm mb-2">{tipe}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">Rp {typeTotal.toLocaleString("id-ID")}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 rounded-full h-2" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{percentage}%</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">{typeOrders.length} orders</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Tren Penjualan Bulanan</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {[
            { bulan: "Jan", nilai: 122250000 },
            { bulan: "Feb", nilai: 0 },
            { bulan: "Mar", nilai: 0 },
          ].map((data) => {
            const height = data.nilai > 0 ? (data.nilai / 122250000) * 100 : 0
            return (
              <div key={data.bulan} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-orange-500 rounded-t"
                  style={{ height: `${height}%`, minHeight: height > 0 ? "20px" : "0" }}
                >
                  {data.nilai > 0 && (
                    <div className="text-xs text-white font-medium p-1 text-center">
                      {(data.nilai / 1000000).toFixed(0)}M
                    </div>
                  )}
                </div>
                <div className="text-sm font-medium text-gray-700 mt-2">{data.bulan}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
