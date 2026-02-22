"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Search, X, ExternalLink, Activity, Layers, Maximize, Minus, Plus, Move
} from 'lucide-react';
import { 
  Area, Bar, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart as RechartsPieChart, Pie, Cell 
} from 'recharts';
import { getSectorData } from '../data/sectors/index'; 
import DefenceSunburst from './DefenceSunburst';

// --- SUB-COMPONENTS ---

// 1. MACRO SCOPE (Pie)
const MacroScope = ({ sectorName, share }: any) => {
  const safeShare = share || 0;
  const data = [
    { name: 'Other', value: 100 - safeShare, color: '#262626' },
    { name: sectorName, value: safeShare, color: '#f43f5e' },
  ];

  return (
    <div className="bg-[#121212] border border-gray-800 p-6 h-full min-h-[320px] relative overflow-hidden group flex flex-col">
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-rose-500"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-rose-500"></div>
      <h3 className="font-valorant text-lg text-gray-400 mb-4 tracking-widest shrink-0">MACRO_SCOPE // OUTLAY</h3>
      <div className="flex-1 relative min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={450}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  style={{ 
                    filter: entry.name === sectorName ? 'drop-shadow(0px 0px 8px rgba(244, 63, 94, 0.4))' : 'none',
                    transform: entry.name === sectorName ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'center'
                  }}
                />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold text-white font-valorant">{safeShare}%</div>
          <div className="text-[9px] text-gray-500 font-mono tracking-widest">OF TOTAL</div>
        </div>
      </div>
    </div>
  );
};

// 2. TIMELINE MONITOR (Chart)
const TimelineMonitor = ({ data }: any) => (
  <div className="bg-[#121212] border border-gray-800 p-6 h-full min-h-[320px] relative flex flex-col">
     <div className="flex justify-between items-start mb-4 shrink-0">
        <h3 className="font-valorant text-lg text-gray-400 tracking-widest">TIMELINE_MONITOR // FISCAL</h3>
        <div className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-2 py-1 bg-emerald-500/10">INDEX: BULLISH</div>
     </div>
     <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
           <ComposedChart data={data || []}>
              <defs>
                 <pattern id="hashed" patternUnits="userSpaceOnUse" width="4" height="4">
                    <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="#333" strokeWidth="1" />
                 </pattern>
                 <linearGradient id="indexGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                 </linearGradient>
              </defs>
              <CartesianGrid stroke="#333" strokeDasharray="1 1" vertical={false} opacity={0.5} />
              <XAxis dataKey="year" tick={{fill: '#666', fontSize: 10, fontFamily: 'JetBrains Mono'}} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{fill: '#666', fontSize: 10, fontFamily: 'JetBrains Mono'}} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{fill: '#666', fontSize: 10, fontFamily: 'JetBrains Mono'}} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333', color: '#fff', fontFamily: 'JetBrains Mono', fontSize: '11px'}} />
              <Area yAxisId="right" type="monotone" dataKey="index" stroke="#f43f5e" fill="url(#indexGrad)" strokeWidth={2} />
              <Bar yAxisId="left" dataKey="budget" name="Allocated" fill="url(#hashed)" stroke="#666" barSize={20} />
              <Bar yAxisId="left" dataKey="actual" name="Spent" fill="#fff" barSize={20} radius={[2, 2, 0, 0]} />
           </ComposedChart>
        </ResponsiveContainer>
     </div>
  </div>
);

