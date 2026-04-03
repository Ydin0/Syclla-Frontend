'use client';

import type { HeatmapMetric } from '@/lib/api/areas';

interface HeatmapLegendProps {
  metric: HeatmapMetric;
  className?: string;
}

const LEGEND_ITEMS = [
  { bg: 'bg-[#4a0000]', label: '90-100', description: 'Excellent' },
  { bg: 'bg-[#7f0000]', label: '80-89', description: 'Very Good' },
  { bg: 'bg-[#b30000]', label: '70-79', description: 'Good' },
  { bg: 'bg-[#d7301f]', label: '60-69', description: 'Above Average' },
  { bg: 'bg-[#e34a33]', label: '50-59', description: 'Average' },
  { bg: 'bg-[#fc8d59]', label: '40-49', description: 'Below Average' },
  { bg: 'bg-[#fdcc8a]', label: '20-39', description: 'Fair' },
  { bg: 'bg-[#fef0d9]', label: '0-19', description: 'Low' },
];

const YIELD_LEGEND_ITEMS = [
  { bg: 'bg-[#4a0000]', label: '12%+', description: 'Excellent' },
  { bg: 'bg-[#7f0000]', label: '11-12%', description: 'Very Good' },
  { bg: 'bg-[#b30000]', label: '10-11%', description: 'Good' },
  { bg: 'bg-[#d7301f]', label: '9-10%', description: 'Above Average' },
  { bg: 'bg-[#e34a33]', label: '8-9%', description: 'Average' },
  { bg: 'bg-[#fc8d59]', label: '7-8%', description: 'Below Average' },
  { bg: 'bg-[#fdcc8a]', label: '6-7%', description: 'Fair' },
  { bg: 'bg-[#fef0d9]', label: '<6%', description: 'Low' },
];

const DEMAND_LEGEND_ITEMS = [
  { bg: 'bg-[#4a0000]', label: 'High', description: 'Strong demand' },
  { bg: 'bg-[#e34a33]', label: 'Medium', description: 'Moderate demand' },
  { bg: 'bg-[#fef0d9]', label: 'Low', description: 'Limited demand' },
];

const ARTICLE4_LEGEND_ITEMS = [
  { bg: 'bg-[#f4a4a4]', label: 'Yes', description: 'Article 4 applies' },
  { bg: 'bg-[#a3d9a5]', label: 'No', description: 'No Article 4' },
];

function getMetricLabel(metric: HeatmapMetric): string {
  switch (metric) {
    case 'hmo_score':
      return 'HMO Score';
    case 'average_yield':
      return 'Average Yield';
    case 'demand':
      return 'Room Demand';
    case 'article4':
      return 'Article 4 Direction';
    default:
      return 'Score';
  }
}

function getLegendItems(metric: HeatmapMetric) {
  switch (metric) {
    case 'average_yield':
      return YIELD_LEGEND_ITEMS;
    case 'demand':
      return DEMAND_LEGEND_ITEMS;
    case 'article4':
      return ARTICLE4_LEGEND_ITEMS;
    default:
      return LEGEND_ITEMS;
  }
}

export function HeatmapLegend({ metric, className }: HeatmapLegendProps) {
  const items = getLegendItems(metric);

  return (
    <div
      className={`rounded-xl border border-black/10 bg-white p-4 shadow-sm ${className}`}
    >
      <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-black/40">
        Legend - {getMetricLabel(metric)}
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`h-3 w-6 rounded ${item.bg}`} />
            <span className="text-[10px] text-black/60">
              {item.label} ({item.description})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
