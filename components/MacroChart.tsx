"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

const MacroChart = () => {
  // Data from Budget at a Glance (Deficit Trends)
  const chartData = [
    { year: 'FY24 (A)', revenue: 27.29, expense: 44.43, deficit: 16.54 },
    { year: 'FY25 (BE)', revenue: 31.29, expense: 48.20, deficit: 16.13 },
    { year: 'FY25 (RE)', revenue: 30.87, expense: 47.16, deficit: 15.69 },
    { year: 'FY26 (BE)', revenue: 34.20, expense: 50.65, deficit: 15.68 },
  ];

  return (
    <div className="bg-black border border-gray-800 p-6 relative overflow-hidden h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-valorant text-xl text-white tracking-wide flex items-center gap-2">
            <BarChart3 size={20} className="text-rose-500" />
            Macro Fiscal Trends
          </h3>
          <p className="text-xs text-gray-500 font-mono mt-1">VALUES IN LAKH CRORE (₹)</p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[200px]">
         <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="year" tick={{fill: '#666', fontSize: 10, fontFamily: 'JetBrains Mono'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: '#666', fontSize: 10, fontFamily: 'JetBrains Mono'}} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{
                    backgroundColor: '#0a0a0a', 
                    border: '1px solid #333', 
                    color: '#fff',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px'
                }}
                itemStyle={{color: '#fff'}}
              />
              <Bar dataKey="revenue" name="Receipts" fill="#10b981" radius={[2, 2, 0, 0]} barSize={40} />
              <Bar dataKey="expense" name="Expenditure" fill="#e5e7eb" radius={[2, 2, 0, 0]} barSize={40} />
              <Bar dataKey="deficit" name="Fiscal Deficit" fill="#f43f5e" radius={[2, 2, 0, 0]} barSize={40} />
            </BarChart>
         </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MacroChart;