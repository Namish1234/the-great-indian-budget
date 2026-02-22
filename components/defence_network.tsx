import React, { useMemo, useState } from 'react';
import { 
  Shield, 
  Target, 
  Crosshair, 
  ChevronLeft, 
  Zap, 
  Database, 
  Globe, 
  Cpu, 
  Activity, 
  Navigation,
  Anchor,
  Plane,
  Truck,
  Maximize2
} from 'lucide-react';

// --- Types ---
type NodeType = 'root' | 'dept' | 'branch' | 'leaf';
type RoleType = 'forces' | 'industry' | 'tech' | 'admin' | 'core';

interface RawNode {
  id: string;
  label: string;
  type: NodeType;
  role: RoleType;
  budget?: string;
  stocks?: string[];
  description?: string;
  icon?: React.ReactNode;
  children?: RawNode[];
  value?: number;
}

interface LayoutNode {
  id: string;
  data: RawNode;
  // Tree Props
  x: number;
  y: number;
  depth: number;
  children: LayoutNode[];
  parent?: LayoutNode;
  // Sunburst Props
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  color?: string;
}

// --- Data: The "Pentagon" Structure ---
const RAW_DATA: RawNode = {
  id: 'mod',
  label: 'MINISTRY OF DEFENCE',
  type: 'root',
  role: 'core',
  budget: '₹ 5.94 Lakh Cr',
  description: 'Supreme Command Authority',
  icon: <Shield className="w-6 h-6" />,
  children: [
    // 1. DMA: The Sword (Red)
    {
      id: 'dma',
      label: 'DMA (FORCES)',
      type: 'dept',
      role: 'forces',
      budget: '₹ 2.7 Lakh Cr',
      description: 'Dept. of Military Affairs - Operational Command',
      children: [
        { 
          id: 'army', label: 'INDIAN ARMY', type: 'branch', role: 'forces', 
          children: [
            { id: 'infantry', label: 'Infantry', type: 'leaf', role: 'forces' },
            { id: 'artillery', label: 'Artillery', type: 'leaf', role: 'forces' },
            { id: 'armoured', label: 'Armoured Corps', type: 'leaf', role: 'forces' },
          ]
        },
        { 
          id: 'navy', label: 'INDIAN NAVY', type: 'branch', role: 'forces',
          children: [
            { id: 'wnc', label: 'Western Cmd', type: 'leaf', role: 'forces' },
            { id: 'enc', label: 'Eastern Cmd', type: 'leaf', role: 'forces' },
            { id: 'sub', label: 'Submarine Arm', type: 'leaf', role: 'forces' },
          ]
        },
        { 
          id: 'iaf', label: 'AIR FORCE', type: 'branch', role: 'forces',
          children: [
            { id: 'wac', label: 'Western Air', type: 'leaf', role: 'forces' },
            { id: 'tc', label: 'Training Cmd', type: 'leaf', role: 'forces' },
          ]
        },
        { 
          id: 'ids', label: 'IDS (JOINT)', type: 'branch', role: 'forces',
          children: [
            { id: 'cyber', label: 'Cyber Agency', type: 'leaf', role: 'forces' },
            { id: 'space', label: 'Space Agency', type: 'leaf', role: 'forces' },
            { id: 'sfd', label: 'Special Forces', type: 'leaf', role: 'forces' },
          ]
        }
      ]
    },
    // 2. DDP: The Forge (Teal)
    {
      id: 'ddp',
      label: 'DDP (INDUSTRY)',
      type: 'dept',
      role: 'industry',
      budget: '₹ 1.6 Lakh Cr',
      description: 'Dept. of Defence Production - Manufacturing & Exports',
      children: [
        { 
          id: 'aero', label: 'AEROSPACE', type: 'branch', role: 'industry', stocks: ['HAL'],
          children: [ { id: 'hal', label: 'HAL', type: 'leaf', role: 'industry', stocks: ['HAL'] } ]
        },
        { 
          id: 'ships', label: 'SHIPBUILDING', type: 'branch', role: 'industry', stocks: ['MAZAGON', 'COCHIN', 'GRSE'],
          children: [
            { id: 'mdl', label: 'Mazagon Dock', type: 'leaf', role: 'industry', stocks: ['MAZDOCK'] },
            { id: 'grse', label: 'GRSE', type: 'leaf', role: 'industry', stocks: ['GRSE'] },
            { id: 'gsl', label: 'Goa Shipyard', type: 'leaf', role: 'industry' },
            { id: 'hsl', label: 'Hindustan Ship', type: 'leaf', role: 'industry' },
          ]
        },
        { 
          id: 'missiles', label: 'MISSILES & AMMO', type: 'branch', role: 'industry', stocks: ['BDL', 'SOLARINDS'],
          children: [
            { id: 'bdl', label: 'Bharat Dynamics', type: 'leaf', role: 'industry', stocks: ['BDL'] },
            { id: 'mil', label: 'Munitions India', type: 'leaf', role: 'industry' },
            { id: 'solar', label: 'Solar Ind', type: 'leaf', role: 'industry', stocks: ['SOLARINDS'] },
          ]
        },
        { 
          id: 'electronics', label: 'ELECTRONICS', type: 'branch', role: 'industry', stocks: ['BEL', 'PARAS', 'ZEN'],
          children: [
            { id: 'bel', label: 'Bharat Elec', type: 'leaf', role: 'industry', stocks: ['BEL'] },
            { id: 'paras', label: 'Paras Defence', type: 'leaf', role: 'industry', stocks: ['PARAS'] },
            { id: 'zen', label: 'Zen Tech', type: 'leaf', role: 'industry', stocks: ['ZENTECH'] },
          ]
        },
        { 
          id: 'land', label: 'LAND SYSTEMS', type: 'branch', role: 'industry', stocks: ['BEML'],
          children: [
            { id: 'beml', label: 'BEML', type: 'leaf', role: 'industry', stocks: ['BEML'] },
            { id: 'avnl', label: 'Armoured Veh', type: 'leaf', role: 'industry' },
          ]
        },
        {
          id: 'materials', label: 'MATERIALS', type: 'branch', role: 'industry', stocks: ['MIDHANI'],
          children: [ { id: 'midhani', label: 'MIDHANI', type: 'leaf', role: 'industry', stocks: ['MIDHANI'] } ]
        }
      ]
    },
    // 3. DDR&D: The Brain (Violet)
    {
      id: 'drdo',
      label: 'DDR&D (TECH)',
      type: 'dept',
      role: 'tech',
      budget: '₹ 23,264 Cr',
      description: 'Innovation & Future Technology',
      children: [
        { 
          id: 'mss', label: 'STRATEGIC (MSS)', type: 'branch', role: 'tech',
          children: [
            { id: 'asl', label: 'ASL (Agni)', type: 'leaf', role: 'tech' },
            { id: 'drdl', label: 'DRDL (BrahMos)', type: 'leaf', role: 'tech' },
          ]
        },
        { 
          id: 'aero_rnd', label: 'AERONAUTICAL', type: 'branch', role: 'tech',
          children: [
            { id: 'ada', label: 'ADA (Tejas)', type: 'leaf', role: 'tech' },
            { id: 'ade', label: 'ADE (Drones)', type: 'leaf', role: 'tech' },
            { id: 'gtre', label: 'GTRE (Engines)', type: 'leaf', role: 'tech' },
          ]
        },
        { 
          id: 'naval_rnd', label: 'NAVAL SYS', type: 'branch', role: 'tech',
          children: [
            { id: 'npol', label: 'NPOL (Sonar)', type: 'leaf', role: 'tech' },
            { id: 'nstl', label: 'NSTL (Torpedo)', type: 'leaf', role: 'tech' },
          ]
        },
        { 
          id: 'ecs', label: 'ELECTRONICS', type: 'branch', role: 'tech',
          children: [
            { id: 'lrde', label: 'LRDE (Radar)', type: 'leaf', role: 'tech' },
          ]
        },
      ]
    },
    // 4. DoD & DESW: Support (Slate)
    {
      id: 'support',
      label: 'SUPPORT (DoD/DESW)',
      type: 'dept',
      role: 'admin',
      budget: '₹ 1.4 Lakh Cr',
      description: 'Administration, Pensions & Border Infra',
      children: [
        { 
          id: 'bro', label: 'BRO', type: 'branch', role: 'admin',
          children: [ { id: 'border', label: 'Border Roads', type: 'leaf', role: 'admin' } ]
        },
        { 
          id: 'icg', label: 'COAST GUARD', type: 'branch', role: 'admin',
          children: [ { id: 'maritime', label: 'Maritime Sec', type: 'leaf', role: 'admin' } ]
        },
        { 
          id: 'desw', label: 'VETERANS', type: 'branch', role: 'admin',
          children: [ { id: 'pension', label: 'Pensions', type: 'leaf', role: 'admin' } ]
        }
      ]
    }
  ]
};

