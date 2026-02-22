import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Briefcase, Zap, TrendingUp, Search, 
  Menu, Database, ArrowUpRight, ArrowDownRight, 
  Wallet, Landmark, Shield, TrainFront, Home, AlertCircle, 
  Info, Star, ArrowLeft, Scale, PieChart, FileText, 
  ExternalLink, Mail, ChevronRight, ChevronLeft, 
  Truck, ArrowUpDown, Download, BookOpen, Target, Cpu,
  HeartPulse, GraduationCap, Sprout, Wifi, Droplet, 
  Scissors, Banknote
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';

// --- DATA ---
const kpiData = [
  { id: 'KPI-01', title: "Fiscal Deficit", value: "4.5%", change: "Target Met", isPositive: true, icon: AlertCircle, metricId: 'MAC-01', desc: "Abs: ₹15.68 LC" },
  { id: 'KPI-02', title: "Effective Capex", value: "₹ 15.48 LC", change: "+12.1%", isPositive: true, icon: Landmark, metricId: 'MAC-CAP', desc: "Central + Grants" },
  { id: 'KPI-03', title: "Net Tax Receipts", value: "₹ 28.37 LC", change: "+10.9%", isPositive: true, icon: TrendingUp, metricId: 'MAC-TAX', desc: "vs ₹25.56 LC" },
  { id: 'KPI-04', title: "Total Budget Size", value: "₹ 50.65 LC", change: "+7.4%", isPositive: true, icon: Wallet, metricId: 'MAC-EXP', desc: "vs ₹47.16 LC" },
];

