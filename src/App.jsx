import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  Factory, 
  ShoppingCart, 
  Wallet, 
  BookOpen, 
  LogOut, 
  Menu, 
  X,
  User,
  Bell,
  ChevronRight
} from 'lucide-react';

const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Bagian Kiri: Branding (Makanan Ringan) */}
        <div className="md:w-1/2 bg-gradient-to-br from-primary-500 to-primary-700 p-8 flex flex-col justify-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">Cemilan Nusantara</h1>
            <p className="text-primary-100 text-lg mb-6">Sistem Informasi ERP</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <Factory className="w-6 h-6 text-secondary-500" />
                <span>Manajemen Produksi Real-time</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <Package className="w-6 h-6 text-secondary-500" />
                <span>Inventory FIFO System</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <Wallet className="w-6 h-6 text-secondary-500" />
                <span>Keuangan & Akuntansi Otomatis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="md:w-1/2 p-8 md:p-12 bg-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-corporate-900">Selamat Datang</h2>
            <p className="text-gray-500">Silakan masuk untuk mengakses sistem</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg shadow-primary-500/30 flex justify-center items-center"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Masuk ke Sistem"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
            &copy; 2025 CV. Cemilan Nusantara IT Division
          </div>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN: DASHBOARD LAYOUT & KONTEN ---
const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Menu Dinamis Berdasarkan Role (Simplified Logic)
  const getMenu = () => {
    const common = [{ icon: LayoutDashboard, label: "Dashboard", active: true }];
    
    // Logika Menu per Role
    if (user.role.includes('bahan')) {
      return [...common, { icon: Package, label: "Stok Bahan" }, { icon: ShoppingCart, label: "Pembelian (PO)" }];
    }
    if (user.role.includes('produksi')) {
      return [...common, { icon: Factory, label: "Jadwal Produksi" }, { icon: Package, label: "Permintaan Bahan" }];
    }
    if (user.role.includes('produk')) {
      return [...common, { icon: Package, label: "Stok Barang Jadi" }, { icon: LogOut, label: "Pengeluaran Barang" }];
    }
    if (user.role.includes('penjualan')) {
      return [...common, { icon: ShoppingCart, label: "Pesanan (SO)" }, { icon: User, label: "Data Pelanggan" }];
    }
    if (user.role.includes('keuangan')) {
      return [...common, { icon: Wallet, label: "Arus Kas" }, { icon: Bell, label: "Tagihan Jatuh Tempo" }];
    }
    if (user.role.includes('akuntansi')) {
      return [...common, { icon: BookOpen, label: "Jurnal Umum" }, { icon: BookOpen, label: "Buku Besar" }];
    }
    // Owner lihat semua (Ringkasan)
    return [
      ...common, 
      { icon: Package, label: "Laporan Stok" }, 
      { icon: Factory, label: "Laporan Produksi" },
      { icon: Wallet, label: "Laporan Keuangan" }
    ];
  };

  const menus = getMenu();

  return (
    <div className="min-h-screen bg-corporate-50 flex font-sans">
      
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-corporate-900 text-white transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 flex flex-col
      `}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 border-b border-corporate-800 bg-corporate-900">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
            <span className="font-bold text-white">CN</span>
          </div>
          <span className="font-semibold text-lg tracking-wide">ERP System</span>
        </div>

        {/* User Profile Mini */}
        <div className="p-4 border-b border-corporate-800 bg-corporate-800/50">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-primary-500" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.roleLabel}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menus.map((menu, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${menu.active 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' 
                  : 'text-gray-400 hover:bg-corporate-800 hover:text-white'
                }
              `}
            >
              <menu.icon className="w-5 h-5" />
              {menu.label}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-corporate-800">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shadow-sm">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 text-gray-500">
            <span className="hidden md:inline">CV. Cemilan Nusantara</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-corporate-900">{user.roleLabel} Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-primary-600 transition relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-corporate-800 to-corporate-900 rounded-2xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform origin-bottom-left"></div>
              <div className="relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Halo, {user.name}! 👋</h1>
                <p className="text-corporate-200">
                  Berikut adalah ringkasan aktivitas {user.roleLabel} hari ini.
                </p>
              </div>
            </div>

            {/* Content Switcher based on Role */}
            <RoleBasedContent user={user} />
            
          </div>
        </main>
      </div>
    </div>
  );
};

