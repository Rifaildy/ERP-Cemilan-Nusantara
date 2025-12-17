"use client"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import LoginPage from "../pages/LoginPage"

// Owner
import OwnerDashboard from "../pages/owner/Dashboard"
import LaporanExecutive from "../pages/owner/LaporanExecutive"
import MonitoringOperasional from "../pages/owner/MonitoringOperasional"
import AnalisisKinerja from "../pages/owner/AnalisisKinerja"

// Staff Inventory Bahan Baku
import StaffInventoryBBDashboard from "../pages/staff_inventorybb/Dashboard"
import StokBahan from "../pages/staff_inventorybb/StokBahan"
import PurchaseOrder from "../pages/staff_inventorybb/PurchaseOrder"
import PenerimaanBahan from "../pages/staff_inventorybb/PenerimaanBahan"
import ReturBahan from "../pages/staff_inventorybb/ReturBahan"

// Manajer Inventory Bahan Baku
import ManajerInventoryBBDashboard from "../pages/manajer_inventorybb/Dashboard"
import LaporanStok from "../pages/manajer_inventorybb/LaporanStok"
import AnalisisFIFO from "../pages/manajer_inventorybb/AnalisisFIFO"

// Staff Produksi
import StaffProduksiDashboard from "../pages/staff_produksi/Dashboard"
import PesananProduksi from "../pages/staff_produksi/PesananProduksi"
import ProsesProduksi from "../pages/staff_produksi/ProsesProduksi"
import HasilProduksi from "../pages/staff_produksi/HasilProduksi"

// Manajer Produksi
import ManajerProduksiDashboard from "../pages/manajer_produksi/Dashboard"
import ResepProduk from "../pages/manajer_produksi/ResepProduk"
import SimulasiKapasitas from "../pages/manajer_produksi/SimulasiKapasitas"

// Staff Inventory Produk
import StaffInventoryProdukDashboard from "../pages/staff_inventoryproduk/Dashboard"
import StokProduk from "../pages/staff_inventoryproduk/StokProduk"
import LokasiRak from "../pages/staff_inventoryproduk/LokasiRak"
import PengeluaranProduk from "../pages/staff_inventoryproduk/PengeluaranProduk"
import PeringatanKedaluwarsa from "../pages/manajer_inventoryproduk/PeringatanKedaluwarsa"

// Staff Penjualan
import StaffPenjualanDashboard from "../pages/staff_penjualan/Dashboard"
import PesananPenjualan from "../pages/staff_penjualan/PesananPenjualan"
import SuratJalan from "../pages/staff_penjualan/SuratJalan"
import InvoicePenjualan from "../pages/staff_penjualan/InvoicePenjualan"
import PiutangUsaha from "../pages/staff_penjualan/PiutangUsaha"

// Manajer Penjualan
import ManajerPenjualanDashboard from "../pages/manajer_penjualan/Dashboard"
import LaporanPenjualan from "../pages/manajer_penjualan/LaporanPenjualan"

// Staff Keuangan
import StaffKeuanganDashboard from "../pages/staff_keuangan/Dashboard"
import KasBank from "../pages/staff_keuangan/KasBank"
import HutangUsaha from "../pages/staff_keuangan/HutangUsaha"
import BiayaOperasional from "../pages/staff_keuangan/BiayaOperasional"

// Manajer Keuangan
import ManajerKeuanganDashboard from "../pages/manajer_keuangan/Dashboard"
import JadwalJatuhTempo from "../pages/manajer_keuangan/JadwalJatuhTempo"
import CashFlowProjection from "../pages/manajer_keuangan/CashFlowProjection"

// Staff Akuntansi
import StaffAkuntansiDashboard from "../pages/staff_akuntansi/Dashboard"
import ChartOfAccounts from "../pages/staff_akuntansi/ChartOfAccounts"
import JurnalUmum from "../pages/staff_akuntansi/JurnalUmum"
import LaporanKeuangan from "../pages/staff_akuntansi/LaporanKeuangan"

export const RouteContext = ({ children, currentPage, setCurrentPage }) => {
  return <div>{children({ currentPage, setCurrentPage })}</div>
}

