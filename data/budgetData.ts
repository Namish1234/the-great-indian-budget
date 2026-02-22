import { 
  AlertCircle, Wallet, Landmark, TrendingUp, 
  Shield, TrainFront, Truck, Zap, Home, Cpu, 
  Activity, Droplets, Building2, Scissors,
  FileText, ShoppingCart, Wifi, Globe,
  Banknote, Sprout, Anchor, Pickaxe, HeartPulse, GraduationCap
} from 'lucide-react';

// --- 1. KPI CARDS (Sourced from Budget at a Glance 2025-26) ---
export const kpiData = [
  { 
    id: 'KPI-01',
    title: "Fiscal Deficit", 
    value: "4.5%", 
    change: "Target Met", 
    isPositive: true, 
    icon: AlertCircle, 
    desc: "Abs. Number: ₹15.68 Lakh Cr (FY26 BE)",
    metricId: 'MAC-01'
  },
  { 
    id: 'KPI-02',
    title: "Effective Capex", 
    value: "₹ 15.48 LC", 
    change: "+12.1%", 
    isPositive: true, 
    icon: Landmark, 
    desc: "Central Capex + Grants for Assets",
    metricId: 'MAC-CAP'
  },
  { 
    id: 'KPI-03',
    title: "Net Tax Receipts", 
    value: "₹ 28.37 LC", 
    change: "+10.9%", 
    isPositive: true, 
    icon: TrendingUp, 
    desc: "vs ₹25.56 LC (FY25 RE)",
    metricId: 'MAC-TAX'
  },
  { 
    id: 'KPI-04',
    title: "Total Budget Size", 
    value: "₹ 50.65 LC", 
    change: "+7.4%", 
    isPositive: true, 
    icon: Wallet, 
    desc: "vs ₹47.16 LC (FY25 RE)",
    metricId: 'MAC-EXP'
  },
];

// --- 2. MASTER DATA REPOSITORY ---
export const masterData = [
  // --- MACRO ---
  { 
    id: 'MAC-01', name: "Fiscal Deficit", category: "Macro", subSector: "Fiscal Policy",
    unit: "Lakh Cr", fy24A: 16.54, fy25BE: 16.13, fy25RE: 15.69, fy26BE: 15.68, 
    trend: "down", score: 5.0, 
    desc: "The difference between total revenue and total expenditure. Lower is better for bond yields.",
    citation: "Budget at a Glance, Deficit Statistics", calculation: "Total Exp - Total Non-Debt Receipts",
    impact: "Bullish for Banks. Lower borrowing means less crowding out.",
    stocks: ["SBI", "HDFC Bank", "Liquid BeES"]
  },
  { 
    id: 'MAC-CAP', name: "Capital Expenditure (Central)", category: "Macro", subSector: "Infrastructure",
    unit: "Lakh Cr", fy24A: 9.49, fy25BE: 11.11, fy25RE: 10.18, fy26BE: 11.21, 
    trend: "up", score: 5.0, 
    desc: "Funds used to create assets like roads, railways, and machinery.",
    citation: "Budget at a Glance, Expenditure Profile", calculation: "Sum of all Capital Heads",
    impact: "Bullish for Infrastructure, Cement, Steel.",
    stocks: ["L&T", "UltraTech", "Tata Steel"]
  },

  // --- DEFENCE (Demand 21 - Capital Outlay) ---
  { 
    id: 'DEF-01', name: "Defence Capital Outlay", category: "Ministry of Defence", subSector: "Modernization",
    unit: "Cr", fy24A: 154256, fy25BE: 172000, fy25RE: 159500, fy26BE: 180000, 
    trend: "up", score: 5.0, 
    desc: "Expenditure on new weaponry, aircraft, ships. A massive jump to ₹1.8 Lakh Cr.",
    citation: "Expenditure Budget, Demand No 21", calculation: "Total Capital Expenditure",
    impact: "Very Bullish for Defence OEMs.",
    stocks: ["HAL", "BEL", "Bharat Dynamics"]
  },

  // --- RAILWAYS (Demand 85) ---
  { 
    id: 'RLY-01', name: "Railways Total Capital", category: "Ministry of Railways", subSector: "Infra",
    unit: "Cr", fy24A: 242578, fy25BE: 255000, fy25RE: 252000, fy26BE: 444277, // Note: FY26 includes extra budgetary resources in Gross
    trend: "up", score: 5.0, 
    desc: "Total capital investment in new lines, rolling stock and safety.",
    citation: "Demand No 85, Total Capital", calculation: "Net Capital Expenditure",
    impact: "Bullish for EPC contractors and wagon manufacturers.",
    stocks: ["RVNL", "IRCON", "Titagarh"]
  },

  // --- ROAD TRANSPORT (Demand 86) ---
  { 
    id: 'ROAD-01', name: "Road Transport Capital", category: "Ministry of Road Transport", subSector: "Highways",
    unit: "Cr", fy24A: 321045, fy25BE: 339657, fy25RE: 334389, fy26BE: 332325, 
    trend: "stable", score: 4.0, 
    desc: "Capital outlay on roads and bridges. Sustained at high levels.",
    citation: "Demand No 86", calculation: "Capital Section Total",
    impact: "Stable. Construction activity remains robust.",
    stocks: ["PNC Infratech", "KNR Constructions"]
  },

  // --- RURAL (Demand 87) ---
  { 
    id: 'RUR-01', name: "MGNREGA", category: "Rural Development", subSector: "Welfare",
    unit: "Cr", fy24A: 89154, fy25BE: 86000, fy25RE: 86000, fy26BE: 86000, 
    trend: "flat", score: 3.0, 
    desc: "Rural Employment Guarantee. Flat allocation implies Govt expects stable rural economy.",
    citation: "Demand No 87, Scheme 8", calculation: "Programme Component",
    impact: "Neutral. No aggressive populist push.",
    stocks: ["HUL", "Dabur", "Hero MotoCorp"]
  },
  { 
    id: 'RUR-02', name: "PM Awas Yojana (Rural)", category: "Rural Development", subSector: "Housing",
    unit: "Cr", fy24A: 32000, fy25BE: 54500, fy25RE: 54500, fy26BE: 54832, 
    trend: "up", score: 4.5, 
    desc: "Housing for All in rural areas. Allocation maintained at high levels.",
    citation: "Demand No 87, Scheme 12", calculation: "PMAY-Gramin",
    impact: "Positive for rural housing materials.",
    stocks: ["UltraTech", "Asian Paints"]
  },

  // --- FERTILISER (Demand 6) ---
  { 
    id: 'FERT-01', name: "Fertiliser Subsidy", category: "Chemicals & Fertilisers", subSector: "Subsidy",
    unit: "Cr", fy24A: 195465, fy25BE: 168127, fy25RE: 189320, fy26BE: 184067, 
    trend: "down", score: 4.0, 
    desc: "Subsidy on Urea and Nutrient Based Fertilisers.",
    citation: "Demand No 6", calculation: "Total Revenue Expenditure",
    impact: "Neutral for fertiliser companies (pass-through). Good for fiscal math.",
    stocks: ["Chambal Fert", "Coromandel"]
  },

  // --- TELECOM (Demand 13) ---
  {
    id: 'TEL-01', name: "Telecom Projects (Bharatnet)", category: "Communications", subSector: "Infra",
    unit: "Cr", fy24A: 3075, fy25BE: 8500, fy25RE: 6500, fy26BE: 22000, 
    trend: "up", score: 5.0, 
    desc: "Massive push for rural optical fibre connectivity.",
    citation: "Demand No 13", calculation: "Capital Outlay on Telecom",
    impact: "Very Bullish for optical fibre companies.",
    stocks: ["STL", "Tejas Networks"]
  }
];

// --- 3. SECTOR WATCHLIST ---
export const sectorWatchlist = [
  { 
    id: 1, category: "Strategic", sector: "Defence", allocation: "₹ 1.80 LC", change: "+12.8%", 
    trend: "Bullish", icon: Shield, color: "text-emerald-400", score: 5.0, 
    metricId: 'DEF-01',
    details: "Capital Outlay increased to ₹1.8L Cr (vs ₹1.59L RE). Focus on Deep Tech.",
    topPicks: ["HAL", "BEL", "Mazagon"]
  },
  { 
    id: 2, category: "Strategic", sector: "Railways", allocation: "₹ 4.44 LC", change: "High", 
    trend: "Bullish", icon: TrainFront, color: "text-emerald-400", score: 5.0,
    metricId: 'RLY-01',
    details: "Record Gross Capital allocation. Safety & Rolling Stock priority.",
    topPicks: ["Titagarh", "Siemens", "RVNL"]
  },
  { 
    id: 3, category: "Job Creators", sector: "Roads", allocation: "₹ 3.32 LC", change: "Stable", 
    trend: "Neutral", icon: Truck, color: "text-yellow-400", score: 4.0,
    metricId: 'ROAD-01',
    details: "Allocation flat at ₹3.32L Cr. Execution focus over new announcements.",
    topPicks: ["PNC Infra", "KNR Const"]
  },
  { 
    id: 4, category: "Consumer", sector: "Rural", allocation: "₹ 1.84 LC", change: "Flat", 
    trend: "Neutral", icon: Home, color: "text-yellow-500", score: 3.5,
    metricId: 'RUR-01',
    details: "MGNREGA flat at ₹86k Cr. PMAY-G maintained at ₹54k Cr.",
    topPicks: ["M&M", "Escorts"]
  },
  { 
    id: 5, category: "Agri-Input", sector: "Fertilisers", allocation: "₹ 1.84 LC", change: "-2.7%", 
    trend: "Positive", icon: Sprout, color: "text-emerald-400", score: 4.0,
    metricId: 'FERT-01',
    details: "Subsidy bill contained at ₹1.84L Cr vs ₹1.89L Cr (RE).",
    topPicks: ["Coromandel", "Chambal"]
  },
  { 
    id: 6, category: "Strategic", sector: "Telecom", allocation: "₹ 73k Cr", change: "+29%", 
    trend: "Very Bullish", icon: Wifi, color: "text-emerald-400", score: 5.0,
    metricId: 'TEL-01',
    details: "Capital injection for BSNL & Bharatnet sees massive jump.",
    topPicks: ["Tejas Networks", "STL"]
  }
];

// --- 4. OFFICIAL DOCUMENTS ---
export const officialDocs = [
  { id: 'DOC-01', title: "Budget Speech", size: "2.4 MB", source: "indiabudget.gov.in" },
  { id: 'DOC-02', title: "Budget at a Glance", size: "3.1 MB", source: "indiabudget.gov.in" },
  { id: 'DOC-03', title: "Expenditure Budget", size: "8.5 MB", source: "indiabudget.gov.in" },
];

// ... [Keep existing exports like kpiData, masterData, sectorWatchlist] ...

// --- 5. MONEY FLOW DATA (Sankey) ---
export const moneyFlowData = {
  nodes: [
    // Income Sources (Indices 0-3)
    { name: "Tax Revenue", type: "income" },
    { name: "Non-Tax Rev", type: "income" },
    { name: "Borrowings", type: "income" },
    { name: "Disinvestment", type: "income" },
    
    // The Pot (Index 4)
    { name: "Consolidated Fund", type: "pot" },
    
    // Expenses (Indices 5-10)
    { name: "Interest Pay", type: "expense" },
    { name: "Defence", type: "expense" },
    { name: "Subsidies", type: "expense" },
    { name: "States Share", type: "expense" },
    { name: "Pensions", type: "expense" },
    { name: "Schemes/Infra", type: "expense" }
  ],
  links: [
    // Inflows (Green)
    { source: 0, target: 4, value: 26.02, type: "inflow" }, // Tax
    { source: 1, target: 4, value: 3.00, type: "inflow" },  // Non-Tax
    { source: 2, target: 4, value: 16.85, type: "inflow" }, // Borrowing
    { source: 3, target: 4, value: 0.50, type: "inflow" },  // Disinvestment
    
    // Outflows (Red)
    { source: 4, target: 5, value: 11.90, type: "outflow" }, // Interest
    { source: 4, target: 6, value: 6.21, type: "outflow" },  // Defence
    { source: 4, target: 7, value: 4.10, type: "outflow" },  // Subsidies
    { source: 4, target: 8, value: 12.20, type: "outflow" }, // States
    { source: 4, target: 9, value: 2.40, type: "outflow" },  // Pensions
    { source: 4, target: 10, value: 9.56, type: "outflow" }  // Infra/Other
  ]
};

// ... keep existing kpiData, masterData, sectorWatchlist ...

// --- 6. DEEP DIVE SECTOR DATA (The "Tactical" Layer) ---
export const sectorDeepDive = {
  "Defence": { // Maps to sector name
    meta: {
      shareOfBudget: 14.1, // % of total budget
      totalAllocation: 180000, // Cr
      yoyGrowth: 12.8,
      status: "OVERWEIGHT"
    },
    timeline: [
      { year: 'FY22', budget: 1.35, actual: 1.38, index: 4200 },
      { year: 'FY23', budget: 1.52, actual: 1.50, index: 4800 },
      { year: 'FY24', budget: 1.62, actual: 1.65, index: 5600 },
      { year: 'FY25', budget: 1.72, actual: 1.70, index: 7200 },
      { year: 'FY26', budget: 1.80, actual: null, index: 8100 }, // No actual for future
    ],
    schemes: [
      { id: "IDEX-01", name: "iDEX (Innovation for Defence)", type: "R&D Grant", status: "Active", corpus: 300 },
      { id: "DTIS-04", name: "Def. Testing Infra Scheme", type: "Infra", status: "Active", corpus: 400 },
      { id: "MK-II",   name: "Make-II (Industry Funded)", type: "Procurement", status: "Sunset", corpus: 0 },
      { id: "UAV-X",   name: "Drone Shakti PLI", type: "PLI", status: "Active", corpus: 120 },
    ],
    network: {
      root: { name: "Ministry of Defence", type: "govt" },
      nodes: [
        { name: "DRDO", type: "regulator", parent: "Ministry of Defence" },
        { name: "Dept of Military Affairs", type: "regulator", parent: "Ministry of Defence" },
        { name: "HAL", type: "psu", parent: "DRDO" },
        { name: "BEL", type: "psu", parent: "DRDO" },
        { name: "Mazagon Dock", type: "psu", parent: "Dept of Military Affairs" },
        { name: "L&T Defence", type: "private", parent: "Dept of Military Affairs" }
      ]
    },
    stocks: [
      { ticker: "HAL", mktCap: "₹ 2.8L Cr", pe: 32.4, return: "+140%" },
      { ticker: "BEL", mktCap: "₹ 1.4L Cr", pe: 28.1, return: "+95%" },
      { ticker: "MAZDOCK", mktCap: "₹ 45k Cr", pe: 18.5, return: "+210%" },
      { ticker: "PARAS", mktCap: "₹ 3.2k Cr", pe: 65.2, return: "+12%" },
    ]
  }
};