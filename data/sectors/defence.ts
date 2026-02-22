// --- DEFENCE SECTOR DEEP DIVE (FY 2025-26) ---

export const defenceData = {
  meta: { 
    shareOfBudget: 28.4, 
    totalAllocation: 621000, 
    yoyGrowth: 14.2, 
    status: "OVERWEIGHT" 
  },
  timeline: [
    { year: 'FY22', budget: 4.78, actual: 4.85, index: 4200 },
    { year: 'FY23', budget: 5.25, actual: 5.30, index: 4800 },
    { year: 'FY24', budget: 5.94, actual: 5.90, index: 5600 },
    { year: 'FY25', budget: 6.21, actual: 6.15, index: 7200 },
    { year: 'FY26', budget: 6.80, actual: null, index: 8100 }, 
  ],
  schemes: [
    { 
      id: "IDEX-X",  
      name: "iDEX (Deep Tech)", 
      type: "R&D Grant", 
      status: "Active", 
      corpus: 2500,
      desc: "Innovation for Defence Excellence (iDEX) fosters innovation and technology development in Defence and Aerospace by engaging Industries, Startups, and R&D institutes.",
      beneficiary: "Startups, MSMEs, Individual Innovators",
      link: "https://idex.gov.in"
    },
    { 
      id: "MOD-EZ",  
      name: "Modernization Fund", 
      type: "Capex", 
      status: "Active", 
      corpus: 172000,
      desc: "Capital outlay specifically for the acquisition of new weaponry, aircraft, warships, and other military hardware.",
      beneficiary: "Defence OEMs (HAL, BEL, Mazagon)",
      link: "https://mod.gov.in"
    },
    { 
      id: "AGNI",    
      name: "Agnipath Scheme", 
      type: "HR Reform", 
      status: "Active", 
      corpus: 28000,
      desc: "A tour of duty style scheme for recruitment of soldiers below the rank of commissioned officers into the three services of the armed forces.",
      beneficiary: "Youth (Agniveers)",
      link: "https://joinindianarmy.nic.in"
    },
    { 
      id: "DRONE",   
      name: "Drone Shakti PLI", 
      type: "PLI", 
      status: "Active", 
      corpus: 120,
      desc: "Production Linked Incentive scheme to boost domestic manufacturing of drones and drone components.",
      beneficiary: "Drone Manufacturers (IdeaForge, Zen Tech)",
      link: "https://civilaviation.gov.in"
    },
  ],
  network: {
    root: { name: "Ministry of Defence", type: "govt" },
    nodes: [
      { name: "DRDO", type: "regulator", parent: "Ministry of Defence" },
      { name: "Dept of Military Affairs", type: "regulator", parent: "Ministry of Defence" },
      { name: "HAL (Tejas)", type: "psu", parent: "DRDO" },
      { name: "BEL (Radar)", type: "psu", parent: "DRDO" },
      { name: "Mazagon Dock", type: "psu", parent: "Dept of Military Affairs" },
      { name: "L&T Defence", type: "private", parent: "Dept of Military Affairs" },
      { name: "Paras Defence", type: "private", parent: "DRDO" },
      { name: "Zen Tech", type: "private", parent: "DRDO" },
      { name: "Solar Ind", type: "private", parent: "Dept of Military Affairs" },
    ]
  },
  stocks: [
    { ticker: "HAL", mktCap: "2.8L Cr", pe: 32.4, return: "+140%", price: 4200 },
    { ticker: "BEL", mktCap: "1.4L Cr", pe: 28.1, return: "+95%", price: 290 },
    { ticker: "MAZDOCK", mktCap: "45k Cr", pe: 18.5, return: "+210%", price: 2100 },
    { ticker: "BDL", mktCap: "32k Cr", pe: 45.2, return: "+65%", price: 1800 },
    { ticker: "PARAS", mktCap: "3.2k Cr", pe: 65.2, return: "+12%", price: 750 },
    { ticker: "SOLARINDS", mktCap: "85k Cr", pe: 55.0, return: "+110%", price: 8900 },
    { ticker: "MTARTECH", mktCap: "6k Cr", pe: 48.0, return: "-15%", price: 1800 },
    { ticker: "ASTRAMICRO", mktCap: "5k Cr", pe: 35.0, return: "+40%", price: 650 },
  ]
};