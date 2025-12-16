import React, { useState, useEffect } from 'react';
import { RAW_MATERIALS } from '../../../../data/inventory';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  ShoppingCart, 
  ArrowUpRight,
  RefreshCw,
  Truck
} from 'lucide-react';

const MaterialStockPage = () => {
  const [materials, setMaterials] = useState(RAW_MATERIALS);
  const [filter, setFilter] = useState('all'); // all, critical, warning
  const [processingId, setProcessingId] = useState(null); // Untuk animasi loading simulasi
  const [notification, setNotification] = useState(null); // Simulasi toast notification

  // Fungsi Helper: Menentukan Status Stok (Otomatisasi Visual)
  const getStockStatus = (stock, min) => {
    if (stock <= min) return { label: 'Critical', color: 'bg-red-100 text-red-700', icon: AlertTriangle };
    if (stock <= min * 1.5) return { label: 'Warning', color: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle };
    return { label: 'Safe', color: 'bg-green-100 text-green-700', icon: CheckCircle };
  };

  // Filter Logic
  const filteredMaterials = materials.filter(item => {
    if (filter === 'all') return true;
    const status = getStockStatus(item.stock, item.minStock).label;
    if (filter === 'critical') return status === 'Critical';
    if (filter === 'warning') return status === 'Warning';
    return true;
  });

  // --- LOGIKA INTEGRASI & OTOMATISASI ---
  // Simulasi: Klik "Restock" -> Buat PO -> Kirim ke Supplier -> Barang Datang -> Update Stok -> Update Keuangan
  const handleSmartRestock = (id) => {
    setProcessingId(id);
    
    // 1. Simulasi Proses Pembuatan PO Otomatis
    setTimeout(() => {
      const item = materials.find(m => m.id === id);
      const orderQty = item.minStock * 2 - item.stock; // Otomatis hitung kebutuhan agar aman
      const totalCost = orderQty * item.price;

      // 2. Tampilkan Notifikasi Integrasi
      setNotification({
        title: "Purchase Order Terbuat!",
        message: `PO otomatis dikirim ke ${item.supplier}. Estimasi biaya: Rp ${totalCost.toLocaleString()}. Menunggu pengiriman...`,
        type: "info"
      });

      // 3. Simulasi Barang Datang (Cepat untuk demo)
      setTimeout(() => {
        setMaterials(prev => prev.map(m => {
          if (m.id === id) {
            return { ...m, stock: m.stock + orderQty, lastUpdated: 'Baru saja' };
          }
          return m;
        }));

        setProcessingId(null);
        
        // 4. Integrasi ke Keuangan & Akuntansi
        setNotification({
          title: "Barang Diterima & Jurnal Terbentuk",
          message: `Stok ${item.name} bertambah. Hutang Usaha ke ${item.supplier} otomatis dicatat oleh sistem.`,
          type: "success"
        });

        // Hilangkan notifikasi setelah 5 detik
        setTimeout(() => setNotification(null), 5000);

      }, 2500); // Delay 2.5 detik seolah-olah pengiriman
    }, 1500); // Delay 1.5 detik seolah-olah proses PO
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 relative">
      
      {/* --- TOAST NOTIFICATION (Simulasi Integrasi) --- */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-2xl border-l-4 animate-bounce-in max-w-md ${
          notification.type === 'success' ? 'bg-white border-green-500 text-green-800' : 'bg-white border-blue-500 text-blue-800'
        }`}>
          <h4 className="font-bold flex items-center gap-2">
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5"/> : <Truck className="w-5 h-5"/>}
            {notification.title}
          </h4>
          <p className="text-sm mt-1 text-gray-600">{notification.message}</p>
        </div>
      )}

      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-corporate-900">Stok Bahan Baku</h1>
          <p className="text-gray-500">Monitoring ketersediaan bahan untuk produksi.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'all' ? 'bg-corporate-800 text-white' : 'bg-white text-gray-600 border'}`}>
            Semua
          </button>
          <button onClick={() => setFilter('critical')} className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${filter === 'critical' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-white text-gray-600 border'}`}>
            <AlertTriangle className="w-4 h-4" /> Kritis
          </button>
        </div>
      </div>

      {/* Statistik Cepat */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><ShoppingCart className="w-6 h-6" /></div>
          <div>
            <p className="text-xs text-gray-500">Total Item</p>
            <p className="text-xl font-bold text-gray-800">{materials.length} SKU</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-lg text-red-600"><AlertTriangle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs text-gray-500">Stok Kritis</p>
            <p className="text-xl font-bold text-gray-800">
              {materials.filter(m => getStockStatus(m.stock, m.minStock).label === 'Critical').length} Item
            </p>
          </div>
        </div>
      </div>

      {/* Tabel Stok */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b">Kode & Nama Bahan</th>
                <th className="p-4 border-b">Kategori</th>
                <th className="p-4 border-b text-center">Stok Fisik</th>
                <th className="p-4 border-b text-center">Status</th>
                <th className="p-4 border-b">Supplier</th>
                <th className="p-4 border-b text-right">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMaterials.map((item) => {
                const status = getStockStatus(item.stock, item.minStock);
                const isProcessing = processingId === item.id;

                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-corporate-900">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.code}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-lg text-gray-800">
                          {item.stock.toLocaleString()} <span className="text-xs font-normal text-gray-500">{item.unit}</span>
                        </span>
                        <span className="text-xs text-gray-400">Min: {item.minStock}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center justify-center gap-1 w-fit mx-auto ${status.color}`}>
                        <status.icon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{item.supplier}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleSmartRestock(item.id)}
                        disabled={isProcessing || status.label === 'Safe'}
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition
                          ${status.label === 'Safe' 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30'
                          }
                          ${isProcessing ? 'opacity-70 cursor-wait' : ''}
                        `}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Proses...
                          </button>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            Restock
                          </button>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Footer Tabel */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex justify-between">
          <span>Menampilkan {filteredMaterials.length} data</span>
          <span>Data terakhir sinkronisasi: Real-time</span>
        </div>
      </div>
    </div>
  );
};

export default MaterialStockPage;