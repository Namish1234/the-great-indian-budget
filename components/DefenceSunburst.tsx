"use client";
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { 
  Shield, Crosshair, Maximize2, X, Plus, Minus, Move, MousePointer2, Info, Target, PieChart, TrendingUp
} from 'lucide-react';

// --- TYPES ---
type NodeType = 'root' | 'dept' | 'branch' | 'leaf';
type RoleType = 'forces' | 'industry' | 'tech' | 'admin' | 'core' | 'welfare';

interface RawNode {
  id: string;
  label: string;
  type: NodeType;
  role: RoleType;
  budget?: string;
  stocks?: string[];
  description?: string;
  children?: RawNode[];
  value?: number;
}

interface LayoutNode {
  id: string;
  data: RawNode;
  depth: number;
  children: LayoutNode[];
  parent?: LayoutNode;
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  color?: string;
}

// --- DATA: The Official MoD Hierarchy ---
const DEFENCE_HIERARCHY: RawNode = {
  id: 'mod',
  label: 'MINISTRY OF DEFENCE',
  type: 'root',
  role: 'core',
  budget: '₹ 6.21 Lakh Cr',
  description: 'Supreme Command Authority',
  children: [
    {
      id: 'dma', label: 'DMA (FORCES)', type: 'dept', role: 'forces',
      description: 'Dept. of Military Affairs - Operational Command',
      children: [
        { id: 'army', label: 'ARMY', type: 'branch', role: 'forces', children: [{ id: 'inf', label: 'Infantry', type: 'leaf', role: 'forces' }, { id: 'art', label: 'Artillery', type: 'leaf', role: 'forces' }] },
        { id: 'navy', label: 'NAVY', type: 'branch', role: 'forces', children: [{ id: 'wnc', label: 'Western Cmd', type: 'leaf', role: 'forces' }, { id: 'sub', label: 'Submarines', type: 'leaf', role: 'forces' }] },
        { id: 'iaf', label: 'AIR FORCE', type: 'branch', role: 'forces', children: [{ id: 'wac', label: 'Western Air', type: 'leaf', role: 'forces' }, { id: 'tc', label: 'Training', type: 'leaf', role: 'forces' }] },
        { id: 'ids', label: 'IDS (JOINT)', type: 'branch', role: 'forces', children: [{ id: 'cyber', label: 'Cyber Agency', type: 'leaf', role: 'forces' }, { id: 'space', label: 'Space Agency', type: 'leaf', role: 'forces' }] }
      ]
    },
    {
      id: 'ddp', label: 'DDP (INDUSTRY)', type: 'dept', role: 'industry',
      description: 'Dept. of Defence Production - PSUs & Exports',
      children: [
        { id: 'aero', label: 'AEROSPACE', type: 'branch', role: 'industry', stocks: ['HAL'], children: [{ id: 'hal', label: 'HAL', type: 'leaf', role: 'industry' }] },
        { id: 'ship', label: 'SHIPYARDS', type: 'branch', role: 'industry', stocks: ['MAZDOCK'], children: [{ id: 'mdl', label: 'Mazagon', type: 'leaf', role: 'industry' }, { id: 'grse', label: 'GRSE', type: 'leaf', role: 'industry' }] },
        { id: 'missile', label: 'MISSILES', type: 'branch', role: 'industry', stocks: ['BDL'], children: [{ id: 'bdl', label: 'Bharat Dyn', type: 'leaf', role: 'industry' }] },
        { id: 'elec', label: 'ELECTRONICS', type: 'branch', role: 'industry', stocks: ['BEL'], children: [{ id: 'bel', label: 'BEL', type: 'leaf', role: 'industry' }] },
        { id: 'land', label: 'LAND SYS', type: 'branch', role: 'industry', stocks: ['BEML'], children: [{ id: 'beml', label: 'BEML', type: 'leaf', role: 'industry' }] }
      ]
    },
    {
      id: 'drdo', label: 'DDR&D (TECH)', type: 'dept', role: 'tech',
      description: 'R&D, Innovation & DRDO Labs',
      children: [
        { id: 'mss', label: 'STRATEGIC', type: 'branch', role: 'tech', children: [{ id: 'asl', label: 'ASL (Agni)', type: 'leaf', role: 'tech' }, { id: 'drdl', label: 'DRDL', type: 'leaf', role: 'tech' }] },
        { id: 'aero_rnd', label: 'AERO R&D', type: 'branch', role: 'tech', children: [{ id: 'ada', label: 'ADA (Tejas)', type: 'leaf', role: 'tech' }, { id: 'ade', label: 'ADE (Drones)', type: 'leaf', role: 'tech' }] },
        { id: 'naval_rnd', label: 'NAVAL SYS', type: 'branch', role: 'tech', children: [{ id: 'npol', label: 'NPOL (Sonar)', type: 'leaf', role: 'tech' }] },
        { id: 'ecs', label: 'ELECTRONICS', type: 'branch', role: 'tech', children: [{ id: 'lrde', label: 'LRDE (Radar)', type: 'leaf', role: 'tech' }] }
      ]
    },
    {
      id: 'dod', label: 'DoD (ADMIN)', type: 'dept', role: 'admin',
      description: 'Administration, Borders & Coast Guard',
      children: [
        { id: 'bro', label: 'BRO', type: 'branch', role: 'admin', children: [{ id: 'border', label: 'Border Infra', type: 'leaf', role: 'admin' }] },
        { id: 'icg', label: 'COAST GUARD', type: 'branch', role: 'admin', children: [{ id: 'maritime', label: 'Maritime Sec', type: 'leaf', role: 'admin' }] },
        { id: 'estates', label: 'ESTATES', type: 'branch', role: 'admin', children: [{ id: 'idas', label: 'IDAS (Accts)', type: 'leaf', role: 'admin' }] }
      ]
    },
    {
      id: 'desw', label: 'DESW (WELFARE)', type: 'dept', role: 'welfare',
      description: 'Dept of Ex-Servicemen Welfare',
      children: [
        { id: 'pen', label: 'PENSIONS', type: 'branch', role: 'welfare', children: [{ id: 'orop', label: 'OROP', type: 'leaf', role: 'welfare' }] },
        { id: 'echs', label: 'HEALTHCARE', type: 'branch', role: 'welfare', children: [{ id: 'poly', label: 'Polyclinics', type: 'leaf', role: 'welfare' }] }
      ]
    }
  ]
};

// --- ALGORITHMS ---
const calculateValues = (node: RawNode): number => {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((sum, c) => sum + calculateValues(c), 0);
};

const buildHierarchy = (raw: RawNode, depth: number = 0, parent?: LayoutNode): LayoutNode => {
  const node: LayoutNode = { id: raw.id, data: raw, depth, parent, children: [] };
  if (raw.children) node.children = raw.children.map(c => buildHierarchy(c, depth + 1, node));
  return node;
};

const computeSunburst = (
  node: LayoutNode, 
  startAngle: number, 
  endAngle: number, 
  radiusMap: number[]
) => {
  node.startAngle = startAngle;
  node.endAngle = endAngle;
  
  const innerR = radiusMap[node.depth] || 0;
  const outerR = (radiusMap[node.depth + 1] || radiusMap[radiusMap.length - 1]) - 2;

  node.innerRadius = innerR;
  node.outerRadius = outerR;

  // --- Valorant Color Logic (Updated) ---
  const colors: Record<RoleType, string[]> = {
    // Core: Bright White/Silver for high contrast center
    core:    ['#ffffff', '#e5e5e5'], 
    // Forces: Valorant Red scale
    forces:  ['#ff4655', '#dc3d4b', '#b9333f'], 
    // Industry: Cyan/Teal for tech/manufacturing feel
    industry:['#00f0ff', '#00bcd4', '#0097a7'], 
    // Tech: Deep Purple/Violet for R&D
    tech:    ['#7c3aed', '#6d28d9', '#5b21b6'], 
    // Admin: Neutral Slate/Gray
    admin:   ['#64748b', '#475569', '#334155'], 
    // Welfare: Muted Pink/Rose
    welfare: ['#ec4899', '#db2777', '#be185d']  
  };

  const palette = colors[node.data.role] || colors.admin;
  
  if (node.depth === 0) {
    node.color = '#FFFFFF'; 
  } else {
    // Gradient: Deepen color as we go out
    const colorIndex = Math.min(Math.max(node.depth - 1, 0), palette.length - 1);
    node.color = palette[colorIndex];
  }

  const totalValue = node.children.reduce((sum, c) => sum + calculateValues(c.data), 0);
  let currentAngle = startAngle;

  node.children.forEach(child => {
    const childValue = calculateValues(child.data);
    const childAngleRange = (endAngle - startAngle) * (childValue / totalValue);
    computeSunburst(child, currentAngle, currentAngle + childAngleRange, radiusMap);
    currentAngle += childAngleRange;
  });
};

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

