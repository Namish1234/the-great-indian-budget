// --- SECTOR REPOSITORY & AGGREGATOR ---
import { defenceData } from './defence';

// --- DUMMY DATA FOR OTHER SECTORS (Condensed for brevity but functional) ---
// In a real app, these would be in separate files like railways.ts, roads.ts etc.

const railwaysData = {
  meta: { shareOfBudget: 6.8, totalAllocation: 265000, yoyGrowth: 5.2, status: "BULLISH" },
  timeline: [
    { year: 'FY22', budget: 1.10, actual: 1.08, index: 1200 },
    { year: 'FY23', budget: 1.40, actual: 1.35, index: 1500 },
    { year: 'FY24', budget: 2.40, actual: 2.42, index: 2800 },
    { year: 'FY25', budget: 2.55, actual: 2.50, index: 4100 },
    { year: 'FY26', budget: 2.65, actual: null, index: 4600 },
  ],
  schemes: [
    { id: "KAVACH", name: "Kavach Safety", type: "Safety", status: "Active", corpus: 5000 },
    { id: "VB-200", name: "Vande Bharat Prod.", type: "Rolling Stock", status: "Active", corpus: 12000 },
    { id: "AMS-STN", name: "Amrit Bharat Stn", type: "Infra", status: "Active", corpus: 8500 },
  ],
  network: {
    root: { name: "Ministry of Railways", type: "govt" },
    nodes: [
      { name: "Railway Board", type: "regulator", parent: "Ministry of Railways" },
      { name: "RDSO", type: "regulator", parent: "Railway Board" },
      { name: "RVNL", type: "psu", parent: "Railway Board" },
      { name: "IRCON", type: "psu", parent: "Railway Board" },
      { name: "Titagarh", type: "private", parent: "RDSO" },
      { name: "Jupiter Wagons", type: "private", parent: "RDSO" }
    ]
  },
  stocks: [
    { ticker: "RVNL", mktCap: "₹ 65k Cr", pe: 42.1, return: "+180%" },
    { ticker: "IRCON", mktCap: "₹ 22k Cr", pe: 18.4, return: "+110%" },
    { ticker: "TITAGARH", mktCap: "₹ 14k Cr", pe: 55.2, return: "+85%" },
    { ticker: "IRFC", mktCap: "₹ 1.8L Cr", pe: 32.0, return: "+240%" },
  ]
};

const roadsData = {
  meta: { shareOfBudget: 5.8, totalAllocation: 278000, yoyGrowth: 2.1, status: "NEUTRAL" },
  timeline: [
    { year: 'FY22', budget: 1.18, actual: 1.20, index: 1100 },
    { year: 'FY23', budget: 1.99, actual: 2.05, index: 1300 },
    { year: 'FY24', budget: 2.70, actual: 2.68, index: 1550 },
    { year: 'FY25', budget: 2.72, actual: 2.70, index: 1700 },
    { year: 'FY26', budget: 2.78, actual: null, index: 1800 },
  ],
  schemes: [
    { id: "BM-PH1", name: "Bharatmala P-1", type: "Infra", status: "Active", corpus: 45000 },
    { id: "NH-O",   name: "NH (Original)", type: "Maintenance", status: "Active", corpus: 20000 },
    { id: "RD-SFT", name: "Road Safety", type: "Welfare", status: "Active", corpus: 500 },
  ],
  network: {
    root: { name: "MoRTH", type: "govt" },
    nodes: [
      { name: "NHAI", type: "regulator", parent: "MoRTH" },
      { name: "NHIDCL", type: "regulator", parent: "MoRTH" },
      { name: "PNC Infratech", type: "private", parent: "NHAI" },
      { name: "KNR Const", type: "private", parent: "NHAI" },
      { name: "IRB Infra", type: "private", parent: "NHAI" },
    ]
  },
  stocks: [
    { ticker: "PNCINFRA", mktCap: "₹ 11k Cr", pe: 14.5, return: "+25%" },
    { ticker: "KNRCON", mktCap: "₹ 8k Cr", pe: 18.2, return: "+15%" },
    { ticker: "IRB", mktCap: "₹ 40k Cr", pe: 45.0, return: "+65%" },
    { ticker: "GRINFRA", mktCap: "₹ 14k Cr", pe: 12.8, return: "-5%" },
  ]
};

