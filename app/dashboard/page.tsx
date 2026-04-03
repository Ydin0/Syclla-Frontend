'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  TrendingUp,
  Star,
  Bookmark,
  Eye,
  Play,
  ArrowRight,
  MapPin,
  Home,
  PoundSterling,
  Ruler,
  Plus,
  Lightbulb,
  BarChart3,
  GraduationCap,
  Clock,
} from 'lucide-react';
import { DashboardHeader, DashboardFooter } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';

const topAreas = [
  { rank: 1, name: 'Colchester', code: 'CO1', yield: 12.4, demand: 'HIGH', score: 84 },
  { rank: 2, name: 'Southend', code: 'SS1', yield: 11.8, demand: 'HIGH', score: 81 },
  { rank: 3, name: 'Chelmsford', code: 'CM1', yield: 10.9, demand: 'MEDIUM', score: 78 },
  { rank: 4, name: 'Basildon', code: 'SS14', yield: 11.2, demand: 'HIGH', score: 76 },
  { rank: 5, name: 'Ipswich', code: 'IP1', yield: 12.1, demand: 'MEDIUM', score: 75 },
];

const watchlistItems = [
  { id: 1, address: '47 Southchurch Ave', area: 'Southend-on-Sea, SS1', price: 285000, score: 74 },
  { id: 2, address: '12 Hamlet Court Rd', area: 'Westcliff-on-Sea, SS0', price: 315000, score: 71 },
  { id: 3, address: '89 Westborough Rd', area: 'Westcliff-on-Sea, SS0', price: 425000, score: 82 },
];

const savedSearches = [
  {
    id: 1,
    name: 'Southend HMO Opportunities',
    locations: 'SS0, SS1, SS9',
    type: 'Houses',
    price: '£200k-£400k',
    results: 847,
  },
  {
    id: 2,
    name: 'Essex Large Houses',
    locations: 'CM1, CO1, SS14',
    type: 'Houses',
    size: '>120sqm',
    results: null,
  },
];

const recentActivity = [
  { type: 'search', label: 'Last search', detail: '"SS0, Houses, >100sqm"', time: '2 days ago', action: 'Run again' },
  { type: 'view', label: 'Last viewed', detail: '47 Southchurch Avenue, SS1', time: '2 days ago', action: 'View again' },
  { type: 'watchlist', label: 'Last added to watchlist', detail: '89 Westborough Road, SS0', time: '3 days ago', action: 'View property' },
];

const getRankBg = (rank: number) => {
  if (rank === 1) return 'bg-black';
  if (rank === 2) return 'bg-neutral-700';
  if (rank === 3) return 'bg-neutral-600';
  if (rank === 4) return 'bg-neutral-500';
  return 'bg-neutral-400';
};