// --- MAIN COMPONENT ---
export default function DefenceSunburst() {
  const [selectedNode, setSelectedNode] = useState<RawNode | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [viewState, setViewState] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  // Use the full hierarchy constantly
  const currentRoot = DEFENCE_HIERARCHY;
  const activeData = selectedNode || currentRoot;

  // --- LAYOUT GENERATION ---
  const { paths } = useMemo(() => {
    const root = buildHierarchy(currentRoot);
    // Radius Rings: Core(0-80), L1(80-200), L2(200-320), L3(320-440)
    const radiusMap = [0, 80, 200, 320, 440];
    
    computeSunburst(root, 0, 360, radiusMap);

    const flatPaths: any[] = [];
    const traverse = (n: LayoutNode) => {
      // Always render all rings, we just clip them visually in preview
      if (n.depth > 0) { 
        const path = describeArc(0, 0, n.innerRadius!, n.outerRadius!, n.startAngle!, n.endAngle!);
        const midAngle = n.startAngle! + (n.endAngle! - n.startAngle!) / 2;
        const rText = n.innerRadius! + (n.outerRadius! - n.innerRadius!) / 2;
        const pos = polarToCartesian(0, 0, rText, midAngle);
        
        let rotation = midAngle - 90;
        if (midAngle > 180) rotation += 180; 

        flatPaths.push({
          id: n.id, data: n.data, path, color: n.color,
          x: pos.x, y: pos.y, rotation, depth: n.depth
        });
      }
      n.children.forEach(traverse);
    };
    traverse(root);
    return { paths: flatPaths }; 
  }, []);

  // --- INTERACTION ---
  const handleWheel = (e: React.WheelEvent) => {
    if (!isFullScreen) return;
    const scaleAdjustment = -e.deltaY * 0.001;
    setViewState(prev => ({
      ...prev,
      scale: Math.min(Math.max(0.2, prev.scale + scaleAdjustment), 4)
    }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isFullScreen) return;
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isFullScreen || !isDragging) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    setViewState(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);
  const resetView = () => setViewState({ x: 0, y: 0, scale: 1 });

  // --- RENDER ---
  const renderContent = (isModal: boolean) => {
    // PREVIEW: -300 to 300 (600px box). Shows more context around edges.
    // FULL: -500 to 500 (1000px box). Shows everything.
    const viewBox = isModal ? "-500 -500 1000 1000" : "-300 -300 600 600";

    return (
      <div 
        className={`w-full h-full relative overflow-hidden bg-[#0a0a0a] ${isModal ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer group'}`}
        onWheel={isModal ? handleWheel : undefined}
        onMouseDown={isModal ? handleMouseDown : undefined}
        onMouseMove={isModal ? handleMouseMove : undefined}
        onMouseUp={isModal ? handleMouseUp : undefined}
        onMouseLeave={isModal ? handleMouseUp : undefined}
        onClick={() => !isModal && setIsFullScreen(true)}
      >
         {/* PREVIEW MODE: VIGNETTE OVERLAY */}
         {!isModal && (
           <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,#0a0a0a_90%)]" />
         )}

         {/* FULL SCREEN: BACKGROUND GRID */}
         {isModal && (
           <div className="absolute inset-0 pointer-events-none opacity-20" 
                style={{ 
                  backgroundImage: `radial-gradient(#333 1px, transparent 1px)`, 
                  backgroundSize: '40px 40px',
                  transform: `translate(${viewState.x}px, ${viewState.y}px) scale(${viewState.scale})`,
                  transformOrigin: 'center'
                }} 
           />
         )}
         
         {/* HUD INFO (Left Top) */}
         <div className="absolute top-6 left-6 z-20 pointer-events-none">
            <div className="flex items-center gap-2 mb-1 text-rose-500">
               <Crosshair size={16} />
               <span className="font-valorant text-gray-400 tracking-widest text-xs">
                  {isModal ? "TACTICAL_MAP // EXPLORER" : "HIERARCHY // PREVIEW"}
               </span>
            </div>
            {!isModal && (
              <div className="mt-2 flex items-center gap-2 text-[10px] text-emerald-500 font-mono animate-pulse">
                <MousePointer2 size={12}/> CLICK TO EXPLORE
              </div>
            )}
         </div>

         {/* PREVIEW RIGHT SIDE INFO (Updated: Tactical Assessment) */}
         {!isModal && (
            <div className="absolute top-6 right-6 z-20 text-right pointer-events-none flex flex-col gap-6">
               {/* Sector Legend */}
               <div>
                  <div className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-widest">Sector Composition</div>
                  <div className="flex flex-col items-end gap-1.5">
                     {DEFENCE_HIERARCHY.children?.map((child) => (
                        <div key={child.id} className="flex items-center gap-2">
                           <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wide">{child.label.split(' ')[0]}</span>
                           <div className={`w-1.5 h-1.5 rounded-sm ${
                              child.role === 'forces' ? 'bg-[#ff4655]' : 
                              child.role === 'industry' ? 'bg-[#00f0ff]' : 
                              child.role === 'tech' ? 'bg-[#7c3aed]' : 
                              child.role === 'admin' ? 'bg-[#64748b]' : 'bg-[#ec4899]'
                           }`} />
                        </div>
                     ))}
                  </div>
               </div>

               {/* Tactical Assessment */}
               <div className="text-left"> 
                  <div className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-widest text-right">Tactical Assessment</div>
                  <div className="flex flex-col items-end gap-2">
                     <div className="flex gap-2 justify-end">
                        <div className="bg-emerald-500/10 border-r-2 border-emerald-500 pr-3 pl-2 py-1.5 text-right">
                           <div className="text-[9px] font-mono text-emerald-500 uppercase mb-0.5">Signal</div>
                           <div className="text-sm font-bold text-white leading-none font-valorant tracking-wide">OVERWEIGHT</div>
                        </div>
                        <div className="bg-zinc-800/50 border-r-2 border-zinc-500 pr-3 pl-2 py-1.5 text-right">
                           <div className="text-[9px] font-mono text-zinc-500 uppercase mb-0.5">Risk</div>
                           <div className="text-sm font-bold text-white leading-none font-valorant tracking-wide">MODERATE</div>
                        </div>
                     </div>
                     <p className="text-[10px] text-zinc-400 font-mono leading-relaxed max-w-[180px] text-right">
                        Capital Outlay increased to ₹1.72L Cr. Strong buy signal for Tier-1 OEMs.
                     </p>
                  </div>
               </div>
            </div>
         )}

         {/* INFO BOX (Right Side - Modal Only) */}
         {isModal && (
           <div className="absolute top-6 right-6 z-30 w-72 bg-black/80 backdrop-blur-md border border-zinc-800 p-4 animate-in slide-in-from-right-10 duration-300">
              <div className="flex items-start justify-between mb-4 pb-2 border-b border-zinc-800">
                 <div>
                    <h3 className={`font-valorant text-xl leading-none uppercase ${
                       activeData.role === 'forces' ? 'text-[#ff4655]' : 
                       activeData.role === 'industry' ? 'text-[#06b6d4]' : 
                       activeData.role === 'tech' ? 'text-[#a78bfa]' : 
                       activeData.role === 'core' ? 'text-[#fbbf24]' : 'text-slate-400'
                    }`}>
                       {activeData.label}
                    </h3>
                    <span className="text-[10px] font-mono text-gray-500 uppercase">{activeData.type} NODE</span>
                 </div>
                 <Target size={20} className="text-zinc-600"/>
              </div>
              
              <div className="space-y-4">
                 <div>
                    <div className="text-[10px] text-zinc-500 font-mono mb-1 uppercase">Mission Objective</div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                       {activeData.description || "Sector analysis unavailable. Restricted access."}
                    </p>
                 </div>

                 {activeData.budget && (
                    <div className="bg-zinc-900/50 p-2 border-l-2 border-rose-500">
                       <div className="text-[10px] text-zinc-500 uppercase">Est. Budget</div>
                       <div className="text-sm font-mono text-white">{activeData.budget}</div>
                    </div>
                 )}

                 {activeData.stocks && (
                    <div>
                       <div className="text-[10px] text-zinc-500 font-mono mb-2 uppercase">Key Assets</div>
                       <div className="flex flex-wrap gap-2">
                          {activeData.stocks.map(s => (
                             <span key={s} className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-[10px] text-emerald-400 font-mono rounded-sm">
                                {s}
                             </span>
                          ))}
                       </div>
                    </div>
                 )}
              </div>
           </div>
         )}

         {/* SVG LAYER */}
         <svg 
            viewBox={viewBox} 
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full transition-all duration-500"
         >
            <g transform={isModal ? `translate(${viewState.x}, ${viewState.y}) scale(${viewState.scale})` : ''}>
              
              {/* Central Core (MoD) */}
              <g 
                onClick={(e) => { 
                   e.stopPropagation(); 
                   if (!isModal) {
                      setIsFullScreen(true);
                   } else {
                      setSelectedNode(DEFENCE_HIERARCHY); 
                   }
                }}
                className="cursor-pointer"
              >
                 <circle r={75} fill="#000" stroke={activeData.role === 'core' ? '#fbbf24' : '#333'} strokeWidth="3" />
                 <foreignObject x={-50} y={-50} width={100} height={100}>
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-1 pointer-events-none">
                       <Shield size={24} className="text-[#fbbf24] mb-1"/>
                       <div className="font-bold text-white uppercase leading-tight text-[10px]">MoD</div>
                    </div>
                 </foreignObject>
              </g>

              {/* Sunburst Arcs */}
              {paths.map((p) => (
                 <g key={p.id} 
                    onClick={(e) => { 
                       e.stopPropagation(); 
                       if (!isModal) {
                          setIsFullScreen(true);
                       } else {
                          setSelectedNode(p.data); 
                       }
                    }}
                    className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
                 >
                    <path d={p.path} fill={p.color} stroke="#09090b" strokeWidth="1.5" />
                    {/* Show labels if arc is large enough or zoomed in */}
                    {(Math.abs(p.data.value || 1) > 0) && (
                       <text
                          x={p.x} y={p.y}
                          textAnchor="middle" dominantBaseline="middle"
                          fill={p.depth === 1 ? '#000' : '#fff'}
                          fontSize={p.depth === 1 ? 14 : 10} 
                          fontWeight="bold"
                          transform={`rotate(${p.rotation}, ${p.x}, ${p.y})`}
                          className="pointer-events-none select-none uppercase tracking-tighter"
                          style={{ textShadow: p.depth > 1 ? '0 1px 2px rgba(0,0,0,0.8)' : 'none' }}
                       >
                          {/* Truncate text logic */}
                          {p.data.label.length > 14 && p.depth > 1 
                            ? p.data.label.substring(0, 12) + '..' 
                            : p.data.label}
                       </text>
                    )}
                 </g>
              ))}
            </g>
         </svg>

         {/* CONTROLS (Full Screen Only) */}
         {isModal && (
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black/80 border border-gray-800 p-2 rounded-full z-20 backdrop-blur-sm">
              <button onClick={() => setViewState(s => ({...s, scale: s.scale - 0.2}))} className="p-2 hover:bg-zinc-800 text-white rounded-full transition-colors"><Minus size={16}/></button>
              <button onClick={resetView} className="p-2 hover:bg-zinc-800 text-white rounded-full transition-colors"><Move size={16}/></button>
              <button onClick={() => setViewState(s => ({...s, scale: s.scale + 0.2}))} className="p-2 hover:bg-zinc-800 text-white rounded-full transition-colors"><Plus size={16}/></button>
              <div className="w-px h-6 bg-zinc-700 mx-1"></div>
              <button onClick={() => setIsFullScreen(false)} className="p-2 hover:bg-rose-900/50 text-rose-500 rounded-full transition-colors"><X size={16}/></button>
           </div>
         )}
      </div>
    );
  };

  if (isFullScreen) {
     return (
        <div className="fixed inset-0 z-[100] bg-black animate-in fade-in zoom-in-95 duration-200">
           {renderContent(true)}
        </div>
     );
  }

  return (
    <div className="w-full h-full min-h-[320px] border border-gray-800 bg-[#0a0a0a]">
       {renderContent(false)}
    </div>
  );
}