// --- KOMPONEN: KONTEN DASHBOARD PER ROLE (DUMMY REALISTIS) ---
const RoleBasedContent = ({ user }) => {
  
  // 1. DASHBOARD OWNER
  if (user.role === 'owner') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Penjualan" value="Rp 1.2M" sub="Bulan ini" color="blue" icon={Wallet} />
        <StatCard title="Profit Bersih" value="Rp 340jt" sub="+12% vs lalu" color="green" icon={ShoppingCart} />
        <StatCard title="Total Produksi" value="15.000" sub="Pcs Keripik" color="orange" icon={Factory} />
        <StatCard title="Stok Bahan" value="Aman" sub="Cukup 14 hari" color="indigo" icon={Package} />
      </div>
    );
  }

  // 2. DASHBOARD GUDANG BAHAN (Staff & Manajer)
  if (user.role.includes('bahan')) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Stok Masuk Hari Ini" value="2.5 Ton" sub="Singkong & Pisang" color="green" icon={Package} />
          <StatCard title="Permintaan Produksi" value="4 Order" sub="Menunggu dikirim" color="orange" icon={Factory} />
          <StatCard title="Bahan Menipis" value="3 Item" sub="Perlu Order Supplier" color="red" icon={Bell} />
        </div>
        
        {/* Tabel Dummy Stok */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Peringatan Stok Minimum</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
                <tr>
                  <th className="p-3">Nama Bahan</th>
                  <th className="p-3">Stok Saat Ini</th>
                  <th className="p-3">Min. Stok</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">Minyak Goreng (Liter)</td>
                  <td className="p-3 font-bold text-red-600">50 L</td>
                  <td className="p-3">100 L</td>
                  <td className="p-3"><span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Urgent</span></td>
                  <td className="p-3 text-primary-600 cursor-pointer hover:underline">Buat PO</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">Bumbu Balado (Kg)</td>
                  <td className="p-3 font-bold text-yellow-600">12 Kg</td>
                  <td className="p-3">15 Kg</td>
                  <td className="p-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Warning</span></td>
                  <td className="p-3 text-primary-600 cursor-pointer hover:underline">Buat PO</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 3. DASHBOARD PRODUKSI
  if (user.role.includes('produksi')) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Target Hari Ini" value="5000 Pcs" sub="Keripik Singkong Original" color="blue" icon={Factory} />
          <StatCard title="Progres" value="65%" sub="3250 / 5000 Selesai" color="green" icon={Package} />
          <StatCard title="Mesin Aktif" value="4 / 5" sub="1 Mesin Maintenance" color="orange" icon={Factory} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Jadwal Produksi Berjalan</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-blue-900">SPK-2025-001: Keripik Singkong Pedas</h4>
                  <p className="text-sm text-blue-600">Batch #B2910 | Deadline: 14:00 WIB</p>
                </div>
                <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded">Sedang Proses</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            {user.role === 'manajer_produksi' && (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 cursor-pointer hover:bg-yellow-100 transition">
                <h4 className="font-bold text-yellow-900 flex items-center gap-2">
                  <Bell className="w-4 h-4" /> Simulasi Pesanan Baru
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Ada pesanan mendadak 1000 pcs dari Distributor A. Klik untuk simulasi ketersediaan bahan & mesin.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. DASHBOARD KEUANGAN & AKUNTANSI
  if (user.role.includes('keuangan') || user.role.includes('akuntansi')) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Saldo Kas" value="Rp 450.000.000" sub="Update Real-time" color="green" icon={Wallet} />
          <StatCard title="Piutang Jatuh Tempo" value="Rp 25.000.000" sub="3 Faktur Pelanggan" color="red" icon={Bell} />
          <StatCard title="Hutang Supplier" value="Rp 12.000.000" sub="Jatuh tempo 3 hari lagi" color="orange" icon={BookOpen} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Tagihan Belum Lunas (Invoice)</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Toko "Berkah Jaya"</p>
                  <p className="text-xs text-gray-500">INV/2025/10/05</p>
                </div>
                <span className="text-red-600 font-bold">Rp 5.500.000</span>
              </li>
              <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Distributor "Maju Mapan"</p>
                  <p className="text-xs text-gray-500">INV/2025/10/08</p>
                </div>
                <span className="text-red-600 font-bold">Rp 12.000.000</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Jurnal Otomatis</h3>
              <p className="text-gray-500 text-sm mb-4">Sistem mencatat transaksi secara otomatis.</p>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">Lihat Laporan Jurnal</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT / LAINNYA
  return (
    <div className="text-center py-20 text-gray-400">
      <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
      <p>Modul Dashboard untuk role <strong>{user.roleLabel}</strong> siap dikembangkan.</p>
    </div>
  );
};

// Komponen Kecil: Kartu Statistik
const StatCard = ({ title, value, sub, color, icon: Icon }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <p className={`text-xs mt-2 font-medium ${sub.includes('+') ? 'text-green-500' : 'text-gray-400'}`}>
          {sub}
        </p>
      </div>
      <div className={`p-3 rounded-lg ${colors[color] || colors.blue}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

// --- KOMPONEN UTAMA ---
function App() {
  return (
    <AuthProvider>
      <MainScreen />
    </AuthProvider>
  );
}

// Wrapper untuk cek login status
const MainScreen = () => {
  const { user } = useAuth();
  return user ? <DashboardLayout /> : <LoginPage />;
};

export default App;