export default function Dashboard() {
  const [userName] = useState('James');

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader currentPath="/dashboard" />

      <main className="mx-auto max-w-[1440px] px-8 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-semibold">Good morning, {userName}</h1>
              <p className="text-[15px] text-black/60">
                You have <span className="font-medium text-black">3 properties</span> in your watchlist and{' '}
                <span className="font-medium text-black">2 saved searches</span>
              </p>
            </div>
            <div className="text-right">
              <div className="mb-1 text-xs text-black/50">Data last updated</div>
              <div className="text-[13px]">23 Jan 2026, 14:30</div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <div className="grid grid-cols-4 gap-4">
            <Link
              href="/dashboard/lease-opportunities"
              className="group rounded-xl border-2 border-black bg-white p-6 transition-colors hover:bg-black/[0.02]"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-black">
                <Search className="size-5 text-white" />
              </div>
              <div className="mb-1 text-lg font-semibold">Search Properties</div>
              <div className="text-[13px] text-black/60">Find HMO investment opportunities</div>
            </Link>
            <Link
              href="/dashboard/area-insights"
              className="group rounded-xl border border-black/10 bg-white p-6 transition-colors hover:border-black/20 hover:bg-black/[0.02]"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-neutral-800">
                <TrendingUp className="size-5 text-white" />
              </div>
              <div className="mb-1 text-lg font-semibold">Explore Area Insights</div>
              <div className="text-[13px] text-black/60">Discover top performing areas</div>
            </Link>
            <Link
              href="/dashboard/watchlist"
              className="group rounded-xl border border-black/10 bg-white p-6 transition-colors hover:border-black/20 hover:bg-black/[0.02]"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-neutral-800">
                <Star className="size-5 text-white" />
              </div>
              <div className="mb-1 text-lg font-semibold">View Watchlist</div>
              <div className="text-[13px] text-black/60">Review saved properties</div>
            </Link>
            <Link
              href="/dashboard/saved-searches"
              className="group rounded-xl border border-black/10 bg-white p-6 transition-colors hover:border-black/20 hover:bg-black/[0.02]"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-neutral-800">
                <Bookmark className="size-5 text-white" />
              </div>
              <div className="mb-1 text-lg font-semibold">Run Saved Searches</div>
              <div className="text-[13px] text-black/60">Execute your search criteria</div>
            </Link>
          </div>
        </section>

        {/* Top Areas & Market Snapshot */}
        <div className="mb-8 grid grid-cols-3 gap-6">
          {/* Top HMO Areas */}
          <Card variant="default" padding="none" className="col-span-2">
            <CardHeader>
              <CardTitle>Top HMO Areas Right Now</CardTitle>
              <Link
                href="/dashboard/area-insights"
                className="flex items-center gap-2 text-[13px] font-medium hover:underline"
              >
                View all areas
                <ArrowRight className="size-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/10 bg-[#FAFAFA]">
                    <th className="p-3 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">Rank</th>
                    <th className="p-3 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">Area</th>
                    <th className="p-3 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">Avg Yield</th>
                    <th className="p-3 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">Demand</th>
                    <th className="p-3 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">HMO Area Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {topAreas.map((area) => (
                    <tr key={area.code} className="transition-colors hover:bg-[#F8F7FF]">
                      <td className="p-3">
                        <div className={`flex size-8 items-center justify-center text-sm font-medium text-white ${getRankBg(area.rank)}`}>
                          {area.rank}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-[13px] font-medium">{area.name}</div>
                        <div className="text-[11px] text-black/50">{area.code}</div>
                      </td>
                      <td className="p-3 text-lg font-medium">{area.yield}%</td>
                      <td className="p-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-medium text-white ${
                            area.demand === 'HIGH' ? 'bg-black' : 'bg-neutral-500'
                          }`}
                        >
                          {area.demand}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-black/10">
                            <div className="h-full rounded-full bg-black" style={{ width: `${area.score}%` }} />
                          </div>
                          <span className="text-lg font-medium">{area.score}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Market Snapshot */}
          <Card variant="default" padding="none">
            <CardHeader>
              <CardTitle>Market Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="mb-1 text-xs text-black/50">Total Properties in Database</div>
                <div className="text-3xl font-semibold">25.2M</div>
              </div>
              <div className="border-t border-black/5 pt-6">
                <div className="mb-1 text-xs text-black/50">Average UK Room Rent</div>
                <div className="text-3xl font-semibold">
                  £687<span className="text-lg text-black/50">/month</span>
                </div>
              </div>
              <div className="border-t border-black/5 pt-6">
                <div className="mb-1 text-xs text-black/50">Average HMO Yield</div>
                <div className="text-3xl font-semibold">9.8%</div>
              </div>
              <div className="border-t border-black/5 pt-6">
                <div className="flex items-center gap-2 text-xs text-black/50">
                  <Clock className="size-3.5" />
                  <span>Updated 23 Jan 2026</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card variant="default" padding="none" className="mb-8">
          <CardHeader>
            <CardTitle>Your Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-black/5">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-black/5">
                  {item.type === 'search' && <Search className="size-4 text-black/60" />}
                  {item.type === 'view' && <Eye className="size-4 text-black/60" />}
                  {item.type === 'watchlist' && <Star className="size-4 text-black/60" />}
                </div>
                <div className="flex-1">
                  <div className="mb-1 text-[13px] font-medium">{item.label}</div>
                  <div className="mb-1 text-[13px] text-black/60">{item.detail}</div>
                  <div className="text-xs text-black/40">{item.time}</div>
                </div>
                <Button variant="secondary" size="sm">
                  {item.action}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Watchlist & Saved Searches */}
        <div className="mb-8 grid grid-cols-2 gap-6">
          {/* Watchlist Preview */}
          <Card variant="default" padding="none">
            <CardHeader>
              <CardTitle>Watchlist Preview</CardTitle>
              <Link
                href="/dashboard/watchlist"
                className="flex items-center gap-2 text-[13px] font-medium hover:underline"
              >
                View full watchlist
                <ArrowRight className="size-3" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {watchlistItems.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer rounded-xl border border-black/10 p-4 transition-colors hover:border-black/20"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <div className="mb-1 text-[15px] font-medium">{item.address}</div>
                      <div className="text-xs text-black/50">{item.area}</div>
                    </div>
                    <button className="flex size-8 items-center justify-center rounded-full hover:bg-black/5">
                      <Star className="size-4 fill-black text-black" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold">£{item.price.toLocaleString()}</div>
                    <div className="text-right">
                      <div className="mb-0.5 text-[10px] text-black/50">HMO Score</div>
                      <div className="text-xl font-semibold">{item.score}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Saved Searches */}
          <Card variant="default" padding="none">
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
              <Link
                href="/dashboard/saved-searches"
                className="flex items-center gap-2 text-[13px] font-medium hover:underline"
              >
                Manage saved searches
                <ArrowRight className="size-3" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {savedSearches.map((search) => (
                <div key={search.id} className="rounded-xl border border-black/10 p-4">
                  <div className="mb-3">
                    <div className="mb-2 text-[15px] font-medium">{search.name}</div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-black/50">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3" />
                        <span>{search.locations}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Home className="size-3" />
                        <span>{search.type}</span>
                      </div>
                      {search.price && (
                        <div className="flex items-center gap-1.5">
                          <PoundSterling className="size-3" />
                          <span>{search.price}</span>
                        </div>
                      )}
                      {search.size && (
                        <div className="flex items-center gap-1.5">
                          <Ruler className="size-3" />
                          <span>{search.size}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-black/5 pt-3">
                    <div className="text-[13px]">
                      {search.results ? (
                        <>
                          <span className="font-medium">{search.results.toLocaleString()}</span>
                          <span className="ml-1.5 text-black/50">results found</span>
                        </>
                      ) : (
                        <span className="text-black/50">Not yet run</span>
                      )}
                    </div>
                    <Button size="sm">
                      <Play className="size-3" />
                      Run
                    </Button>
                  </div>
                </div>
              ))}
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/10 py-4 text-[13px] text-black/50 transition-colors hover:border-black/20 hover:text-black">
                <Plus className="size-4" />
                Create new search
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Insights & Tips */}
        <section className="mb-8">
          <div className="grid grid-cols-3 gap-6">
            <Card variant="default">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-black">
                <Lightbulb className="size-5 text-white" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold">Market Insight</h3>
              <p className="mb-4 text-[13px] leading-relaxed text-black/60">
                Colchester has seen a 15% increase in HMO applications this quarter, indicating growing investor
                interest.
              </p>
              <Link href="#" className="flex items-center gap-2 text-[13px] font-medium hover:underline">
                Learn more
                <ArrowRight className="size-3" />
              </Link>
            </Card>
            <Card variant="default">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-neutral-800">
                <BarChart3 className="size-5 text-white" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold">Yield Trends</h3>
              <p className="mb-4 text-[13px] leading-relaxed text-black/60">
                Properties with EPC rating C or above are achieving 2.3% higher yields on average across Essex.
              </p>
              <Link href="#" className="flex items-center gap-2 text-[13px] font-medium hover:underline">
                View analysis
                <ArrowRight className="size-3" />
              </Link>
            </Card>
            <Card variant="default">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-neutral-800">
                <GraduationCap className="size-5 text-white" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold">Getting Started</h3>
              <p className="mb-4 text-[13px] leading-relaxed text-black/60">
                New to HMO investing? Check out our comprehensive guide to understanding area scores and property
                analysis.
              </p>
              <Link href="#" className="flex items-center gap-2 text-[13px] font-medium hover:underline">
                Read guide
                <ArrowRight className="size-3" />
              </Link>
            </Card>
          </div>
        </section>

        {/* Platform Activity */}
        <Card variant="default" padding="none" className="mb-8">
          <CardHeader>
            <CardTitle>Your Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-1 text-4xl font-semibold">127</div>
                <div className="text-[13px] text-black/60">Properties Viewed</div>
                <div className="mt-1 text-xs text-black/40">Last 30 days</div>
              </div>
              <div className="border-l border-black/10 text-center">
                <div className="mb-1 text-4xl font-semibold">18</div>
                <div className="text-[13px] text-black/60">Searches Run</div>
                <div className="mt-1 text-xs text-black/40">Last 30 days</div>
              </div>
              <div className="border-l border-black/10 text-center">
                <div className="mb-1 text-4xl font-semibold">34</div>
                <div className="text-[13px] text-black/60">Areas Analyzed</div>
                <div className="mt-1 text-xs text-black/40">Last 30 days</div>
              </div>
              <div className="border-l border-black/10 text-center">
                <div className="mb-1 text-4xl font-semibold">3</div>
                <div className="text-[13px] text-black/60">Watchlist Items</div>
                <div className="mt-1 text-xs text-black/40">Current total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <DashboardFooter />
    </div>
  );
}
