// --- SUPPLIER (Vendor Bahan Baku) ---
export const SUPPLIERS = [
  { 
    id: 1, 
    name: "CV. Tani Makmur", 
    type: "Supplier", 
    contact: "Bpk. Hartono", 
    phone: "0812-3456-7890", 
    email: "orders@tanimakmur.co.id", 
    address: "Jl. Kaliurang Km 15, Sleman, Yogyakarta", 
    category: "Bahan Baku Utama",
    performance: "Sangat Baik" 
  },
  { 
    id: 2, 
    name: "PT. Sawit Sejahtera", 
    type: "Supplier", 
    contact: "Ibu Lina", 
    phone: "0813-9876-5432", 
    email: "sales@sawitsejahtera.com", 
    address: "Kawasan Industri Piyungan, Bantul", 
    category: "Minyak & Gas",
    performance: "Baik" 
  },
  { 
    id: 3, 
    name: "UD. Rempah Nusantara", 
    type: "Supplier", 
    contact: "Mas Dedi", 
    phone: "0857-1234-5678", 
    email: "dedi@rempahnusantara.com", 
    address: "Pasar Beringharjo Lt. 2, Yogyakarta", 
    category: "Bumbu & Rempah",
    performance: "Cukup" // Sering telat kirim
  },
  { 
    id: 4, 
    name: "CV. Plastindo", 
    type: "Supplier", 
    contact: "Pak Kevin", 
    phone: "0274-555123", 
    email: "order@plastindo.co.id", 
    address: "Jl. Magelang Km 7, Sleman", 
    category: "Packaging",
    performance: "Sangat Baik" 
  }
];

// --- CUSTOMERS (Distributor & Reseller) ---
export const CUSTOMERS = [
  { 
    id: 101, 
    name: "Toko Oleh-Oleh 'Bu Tini'", 
    type: "Retail Store", 
    contact: "Bu Tini", 
    phone: "0811-2233-4455", 
    address: "Jl. Malioboro No. 12, Yogyakarta", 
    creditLimit: 10000000, 
    currentDebt: 2500000, // Punya hutang
    status: "Active"
  },
  { 
    id: 102, 
    name: "Distributor Jaya Abadi (Solo)", 
    type: "Distributor", 
    contact: "Pak Bambang", 
    phone: "0812-9988-7766", 
    address: "Jl. Slamet Riyadi, Solo", 
    creditLimit: 50000000, 
    currentDebt: 45000000, // Mendekati limit (Warning Finance)
    status: "Active"
  },
  { 
    id: 103, 
    name: "Minimarket Berkah", 
    type: "Retail Chain", 
    contact: "Admin Gudang", 
    phone: "0274-777888", 
    address: "Jl. Godean Km 5, Sleman", 
    creditLimit: 5000000, 
    currentDebt: 0, 
    status: "Active"
  },
  { 
    id: 104, 
    name: "Reseller Budi (Online)", 
    type: "Reseller", 
    contact: "Budi Santoso", 
    phone: "0856-4321-8765", 
    address: "Perumahan Griya Indah, Bantul", 
    creditLimit: 2000000, 
    currentDebt: 2100000, // Overlimit
    status: "Blocked" // Akun diblokir karena hutang
  }
];