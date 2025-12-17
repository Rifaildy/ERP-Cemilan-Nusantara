import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, Package, ShoppingCart, Bell, ClipboardList, Truck } from "lucide-react"
import { bahanBaku, stokBahanBaku, purchaseOrders, penerimaanBahan } from "../../data/inventory-bahan"

const StaffInventoryBBDashboard = ({ setCurrentPage }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
    { icon: Package, label: "Stok Bahan Baku", page: "stok-bahan" },
    { icon: ShoppingCart, label: "Purchase Order (PO)", page: "purchase-order" },
    { icon: Truck, label: "Penerimaan Barang", page: "penerimaan-bahan" },
    { icon: ClipboardList, label: "Retur Supplier", page: "retur-bahan" },
  ]

  const today = "2024-01-18"
  const todayReceipts = penerimaanBahan.filter((r) => r.tanggalTerima === today)
  const totalStokMasuk = todayReceipts.reduce((sum, r) => {
    return sum + r.items.reduce((itemSum, item) => itemSum + item.qtyDiterima, 0)
  }, 0)

  const lowStockItems = bahanBaku.filter((bahan) => {
    const stokItems = stokBahanBaku.filter((s) => s.bahanId === bahan.id)
    const totalStok = stokItems.reduce((sum, s) => sum + s.stok, 0)
    return totalStok <= bahan.stokMinimum
  })

  const activePO = purchaseOrders.filter((po) => po.status === "Pending" || po.status === "Dalam Pengiriman")

  return (
    <DashboardLayout menuItems={menuItems} currentPage="dashboard" setCurrentPage={setCurrentPage}>
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Inventory Bahan Baku</h1>
        <p className="text-primary-100">Monitor dan kelola stok bahan baku dengan sistem FIFO/FEFO</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Stok Masuk Hari Ini"
          value={`${(totalStokMasuk / 1000).toFixed(1)} Ton`}
          sub="Total penerimaan"
          color="green"
          icon={Package}
        />
        <StatCard
          title="Permintaan Produksi"
          value="4 Order"
          sub="Menunggu diproses"
          color="orange"
          icon={ClipboardList}
        />
        <StatCard
          title="Bahan Menipis"
          value={`${lowStockItems.length} Item`}
          sub="Perlu Order Supplier"
          color="red"
          icon={Bell}
          trend="down"
        />
        <StatCard title="PO Aktif" value={`${activePO.length} PO`} sub="Dalam pengiriman" color="blue" icon={Truck} />
      </div>

      {/* Tabel Stok Menipis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-red-500" />
          Peringatan Stok Minimum
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
              <tr>
                <th className="p-3">Kode Bahan</th>
                <th className="p-3">Nama Bahan</th>
                <th className="p-3">Stok Saat Ini</th>
                <th className="p-3">Min. Stok</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {lowStockItems.map((bahan) => {
                const stokItems = stokBahanBaku.filter((s) => s.bahanId === bahan.id)
                const totalStok = stokItems.reduce((sum, s) => sum + s.stok, 0)
                const statusColor = totalStok === 0 ? "red-600" : "yellow-600"
                const statusLabel = totalStok === 0 ? "Habis" : "Warning"

                return (
                  <tr key={bahan.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono text-xs">{bahan.kode}</td>
                    <td className="p-3 font-medium">{bahan.nama}</td>
                    <td className={`p-3 font-bold text-${statusColor}`}>{totalStok} pcs</td>
                    <td className="p-3">{bahan.stokMinimum} pcs</td>
                    <td className="p-3">PT. Minyak Sejahtera</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 bg-${statusColor}-100 text-${statusColor}-700 rounded-full text-xs font-medium`}
                      >
                        {statusLabel}
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">Buat PO</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabel Penerimaan Bahan Hari Ini */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Penerimaan Bahan Hari Ini</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
              <tr>
                <th className="p-3">No. PO</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Bahan</th>
                <th className="p-3">Jumlah</th>
                <th className="p-3">Status QC</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {todayReceipts.map((receipt) => (
                <tr key={receipt.noPO} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono text-xs">{receipt.noPO}</td>
                  <td className="p-3">{receipt.supplier}</td>
                  <td className="p-3">
                    {receipt.items.map((item) => (
                      <div key={item.bahanId}>{item.bahan}</div>
                    ))}
                  </td>
                  <td className="p-3 font-bold">
                    {receipt.items.reduce((sum, item) => sum + item.qtyDiterima, 0)} pcs
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 bg-${receipt.statusQC === "Lolos QC" ? "green" : "yellow"}-100 text-${receipt.statusQC === "Lolos QC" ? "green" : "yellow"}-700 rounded-full text-xs font-medium`}
                    >
                      {receipt.statusQC}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      className={`text-${receipt.statusQC === "Lolos QC" ? "blue" : "gray"}-600 hover:text-${receipt.statusQC === "Lolos QC" ? "blue" : "gray"}-700 font-medium text-sm ${receipt.statusQC !== "Lolos QC" ? "cursor-not-allowed" : ""}`}
                    >
                      {receipt.statusQC === "Lolos QC" ? "Input Batch" : "Menunggu"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default StaffInventoryBBDashboard
