import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area,
} from 'recharts';
import { useInView } from '../hooks/useAnimations';
import './DataLab.css';

// Synthetic retail dataset
const rawData = [
  { month: 'Jan', region: 'North', category: 'Electronics', revenue: 42000, profit: 8400, units: 120 },
  { month: 'Jan', region: 'South', category: 'Electronics', revenue: 38000, profit: 7600, units: 105 },
  { month: 'Jan', region: 'East', category: 'Clothing', revenue: 28000, profit: 9800, units: 340 },
  { month: 'Jan', region: 'West', category: 'Clothing', revenue: 31000, profit: 10850, units: 370 },
  { month: 'Feb', region: 'North', category: 'Electronics', revenue: 45000, profit: 9000, units: 130 },
  { month: 'Feb', region: 'South', category: 'Home & Garden', revenue: 22000, profit: 6600, units: 180 },
  { month: 'Feb', region: 'East', category: 'Clothing', revenue: 30000, profit: 10500, units: 360 },
  { month: 'Feb', region: 'West', category: 'Food & Beverages', revenue: 18000, profit: 3600, units: 540 },
  { month: 'Mar', region: 'North', category: 'Electronics', revenue: 51000, profit: 10200, units: 145 },
  { month: 'Mar', region: 'South', category: 'Electronics', revenue: 44000, profit: 8800, units: 125 },
  { month: 'Mar', region: 'East', category: 'Home & Garden', revenue: 26000, profit: 7800, units: 200 },
  { month: 'Mar', region: 'West', category: 'Clothing', revenue: 35000, profit: 12250, units: 400 },
  { month: 'Apr', region: 'North', category: 'Food & Beverages', revenue: 20000, profit: 4000, units: 600 },
  { month: 'Apr', region: 'South', category: 'Clothing', revenue: 33000, profit: 11550, units: 390 },
  { month: 'Apr', region: 'East', category: 'Electronics', revenue: 47000, profit: 9400, units: 135 },
  { month: 'Apr', region: 'West', category: 'Home & Garden', revenue: 24000, profit: 7200, units: 190 },
  { month: 'May', region: 'North', category: 'Electronics', revenue: 55000, profit: 11000, units: 155 },
  { month: 'May', region: 'South', category: 'Food & Beverages', revenue: 21000, profit: 4200, units: 620 },
  { month: 'May', region: 'East', category: 'Clothing', revenue: 34000, profit: 11900, units: 410 },
  { month: 'May', region: 'West', category: 'Electronics', revenue: 48000, profit: 9600, units: 140 },
  { month: 'Jun', region: 'North', category: 'Clothing', revenue: 36000, profit: 12600, units: 430 },
  { month: 'Jun', region: 'South', category: 'Electronics', revenue: 50000, profit: 10000, units: 150 },
  { month: 'Jun', region: 'East', category: 'Home & Garden', revenue: 29000, profit: 8700, units: 220 },
  { month: 'Jun', region: 'West', category: 'Food & Beverages', revenue: 19000, profit: 3800, units: 560 },
];

const COLORS = ['#00E5FF', '#7C3AED', '#06D6A0', '#F59E0B'];
const regions = ['All', 'North', 'South', 'East', 'West'];
const categories = ['All', 'Electronics', 'Clothing', 'Home & Garden', 'Food & Beverages'];
const chartTypes = ['Revenue Trend', 'Category Breakdown', 'Profit Analysis', 'Regional Comparison'] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const tooltipStyle = {
  backgroundColor: '#10131A',
  border: '1px solid rgba(139, 149, 165, 0.15)',
  borderRadius: '8px',
  color: '#F5F7FA',
  fontSize: '0.8rem',
  fontFamily: 'JetBrains Mono, monospace',
};

export default function DataLab() {
  const { ref, inView } = useInView(0.05);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeChart, setActiveChart] = useState<typeof chartTypes[number]>('Revenue Trend');

  const filtered = useMemo(() => {
    return rawData.filter(d =>
      (selectedRegion === 'All' || d.region === selectedRegion) &&
      (selectedCategory === 'All' || d.category === selectedCategory)
    );
  }, [selectedRegion, selectedCategory]);

  // Aggregate by month for trends
  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => {
      const monthItems = filtered.filter(d => d.month === month);
      return {
        month,
        revenue: monthItems.reduce((s, d) => s + d.revenue, 0),
        profit: monthItems.reduce((s, d) => s + d.profit, 0),
        units: monthItems.reduce((s, d) => s + d.units, 0),
      };
    });
  }, [filtered]);

  // Category breakdown
  const categoryData = useMemo(() => {
    const cats = ['Electronics', 'Clothing', 'Home & Garden', 'Food & Beverages'];
    return cats.map(cat => ({
      name: cat,
      value: filtered.filter(d => d.category === cat).reduce((s, d) => s + d.revenue, 0),
    })).filter(d => d.value > 0);
  }, [filtered]);

  // Regional data
  const regionalData = useMemo(() => {
    const regs = ['North', 'South', 'East', 'West'];
    return regs.map(reg => ({
      region: reg,
      revenue: filtered.filter(d => d.region === reg).reduce((s, d) => s + d.revenue, 0),
      profit: filtered.filter(d => d.region === reg).reduce((s, d) => s + d.profit, 0),
    })).filter(d => d.revenue > 0);
  }, [filtered]);

  // Summary stats
  const stats = useMemo(() => ({
    totalRevenue: filtered.reduce((s, d) => s + d.revenue, 0),
    totalProfit: filtered.reduce((s, d) => s + d.profit, 0),
    totalUnits: filtered.reduce((s, d) => s + d.units, 0),
    avgMargin: filtered.length > 0
      ? ((filtered.reduce((s, d) => s + d.profit, 0) / filtered.reduce((s, d) => s + d.revenue, 0)) * 100).toFixed(1)
      : '0',
  }), [filtered]);

  return (
    <section id="datalab" className="section datalab" ref={ref}>
      <div className="section-divider" />
      <div className="container">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          04 / THE DATA LAB
        </motion.span>

        <motion.h2
          className="section-headline"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={1}
        >
          {"LET'S MAKE DATA MOVE."}
        </motion.h2>

        <motion.p
          className="datalab__subtitle"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={2}
        >
          Explore this interactive analytics demo built with a synthetic retail dataset.
          Filter by region and category to discover patterns.
          <span className="datalab__disclaimer font-mono"> · DATA IS SYNTHETIC</span>
        </motion.p>

        <motion.div
          className="datalab__workspace"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={3}
        >
          {/* Controls */}
          <div className="datalab__controls">
            <div className="datalab__filter">
              <label className="datalab__filter-label font-mono">REGION</label>
              <div className="datalab__filter-options">
                {regions.map(r => (
                  <button
                    key={r}
                    className={`datalab__filter-btn font-mono ${selectedRegion === r ? 'datalab__filter-btn--active' : ''}`}
                    onClick={() => setSelectedRegion(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="datalab__filter">
              <label className="datalab__filter-label font-mono">CATEGORY</label>
              <div className="datalab__filter-options">
                {categories.map(c => (
                  <button
                    key={c}
                    className={`datalab__filter-btn font-mono ${selectedCategory === c ? 'datalab__filter-btn--active' : ''}`}
                    onClick={() => setSelectedCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary stats */}
          <div className="datalab__stats">
            <div className="datalab__stat glass-card">
              <span className="datalab__stat-label font-mono">TOTAL REVENUE</span>
              <span className="datalab__stat-value font-heading">${(stats.totalRevenue / 1000).toFixed(0)}K</span>
            </div>
            <div className="datalab__stat glass-card">
              <span className="datalab__stat-label font-mono">TOTAL PROFIT</span>
              <span className="datalab__stat-value font-heading" style={{ color: '#06D6A0' }}>${(stats.totalProfit / 1000).toFixed(0)}K</span>
            </div>
            <div className="datalab__stat glass-card">
              <span className="datalab__stat-label font-mono">UNITS SOLD</span>
              <span className="datalab__stat-value font-heading">{stats.totalUnits.toLocaleString()}</span>
            </div>
            <div className="datalab__stat glass-card">
              <span className="datalab__stat-label font-mono">AVG MARGIN</span>
              <span className="datalab__stat-value font-heading" style={{ color: '#F59E0B' }}>{stats.avgMargin}%</span>
            </div>
          </div>

          {/* Chart type selector */}
          <div className="datalab__chart-tabs">
            {chartTypes.map(ct => (
              <button
                key={ct}
                className={`datalab__chart-tab font-mono ${activeChart === ct ? 'datalab__chart-tab--active' : ''}`}
                onClick={() => setActiveChart(ct)}
              >
                {ct}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="datalab__chart glass-card">
            {activeChart === 'Revenue Trend' && (
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 5, left: 10 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(139,149,165,0.08)" strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fill: '#5A6478', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#5A6478', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: any) => [`$${Number(value || 0).toLocaleString()}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#00E5FF" strokeWidth={2} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'Category Breakdown' && (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: any) => [`$${Number(value || 0).toLocaleString()}`, 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'Profit Analysis' && (
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 5, left: 10 }}>
                  <CartesianGrid stroke="rgba(139,149,165,0.08)" strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fill: '#5A6478', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#5A6478', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="revenue" stroke="#00E5FF" strokeWidth={2} dot={{ fill: '#00E5FF', r: 4 }} name="Revenue" />
                  <Line type="monotone" dataKey="profit" stroke="#06D6A0" strokeWidth={2} dot={{ fill: '#06D6A0', r: 4 }} name="Profit" />
                  <Legend wrapperStyle={{ color: '#8B95A5', fontSize: '0.8rem' }} />
                </LineChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'Regional Comparison' && (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={regionalData} margin={{ top: 20, right: 20, bottom: 5, left: 10 }}>
                  <CartesianGrid stroke="rgba(139,149,165,0.08)" strokeDasharray="3 3" />
                  <XAxis dataKey="region" tick={{ fill: '#5A6478', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#5A6478', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="revenue" fill="#00E5FF" radius={[4, 4, 0, 0]} name="Revenue" />
                  <Bar dataKey="profit" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Profit" />
                  <Legend wrapperStyle={{ color: '#8B95A5', fontSize: '0.8rem' }} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Insight */}
          <div className="datalab__insight font-mono">
            <span className="datalab__insight-icon">💡</span>
            {activeChart === 'Revenue Trend' && 'Revenue shows an upward trend from January through June. Try filtering by category to see which product lines drive growth.'}
            {activeChart === 'Category Breakdown' && 'This donut chart shows how revenue distributes across product categories. Filter by region to see geographic preferences.'}
            {activeChart === 'Profit Analysis' && 'The profit curve follows revenue but with varying margins. Some categories like clothing show higher margin ratios than electronics.'}
            {activeChart === 'Regional Comparison' && 'Compare regional performance side by side. Filter by category to see which regions outperform for specific product lines.'}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