const agriData = {
  meta: { shareOfBudget: 3.2, totalAllocation: 125000, yoyGrowth: 2.0, status: "DEFENSIVE" },
  timeline: [
    { year: 'FY22', budget: 1.23, actual: 1.18, index: 2100 },
    { year: 'FY23', budget: 1.24, actual: 1.15, index: 2200 },
    { year: 'FY24', budget: 1.15, actual: 1.16, index: 2150 },
    { year: 'FY25', budget: 1.17, actual: 1.17, index: 2300 },
    { year: 'FY26', budget: 1.25, actual: null, index: 2350 },
  ],
  schemes: [
    { id: "PM-KISAN", name: "PM Kisan Samman", type: "Cash Transfer", status: "Active", corpus: 60000 },
    { id: "MISS", name: "Interest Subvention", type: "Subsidy", status: "Active", corpus: 22600 },
    { id: "FPO-10K", name: "10k FPO Formation", type: "Grant", status: "Active", corpus: 500 },
  ],
  network: {
    root: { name: "Min of Agriculture", type: "govt" },
    nodes: [
      { name: "ICAR", type: "regulator", parent: "Min of Agriculture" },
      { name: "NABARD", type: "regulator", parent: "Min of Agriculture" },
      { name: "Kaveri Seeds", type: "private", parent: "ICAR" },
      { name: "PI Industries", type: "private", parent: "ICAR" },
      { name: "UPL", type: "private", parent: "ICAR" },
    ]
  },
  stocks: [
    { ticker: "PIIND", mktCap: "₹ 60k Cr", pe: 42.0, return: "+12%" },
    { ticker: "UPL", mktCap: "₹ 38k Cr", pe: 15.5, return: "-18%" },
    { ticker: "KSCL", mktCap: "₹ 3.5k Cr", pe: 11.2, return: "+22%" },
    { ticker: "BAYERCROP", mktCap: "₹ 24k Cr", pe: 32.0, return: "+5%" },
  ]
};

const powerData = {
  meta: { shareOfBudget: 2.1, totalAllocation: 85000, yoyGrowth: 15.5, status: "BULLISH" },
  timeline: [
    { year: 'FY22', budget: 0.45, actual: 0.42, index: 1800 },
    { year: 'FY23', budget: 0.55, actual: 0.52, index: 2400 },
    { year: 'FY24', budget: 0.65, actual: 0.68, index: 3200 },
    { year: 'FY25', budget: 0.75, actual: 0.74, index: 4500 },
    { year: 'FY26', budget: 0.85, actual: null, index: 5200 },
  ],
  schemes: [
    { id: "SURYA", name: "PM Surya Ghar", type: "Solar Subsidy", status: "Active", corpus: 10000 },
    { id: "G-HYD", name: "Green Hydrogen", type: "PLI", status: "Active", corpus: 600 },
    { id: "RDSS", name: "Revamped Dist. Scheme", type: "Infra", status: "Active", corpus: 12000 },
  ],
  network: {
    root: { name: "Ministry of Power", type: "govt" },
    nodes: [
      { name: "CEA", type: "regulator", parent: "Ministry of Power" },
      { name: "NTPC", type: "psu", parent: "Ministry of Power" },
      { name: "PowerGrid", type: "psu", parent: "Ministry of Power" },
      { name: "Tata Power", type: "private", parent: "CEA" },
      { name: "Adani Green", type: "private", parent: "CEA" },
    ]
  },
  stocks: [
    { ticker: "TATAPOWER", mktCap: "₹ 1.2L Cr", pe: 35.0, return: "+85%" },
    { ticker: "NTPC", mktCap: "₹ 3.1L Cr", pe: 18.0, return: "+75%" },
    { ticker: "POWERGRID", mktCap: "₹ 2.5L Cr", pe: 14.5, return: "+45%" },
    { ticker: "JSWENERGY", mktCap: "₹ 90k Cr", pe: 48.0, return: "+110%" },
  ]
};

