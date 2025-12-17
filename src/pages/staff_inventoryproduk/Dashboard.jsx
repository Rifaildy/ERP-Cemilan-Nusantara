import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, Package, TruckIcon, AlertTriangle, Archive, Clock } from "lucide-react"

const StaffInventoryProdukDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Package, label: "Stok Barang Jadi", active: false },
    { icon: TruckIcon, label: "Pengeluaran Barang", active: false },
    { icon: Archive, label: "Manajemen Lokasi Rak", active: false },
    { icon: AlertTriangle, label: "Produk Kedaluwarsa", active: false },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Inventory Produk Jadi</h1>
        <p className="text-green-100">Monitor stok barang jadi dengan sistem FIFO otomatis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Stok Tersedia" value="8.450 pcs" sub="15 jenis produk" color="green" icon={Package} />
        <StatCard title="Pengeluaran Hari Ini" value="12 SO" sub="3.200 pcs terkirim" color="blue" icon={TruckIcon} />
        <StatCard
          title="Produk Hampir Exp"
          value="3 Batch"
          sub="7 hari lagi"
          color="orange"
          icon={Clock}
          trend="down"
        />
        <StatCard title="Permintaan Pending" value="5 SO" sub="Menunggu packing" color="red" icon={AlertTriangle} />
      </div>

      {/* Peringatan Produk Mendekati Kedaluwarsa */}
      <div className="bg-yellow-50 rounded-xl shadow-sm border-2 border-yellow-200 p-6 mb-6">
        <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Peringatan: Produk Mendekati Kedaluwarsa
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-yellow-100 text-gray-900 font-semibold border-b">
              <tr>
                <th className="p-3">Batch</th>
                <th className="p-3">Produk</th>
                <th className="p-3">Lokasi Rak</th>
                <th className="p-3">Jumlah</th>
                <th className="p-3">Tgl Produksi</th>
                <th className="p-3">Exp Date</th>
                <th className="p-3">Sisa Hari</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b hover:bg-yellow-50">
                <td className="p-3 font-mono text-xs">B2850</td>
                <td className="p-3 font-medium">Keripik Singkong Original</td>
                <td className="p-3">Rak A1-03</td>
                <td className="p-3 font-bold">250 pcs</td>
                <td className="p-3">10 Jan 2025</td>
                <td className="p-3 font-bold text-red-600">17 Jan 2025</td>
                <td className="p-3 text-red-600 font-bold">7 hari</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Promo/Diskon
                  </span>
                </td>
              </tr>
              <tr className="border-b hover:bg-yellow-50">
                <td className="p-3 font-mono text-xs">B2862</td>
                <td className="p-3 font-medium">Keripik Pisang Keju</td>
                <td className="p-3">Rak B2-05</td>
                <td className="p-3 font-bold">180 pcs</td>
                <td className="p-3">12 Jan 2025</td>
                <td className="p-3 font-bold text-orange-600">22 Jan 2025</td>
                <td className="p-3 text-orange-600 font-bold">12 hari</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    Monitor
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Stok Real-time per Produk */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Stok Barang Jadi (Real-time untuk Penjualan)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Keripik Singkong Pedas", stock: 1200, min: 500, status: "Aman" },
            { name: "Keripik Pisang Keju", stock: 980, min: 500, status: "Aman" },
            { name: "Keripik Singkong Original", stock: 1450, min: 500, status: "Aman" },
            { name: "Keripik Ubi Balado", stock: 820, min: 500, status: "Aman" },
            { name: "Keripik Singkong BBQ", stock: 450, min: 500, status: "Menipis" },
            { name: "Keripik Pisang Coklat", stock: 200, min: 500, status: "Kritis" },
          ].map((product, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${
                product.status === "Kritis"
                  ? "border-red-200 bg-red-50"
                  : product.status === "Menipis"
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-green-200 bg-green-50"
              }`}
            >
              <p className="font-medium text-gray-800 mb-2">{product.name}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{product.stock}</p>
                  <p className="text-xs text-gray-500">pcs tersedia</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.status === "Kritis"
                      ? "bg-red-200 text-red-800"
                      : product.status === "Menipis"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permintaan Pengeluaran dari Penjualan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Permintaan Pengeluaran Barang (dari Penjualan)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
              <tr>
                <th className="p-3">No. SO</th>
                <th className="p-3">Pelanggan</th>
                <th className="p-3">Produk</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Lokasi Rak (FIFO)</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">SO/2025/045</td>
                <td className="p-3 font-medium">Toko Berkah Jaya</td>
                <td className="p-3">Keripik Singkong Pedas</td>
                <td className="p-3 font-bold">500 pcs</td>
                <td className="p-3 font-mono text-xs">A1-02, A1-03</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Siap Pick
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">Proses Picking</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">SO/2025/046</td>
                <td className="p-3 font-medium">Distributor Maju Mapan</td>
                <td className="p-3">Keripik Pisang Keju</td>
                <td className="p-3 font-bold">800 pcs</td>
                <td className="p-3 font-mono text-xs">B2-04, B2-05</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    Packing
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Lihat Detail</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default StaffInventoryProdukDashboard
