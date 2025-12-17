"use client"

import { useState } from "react"
import { laporanLabaRugi, neraca, arusKas } from "../../data/akuntansi"

export default function LaporanKeuangan() {
  const [activeReport, setActiveReport] = useState("labarugi")

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Laporan Keuangan</h1>
          <p className="text-gray-600">Laporan real-time dari jurnal otomatis</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>Januari 2024</option>
            <option>Q1 2024</option>
            <option>2024</option>
          </select>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Export PDF</button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex gap-2">
          {[
            { id: "labarugi", label: "Laba Rugi" },
            { id: "neraca", label: "Neraca" },
            { id: "aruskas", label: "Arus Kas" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveReport(tab.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeReport === tab.id ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Laba Rugi */}
      {activeReport === "labarugi" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">CV. CEMILAN NUSANTARA</h2>
            <h3 className="text-xl font-semibold text-gray-700 mt-2">LAPORAN LABA RUGI</h3>
            <p className="text-gray-600 mt-1">Periode: {laporanLabaRugi.periode}</p>
          </div>

          <div className="space-y-6">
            {/* Pendapatan */}
            <div>
              <div className="font-bold text-gray-900 mb-2">PENDAPATAN</div>
              <div className="ml-4 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-700">Pendapatan Penjualan</span>
                  <span className="text-gray-900">
                    Rp {laporanLabaRugi.pendapatan.penjualan.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Pendapatan Lain-lain</span>
                  <span className="text-gray-900">
                    Rp {laporanLabaRugi.pendapatan.lainLain.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span className="text-gray-900">Total Pendapatan</span>
                  <span className="text-gray-900">Rp {laporanLabaRugi.pendapatan.total.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>

            {/* HPP */}
            <div>
              <div className="font-bold text-gray-900 mb-2">BEBAN POKOK PENJUALAN (HPP)</div>
              <div className="ml-4 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-700">Beban Bahan Baku</span>
                  <span className="text-gray-900">Rp {laporanLabaRugi.hpp.bahanBaku.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Beban Tenaga Kerja</span>
                  <span className="text-gray-900">Rp {laporanLabaRugi.hpp.tenagaKerja.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Beban Overhead Pabrik</span>
                  <span className="text-gray-900">Rp {laporanLabaRugi.hpp.overhead.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span className="text-gray-900">Total HPP</span>
                  <span className="text-red-600">(Rp {laporanLabaRugi.hpp.total.toLocaleString("id-ID")})</span>
                </div>
              </div>
            </div>

            {/* Laba Kotor */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-900">LABA KOTOR</span>
                <span className="text-blue-600">Rp {laporanLabaRugi.labaKotor.toLocaleString("id-ID")}</span>
              </div>
            </div>

            {/* Beban Operasional */}
            <div>
              <div className="font-bold text-gray-900 mb-2">BEBAN OPERASIONAL</div>
              <div className="ml-4 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-700">Gaji & Upah</span>
                  <span className="text-gray-900">
                    Rp {laporanLabaRugi.bebanOperasional.gajiUpah.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Listrik</span>
                  <span className="text-gray-900">
                    Rp {laporanLabaRugi.bebanOperasional.listrik.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Air</span>
                  <span className="text-gray-900">
                    Rp {laporanLabaRugi.bebanOperasional.air.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Pengiriman</span>
                  <span className="text-gray-900">
                    Rp {laporanLabaRugi.bebanOperasional.pengiriman.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Marketing</span>
                  <span className="text-gray-900">
                    Rp {laporanLabaRugi.bebanOperasional.marketing.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Pemeliharaan</span>
                  <span className="text-gray-900">
                    Rp {laporanLabaRugi.bebanOperasional.pemeliharaan.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Penyusutan</span>
                  <span className="text-gray-900">
                    Rp {laporanLabaRugi.bebanOperasional.penyusutan.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Administrasi</span>
                  <span className="text-gray-900">
                    Rp {laporanLabaRugi.bebanOperasional.administrasi.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span className="text-gray-900">Total Beban Operasional</span>
                  <span className="text-red-600">
                    (Rp {laporanLabaRugi.bebanOperasional.total.toLocaleString("id-ID")})
                  </span>
                </div>
              </div>
            </div>

            {/* Laba Operasional */}
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-900">LABA OPERASIONAL</span>
                <span className="text-green-600">Rp {laporanLabaRugi.labaOperasional.toLocaleString("id-ID")}</span>
              </div>
            </div>

            {/* Laba Bersih */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-white text-xl font-bold">LABA BERSIH</span>
                <span className="text-white text-3xl font-bold">
                  Rp {laporanLabaRugi.labaBersih.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Neraca */}
      {activeReport === "neraca" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">CV. CEMILAN NUSANTARA</h2>
            <h3 className="text-xl font-semibold text-gray-700 mt-2">NERACA</h3>
            <p className="text-gray-600 mt-1">Per {neraca.tanggal}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Aset */}
            <div>
              <div className="font-bold text-xl text-gray-900 mb-4">ASET</div>

              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-gray-900 mb-2">Aset Lancar</div>
                  <div className="ml-4 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Kas</span>
                      <span>Rp {neraca.aset.asetLancar.kas.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Bank</span>
                      <span>Rp {neraca.aset.asetLancar.bank.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Piutang Usaha</span>
                      <span>Rp {neraca.aset.asetLancar.piutang.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Persediaan Bahan</span>
                      <span>Rp {neraca.aset.asetLancar.persediaanBahan.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Persediaan Produk</span>
                      <span>Rp {neraca.aset.asetLancar.persediaanProduk.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total Aset Lancar</span>
                      <span>Rp {neraca.aset.asetLancar.total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-gray-900 mb-2">Aset Tetap</div>
                  <div className="ml-4 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Tanah</span>
                      <span>Rp {neraca.aset.asetTetap.tanah.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Bangunan</span>
                      <span>Rp {neraca.aset.asetTetap.bangunan.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Mesin</span>
                      <span>Rp {neraca.aset.asetTetap.mesin.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Kendaraan</span>
                      <span>Rp {neraca.aset.asetTetap.kendaraan.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Akum. Penyusutan</span>
                      <span>(Rp {Math.abs(neraca.aset.asetTetap.akumulasiPenyusutan).toLocaleString("id-ID")})</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total Aset Tetap</span>
                      <span>Rp {neraca.aset.asetTetap.total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between font-bold text-lg">
                    <span>TOTAL ASET</span>
                    <span className="text-blue-600">Rp {neraca.aset.totalAset.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Liabilitas & Ekuitas */}
            <div>
              <div className="font-bold text-xl text-gray-900 mb-4">LIABILITAS & EKUITAS</div>

              <div className="space-y-4">
                {/* Liabilitas */}
                <div>
                  <div className="font-semibold text-gray-900 mb-2">Liabilitas Jangka Pendek</div>
                  <div className="ml-4 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Hutang Usaha</span>
                      <span>Rp {neraca.liabilitas.liabilitasJangkaPendek.hutangUsaha.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Hutang Bank</span>
                      <span>Rp {neraca.liabilitas.liabilitasJangkaPendek.hutangBank.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total Liabilitas JP</span>
                      <span>Rp {neraca.liabilitas.liabilitasJangkaPendek.total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-gray-900 mb-2">Liabilitas Jangka Panjang</div>
                  <div className="ml-4 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Hutang Jangka Panjang</span>
                      <span>
                        Rp {neraca.liabilitas.liabilitasJangkaPanjang.hutangJangkaPanjang.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total Liabilitas JP</span>
                      <span>Rp {neraca.liabilitas.liabilitasJangkaPanjang.total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="flex justify-between font-bold">
                    <span>TOTAL LIABILITAS</span>
                    <span className="text-red-600">Rp {neraca.liabilitas.totalLiabilitas.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                {/* Ekuitas */}
                <div className="mt-6">
                  <div className="font-semibold text-gray-900 mb-2">Ekuitas</div>
                  <div className="ml-4 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Modal Pemilik</span>
                      <span>Rp {neraca.ekuitas.modalPemilik.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Laba Ditahan</span>
                      <span>Rp {neraca.ekuitas.labaDitahan.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Laba Tahun Berjalan</span>
                      <span>Rp {neraca.ekuitas.labaTahunBerjalan.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total Ekuitas</span>
                      <span>Rp {neraca.ekuitas.totalEkuitas.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex justify-between font-bold text-lg">
                    <span>TOTAL LIABILITAS & EKUITAS</span>
                    <span className="text-green-600">
                      Rp {neraca.totalLiabilitasDanEkuitas.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Arus Kas */}
      {activeReport === "aruskas" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">CV. CEMILAN NUSANTARA</h2>
            <h3 className="text-xl font-semibold text-gray-700 mt-2">LAPORAN ARUS KAS</h3>
            <p className="text-gray-600 mt-1">Periode: {arusKas.periode}</p>
          </div>

          <div className="space-y-6">
            {/* Aktivitas Operasi */}
            <div>
              <div className="font-bold text-gray-900 mb-2">ARUS KAS DARI AKTIVITAS OPERASI</div>
              <div className="ml-4 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-700">Penerimaan dari Pelanggan</span>
                  <span className="text-green-600">
                    Rp {arusKas.aktivitasOperasi.penerimaanDariPelanggan.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Pembayaran ke Supplier</span>
                  <span className="text-red-600">
                    (Rp {Math.abs(arusKas.aktivitasOperasi.pembayaranKeSupplier).toLocaleString("id-ID")})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Pembayaran Beban Operasional</span>
                  <span className="text-red-600">
                    (Rp {Math.abs(arusKas.aktivitasOperasi.pembayaranBebanOperasional).toLocaleString("id-ID")})
                  </span>
                </div>
                <div className="flex justify-between font-bold bg-blue-50 p-2 rounded mt-2">
                  <span>Kas Bersih dari Aktivitas Operasi</span>
                  <span className={arusKas.aktivitasOperasi.kasOperasi >= 0 ? "text-green-600" : "text-red-600"}>
                    Rp {Math.abs(arusKas.aktivitasOperasi.kasOperasi).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            {/* Aktivitas Investasi */}
            <div>
              <div className="font-bold text-gray-900 mb-2">ARUS KAS DARI AKTIVITAS INVESTASI</div>
              <div className="ml-4 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-700">Pembelian Aset Tetap</span>
                  <span className="text-red-600">
                    (Rp {Math.abs(arusKas.aktivitasInvestasi.pembelianAsetTetap).toLocaleString("id-ID")})
                  </span>
                </div>
                <div className="flex justify-between font-bold bg-blue-50 p-2 rounded mt-2">
                  <span>Kas Bersih dari Aktivitas Investasi</span>
                  <span className="text-red-600">
                    (Rp {Math.abs(arusKas.aktivitasInvestasi.kasInvestasi).toLocaleString("id-ID")})
                  </span>
                </div>
              </div>
            </div>

            {/* Aktivitas Pendanaan */}
            <div>
              <div className="font-bold text-gray-900 mb-2">ARUS KAS DARI AKTIVITAS PENDANAAN</div>
              <div className="ml-4 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-700">Penerimaan Hutang Bank</span>
                  <span className="text-green-600">
                    Rp {arusKas.aktivitasPendanaan.penerimaanHutangBank.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Pembayaran Hutang Bank</span>
                  <span className="text-red-600">
                    (Rp {Math.abs(arusKas.aktivitasPendanaan.pembayaranHutangBank).toLocaleString("id-ID")})
                  </span>
                </div>
                <div className="flex justify-between font-bold bg-blue-50 p-2 rounded mt-2">
                  <span>Kas Bersih dari Aktivitas Pendanaan</span>
                  <span className="text-green-600">
                    Rp {arusKas.aktivitasPendanaan.kasPendanaan.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="border-t-2 border-gray-300 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span>Kenaikan/(Penurunan) Kas Bersih</span>
                  <span className={arusKas.kenaikanKasBersih >= 0 ? "text-green-600" : "text-red-600"}>
                    {arusKas.kenaikanKasBersih >= 0 ? "" : "-"}Rp{" "}
                    {Math.abs(arusKas.kenaikanKasBersih).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Kas di Awal Periode</span>
                  <span className="text-gray-900">Rp {arusKas.kasDiAwal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                  <span>KAS DI AKHIR PERIODE</span>
                  <span>Rp {arusKas.kasDiAkhir.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Info */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-green-500 text-xl">⚡</span>
          <div className="text-sm text-green-800">
            <strong>Laporan Real-Time:</strong> Semua laporan keuangan dihasilkan secara real-time dari jurnal otomatis.
            Tidak perlu input manual, tidak perlu menunggu akhir periode.
          </div>
        </div>
      </div>
    </div>
  )
}
