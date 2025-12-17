import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, Package, ShoppingCart, Bell, ClipboardList, Truck } from "lucide-react"

const StaffInventoryBBDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Package, label: "Stok Bahan Baku", active: false },
    { icon: ShoppingCart, label: "Purchase Order (PO)", active: false },
    { icon: Truck, label: "Penerimaan Barang", active: false },
    { icon: ClipboardList, label: "Retur Supplier", active: false },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Inventory Bahan Baku</h1>
        <p className="text-primary-100">Monitor dan kelola stok bahan baku dengan sistem FIFO/FEFO</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Stok Masuk Hari Ini" value="2.5 Ton" sub="Singkong & Pisang" color="green" icon={Package} />
        <StatCard
          title="Permintaan Produksi"
          value="4 Order"
          sub="Menunggu diproses"
          color="orange"
          icon={ClipboardList}
        />
        <StatCard
          title="Bahan Menipis"
          value="3 Item"
          sub="Perlu Order Supplier"
          color="red"
          icon={Bell}
          trend="down"
        />
        <StatCard title="PO Aktif" value="7 PO" sub="Dalam pengiriman" color="blue" icon={Truck} />
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
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">BB-001</td>
                <td className="p-3 font-medium">Minyak Goreng (Liter)</td>
                <td className="p-3 font-bold text-red-600">50 L</td>
                <td className="p-3">100 L</td>
                <td className="p-3">PT. Minyak Sejahtera</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Urgent</span>
                </td>
                <td className="p-3">
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">Buat PO</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">BB-015</td>
                <td className="p-3 font-medium">Bumbu Balado (Kg)</td>
                <td className="p-3 font-bold text-yellow-600">12 Kg</td>
                <td className="p-3">15 Kg</td>
                <td className="p-3">CV. Bumbu Nusantara</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    Warning
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">Buat PO</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">BB-023</td>
                <td className="p-3 font-medium">Plastik Kemasan 500g</td>
                <td className="p-3 font-bold text-yellow-600">200 pcs</td>
                <td className="p-3">250 pcs</td>
                <td className="p-3">UD. Kemasan Jaya</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    Warning
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">Buat PO</button>
                </td>
              </tr>
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
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">PO/2025/001</td>
                <td className="p-3">PT. Singkong Fresh</td>
                <td className="p-3">Singkong Grade A</td>
                <td className="p-3 font-bold">1.5 Ton</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Lolos QC
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Input Batch</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">PO/2025/002</td>
                <td className="p-3">UD. Pisang Mas</td>
                <td className="p-3">Pisang Tanduk</td>
                <td className="p-3 font-bold">1 Ton</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    Sedang QC
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-gray-400 font-medium text-sm cursor-not-allowed">Menunggu</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default StaffInventoryBBDashboard
