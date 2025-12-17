// Data Akuntansi - Accounting Module

export const chartOfAccounts = [
  // ASET
  { kode: "1-1000", nama: "Kas Kecil", kategori: "Aset Lancar", tipe: "Debit", saldo: 5000000 },
  { kode: "1-1001", nama: "Bank Mandiri", kategori: "Aset Lancar", tipe: "Debit", saldo: 250000000 },
  { kode: "1-1002", nama: "Bank BCA", kategori: "Aset Lancar", tipe: "Debit", saldo: 180000000 },
  { kode: "1-1003", nama: "Bank BNI", kategori: "Aset Lancar", tipe: "Debit", saldo: 95000000 },
  { kode: "1-1100", nama: "Piutang Usaha", kategori: "Aset Lancar", tipe: "Debit", saldo: 98420000 },
  { kode: "1-1200", nama: "Persediaan Bahan Baku", kategori: "Aset Lancar", tipe: "Debit", saldo: 125000000 },
  { kode: "1-1201", nama: "Persediaan Produk Jadi", kategori: "Aset Lancar", tipe: "Debit", saldo: 85000000 },
  { kode: "1-2000", nama: "Tanah", kategori: "Aset Tetap", tipe: "Debit", saldo: 500000000 },
  { kode: "1-2001", nama: "Bangunan Pabrik", kategori: "Aset Tetap", tipe: "Debit", saldo: 800000000 },
  { kode: "1-2002", nama: "Mesin & Peralatan", kategori: "Aset Tetap", tipe: "Debit", saldo: 350000000 },
  { kode: "1-2003", nama: "Kendaraan", kategori: "Aset Tetap", tipe: "Debit", saldo: 200000000 },
  { kode: "1-2100", nama: "Akumulasi Penyusutan", kategori: "Aset Tetap", tipe: "Kredit", saldo: -150000000 },

  // LIABILITAS
  { kode: "2-1000", nama: "Hutang Usaha", kategori: "Liabilitas Jangka Pendek", tipe: "Kredit", saldo: 59000000 },
  { kode: "2-1100", nama: "Hutang Bank", kategori: "Liabilitas Jangka Pendek", tipe: "Kredit", saldo: 100000000 },
  {
    kode: "2-2000",
    nama: "Hutang Jangka Panjang",
    kategori: "Liabilitas Jangka Panjang",
    tipe: "Kredit",
    saldo: 300000000,
  },

  // EKUITAS
  { kode: "3-1000", nama: "Modal Pemilik", kategori: "Ekuitas", tipe: "Kredit", saldo: 1500000000 },
  { kode: "3-2000", nama: "Laba Ditahan", kategori: "Ekuitas", tipe: "Kredit", saldo: 250000000 },
  { kode: "3-3000", nama: "Laba Tahun Berjalan", kategori: "Ekuitas", tipe: "Kredit", saldo: 0 },

  // PENDAPATAN
  { kode: "4-1000", nama: "Pendapatan Penjualan", kategori: "Pendapatan", tipe: "Kredit", saldo: 0 },
  { kode: "4-2000", nama: "Pendapatan Lain-lain", kategori: "Pendapatan", tipe: "Kredit", saldo: 0 },

  // BEBAN POKOK PENJUALAN
  { kode: "5-1000", nama: "Beban Bahan Baku", kategori: "HPP", tipe: "Debit", saldo: 0 },
  { kode: "5-1100", nama: "Beban Tenaga Kerja Langsung", kategori: "HPP", tipe: "Debit", saldo: 0 },
  { kode: "5-1200", nama: "Beban Overhead Pabrik", kategori: "HPP", tipe: "Debit", saldo: 0 },

  // BEBAN OPERASIONAL
  { kode: "6-1000", nama: "Beban Gaji & Upah", kategori: "Beban Operasional", tipe: "Debit", saldo: 0 },
  { kode: "6-1100", nama: "Beban Listrik", kategori: "Beban Operasional", tipe: "Debit", saldo: 0 },
  { kode: "6-1101", nama: "Beban Air", kategori: "Beban Operasional", tipe: "Debit", saldo: 0 },
  { kode: "6-1200", nama: "Beban Pengiriman", kategori: "Beban Operasional", tipe: "Debit", saldo: 0 },
  { kode: "6-1300", nama: "Beban Marketing", kategori: "Beban Operasional", tipe: "Debit", saldo: 0 },
  { kode: "6-1400", nama: "Beban Pemeliharaan", kategori: "Beban Operasional", tipe: "Debit", saldo: 0 },
  { kode: "6-1500", nama: "Beban Penyusutan", kategori: "Beban Operasional", tipe: "Debit", saldo: 0 },
  { kode: "6-1600", nama: "Beban Administrasi", kategori: "Beban Operasional", tipe: "Debit", saldo: 0 },
]