const masterData = [
  { id: 'MAC-01', name: "Fiscal Deficit", category: "Macro", subSector: "Fiscal Policy", unit: "Lakh Cr", fy24A: 16.54, fy25BE: 16.13, fy25RE: 15.69, fy26BE: 15.68, trend: "down", score: 5.0, desc: "The difference between total revenue and total expenditure. Lower is better for bond yields.", citation: "Budget at a Glance", calculation: "Total Exp - Revenue", impact: "Bullish for Banks. Lower borrowing means less crowding out.", stocks: ["SBI", "HDFC Bank", "Liquid BeES"] },
  { id: 'MAC-CAP', name: "Capital Expenditure", category: "Macro", subSector: "Infrastructure", unit: "Lakh Cr", fy24A: 9.49, fy25BE: 11.11, fy25RE: 10.18, fy26BE: 11.21, trend: "up", score: 5.0, desc: "Funds used to create assets like roads, railways, and machinery.", citation: "Budget at a Glance", calculation: "Sum of all Capital Heads", impact: "Bullish for Infrastructure, Cement, Steel.", stocks: ["L&T", "UltraTech", "Tata Steel"] },
  { id: 'MAC-TAX', name: "Net Tax Receipts", category: "Macro", subSector: "Revenue", unit: "Lakh Cr", fy24A: 23.78, fy25BE: 26.02, fy25RE: 25.56, fy26BE: 28.37, trend: "up", score: 5.0, desc: "Tax collections after devolution to states.", citation: "Budget at a Glance", calculation: "Gross Tax - States' Share", impact: "Strong economy indicator.", stocks: ["Index Funds", "Blue Chips"] },
  { id: 'MAC-EXP', name: "Total Expenditure", category: "Macro", subSector: "Spending", unit: "Lakh Cr", fy24A: 44.43, fy25BE: 48.20, fy25RE: 47.16, fy26BE: 50.65, trend: "up", score: 4.0, desc: "Total government spending plan.", citation: "Budget at a Glance", calculation: "Revenue + Capital", impact: "Neutral. Balanced growth.", stocks: ["Diversified"] },
  { id: 'DEF-01', name: "Defence Capital Outlay", category: "Ministry of Defence", subSector: "Modernization", unit: "Cr", fy24A: 154256, fy25BE: 172000, fy25RE: 159500, fy26BE: 180000, trend: "up", score: 5.0, desc: "Expenditure on new weaponry, aircraft, ships.", citation: "Demand No 21", calculation: "Total Capital", impact: "Very Bullish for Defence OEMs.", stocks: ["HAL", "BEL", "Bharat Dynamics"] },
  { id: 'RLY-01', name: "Railways Capital", category: "Ministry of Railways", subSector: "Infra", unit: "Cr", fy24A: 242578, fy25BE: 255000, fy25RE: 252000, fy26BE: 265000, trend: "up", score: 5.0, desc: "Investment in new lines, rolling stock and safety.", citation: "Demand No 85", calculation: "Net Capital", impact: "Bullish for EPC contractors.", stocks: ["RVNL", "IRCON", "Titagarh"] },
  { id: 'ROAD-01', name: "Road Transport Capital", category: "Road Transport", subSector: "Highways", unit: "Cr", fy24A: 321045, fy25BE: 339657, fy25RE: 334389, fy26BE: 332325, trend: "stable", score: 4.0, desc: "Capital outlay on roads and bridges.", citation: "Demand No 86", calculation: "Capital Total", impact: "Stable construction activity.", stocks: ["PNC Infratech", "KNR"] },
  { id: 'RUR-01', name: "MGNREGA", category: "Rural Development", subSector: "Welfare", unit: "Cr", fy24A: 89154, fy25BE: 86000, fy25RE: 86000, fy26BE: 86000, trend: "flat", score: 3.0, desc: "Rural Employment Guarantee.", citation: "Demand No 87", calculation: "Programme Total", impact: "Neutral. No aggressive push.", stocks: ["HUL", "Dabur", "Hero"] },
  { id: 'RUR-02', name: "PM Awas Yojana", category: "Rural Development", subSector: "Housing", unit: "Cr", fy24A: 32000, fy25BE: 54500, fy25RE: 54500, fy26BE: 54832, trend: "up", score: 4.5, desc: "Housing for All in rural areas.", citation: "Demand No 87", calculation: "PMAY-Gramin", impact: "Positive for housing materials.", stocks: ["UltraTech", "Asian Paints"] },
  { id: 'FERT-01', name: "Fertiliser Subsidy", category: "Chemicals", subSector: "Subsidy", unit: "Cr", fy24A: 195465, fy25BE: 168127, fy25RE: 189320, fy26BE: 184067, trend: "down", score: 4.0, desc: "Subsidy on Urea and NBF.", citation: "Demand No 6", calculation: "Total Revenue", impact: "Good for fiscal math.", stocks: ["Chambal", "Coromandel"] },
  { id: 'TEL-01', name: "Telecom Projects", category: "Communications", subSector: "Infra", unit: "Cr", fy24A: 3075, fy25BE: 8500, fy25RE: 6500, fy26BE: 22000, trend: "up", score: 5.0, desc: "Rural optical fibre connectivity.", citation: "Demand No 13", calculation: "Capital Telecom", impact: "Very Bullish for optical fibre.", stocks: ["STL", "Tejas Networks"] },
];

const sectorWatchlist = [
  { id: 1, category: "Strategic", name: "Defence", value: "₹ 1.80 LC", change: "+12.8%", trend: "Bullish", icon: Shield, color: "text-emerald-400", score: 5.0, metricId: 'DEF-01', details: "Capital Outlay increased to ₹1.8L Cr. Focus on Deep Tech.", topPicks: ["HAL", "BEL", "Mazagon"] },
  { id: 2, category: "Strategic", name: "Railways", value: "₹ 2.65 LC", change: "+5.2%", trend: "Bullish", icon: TrainFront, color: "text-emerald-400", score: 5.0, metricId: 'RLY-01', details: "Safety & Rolling Stock priority.", topPicks: ["Titagarh", "Siemens", "RVNL"] },
  { id: 3, category: "Job Creators", name: "Roads", value: "₹ 3.32 LC", change: "Stable", trend: "Neutral", icon: Truck, color: "text-yellow-400", score: 4.0, metricId: 'ROAD-01', details: "Allocation flat. Execution focus.", topPicks: ["PNC Infra", "KNR"] },
  { id: 4, category: "Consumer", name: "Rural", value: "₹ 1.41 LC", change: "Flat", trend: "Neutral", icon: Home, color: "text-yellow-500", score: 3.5, metricId: 'RUR-01', details: "MGNREGA flat at ₹86k Cr.", topPicks: ["M&M", "Escorts"] },
  { id: 5, category: "Agri-Input", name: "Fertilisers", value: "₹ 1.84 LC", change: "-2.7%", trend: "Positive", icon: Sprout, color: "text-emerald-400", score: 4.0, metricId: 'FERT-01', details: "Subsidy bill contained.", topPicks: ["Coromandel", "Chambal"] },
  { id: 6, category: "Strategic", name: "Telecom", value: "₹ 22k Cr", change: "+238%", trend: "Very Bullish", icon: Wifi, color: "text-emerald-400", score: 5.0, metricId: 'TEL-01', details: "BSNL & Bharatnet massive jump.", topPicks: ["Tejas", "STL"] },
];

