"use client"

import { useState } from "react"
import { prosesProduksi, pesananProduksi, resepProduk } from "../../data/produksi"
import DashboardLayout from "../../components/DashboardLayout"
import { LayoutDashboard, Factory, ClipboardList, Package } from "lucide-react"

export default function ProsesProduksi({ setCurrentPage, currentPage }) {
  const [selectedProses, setSelectedProses] = useState(null)

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
    { icon: ClipboardList, label: "Pesanan Produksi", page: "pesanan-produksi" },
    { icon: Factory, label: "Proses Produksi", page: "proses-produksi" },
    { icon: Package, label: "Hasil Produksi", page: "hasil-produksi" },
  ]

  return (
    <DashboardLayout menuItems={menuItems} currentPage={currentPage} setCurrentPage={setCurrentPage}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proses Produksi</h1>
          <p className="mt-2 text-gray-600">Monitoring real-time proses produksi dengan tracking batch number</p>
        </div>

        {/* Active Production */}
        <div className="space-y-6">
          {prosesProduksi.map((proses) => {
            const pesanan = pesananProduksi.find((p) => p.id === proses.pesananId)
            const resep = resepProduk.find((r) => r.id === proses.resepId)

            return (
              <div key={proses.id} className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-bold text-gray-900">{proses.id}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            proses.status === "Dalam Proses"
                              ? "bg-blue-100 text-blue-800"
                              : proses.status === "Selesai"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {proses.status}
                        </span>
                      </div>
                      <p className="mt-1 text-lg font-medium text-gray-700">{resep?.namaProduk}</p>
                      <p className="text-sm text-gray-500">Batch: {proses.batchNumber}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Progress</div>
                      <div className="text-4xl font-bold text-blue-600">{proses.progressPersentase}%</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${proses.progressPersentase}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500">Mulai Produksi</div>
                      <div className="text-sm font-medium text-gray-900">{proses.tanggalMulai}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Estimasi Selesai</div>
                      <div className="text-sm font-medium text-gray-900">
                        {proses.estimasiSelesai || proses.tanggalSelesai}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Operator</div>
                      <div className="text-sm font-medium text-gray-900">{proses.operatorNama}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Mesin</div>
                      <div className="text-sm font-medium text-gray-900">{proses.mesinDigunakan}</div>
                    </div>
                  </div>

                  {/* QC Status for completed */}
                  {proses.status === "Selesai" && (
                    <div className="border-t pt-4 mb-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-600">Output Aktual</div>
                          <div className="text-2xl font-bold text-green-600">{proses.outputAktual}</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-600">QC Status</div>
                          <div className="text-lg font-bold text-blue-600">{proses.qcStatus}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-600">Selesai</div>
                          <div className="text-sm font-medium text-gray-900">{proses.tanggalSelesai}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Catatan */}
                  {proses.catatan && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs font-medium text-gray-700">Catatan Produksi:</div>
                      <div className="text-sm text-gray-900 mt-1">{proses.catatan}</div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-4">
                    {proses.status === "Dalam Proses" && (
                      <>
                        <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
                          Update Progress
                        </button>
                        <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                          Selesai & QC
                        </button>
                        <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                          Tambah Catatan
                        </button>
                      </>
                    )}
                    {proses.status === "Selesai" && (
                      <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                        Pindahkan ke Gudang
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Total Proses</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{prosesProduksi.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Dalam Proses</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">
              {prosesProduksi.filter((p) => p.status === "Dalam Proses").length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Selesai Hari Ini</div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              {prosesProduksi.filter((p) => p.status === "Selesai").length}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