// --- Algorithm & Utilities ---

// 1. Recursive Value Calc (for arc sizes)
const calculateValues = (node: RawNode): number => {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((sum, c) => sum + calculateValues(c), 0);
};

// 2. Build Hierarchy Tree from a given Root
const buildHierarchy = (raw: RawNode, depth: number = 0, parent?: LayoutNode): LayoutNode => {
  const node: LayoutNode = {
    id: raw.id,
    data: raw,
    x: 0, y: 0, depth,
    parent,
    children: []
  };
  if (raw.children) {
    node.children = raw.children.map(c => buildHierarchy(c, depth + 1, node));
  }
  return node;
};

// 3. Sunburst Layout Engine
const computeSunburst = (
  node: LayoutNode,
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  radiusStep: number
) => {
  node.startAngle = startAngle;
  node.endAngle = endAngle;
  node.innerRadius = innerRadius;
  node.outerRadius = innerRadius + radiusStep;

  // --- Valorant Color Logic ---
  const colors: Record<RoleType, string[]> = {
    core: ['#ffffff', '#e2e8f0'], // White/Slate
    forces: ['#ff4655', '#991b1b', '#7f1d1d'], // Valorant Red -> Dark Red
    industry: ['#00f0ff', '#0e7490', '#164e63'], // Cyan -> Dark Cyan
    tech: ['#a855f7', '#7e22ce', '#581c87'], // Purple -> Dark Purple
    admin: ['#94a3b8', '#475569', '#334155']  // Slate -> Dark Slate
  };

  const palette = colors[node.data.role] || colors.admin;
  // Cycle colors based on depth or sibling index could be fancy, 
  // but let's stick to depth-based gradients for clarity.
  // Depth 0 (Root) -> handled separately
  // Depth 1 (Dept) -> Primary Color
  // Depth 2 (Branch) -> Slightly Darker
  // Depth 3 (Leaf) -> Darkest
  const colorIndex = Math.min(Math.max(node.depth - 1, 0), palette.length - 1);
  node.color = node.depth === 0 ? '#111111' : palette[colorIndex];

  const totalValue = node.children.reduce((sum, c) => sum + calculateValues(c.data), 0);
  let currentAngle = startAngle;

  node.children.forEach(child => {
    const childValue = calculateValues(child.data);
    const childAngleRange = (endAngle - startAngle) * (childValue / totalValue);
    computeSunburst(child, currentAngle, currentAngle + childAngleRange, node.outerRadius! + 4, radiusStep); // +4px gap
    currentAngle += childAngleRange;
  });
};

