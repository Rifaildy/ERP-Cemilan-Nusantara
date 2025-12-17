"use client"

import { useState } from "react"
import { penerimaanBahan, purchaseOrders, bahanBaku, suppliers } from "../../data/inventory-bahan"

export default function PenerimaanBahan() {
  const [selectedRcv, setSelectedRcv] = useState(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Penerimaan Bahan</h1>
        <p className="mt-2 text-gray-600">Kelola penerimaan bahan baku dari supplier dengan verifikasi kualitas</p>
      </div>

      {/* List Penerimaan */}
      <div className="grid grid-cols-1 gap-6">
        {penerimaanBahan.map((rcv) => {
          const po = purchaseOrders.find((p) => p.id === rcv.poId)
          const supplier = suppliers.find((s) => s.id === rcv.diterimaDari)

          return (
            <div key={rcv.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-gray-900">{rcv.id}</h3>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        {rcv.status}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-600">
                      PO: {rcv.poId} - {supplier?.nama}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Tanggal Terima</div>
                    <div className="text-lg font-bold text-gray-900">{rcv.tanggalTerima}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500">PIC Penerima</div>
                    <div className="text-sm font-medium text-gray-900">{rcv.picPenerima}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Total Item</div>
                    <div className="text-sm font-medium text-gray-900">{rcv.items.length} items</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Status</div>
                    <div className="text-sm font-medium text-green-600">{rcv.status}</div>
                  </div>
                </div>

                {/* Item Detail dengan Quality Check */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Detail Penerimaan & Quality Check:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Bahan</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Batch</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Qty PO</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Diterima</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Reject</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {rcv.items.map((item, idx) => {
                          const bahan = bahanBaku.find((b) => b.id === item.bahanId)
                          const isRejected = item.qtyRejected > 0

                          return (
                            <tr key={idx} className={isRejected ? "bg-red-50" : "bg-white"}>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {bahan?.nama}
                                <div className="text-xs text-gray-500">{item.bahanId}</div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">{item.batch}</td>
                              <td className="px-4 py-3 text-sm text-right font-medium">
                                {item.qtyPO.toLocaleString("id-ID")}
                              </td>
                              <td className="px-4 py-3 text-sm text-right font-semibold text-green-600">
                                {item.qtyDiterima.toLocaleString("id-ID")}
                              </td>
                              <td className="px-4 py-3 text-sm text-right font-semibold text-red-600">
                                {item.qtyRejected > 0 ? item.qtyRejected.toLocaleString("id-ID") : "-"}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <span className={`${isRejected ? "text-red-700 font-medium" : "text-gray-600"}`}>
                                  {item.keterangan}
                                </span>
                              </td>
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
                    Cetak Laporan
                  </button>
                  <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
                    Update Stok
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
          <div className="text-sm font-medium text-gray-600">Total Penerimaan</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{penerimaanBahan.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Selesai Diverifikasi</div>
          <div className="mt-2 text-3xl font-bold text-green-600">
            {penerimaanBahan.filter((r) => r.status === "Selesai").length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Ada Reject</div>
          <div className="mt-2 text-3xl font-bold text-red-600">
            {penerimaanBahan.filter((r) => r.items.some((i) => i.qtyRejected > 0)).length}
          </div>
        </div>
      </div>
    </div>
  )
}