const telecomData = {
  meta: { shareOfBudget: 2.8, totalAllocation: 109000, yoyGrowth: 17.0, status: "RECOVERY" },
  timeline: [
    { year: 'FY22', budget: 0.35, actual: 0.30, index: 1100 },
    { year: 'FY23', budget: 0.55, actual: 0.50, index: 1250 },
    { year: 'FY24', budget: 0.90, actual: 0.85, index: 1600 },
    { year: 'FY25', budget: 0.95, actual: 0.92, index: 1900 },
    { year: 'FY26', budget: 1.09, actual: null, index: 2100 },
  ],
  schemes: [
    { id: "BSNL-REV", name: "BSNL Revival", type: "Equity Infusion", status: "Active", corpus: 82000 },
    { id: "BH-NET", name: "BharatNet", type: "Rural Infra", status: "Active", corpus: 6500 },
    { id: "PLI-TEL", name: "Telecom PLI", type: "Manufacturing", status: "Active", corpus: 500 },
  ],
  network: {
    root: { name: "DoT", type: "govt" },
    nodes: [
      { name: "TRAI", type: "regulator", parent: "DoT" },
      { name: "BSNL", type: "psu", parent: "DoT" },
      { name: "Tejas Networks", type: "private", parent: "BSNL" },
      { name: "HFCL", type: "private", parent: "BSNL" },
      { name: "Sterlite Tech", type: "private", parent: "DoT" },
    ]
  },
  stocks: [
    { ticker: "TEJASNET", mktCap: "₹ 18k Cr", pe: 120.0, return: "+45%" },
    { ticker: "HFCL", mktCap: "₹ 14k Cr", pe: 35.0, return: "+30%" },
    { ticker: "INDUSTOWER", mktCap: "₹ 95k Cr", pe: 18.0, return: "+110%" },
    { ticker: "BHARTIARTL", mktCap: "₹ 7.5L Cr", pe: 65.0, return: "+55%" },
  ]
};

const healthcareData = {
  meta: { shareOfBudget: 2.3, totalAllocation: 90000, yoyGrowth: 12.0, status: "POSITIVE" },
  timeline: [
    { year: 'FY22', budget: 0.73, actual: 0.70, index: 8500 },
    { year: 'FY23', budget: 0.86, actual: 0.78, index: 9200 },
    { year: 'FY24', budget: 0.89, actual: 0.82, index: 10500 },
    { year: 'FY25', budget: 0.80, actual: 0.80, index: 12000 },
    { year: 'FY26', budget: 0.90, actual: null, index: 13500 },
  ],
  schemes: [
    { id: "PM-JAY", name: "Ayushman Bharat", type: "Insurance", status: "Active", corpus: 7500 },
    { id: "ABHIM", name: "Health Infra Mission", type: "Infra", status: "Active", corpus: 4200 },
    { id: "PLI-PH", name: "Pharma PLI", type: "Manufacturing", status: "Active", corpus: 1200 },
  ],
  network: {
    root: { name: "MoHFW", type: "govt" },
    nodes: [
      { name: "NHA", type: "regulator", parent: "MoHFW" },
      { name: "ICMR", type: "regulator", parent: "MoHFW" },
      { name: "Apollo Hosp", type: "private", parent: "NHA" },
      { name: "Fortis", type: "private", parent: "NHA" },
      { name: "Sun Pharma", type: "private", parent: "ICMR" },
    ]
  },
  stocks: [
    { ticker: "APOLLOHOSP", mktCap: "₹ 95k Cr", pe: 85.0, return: "+25%" },
    { ticker: "SUNPHARMA", mktCap: "₹ 3.8L Cr", pe: 38.0, return: "+45%" },
    { ticker: "MAXHEALTH", mktCap: "₹ 75k Cr", pe: 65.0, return: "+60%" },
    { ticker: "NH", mktCap: "₹ 28k Cr", pe: 45.0, return: "+35%" },
  ]
};