// 4. SVG Arc Generator
const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const rad = (angleDeg - 90) * Math.PI / 180.0;
  return { x: cx + (r * Math.cos(rad)), y: cy + (r * Math.sin(rad)) };
};

const describeArc = (x: number, y: number, rInner: number, rOuter: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, rOuter, endAngle);
  const end = polarToCartesian(x, y, rOuter, startAngle);
  const startIn = polarToCartesian(x, y, rInner, endAngle);
  const endIn = polarToCartesian(x, y, rInner, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", rOuter, rOuter, 0, largeArc, 0, end.x, end.y,
    "L", endIn.x, endIn.y,
    "A", rInner, rInner, 0, largeArc, 1, startIn.x, startIn.y,
    "Z"
  ].join(" ");
};

// --- Main Component ---

const DefenceNetwork = () => {
  // Navigation State
  const [rootId, setRootId] = useState<string>('mod');
  const [hoveredNode, setHoveredNode] = useState<RawNode | null>(null);

  // Helper to find node by ID in raw data
  const findNode = (id: string, node: RawNode): RawNode | null => {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findNode(id, child);
        if (found) return found;
      }
    }
    return null;
  };

  const currentRoot = useMemo(() => findNode(rootId, RAW_DATA) || RAW_DATA, [rootId]);
  
  // Layout Calculation
  const { paths, maxDepth } = useMemo(() => {
    const root = buildHierarchy(currentRoot);
    // Layout Config
    // If root is MoD, we have more layers. If root is deeper, fewer layers.
    const baseRadius = 140; 
    const ringWidth = 100;
    
    computeSunburst(root, 0, 360, baseRadius, ringWidth);

    const flatPaths: any[] = [];
    const traverse = (n: LayoutNode) => {
      if (n.depth > 0) { // Don't draw root as an arc, it's the center circle
        const path = describeArc(0, 0, n.innerRadius!, n.outerRadius!, n.startAngle!, n.endAngle!);
        
        // Text Placement
        const midAngle = n.startAngle! + (n.endAngle! - n.startAngle!) / 2;
        const rText = n.innerRadius! + (n.outerRadius! - n.innerRadius!) / 2;
        const pos = polarToCartesian(0, 0, rText, midAngle);
        
        let rotation = midAngle - 90;
        let isFlipped = false;
        if (midAngle > 180) {
          rotation += 180;
          isFlipped = true;
        }

        flatPaths.push({
          id: n.id,
          data: n.data,
          path,
          color: n.color,
          x: pos.x,
          y: pos.y,
          rotation,
          isFlipped,
          depth: n.depth
        });
      }
      n.children.forEach(traverse);
    };
    traverse(root);
    return { paths: flatPaths, maxDepth: 3 };
  }, [currentRoot]);

  // Display Logic
  const activeData = hoveredNode || currentRoot;
  const isRoot = rootId === 'mod';

  return (
    <div className="w-full h-screen bg-[#09090b] text-white font-mono overflow-hidden flex relative selection:bg-[#ff4655]/30">
      
      {/* --- BACKGROUND GRID --- */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ 
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }}
      />
      
      {/* --- LEFT: CONTROL PANEL / BREADCRUMBS --- */}
      <div className="w-80 h-full bg-black/40 backdrop-blur-md border-r border-zinc-800 p-6 flex flex-col z-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#ff4655] mb-2">
            <Crosshair size={20} />
            <h1 className="text-xl font-black tracking-widest">TACTICAL_MAP</h1>
          </div>
          <p className="text-xs text-zinc-500">DEFENCE SECTOR HIERARCHY V2.4</p>
        </div>

        {/* Back Button */}
        {!isRoot && (
          <button 
            onClick={() => setRootId('mod')}
            className="mb-6 flex items-center gap-2 px-4 py-3 bg-zinc-900 border border-zinc-700 hover:border-[#ff4655] hover:text-[#ff4655] transition-all group rounded-sm"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase">Return to MoD</span>
          </button>
        )}

        {/* Target Info Panel */}
        <div className="flex-1 overflow-y-auto">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 border-b border-zinc-800 pb-1">
            Target Intel
          </div>
          
          <h2 className={`text-2xl font-bold mb-1 ${
            activeData.role === 'forces' ? 'text-[#ff4655]' :
            activeData.role === 'industry' ? 'text-[#00f0ff]' :
            activeData.role === 'tech' ? 'text-[#a855f7]' : 'text-zinc-200'
          }`}>
            {activeData.label}
          </h2>
          
          <div className="text-xs text-zinc-400 mb-6 min-h-[40px]">
            {activeData.description || "Sector analysis available."}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4">
             {activeData.budget && (
               <div className="bg-zinc-900/50 p-3 border-l-2 border-[#ff4655]">
                 <div className="text-[10px] text-zinc-500 uppercase">Est. Budget</div>
                 <div className="text-lg font-mono text-white">{activeData.budget}</div>
               </div>
             )}
             
             {/* Stock Tickers */}
             {activeData.stocks && activeData.stocks.length > 0 && (
               <div className="bg-zinc-900/50 p-3 border-l-2 border-[#00f0ff]">
                 <div className="text-[10px] text-zinc-500 uppercase mb-2 flex items-center gap-2">
                   <Activity size={12} /> Listed Assets
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {activeData.stocks.map(ticker => (
                     <span key={ticker} className="px-2 py-1 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 text-[10px] font-bold rounded-sm">
                       {ticker}
                     </span>
                   ))}
                 </div>
               </div>
             )}
          </div>
        </div>

        {/* Decorative Footer */}
        <div className="mt-auto pt-4 border-t border-zinc-800 text-[10px] text-zinc-600 flex justify-between">
            <span>SECURE_CONN</span>
            <span className="animate-pulse text-green-500">● LIVE</span>
        </div>
      </div>

      {/* --- RIGHT: VISUALIZATION --- */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden cursor-crosshair">
        
        {/* Animated Rings around visualization */}
        <div className="absolute w-[800px] h-[800px] border border-dashed border-zinc-800 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none opacity-50" />
        <div className="absolute w-[600px] h-[600px] border border-zinc-800 rounded-full pointer-events-none opacity-30" />

        <svg 
          viewBox="-500 -500 1000 1000" 
          className="w-full h-full max-w-[1200px] max-h-[1200px] animate-in zoom-in-95 duration-700"
        >
          {/* Drop Shadow Filter */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
               <feGaussianBlur stdDeviation="3" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* --- CENTER CORE (The Sun) --- */}
          <g 
            onClick={() => !isRoot && setRootId('mod')}
            className={`transition-all duration-300 ${!isRoot ? 'cursor-pointer hover:opacity-80' : ''}`}
          >
            <circle r={130} fill="#09090b" stroke={
              currentRoot.role === 'forces' ? '#ff4655' :
              currentRoot.role === 'industry' ? '#00f0ff' :
              currentRoot.role === 'tech' ? '#a855f7' : '#333'
            } strokeWidth="3" />
            
            {/* Core Label */}
            <foreignObject x="-100" y="-100" width="200" height="200">
               <div className="w-full h-full flex flex-col items-center justify-center text-center p-2">
                 <div className="mb-2 opacity-80">
                   {currentRoot.icon || <Target className="text-zinc-500" />}
                 </div>
                 <div className="text-sm font-bold text-white tracking-widest uppercase">
                   {hoveredNode ? hoveredNode.label : currentRoot.label}
                 </div>
                 <div className={`text-xs mt-1 font-mono ${
                   (hoveredNode || currentRoot).role === 'forces' ? 'text-[#ff4655]' :
                   (hoveredNode || currentRoot).role === 'industry' ? 'text-[#00f0ff]' : 'text-zinc-400'
                 }`}>
                    {hoveredNode?.budget || currentRoot.budget || '---'}
                 </div>
               </div>
            </foreignObject>
          </g>

          {/* --- SECTORS (Arcs) --- */}
          {paths.map((p) => (
            <g 
              key={p.id}
              onClick={(e) => {
                e.stopPropagation();
                // Drill down if it has children
                if (p.data.children && p.data.children.length > 0) {
                  setRootId(p.id);
                  setHoveredNode(null);
                }
              }}
              onMouseEnter={() => setHoveredNode(p.data)}
              onMouseLeave={() => setHoveredNode(null)}
              className="group cursor-pointer transition-all duration-300"
              style={{ transformOrigin: '0 0' }}
            >
              <path 
                d={p.path} 
                fill={p.color} 
                stroke="#09090b" 
                strokeWidth="2"
                className="opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-transform origin-center"
              />
              
              {/* Labels (Only show if arc is large enough) */}
              {Math.abs(p.data.value || 1) > 0 && (
                <text
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={p.depth === 1 ? '#000' : '#fff'} // Contrast text for bright inner ring
                  fontSize={p.depth === 1 ? 11 : 10}
                  fontWeight="bold"
                  transform={`rotate(${p.rotation}, ${p.x}, ${p.y})`}
                  className="pointer-events-none select-none uppercase tracking-tighter"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {p.data.label.length > 14 && p.depth > 1 ? p.data.label.substring(0, 12) + '..' : p.data.label}
                </text>
              )}
            </g>
          ))}

          {/* Overlay Effects */}
          <circle r="480" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
        </svg>

        {/* --- Floating HUD Elements --- */}
        <div className="absolute top-8 right-8 flex gap-4">
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#ff4655] rounded-sm"></div>
             <span className="text-[10px] text-zinc-400 uppercase">Forces</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#00f0ff] rounded-sm"></div>
             <span className="text-[10px] text-zinc-400 uppercase">Industry</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#a855f7] rounded-sm"></div>
             <span className="text-[10px] text-zinc-400 uppercase">Tech</span>
           </div>
        </div>

      </div>
    </div>
  );
};

export default DefenceNetwork;