const officialDocs = [
  { id: 'DOC-01', title: "Budget Speech", size: "2.4 MB" },
  { id: 'DOC-02', title: "Budget at a Glance", size: "3.1 MB" },
  { id: 'DOC-03', title: "Expenditure Budget", size: "8.5 MB" },
];

// --- COMPONENTS ---
const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }) => (
  <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 border-l-2 w-full ${active ? 'border-rose-500 text-gray-100 bg-gray-800/50' : 'border-transparent text-gray-400 hover:text-gray-100 hover:bg-gray-800/30'} ${collapsed ? 'justify-center px-2' : ''}`} title={collapsed ? label : ''}>
    <Icon size={18} className="shrink-0" />
    {!collapsed && <span className="tracking-wide uppercase truncate">{label}</span>}
  </button>
);

const KPICard = ({ data, onClick }) => (
  <div onClick={onClick} className="bg-black border border-gray-800 p-6 hover:border-rose-500/50 cursor-pointer transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <data.icon size={48} className="text-white" />
    </div>
    <h3 className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-1">{data.title}</h3>
    <div className="text-3xl font-bold text-white mb-2 tracking-tight uppercase" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>{data.value}</div>
    <div className="flex items-center gap-2 text-sm">
      <span className={`${data.isPositive ? 'text-emerald-400' : 'text-rose-400'} flex items-center font-mono`}>
        {data.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {data.change}
      </span>
      <span className="text-gray-600 text-xs hidden sm:inline">| {data.desc}</span>
    </div>
  </div>
);

const MacroChart = () => {
  const chartData = [
    { year: 'FY24 (A)', revenue: 27.29, expense: 44.43, deficit: 16.54 },
    { year: 'FY25 (BE)', revenue: 31.29, expense: 48.20, deficit: 16.13 },
    { year: 'FY25 (RE)', revenue: 30.87, expense: 47.16, deficit: 15.69 },
    { year: 'FY26 (BE)', revenue: 34.20, expense: 50.65, deficit: 15.68 },
  ];

  return (
    <div className="bg-black border border-gray-800 p-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl text-white tracking-wide flex items-center gap-2 uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>
            Macro Fiscal Trends
          </h3>
          <p className="text-xs text-gray-500 font-mono mt-1">VALUES IN LAKH CRORE (₹)</p>
        </div>
      </div>
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="year" tick={{fill: '#666', fontSize: 10}} axisLine={false} tickLine={false} />
            <YAxis tick={{fill: '#666', fontSize: 10}} axisLine={false} tickLine={false} />
            <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid #333', color: '#fff', fontSize: '12px'}} />
            <Bar dataKey="revenue" name="Receipts" fill="#10b981" radius={[2, 2, 0, 0]} barSize={40} />
            <Bar dataKey="expense" name="Expenditure" fill="#e5e7eb" radius={[2, 2, 0, 0]} barSize={40} />
            <Bar dataKey="deficit" name="Fiscal Deficit" fill="#f43f5e" radius={[2, 2, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const SectorPieChart = () => {
  const data = [
    { name: 'Defence', value: 180000, color: '#10b981' },
    { name: 'Railways', value: 265000, color: '#3b82f6' },
    { name: 'Roads', value: 332325, color: '#f59e0b' },
    { name: 'Rural', value: 141000, color: '#ef4444' },
    { name: 'Telecom', value: 22000, color: '#8b5cf6' },
    { name: 'Fertiliser', value: 184067, color: '#ec4899' },
  ];

  return (
    <div className="bg-black border border-gray-800 p-6 h-full flex flex-col">
      <h3 className="text-xl text-white tracking-wide mb-4 uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>
        Sectoral Split
      </h3>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
              ))}
            </Pie>
            <Tooltip contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid #333'}} formatter={(value) => `₹ ${(value/100000).toFixed(2)} LC`} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '10px', paddingTop: '10px'}} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DetailPage = ({ metric, onBack }) => {
  if (!metric) return null;

  const trendData = [
    { name: 'FY24 Act', value: metric.fy24A || 0 },
    { name: 'FY25 BE', value: metric.fy25BE || 0 },
    { name: 'FY25 RE', value: metric.fy25RE || 0 },
    { name: 'FY26 BE', value: metric.fy26BE || 0 },
  ];

  return (
    <div className="h-full flex flex-col overflow-y-auto pb-20" style={{animation: 'fadeIn 0.2s ease-in'}}>
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-white font-mono text-xs mb-6 group w-fit">
        <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform"/>
        BACK TO DASHBOARD
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-gray-900 border border-gray-800 text-gray-400 text-[10px] font-mono uppercase tracking-wider">{metric.category}</span>
              {metric.subSector && <span className="px-2 py-1 bg-gray-900 border border-gray-800 text-gray-400 text-[10px] font-mono uppercase tracking-wider">{metric.subSector}</span>}
            </div>
            <h1 className="text-4xl md:text-5xl text-white mb-4 uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>{metric.name || metric.title}</h1>
            <div className="p-4 border border-gray-800 bg-gray-900/30 rounded-sm">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-rose-500 shrink-0 mt-1"/>
                <div>
                  <h4 className="text-gray-300 font-medium text-sm mb-1">TRADER'S DEFINITION</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{metric.desc}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-800 bg-black">
              <div className="text-gray-500 text-xs font-mono mb-2 uppercase">Official Citation</div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <BookOpen size={16}/> {metric.citation || "Union Budget 2025-26"}
              </div>
            </div>
            <div className="p-4 border border-gray-800 bg-black">
              <div className="text-gray-500 text-xs font-mono mb-2 uppercase">Calculation Method</div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Target size={16}/> {metric.calculation || "Budgetary Allocation"}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-gray-900/20 border border-gray-800 p-6 flex flex-col">
          <h3 className="font-mono text-gray-400 text-xs uppercase mb-6">Trend Analysis ({metric.unit || "Cr"})</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" tick={{fill: '#666', fontSize: 10}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#666', fontSize: 10}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid #333', color: '#fff', fontSize: '12px'}} />
                <Area type="monotone" dataKey="value" stroke="#f43f5e" fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 mt-auto">
        <h2 className="text-2xl text-white mb-6 flex items-center gap-2 uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>
          HOW IT AFFECTS YOU <span className="text-rose-500">?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 border-l-2 ${metric.score >= 4 || metric.isPositive ? 'border-emerald-500 bg-emerald-500/5' : 'border-rose-500 bg-rose-500/5'}`}>
            <h3 className={`font-mono text-sm font-bold mb-2 ${metric.score >= 4 || metric.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
              {metric.score >= 4 || metric.isPositive ? 'BULLISH SIGNAL' : 'BEARISH SIGNAL'}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">{metric.impact || "Direct impact on sectoral growth."}</p>
          </div>
          <div className="p-6 border border-gray-800 bg-gray-900/20">
            <h3 className="font-mono text-gray-500 text-xs font-bold mb-3 uppercase">Beneficiary Stocks</h3>
            <div className="flex flex-wrap gap-2">
              {metric.stocks?.map((stock, i) => (
                <span key={i} className="px-3 py-1 bg-black border border-gray-700 text-gray-300 text-xs rounded hover:border-rose-500 transition-colors cursor-default">
                  {stock}
                </span>
              ))}
              {metric.topPicks?.map((stock, i) => (
                <span key={`tp-${i}`} className="px-3 py-1 bg-black border border-gray-700 text-gray-300 text-xs rounded hover:border-rose-500 transition-colors cursor-default">
                  {stock}
                </span>
              ))}
              {!metric.stocks && !metric.topPicks && <span className="text-gray-500 text-xs">Analysis pending...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectorList = ({ onMetricClick }) => (
  <div className="bg-black border border-gray-800 p-4">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg text-white uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>Sector Watchlist</h3>
      <span className="text-xs font-mono text-gray-500">Top 6</span>
    </div>
    <div className="grid grid-cols-1 gap-2">
      {sectorWatchlist.slice(0, 6).map((s) => (
        <button key={s.id} onClick={() => onMetricClick(masterData.find(m => m.id === s.metricId) || masterData[0])} className="flex items-center justify-between p-3 bg-gray-900/30 border border-gray-800 hover:border-rose-500 transition-colors rounded">
          <div className="flex items-center gap-3">
            <s.icon size={18} className="text-rose-500" />
            <div>
              <div className="text-sm text-white font-medium">{s.name}</div>
              <div className="text-[10px] text-gray-400 font-mono">{s.category}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-white">{s.value}</div>
            <div className="text-[10px] text-gray-400 font-mono">{s.change}</div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const MetricRatings = ({ onInfoClick }) => (
  <div className="bg-black border border-gray-800 h-[384px] flex flex-col">
    <div className="p-6 border-b border-gray-800 flex justify-between items-center shrink-0">
      <div>
        <h3 className="text-xl text-white tracking-wide uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>Report Card</h3>
        <p className="text-xs text-gray-500 mt-1 font-mono">KEY INDICATORS</p>
      </div>
      <Scale size={20} className="text-yellow-500 fill-yellow-500"/>
    </div>
    <div className="divide-y divide-gray-800 overflow-y-auto flex-1" style={{scrollbarWidth: 'thin', scrollbarColor: '#333 #0a0a0a'}}>
      {masterData.filter(i => ['Macro', 'Ministry of Defence', 'Ministry of Railways', 'Rural Development'].includes(i.category)).slice(0, 8).map((item) => (
        <div key={item.id} onClick={() => onInfoClick(item)} className="p-3 px-4 flex items-center justify-between hover:bg-gray-900/20 transition-colors group cursor-pointer">
          <div className="flex flex-col gap-1 flex-1 min-w-0 pr-4">
            <span className="text-gray-200 text-sm font-medium truncate group-hover:text-rose-400 transition-colors">{item.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-600 bg-gray-900 px-1.5 rounded border border-gray-800 uppercase">{item.id}</span>
              <Info size={12} className="text-gray-500 group-hover:text-white"/>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className={`${i < Math.floor(item.score) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-800'}`} />
                ))}
              </div>
              <span className="text-xs font-mono text-yellow-500 font-bold">({item.score}/5)</span>
            </div>
            <div className={`text-[10px] uppercase tracking-wider ${item.trend === 'up' ? 'text-emerald-500' : item.trend === 'down' ? 'text-rose-500' : 'text-yellow-500'}`} style={{fontFamily: 'Anton, sans-serif'}}>
              {item.trend}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AllDataView = ({ onMetricClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [searchTerm, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="h-full flex flex-col" style={{animation: 'fadeIn 0.2s ease-in'}}>
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

      <div className="flex-1 overflow-auto border border-gray-800 bg-black" style={{scrollbarWidth: 'thin', scrollbarColor: '#333 #0a0a0a'}}>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-900/80 sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="p-4 border-b border-gray-800 font-mono text-xs text-gray-500 cursor-pointer hover:text-white" onClick={() => requestSort('id')}>
                ID <ArrowUpDown size={10} className="inline ml-1"/>
              </th>
              <th className="p-4 border-b border-gray-800 font-mono text-xs text-gray-500 cursor-pointer hover:text-white" onClick={() => requestSort('name')}>
                METRIC <ArrowUpDown size={10} className="inline ml-1"/>
              </th>
              <th className="p-4 border-b border-gray-800 font-mono text-xs text-gray-500 cursor-pointer hover:text-white text-right" onClick={() => requestSort('fy24A')}>
                FY24 (Act) <ArrowUpDown size={10} className="inline ml-1"/>
              </th>
              <th className="p-4 border-b border-gray-800 font-mono text-xs text-gray-500 cursor-pointer hover:text-white text-right" onClick={() => requestSort('fy25RE')}>
                FY25 (RE) <ArrowUpDown size={10} className="inline ml-1"/>
              </th>
              <th className="p-4 border-b border-gray-800 font-mono text-xs text-rose-500 font-bold cursor-pointer hover:text-white text-right" onClick={() => requestSort('fy26BE')}>
                FY26 (BE) <ArrowUpDown size={10} className="inline ml-1"/>
              </th>
              <th className="p-4 border-b border-gray-800 font-mono text-xs text-gray-500 text-center">
                TREND
              </th>
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

const SectorWiseView = ({ onAnalyze }) => {
  return (
    <div style={{animation: 'fadeIn 0.2s ease-in'}}>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl text-white mb-2 uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>SECTORAL ROLL CALL</h2>
            <p className="text-gray-500 font-mono text-sm">KEY STRATEGIC SECTORS (FY 2025-26)</p>
          </div>
          <div className="text-xs font-mono text-gray-500 border border-gray-800 px-3 py-1 rounded bg-gray-900/50">
            SHOWING ALL 6
          </div>
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
                  <div className="p-3 bg-gray-900/50 rounded border border-gray-800 text-rose-500 group-hover:text-white transition-colors">
                    <sector.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl text-white uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>{sector.name}</h3>
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
                  <div className="text-2xl text-white font-bold font-mono">{sector.value}</div>
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
  <div className="h-full overflow-y-auto" style={{animation: 'fadeIn 0.2s ease-in', scrollbarWidth: 'thin', scrollbarColor: '#333 #0a0a0a'}}>
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
        {officialDocs.map((doc) => (
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

// --- MAIN DASHBOARD ---
export default function BudgetDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [email, setEmail] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleMetricClick = (metric) => {
    const fullMetric = masterData.find(m => m.id === metric.id || m.id === metric.metricId) || metric;
    setSelectedMetric(fullMetric);
  };

  const handleBack = () => {
    setSelectedMetric(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans flex flex-col md:flex-row" style={{fontFamily: 'Inter, sans-serif'}}>
      
      {/* SIDEBAR */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 bg-black border-r border-gray-800 transform transition-all duration-300 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className={`h-16 flex items-center px-6 border-b border-gray-800 ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}>
          {!isSidebarCollapsed ? (
            <>
              <div className="w-3 h-3 bg-rose-500 mr-3"></div>
              <span className="text-xl tracking-widest text-white uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>BUDGET<span className="text-gray-600">.PRO</span></span>
            </>
          ) : <div className="w-3 h-3 bg-rose-500"></div>}
        </div>

        <div className="p-4 flex-1 overflow-y-auto" style={{scrollbarWidth: 'thin', scrollbarColor: '#333 #0a0a0a'}}>
          {!isSidebarCollapsed && <div className="text-xs font-mono text-gray-600 mb-4 px-4">INVESTOR DASHBOARD</div>}
          <nav className="space-y-1">
            <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview' && !selectedMetric} onClick={() => { setActiveTab('overview'); setSelectedMetric(null); }} collapsed={isSidebarCollapsed} />
            <SidebarItem icon={PieChart} label="All Data" active={activeTab === 'all-data' || selectedMetric} onClick={() => { setActiveTab('all-data'); setSelectedMetric(null); }} collapsed={isSidebarCollapsed} />
            <SidebarItem icon={Briefcase} label="Sector Wise" active={activeTab === 'sector-wise'} onClick={() => { setActiveTab('sector-wise'); setSelectedMetric(null); }} collapsed={isSidebarCollapsed} />
            <SidebarItem icon={Database} label="Raw Data" active={activeTab === 'raw-data'} onClick={() => { setActiveTab('raw-data'); setSelectedMetric(null); }} collapsed={isSidebarCollapsed} />
          </nav>

          {!isSidebarCollapsed && (
            <>
              <div className="mt-8 px-4">
                <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-sm">
                  <div className="flex items-center gap-2 text-rose-500 mb-2">
                    <Mail size={16} />
                    <h4 className="text-sm uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>Monthly Intel</h4>
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
                    <button className="bg-white text-black text-xs font-bold uppercase py-2 hover:bg-rose-500 hover:text-white transition-colors w-full" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 px-4">
                <p className="text-[10px] text-gray-600 font-mono">
                  © 2025 AlphaBudget Analytics.<br/>Private & Confidential.
                </p>
              </div>
            </>
          )}
        </div>
        
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-4 border-t border-gray-800 text-gray-500 hover:text-white hover:bg-gray-900 transition-colors flex justify-center w-full"
        >
          {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 bg-black/50 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-40">
          <button className="md:hidden text-gray-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu /></button>
          <div className="hidden md:flex items-center bg-gray-900/50 border border-gray-800 rounded px-3 py-1.5 w-96">
            <Search size={16} className="text-gray-500 mr-2" />
            <input type="text" placeholder="Search Tickers, Sectors..." className="bg-transparent border-none outline-none text-sm text-gray-200 w-full placeholder-gray-600"/>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-mono text-gray-500">SENSEX (LIVE)</div>
              <div className="text-sm font-bold text-emerald-400">74,200 ▲ 0.8%</div>
            </div>
            <button className="bg-white text-black px-4 py-1.5 text-sm font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>
              Get Report
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8" style={{scrollbarWidth: 'thin', scrollbarColor: '#333 #0a0a0a'}}>
          <div className="max-w-7xl mx-auto h-full">
            
            {selectedMetric ? (
              <DetailPage metric={selectedMetric} onBack={handleBack} />
            ) : activeTab === 'all-data' ? (
              <AllDataView onMetricClick={handleMetricClick} />
            ) : activeTab === 'sector-wise' ? (
              <SectorWiseView onAnalyze={handleMetricClick} />
            ) : activeTab === 'raw-data' ? (
              <RawDataView />
            ) : (
              <>
                {/* Hero Section */}
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                    <div>
                      <h1 className="text-5xl md:text-7xl text-white tracking-tighter leading-none uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>
                        THE GREAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-white">INDIAN BUDGET</span>
                      </h1>
                      <p className="text-gray-400 text-sm font-mono mt-2">
                        UNOFFICIAL ANALYTICS • FY 2025-26 • PRIVATE INVESTOR EDITION
                      </p>
                    </div>
                  </div>

                  {/* Professor's Verdict Banner */}
                  <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 p-6 relative overflow-hidden rounded-sm">
                    <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                    <h3 className="text-2xl text-white mb-2 flex items-center gap-2 uppercase font-bold" style={{fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em'}}>
                      <span className="text-rose-500">VERDICT:</span> REFORMIST & CAPEX HEAVY
                    </h3>
                    <p className="text-gray-300 max-w-4xl leading-relaxed font-light">
                      "Contrary to pre-election populist fears, this budget sticks to fiscal glide paths. 
                      <strong className="text-white font-medium"> Key Takeaway:</strong> Doubling down on Infrastructure (Railways/Defence/Power). 
                      No freebies means inflation stays in check—good for banking stocks."
                    </p>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="space-y-6">
                  {/* KPI Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpiData.map((kpi, index) => (
                      <KPICard 
                        key={index} 
                        data={kpi} 
                        onClick={() => handleMetricClick(masterData.find(m => m.id === kpi.metricId) || kpi)}
                      />
                    ))}
                  </div>

                  {/* Macro Chart */}
                  <div className="h-96">
                    <MacroChart />
                  </div>

                  {/* Main Data Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <SectorList onMetricClick={handleMetricClick} />
                    <MetricRatings onInfoClick={handleMetricClick} />
                  </div>

                  {/* Pie Chart */}
                  <div className="h-96 mt-8">
                    <SectorPieChart />
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