export const jurnalUmum = [
  // Penjualan
  {
    id: "JU-2024-001",
    tanggal: "2024-01-16",
    referensi: "INV-2024-001",
    deskripsi: "Penjualan ke Toko Berkah Jaya",
    entries: [
      { akun: "1-1100", namaAkun: "Piutang Usaha", debit: 10500000, kredit: 0 },
      { akun: "4-1000", namaAkun: "Pendapatan Penjualan", debit: 0, kredit: 10500000 },
    ],
    totalDebit: 10500000,
    totalKredit: 10500000,
    status: "Posted",
  },
  {
    id: "JU-2024-002",
    tanggal: "2024-01-17",
    referensi: "INV-2024-002",
    deskripsi: "DP Penjualan ke Maju Jaya Snack",
    entries: [
      { akun: "1-1002", namaAkun: "Bank BCA", debit: 13200000, kredit: 0 },
      { akun: "1-1100", namaAkun: "Piutang Usaha", debit: 0, kredit: 13200000 },
    ],
    totalDebit: 13200000,
    totalKredit: 13200000,
    status: "Posted",
  },
  {
    id: "JU-2024-003",
    tanggal: "2024-01-17",
    referensi: "INV-2024-003",
    deskripsi: "Pelunasan Invoice Sumber Rezeki",
    entries: [
      { akun: "1-1001", namaAkun: "Bank Mandiri", debit: 4650000, kredit: 0 },
      { akun: "1-1100", namaAkun: "Piutang Usaha", debit: 0, kredit: 4650000 },
    ],
    totalDebit: 4650000,
    totalKredit: 4650000,
    status: "Posted",
  },
  // Pembelian
  {
    id: "JU-2024-004",
    tanggal: "2024-01-15",
    referensi: "PO-2024-001",
    deskripsi: "Pembayaran Supplier CV. Singkong Jaya",
    entries: [
      { akun: "1-1200", namaAkun: "Persediaan Bahan Baku", debit: 15000000, kredit: 0 },
      { akun: "1-1001", namaAkun: "Bank Mandiri", debit: 0, kredit: 15000000 },
    ],
    totalDebit: 15000000,
    totalKredit: 15000000,
    status: "Posted",
  },
  // Beban Operasional
  {
    id: "JU-2024-005",
    tanggal: "2024-01-16",
    referensi: "PAYROLL-JAN-2024",
    deskripsi: "Pembayaran Gaji Karyawan",
    entries: [
      { akun: "6-1000", namaAkun: "Beban Gaji & Upah", debit: 35000000, kredit: 0 },
      { akun: "1-1002", namaAkun: "Bank BCA", debit: 0, kredit: 35000000 },
    ],
    totalDebit: 35000000,
    totalKredit: 35000000,
    status: "Posted",
  },
  {
    id: "JU-2024-006",
    tanggal: "2024-01-17",
    referensi: "PLN-JAN-2024",
    deskripsi: "Pembayaran Listrik",
    entries: [
      { akun: "6-1100", namaAkun: "Beban Listrik", debit: 4500000, kredit: 0 },
      { akun: "1-1001", namaAkun: "Bank Mandiri", debit: 0, kredit: 4500000 },
    ],
    totalDebit: 4500000,
    totalKredit: 4500000,
    status: "Posted",
  },
  {
    id: "JU-2024-007",
    tanggal: "2024-01-19",
    referensi: "SHIP-JAN-W3",
    deskripsi: "Biaya Pengiriman",
    entries: [
      { akun: "6-1200", namaAkun: "Beban Pengiriman", debit: 2500000, kredit: 0 },
      { akun: "1-1000", namaAkun: "Kas Kecil", debit: 0, kredit: 2500000 },
    ],
    totalDebit: 2500000,
    totalKredit: 2500000,
    status: "Posted",
  },
  {
    id: "JU-2024-008",
    tanggal: "2024-01-20",
    referensi: "MAINT-001",
    deskripsi: "Maintenance Mesin Produksi",
    entries: [
      { akun: "6-1400", namaAkun: "Beban Pemeliharaan", debit: 3500000, kredit: 0 },
      { akun: "1-1000", namaAkun: "Kas Kecil", debit: 0, kredit: 3500000 },
    ],
    totalDebit: 3500000,
    totalKredit: 3500000,
    status: "Posted",
  },
  // HPP
  {
    id: "JU-2024-009",
    tanggal: "2024-01-18",
    referensi: "PROD-2024-003",
    deskripsi: "HPP Produksi Batch B240118003",
    entries: [
      { akun: "5-1000", namaAkun: "Beban Bahan Baku", debit: 8500000, kredit: 0 },
      { akun: "5-1100", namaAkun: "Beban Tenaga Kerja Langsung", debit: 2000000, kredit: 0 },
      { akun: "5-1200", namaAkun: "Beban Overhead Pabrik", debit: 1500000, kredit: 0 },
      { akun: "1-1201", namaAkun: "Persediaan Produk Jadi", debit: 0, kredit: 12000000 },
    ],
    totalDebit: 12000000,
    totalKredit: 12000000,
    status: "Posted",
  },
]

export const laporanLabaRugi = {
  periode: "Januari 2024",
  pendapatan: {
    penjualan: 122250000,
    lainLain: 500000,
    total: 122750000,
  },
  hpp: {
    bahanBaku: 45000000,
    tenagaKerja: 12000000,
    overhead: 8000000,
    total: 65000000,
  },
  labaKotor: 57750000,
  bebanOperasional: {
    gajiUpah: 35000000,
    listrik: 4500000,
    air: 800000,
    pengiriman: 2500000,
    marketing: 2000000,
    pemeliharaan: 3500000,
    penyusutan: 5000000,
    administrasi: 500000,
    total: 53800000,
  },
  labaOperasional: 3950000,
  pendapatanBebanLain: {
    bungaBank: -1200000,
    total: -1200000,
  },
  labaBersih: 2750000,
}

export const neraca = {
  tanggal: "31 Januari 2024",
  aset: {
    asetLancar: {
      kas: 5000000,
      bank: 525000000,
      piutang: 98420000,
      persediaanBahan: 125000000,
      persediaanProduk: 85000000,
      total: 838420000,
    },
    asetTetap: {
      tanah: 500000000,
      bangunan: 800000000,
      mesin: 350000000,
      kendaraan: 200000000,
      akumulasiPenyusutan: -150000000,
      total: 1700000000,
    },
    totalAset: 2538420000,
  },
  liabilitas: {
    liabilitasJangkaPendek: {
      hutangUsaha: 59000000,
      hutangBank: 100000000,
      total: 159000000,
    },
    liabilitasJangkaPanjang: {
      hutangJangkaPanjang: 300000000,
      total: 300000000,
    },
    totalLiabilitas: 459000000,
  },
  ekuitas: {
    modalPemilik: 1500000000,
    labaDitahan: 250000000,
    labaTahunBerjalan: 329420000,
    totalEkuitas: 2079420000,
  },
  totalLiabilitasDanEkuitas: 2538420000,
}

export const arusKas = {
  periode: "Januari 2024",
  aktivitasOperasi: {
    penerimaanDariPelanggan: 54030000,
    pembayaranKeSupplier: -54000000,
    pembayaranBebanOperasional: -48800000,
    kasOperasi: -48770000,
  },
  aktivitasInvestasi: {
    pembelianAsetTetap: -25000000,
    kasInvestasi: -25000000,
  },
  aktivitasPendanaan: {
    penerimaanHutangBank: 50000000,
    pembayaranHutangBank: -10000000,
    kasPendanaan: 40000000,
  },
  kenaikanKasBersih: -33770000,
  kasDiAwal: 563770000,
  kasDiAkhir: 530000000,
}
