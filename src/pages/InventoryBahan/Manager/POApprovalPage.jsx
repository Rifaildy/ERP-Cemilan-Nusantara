import React, { useState } from 'react';
import { FileCheck, X, Check, DollarSign, Clock, AlertCircle } from 'lucide-react';

// Dummy Data: Purchase Request yang butuh persetujuan
const PENDING_PO = [
  { id: 'REQ-001', item: 'Minyak Goreng Industri', supplier: 'PT. Sawit Sejahtera', qty: 200, unit: 'Liter', total: 2900000, requestor: 'System (Auto-Restock)', urgency: 'High', date: '2025-10-24' },
  { id: 'REQ-002', item: 'Bumbu Balado Premium', supplier: 'UD. Rempah Nusantara', qty: 50, unit: 'Kg', total: 2250000, requestor: 'Andi (Staff)', urgency: 'Normal', date: '2025-10-24' },
  { id: 'REQ-003', item: 'Kardus Karton', supplier: 'PT. Box Utama', qty: 500, unit: 'Pcs', total: 1750000, requestor: 'Andi (Staff)', urgency: 'Low', date: '2025-10-23' },
];

const POApprovalPage = () => {
  const [requests, setRequests] = useState(PENDING_PO);
  const [notification, setNotification] = useState(null);

  const handleAction = (id, action) => {
    // Simulasi Approval
    const req = requests.find(r => r.id === id);
    setRequests(requests.filter(r => r.id !== id));

    const isApprove = action === 'approve';
    
    setNotification({
      title: isApprove ? 'PO Disetujui & Terkirim' : 'Permintaan Ditolak',
      message: isApprove 
        ? `PO untuk ${req.supplier} telah dikirim via email otomatis. Salinan tersimpan di modul Keuangan.`
        : `Permintaan ${req.id} telah ditolak dan dikembalikan ke pembuat.`,
      type: isApprove ? 'success' : 'error'
    });

    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="space-y-6">
       {/* Toast Notification */}
       {notification && (
        <div className={`fixed top-4 right-4 z-50 bg-white border-l-4 shadow-xl p-4 rounded-r-lg animate-bounce-in max-w-md ${notification.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
          <div className="flex items-start gap-3">
            {notification.type === 'success' ? <Check className="w-5 h-5 text-green-600" /> : <X className="w-5 h-5 text-red-600" />}
            <div>
              <h4 className={`font-bold ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{notification.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-sm">Total Request Pending</p>
          <h3 className="text-2xl font-bold text-corporate-900">{requests.length} Dokumen</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-sm">Estimasi Pengeluaran</p>
          <h3 className="text-2xl font-bold text-green-600">Rp {requests.reduce((a,b) => a + b.total, 0).toLocaleString()}</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between bg-gradient-to-r from-red-50 to-white">
          <div>
            <p className="text-red-600 text-sm font-semibold">Urgent Request</p>
            <h3 className="text-2xl font-bold text-red-700">{requests.filter(r => r.urgency === 'High').length} Perlu Cepat</h3>
          </div>
          <AlertCircle className="w-8 h-8 text-red-200" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-primary-600" />
            Daftar Persetujuan Pembelian
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-4">Detail Barang</th>
                <th className="p-4">Supplier</th>
                <th className="p-4">Pembuat & Waktu</th>
                <th className="p-4">Estimasi Total</th>
                <th className="p-4 text-center">Urgency</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <p className="font-bold text-gray-800">{req.item}</p>
                    <p className="text-sm text-gray-500">{req.qty} {req.unit}</p>
                  </td>
                  <td className="p-4 text-gray-700">{req.supplier}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="bg-gray-200 px-2 py-0.5 rounded text-xs font-semibold">{req.requestor}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{req.date}</p>
                  </td>
                  <td className="p-4 font-bold text-green-700">
                    Rp {req.total.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold
                      ${req.urgency === 'High' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}
                    `}>
                      {req.urgency}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleAction(req.id, 'reject')}
                        className="p-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition" title="Tolak"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleAction(req.id, 'approve')}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium text-sm flex items-center gap-2 shadow-sm transition"
                      >
                        <Check className="w-4 h-4" /> Setuju
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    Tidak ada dokumen yang perlu disetujui.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default POApprovalPage;