import React, { useState } from 'react';
import { Truck, CheckCircle, XCircle, Package, FileText, AlertTriangle } from 'lucide-react';

// Dummy Data: PO yang sedang dalam perjalanan (Waiting for Arrival)
const INCOMING_SHIPMENTS = [
  { id: 'PO-2025-10-008', supplier: 'CV. Tani Makmur', items: 'Singkong Mentah (Grade A)', qty: 1000, unit: 'Kg', date: '2025-10-26', status: 'shipping' },
  { id: 'PO-2025-10-009', supplier: 'PT. Sawit Sejahtera', items: 'Minyak Goreng Industri', qty: 200, unit: 'Liter', date: '2025-10-27', status: 'shipping' },
  { id: 'PO-2025-10-010', supplier: 'CV. Plastindo', items: 'Plastik Kemasan 250gr', qty: 5000, unit: 'Pcs', date: '2025-10-27', status: 'delayed' },
];

const GoodsReceiptPage = () => {
  const [shipments, setShipments] = useState(INCOMING_SHIPMENTS);
  const [selectedPO, setSelectedPO] = useState(null); // PO yang sedang diproses terima
  const [processing, setProcessing] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form State untuk Input Penerimaan
  const [receivedQty, setReceivedQty] = useState(0);
  const [rejectedQty, setRejectedQty] = useState(0);
  const [notes, setNotes] = useState('');

  // Fungsi Simulasi Penerimaan Barang & Integrasi Keuangan
  const handleConfirmReceipt = () => {
    setProcessing(true);
    
    setTimeout(() => {
      // 1. Logika Update Stok (Simulasi)
      const newShipments = shipments.filter(s => s.id !== selectedPO.id);
      setShipments(newShipments);
      
      // 2. Logika Integrasi Keuangan (Auto-Journaling)
      const totalValue = receivedQty * 3500; // Asumsi harga dummy
      
      setNotification({
        title: "Penerimaan Berhasil & Jurnal Terbentuk",
        message: `Stok bertambah ${receivedQty} ${selectedPO.unit}. Sistem otomatis mencatat Hutang Usaha senilai Rp ${totalValue.toLocaleString()} & Retur ${rejectedQty} unit.`,
        type: 'success'
      });

      setProcessing(false);
      setSelectedPO(null);
      setReceivedQty(0);
      setRejectedQty(0);

      // Hilangkan notifikasi
      setTimeout(() => setNotification(null), 6000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-white border-l-4 border-green-500 shadow-xl p-4 rounded-r-lg animate-bounce-in max-w-md">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-bold text-green-800">{notification.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-corporate-900 flex items-center gap-2">
            <Truck className="w-6 h-6 text-primary-600" />
            Penerimaan Barang Masuk
          </h2>
          <p className="text-gray-500 text-sm mt-1">Verifikasi fisik barang yang datang dari supplier sesuai PO.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
          <Package className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-800">{shipments.length} Pengiriman</span>
          <span className="text-blue-600 text-sm">akan datang</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* List Pengiriman (Kiri) */}
        <div className="lg:col-span-2 space-y-4">
          {shipments.map((shipment) => (
            <div 
              key={shipment.id}
              className={`bg-white p-5 rounded-xl border transition-all hover:shadow-md cursor-pointer
                ${selectedPO?.id === shipment.id ? 'border-primary-500 ring-1 ring-primary-500' : 'border-gray-200'}
              `}
              onClick={() => {
                setSelectedPO(shipment);
                setReceivedQty(shipment.qty); // Default terima semua
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-800">{shipment.supplier}</span>
                    {shipment.status === 'delayed' && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium">Terlambat</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">PO Ref: {shipment.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-corporate-900">{shipment.qty} {shipment.unit}</p>
                  <p className="text-xs text-gray-400">{shipment.items}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Estimasi: {shipment.date}</span>
                <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> Dokumen Lengkap</span>
              </div>
            </div>
          ))}

          {shipments.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-400">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Tidak ada pengiriman yang menunggu.</p>
            </div>
          )}
        </div>

        {/* Panel Proses Penerimaan (Kanan) */}
        <div className="lg:col-span-1">
          {selectedPO ? (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg sticky top-6">
              <h3 className="font-bold text-gray-800 mb-4 pb-4 border-b">Proses Barang Masuk</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Diterima (Fisik)</label>
                  <div className="flex">
                    <input 
                      type="number" 
                      value={receivedQty}
                      onChange={(e) => setReceivedQty(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    <span className="bg-gray-100 px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg text-gray-600 text-sm flex items-center">
                      {selectedPO.unit}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Ditolak (Reject)</label>
                  <div className="flex">
                    <input 
                      type="number" 
                      value={rejectedQty}
                      onChange={(e) => setRejectedQty(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-red-200 text-red-700 rounded-l-lg focus:ring-2 focus:ring-red-500 outline-none"
                    />
                    <span className="bg-red-50 px-3 py-2 border border-l-0 border-red-200 rounded-r-lg text-red-600 text-sm flex items-center">
                      {selectedPO.unit}
                    </span>
                  </div>
                  {rejectedQty > 0 && <p className="text-xs text-red-500 mt-1">*Nilai hutang akan otomatis dipotong.</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catatan / Kondisi Barang</label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none h-20 text-sm"
                    placeholder="Contoh: Kemasan sobek 2 pcs..."
                  ></textarea>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => setSelectedPO(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={handleConfirmReceipt}
                    disabled={processing}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-bold shadow-lg shadow-primary-500/30 flex justify-center items-center gap-2"
                  >
                    {processing ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" /> Konfirmasi
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-xl border border-dashed border-gray-300 text-center text-gray-400 h-full flex flex-col justify-center items-center">
              <Package className="w-12 h-12 mb-3 opacity-50" />
              <p>Pilih PO di samping untuk memproses penerimaan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodsReceiptPage;