import DashboardLayout from "../../components/DashboardLayout"
import StatCard from "../../components/StatCard"
import { LayoutDashboard, Wallet, ArrowUpCircle, ArrowDownCircle, Bell, Calendar } from "lucide-react"

const StaffKeuanganDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Wallet, label: "Treasury Management", active: false },
    { icon: ArrowDownCircle, label: "Pembayaran Hutang", active: false },
    { icon: ArrowUpCircle, label: "Penerimaan Piutang", active: false },
    { icon: Calendar, label: "Kalender Jatuh Tempo", active: false },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Staff Keuangan</h1>
        <p className="text-purple-100">Kelola arus kas masuk & keluar perusahaan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Saldo Kas" value="Rp 450jt" sub="Update real-time" color="green" icon={Wallet} trend="up" />
        <StatCard title="Kas Masuk Hari Ini" value="Rp 85jt" sub="12 transaksi" color="blue" icon={ArrowUpCircle} />
        <StatCard title="Kas Keluar Hari Ini" value="Rp 42jt" sub="8 transaksi" color="orange" icon={ArrowDownCircle} />
        <StatCard title="Tagihan Jatuh Tempo" value="5 Item" sub="Total Rp 32jt" color="red" icon={Bell} trend="down" />
      </div>

      {/* Kalender Jatuh Tempo */}
      <div className="bg-red-50 rounded-xl shadow-sm border-2 border-red-200 p-6 mb-6">
        <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Tagihan Jatuh Tempo (7 Hari Ke Depan)
        </h3>
        <div className="space-y-3">
          {[
            {
              type: "Piutang",
              customer: "Toko Berkah Jaya",
              invoice: "INV/2025/042",
              amount: "Rp 5.500.000",
              date: "15 Jan 2025",
              days: 2,
              urgent: true,
            },
            {
              type: "Hutang",
              supplier: "PT. Singkong Fresh",
              po: "PO/2025/008",
              amount: "Rp 12.000.000",
              date: "16 Jan 2025",
              days: 3,
              urgent: true,
            },
            {
              type: "Piutang",
              customer: "Distributor Maju Mapan",
              invoice: "INV/2025/038",
              amount: "Rp 18.500.000",
              date: "18 Jan 2025",
              days: 5,
              urgent: false,
            },
            {
              type: "Hutang",
              supplier: "UD. Kemasan Jaya",
              po: "PO/2025/012",
              amount: "Rp 8.750.000",
              date: "19 Jan 2025",
              days: 6,
              urgent: false,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${item.urgent ? "border-red-300 bg-red-100" : "border-orange-200 bg-orange-50"}`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        item.type === "Piutang" ? "bg-blue-200 text-blue-800" : "bg-purple-200 text-purple-800"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="font-mono text-xs font-bold text-gray-700">{item.invoice || item.po}</span>
                    {item.urgent && (
                      <span className="px-2 py-0.5 bg-red-300 text-red-900 rounded text-xs font-bold">URGENT</span>
                    )}
                  </div>
                  <p className="font-medium text-gray-800">{item.customer || item.supplier}</p>
                  <p className="text-sm text-gray-600">
                    Jatuh tempo: {item.date} ({item.days} hari lagi)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900">{item.amount}</span>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                      item.type === "Piutang" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    {item.type === "Piutang" ? "Tagih" : "Bayar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaksi Hari Ini */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Kas Masuk */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ArrowUpCircle className="w-5 h-5 text-green-600" />
            Kas Masuk Hari Ini
          </h3>
          <div className="space-y-3">
            {[
              {
                desc: "Pelunasan Invoice INV/2025/035",
                customer: "Toko Sejahtera",
                amount: "Rp 25.000.000",
                time: "09:15",
              },
              {
                desc: "Pelunasan Invoice INV/2025/037",
                customer: "CV. Retail Indonesia",
                amount: "Rp 18.500.000",
                time: "10:30",
              },
              { desc: "Pembayaran DP SO/2025/050", customer: "Toko Makmur", amount: "Rp 15.000.000", time: "13:20" },
              {
                desc: "Pelunasan Invoice INV/2025/040",
                customer: "Toko Berkah",
                amount: "Rp 12.500.000",
                time: "14:45",
              },
            ].map((transaction, idx) => (
              <div
                key={idx}
                className="flex justify-between items-start p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{transaction.desc}</p>
                  <p className="text-xs text-gray-600">{transaction.customer}</p>
                  <p className="text-xs text-gray-500 mt-1">{transaction.time} WIB</p>
                </div>
                <p className="font-bold text-green-700 text-sm">{transaction.amount}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="font-medium text-gray-700">Total Kas Masuk:</span>
            <span className="text-xl font-bold text-green-700">Rp 85.000.000</span>
          </div>
        </div>

        {/* Kas Keluar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ArrowDownCircle className="w-5 h-5 text-orange-600" />
            Kas Keluar Hari Ini
          </h3>
          <div className="space-y-3">
            {[
              {
                desc: "Pembayaran Supplier PO/2025/010",
                supplier: "PT. Minyak Sejahtera",
                amount: "Rp 18.000.000",
                time: "08:30",
              },
              {
                desc: "Pembayaran Supplier PO/2025/013",
                supplier: "CV. Bumbu Nusantara",
                amount: "Rp 12.500.000",
                time: "11:00",
              },
              { desc: "Biaya Operasional (Listrik)", category: "Overhead", amount: "Rp 5.500.000", time: "12:15" },
              { desc: "Gaji Karyawan (Advance)", category: "SDM", amount: "Rp 6.000.000", time: "15:00" },
            ].map((transaction, idx) => (
              <div
                key={idx}
                className="flex justify-between items-start p-3 bg-orange-50 rounded-lg border border-orange-200"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{transaction.desc}</p>
                  <p className="text-xs text-gray-600">{transaction.supplier || transaction.category}</p>
                  <p className="text-xs text-gray-500 mt-1">{transaction.time} WIB</p>
                </div>
                <p className="font-bold text-orange-700 text-sm">{transaction.amount}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="font-medium text-gray-700">Total Kas Keluar:</span>
            <span className="text-xl font-bold text-orange-700">Rp 42.000.000</span>
          </div>
        </div>
      </div>

      {/* Form Input Transaksi Cepat */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Input Transaksi Kas</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
              <option>Kas Masuk</option>
              <option>Kas Keluar</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
              <option>Pelunasan Piutang</option>
              <option>Pembayaran Hutang</option>
              <option>Biaya Operasional</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nominal (Rp)</label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keterangan</label>
            <input
              type="text"
              placeholder="Deskripsi transaksi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default StaffKeuanganDashboard
