"use client";

import { BarChart3, TrendingUp, Users, MousePointerClick, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const trafficData = [
  { date: '1 Jul', views: 4000, visitors: 2400 },
  { date: '3 Jul', views: 3000, visitors: 1398 },
  { date: '5 Jul', views: 2000, visitors: 9800 },
  { date: '7 Jul', views: 2780, visitors: 3908 },
  { date: '9 Jul', views: 1890, visitors: 4800 },
  { date: '11 Jul', views: 2390, visitors: 3800 },
  { date: '13 Jul', views: 3490, visitors: 4300 },
  { date: '15 Jul', views: 4500, visitors: 3200 },
];

const sourceData = [
  { name: 'Direct', value: 4000 },
  { name: 'Social', value: 3000 },
  { name: 'Organic Search', value: 2000 },
  { name: 'Referral', value: 2780 },
];

export default function AnalyticsDashboard() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || theme === 'dark';
  const axisColor = isDark ? "#ffffff40" : "#00000040";
  const gridColor = isDark ? "#ffffff10" : "#00000010";
  const tooltipBg = isDark ? "#1b1223" : "#ffffff";
  const tooltipBorder = isDark ? "#ffffff20" : "#00000010";
  const tooltipText = isDark ? "#ffffff" : "#111827";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-text font-display">Analytics Overview</h1>
          <p className="text-sm text-admin-muted mt-1">Real-time mock traffic and conversion data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c2ff]/5 rounded-full blur-3xl group-hover:bg-cyan-500/20 dark:bg-[#00c2ff]/10 transition-colors"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-admin-muted text-sm font-medium">Total Views</h3>
            <div className="p-2 bg-cyan-500/20 dark:bg-[#00c2ff]/10 rounded-lg text-cyan-600 dark:text-[#00c2ff]">
              <BarChart3 size={18} />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold text-admin-text">24,058</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <TrendingUp size={12} /> +12.5% from last month
            </p>
          </div>
        </div>

        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffbe00]/5 rounded-full blur-3xl group-hover:bg-[#ffbe00]/10 transition-colors"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-admin-muted text-sm font-medium">Unique Visitors</h3>
            <div className="p-2 bg-[#ffbe00]/10 rounded-lg text-yellow-600 dark:text-[#ffbe00]">
              <Users size={18} />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold text-admin-text">12,234</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <TrendingUp size={12} /> +8.2% from last month
            </p>
          </div>
        </div>

        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-admin-muted text-sm font-medium">Total Clicks</h3>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400">
              <MousePointerClick size={18} />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold text-admin-text">3,456</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <TrendingUp size={12} /> +24.1% from last month
            </p>
          </div>
        </div>

        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/20 dark:bg-emerald-500/10 transition-colors"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-admin-muted text-sm font-medium">CTR</h3>
            <div className="p-2 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight size={18} />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold text-admin-text">4.2%</p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center gap-1">
              <TrendingUp size={12} className="rotate-180" /> -1.2% from last month
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-admin-card p-6 rounded-2xl border border-admin-border">
          <h3 className="text-admin-text font-semibold mb-6">Traffic Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00c2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00c2ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffbe00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ffbe00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }}
                  itemStyle={{ color: tooltipText }}
                />
                <Area type="monotone" dataKey="views" stroke="#00c2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="visitors" stroke="#ffbe00" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border">
          <h3 className="text-admin-text font-semibold mb-6">Traffic Sources</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                <XAxis type="number" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  cursor={{fill: isDark ? '#ffffff05' : '#00000005'}}
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }}
                  itemStyle={{ color: tooltipText }}
                />
                <Bar dataKey="value" fill="#ffbe00" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
