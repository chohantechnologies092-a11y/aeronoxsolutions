"use client";

import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts';

const data = [
  { name: 'Mon', views: 400 },
  { name: 'Tue', views: 300 },
  { name: 'Wed', views: 550 },
  { name: 'Thu', views: 450 },
  { name: 'Fri', views: 700 },
  { name: 'Sat', views: 650 },
  { name: 'Sun', views: 900 },
];

export function DashboardChart() {
  return (
    <div className="h-[200px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorViewsSm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00c2ff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00c2ff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1b1223', borderColor: '#ffffff20', borderRadius: '8px', fontSize: '12px' }}
            itemStyle={{ color: '#fff' }}
          />
          <XAxis dataKey="name" hide />
          <Area type="monotone" dataKey="views" stroke="#00c2ff" strokeWidth={2} fillOpacity={1} fill="url(#colorViewsSm)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
