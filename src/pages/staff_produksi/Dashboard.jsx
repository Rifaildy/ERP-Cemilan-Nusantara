import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, Factory, ClipboardList, Package, AlertCircle } from "lucide-react"

const StaffProduksiDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: ClipboardList, label: "Jadwal Produksi", active: false },
    { icon: Package, label: "Permintaan Bahan", active: false },
    { icon: Factory, label: "Input Hasil Produksi", active: false },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Staff Produksi</h1>
        <p className="text-yellow-100">Monitor dan input progres produksi harian</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Target Hari Ini" value="5.000 pcs" sub="Keripik Singkong" color="blue" icon={Factory} />
        <StatCard title="Progres Produksi" value="65%" sub="3.250 / 5.000 pcs" color="green" icon={ClipboardList} />
        <StatCard title="Batch Aktif" value="3 Batch" sub="Sedang diproses" color="orange" icon={Package} />
        <StatCard title="Mesin Beroperasi" value="4 / 5" sub="1 Mesin maintenance" color="red" icon={AlertCircle} />
      </div>

      {/* Jadwal Produksi Hari Ini */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Jadwal Produksi Hari Ini</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-blue-900">SPK-2025-001: Keripik Singkong Pedas</h4>
                  <span className="px-2 py-0.5 bg-blue-200 text-blue-800 text-xs rounded font-medium">Prioritas</span>
                </div>
                <p className="text-sm text-blue-700">Batch #B2910 | Target: 2.000 pcs | Deadline: 14:00 WIB</p>
                <p className="text-xs text-blue-600 mt-1">Mesin: Line 1 & 2 | Operator: Tim A</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  Input Progres
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-blue-800">
                <span>Progres: 1.300 / 2.000 pcs</span>
                <span className="font-bold">65%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: "65%" }}></div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">SPK-2025-002: Keripik Pisang Keju</h4>
                <p className="text-sm text-gray-700">Batch #B2911 | Target: 1.500 pcs | Deadline: 16:00 WIB</p>
                <p className="text-xs text-gray-600 mt-1">Mesin: Line 3 | Operator: Tim B</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700">
                  Input Progres
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-700">
                <span>Progres: 450 / 1.500 pcs</span>
                <span className="font-bold">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gray-600 h-3 rounded-full transition-all" style={{ width: "30%" }}></div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-green-900">SPK-2025-003: Keripik Singkong Original</h4>
                  <span className="px-2 py-0.5 bg-green-200 text-green-800 text-xs rounded font-medium">Selesai</span>
                </div>
                <p className="text-sm text-green-700">Batch #B2909 | Target: 1.500 pcs</p>
                <p className="text-xs text-green-600 mt-1">Selesai: 10:30 WIB | QC: Lolos</p>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">Lihat Detail</button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Input Hasil Produksi Cepat */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Input Hasil Produksi</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SPK/Batch</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none">
              <option>SPK-2025-001 (B2910)</option>
              <option>SPK-2025-002 (B2911)</option>
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
