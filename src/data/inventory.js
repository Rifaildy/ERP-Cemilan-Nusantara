// --- DATA BAHAN BAKU (RAW MATERIALS) ---
export const RAW_MATERIALS = [
  // Kategori: Bahan Utama
  { id: 1, code: "BB-001", name: "Singkong Mentah (Grade A)", category: "Bahan Utama", stock: 1250, unit: "Kg", minStock: 500, price: 3500, supplier: "CV. Tani Makmur" },
  { id: 2, code: "BB-002", name: "Singkong Mentah (Grade B)", category: "Bahan Utama", stock: 300, unit: "Kg", minStock: 200, price: 2800, supplier: "CV. Tani Makmur" },
  { id: 3, code: "BB-003", name: "Pisang Kepok Segar", category: "Bahan Utama", stock: 850, unit: "Sisir", minStock: 300, price: 15000, supplier: "UD. Pisang Jaya" },
  { id: 4, code: "BB-004", name: "Talas Bogor", category: "Bahan Utama", stock: 100, unit: "Kg", minStock: 150, price: 8000, supplier: "Mitra Tani Bogor" }, // Low Stock

  // Kategori: Bahan Penunjang (Minyak & Gas)
  { id: 5, code: "BP-001", name: "Minyak Goreng Industri", category: "Bahan Penunjang", stock: 80, unit: "Liter", minStock: 200, price: 14500, supplier: "PT. Sawit Sejahtera" }, // Critical Stock
  { id: 6, code: "BP-002", name: "Gas LPG 50kg", category: "Bahan Penunjang", stock: 3, unit: "Tabung", minStock: 5, price: 850000, supplier: "Agen Gas Jaya" }, // Critical Stock
  { id: 7, code: "BP-003", name: "Margarin Blueband", category: "Bahan Penunjang", stock: 50, unit: "Kg", minStock: 20, price: 42000, supplier: "Toko Grosir Berkah" },

  // Kategori: Bumbu (Flavor)
  { id: 8, code: "BM-001", name: "Bumbu Balado Premium", category: "Bumbu", stock: 25, unit: "Kg", minStock: 20, price: 45000, supplier: "UD. Rempah Nusantara" },
  { id: 9, code: "BM-002", name: "Bumbu Keju Manis", category: "Bumbu", stock: 18, unit: "Kg", minStock: 20, price: 48000, supplier: "UD. Rempah Nusantara" }, // Warning Stock
  { id: 10, code: "BM-003", name: "Bumbu Jagung Bakar", category: "Bumbu", stock: 40, unit: "Kg", minStock: 20, price: 45000, supplier: "UD. Rempah Nusantara" },
  { id: 11, code: "BM-004", name: "Bubuk Coklat Premium", category: "Bumbu", stock: 30, unit: "Kg", minStock: 15, price: 65000, supplier: "CV. Coklat Klasik" },
  { id: 12, code: "BM-005", name: "Garam Halus Beriodium", category: "Bumbu", stock: 200, unit: "Pack", minStock: 50, price: 2500, supplier: "Toko Grosir Berkah" },

  // Kategori: Packaging
  { id: 13, code: "PK-001", name: "Plastik Kemasan 250gr (Alufoil)", category: "Packaging", stock: 5000, unit: "Pcs", minStock: 1000, price: 500, supplier: "CV. Plastindo" },
  { id: 14, code: "PK-002", name: "Plastik Kemasan 500gr (Alufoil)", category: "Packaging", stock: 800, unit: "Pcs", minStock: 1000, price: 850, supplier: "CV. Plastindo" }, // Warning
  { id: 15, code: "PK-003", name: "Kardus Karton (Isi 24)", category: "Packaging", stock: 400, unit: "Pcs", minStock: 200, price: 3500, supplier: "PT. Box Utama" },
  { id: 16, code: "PK-004", name: "Lakban Bening", category: "Packaging", stock: 50, unit: "Roll", minStock: 20, price: 12000, supplier: "Toko ATK Murah" },
  { id: 17, code: "PK-005", name: "Stiker Label Brand", category: "Packaging", stock: 10000, unit: "Lembar", minStock: 2000, price: 150, supplier: "Percetakan Kilat" },
];

// --- DATA PRODUK JADI (FINISHED GOODS) ---
export const FINISHED_PRODUCTS = [
  // Kripik Singkong
  { id: 101, code: "KS-ORI-250", name: "Kripik Singkong Original 250gr", category: "Keripik Singkong", stock: 450, unit: "Pcs", price: 15000, productionCost: 8500 },
  { id: 102, code: "KS-BAL-250", name: "Kripik Singkong Balado 250gr", category: "Keripik Singkong", stock: 120, unit: "Pcs", price: 16500, productionCost: 9500 },
  { id: 103, code: "KS-KEJ-250", name: "Kripik Singkong Keju 250gr", category: "Keripik Singkong", stock: 300, unit: "Pcs", price: 16500, productionCost: 9500 },
  { id: 104, code: "KS-ORI-500", name: "Kripik Singkong Original 500gr", category: "Keripik Singkong", stock: 50, unit: "Pcs", price: 28000, productionCost: 16000 },

  // Kripik Pisang
  { id: 201, code: "KP-MAN-250", name: "Kripik Pisang Manis 250gr", category: "Keripik Pisang", stock: 200, unit: "Pcs", price: 18000, productionCost: 11000 },
  { id: 202, code: "KP-COK-250", name: "Kripik Pisang Coklat Lumer 250gr", category: "Keripik Pisang", stock: 0, unit: "Pcs", price: 22000, productionCost: 14000 }, // Stock Out

  // Lainnya
  { id: 301, code: "TL-PED-250", name: "Stik Talas Pedas 250gr", category: "Stik Talas", stock: 150, unit: "Pcs", price: 17000, productionCost: 10500 },
];