"use client";
import React, { useState, useMemo } from 'react';
import { moneyFlowData } from '../data/budgetData';
import { ArrowRightLeft, Layers } from 'lucide-react';

const MoneyFlow = () => {
  // --- 1. CONFIGURATION ---
  const width = 1000;
  const height = 500;
  const paddingX = 200; 
  const centerWidth = 4; 
  const spineX = width / 2;
  const THRESHOLD = 5.0; 

  // --- 2. DATA PROCESSING ---
  const processedData = useMemo(() => {
    const groupItems = (items: typeof moneyFlowData.links, type: 'inflow' | 'outflow') => {
      const mainBranches: any[] = [];
      let subBranchValue = 0;
      const subBranchItems: string[] = [];

      items.forEach(item => {
        if (item.value >= THRESHOLD) {
          mainBranches.push({
            ...item,
            name: type === 'inflow' ? moneyFlowData.nodes[item.source].name : moneyFlowData.nodes[item.target].name,
            isSubBranch: false
          });
        } else {
          subBranchValue += item.value;
          const name = type === 'inflow' ? moneyFlowData.nodes[item.source].name : moneyFlowData.nodes[item.target].name;
          subBranchItems.push(name);
        }
      });

      if (subBranchValue > 0) {
        mainBranches.push({
          value: subBranchValue,
          name: "Other " + (type === 'inflow' ? "Receipts" : "Exp"),
          type: type,
          isSubBranch: true,
          details: subBranchItems.join(', ')
        });
      }
      return mainBranches.sort((a, b) => b.value - a.value);
    };

    const inflows = groupItems(moneyFlowData.links.filter(l => l.type === 'inflow'), 'inflow');
    const outflows = groupItems(moneyFlowData.links.filter(l => l.type === 'outflow'), 'outflow');
    const totalFlow = inflows.reduce((acc, curr) => acc + curr.value, 0);

    return { inflows, outflows, totalFlow };
  }, []);

  // --- 3. LAYOUT CALCULATION ---
  
  // FIX 1: Increased scale to 80% (0.8) so it fills more space without being "bulky"
  const scale = (height * 0.8) / processedData.totalFlow;
  
  // FIX 2: Anchored to TOP (20px) instead of Center. This removes the header gap.
  const startY = 20; 

  let currentLeftY = startY;
  let currentRightY = startY;
  let currentCenterY = startY;

  // Inflow Paths
  const inflowPaths = processedData.inflows.map((item, i) => {
    const barHeight = item.value * scale;
    // Sigmoid Curve Logic
    const path = `
      M ${paddingX} ${currentLeftY}
      C ${paddingX + 250} ${currentLeftY}, ${spineX - 250} ${currentCenterY}, ${spineX} ${currentCenterY}
      L ${spineX} ${currentCenterY + barHeight}
      C ${spineX - 250} ${currentCenterY + barHeight}, ${paddingX + 250} ${currentLeftY + barHeight}, ${paddingX} ${currentLeftY + barHeight}
      Z
    `;
    const labelY = currentLeftY + barHeight / 2;
    currentLeftY += barHeight + (item.isSubBranch ? 25 : 8); 
    currentCenterY += barHeight; 

    return { ...item, path, labelY, id: `in-${i}` };
  });

  currentCenterY = startY; // Reset for right side

  // Outflow Paths
  const outflowPaths = processedData.outflows.map((item, i) => {
    const barHeight = item.value * scale;
    const path = `
      M ${spineX} ${currentCenterY}
      C ${spineX + 250} ${currentCenterY}, ${width - paddingX - 250} ${currentRightY}, ${width - paddingX} ${currentRightY}
      L ${width - paddingX} ${currentRightY + barHeight}
      C ${width - paddingX - 250} ${currentRightY + barHeight}, ${spineX + 250} ${currentCenterY + barHeight}, ${spineX} ${currentCenterY + barHeight}
      Z
    `;
    const labelY = currentRightY + barHeight / 2;
    currentRightY += barHeight + (item.isSubBranch ? 25 : 8);
    currentCenterY += barHeight;

    return { ...item, path, labelY, id: `out-${i}` };
  });

  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="bg-black border border-gray-800 p-6 h-full flex flex-col min-h-[450px]">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div>
           <h3 className="font-valorant text-xl text-white tracking-wide flex items-center gap-2">
            <ArrowRightLeft size={20} className="text-rose-500" />
            The Money Flow
          </h3>
          <p className="text-xs text-gray-500 font-mono mt-1">
             <span className="text-emerald-500">INCOME</span> vs <span className="text-rose-500">EXPENSE</span> • FY 2025-26
          </p>
        </div>
        <div className="hidden md:flex flex-col items-end opacity-70">
           <div className="text-[10px] font-mono text-gray-600 flex items-center gap-1">
              <Layers size={10} /> THRESHOLD: ₹{THRESHOLD} Lakh Cr
           </div>
           <div className="text-[10px] font-mono text-gray-700">Smaller items grouped into sub-branches</div>
        </div>
      </div>

      {/* CHART */}
      <div className="flex-1 w-full h-full">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="grad-in" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.1"/>
              <stop offset="30%" stopColor="#10b981" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#059669" stopOpacity="1"/>
            </linearGradient>
            <linearGradient id="grad-out" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#be123c" stopOpacity="1"/>
              <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.1"/>
            </linearGradient>
            <linearGradient id="grad-sub" x1="0" y1="0" x2="1" y2="0">
               <stop offset="0%" stopColor="#eab308" stopOpacity="0.6"/>
               <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.9"/>
            </linearGradient>
          </defs>

          {/* Spine */}
          <rect 
            x={spineX - centerWidth/2} 
            y={startY} 
            width={centerWidth} 
            height={processedData.totalFlow * scale} 
            fill="#333" 
            rx={2}
          />

          {/* Inflows */}
          {inflowPaths.map((item) => (
            <g 
              key={item.id} 
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer transition-all duration-500"
              style={{ opacity: hovered && hovered !== item.id ? 0.2 : 1 }}
            >
              <path d={item.path} fill={item.isSubBranch ? "url(#grad-sub)" : "url(#grad-in)"} stroke={hovered === item.id ? "#fff" : "none"} strokeWidth={0.5} />
              <line x1={paddingX - 10} y1={item.labelY} x2={paddingX} y2={item.labelY} stroke={item.isSubBranch ? "#eab308" : "#10b981"} strokeWidth={1} />
              <text x={paddingX - 15} y={item.labelY - 5} fill={item.isSubBranch ? "#fbbf24" : "#e5e7eb"} fontSize={item.isSubBranch ? "11" : "13"} fontFamily="JetBrains Mono" textAnchor="end" fontWeight={item.isSubBranch ? 400 : 600}>{item.name}</text>
              <text x={paddingX - 15} y={item.labelY + 8} fill={item.isSubBranch ? "#d97706" : "#10b981"} fontSize="10" fontFamily="JetBrains Mono" textAnchor="end">₹{item.value.toFixed(2)} LC</text>
              {item.isSubBranch && hovered === item.id && ( <text x={paddingX} y={item.labelY + 25} fill="#6b7280" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Includes: {item.details}</text>)}
            </g>
          ))}

          {/* Outflows */}
          {outflowPaths.map((item) => (
            <g 
              key={item.id} 
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer transition-all duration-500"
              style={{ opacity: hovered && hovered !== item.id ? 0.2 : 1 }}
            >
              <path d={item.path} fill={item.isSubBranch ? "url(#grad-sub)" : "url(#grad-out)"} stroke={hovered === item.id ? "#fff" : "none"} strokeWidth={0.5} />
              <line x1={width - paddingX} y1={item.labelY} x2={width - paddingX + 10} y2={item.labelY} stroke={item.isSubBranch ? "#eab308" : "#f43f5e"} strokeWidth={1} />
              <text x={width - paddingX + 15} y={item.labelY - 5} fill={item.isSubBranch ? "#fbbf24" : "#e5e7eb"} fontSize={item.isSubBranch ? "11" : "13"} fontFamily="JetBrains Mono" textAnchor="start" fontWeight={item.isSubBranch ? 400 : 600}>{item.name}</text>
              <text x={width - paddingX + 15} y={item.labelY + 8} fill={item.isSubBranch ? "#d97706" : "#f43f5e"} fontSize="10" fontFamily="JetBrains Mono" textAnchor="start">₹{item.value.toFixed(2)} LC</text>
               {item.isSubBranch && hovered === item.id && (<text x={width - paddingX} y={item.labelY + 25} fill="#6b7280" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Includes: {item.details}</text>)}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default MoneyFlow;