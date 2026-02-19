// ============================================================
// MyStreet - Infrastructure Issues Data
// Location: Yoganand Vihar, Roorkee, Uttarakhand
// Generated from MyStreet.csv
// ============================================================

// Coordinate reference:
// Starting Point: 29.8723938, 77.881257
// Stem runs NORTH (76.8m), Branch runs EAST-WEST (52.31m)

export const STREET_CENTER = [29.8727388, 77.8812570]; // mid-stem
export const STREET_START = [29.8723938, 77.881257];
export const STREET_CONFIG = {
  name: "MyStreet",
  area: "Yoganand Vihar, Nehru Nagar, Roorkee",
  totalIssues: 67,
  totalLocations: 15,
  documentedDate: "8 Feb 2026",
};

// Severity color mapping
export const SEVERITY_COLORS = {
  Critical: "#FF1744",
  High: "#FF6D00",
  Medium: "#FFD600",
  Low: "#00C853",
};

export const SEVERITY_ORDER = { Critical: 4, High: 3, Medium: 2, Low: 1 };

// Issue type icons
export const ISSUE_ICONS = {
  "Road crack": "🔱",
  Pothole: "⚠️",
  "Broken Uneven": "⛰️",
};

// ============================================================
// GROUPED LOCATIONS
// Each location = one pin on map
// Multiple issues/photos grouped per location
// ============================================================