const educationData = {
  meta: { shareOfBudget: 3.1, totalAllocation: 120000, yoyGrowth: 6.0, status: "STABLE" },
  timeline: [
    { year: 'FY22', budget: 0.93, actual: 0.88, index: 100 },
    { year: 'FY23', budget: 1.04, actual: 0.98, index: 110 },
    { year: 'FY24', budget: 1.12, actual: 1.08, index: 125 },
    { year: 'FY25', budget: 1.15, actual: 1.10, index: 140 },
    { year: 'FY26', budget: 1.20, actual: null, index: 150 },
  ],
  schemes: [
    { id: "PM-SHRI", name: "PM SHRI Schools", type: "Upgrade", status: "Active", corpus: 6000 },
    { id: "RUSA", name: "RUSA (Higher Ed)", type: "Grant", status: "Active", corpus: 3000 },
    { id: "DM-UNI", name: "Digital University", type: "Tech", status: "Active", corpus: 500 },
  ],
  network: {
    root: { name: "Ministry of Education", type: "govt" },
    nodes: [
      { name: "UGC", type: "regulator", parent: "Ministry of Education" },
      { name: "AICTE", type: "regulator", parent: "Ministry of Education" },
      { name: "Navneet Edu", type: "private", parent: "AICTE" },
      { name: "S Chand", type: "private", parent: "AICTE" },
    ]
  },
  stocks: [
    { ticker: "NAVNETEDUL", mktCap: "₹ 3.5k Cr", pe: 18.0, return: "+15%" },
    { ticker: "SCHAND", mktCap: "₹ 1.2k Cr", pe: 14.5, return: "+45%" },
    { ticker: "MPSLTD", mktCap: "₹ 2.8k Cr", pe: 28.0, return: "+30%" },
  ]
};

const itData = {
  meta: { shareOfBudget: 0.5, totalAllocation: 21000, yoyGrowth: 21.0, status: "VERY_BULLISH" },
  timeline: [
    { year: 'FY22', budget: 0.08, actual: 0.07, index: 28000 },
    { year: 'FY23', budget: 0.12, actual: 0.10, index: 26000 },
    { year: 'FY24', budget: 0.15, actual: 0.14, index: 32000 },
    { year: 'FY25', budget: 0.18, actual: 0.16, index: 38000 },
    { year: 'FY26', budget: 0.21, actual: null, index: 42000 },
  ],
  schemes: [
    { id: "SEMI-CON", name: "Semicon India", type: "Subsidy", status: "Active", corpus: 6000 },
    { id: "PLI-HW", name: "IT Hardware PLI", type: "PLI", status: "Active", corpus: 4500 },
    { id: "AI-MSN", name: "India AI Mission", type: "R&D", status: "New", corpus: 2000 },
  ],
  network: {
    root: { name: "MeitY", type: "govt" },
    nodes: [
      { name: "ISM", type: "regulator", parent: "MeitY" },
      { name: "CDAC", type: "psu", parent: "MeitY" },
      { name: "Dixon Tech", type: "private", parent: "ISM" },
      { name: "Kaynes Tech", type: "private", parent: "ISM" },
      { name: "Syrma SGS", type: "private", parent: "ISM" },
    ]
  },
  stocks: [
    { ticker: "DIXON", mktCap: "₹ 65k Cr", pe: 110.0, return: "+125%" },
    { ticker: "KAYNES", mktCap: "₹ 18k Cr", pe: 95.0, return: "+85%" },
    { ticker: "SYRMA", mktCap: "₹ 9k Cr", pe: 45.0, return: "-10%" },
    { ticker: "NETWEB", mktCap: "₹ 12k Cr", pe: 85.0, return: "+150%" },
  ]
};

const housingData = {
  meta: { shareOfBudget: 2.0, totalAllocation: 80000, yoyGrowth: 8.0, status: "POSITIVE" },
  timeline: [
    { year: 'FY22', budget: 0.48, actual: 0.45, index: 350 },
    { year: 'FY23', budget: 0.48, actual: 0.50, index: 380 },
    { year: 'FY24', budget: 0.79, actual: 0.75, index: 480 },
    { year: 'FY25', budget: 0.75, actual: 0.70, index: 550 },
    { year: 'FY26', budget: 0.80, actual: null, index: 620 },
  ],
  schemes: [
    { id: "PMAY-U", name: "PMAY (Urban)", type: "Subsidy", status: "Active", corpus: 26000 },
    { id: "PMAY-G", name: "PMAY (Rural)", type: "Subsidy", status: "Active", corpus: 54000 },
    { id: "INT-SUB", name: "Interest Subv.", type: "Welfare", status: "New", corpus: 10000 },
  ],
  network: {
    root: { name: "MoHUA", type: "govt" },
    nodes: [
      { name: "HUDCO", type: "psu", parent: "MoHUA" },
      { name: "NHB", type: "regulator", parent: "MoHUA" },
      { name: "NBCC", type: "psu", parent: "MoHUA" },
      { name: "Home First", type: "private", parent: "NHB" },
      { name: "Aavas Fin", type: "private", parent: "NHB" },
    ]
  },
  stocks: [
    { ticker: "HUDCO", mktCap: "₹ 45k Cr", pe: 22.0, return: "+180%" },
    { ticker: "NBCC", mktCap: "₹ 28k Cr", pe: 45.0, return: "+140%" },
    { ticker: "HOMEFIRST", mktCap: "₹ 9k Cr", pe: 32.0, return: "+35%" },
    { ticker: "AAVAS", mktCap: "₹ 12k Cr", pe: 28.0, return: "-5%" },
  ]
};

const fertiliserData = {
  meta: { shareOfBudget: 4.2, totalAllocation: 164000, yoyGrowth: -13.0, status: "UNDERWEIGHT" },
  timeline: [
    { year: 'FY22', budget: 0.80, actual: 1.53, index: 600 },
    { year: 'FY23', budget: 1.05, actual: 2.25, index: 750 },
    { year: 'FY24', budget: 1.75, actual: 1.88, index: 800 },
    { year: 'FY25', budget: 1.64, actual: 1.64, index: 780 },
    { year: 'FY26', budget: 1.64, actual: null, index: 760 },
  ],
  schemes: [
    { id: "UREA-SUB", name: "Urea Subsidy", type: "Subsidy", status: "Active", corpus: 119000 },
    { id: "NBF-SUB", name: "Nutrient Based", type: "Subsidy", status: "Active", corpus: 45000 },
    { id: "PM-PRANAM", name: "PM PRANAM", type: "Green", status: "New", corpus: 100 },
  ],
  network: {
    root: { name: "Dept of Fertilisers", type: "govt" },
    nodes: [
      { name: "NFL", type: "psu", parent: "Dept of Fertilisers" },
      { name: "RCF", type: "psu", parent: "Dept of Fertilisers" },
      { name: "FACT", type: "psu", parent: "Dept of Fertilisers" },
      { name: "Chambal", type: "private", parent: "Dept of Fertilisers" },
      { name: "Coromandel", type: "private", parent: "Dept of Fertilisers" },
    ]
  },
  stocks: [
    { ticker: "CHAMBLFERT", mktCap: "₹ 16k Cr", pe: 12.0, return: "+15%" },
    { ticker: "COROMANDEL", mktCap: "₹ 35k Cr", pe: 18.0, return: "+12%" },
    { ticker: "RCF", mktCap: "₹ 10k Cr", pe: 15.0, return: "+65%" },
    { ticker: "FACT", mktCap: "₹ 45k Cr", pe: 85.0, return: "+110%" },
  ]
};

