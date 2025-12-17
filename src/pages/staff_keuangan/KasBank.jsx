"use client"

import { useState } from "react"
import { kasBank, arusKasMasuk, arusKasKeluar } from "../../data/keuangan"

export default function KasBank() {
  const [accounts, setAccounts] = useState(kasBank)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("masuk")

  const totalSaldo = accounts.reduce((sum, acc) => sum + acc.saldo, 0)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kas & Bank Management</h1>
          <p className="text-gray-600">Treasury management dan monitoring arus kas</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setModalType("masuk")
              setShowModal(true)
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
          >
            <span>+</span>
            Kas Masuk
          </button>
          <button
            onClick={() => {
              setModalType("keluar")
              setShowModal(true)
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
          >
            <span>-</span>
            Kas Keluar
          </button>
        </div>
      </div>

      {/* Total Saldo */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white mb-6">
        <div className="text-blue-100 text-sm mb-1">Total Saldo Kas & Bank</div>
        <div className="text-4xl font-bold mb-2">Rp {totalSaldo.toLocaleString("id-ID")}</div>
        <div className="text-blue-100 text-sm">Update: Real-time</div>
      </div>

      {/* Accounts List */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">{account.tipe}</div>
                <div className="text-lg font-bold text-gray-900">{account.nama}</div>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">{account.tipe}</div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">Rp {account.saldo.toLocaleString("id-ID")}</div>
            <div className="flex gap-2">
              <button className="flex-1 text-sm text-blue-600 hover:text-blue-800 font-medium">Detail</button>
              <button className="flex-1 text-sm text-green-600 hover:text-green-800 font-medium">Transfer</button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-2 gap-6">
        {/* Kas Masuk */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Arus Kas Masuk</h3>
            <span className="text-sm text-gray-600">5 terakhir</span>
          </div>
          <div className="space-y-3">
            {arusKasMasuk.slice(0, 5).map((kas) => (
              <div key={kas.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{kas.sumber}</div>
                  <div className="text-sm text-gray-500">
                    {kas.tanggal} • {kas.referensi}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">+Rp {kas.jumlah.toLocaleString("id-ID")}</div>
                  <div className="text-xs text-gray-500">{kas.akun.nama}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kas Keluar */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Arus Kas Keluar</h3>
            <span className="text-sm text-gray-600">5 terakhir</span>
          </div>
          <div className="space-y-3">
            {arusKasKeluar.slice(0, 5).map((kas) => (
              <div key={kas.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{kas.tujuan}</div>
                  <div className="text-sm text-gray-500">
                    {kas.tanggal} • {kas.referensi}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-600">-Rp {kas.jumlah.toLocaleString("id-ID")}</div>
                  <div className="text-xs text-gray-500">{kas.akun.nama}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Catat Transaksi {modalType === "masuk" ? "Kas Masuk" : "Kas Keluar"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Akun</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.nama} - Rp {acc.saldo.toLocaleString("id-ID")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {modalType === "masuk" ? "Sumber Dana" : "Tujuan Pembayaran"}
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  {modalType === "masuk" ? (
                    <>
                      <option>Penjualan</option>
                      <option>Pelunasan Piutang</option>
                      <option>Lain-lain</option>
                    </>
                  ) : (
                    <>
                      <option>Pembelian Bahan Baku</option>
                      <option>Gaji & Upah</option>
                      <option>Utilitas</option>
                      <option>Logistik</option>
                      <option>Pemeliharaan</option>
                      <option>Lain-lain</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows="3"></textarea>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-sm text-blue-800">
                  <strong>Integrasi Otomatis:</strong> Transaksi ini akan otomatis membuat jurnal akuntansi dan update
                  saldo kas/bank secara real-time.
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg">
                  Batal
                </button>
                <button
                  className={`px-4 py-2 text-white rounded-lg ${
                    modalType === "masuk" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Simpan Transaksi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
