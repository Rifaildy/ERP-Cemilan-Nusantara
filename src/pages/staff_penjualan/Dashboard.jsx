import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, ShoppingCart, Users, FileText, TrendingUp, Package } from "lucide-react"

const StaffPenjualanDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: ShoppingCart, label: "Sales Order (SO)", active: false },
    { icon: Users, label: "Data Pelanggan", active: false },
    { icon: FileText, label: "Generate Invoice", active: false },
    { icon: Package, label: "Cek Stok Real-time", active: false },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Staff Penjualan</h1>
        <p className="text-blue-100">Kelola pesanan pelanggan dengan cek stok real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Penjualan Hari Ini"
          value="Rp 45jt"
          sub="18 transaksi"
          color="green"
          icon={ShoppingCart}
          trend="up"
        />
        <StatCard title="SO Pending" value="7 Order" sub="Menunggu konfirmasi" color="orange" icon={FileText} />
        <StatCard title="Invoice Belum Bayar" value="12" sub="Total Rp 85jt" color="red" icon={TrendingUp} />
        <StatCard title="Pelanggan Aktif" value="48" sub="Bulan ini" color="blue" icon={Users} />
      </div>

      {/* Form Buat Sales Order Baru */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Buat Sales Order Baru</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pelanggan</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Pilih Pelanggan</option>
              <option>Toko Berkah Jaya</option>
              <option>Distributor Maju Mapan</option>
              <option>Toko Sejahtera</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Produk</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Pilih Produk</option>
              <option>Keripik Singkong Pedas (Stok: 1200)</option>
              <option>Keripik Pisang Keju (Stok: 980)</option>
              <option>Keripik Singkong Original (Stok: 1450)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah (pcs)</label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              Cek Stok & Tambah
            </button>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">
            Reset
          </button>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
            Simpan Sales Order
          </button>
        </div>
      </div>

      {/* Daftar SO Hari Ini */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Sales Order Hari Ini</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
              <tr>
                <th className="p-3">No. SO</th>
                <th className="p-3">Pelanggan</th>
                <th className="p-3">Produk</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status Stok</th>
                <th className="p-3">Status Order</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">SO/2025/045</td>
                <td className="p-3 font-medium">Toko Berkah Jaya</td>
                <td className="p-3">Keripik Singkong Pedas</td>
                <td className="p-3 font-bold">500 pcs</td>
                <td className="p-3 font-bold">Rp 14.000.000</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Stok OK
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Diproses Gudang
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Generate Invoice</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">SO/2025/046</td>
                <td className="p-3 font-medium">Distributor Maju Mapan</td>
                <td className="p-3">Keripik Pisang Keju</td>
                <td className="p-3 font-bold">800 pcs</td>
                <td className="p-3 font-bold">Rp 28.000.000</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Stok Locked
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    Packing
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Lihat Detail</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">SO/2025/047</td>
                <td className="p-3 font-medium">Toko Sejahtera</td>
                <td className="p-3">Keripik Ubi Balado</td>
                <td className="p-3 font-bold">300 pcs</td>
                <td className="p-3 font-bold">Rp 9.600.000</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    Checking
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Draft</span>
                </td>
                <td className="p-3">
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">Konfirmasi</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Pelanggan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Top 5 Pelanggan Bulan Ini</h3>
        <div className="space-y-3">
          {[
            { name: "Distributor Maju Mapan", value: "Rp 125jt", orders: 28 },
            { name: "Toko Berkah Jaya", value: "Rp 98jt", orders: 22 },
            { name: "Toko Sejahtera", value: "Rp 76jt", orders: 18 },
            { name: "CV. Retail Indonesia", value: "Rp 65jt", orders: 15 },
            { name: "Toko Makmur", value: "Rp 54jt", orders: 12 },
          ].map((customer, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{customer.name}</p>
                  <p className="text-xs text-gray-500">{customer.orders} transaksi</p>
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900">{customer.value}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default StaffPenjualanDashboard
