import React from 'react';
import { SUPPLIERS } from '../../../data/partners';
import { BarChart, Star, TrendingUp, AlertTriangle } from 'lucide-react';

const SupplierAnalysisPage = () => {
  return (
    <div className="space-y-6">
      
      {/* Header Insights */}
      <div className="bg-gradient-to-r from-corporate-800 to-corporate-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Performa Mitra Bisnis</h2>
          <p className="text-corporate-200 text-sm max-w-2xl">
            Analisis berdasarkan ketepatan waktu pengiriman, kualitas bahan baku, dan stabilitas harga dalam 3 bulan terakhir.
          </p>
        </div>
        <BarChart className="absolute right-4 bottom-4 w-32 h-32 text-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SUPPLIERS.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 font-bold">
                {supplier.name.charAt(0)}
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold
                ${supplier.performance === 'Sangat Baik' ? 'bg-green-100 text-green-700' : 
                  supplier.performance === 'Baik' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}
              `}>
                {supplier.performance}
              </span>
            </div>
            
            <h3 className="font-bold text-gray-800 truncate" title={supplier.name}>{supplier.name}</h3>
            <p className="text-xs text-gray-500 mb-4">{supplier.category}</p>

            <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Rating</span>
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  {supplier.performance === 'Sangat Baik' ? <Star className="w-4 h-4 fill-current" /> : <Star className="w-4 h-4 text-gray-300" />}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ketepatan Waktu</span>
                <span className="font-medium text-gray-800">
                  {supplier.performance === 'Cukup' ? '85%' : '98%'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Retur Barang</span>
                <span className={`font-medium ${supplier.performance === 'Cukup' ? 'text-red-500' : 'text-green-500'}`}>
                  {supplier.performance === 'Cukup' ? 'High' : 'Low'}
                </span>
              </div>
            </div>

            {supplier.performance === 'Cukup' && (
              <div className="mt-4 p-2 bg-red-50 rounded text-xs text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" />
                Perlu evaluasi kontrak
              </div>
            )}
            
            {supplier.performance === 'Sangat Baik' && (
              <div className="mt-4 p-2 bg-green-50 rounded text-xs text-green-600 flex items-center gap-2">
                <TrendingUp className="w-3 h-3" />
                Rekomendasi Utama
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierAnalysisPage;