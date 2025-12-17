import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, FileText, TrendingUp, BarChart3 } from "lucide-react"
import { bahanBakuWithStock } from "../../data/inventory-bahan"
import { orderProduksi } from "../../data/produksi"
import { produkJadi } from "../../data/inventory-produk"
import { salesOrders, piutang } from "../../data/penjualan"
import { transaksiKas } from "../../data/keuangan"

const OwnerDashboard = ({ setCurrentPage }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
    { icon: FileText, label: "Laporan Executive", page: "laporan-executive" },
    { icon: TrendingUp, label: "Monitoring Operasional", page: "monitoring-operasional" },
    { icon: BarChart3, label: "Analisis Kinerja", page: "analisis-kinerja" },
  ]

  const totalPenjualan = salesOrders.reduce((sum, so) => sum + (so.total || 0), 0)

  const totalPiutang = piutang.reduce((sum, p) => sum + (p.sisa || 0), 0)

  // Saldo kas terakhir
  const saldoKas = transaksiKas.length > 0 ? transaksiKas[transaksiKas.length - 1].saldo : 0

  const totalProduksi = orderProduksi.reduce((sum, op) => sum + (op.totalOutput || 0), 0)

  // Status bahan baku
  const bahanKritis = bahanBakuWithStock.filter((b) => b.qty < b.minStock).length

  const topProducts = produkJadi
    .sort((a, b) => (b.qty || 0) - (a.qty || 0))
    .slice(0, 4)
    .map((p) => {
      const maxQty = produkJadi[0]?.qty || 1 // Hindari pembagian dengan 0
      return {
        name: p.nama,
        sold: p.qty || 0,
        percentage: maxQty > 0 ? ((p.qty || 0) / maxQty) * 100 : 0,
      }
    })

  return (
    <DashboardLayout menuItems={menuItems} currentPage="dashboard" setCurrentPage={setCurrentPage}>
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
          value={`Rp ${(totalPenjualan / 1000000).toFixed(1)}M`}
          sub="+15% vs bulan lalu"
          color="blue"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Saldo Kas"
          value={`Rp ${(saldoKas / 1000000).toFixed(0)}jt`}
          sub="Posisi kas terkini"
          color="green"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Total Produksi"
          value={`${totalProduksi.toLocaleString()} pcs`}
          sub="Produk selesai bulan ini"
          color="orange"
          icon={BarChart3}
        />
        <StatCard
          title="Stok Bahan"
          value={bahanKritis === 0 ? "Aman" : `${bahanKritis} Kritis`}
          sub={bahanKritis === 0 ? "Semua bahan aman" : "Perlu restock"}
          color={bahanKritis === 0 ? "green" : "red"}
          icon={LayoutDashboard}
        />
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
          <h3 className="text-lg font-bold text-gray-800 mb-4">Produk Stok Terbanyak</h3>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
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
          <h3 className="text-lg font-bold text-gray-800 mb-4">Status Inventori</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Bahan Baku</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  bahanKritis === 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {bahanKritis === 0 ? "Aman" : `${bahanKritis} Kritis`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Barang Jadi</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {produkJadi.length} Item
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Bahan</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {bahanBakuWithStock.length} Item
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Produksi Bulan Ini</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Selesai</span>
              <span className="font-bold text-gray-800">{totalProduksi.toLocaleString()} pcs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Batch Selesai</span>
              <span className="font-bold text-green-600">{orderProduksi.length} Batch</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Dalam Proses</span>
              <span className="font-bold text-orange-600">0 Batch</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Keuangan</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Saldo Kas</span>
              <span className="font-bold text-green-600">Rp {(saldoKas / 1000000).toFixed(0)}jt</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Piutang</span>
              <span className="font-bold text-orange-600">Rp {(totalPiutang / 1000000).toFixed(0)}jt</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Penjualan</span>
              <span className="font-bold text-blue-600">Rp {(totalPenjualan / 1000000).toFixed(1)}M</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default OwnerDashboard
