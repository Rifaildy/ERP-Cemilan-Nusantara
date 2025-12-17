import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, Package, ShoppingCart, BarChart3, FileText, TrendingUp, Users } from "lucide-react"

const ManajerInventoryBBDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: BarChart3, label: "Laporan Inventory", active: false },
    { icon: ShoppingCart, label: "Approval PO", active: false },
    { icon: FileText, label: "Analisis Supplier", active: false },
    { icon: Users, label: "Manajemen Supplier", active: false },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Manajer Inventory Bahan Baku</h1>
        <p className="text-orange-100">Analisis dan approval pengadaan bahan baku</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Stok Bahan"
          value="Rp 125jt"
          sub="Nilai inventory saat ini"
          color="blue"
          icon={Package}
        />
        <StatCard title="PO Menunggu Approval" value="3 PO" sub="Total Rp 45jt" color="orange" icon={FileText} />
        <StatCard title="Efisiensi Stok" value="92%" sub="+3% dari target" color="green" icon={TrendingUp} trend="up" />
        <StatCard title="Supplier Aktif" value="12" sub="Rating avg: 4.5/5" color="purple" icon={Users} />
      </div>

      {/* PO Menunggu Approval */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">PO Menunggu Approval</h3>
        <div className="space-y-4">
          {[
            {
              po: "PO/2025/015",
              supplier: "PT. Minyak Sejahtera",
              item: "Minyak Goreng 200L",
              value: "Rp 18.000.000",
              urgent: true,
            },
            {
              po: "PO/2025/016",
              supplier: "CV. Bumbu Nusantara",
              item: "Bumbu Balado 50Kg",
              value: "Rp 12.500.000",
              urgent: false,
            },
            {
              po: "PO/2025/017",
              supplier: "UD. Kemasan Jaya",
              item: "Plastik Kemasan 1000pcs",
              value: "Rp 8.750.000",
              urgent: false,
            },
          ].map((po, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${po.urgent ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"}`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-gray-700">{po.po}</span>
                    {po.urgent && (
                      <span className="px-2 py-0.5 bg-red-200 text-red-800 rounded text-xs font-medium">URGENT</span>
                    )}
                  </div>
                  <p className="font-medium text-gray-800">{po.supplier}</p>
                  <p className="text-sm text-gray-600">{po.item}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-gray-900">{po.value}</span>
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
            </div>
          ))}
        </div>
      </div>

      {/* Supplier Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top 5 Supplier (by Value)</h3>
          <div className="space-y-3">
            {[
              { name: "PT. Singkong Fresh", value: 45, amount: "Rp 45jt" },
              { name: "UD. Pisang Mas", value: 38, amount: "Rp 38jt" },
              { name: "PT. Minyak Sejahtera", value: 32, amount: "Rp 32jt" },
              { name: "CV. Bumbu Nusantara", value: 28, amount: "Rp 28jt" },
              { name: "UD. Kemasan Jaya", value: 22, amount: "Rp 22jt" },
            ].map((supplier, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{supplier.name}</span>
                  <span className="text-gray-900 font-bold">{supplier.amount}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${supplier.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Analisis Lead Time Supplier</h3>
          <div className="space-y-4">
            {[
              { name: "PT. Singkong Fresh", days: 2, status: "Cepat" },
              { name: "UD. Pisang Mas", days: 3, status: "Normal" },
              { name: "PT. Minyak Sejahtera", days: 5, status: "Normal" },
              { name: "CV. Bumbu Nusantara", days: 7, status: "Lambat" },
            ].map((supplier, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{supplier.name}</p>
                  <p className="text-xs text-gray-500">Rata-rata lead time</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{supplier.days} hari</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      supplier.status === "Cepat"
                        ? "bg-green-100 text-green-700"
                        : supplier.status === "Lambat"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {supplier.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManajerInventoryBBDashboard
