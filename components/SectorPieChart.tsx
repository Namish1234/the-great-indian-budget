"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

const data = [
  { name: 'Defence', value: 180000, color: '#10b981' }, // Emerald
  { name: 'Railways', value: 265000, color: '#3b82f6' }, // Blue
  { name: 'Roads', value: 332325, color: '#f59e0b' },    // Amber
  { name: 'Rural', value: 180000, color: '#ef4444' },    // Red
  { name: 'Telecom', value: 109636, color: '#8b5cf6' },  // Purple
  { name: 'Health', value: 119435, color: '#ec4899' },   // Pink
];

const SectorPieChart = () => {
  return (
    <div className="bg-black border border-gray-800 p-6 h-full flex flex-col min-h-[350px]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-valorant text-xl text-white tracking-wide flex items-center gap-2">
            <PieIcon size={20} className="text-rose-500" />
            Capex Split
          </h3>
          <p className="text-xs text-gray-500 font-mono mt-1">MAJOR SECTOR ALLOCATION</p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60} // Donut style
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
              stroke="rgba(0,0,0,0)"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#000" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip 
                contentStyle={{
                    backgroundColor: '#0a0a0a', 
                    border: '1px solid #333', 
                    color: '#fff', 
                    fontFamily: 'JetBrains Mono', 
                    fontSize: '12px'
                }}
                itemStyle={{color: '#fff'}}
                formatter={(value: number) => [`₹ ${(value/100000).toFixed(2)} LC`, 'Allocation']}
            />
            <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ 
                    fontSize: '10px', 
                    fontFamily: 'JetBrains Mono', 
                    paddingTop: '20px',
                    opacity: 0.7 
                }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SectorPieChart;