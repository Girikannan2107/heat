export type Row = {
  pourDate: string;
  heatNo: string;
  grade: string;
  saleOrder: string;
  drawingNo: string;
  partNo: string;
  description: string;
  qty: number;
  weight: number;
};

export const metadata = {
  title: "Heat Treatment Cycle Report",
  cycleNo: "HT-2410-0473",
  cycleDate: "2026-06-07",
  furnace: "Furnace 03 — Bogie Hearth",
  maxThickness: "182 mm",
};

export const processDetails = [
  { label: "F/C On Time", value: "04:12:08", tone: "molten" },
  { label: "Temp Reached At", value: "07:48:22 · 1040°C", tone: "amber" },
  { label: "F/C Off Time", value: "11:30:00", tone: "molten" },
  { label: "Quenching Seconds", value: "92 s", tone: "amber" },
  { label: "Water Temp Before", value: "28.4 °C", tone: "cool" },
  { label: "Water Temp After", value: "47.9 °C", tone: "amber" },
];

export const patterns = [
  { code: "PTN-CA6NM-A1", item: "Runner Casing Vane", remarks: "≤ 120 mm" },
  { code: "PTN-FP17-B3", item: "Impeller Hub", remarks: "≤ 180 mm" },
  { code: "PTN-CA15-C2", item: "Guide Bearing Sleeve", remarks: "≤ 90 mm" },
  { code: "PTN-CA6NM-D4", item: "Bottom Ring Segment", remarks: "≤ 150 mm" },
];

export const rows: Row[] = [
  { pourDate: "2026-05-22", heatNo: "H-88241", grade: "CA6NM", saleOrder: "SO-7714", drawingNo: "DRG-44A", partNo: "PN-1102", description: "Runner Vane Casting", qty: 4, weight: 1820 },
  { pourDate: "2026-05-23", heatNo: "H-88259", grade: "FP-17", saleOrder: "SO-7720", drawingNo: "DRG-44B", partNo: "PN-1108", description: "Impeller Hub", qty: 2, weight: 940 },
  { pourDate: "2026-05-25", heatNo: "H-88276", grade: "CA15", saleOrder: "SO-7733", drawingNo: "DRG-51C", partNo: "PN-1140", description: "Guide Sleeve", qty: 6, weight: 510 },
  { pourDate: "2026-05-27", heatNo: "H-88301", grade: "CA6NM", saleOrder: "SO-7741", drawingNo: "DRG-60A", partNo: "PN-1188", description: "Bottom Ring Segment", qty: 3, weight: 2240 },
  { pourDate: "2026-05-28", heatNo: "H-88318", grade: "FP-17", saleOrder: "SO-7748", drawingNo: "DRG-62F", partNo: "PN-1207", description: "Stay Vane", qty: 5, weight: 1330 },
  { pourDate: "2026-05-30", heatNo: "H-88340", grade: "CA6NM", saleOrder: "SO-7760", drawingNo: "DRG-71D", partNo: "PN-1255", description: "Wicket Gate", qty: 8, weight: 980 },
  { pourDate: "2026-06-01", heatNo: "H-88362", grade: "CA15", saleOrder: "SO-7778", drawingNo: "DRG-83A", partNo: "PN-1301", description: "Bearing Ring", qty: 2, weight: 1610 },
];

export const verification = {
  labInCharge: { name: "R. Mahadevan", ok: true },
  qaInCharge: { name: "S. Iyer", ok: true },
  digitalSignature: "0xA4F2-CYC-2410-0473-7B91D3",
};

export const historicalLogs = Array.from({ length: 14 }).map((_, i) => ({
  id: `HT-2410-${(400 + i).toString().padStart(4, "0")}`,
  date: `2026-${(5 - Math.floor(i / 6)).toString().padStart(2, "0")}-${(28 - (i % 28)).toString().padStart(2, "0")}`,
  furnace: `Furnace 0${(i % 4) + 1}`,
  grade: ["CA6NM", "FP-17", "CA15"][i % 3],
  heats: 4 + (i % 5),
  tonnage: (2.4 + (i % 7) * 0.42).toFixed(2),
  status: ["Verified", "Verified", "Pending QA", "Verified"][i % 4],
}));
