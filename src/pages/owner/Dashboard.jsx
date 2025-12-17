import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, Package, Factory, Wallet, TrendingUp, Users, BarChart3 } from "lucide-react"

const OwnerDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: BarChart3, label: "Laporan Eksekutif", active: false },
    { icon: Package, label: "Laporan Stok", active: false },
    { icon: Factory, label: "Laporan Produksi", active: false },
    { icon: Wallet, label: "Laporan Keuangan", active: false },
    { icon: Users, label: "Manajemen User", active: false },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-corporate-800 to-corporate-900 rounded-2xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform origin-bottom-left"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard Owner</h1>
          <p className="text-corporate-200">Ringkasan performa bisnis CV. Cemilan Nusantara secara real-time</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Penjualan"
          value="Rp 1.2M"
          sub="+15% vs bulan lalu"
          color="blue"
          icon={Wallet}
          trend="up"
        />
        <StatCard
          title="Profit Bersih"
          value="Rp 340jt"
          sub="+12% dari target"
          color="green"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard title="Total Produksi" value="15.000 pcs" sub="Keripik bulan ini" color="orange" icon={Factory} />
        <StatCard title="Stok Bahan" value="Aman" sub="Cukup untuk 14 hari" color="indigo" icon={Package} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Grafik Penjualan 6 Bulan Terakhir</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 75, 80, 70, 85, 95].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-500">Bln {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Produk Terlaris</h3>
          <div className="space-y-4">
            {[
              { name: "Keripik Singkong Pedas", sold: 4500, percentage: 90 },
              { name: "Keripik Pisang Keju", sold: 3800, percentage: 76 },
              { name: "Keripik Singkong Original", sold: 3200, percentage: 64 },
              { name: "Keripik Ubi Balado", sold: 2900, percentage: 58 },
            ].map((product, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{product.name}</span>
                  <span className="text-gray-500">{product.sold} pcs</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${product.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Status Inventory</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Bahan Baku</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Aman</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Barang Jadi</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Stabil</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Kemasan</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                Perlu Order
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Produksi Hari Ini</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Target</span>
              <span className="font-bold text-gray-800">5.000 pcs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Selesai</span>
              <span className="font-bold text-green-600">3.250 pcs</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-green-600 h-3 rounded-full" style={{ width: "65%" }}></div>
            </div>
            <p className="text-xs text-gray-500 text-center">65% dari target</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Keuangan</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Saldo Kas</span>
              <span className="font-bold text-green-600">Rp 450jt</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Piutang</span>
              <span className="font-bold text-orange-600">Rp 125jt</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Hutang</span>
              <span className="font-bold text-red-600">Rp 45jt</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default OwnerDashboard