const MainRouter = () => {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState("dashboard")

  if (!user) {
    return <LoginPage />
  }

  const getPageComponent = () => {
    switch (user.role) {
      case "owner":
        switch (currentPage) {
          case "dashboard":
            return <OwnerDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "laporan-executive":
            return <LaporanExecutive setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "monitoring-operasional":
            return <MonitoringOperasional setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "analisis-kinerja":
            return <AnalisisKinerja setCurrentPage={setCurrentPage} currentPage={currentPage} />
          default:
            return <OwnerDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }

      case "staff_inventory_bahan_baku":
        switch (currentPage) {
          case "dashboard":
            return <StaffInventoryBBDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "stok-bahan":
            return <StokBahan setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "purchase-order":
            return <PurchaseOrder setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "penerimaan-bahan":
            return <PenerimaanBahan setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "retur-bahan":
            return <ReturBahan setCurrentPage={setCurrentPage} currentPage={currentPage} />
          default:
            return <StaffInventoryBBDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }

      case "manajer_inventory_bahan_baku":
        switch (currentPage) {
          case "dashboard":
            return <ManajerInventoryBBDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "laporan-stok":
            return <LaporanStok setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "analisis-fifo":
            return <AnalisisFIFO setCurrentPage={setCurrentPage} currentPage={currentPage} />
          default:
            return <ManajerInventoryBBDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }

      case "staff_produksi":
        switch (currentPage) {
          case "dashboard":
            return <StaffProduksiDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "pesanan-produksi":
            return <PesananProduksi setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "proses-produksi":
            return <ProsesProduksi setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "hasil-produksi":
            return <HasilProduksi setCurrentPage={setCurrentPage} currentPage={currentPage} />
          default:
            return <StaffProduksiDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }

      case "manajer_produksi":
        switch (currentPage) {
          case "dashboard":
            return <ManajerProduksiDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "resep-produk":
            return <ResepProduk setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "simulasi-kapasitas":
            return <SimulasiKapasitas setCurrentPage={setCurrentPage} currentPage={currentPage} />
          default:
            return <ManajerProduksiDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }

      case "staff_inventory_produk":
        switch (currentPage) {
          case "dashboard":
            return <StaffInventoryProdukDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "stok-produk":
            return <StokProduk setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "lokasi-rak":
            return <LokasiRak setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "pengeluaran-produk":
            return <PengeluaranProduk setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "peringatan-kedaluwarsa":
            return <PeringatanKedaluwarsa setCurrentPage={setCurrentPage} currentPage={currentPage} />
          default:
            return <StaffInventoryProdukDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }

      case "staff_penjualan":
        switch (currentPage) {
          case "dashboard":
            return <StaffPenjualanDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "pesanan-penjualan":
            return <PesananPenjualan setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "surat-jalan":
            return <SuratJalan setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "invoice":
            return <InvoicePenjualan setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "piutang":
            return <PiutangUsaha setCurrentPage={setCurrentPage} currentPage={currentPage} />
          default:
            return <StaffPenjualanDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }

      case "manajer_penjualan":
        switch (currentPage) {
          case "dashboard":
            return <ManajerPenjualanDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "laporan-penjualan":
            return <LaporanPenjualan setCurrentPage={setCurrentPage} currentPage={currentPage} />
          default:
            return <ManajerPenjualanDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }

      case "staff_keuangan":
        switch (currentPage) {
          case "dashboard":
            return <StaffKeuanganDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "kas-bank":
            return <KasBank setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "hutang-usaha":
            return <HutangUsaha setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "biaya-operasional":
            return <BiayaOperasional setCurrentPage={setCurrentPage} currentPage={currentPage} />
          default:
            return <StaffKeuanganDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }

      case "manajer_keuangan":
        switch (currentPage) {
          case "dashboard":
            return <ManajerKeuanganDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "jadwal-jatuh-tempo":
            return <JadwalJatuhTempo setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "cashflow-projection":
            return <CashFlowProjection setCurrentPage={setCurrentPage} currentPage={currentPage} />
          default:
            return <ManajerKeuanganDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }

      case "staff_akuntansi":
        switch (currentPage) {
          case "dashboard":
            return <StaffAkuntansiDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "chart-of-accounts":
            return <ChartOfAccounts setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "jurnal-umum":
            return <JurnalUmum setCurrentPage={setCurrentPage} currentPage={currentPage} />
          case "laporan-keuangan":
            return <LaporanKeuangan setCurrentPage={setCurrentPage} currentPage={currentPage} />
          default:
            return <StaffAkuntansiDashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }

      default:
        return <div>Role tidak dikenali</div>
    }
  }

  return getPageComponent()
}

export default MainRouter
