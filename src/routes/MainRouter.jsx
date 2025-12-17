"use client"
import { useAuth } from "../context/AuthContext"
import LoginPage from "../pages/LoginPage"
import OwnerDashboard from "../pages/owner/Dashboard"
import StaffInventoryBBDashboard from "../pages/staff_inventorybb/Dashboard"
import ManajerInventoryBBDashboard from "../pages/manajer_inventorybb/Dashboard"
import StaffProduksiDashboard from "../pages/staff_produksi/Dashboard"
import ManajerProduksiDashboard from "../pages/manajer_produksi/Dashboard"
import StaffInventoryProdukDashboard from "../pages/staff_inventoryproduk/Dashboard"
import StaffPenjualanDashboard from "../pages/staff_penjualan/Dashboard"
import ManajerPenjualanDashboard from "../pages/manajer_penjualan/Dashboard"
import StaffKeuanganDashboard from "../pages/staff_keuangan/Dashboard"
import StaffAkuntansiDashboard from "../pages/staff_akuntansi/Dashboard"
import ManajerKeuanganDashboard from "../pages/manajer_keuangan/Dashboard"

const MainRouter = () => {
  const { user } = useAuth()

  if (!user) {
    return <LoginPage />
  }

  // Route based on role
  switch (user.role) {
    case "owner":
      return <OwnerDashboard />
    case "staff_inventory_bahan_baku":
      return <StaffInventoryBBDashboard />
    case "manajer_inventory_bahan_baku":
      return <ManajerInventoryBBDashboard />
    case "staff_produksi":
      return <StaffProduksiDashboard />
    case "manajer_produksi":
      return <ManajerProduksiDashboard />
    case "staff_inventory_produk":
      return <StaffInventoryProdukDashboard />
    case "staff_penjualan":
      return <StaffPenjualanDashboard />
    case "manajer_penjualan":
      return <ManajerPenjualanDashboard />
    case "staff_keuangan":
      return <StaffKeuanganDashboard />
    case "staff_akuntansi":
      return <StaffAkuntansiDashboard />
    case "manajer_keuangan":
      return <ManajerKeuanganDashboard />
    default:
      return <div>Role tidak dikenali</div>
  }
}

export default MainRouter
