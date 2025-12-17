import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, BarChart3, TrendingUp, PieChart, FileText, DollarSign } from "lucide-react"

const ManajerKeuanganDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: BarChart3, label: "Laporan Laba Rugi", active: false },
    { icon: FileText, label: "Neraca", active: false },
    { icon: TrendingUp, label: "Laporan Arus Kas", active: false },
    { icon: PieChart, label: "Analisis Rasio Keuangan", active: false },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="bg-gradient-to-r from-violet-600 to-violet-800 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Manajer Keuangan</h1>
        <p className="text-violet-100">Analisis dan laporan keuangan perusahaan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Revenue Bulan Ini"
          value="Rp 1.2M"
          sub="+15% vs bulan lalu"
          color="green"
          icon={DollarSign}
          trend="up"
        />
        <StatCard title="Net Profit" value="Rp 340jt" sub="Margin: 28.3%" color="blue" icon={TrendingUp} trend="up" />
        <StatCard title="Cash Flow" value="Rp 450jt" sub="Posisi kas sehat" color="purple" icon={BarChart3} />
        <StatCard title="ROI" value="32%" sub="Return on Investment" color="orange" icon={PieChart} trend="up" />
      </div>

      {/* Laporan Laba Rugi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Laporan Laba Rugi (Bulan Berjalan)</h3>
        <div className="space-y-3">
          {/* Pendapatan */}
          <div className="pb-3 border-b border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-900">PENDAPATAN</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-gray-700">Penjualan</span>
              <span className="font-bold text-gray-900">Rp 1.200.000.000</span>
            </div>
            <div className="flex justify-between items-center pl-4 text-sm text-gray-500">
              <span>Retur Penjualan</span>
              <span>(Rp 5.000.000)</span>
            </div>
            <div className="flex justify-between items-center mt-2 bg-blue-50 p-2 rounded">
              <span className="font-bold text-blue-900">Total Pendapatan Bersih</span>
              <span className="font-bold text-blue-900">Rp 1.195.000.000</span>
            </div>
          </div>

          {/* HPP */}
          <div className="pb-3 border-b border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-900">HARGA POKOK PENJUALAN (HPP)</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-gray-700">Bahan Baku</span>
              <span className="text-gray-900">Rp 480.000.000</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-gray-700">Tenaga Kerja Langsung</span>
              <span className="text-gray-900">Rp 120.000.000</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-gray-700">Overhead Produksi</span>
              <span className="text-gray-900">Rp 95.000.000</span>
            </div>
            <div className="flex justify-between items-center mt-2 bg-red-50 p-2 rounded">
              <span className="font-bold text-red-900">Total HPP</span>
              <span className="font-bold text-red-900">(Rp 695.000.000)</span>
            </div>
          </div>

          {/* Laba Kotor */}
          <div className="pb-3 border-b border-gray-200">
            <div className="flex justify-between items-center bg-green-50 p-3 rounded">
              <span className="font-bold text-green-900 text-lg">LABA KOTOR</span>
              <span className="font-bold text-green-900 text-lg">Rp 500.000.000</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 pl-3">Margin Laba Kotor: 41.8%</p>
          </div>

          {/* Biaya Operasional */}
          <div className="pb-3 border-b border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-900">BIAYA OPERASIONAL</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-gray-700">Gaji Karyawan Non-Produksi</span>
              <span className="text-gray-900">Rp 75.000.000</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-gray-700">Biaya Pemasaran</span>
              <span className="text-gray-900">Rp 35.000.000</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-gray-700">Biaya Administrasi</span>
              <span className="text-gray-900">Rp 25.000.000</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-gray-700">Biaya Listrik & Utilitas</span>
              <span className="text-gray-900">Rp 15.000.000</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-gray-700">Biaya Lain-lain</span>
              <span className="text-gray-900">Rp 10.000.000</span>
            </div>
            <div className="flex justify-between items-center mt-2 bg-orange-50 p-2 rounded">
              <span className="font-bold text-orange-900">Total Biaya Operasional</span>
              <span className="font-bold text-orange-900">(Rp 160.000.000)</span>
            </div>
          </div>

          {/* Laba Bersih */}
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-bold text-green-900 text-xl">LABA BERSIH</span>
              <span className="font-bold text-green-900 text-2xl">Rp 340.000.000</span>
            </div>
            <p className="text-sm text-green-800 mt-2">Net Profit Margin: 28.3%</p>
          </div>
        </div>
      </div>

      {/* Dashboard Keuangan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Neraca Ringkas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Neraca (Posisi Keuangan)</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-bold text-gray-700 mb-2">ASET</p>
              <div className="pl-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Kas & Bank</span>
                  <span className="font-medium">Rp 450jt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Piutang Usaha</span>
                  <span className="font-medium">Rp 125jt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Persediaan</span>
                  <span className="font-medium">Rp 180jt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Aset Tetap</span>
                  <span className="font-medium">Rp 520jt</span>
                </div>
                <div className="flex justify-between font-bold text-blue-900 pt-2 border-t">
                  <span>Total Aset</span>
                  <span>Rp 1.275jt</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t">
              <p className="text-sm font-bold text-gray-700 mb-2">LIABILITAS & EKUITAS</p>
              <div className="pl-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hutang Usaha</span>
                  <span className="font-medium">Rp 45jt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hutang Bank</span>
                  <span className="font-medium">Rp 180jt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modal</span>
                  <span className="font-medium">Rp 710jt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Laba Ditahan</span>
                  <span className="font-medium">Rp 340jt</span>
                </div>
                <div className="flex justify-between font-bold text-blue-900 pt-2 border-t">
                  <span>Total Liabilitas & Ekuitas</span>
                  <span>Rp 1.275jt</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rasio Keuangan */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Analisis Rasio Keuangan</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Current Ratio</span>
                <span className="text-2xl font-bold text-green-700">3.4</span>
              </div>
              <p className="text-xs text-gray-500">Aset Lancar / Liabilitas Lancar</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 bg-green-200 h-2 rounded-full">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="text-xs text-green-700 font-medium">Sehat</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Debt to Equity Ratio</span>
                <span className="text-2xl font-bold text-blue-700">0.21</span>
              </div>
              <p className="text-xs text-gray-500">Total Hutang / Total Ekuitas</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 bg-blue-200 h-2 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "21%" }}></div>
                </div>
                <span className="text-xs text-blue-700 font-medium">Rendah</span>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">ROA (Return on Assets)</span>
                <span className="text-2xl font-bold text-purple-700">26.7%</span>
              </div>
              <p className="text-xs text-gray-500">Laba Bersih / Total Aset</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 bg-purple-200 h-2 rounded-full">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                </div>
                <span className="text-xs text-purple-700 font-medium">Baik</span>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">ROE (Return on Equity)</span>
                <span className="text-2xl font-bold text-orange-700">32.4%</span>
              </div>
              <p className="text-xs text-gray-500">Laba Bersih / Total Ekuitas</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 bg-orange-200 h-2 rounded-full">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
                <span className="text-xs text-orange-700 font-medium">Sangat Baik</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arus Kas Ringkas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Laporan Arus Kas (Bulan Berjalan)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-2">Arus Kas dari Operasi</p>
            <p className="text-2xl font-bold text-green-700">+ Rp 385jt</p>
            <p className="text-xs text-gray-500 mt-1">Kas masuk dari penjualan & operasional</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-gray-600 mb-2">Arus Kas dari Investasi</p>
            <p className="text-2xl font-bold text-red-700">- Rp 45jt</p>
            <p className="text-xs text-gray-500 mt-1">Pembelian mesin & peralatan baru</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-2">Arus Kas dari Pendanaan</p>
            <p className="text-2xl font-bold text-blue-700">- Rp 25jt</p>
            <p className="text-xs text-gray-500 mt-1">Pembayaran cicilan hutang bank</p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-bold text-blue-900">Kenaikan Kas Bersih</span>
            <span className="text-2xl font-bold text-blue-900">+ Rp 315jt</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManajerKeuanganDashboard
