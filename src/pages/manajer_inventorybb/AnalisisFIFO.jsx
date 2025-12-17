import { stokBahanBaku, bahanBaku } from "../../data/inventory-bahan"

export default function AnalisisFIFO() {
  // Group batches by material
  const materialBatches = bahanBaku
    .map((bahan) => {
      const batches = stokBahanBaku
        .filter((s) => s.bahanId === bahan.id)
        .sort((a, b) => new Date(a.tanggalMasuk) - new Date(b.tanggalMasuk))

      // Calculate days to expiry
      const today = new Date("2024-01-18")
      const batchesWithExpiry = batches.map((batch) => {
        const expiryDate = new Date(batch.tanggalKedaluwarsa)
        const daysToExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))

        let urgency = "Normal"
        if (daysToExpiry <= 3) urgency = "Sangat Urgent"
        else if (daysToExpiry <= 7) urgency = "Urgent"
        else if (daysToExpiry <= 14) urgency = "Perhatian"

        return {
          ...batch,
          daysToExpiry,
          urgency,
        }
      })

      return {
        ...bahan,
        batches: batchesWithExpiry,
        totalBatches: batches.length,
        oldestBatch: batchesWithExpiry[0],
      }
    })
    .filter((m) => m.totalBatches > 0)

  // Get urgent items
  const urgentItems = materialBatches
    .map((m) => ({
      ...m,
      urgentBatches: m.batches.filter((b) => b.urgency === "Sangat Urgent" || b.urgency === "Urgent"),
    }))
    .filter((m) => m.urgentBatches.length > 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analisis FIFO/FEFO</h1>
        <p className="mt-2 text-gray-600">
          Monitoring penggunaan bahan baku dengan sistem First In First Out / First Expired First Out
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Bahan</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{materialBatches.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Total Batch</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">
            {materialBatches.reduce((sum, m) => sum + m.totalBatches, 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Batch Urgent</div>
          <div className="mt-2 text-3xl font-bold text-red-600">
            {urgentItems.reduce((sum, m) => sum + m.urgentBatches.length, 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">Perlu Perhatian</div>
          <div className="mt-2 text-3xl font-bold text-yellow-600">
            {materialBatches.filter((m) => m.batches.some((b) => b.urgency === "Perhatian")).length}
          </div>
        </div>
      </div>

      {/* Urgent Alert */}
      {urgentItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-900 mb-4">Peringatan: Batch Mendekati Kedaluwarsa</h3>
          <div className="space-y-3">
            {urgentItems.map((item) =>
              item.urgentBatches.map((batch) => (
                <div key={batch.batch} className="bg-white border border-red-300 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-gray-900">{item.nama}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Batch: {batch.batch} | Lokasi: {batch.lokasiGudang}
                      </div>
                      <div className="text-sm text-gray-600">
                        Stok: {batch.stok.toLocaleString("id-ID")} {item.satuan}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          batch.urgency === "Sangat Urgent" ? "bg-red-500 text-white" : "bg-red-400 text-white"
                        }`}
                      >
                        {batch.urgency}
                      </div>
                      <div className="mt-2 text-2xl font-bold text-red-600">{batch.daysToExpiry} hari</div>
                      <div className="text-xs text-gray-500">Exp: {batch.tanggalKedaluwarsa}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 font-medium">
                      Prioritaskan Produksi
                    </button>
                    <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 font-medium">
                      Notifikasi Produksi
                    </button>
                  </div>
                </div>
              )),
            )}
          </div>
        </div>
      )}

      {/* FIFO Analysis per Material */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Analisis per Bahan Baku</h3>
        {materialBatches.map((material) => (
          <div key={material.id} className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{material.nama}</h4>
                  <p className="text-sm text-gray-600">{material.kategori}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Total Batch</div>
                  <div className="text-2xl font-bold text-gray-900">{material.totalBatches}</div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioritas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lokasi</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stok</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Masuk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kedaluwarsa</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Sisa Hari</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {material.batches.map((batch, idx) => (
                    <tr
                      key={batch.batch}
                      className={
                        batch.urgency === "Sangat Urgent"
                          ? "bg-red-50"
                          : batch.urgency === "Urgent"
                            ? "bg-orange-50"
                            : batch.urgency === "Perhatian"
                              ? "bg-yellow-50"
                              : "bg-white"
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-lg font-bold text-gray-900">#{idx + 1}</div>
                          {idx === 0 && (
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">
                              GUNAKAN DULU
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{batch.batch}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{batch.lokasiGudang}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                        {batch.stok.toLocaleString("id-ID")} {material.satuan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{batch.tanggalMasuk}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{batch.tanggalKedaluwarsa}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`text-lg font-bold ${
                            batch.daysToExpiry <= 3
                              ? "text-red-600"
                              : batch.daysToExpiry <= 7
                                ? "text-orange-600"
                                : batch.daysToExpiry <= 14
                                  ? "text-yellow-600"
                                  : "text-green-600"
                          }`}
                        >
                          {batch.daysToExpiry}
                        </span>
                        <div className="text-xs text-gray-500">hari</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            batch.urgency === "Sangat Urgent"
                              ? "bg-red-500 text-white"
                              : batch.urgency === "Urgent"
                                ? "bg-orange-500 text-white"
                                : batch.urgency === "Perhatian"
                                  ? "bg-yellow-500 text-white"
                                  : "bg-green-500 text-white"
                          }`}
                        >
                          {batch.urgency}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
