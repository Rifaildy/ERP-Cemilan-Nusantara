// Data Dummy User untuk Simulasi Login (Password semua: "123456")
// Berdasarkan Role yang ada di Dokumen Analisis Sistem

export const USERS = [
  // --- OWNER ---
  {
    id: 1,
    name: "Rifaildy",
    username: "owner",
    role: "owner",
    email: "owner@cemilannusantara.com",
    avatar: "https://ui-avatars.com/api/?name=Owner&background=0D8ABC&color=fff"
  },

  // --- INVENTORY BAHAN BAKU ---
  {
    id: 2,
    name: "Andi Gudang Bahan",
    username: "staff_bahan",
    role: "staff_inventory_bahan_baku",
    email: "andi@cemilannusantara.com",
    avatar: "https://ui-avatars.com/api/?name=Staff+Bahan&background=f97316&color=fff"
  },
  {
    id: 3,
    name: "Budi Manajer Bahan",
    username: "manajer_bahan",
    role: "manajer_inventory_bahan_baku",
    email: "budi.mgr@cemilannusantara.com",
    avatar: "https://ui-avatars.com/api/?name=Mgr+Bahan&background=c2410c&color=fff"
  },

  // --- PRODUKSI ---
  {
    id: 4,
    name: "Citra Produksi",
    username: "staff_produksi",
    role: "staff_produksi",
    email: "citra@cemilannusantara.com",
    avatar: "https://ui-avatars.com/api/?name=Staff+Prod&background=eab308&color=fff"
  },
  {
    id: 5,
    name: "Dedi Manajer Prod",
    username: "manajer_produksi",
    role: "manajer_produksi",
    email: "dedi.mgr@cemilannusantara.com",
    avatar: "https://ui-avatars.com/api/?name=Mgr+Prod&background=a16207&color=fff"
  },

  // --- INVENTORY PRODUK JADI ---
  {
    id: 6,
    name: "Eko Gudang Produk",
    username: "staff_produk",
    role: "staff_inventory_produk",
    email: "eko@cemilannusantara.com",
    avatar: "https://ui-avatars.com/api/?name=Staff+Produk&background=10b981&color=fff"
  },

  // --- PENJUALAN ---
  {
    id: 7,
    name: "Fani Sales",
    username: "staff_penjualan",
    role: "staff_penjualan",
    email: "fani@cemilannusantara.com",
    avatar: "https://ui-avatars.com/api/?name=Sales&background=3b82f6&color=fff"
  },
  {
    id: 8,
    name: "Gita Manajer Sales",
    username: "manajer_penjualan",
    role: "manajer_penjualan",
    email: "gita.mgr@cemilannusantara.com",
    avatar: "https://ui-avatars.com/api/?name=Mgr+Sales&background=1d4ed8&color=fff"
  },

  // --- KEUANGAN ---
  {
    id: 9,
    name: "Hani Keuangan",
    username: "staff_keuangan",
    role: "staff_keuangan", // Treasury/Kasir
    email: "hani@cemilannusantara.com",
    avatar: "https://ui-avatars.com/api/?name=Keuangan&background=8b5cf6&color=fff"
  },
  {
    id: 10,
    name: "Indra Manajer Keu",
    username: "manajer_keuangan",
    role: "manajer_keuangan",
    email: "indra.mgr@cemilannusantara.com",
    avatar: "https://ui-avatars.com/api/?name=Mgr+Keu&background=6d28d9&color=fff"
  },

  // --- AKUNTANSI ---
  {
    id: 11,
    name: "Joko Akuntan",
    username: "staff_akuntansi",
    role: "staff_akuntansi", // Pembukuan/Jurnal
    email: "joko@cemilannusantara.com",
    avatar: "https://ui-avatars.com/api/?name=Akuntan&background=64748b&color=fff"
  }
];

// Helper function untuk simulasi login
export const loginSimulation = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Cek password hardcode
      if (password !== "password") {
        reject("Password salah!");
        return;
      }

      const user = USERS.find(u => u.username === username);
      if (user) {
        resolve(user);
      } else {
        reject("Username tidak ditemukan!");
      }
    }, 800); // Delay 0.8 detik biar berasa loading
  });
};