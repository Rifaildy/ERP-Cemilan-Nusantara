// --- CHART OF ACCOUNTS (COA) SEDERHANA ---
export const ACCOUNTS = [
  { code: "1101", name: "Kas Besar", type: "Aset", balance: 150000000 },
  { code: "1102", name: "Bank BCA", type: "Aset", balance: 300000000 },
  { code: "1201", name: "Piutang Usaha", type: "Aset", balance: 47100000 }, // Total hutang customer
  { code: "1301", name: "Persediaan Bahan Baku", type: "Aset", balance: 85000000 },
  { code: "1302", name: "Persediaan Barang Jadi", type: "Aset", balance: 45000000 },
  { code: "2101", name: "Hutang Usaha", type: "Kewajiban", balance: 32000000 }, // Hutang ke supplier
  { code: "4101", name: "Penjualan Produk", type: "Pendapatan", balance: 1200000000 },
  { code: "5101", name: "Harga Pokok Produksi (HPP)", type: "Beban", balance: 750000000 },
  { code: "6101", name: "Beban Gaji", type: "Beban", balance: 50000000 },
  { code: "6102", name: "Beban Listrik & Air", type: "Beban", balance: 5000000 }
];

// --- TRANSAKSI JURNAL (DUMMY HISTORI) ---
export const JOURNAL_ENTRIES = [
  {
    id: "JRN-001",
    date: "2025-10-24",
    description: "Pembelian Bahan Baku (Singkong) - CV Tani Makmur",
    reference: "PO-2025-10-001",
    items: [
      { account: "1301 - Persediaan Bahan Baku", debit: 3500000, credit: 0 },
      { account: "2101 - Hutang Usaha", debit: 0, credit: 3500000 }
    ]
  },
  {
    id: "JRN-002",
    date: "2025-10-24",
    description: "Penjualan Kredit ke Toko Oleh-oleh Bu Tini",
    reference: "INV-2025-10-005",
    items: [
      { account: "1201 - Piutang Usaha", debit: 1500000, credit: 0 },
      { account: "4101 - Penjualan Produk", debit: 0, credit: 1500000 }
    ]
  },
  {
    id: "JRN-003", // HPP Otomatis
    date: "2025-10-24",
    description: "Pencatatan HPP Penjualan INV-2025-10-005",
    reference: "SYS-AUTO",
    items: [
      { account: "5101 - Harga Pokok Produksi", debit: 850000, credit: 0 },
      { account: "1302 - Persediaan Barang Jadi", debit: 0, credit: 850000 }
    ]
  }
];