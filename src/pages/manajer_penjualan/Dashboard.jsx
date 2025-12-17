import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, BarChart3, Users, TrendingUp, Target, FileText } from "lucide-react"

const ManajerPenjualanDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: BarChart3, label: "Laporan Penjualan", active: false },
    { icon: Target, label: "Target vs Realisasi", active: false },
    { icon: Users, label: "Analisis Pelanggan", active: false },
    { icon: FileText, label: "Approval Diskon", active: false },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Manajer Penjualan</h1>
        <p className="text-indigo-100">Analisis performa penjualan dan pelanggan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Penjualan Bulan Ini"
          value="Rp 1.2M"
          sub="+15% vs target"
          color="green"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Target Achievement"
          value="115%"
          sub="Rp 1.2M / Rp 1.04M"
          color="blue"
          icon={Target}
          trend="up"
        />
        <StatCard title="Avg Order Value" value="Rp 3.5jt" sub="+8% vs bulan lalu" color="purple" icon={BarChart3} />
        <StatCard
          title="Customer Retention"
          value="87%"
          sub="42/48 repeat order"
          color="orange"
          icon={Users}
          trend="up"
        />
      </div>

      {/* Grafik Penjualan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Penjualan per Minggu (Bulan Ini)</h3>
          <div className="h-64 flex items-end justify-between gap-3">
            {[
              { week: "W1", amount: 280 },
              { week: "W2", amount: 320 },
              { week: "W3", amount: 295 },
              { week: "W4", amount: 305 },
            ].map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${(data.amount / 350) * 100}%` }}
                  ></div>
                  <div className="absolute -top-8 left-0 right-0 text-center">
                    <span className="text-xs font-bold text-indigo-900">Rp {data.amount}jt</span>
                  </div>
                </div>
                <span className="text-sm text-gray-600 font-medium mt-2">{data.week}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Produk Terlaris (by Revenue)</h3>
          <div className="space-y-3">
            {[
              { name: "Keripik Singkong Pedas", revenue: 420, percentage: 100 },
              { name: "Keripik Pisang Keju", revenue: 350, percentage: 83 },
              { name: "Keripik Singkong Original", revenue: 280, percentage: 67 },
              { name: "Keripik Ubi Balado", revenue: 210, percentage: 50 },
            ].map((product, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{product.name}</span>
                  <span className="text-gray-900 font-bold">Rp {product.revenue}jt</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${product.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Segmentation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Segmentasi Pelanggan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-yellow-700 font-medium">Premium (VIP)</p>
                <p className="text-xs text-yellow-600">Order {">"} Rp 50jt/bulan</p>
              </div>
              <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-bold">8</span>
            </div>
            <p className="text-2xl font-bold text-yellow-900">Rp 720jt</p>
            <p className="text-xs text-yellow-700 mt-1">60% total penjualan</p>
          </div>

          <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-blue-700 font-medium">Regular</p>
                <p className="text-xs text-blue-600">Order Rp 10-50jt/bulan</p>
              </div>
              <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-bold">22</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">Rp 360jt</p>
            <p className="text-xs text-blue-700 mt-1">30% total penjualan</p>
          </div>

          <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-700 font-medium">Casual</p>
                <p className="text-xs text-gray-600">Order {"<"} Rp 10jt/bulan</p>
              </div>
              <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-bold">18</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">Rp 120jt</p>
            <p className="text-xs text-gray-700 mt-1">10% total penjualan</p>
          </div>
        </div>
      </div>

      {/* Approval Diskon Khusus */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Permintaan Diskon Khusus (Perlu Approval)</h3>
        <div className="space-y-4">
          {[
            {
              so: "SO/2025/048",
              customer: "Distributor Maju Mapan",
              qty: "1000 pcs",
              discount: "15%",
              reason: "Order besar + pelanggan VIP",
            },
            {
              so: "SO/2025/049",
              customer: "Toko Berkah Jaya",
              qty: "500 pcs",
              discount: "10%",
              reason: "Produk mendekati exp (Batch B2850)",
            },
          ].map((req, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-gray-700">{req.so}</span>
                    <span className="px-2 py-0.5 bg-orange-200 text-orange-800 rounded text-xs font-medium">
                      Diskon {req.discount}
                    </span>
                  </div>
                  <p className="font-medium text-gray-800">{req.customer}</p>
                  <p className="text-sm text-gray-600">Qty: {req.qty}</p>
                  <p className="text-xs text-gray-500 mt-1">Alasan: {req.reason}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManajerPenjualanDashboard
