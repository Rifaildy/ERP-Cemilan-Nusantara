// --- DAFTAR MESIN ---
export const MACHINES = [
  { id: 1, name: "Mesin Pengupas Singkong A", type: "Peeler", capacityPerHour: 500, status: "Active", maintenanceSchedule: "2025-11-01" },
  { id: 2, name: "Mesin Slicer (Pemotong) Otomatis", type: "Slicer", capacityPerHour: 400, status: "Active", maintenanceSchedule: "2025-11-05" },
  { id: 3, name: "Deep Fryer Industrial 1", type: "Fryer", capacityPerHour: 200, status: "Active", maintenanceSchedule: "2025-10-30" },
  { id: 4, name: "Deep Fryer Industrial 2", type: "Fryer", capacityPerHour: 200, status: "Maintenance", maintenanceSchedule: "2025-10-26" }, // Sedang rusak
  { id: 5, name: "Mesin Spinner (Peniris Minyak)", type: "Spinner", capacityPerHour: 300, status: "Active", maintenanceSchedule: "2025-11-10" },
  { id: 6, name: "Mesin Sealer Nitrogen", type: "Packaging", capacityPerHour: 600, status: "Active", maintenanceSchedule: "2025-11-15" }
];

// --- RESEP PRODUKSI (BILL OF MATERIALS) ---
// Logika: Untuk membuat 1 Batch (misal 100 pcs), butuh bahan apa saja?
export const RECIPES = [
  {
    id: 1,
    productCode: "KS-ORI-250", // Kripik Singkong Original 250gr
    productName: "Kripik Singkong Original 250gr",
    batchSize: 100, // Resep ini untuk membuat 100 bungkus
    ingredients: [
      { materialId: 1, name: "Singkong Mentah", amount: 40, unit: "Kg" }, // Butuh 40kg singkong
      { materialId: 5, name: "Minyak Goreng", amount: 15, unit: "Liter" },
      { materialId: 12, name: "Garam Halus", amount: 1, unit: "Pack" },
      { materialId: 13, name: "Plastik Kemasan 250gr", amount: 100, unit: "Pcs" },
      { materialId: 6, name: "Gas LPG", amount: 0.1, unit: "Tabung" } // Estimasi pakai gas
    ]
  },
  {
    id: 2,
    productCode: "KS-BAL-250", // Kripik Singkong Balado 250gr
    productName: "Kripik Singkong Balado 250gr",
    batchSize: 100,
    ingredients: [
      { materialId: 1, name: "Singkong Mentah", amount: 40, unit: "Kg" },
      { materialId: 5, name: "Minyak Goreng", amount: 15, unit: "Liter" },
      { materialId: 8, name: "Bumbu Balado Premium", amount: 3, unit: "Kg" }, // Tambahan bumbu
      { materialId: 13, name: "Plastik Kemasan 250gr", amount: 100, unit: "Pcs" },
      { materialId: 6, name: "Gas LPG", amount: 0.1, unit: "Tabung" }
    ]
  }
];