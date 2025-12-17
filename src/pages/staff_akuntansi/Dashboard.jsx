import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, BookOpen, FileText, BarChart3, CheckCircle } from "lucide-react"

const StaffAkuntansiDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: BookOpen, label: "Jurnal Umum", active: false },
    { icon: FileText, label: "Buku Besar", active: false },
    { icon: BarChart3, label: "Laporan Keuangan", active: false },
    { icon: CheckCircle, label: "Verifikasi Jurnal", active: false },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Staff Akuntansi</h1>
        <p className="text-slate-300">Penjurnalan otomatis dari seluruh modul sistem</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Jurnal Hari Ini" value="47 Entry" sub="Auto generated" color="blue" icon={BookOpen} />
        <StatCard title="Jurnal Pending" value="3 Entry" sub="Perlu review" color="orange" icon={FileText} />
        <StatCard title="Total Debit" value="Rp 485jt" sub="Bulan ini" color="green" icon={BarChart3} />
        <StatCard title="Total Kredit" value="Rp 485jt" sub="Balance OK" color="green" icon={CheckCircle} />
      </div>

      {/* Info Penjurnalan Otomatis */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border-2 border-blue-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600 rounded-lg">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Penjurnalan Otomatis Aktif</h3>
            <p className="text-blue-700 text-sm mb-3">
              Sistem secara otomatis mencatat jurnal dari semua transaksi di modul Inventory, Produksi, Penjualan, dan
              Keuangan. Anda cukup review dan verifikasi saja.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-gray-500">Pembelian BB</p>
                <p className="font-bold text-blue-900">Auto</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-gray-500">Produksi</p>
                <p className="font-bold text-blue-900">Auto</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-gray-500">Penjualan</p>
                <p className="font-bold text-blue-900">Auto</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-gray-500">Kas/Bank</p>
                <p className="font-bold text-blue-900">Auto</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jurnal Umum Hari Ini */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Jurnal Umum (Hari Ini)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
              <tr>
                <th className="p-3">Tanggal</th>
                <th className="p-3">No. Jurnal</th>
                <th className="p-3">Keterangan</th>
                <th className="p-3">Ref</th>
                <th className="p-3">Akun</th>
                <th className="p-3">Debit</th>
                <th className="p-3">Kredit</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {/* Entry 1: Pembelian Bahan Baku */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">13 Jan 2025</td>
                <td className="p-3 font-mono text-xs">JU/2025/001</td>
                <td className="p-3">Pembelian Singkong Grade A</td>
                <td className="p-3 font-mono text-xs">PO/2025/001</td>
                <td className="p-3">Persediaan Bahan Baku</td>
                <td className="p-3 font-bold text-green-600">Rp 15.000.000</td>
                <td className="p-3">-</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Posted</span>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 bg-gray-50">
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3">Hutang Usaha</td>
                <td className="p-3">-</td>
                <td className="p-3 font-bold text-red-600">Rp 15.000.000</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Posted</span>
                </td>
              </tr>

              {/* Entry 2: Penjualan */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">13 Jan 2025</td>
                <td className="p-3 font-mono text-xs">JU/2025/002</td>
                <td className="p-3">Penjualan Keripik ke Toko Berkah Jaya</td>
                <td className="p-3 font-mono text-xs">INV/2025/045</td>
                <td className="p-3">Piutang Usaha</td>
                <td className="p-3 font-bold text-green-600">Rp 14.000.000</td>
                <td className="p-3">-</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Posted</span>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 bg-gray-50">
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3">Penjualan</td>
                <td className="p-3">-</td>
                <td className="p-3 font-bold text-red-600">Rp 14.000.000</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Posted</span>
                </td>
              </tr>

              {/* Entry 3: HPP */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">13 Jan 2025</td>
                <td className="p-3 font-mono text-xs">JU/2025/003</td>
                <td className="p-3">HPP Penjualan INV/2025/045</td>
                <td className="p-3 font-mono text-xs">INV/2025/045</td>
                <td className="p-3">Harga Pokok Penjualan</td>
                <td className="p-3 font-bold text-green-600">Rp 9.250.000</td>
                <td className="p-3">-</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Posted</span>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 bg-gray-50">
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3">Persediaan Barang Jadi</td>
                <td className="p-3">-</td>
                <td className="p-3 font-bold text-red-600">Rp 9.250.000</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Posted</span>
                </td>
              </tr>

              {/* Entry 4: Pembayaran Kas */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">13 Jan 2025</td>
                <td className="p-3 font-mono text-xs">JU/2025/004</td>
                <td className="p-3">Penerimaan Kas dari Pelanggan</td>
                <td className="p-3 font-mono text-xs">INV/2025/035</td>
                <td className="p-3">Kas/Bank</td>
                <td className="p-3 font-bold text-green-600">Rp 25.000.000</td>
                <td className="p-3">-</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Review</span>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 bg-gray-50">
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3">Piutang Usaha</td>
                <td className="p-3">-</td>
                <td className="p-3 font-bold text-red-600">Rp 25.000.000</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Review</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Neraca Saldo (Trial Balance) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Neraca Saldo (Bulan Berjalan)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
              <tr>
                <th className="p-3">Kode Akun</th>
                <th className="p-3">Nama Akun</th>
                <th className="p-3">Debit</th>
                <th className="p-3">Kredit</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">1-1100</td>
                <td className="p-3 font-medium">Kas/Bank</td>
                <td className="p-3 font-bold">Rp 450.000.000</td>
                <td className="p-3">-</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">1-1200</td>
                <td className="p-3 font-medium">Piutang Usaha</td>
                <td className="p-3 font-bold">Rp 125.000.000</td>
                <td className="p-3">-</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">1-1310</td>
                <td className="p-3 font-medium">Persediaan Bahan Baku</td>
                <td className="p-3 font-bold">Rp 85.000.000</td>
                <td className="p-3">-</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">1-1320</td>
                <td className="p-3 font-medium">Persediaan Barang Jadi</td>
                <td className="p-3 font-bold">Rp 95.000.000</td>
                <td className="p-3">-</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 bg-yellow-50">
                <td className="p-3 font-mono text-xs">2-1100</td>
                <td className="p-3 font-medium">Hutang Usaha</td>
                <td className="p-3">-</td>
                <td className="p-3 font-bold">Rp 45.000.000</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 bg-blue-50">
                <td className="p-3 font-mono text-xs">4-1000</td>
                <td className="p-3 font-medium">Penjualan</td>
                <td className="p-3">-</td>
                <td className="p-3 font-bold">Rp 1.200.000.000</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">5-1000</td>
                <td className="p-3 font-medium">Harga Pokok Penjualan</td>
                <td className="p-3 font-bold">Rp 720.000.000</td>
                <td className="p-3">-</td>
              </tr>
              <tr className="bg-gray-100 font-bold border-t-2 border-gray-300">
                <td className="p-3" colSpan="2">
                  TOTAL
                </td>
                <td className="p-3 text-green-700">Rp 1.475.000.000</td>
                <td className="p-3 text-red-700">Rp 1.245.000.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default StaffAkuntansiDashboard
