"use client";

import { BarChart3, TrendingUp, Users, MousePointerClick, ArrowUpRight, Filter } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { useTheme } from "next-themes";
import { useState, useMemo, useEffect } from "react";

type AnalyticsEvent = {
  id: string;
  path: string;
  referrer: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  timestamp: string;
};

export function AnalyticsDashboardClient({ initialEvents }: { initialEvents: AnalyticsEvent[] }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "all">("7d");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter events based on selected time range
  const filteredEvents = useMemo(() => {
    if (timeRange === "all") return initialEvents;

    const now = new Date();
    const cutoff = new Date();

    if (timeRange === "24h") cutoff.setHours(now.getHours() - 24);
    if (timeRange === "7d") cutoff.setDate(now.getDate() - 7);
    if (timeRange === "30d") cutoff.setDate(now.getDate() - 30);

    return initialEvents.filter((ev) => new Date(ev.timestamp) >= cutoff);
  }, [initialEvents, timeRange]);

  // Aggregate Data for Charts
  const chartData = useMemo(() => {
    const dataMap = new Map<string, { date: string; views: number; uniqueIPs: Set<string> }>();

    filteredEvents.forEach((ev) => {
      const d = new Date(ev.timestamp);
      // Group by hour for 24h, else group by Day
      let key = "";
      let label = "";
      if (timeRange === "24h") {
        key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}`;
        label = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        label = d.toLocaleDateString([], { day: 'numeric', month: 'short' });
      }

      if (!dataMap.has(key)) {
        dataMap.set(key, { date: label, views: 0, uniqueIPs: new Set() });
      }
      const entry = dataMap.get(key)!;
      entry.views += 1;
      entry.uniqueIPs.add(ev.ip);
    });

    return Array.from(dataMap.values())
      .map(entry => ({ date: entry.date, views: entry.views, visitors: entry.uniqueIPs.size }))
      .reverse(); // assuming events are sorted newest first, so we reverse for chronological chart
  }, [filteredEvents, timeRange]);

  // Aggregate Top Locations
  const locationData = useMemo(() => {
    const locMap = new Map<string, number>();
    filteredEvents.forEach(ev => {
      const loc = ev.city !== "Unknown" ? `${ev.city}, ${ev.country}` : ev.country !== "Unknown" ? ev.country : "Unknown Region";
      locMap.set(loc, (locMap.get(loc) || 0) + 1);
    });
    
    return Array.from(locMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // top 5
  }, [filteredEvents]);

  // Calculate top-level stats
  const totalViews = filteredEvents.length;
  const uniqueVisitors = new Set(filteredEvents.map(e => e.ip)).size;
  // Mock CTR and Clicks for now since we don't track outbound clicks yet
  const totalClicks = Math.floor(totalViews * 0.15); 
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";

  const isDark = !mounted || theme === 'dark';
  const axisColor = isDark ? "#ffffff40" : "#00000040";
  const gridColor = isDark ? "#ffffff10" : "#00000010";
  const tooltipBg = isDark ? "#1b1223" : "#ffffff";
  const tooltipBorder = isDark ? "#ffffff20" : "#00000010";
  const tooltipText = isDark ? "#ffffff" : "#111827";

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-admin-text font-display">Analytics Overview</h1>
          <p className="text-sm text-admin-muted mt-1">Real-time geographical and traffic data</p>
        </div>
        
        {/* Time Filter */}
        <div className="flex items-center gap-2 bg-black/10 dark:bg-black/20 p-1.5 rounded-xl border border-admin-border">
          <Filter size={14} className="text-admin-muted ml-2" />
          {(["24h", "7d", "30d", "all"] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                timeRange === range 
                  ? "bg-accent text-[#24182e] shadow-sm" 
                  : "text-admin-muted hover:text-admin-text hover:bg-white/5"
              }`}
            >
              {range === "24h" ? "24h" : range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "All Time"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c2ff]/5 rounded-full blur-3xl group-hover:bg-cyan-500/20 dark:bg-[#00c2ff]/10 transition-colors"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-admin-muted text-sm font-medium">Total Page Views</h3>
            <div className="p-2 bg-cyan-500/20 dark:bg-[#00c2ff]/10 rounded-lg text-cyan-600 dark:text-[#00c2ff]">
              <BarChart3 size={18} />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold text-admin-text">{totalViews.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffbe00]/5 rounded-full blur-3xl group-hover:bg-[#ffbe00]/10 transition-colors"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-admin-muted text-sm font-medium">Unique Visitors (IPs)</h3>
            <div className="p-2 bg-[#ffbe00]/10 rounded-lg text-yellow-600 dark:text-[#ffbe00]">
              <Users size={18} />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold text-admin-text">{uniqueVisitors.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-admin-muted text-sm font-medium">Estimated Interactions</h3>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400">
              <MousePointerClick size={18} />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold text-admin-text">{totalClicks.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/20 dark:bg-emerald-500/10 transition-colors"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-admin-muted text-sm font-medium">Interaction Rate</h3>
            <div className="p-2 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight size={18} />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold text-admin-text">{ctr}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-admin-card p-6 rounded-2xl border border-admin-border">
          <h3 className="text-admin-text font-semibold mb-6">Traffic Over Time</h3>
          <div className="h-[300px] w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                  <Area type="monotone" name="Views" dataKey="views" stroke="#00c2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" name="Unique Visitors" dataKey="visitors" stroke="#ffbe00" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-admin-muted">
                No data available for this time period.
              </div>
            )}
          </div>
        </div>

        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border">
          <h3 className="text-admin-text font-semibold mb-6">Top Regions / Cities</h3>
          <div className="h-[300px] w-full">
            {locationData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                  <XAxis type="number" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} width={100} />
                  <Tooltip 
                    cursor={{fill: isDark ? '#ffffff05' : '#00000005'}}
                    contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }}
                    itemStyle={{ color: tooltipText }}
                  />
                  <Bar dataKey="value" name="Views" fill="#ffbe00" radius={[0, 4, 4, 0]} barSize={24}>
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? "#ffbe00" : index === 1 ? "#ffc933" : "#ffd466"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-admin-muted text-sm text-center">
                Waiting for traffic data...<br />(Try navigating the public site)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
