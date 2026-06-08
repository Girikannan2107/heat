export function mapBackendResponseToUI(apiResponse: any) {
  // Handle case where response is wrapped in { data: ... }
  const data = apiResponse?.data ? apiResponse.data : apiResponse;

  const metadata = data?.document_metadata || {};
  const process = data?.process_details || {};
  const patterns = data?.pattern_data || [];
  const rows = data?.main_table_data || [];
  const signatures = data?.signatures || {};

  return {
    metadata: {
      title: metadata.document_title || "Heat Treatment Cycle Report",
      cycleNo: metadata.cycle_no || "Unknown",
      cycleDate: metadata.cycle_date || "Unknown",
      furnace: metadata.furnace || "Unknown",
      maxThickness: metadata.max_thick_loaded || "Unknown",
    },
    processDetails: [
      { label: "F/C On Time", value: process.fc_on_time || "-", tone: "molten" as const },
      { label: "Temp Reached At", value: process.temp_reach_at || "-", tone: "amber" as const },
      { label: "F/C Off Time", value: process.fc_off_time || "-", tone: "molten" as const },
      { label: "Quenching Seconds", value: process.quenching_sec || "-", tone: "amber" as const },
      { label: "Water Temp Before", value: process.water_temp_before || "-", tone: "cool" as const },
      { label: "Water Temp After", value: process.water_temp_after || "-", tone: "amber" as const },
    ],
    patterns: patterns.map((p: any) => ({
      code: p.pattern_code || "Unknown",
      item: p.item_name || "Unknown",
      remarks: p.remarks || "-",
    })),
    rows: rows.map((item: any) => {
      const cleanQtyStr = String(item.qty || 0).replace(/[^0-9.-]/g, "");
      const cleanWeightStr = String(item.weight || 0).replace(/[^0-9.-]/g, "");
      return {
        pourDate: item.pour_date || "-",
        heatNo: item.heat_no || "-",
        grade: item.grade || "-",
        saleOrder: item.sale_order || "-",
        drawingNo: item.drawing_no || "",
        partNo: item.part_no || "",
        description: item.description || "-",
        qty: Number(cleanQtyStr) || 0,
        weight: Number(cleanWeightStr) || 0,
      };
    }),

    verification: {
      labInCharge: { name: "Lab In Charge", ok: signatures.lab_in_charge === "true" || signatures.lab_in_charge === true },
      qaInCharge: { name: "QA In Charge", ok: signatures.qa_in_charge === "true" || signatures.qa_in_charge === true },
      digitalSignature: signatures.verified_sign || "Unknown",
    },
  };
}