"use client";
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Briefcase, TrendingUp, Search, 
  Menu, Database, ArrowUpRight, ArrowDownRight, 
  Wallet, AlertCircle, Star, PieChart, FileText, 
  ExternalLink, Mail, ChevronRight, ChevronLeft, 
  ArrowUpDown, Download, Scale
} from 'lucide-react';

// --- MODULAR COMPONENT IMPORTS ---
import MacroChart from '../components/MacroChart';
import SectorPieChart from '../components/SectorPieChart';
import MoneyFlow from '../components/MoneyFlow';
import SectorDetailView from '../components/SectorDetailView'; // The new Tactical HUD
import { kpiData, masterData, sectorWatchlist, officialDocs } from '../data/budgetData';

// --- LOCAL VIEW COMPONENTS (Navigation & Lists) ---

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }: any) => (
  <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 border-l-2 w-full ${active ? 'border-rose-500 text-gray-100 bg-gray-800/50' : 'border-transparent text-gray-400 hover:text-gray-100 hover:bg-gray-800/30'} ${collapsed ? 'justify-center px-2' : ''}`} title={collapsed ? label : ''}>
    <Icon size={18} className="shrink-0" />{!collapsed && <span className="tracking-wide uppercase truncate">{label}</span>}
  </button>
);

const KPICard = ({ data, onClick }: any) => (
  <div onClick={onClick} className="bg-black border border-gray-800 p-6 hover:border-rose-500/50 cursor-pointer transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><data.icon size={48} className="text-white" /></div>
    <h3 className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-1">{data.title}</h3>
    <div className="text-3xl font-valorant text-white mb-2 tracking-tight">{data.value}</div>
    <div className="flex items-center gap-2 text-sm">
      <span className={`${data.isPositive ? 'text-emerald-400' : 'text-rose-400'} flex items-center font-mono`}>{data.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{data.change}</span>
      <span className="text-gray-600 text-xs hidden sm:inline">| {data.desc}</span>
    </div>
  </div>
);

const SectorList = ({ onMetricClick }: any) => (
    <div className="bg-black border border-gray-800 h-[500px] flex flex-col">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center shrink-0">
        <div><h3 className="font-valorant text-xl text-white tracking-wide">Sector Watchlist</h3><p className="text-xs text-gray-500 mt-1 font-mono">THE ROLL CALL (12 SECTORS)</p></div>
        <Briefcase size={20} className="text-rose-500"/>
      </div>
      <div className="divide-y divide-gray-800 overflow-y-auto scrollbar-custom flex-1">
        {sectorWatchlist.map((item) => (
          <div key={item.id} onClick={() => onMetricClick(masterData.find(m => m.id === item.metricId) || {...item, name: item.name, desc: item.details})} className="p-4 flex items-center justify-between hover:bg-gray-900/20 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-900 rounded text-gray-400 group-hover:text-white transition-colors"><item.icon size={18} /></div>
              <div>
                 <div className="text-gray-200 text-sm font-medium group-hover:text-rose-400 transition-colors">{item.name || item.sector}</div>
                 <div className="text-[10px] text-gray-500 font-mono uppercase">{item.category}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`font-valorant text-sm ${item.trend.includes('Bullish') ? 'text-emerald-500' : 'text-rose-500'}`}>{item.trend.toUpperCase()}</div>
              <div className="text-xs text-gray-500 mt-1 flex items-center justify-end gap-1.5"><span>{item.value || item.allocation}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
);

const MetricRatings = ({ onInfoClick }: any) => (
    <div className="bg-black border border-gray-800 h-[500px] flex flex-col">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center shrink-0">
        <div><h3 className="font-valorant text-xl text-white tracking-wide">Professor's Report Card</h3><p className="text-xs text-gray-500 mt-1 font-mono">20-POINT METRIC ANALYSIS</p></div>
        <Scale size={20} className="text-yellow-500 fill-yellow-500"/>
      </div>
      <div className="divide-y divide-gray-800 overflow-y-auto scrollbar-custom flex-1">
        {masterData.map((item) => (
          <div key={item.id} onClick={() => onInfoClick(item)} className="p-3 px-4 flex items-center justify-between hover:bg-gray-900/20 transition-colors group cursor-pointer">
            <div className="flex flex-col gap-1 flex-1 min-w-0 pr-4">
              <span className="text-gray-200 text-sm font-medium truncate group-hover:text-rose-400 transition-colors">{item.name}</span>
              <div className="flex items-center gap-2"><span className="text-[10px] font-mono text-gray-600 bg-gray-900 px-1.5 rounded border border-gray-800 uppercase">{item.id}</span><span className="text-[9px] text-gray-500 uppercase">{item.category}</span></div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
               <div className="flex items-center gap-1.5"><div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} size={10} className={`${i < Math.floor(item.score) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-800'}`}/>))}</div><span className="text-xs font-mono text-yellow-500 font-bold">({item.score}/5)</span></div>
               <div className={`text-[10px] font-valorant tracking-wider ${item.trend === 'up' ? 'text-emerald-500' : item.trend === 'down' ? 'text-rose-500' : 'text-yellow-500'}`}>{item.trend.toUpperCase()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
);

// --- TAB VIEWS ---

const AllDataView = ({ onMetricClick }: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string | null, direction: string }>({ key: null, direction: 'ascending' });
  
    const sortedData = useMemo(() => {
      let sortableItems = [...masterData];
      if (searchTerm) {
        sortableItems = sortableItems.filter(item => 
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (sortConfig.key) {
        sortableItems.sort((a: any, b: any) => {
          if (a[sortConfig.key!] < b[sortConfig.key!]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key!] > b[sortConfig.key!]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [searchTerm, sortConfig]);
  
    const requestSort = (key: string) => {
      let direction = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    return (
      <div className="h-full flex flex-col animate-in fade-in duration-200">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-end gap-4 shrink-0">
          <div>
            <h2 className="text-3xl text-white mb-2 uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>ALL BUDGET DATA</h2>
            <p className="text-gray-500 font-mono text-sm">COMPLETE REPOSITORY (FY 2025-26)</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-rose-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search metrics..." 
                className="bg-black border border-gray-800 text-white text-xs py-2 pl-10 pr-4 w-full focus:outline-none focus:border-rose-500 transition-all font-mono"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-gray-900 border border-gray-800 text-white p-2 hover:bg-rose-500 hover:border-rose-500 transition-colors">
              <Download size={16} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto border border-gray-800 bg-black scrollbar-custom">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-900/80 sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="p-4 border-b border-gray-800 font-mono text-xs text-gray-500 cursor-pointer hover:text-white" onClick={() => requestSort('id')}>ID <ArrowUpDown size={10} className="inline ml-1"/></th>
                <th className="p-4 border-b border-gray-800 font-mono text-xs text-gray-500 cursor-pointer hover:text-white" onClick={() => requestSort('name')}>METRIC <ArrowUpDown size={10} className="inline ml-1"/></th>
                <th className="p-4 border-b border-gray-800 font-mono text-xs text-gray-500 cursor-pointer hover:text-white text-right" onClick={() => requestSort('fy24A')}>FY24 (Act) <ArrowUpDown size={10} className="inline ml-1"/></th>
                <th className="p-4 border-b border-gray-800 font-mono text-xs text-gray-500 cursor-pointer hover:text-white text-right" onClick={() => requestSort('fy25RE')}>FY25 (RE) <ArrowUpDown size={10} className="inline ml-1"/></th>
                <th className="p-4 border-b border-gray-800 font-mono text-xs text-rose-500 font-bold cursor-pointer hover:text-white text-right" onClick={() => requestSort('fy26BE')}>FY26 (BE) <ArrowUpDown size={10} className="inline ml-1"/></th>
                <th className="p-4 border-b border-gray-800 font-mono text-xs text-gray-500 text-center">TREND</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {sortedData.map((item, idx) => (
                <tr key={idx} onClick={() => onMetricClick(item)} className="hover:bg-gray-900/30 transition-colors group cursor-pointer">
                  <td className="p-4 font-mono text-xs text-gray-600 group-hover:text-rose-500 transition-colors">{item.id}</td>
                  <td className="p-4">
                    <div className="text-sm text-gray-200 font-medium">{item.name}</div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase mt-1">{item.category} • {item.unit}</div>
                  </td>
                  <td className="p-4 font-mono text-sm text-gray-400 text-right">{item.fy24A?.toLocaleString()}</td>
                  <td className="p-4 font-mono text-sm text-gray-400 text-right">{item.fy25RE?.toLocaleString()}</td>
                  <td className="p-4 font-mono text-sm text-white text-right font-bold">{item.fy26BE?.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-end justify-center gap-1 h-8 w-16 mx-auto opacity-60 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 bg-gray-700" style={{height: `${(item.fy24A / Math.max(item.fy24A||1, item.fy25BE||1, item.fy25RE||1, item.fy26BE||1)) * 100}%`}}></div>
                      <div className="w-2 bg-gray-600" style={{height: `${(item.fy25BE / Math.max(item.fy24A||1, item.fy25BE||1, item.fy25RE||1, item.fy26BE||1)) * 100}%`}}></div>
                      <div className="w-2 bg-gray-500" style={{height: `${(item.fy25RE / Math.max(item.fy24A||1, item.fy25BE||1, item.fy25RE||1, item.fy26BE||1)) * 100}%`}}></div>
                      <div className={`w-2 ${item.trend === 'up' ? 'bg-emerald-500' : item.trend === 'down' ? 'bg-rose-500' : 'bg-yellow-500'}`} style={{height: `${(item.fy26BE / Math.max(item.fy24A||1, item.fy25BE||1, item.fy25RE||1, item.fy26BE||1)) * 100}%`}}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};
  
const SectorWiseView = ({ onAnalyze }: any) => {
    return (
      <div className="animate-in fade-in duration-200">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h2 className="text-3xl text-white mb-2 uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>SECTORAL ROLL CALL</h2>
              <p className="text-gray-500 font-mono text-sm">KEY STRATEGIC SECTORS (FY 2025-26)</p>
            </div>
            <div className="text-xs font-mono text-gray-500 border border-gray-800 px-3 py-1 rounded bg-gray-900/50">SHOWING ALL {sectorWatchlist.length}</div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {sectorWatchlist.map((sector) => (
            <div 
              key={sector.id} 
              onClick={() => onAnalyze(masterData.find(m => m.id === sector.metricId) || masterData[0])}
              className="bg-black border border-gray-800 hover:border-rose-500/50 transition-all cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row">
                <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-gray-800">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gray-900/50 rounded border border-gray-800 text-rose-500 group-hover:text-white transition-colors"><sector.icon size={24} /></div>
                    <div>
                      <h3 className="text-2xl text-white uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>{sector.name || sector.sector}</h3>
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-wide">{sector.category}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{sector.details}</p>
                  <div className="flex flex-wrap gap-2">
                    {sector.topPicks?.map((pick, i) => (
                      <span key={i} className="text-[10px] font-mono bg-gray-900 text-gray-400 px-2 py-1 rounded border border-gray-800">{pick}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6 w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col justify-center">
                  <div className="mb-4">
                    <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Allocation</div>
                    <div className="text-2xl text-white font-bold font-mono">{sector.value || sector.allocation}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Change</div>
                    <div className={`text-lg font-bold font-mono ${sector.change?.includes('+') || sector.change === 'New' ? 'text-emerald-500' : 'text-white'}`}>{sector.change}</div>
                  </div>
                </div>
                <div className="p-6 w-full md:w-48 flex flex-col justify-between items-end bg-gray-900/10">
                  <div className="text-right">
                    <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Score</div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-3xl text-white uppercase font-bold" style={{fontFamily: 'Anton, sans-serif'}}>{sector.score}</span>
                      <Star size={16} className="text-yellow-500 fill-yellow-500"/>
                    </div>
                  </div>
                  <div className={`text-xs font-bold uppercase px-2 py-1 rounded ${sector.trend.includes('Bullish') || sector.trend === 'Positive' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                    {sector.trend}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

const RawDataView = () => (
    <div className="h-full overflow-y-auto animate-in fade-in duration-200 scrollbar-custom">
      <div className="mb-8">
        <h2 className="text-3xl text-white mb-2 uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>OFFICIAL DOCUMENTS</h2>
        <p className="text-gray-500 font-mono text-sm">SOURCE: MINISTRY OF FINANCE</p>
      </div>
      <div className="bg-black border border-gray-800 overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-900/50 p-4 text-xs font-mono text-gray-400 uppercase border-b border-gray-800">
          <div className="col-span-2">Doc ID</div>
          <div className="col-span-5">Document Title</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-3 text-right">Action</div>
        </div>
        <div className="divide-y divide-gray-800">
          {officialDocs?.map((doc: any) => (
            <div key={doc.id} className="grid grid-cols-12 p-4 items-center hover:bg-gray-900/20 transition-colors group">
              <div className="col-span-2 text-sm text-gray-500 font-mono">{doc.id}</div>
              <div className="col-span-5 text-sm text-white font-medium flex items-center gap-2">
                <FileText size={16} className="text-rose-500"/> {doc.title}
              </div>
              <div className="col-span-2 text-sm text-gray-500 font-mono">{doc.size}</div>
              <div className="col-span-3 flex justify-end">
                <button className="flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded bg-emerald-500/10">
                  <ExternalLink size={12}/> DOWNLOAD
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 p-4 border border-dashed border-gray-800 rounded bg-gray-900/10 text-center">
        <p className="text-gray-500 text-sm font-mono">
          Data last synced: 22 Feb 2025 • Next update: 01 Mar 2025
        </p>
      </div>
    </div>
);

const Navbar = ({ setIsMobileMenuOpen, isMobileMenuOpen }: any) => (
    <header className="h-16 bg-black/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-40">
      <button className="md:hidden text-gray-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu /></button>
      
      {/* Ticker Runway */}
      <div className="hidden md:flex flex-1 mx-8 h-8 bg-gray-900/50 border border-gray-800 rounded overflow-hidden items-center relative">
         <div className="absolute whitespace-nowrap animate-ticker flex items-center gap-8 text-xs font-mono text-emerald-400">
             <span>SENSEX: 74,230 ▲ 0.8%</span>
             <span className="text-gray-500">|</span>
             <span>NIFTY: 22,560 ▲ 0.7%</span>
             <span className="text-gray-500">|</span>
             <span>GOLD: ₹62,500 ▼ 0.2%</span>
             <span className="text-gray-500">|</span>
             <span>USD/INR: 83.12 ▲ 0.01%</span>
             <span className="text-gray-500">|</span>
             <span className="text-rose-400">10Y BOND: 7.05% ▼ 0.02%</span>
             <span className="text-gray-500">|</span>
             <span>OIL: $82.4 ▲ 1.2%</span>
             <span className="text-gray-500">|</span>
             <span className="text-white">BREAKING: RAILWAY CAPEX HITS RECORD HIGH</span>
         </div>
         <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10"></div>
         <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10"></div>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-white text-black px-4 py-1.5 text-sm font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors font-valorant">Get Report</button>
      </div>
    </header>
);

// --- MAIN DASHBOARD CONTROLLER ---
export default function BudgetDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [email, setEmail] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleMetricClick = (metric: any) => {
    // Uses Imported masterData from budgetData.ts
    const fullMetric = masterData.find(m => m.id === metric.id || m.id === metric.metricId) || metric;
    setSelectedMetric(fullMetric);
  };
  const handleBack = () => { setSelectedMetric(null); }

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setSelectedMetric(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-rose-500/30 selection:text-rose-200 flex flex-col md:flex-row relative">
      
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-50 bg-black border-r border-gray-800 transform transition-transform duration-300 ease-in-out flex flex-col 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
        ${isSidebarCollapsed ? 'w-20' : 'w-64'}
      `}>
        <div className={`h-16 flex items-center px-6 border-b border-gray-800 ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}>
          {!isSidebarCollapsed ? (
            <><div className="w-3 h-3 bg-rose-500 mr-3"></div><span className="font-valorant text-xl tracking-widest text-white">BUDGET<span className="text-gray-600">.PRO</span></span></>
          ) : <div className="w-3 h-3 bg-rose-500"></div>}
        </div>

        <div className="p-4 flex-1 overflow-y-auto scrollbar-custom">
          {!isSidebarCollapsed && <div className="text-xs font-mono text-gray-600 mb-4 px-4">INVESTOR DASHBOARD</div>}
          <nav className="space-y-1">
            <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview' && !selectedMetric} onClick={() => handleNavClick('overview')} collapsed={isSidebarCollapsed} />
            <SidebarItem icon={PieChart} label="All Data" active={activeTab === 'all-data' || selectedMetric} onClick={() => handleNavClick('all-data')} collapsed={isSidebarCollapsed} />
            <SidebarItem icon={Briefcase} label="Sector Wise" active={activeTab === 'sector-wise'} onClick={() => handleNavClick('sector-wise')} collapsed={isSidebarCollapsed} />
            <SidebarItem icon={Database} label="Raw Data" active={activeTab === 'raw-data'} onClick={() => handleNavClick('raw-data')} collapsed={isSidebarCollapsed} />
          </nav>
          
          {!isSidebarCollapsed && (
            <>
              <div className="mt-8 px-4">
                <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-sm">
                  <div className="flex items-center gap-2 text-rose-500 mb-2">
                    <Mail size={16} />
                    <h4 className="text-sm uppercase font-bold font-valorant">Monthly Intel</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Get reports to your inbox.</p>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black border border-gray-700 text-xs text-white p-2 outline-none focus:border-rose-500 transition-colors w-full"
                    />
                    <button className="bg-white text-black text-xs font-bold uppercase py-2 hover:bg-rose-500 hover:text-white transition-colors w-full font-valorant">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-8 px-4"><p className="text-[10px] text-gray-600 font-mono">© 2025 AlphaBudget Analytics.<br/>Private & Confidential.</p></div>
            </>
          )}
        </div>
        
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
          className="hidden md:flex p-4 border-t border-gray-800 text-gray-500 hover:text-white hover:bg-gray-900 transition-colors justify-center w-full"
        >
          {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </aside>
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          <div className="max-w-7xl mx-auto h-full">
            {selectedMetric ? (
               <SectorDetailView metric={selectedMetric} onBack={handleBack} />
            ) : activeTab === 'all-data' ? (
               <AllDataView onMetricClick={handleMetricClick} />
            ) : activeTab === 'sector-wise' ? (
               <SectorWiseView onAnalyze={handleMetricClick} />
            ) : activeTab === 'raw-data' ? (
               <RawDataView />
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                    <div><h1 className="font-valorant text-5xl md:text-7xl text-white tracking-tighter leading-none">THE GREAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-white">INDIAN BUDGET</span></h1><p className="text-gray-400 text-sm font-mono mt-2">UNOFFICIAL ANALYTICS • FY 2025-26 • PRIVATE INVESTOR EDITION</p></div>
                  </div>
                  <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 p-6 relative overflow-hidden rounded-sm">
                    <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                    <h3 className="font-valorant text-2xl text-white mb-2 flex items-center gap-2"><span className="text-rose-500">PROFESSOR'S VERDICT:</span> REFORMIST & CAPEX HEAVY</h3>
                    <p className="text-gray-300 max-w-4xl leading-relaxed font-light">"Contrary to pre-election populist fears, this budget sticks to fiscal glide paths. <strong className="text-white font-medium"> Key Takeaway:</strong> Doubling down on Infrastructure (Railways/Defence). No freebies means inflation stays in check—good for banking stocks."</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {kpiData.map((kpi, index) => (
                        <KPICard key={index} data={kpi} onClick={() => handleMetricClick(masterData.find(m => m.id === kpi.metricId) || kpi)} />
                      ))}
                    </div>
                    
                    <div className="h-auto lg:h-96 grid grid-cols-1 lg:grid-cols-3 gap-6">
                       <div className="lg:col-span-2 h-96 lg:h-full"><MacroChart /></div>
                       <div className="lg:col-span-1 h-96 lg:h-full">
                         <SectorPieChart />
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                      <div className="lg:col-span-1 space-y-6"><SectorList onMetricClick={handleMetricClick} /><MetricRatings onInfoClick={handleMetricClick} /></div>
                      <div className="lg:col-span-2 h-full">
                         <MoneyFlow />
                      </div>
                    </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}