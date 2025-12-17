import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, Package, ShoppingCart, BarChart3, FileText, TrendingUp, Users } from "lucide-react"
import { bahanBaku, stokBahanBaku, purchaseOrders, suppliers } from "../../data/inventory-bahan"

const ManajerInventoryBBDashboard = ({ setCurrentPage }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard", active: true },
    { icon: BarChart3, label: "Laporan Inventory", page: "laporan-stok", active: false },
    { icon: ShoppingCart, label: "Approval PO", page: "approval-po", active: false },
    { icon: FileText, label: "Analisis FIFO", page: "analisis-fifo", active: false },
    { icon: Users, label: "Manajemen Supplier", page: "manajemen-supplier", active: false },
  ]

  const totalStokValue = bahanBaku.reduce((sum, bahan) => {
    const stokItems = stokBahanBaku.filter((s) => s.bahanId === bahan.id)
    const totalStok = stokItems.reduce((stokSum, s) => stokSum + s.stok, 0)
    return sum + totalStok * bahan.hargaBeli
  }, 0)

  const pendingPO = purchaseOrders.filter((po) => po.status === "Pending")
  const totalPendingValue = pendingPO.reduce((sum, po) => sum + po.totalNilai, 0)

  const activeSuppliers = suppliers.filter((s) => s.status === "Aktif")

  return (
    <DashboardLayout menuItems={menuItems} currentPage="dashboard" setCurrentPage={setCurrentPage}>
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Manajer Inventory Bahan Baku</h1>
        <p className="text-orange-100">Analisis dan approval pengadaan bahan baku</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Stok Bahan"
          value={`Rp ${(totalStokValue / 1000000).toFixed(0)}jt`}
          sub="Nilai inventory saat ini"
          color="blue"
          icon={Package}
        />
        <StatCard
          title="PO Menunggu Approval"
          value={`${pendingPO.length} PO`}
          sub={`Total Rp ${(totalPendingValue / 1000000).toFixed(0)}jt`}
          color="orange"
          icon={FileText}
        />
        <StatCard title="Efisiensi Stok" value="92%" sub="+3% dari target" color="green" icon={TrendingUp} trend="up" />
        <StatCard
          title="Supplier Aktif"
          value={`${activeSuppliers.length}`}
          sub="Rating avg: 4.5/5"
          color="purple"
          icon={Users}
        />
      </div>

      {/* PO Menunggu Approval */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">PO Menunggu Approval</h3>
        <div className="space-y-4">
          {pendingPO.map((po, idx) => (
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
                  <span className="font-bold text-lg text-gray-900">{po.totalNilai.toLocaleString()}</span>
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
            {suppliers
              .filter((s) => s.status === "Aktif")
              .sort((a, b) => b.totalNilai - a.totalNilai)
              .slice(0, 5)
              .map((supplier, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{supplier.name}</span>
                    <span className="text-gray-900 font-bold">{supplier.totalNilai.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{ width: `${(supplier.totalNilai / totalStokValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Analisis Lead Time Supplier</h3>
          <div className="space-y-4">
            {suppliers
              .filter((s) => s.status === "Aktif")
              .map((supplier, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{supplier.name}</p>
                    <p className="text-xs text-gray-500">Rata-rata lead time</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{supplier.averageLeadTime} hari</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        supplier.averageLeadTime < 3
                          ? "bg-green-100 text-green-700"
                          : supplier.averageLeadTime > 7
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {supplier.averageLeadTime < 3 ? "Cepat" : supplier.averageLeadTime > 7 ? "Lambat" : "Normal"}
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