const textilesData = {
  meta: { shareOfBudget: 0.1, totalAllocation: 4500, yoyGrowth: 2.5, status: "NEUTRAL" },
  timeline: [
    { year: 'FY22', budget: 0.03, actual: 0.03, index: 120 },
    { year: 'FY23', budget: 0.12, actual: 0.04, index: 110 },
    { year: 'FY24', budget: 0.04, actual: 0.04, index: 130 },
    { year: 'FY25', budget: 0.04, actual: 0.04, index: 145 },
    { year: 'FY26', budget: 0.04, actual: null, index: 155 },
  ],
  schemes: [
    { id: "PM-MITRA", name: "PM MITRA Parks", type: "Infra", status: "Active", corpus: 300 },
    { id: "TECH-TEX", name: "Tech Textiles", type: "R&D", status: "Active", corpus: 450 },
    { id: "ATUFS", name: "ATUFS (Tech Up)", type: "Subsidy", status: "Sunset", corpus: 650 },
  ],
  network: {
    root: { name: "Ministry of Textiles", type: "govt" },
    nodes: [
      { name: "Textile Comm.", type: "regulator", parent: "Ministry of Textiles" },
      { name: "CCI", type: "psu", parent: "Ministry of Textiles" },
      { name: "KPR Mill", type: "private", parent: "Textile Comm." },
      { name: "Gokaldas", type: "private", parent: "Textile Comm." },
      { name: "Welspun", type: "private", parent: "Textile Comm." },
    ]
  },
  stocks: [
    { ticker: "KPRMILL", mktCap: "₹ 28k Cr", pe: 35.0, return: "+35%" },
    { ticker: "GOKEX", mktCap: "₹ 6k Cr", pe: 28.0, return: "+85%" },
    { ticker: "WELSPUNLIV", mktCap: "₹ 14k Cr", pe: 22.0, return: "+40%" },
    { ticker: "TRIDENT", mktCap: "₹ 18k Cr", pe: 45.0, return: "+10%" },
  ]
};

// ... (Other sectors can be added here following the same pattern)

// --- THE REPOSITORY ---
export const sectorRepository: any = {
  "Defence": defenceData,
  "Railways": railwaysData,
  "Agriculture": agriData,
  "Road Transport": roadsData, // Updated Key
  "Power & Energy": powerData, // Updated Key
  "Telecom": telecomData,
  "Healthcare": healthcareData,
  "Education": educationData,
  "Electronics/IT": itData,
  "Housing": housingData,
  "Fertilisers": fertiliserData,
  "Textiles": textilesData,
};

// --- THE SMART MAPPER (Fixes the "Everything is 14%" bug) ---
// This translates the "Official Category Name" or "Metric Name" into our simple Repository Keys
const keyMapper: Record<string, string> = {
  // Official Category -> Repo Key
  "Ministry of Defence": "Defence",
  "Ministry of Railways": "Railways",
  "Ministry of Road Transport": "Road Transport", // Updated mapping
  "Road Transport": "Road Transport", // Self mapping
  "Rural Development": "Agriculture",
  "Rural": "Agriculture", // Added mapping
  "Rural Dev": "Agriculture", // Added mapping
  "Ministry of Power": "Power & Energy", // Updated mapping
  "Power": "Power & Energy", // Added mapping
  "Communications": "Telecom", // Added mapping
  "Chemicals & Fertilisers": "Fertilisers", // Added mapping
  "Fertilisers": "Fertilisers", // Self mapping
  
  // Metric Name -> Repo Key
  "Defence Capital Outlay": "Defence",
  "Railways Total Capital": "Railways",
  "Road Transport Capital": "Road Transport",
  "MGNREGA": "Agriculture",
  "PM Awas Yojana (Rural)": "Housing", // Specific mapping
  "Fertiliser Subsidy": "Fertilisers",
  "Telecom Projects (Bharatnet)": "Telecom",
};

// --- THE GETTER FUNCTION ---
export const getSectorData = (key: string) => {
  if (!key) return null;
  
  // 1. Try Direct Match
  if (sectorRepository[key]) return sectorRepository[key];
  
  // 2. Try Smart Map
  const mappedKey = keyMapper[key];
  if (mappedKey && sectorRepository[mappedKey]) return sectorRepository[mappedKey];
  
  // 3. Try Partial Match (e.g., "Defence" inside "Ministry of Defence")
  const foundKey = Object.keys(sectorRepository).find(k => key.includes(k));
  if (foundKey) return sectorRepository[foundKey];

  return null;
};