// 3. INCENTIVE TERMINAL (Schemes + Modal)
const IncentiveTerminal = ({ schemes }: any) => {
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState('');
  
  const filtered = schemes?.filter((s:any) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="bg-[#121212] border border-gray-800 h-full min-h-[320px] flex flex-col">
         <div className="p-4 border-b border-gray-800 bg-gray-900/50 shrink-0">
            <h3 className="font-valorant text-sm text-gray-400 tracking-widest mb-2">AVAILABLE_PROTOCOLS // SCHEMES</h3>
            <input 
                type="text" placeholder="SEARCH_DB..." 
                className="w-full bg-black border border-gray-700 text-xs font-mono text-white py-2 pl-4 focus:border-rose-500 outline-none uppercase placeholder-gray-700"
                value={search} onChange={(e) => setSearch(e.target.value)}
             />
         </div>
         <div className="flex-1 overflow-y-auto p-2 scrollbar-custom min-h-0">
            <table className="w-full text-left border-collapse">
               <thead className="text-[9px] font-mono text-gray-600 uppercase">
                  <tr><th className="p-2">ID</th><th className="p-2">SCHEME</th><th className="p-2 text-right">CORPUS</th></tr>
               </thead>
               <tbody className="text-xs font-mono">
                  {filtered?.map((s: any, i: number) => (
                     <tr key={i} onClick={() => setSelected(s)} className="hover:bg-rose-500/10 cursor-pointer group border-b border-gray-800/50">
                        <td className="p-2 text-rose-400 group-hover:text-white">{s.id}</td>
                        <td className="p-2 text-gray-300">{s.name}</td>
                        <td className="p-2 text-right text-gray-400">{s.corpus ? `₹${s.corpus} Cr` : 'N/A'}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* SCHEME MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200" onClick={() => setSelected(null)}>
          <div className="bg-[#0a0a0a] border border-gray-700 w-full max-w-lg p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-2 h-full bg-rose-500"></div>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20}/></button>
            <div className="mb-6">
               <span className="text-xs font-mono text-rose-500 border border-rose-500/30 bg-rose-500/10 px-2 py-1 mb-2 inline-block">{selected.id}</span>
               <h3 className="text-3xl text-white font-valorant tracking-wide mb-1">{selected.name}</h3>
               <div className="h-px w-full bg-gray-800 mt-4"></div>
            </div>
            <div className="space-y-6 font-mono text-sm text-gray-400">
               <div>
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500"></div> Objective</h4>
                  <p className="text-gray-300 leading-relaxed">{selected.desc || "Strategic initiative to boost sector capabilities."}</p>
               </div>
               <div>
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500"></div> Beneficiaries</h4>
                  <p className="text-gray-300">{selected.beneficiary || "Sector Wide"}</p>
               </div>
               <div className="pt-6">
                  <a href={selected.link || "#"} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-rose-500 hover:text-white transition-colors py-3 font-bold uppercase text-xs tracking-widest">
                     Access Official Portal <ExternalLink size={14}/>
                  </a>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- 4. NETWORK MAP ORCHESTRATOR ---
const NetworkMap = ({ network, sectorName }: any) => {
   if (!network) return <div className="p-6 text-gray-600 font-mono text-xs">NO HIERARCHY DATA AVAILABLE</div>;
   
   // --- LOGIC SPLIT: Improved Check ---
   // Now checks if the name INCLUDES "Defence" (handles "Defence Capital Outlay" etc.)
   const name = sectorName?.toLowerCase() || "";
   const isDefence = name.includes("defence") || name.includes("defense") || name.includes("mod");

   if (isDefence) {
      return (
         <div className="h-full min-h-[400px]">
            <DefenceSunburst />
         </div>
      );
   }

   // Default to standard view for others
   return <CircuitTreeView network={network} />;
};

// --- 4a. STANDARD CIRCUIT VIEW (For Non-Defence Sectors) ---
const CircuitTreeView = ({ network }: any) => {
   const regulators = network.nodes.filter((n:any) => n.type === 'regulator');
   const entities = network.nodes.filter((n:any) => n.type !== 'regulator');
   return (
      <div className="bg-[#121212] border border-gray-800 h-full relative overflow-hidden min-h-[350px]">
         <h3 className="absolute top-6 left-6 font-valorant text-lg text-gray-400 tracking-widest z-10">NETWORK_MAP // HIERARCHY</h3>
         <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
         <div className="w-full h-full flex flex-col items-center justify-center relative z-0 pt-12">
            {/* Root */}
            <div className="relative mb-8 z-10">
               <div className="px-6 py-3 border-2 border-emerald-500/50 bg-black text-emerald-400 font-mono text-sm font-bold uppercase shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  {network.root?.name}
               </div>
               <div className="absolute left-1/2 top-full w-px h-8 bg-emerald-500/50"></div>
            </div>
            {/* Busbar */}
            <div className="w-3/4 h-px bg-gray-700 relative mb-8">
               {/* Legs to Regulators */}
               <div className="absolute top-0 left-0 w-full h-full flex justify-around">
                  {regulators.map((_:any, i:number) => (
                     <div key={i} className="h-8 w-px bg-gray-700 relative top-0"></div>
                  ))}
               </div>
            </div>
            {/* Regulators */}
            <div className="w-full flex justify-around mb-8 z-10 px-8">
               {regulators.map((node: any, i: number) => (
                  <div key={i} className="px-3 py-2 border border-gray-700 bg-gray-900 text-gray-300 font-mono text-[10px] uppercase">
                     {node.name}
                  </div>
               ))}
            </div>
            {/* Entities Grid */}
            <div className="flex flex-wrap justify-center gap-2 z-10 max-w-3xl">
               {entities.map((node: any, i: number) => (
                  <div key={i} className={`px-2 py-1 border text-[9px] font-mono uppercase ${node.type === 'psu' ? 'border-cyan-900/50 text-cyan-500' : 'border-orange-900/50 text-orange-500'}`}>
                     {node.name}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

// --- 5. MARKET WATCH (The Dual Sliding Ticker) ---
const MarketWatch = ({ stocks }: any) => {
   const [showAll, setShowAll] = useState(false);
   
   // Duplicate arrays for seamless loop
   const row1 = stocks ? [...stocks, ...stocks, ...stocks, ...stocks] : []; 
   const row2 = stocks ? [...stocks.reverse(), ...stocks, ...stocks, ...stocks] : []; 

   if (!stocks || stocks.length === 0) return null;

   return (
      <>
         <div className="mt-6 border-t border-gray-800 pt-4 overflow-hidden relative pb-12 w-full select-none">
            <div className="flex items-center justify-between mb-6 px-1 relative z-30">
               <h3 className="font-valorant text-sm text-gray-400 tracking-widest">MARKET_WATCH // NSE_LISTED</h3>
               <button onClick={() => setShowAll(true)} className="text-[10px] font-mono text-rose-500 hover:text-white border border-rose-500/30 px-3 py-1 bg-rose-500/10 uppercase transition-colors">
                  View Full Depth {'>'}
               </button>
            </div>

            {/* Background Fades */}
            <div className="absolute left-0 top-12 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-12 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
               {/* Row 1: Left to Right */}
               <div className="animate-ticker flex gap-4 w-max hover:[animation-play-state:paused]">
                  {row1.map((stock: any, i: number) => (
                     <StockCard key={`r1-${i}`} stock={stock} />
                  ))}
               </div>
               
               {/* Row 2: Right to Left */}
               <div className="animate-ticker-reverse flex gap-4 w-max hover:[animation-play-state:paused]">
                  {row2.map((stock: any, i: number) => (
                     <StockCard key={`r2-${i}`} stock={stock} variant="dark" />
                  ))}
               </div>
            </div>
         </div>

         {/* FULL SCREEN MARKET DEPTH MODAL */}
         {showAll && (
            <div className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto p-8 animate-in slide-in-from-bottom-10 fade-in duration-300">
               <div className="max-w-7xl mx-auto">
                  <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#050505] py-4 z-10 border-b border-gray-800">
                     <div>
                        <h2 className="text-4xl text-white font-valorant mb-1">MARKET DEPTH // SECTORAL</h2>
                        <p className="text-xs font-mono text-gray-500">REAL-TIME DATA SNAPSHOT</p>
                     </div>
                     <button onClick={() => setShowAll(false)} className="p-3 border border-gray-700 hover:bg-rose-500 hover:border-rose-500 transition-colors text-white"><X/></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-20">
                     {stocks.map((stock: any, i: number) => (
                        <div key={i} className="bg-[#121212] border border-gray-800 p-5 hover:border-l-4 hover:border-l-emerald-500 transition-all group relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-2 opacity-10"><Activity size={40} /></div>
                           <div className="flex justify-between items-start mb-4 relative z-10">
                              <div>
                                 <div className="text-xl font-bold text-white font-mono tracking-tight">{stock.ticker}</div>
                                 <div className="text-[10px] text-gray-500 bg-gray-900 px-1 inline-block mt-1">NSE:EQ</div>
                              </div>
                              <div className={`text-lg font-bold ${stock.return.includes('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{stock.return}</div>
                           </div>
                           <div className="grid grid-cols-2 gap-y-3 text-xs font-mono text-gray-500 mt-4 border-t border-gray-800 pt-4">
                              <div>LTP</div><div className="text-right text-white font-bold">₹{stock.price || "---"}</div>
                              <div>MKT CAP</div><div className="text-right text-gray-300">{stock.mktCap}</div>
                              <div>P/E</div><div className="text-right text-gray-300">{stock.pe}</div>
                              <div>VOL</div><div className="text-right text-gray-300">High</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

const StockCard = ({ stock, variant = "default" }: any) => (
   <div className={`w-56 flex items-center justify-between p-3 border shrink-0 transition-colors cursor-pointer hover:border-gray-500 ${variant === 'dark' ? 'bg-black border-gray-800' : 'bg-[#121212] border-gray-800'}`}>
      <div>
         <div className="font-bold text-white text-sm font-mono tracking-tight">{stock.ticker}</div>
         <div className="text-[10px] text-gray-500 font-mono">PE: {stock.pe}</div>
      </div>
      <div className="text-right">
         <div className={`font-mono text-xs font-bold ${stock.return.includes('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{stock.return}</div>
         <div className="text-[10px] text-gray-500 font-mono">{stock.price ? `₹${stock.price}` : stock.mktCap}</div>
      </div>
   </div>
);

// --- MAIN COMPONENT ---
const SectorDetailView = ({ metric, onBack }: any) => {
  if (!metric) return null;
  
  let deepData = getSectorData(metric.name) || getSectorData(metric.id) || getSectorData(metric.category);
  if (!deepData) deepData = getSectorData("Defence"); 

  const timelineData = deepData?.timeline || [];
  const schemeData = deepData?.schemes || [];
  const networkData = deepData?.network || null;
  const stockData = deepData?.stocks || [];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-200 flex flex-col bg-[#050505] pr-6 min-h-screen pb-20">
      
      {/* HEADER NAV */}
      <div className="flex items-center justify-between mb-6">
         <button onClick={onBack} className="flex items-center text-gray-500 hover:text-white font-mono text-xs group w-fit">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform"/> 
            <span className="tracking-widest">RETURN_TO_BASE</span>
         </button>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full"></div>
            <span className="text-xs font-mono text-emerald-500">LIVE DATA FEED</span>
         </div>
      </div>

      {/* TITLE BLOCK */}
      <div className="mb-8 border-b border-gray-800 pb-6">
         <div className="flex items-end gap-4 mb-2">
            <h1 className="font-valorant text-5xl md:text-6xl text-white leading-none uppercase">{metric.name}</h1>
            <span className="px-2 py-1 bg-rose-500/10 border border-rose-500 text-rose-500 text-[10px] font-mono font-bold tracking-widest mb-2">SECTOR_ID: {metric.id}</span>
         </div>
         <p className="text-gray-500 font-mono text-sm max-w-3xl border-l-2 border-gray-800 pl-4">
            {metric.desc || "Strategic sector analysis pending."}
         </p>
      </div>

      {/* TACTICAL GRID */}
      <div className="grid grid-cols-12 gap-6 mb-8">
         <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <MacroScope sectorName={metric.name} share={deepData?.meta?.shareOfBudget || 0} />
         </div>
         <div className="col-span-12 md:col-span-8 lg:col-span-5">
            <TimelineMonitor data={timelineData} />
         </div>
         <div className="col-span-12 md:col-span-6 lg:col-span-4 h-full">
            <IncentiveTerminal schemes={schemeData} />
         </div>
      </div>
      
      {/* SECONDARY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <div className="h-full min-h-[400px]">
            <NetworkMap network={networkData} sectorName={metric.name} />
         </div>
         
         <div className="bg-[#121212] border border-gray-800 p-6 relative flex flex-col justify-center min-h-[200px]">
            <h3 className="font-valorant text-lg text-gray-400 tracking-widest mb-4">TACTICAL_ASSESSMENT</h3>
            <div className="flex gap-4 mb-4">
               <div className="flex-1 p-4 bg-emerald-900/10 border-l-4 border-emerald-500">
                  <div className="text-[10px] font-mono text-emerald-500 mb-1">SIGNAL</div>
                  <div className="text-white font-bold">{deepData?.meta?.status || "NEUTRAL"}</div>
               </div>
               <div className="flex-1 p-4 bg-gray-900/50 border-l-4 border-gray-600">
                  <div className="text-[10px] font-mono text-gray-500 mb-1">RISK</div>
                  <div className="text-white font-bold">MODERATE</div>
               </div>
            </div>
            <p className="text-xs text-gray-400 font-mono leading-relaxed">{metric.impact || "Analysis ongoing."}</p>
         </div>
      </div>

      {/* MARKET WATCH (Ticker Tape) */}
      <MarketWatch stocks={stockData} />

      {/* NOTE BLOCK */}
      <div className="mt-12 py-8 border-t border-gray-800 text-center">
        <div className="inline-block px-4 py-2 bg-[#121212] border border-gray-800">
           <p className="text-[10px] font-mono text-gray-500 flex items-center gap-2">
              <Layers size={12}/> SYSTEM NOTE: COMPONENT ARCHITECTURE IS MODULAR. ADDING NEW GRIDS REQUIRES UPDATING `SectorDetailView.tsx`.
           </p>
        </div>
      </div>

    </div>
  );
};

export default SectorDetailView;