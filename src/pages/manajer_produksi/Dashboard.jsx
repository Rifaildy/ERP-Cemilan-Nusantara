import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, Factory, BarChart3, Settings, FileText, Lightbulb } from "lucide-react"

const ManajerProduksiDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: BarChart3, label: "Laporan Produksi", active: false },
    { icon: Lightbulb, label: "Simulasi Kapasitas", active: false },
    { icon: FileText, label: "Formula & Resep", active: false },
    { icon: Settings, label: "Master Data Produk", active: false },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Manajer Produksi</h1>
        <p className="text-amber-100">Analisis produksi dan simulasi kapasitas real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Produksi Bulan Ini"
          value="15.000 pcs"
          sub="+8% vs target"
          color="green"
          icon={Factory}
          trend="up"
        />
        <StatCard title="Efisiensi Mesin" value="87%" sub="Avg utilization" color="blue" icon={Settings} />
        <StatCard title="HPP Rata-rata" value="Rp 18.500" sub="Per kg keripik" color="purple" icon={BarChart3} />
        <StatCard title="Kapasitas Tersedia" value="65%" sub="Bisa terima order" color="orange" icon={Lightbulb} />
      </div>

      {/* Simulasi Kapasitas */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border-2 border-blue-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600 rounded-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Simulasi Pesanan Mendadak</h3>
            <p className="text-blue-700 text-sm mb-4">
              Distributor "Berkah Jaya" ingin pesan mendadak <strong>2.000 pcs Keripik Singkong Pedas</strong> untuk
              besok. Cek ketersediaan bahan baku dan kapasitas mesin.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Bahan Baku</p>
                <p className="font-bold text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Tersedia
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Kapasitas Mesin</p>
                <p className="font-bold text-yellow-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                  Terbatas (1 shift)
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Estimasi HPP</p>
                <p className="font-bold text-blue-900">Rp 37.000.000</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                Terima Order (Buat SPK)
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700">
                Lihat Detail Simulasi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analisis Produksi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top Produk by Volume (Bulan Ini)</h3>
          <div className="space-y-3">
            {[
              { name: "Keripik Singkong Pedas", qty: 4500, target: 4000 },
              { name: "Keripik Pisang Keju", qty: 3800, target: 3500 },
              { name: "Keripik Singkong Original", qty: 3200, target: 3000 },
              { name: "Keripik Ubi Balado", qty: 2900, target: 3000 },
            ].map((product, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{product.name}</span>
                  <span className={`font-bold ${product.qty >= product.target ? "text-green-600" : "text-red-600"}`}>
                    {product.qty} / {product.target} pcs
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${product.qty >= product.target ? "bg-green-600" : "bg-red-600"}`}
                    style={{ width: `${Math.min((product.qty / product.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Efisiensi Mesin (Hari Ini)</h3>
          <div className="space-y-4">
            {[
              { name: "Production Line 1", uptime: 95, status: "Operasional" },
              { name: "Production Line 2", uptime: 92, status: "Operasional" },
              { name: "Production Line 3", uptime: 88, status: "Operasional" },
              { name: "Production Line 4", uptime: 85, status: "Operasional" },
              { name: "Production Line 5", uptime: 0, status: "Maintenance" },
            ].map((line, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{line.name}</p>
                  <p className="text-xs text-gray-500">{line.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{line.uptime}%</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      line.uptime >= 90
                        ? "bg-green-100 text-green-700"
                        : line.uptime >= 70
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {line.uptime >= 90 ? "Excellent" : line.uptime >= 70 ? "Good" : "Down"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formula & HPP */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Perhitungan HPP Otomatis (Sample)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
              <tr>
                <th className="p-3">Produk</th>
                <th className="p-3">Biaya Bahan</th>
                <th className="p-3">Biaya Tenaga Kerja</th>
                <th className="p-3">Overhead</th>
                <th className="p-3">HPP /kg</th>
                <th className="p-3">Harga Jual</th>
                <th className="p-3">Margin</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">Keripik Singkong Pedas</td>
                <td className="p-3">Rp 12.000</td>
                <td className="p-3">Rp 3.500</td>
                <td className="p-3">Rp 3.000</td>
                <td className="p-3 font-bold">Rp 18.500</td>
                <td className="p-3 font-bold text-green-600">Rp 28.000</td>
                <td className="p-3 font-bold text-green-600">51%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">Keripik Pisang Keju</td>
                <td className="p-3">Rp 15.000</td>
                <td className="p-3">Rp 4.000</td>
                <td className="p-3">Rp 3.500</td>
                <td className="p-3 font-bold">Rp 22.500</td>
                <td className="p-3 font-bold text-green-600">Rp 35.000</td>
                <td className="p-3 font-bold text-green-600">56%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManajerProduksiDashboard
