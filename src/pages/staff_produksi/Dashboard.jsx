import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, Factory, ClipboardList, Package, AlertCircle } from "lucide-react"
import { prosesProduksi } from "../../data/produksi"

const StaffProduksiDashboard = ({ setCurrentPage }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
    { icon: ClipboardList, label: "Pesanan Produksi", page: "pesanan-produksi" },
    { icon: Factory, label: "Proses Produksi", page: "proses-produksi" },
    { icon: Package, label: "Hasil Produksi", page: "hasil-produksi" },
  ]

  const todayProduction = prosesProduksi.filter((p) => p.status === "Dalam Proses")
  const totalTarget = todayProduction.reduce((sum, p) => sum + p.targetOutput, 0) || 5000
  const totalProgress = todayProduction.reduce((sum, p) => sum + (p.targetOutput * p.progressPersentase) / 100, 0)
  const progressPercentage = totalTarget > 0 ? Math.round((totalProgress / totalTarget) * 100) : 65

  const activeBatches = todayProduction.length || 3
  const activeMachines = 4

  return (
    <DashboardLayout menuItems={menuItems} currentPage="dashboard" setCurrentPage={setCurrentPage}>
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Staff Produksi</h1>
        <p className="text-yellow-100">Monitor dan input progres produksi harian</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Target Hari Ini"
          value={`${totalTarget.toLocaleString()} pcs`}
          sub="Keripik Singkong"
          color="blue"
          icon={Factory}
        />
        <StatCard
          title="Progres Produksi"
          value={`${progressPercentage}%`}
          sub={`${Math.round(totalProgress).toLocaleString()} / ${totalTarget.toLocaleString()} pcs`}
          color="green"
          icon={ClipboardList}
        />
        <StatCard
          title="Batch Aktif"
          value={`${activeBatches} Batch`}
          sub="Sedang diproses"
          color="orange"
          icon={Package}
        />
        <StatCard
          title="Mesin Beroperasi"
          value={`${activeMachines} / 5`}
          sub="1 Mesin maintenance"
          color="red"
          icon={AlertCircle}
        />
      </div>

      {/* Jadwal Produksi Hari Ini */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Jadwal Produksi Hari Ini</h3>
        <div className="space-y-4">
          {prosesProduksi.slice(0, 3).map((proses, idx) => (
            <div
              key={proses.id}
              className={`p-4 ${idx === 0 ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50 border-2 border-gray-200"} rounded-lg`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-bold ${idx === 0 ? "text-blue-900" : "text-gray-900"}`}>
                      {proses.id}: {proses.produkNama}
                    </h4>
                    {idx === 0 && (
                      <span className="px-2 py-0.5 bg-blue-200 text-blue-800 text-xs rounded font-medium">
                        Prioritas
                      </span>
                    )}
                    {proses.status === "Selesai" && (
                      <span className="px-2 py-0.5 bg-green-200 text-green-800 text-xs rounded font-medium">
                        Selesai
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${idx === 0 ? "text-blue-700" : "text-gray-700"}`}>
                    Batch #{proses.batchNumber} | Target: {proses.targetOutput} pcs | Estimasi: {proses.estimasiSelesai}
                  </p>
                  <p className={`text-xs ${idx === 0 ? "text-blue-600" : "text-gray-600"} mt-1`}>
                    Mesin: {proses.mesinDigunakan} | Operator: {proses.operatorNama}
                  </p>
                </div>
                <div className="flex gap-2">
                  {proses.status !== "Selesai" ? (
                    <button
                      className={`px-4 py-2 ${idx === 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"} text-white rounded-lg text-sm font-medium`}
                    >
                      Input Progres
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">
                      Lihat Detail
                    </button>
                  )}
                </div>
              </div>
              {proses.status !== "Selesai" && (
                <div className="space-y-1">
                  <div className={`flex justify-between text-xs ${idx === 0 ? "text-blue-800" : "text-gray-700"}`}>
                    <span>
                      Progres: {((proses.targetOutput * proses.progressPersentase) / 100).toFixed(0)} /{" "}
                      {proses.targetOutput} pcs
                    </span>
                    <span className="font-bold">{proses.progressPersentase}%</span>
                  </div>
                  <div className={`w-full ${idx === 0 ? "bg-blue-200" : "bg-gray-200"} rounded-full h-3`}>
                    <div
                      className={`${idx === 0 ? "bg-blue-600" : "bg-gray-600"} h-3 rounded-full transition-all`}
                      style={{ width: `${proses.progressPersentase}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Input Hasil Produksi Cepat */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Input Hasil Produksi</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SPK/Batch</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none">
              {prosesProduksi
                .filter((p) => p.status !== "Selesai")
                .map((proses) => (
                  <option key={proses.id} value={proses.id}>
                    {proses.id} ({proses.batchNumber})
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Selesai (pcs)</label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700">
              Simpan Progres
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default StaffProduksiDashboard