export const LOCATIONS = [
  // ──────────────────────────────────────────────────────────
  // LEFT BRANCH - LEFT SIDE (LB_LS)
  // South side of branch, facing north
  // 01 = farthest west, 03 = closest to stem
  // ──────────────────────────────────────────────────────────
  {
    id: "LB_LS-01",
    label: "LB · Left Side · House 01",
    zone: "Left Branch",
    coords: [29.8730774, 77.8810402],
    issues: [
      { id: "RK_ST_01", type: "Road crack", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1q-ePqcN-XrU_QNHJvilJcFO_EFyYMg6E/view?usp=drive_link" },
      { id: "RK_ST_02", type: "Road crack", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1I3KGq8KVEFwz8epS048jnFQno7OUjZnj/view?usp=drive_link" },
      { id: "RK_ST_03", type: "Road crack", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1hTnrY98ZJJ2tUDIPh3Q9DBPcnBxtI_vJ/view?usp=drive_link" },
      { id: "RK_ST_04", type: "Pothole",    severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1j_pFGFDj9acGWQmewrCO_IfMahwykXmI/view?usp=drive_link" },
      { id: "RK_ST_05", type: "Road crack", severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1ojPBv6XEmWdRgHCqro7ELw2p_ON4kGuG/view?usp=drive_link" },
      { id: "RK_ST_06", type: "Road crack", severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1f1AOfCbOTb7I0mfozivcT70EBpDgef8a/view?usp=drive_link" },
      { id: "RK_ST_07", type: "Road crack", severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1LxAzb_f7DzOkukQ-QrGfbeE7E9rZFHWS/view?usp=drive_link" },
      { id: "RK_ST_08", type: "Road crack", severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1mA7vwY__wldVDCoC8RQFodVF3-VlHiTg/view?usp=drive_link" },
      { id: "RK_ST_09", type: "Broken Uneven", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/189dY7srQWHqmGVVbv4q349ePVW1qHjgF/view?usp=drive_link" },
    ],
  },
  {
    id: "LB_LS-02",
    label: "LB · Left Side · House 02",
    zone: "Left Branch",
    coords: [29.8730774, 77.8810944],
    issues: [
      { id: "RK_ST_15", type: "Broken Uneven", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1N06IdO7bhKUuX6T-tkfYhXfQTkkAVRP9/view?usp=drive_link" },
      { id: "RK_ST_16", type: "Broken Uneven", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1E1d_bVPVZCmMeHXp0cudHJ7WygHOwmnc/view?usp=drive_link" },
      { id: "RK_ST_17", type: "Road crack",    severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1aFmuQLLKni7RoaqUFdP47hSC2dOE1TOl/view?usp=drive_link" },
      { id: "RK_ST_18", type: "Broken Uneven", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1knid8gjIEFEClAPStB8lwK24ACoXZQw8/view?usp=drive_link" },
      { id: "RK_ST_19", type: "Broken Uneven", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1tr4gPgktKO1-Glu-rbk7dfKMGm6w8r9Q/view?usp=drive_link" },
    ],
  },
  {
    id: "LB_LS-03",
    label: "LB · Left Side · House 03",
    zone: "Left Branch",
    coords: [29.8730774, 77.8811486],
    issues: [
      { id: "RK_ST_26", type: "Broken Uneven", severity: "Low", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1N0p4eQb3_VH6Wrpxw5ki5Fz3LGHrbhpe/view?usp=drive_link" },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // LEFT BRANCH - RIGHT SIDE (LB_RS)
  // North side of branch, facing south
  // 01 = farthest west, 04 = closest to stem
  // ──────────────────────────────────────────────────────────
  {
    id: "LB_RS-01",
    label: "LB · Right Side · House 01",
    zone: "Left Branch",
    coords: [29.8730900, 77.8810402],
    issues: [
      { id: "RK_ST_10", type: "Pothole",    severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/17dCpR4S09vvj8i7k7OQ5el0IO2rdXQDI/view?usp=drive_link" },
      { id: "RK_ST_11", type: "Road crack", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1cZhiJSv4n_lwMU0eiia4SmDVt5YfzGL3/view?usp=drive_link" },
    ],
  },
  {
    id: "LB_RS-02",
    label: "LB · Right Side · House 02",
    zone: "Left Branch",
    coords: [29.8730900, 77.8810944],
    issues: [
      { id: "RK_ST_12", type: "Road crack",    severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1XEFoUXHn3Qz6kizHxB6MfzfQT4pAfitk/view?usp=drive_link" },
      { id: "RK_ST_13", type: "Broken Uneven", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1FfXcCX2s7rf9-L2S0QJKU8_Wnrpw7_72/view?usp=drive_link" },
      { id: "RK_ST_14", type: "Pothole",       severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/13uyEIH1w_3kQ_Klg-i86qrpk_jMzyYfA/view?usp=drive_link" },
    ],
  },
  {
    id: "LB_RS-03",
    label: "LB · Right Side · House 03",
    zone: "Left Branch",
    coords: [29.8730900, 77.8811486],
    issues: [
      { id: "RK_ST_20", type: "Road crack", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/10g272Xzh2PoGXdON4RGtFxOdjiWPRT7L/view?usp=drive_link" },
      { id: "RK_ST_23", type: "Road crack", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/17OIofA8cjI6PamnAeYlOgmQnatv-1yFM/view?usp=drive_link" },
    ],
  },
  {
    id: "LB_RS-04",
    label: "LB · Right Side · House 04",
    zone: "Left Branch",
    coords: [29.8730900, 77.8812028],
    issues: [
      { id: "RK_ST_21", type: "Road crack", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1OWwvPx7A5wz76wpF6UZWrUkM0i8kvv7_/view?usp=drive_link" },
      { id: "RK_ST_22", type: "Road crack", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1ANQ01urvNVM_v4ApmqaV8RJ1SlS1t3ok/view?usp=drive_link" },
      { id: "RK_ST_24", type: "Road crack", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1bngbH5m0knXGIBwksV4IG0mnLCsrBB9_/view?usp=drive_link" },
      { id: "RK_ST_25", type: "Road crack", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/125gQpiN4dFypUFNakMjHy4HfWhM7xrF3/view?usp=drive_link" },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // STEM - LEFT SIDE (S_LS)
  // West side of stem, houses face east (inward)
  // 01 = closest to entrance, 06 = closest to branch
  // ──────────────────────────────────────────────────────────
  {
    id: "S_LS-02",
    label: "Stem · Left Side · House 02",
    zone: "Stem",
    coords: [29.8725909, 77.8812497],
    issues: [
      { id: "RK_ST_48", type: "Road crack", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/12hlF6L3danT_dvbjM6TJ9QZLBXjM4Ynj/view?usp=drive_link" },
      { id: "RK_ST_49", type: "Road crack", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1WTpEK2QhWKNkbL6Nr7vrurnNIKy4iAzf/view?usp=drive_link" },
      { id: "RK_ST_50", type: "Road crack", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1NXNP_2A4t6o_aFxHIeNsAV00TRIhSlrR/view?usp=drive_link" },
    ],
  },
  {
    id: "S_LS-03",
    label: "Stem · Left Side · House 03",
    zone: "Stem",
    coords: [29.8726895, 77.8812497],
    issues: [
      { id: "RK_ST_47", type: "Broken Uneven", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/12RAFz0ta9krdKGExf_tGu4VWxPan-DZF/view?usp=drive_link" },
    ],
  },
  {
    id: "S_LS-04",
    label: "Stem · Left Side · House 04",
    zone: "Stem",
    coords: [29.8727880, 77.8812497],
    issues: [
      { id: "RK_ST_42", type: "Road crack",    severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1vi8H5kz_GxWo5EY-RxgASANiemBfc3aR/view?usp=drive_link" },
      { id: "RK_ST_43", type: "Road crack",    severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1PG0H7YHN2kgubvtaoeo51AtEBVusN8gq/view?usp=drive_link" },
      { id: "RK_ST_44", type: "Broken Uneven", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1sqQb-P_27X7YnFjUaoFBCF-gc5_A8y3P/view?usp=drive_link" },
    ],
  },
  {
    id: "S_LS-06",
    label: "Stem · Left Side · House 06",
    zone: "Stem",
    coords: [29.8729851, 77.8812497],
    issues: [
      { id: "RK_ST_27", type: "Road crack", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1xtdtetwXW-Ebxl-I-S3F7w73jGz7Cj4n/view?usp=drive_link" },
      { id: "RK_ST_28", type: "Road crack", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1W-iOV30yhKmwnC8aqaBy4qonH7sAG-M7/view?usp=drive_link" },
      { id: "RK_ST_29", type: "Road crack", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1Uhmo2PWDgwuUYdPVQ1I3e_kq82kyXPsY/view?usp=drive_link" },
      { id: "RK_ST_30", type: "Road crack", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/13NAghjnPRxdVT-slTthH4sv-AHA-SciF/view?usp=drive_link" },
      { id: "RK_ST_31", type: "Road crack", severity: "High", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1FKnVqhCy0ux0KAFZMENVYcEZ4neaE_Ym/view?usp=drive_link" },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // STEM - RIGHT SIDE (S_RS)
  // East side of stem, houses face west (inward) — School is here
  // 01 = closest to entrance, 05 = closest to branch
  // ──────────────────────────────────────────────────────────
  {
    id: "S_RS-01",
    label: "Stem · Right Side · House 01",
    zone: "Stem",
    coords: [29.8724924, 77.8812643],
    issues: [
      { id: "RK_ST_57", type: "Broken Uneven", severity: "High",     status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1XDy4cs1FuMpA0I5sA5HacHtSiN8ARFUM/view?usp=drive_link" },
      { id: "RK_ST_58", type: "Broken Uneven", severity: "High",     status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1DZy41ix1n7FCBgGoNQCBICbMv-7HcvIz/view?usp=drive_link" },
      { id: "RK_ST_59", type: "Road crack",    severity: "High",     status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1O7MQ2lGhVn1-RWsXRcnYN8C6du6P2uf2/view?usp=drive_link" },
      { id: "RK_ST_60", type: "Road crack",    severity: "High",     status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1ofbPR74Hf5lpJs7Are6CQFHhVwE35Sh6/view?usp=drive_link" },
      { id: "RK_ST_61", type: "Broken Uneven", severity: "Critical", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/12GXLkEJ_3HrpyyJVIwtOHcoPdsxc8ui8/view?usp=drive_link" },
    ],
  },
  {
    id: "S_RS-02",
    label: "Stem · Right Side · House 02",
    zone: "Stem",
    coords: [29.8725909, 77.8812643],
    issues: [
      { id: "RK_ST_51", type: "Pothole",    severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1LWROkJWcCZ1XczTNUcpvThE2YBnzBcBd/view?usp=drive_link" },
      { id: "RK_ST_52", type: "Pothole",    severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1olLOGUBidINh-k-RsWTFeGqL3CUC6XIU/view?usp=drive_link" },
      { id: "RK_ST_53", type: "Pothole",    severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1ROdRdt1bcHc526X4QYeW9Htkh6blcg0U/view?usp=drive_link" },
      { id: "RK_ST_54", type: "Road crack", severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1Udux-4woFu7z_QiTqwKYADHtqHhoBASP/view?usp=drive_link" },
      { id: "RK_ST_55", type: "Road crack", severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1lGhuq9zx0mwznEzj9Lr0vbO2oaXY0Br7/view?usp=drive_link" },
      { id: "RK_ST_56", type: "Road crack", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1Z7jKSuJTVgTp9iGIJnpPqjDV_YVfzQCX/view?usp=drive_link" },
    ],
  },
  {
    id: "S_RS-04",
    label: "Stem · Right Side · House 04 (School area)",
    zone: "Stem",
    coords: [29.8727880, 77.8812643],
    issues: [
      { id: "RK_ST_33", type: "Road crack",    severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1D4YwOwOh5plWLTneGHamdwGiQxuLz5Ox/view?usp=drive_link" },
      { id: "RK_ST_34", type: "Road crack",    severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/17wZD1Yi4CAI9eAfSdmISz_ge7EyNz1hy/view?usp=drive_link" },
      { id: "RK_ST_35", type: "Broken Uneven", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1s9GXfsLS_xWqaZCmeqPrSCOMz4532ZXg/view?usp=drive_link" },
      { id: "RK_ST_36", type: "Road crack",    severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1rsBwi5-MsU7GRYq-DHS7prUfCnc-trUm/view?usp=drive_link" },
      { id: "RK_ST_37", type: "Road crack",    severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1gLaDXm5LrJlg8OolOuZzaAVCNU6urkeX/view?usp=drive_link" },
      { id: "RK_ST_38", type: "Broken Uneven", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1fg3YDqfpJCyIBbTzYm56LNXEg30K1Tjo/view?usp=drive_link" },
      { id: "RK_ST_39", type: "Road crack",    severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1brlceU-qWIFsOm6YbZNQj7BdxHjD4zfr/view?usp=drive_link" },
      { id: "RK_ST_40", type: "Road crack",    severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1MhJe8ybJPnYP-lmx46f8LPQrsngxNLva/view?usp=drive_link" },
      { id: "RK_ST_41", type: "Road crack",    severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1hYa5AxgnWCuVDKkPQfPy8JjImVPF6lZe/view?usp=drive_link" },
      { id: "RK_ST_45", type: "Road crack",    severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1YN4U17x3TEup6pc54DPVrYjICDm7sDvg/view?usp=drive_link" },
      { id: "RK_ST_46", type: "Road crack",    severity: "High",   status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1cgMXSkObDUikF5A-jvybiajCSLvXZ_l3/view?usp=drive_link" },
    ],
  },
  {
    id: "S_RS-05",
    label: "Stem · Right Side · House 05",
    zone: "Stem",
    coords: [29.8728866, 77.8812643],
    issues: [
      { id: "RK_ST_32", type: "Road crack", severity: "Medium", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1vG0ificopxXKx76Wx5G2HFnquDgLZHvc/view?usp=drive_link" },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // OUTSIDE STREET VIEW (at entrance)
  // ──────────────────────────────────────────────────────────
  {
    id: "OUTSIDE",
    label: "Outside Street Entrance",
    zone: "Entrance",
    coords: [29.8723489, 77.8812570],
    issues: [
      { id: "RK_ST_62", type: "Broken Uneven", severity: "Critical", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1GxYTSgTDofJxkxCf8r_7jrOAOixIRmp-/view?usp=drive_link" },
      { id: "RK_ST_63", type: "Pothole",       severity: "Critical", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1Gmq3k8S8zYp2Y5Rj3Xs8eqSaMTCSJLHR/view?usp=drive_link" },
      { id: "RK_ST_64", type: "Broken Uneven", severity: "Critical", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1dvdwNyopx-5xyAm-5FgO4BK6Ka6u4GiA/view?usp=drive_link" },
      { id: "RK_ST_65", type: "Broken Uneven", severity: "Critical", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1B5XLChs81uFbfWRzkYsJrrNnU9iuJu0p/view?usp=drive_link" },
      { id: "RK_ST_66", type: "Broken Uneven", severity: "Critical", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/1PrSFsodXf-oaW-11vpwgxLCeG2QPepFb/view?usp=drive_link" },
      { id: "RK_ST_67", type: "Broken Uneven", severity: "Critical", status: "Not Fixed", date: "8-Feb-2026", photo: "https://drive.google.com/file/d/10EJJYdWl_pKh3iVQQsPdFgwtoiw_GfDr/view?usp=drive_link" },
    ],
  },
];

// Helper: get worst severity for a location
export function getWorstSeverity(issues) {
  return issues.reduce((worst, issue) => {
    return SEVERITY_ORDER[issue.severity] > SEVERITY_ORDER[worst]
      ? issue.severity
      : worst;
  }, "Low");
}

// Helper: get unique issue types for a location
export function getIssueTypes(issues) {
  return [...new Set(issues.map((i) => i.type))];
}

// Summary stats
export const STATS = {
  total: LOCATIONS.reduce((sum, l) => sum + l.issues.length, 0),
  critical: LOCATIONS.reduce((sum, l) => sum + l.issues.filter(i => i.severity === "Critical").length, 0),
  high: LOCATIONS.reduce((sum, l) => sum + l.issues.filter(i => i.severity === "High").length, 0),
  medium: LOCATIONS.reduce((sum, l) => sum + l.issues.filter(i => i.severity === "Medium").length, 0),
  low: LOCATIONS.reduce((sum, l) => sum + l.issues.filter(i => i.severity === "Low").length, 0),
};