"use client"

import { useState } from "react"
import { resepProduk } from "../../data/produksi"
import { bahanBaku as bahanBakuData } from "../../data/inventory-bahan"

export default function ResepProduk() {
  const [selectedResep, setSelectedResep] = useState(null)
  const [filterKategori, setFilterKategori] = useState("Semua")

  const filteredResep = resepProduk.filter((resep) => {
    if (filterKategori === "Semua") return true
    return resep.kategori === filterKategori
  })

  const kategoriList = ["Semua", ...new Set(resepProduk.map((r) => r.kategori))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resep Produk</h1>
          <p className="mt-2 text-gray-600">Master resep/formula standar untuk setiap produk</p>
        </div>
        <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
          + Tambah Resep Baru
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter Kategori:</label>
          <div className="flex space-x-2">
            {kategoriList.map((kat) => (
              <button
                key={kat}
                onClick={() => setFilterKategori(kat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filterKategori === kat ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resep Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredResep.map((resep) => {
          const margin = resep.hargaJual - resep.hpp
          const marginPersentase = ((margin / resep.hargaJual) * 100).toFixed(1)

          return (
            <div key={resep.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-gray-900">{resep.namaProduk}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {resep.kategori}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Kode: {resep.kodeProduk} | ID Resep: {resep.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Output per Batch</div>
                    <div className="text-3xl font-bold text-orange-600">{resep.outputPerBatch}</div>
                    <div className="text-xs text-gray-500">pcs</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600">HPP per Unit</div>
                    <div className="text-lg font-bold text-orange-600">Rp {resep.hpp.toLocaleString("id-ID")}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600">Harga Jual</div>
                    <div className="text-lg font-bold text-green-600">Rp {resep.hargaJual.toLocaleString("id-ID")}</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600">Margin</div>
                    <div className="text-lg font-bold text-blue-600">
                      Rp {margin.toLocaleString("id-ID")} ({marginPersentase}%)
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600">Waktu Produksi</div>
                    <div className="text-lg font-bold text-gray-900">{resep.waktuProduksi} menit</div>
                  </div>
                </div>

                {/* Komposisi/Formula */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Komposisi / Formula:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Bahan</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Qty</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Satuan</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {resep.komposisi.map((komp, idx) => {
                          const bahan = bahanBakuData.find((b) => b.id === komp.bahanId)
                          return (
                            <tr key={idx} className="bg-white">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {bahan?.nama || "Produk Jadi"}
                                <div className="text-xs text-gray-500">{komp.bahanId || komp.produkId}</div>
                              </td>
                              <td className="px-4 py-3 text-sm text-right font-semibold">{komp.qty}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{komp.satuan}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{komp.keterangan || "-"}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-4">
                  <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                    Edit Resep
                  </button>
                  <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
                    Hitung Kebutuhan Bahan
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                    Buat Pesanan Produksi
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Resep</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{resepProduk.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Rata-rata HPP</div>
          <div className="mt-2 text-2xl font-bold text-orange-600">
            Rp {(resepProduk.reduce((sum, r) => sum + r.hpp, 0) / resepProduk.length).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Rata-rata Margin</div>
          <div className="mt-2 text-3xl font-bold text-green-600">
            {(
              (resepProduk.reduce((sum, r) => sum + ((r.hargaJual - r.hpp) / r.hargaJual) * 100, 0) /
                resepProduk.length) *
              1
            ).toFixed(1)}
            %
          </div>
        </div>
      </div>
    </div>
  )
}
