'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  TrendingUp,
  Star,
  Bookmark,
  ArrowRight,
  Plus,
  Lightbulb,
  BarChart3,
  GraduationCap,
  Clock,
} from 'lucide-react';
import { DashboardHeader, DashboardFooter } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { fetchAreaRankings, type RankingsResponse } from '@/lib/api/areas';

const getRankBg = (rank: number) => {
  if (rank === 1) return 'bg-black';
  if (rank === 2) return 'bg-neutral-700';
  if (rank === 3) return 'bg-neutral-600';
  if (rank === 4) return 'bg-neutral-500';
  return 'bg-neutral-400';
};

const getDemandLabel = (score: number) => {
  if (score >= 70) return 'HIGH';
  if (score >= 40) return 'MEDIUM';
  return 'LOW';
};

export default function Dashboard() {
  const { user } = useAuth();
  const [rankingsData, setRankingsData] = useState<RankingsResponse | null>(null);
  const [loadingAreas, setLoadingAreas] = useState(true);

  useEffect(() => {
    async function loadTopAreas() {
      try {
        const data = await fetchAreaRankings({ sort_by: 'hmo_score', order: 'desc', page_size: 5 });
        setRankingsData(data);
      } catch (err) {
        console.error('Failed to fetch top areas:', err);
      } finally {
        setLoadingAreas(false);
      }
    }
    loadTopAreas();
  }, []);

  const topAreas = rankingsData?.results.map((area, index) => ({
    rank: index + 1,
    name: area.post_town || area.region || area.name,
    code: area.code,
    yield: area.average_yield ?? 0,
    demand: getDemandLabel(area.demand_score),
    demandScore: area.demand_score,
    score: area.hmo_score,
  })) ?? [];

  const greeting = user?.first_name ? `Good morning, ${user.first_name}` : 'Welcome back';

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader currentPath="/dashboard" />

      <main className="mx-auto max-w-[1440px] px-8 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-semibold">{greeting}</h1>
              <p className="text-[15px] text-black/60">
                Explore area insights and find HMO investment opportunities
              </p>
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
              href="/dashboard/hmo-scorecard"
              className="group rounded-xl border border-black/10 bg-white p-6 transition-colors hover:border-black/20 hover:bg-black/[0.02]"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-neutral-800">
                <Star className="size-5 text-white" />
              </div>
              <div className="mb-1 text-lg font-semibold">HMO Scorecard</div>
              <div className="text-[13px] text-black/60">Analyse property potential</div>
            </Link>
            <Link
              href="/dashboard/area-insights"
              className="group rounded-xl border border-black/10 bg-white p-6 transition-colors hover:border-black/20 hover:bg-black/[0.02]"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-neutral-800">
                <Bookmark className="size-5 text-white" />
              </div>
              <div className="mb-1 text-lg font-semibold">Area Rankings</div>
              <div className="text-[13px] text-black/60">View all ranked areas</div>
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
                  {loadingAreas ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center">
                        <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
                        <div className="text-xs text-black/50">Loading top areas...</div>
                      </td>
                    </tr>
                  ) : topAreas.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-sm text-black/50">No area data available</td>
                    </tr>
                  ) : (
                    topAreas.map((area) => (
                      <tr key={area.code} onClick={() => window.location.href = `/dashboard/area-insights/${area.code}`} className="cursor-pointer transition-colors hover:bg-[#F8F7FF]">
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
                    ))
                  )}
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
                <div className="mb-1 text-xs text-black/50">Areas Ranked</div>
                <div className="text-3xl font-semibold">{rankingsData?.count?.toLocaleString() ?? '—'}</div>
              </div>
              <div className="border-t border-black/5 pt-6">
                <div className="mb-1 text-xs text-black/50">Top Area Score</div>
                <div className="text-3xl font-semibold">
                  {topAreas.length > 0 ? topAreas[0].score : '—'}<span className="text-lg text-black/50">/100</span>
                </div>
              </div>
              <div className="border-t border-black/5 pt-6">
                <div className="mb-1 text-xs text-black/50">Top Area Yield</div>
                <div className="text-3xl font-semibold">{topAreas.length > 0 ? `${topAreas[0].yield}%` : '—'}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Watchlist & Saved Searches - Empty States */}
        <div className="mb-8 grid grid-cols-2 gap-6">
          <Card variant="default" padding="none">
            <CardHeader>
              <CardTitle>Watchlist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Star className="mb-3 size-10 text-black/15" />
                <div className="text-sm font-medium text-black/60">No properties in your watchlist</div>
                <p className="mt-1 text-xs text-black/40">Save properties you&apos;re interested in to track them here</p>
                <Link href="/dashboard/lease-opportunities" className="mt-4 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80">
                  Search Properties
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card variant="default" padding="none">
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bookmark className="mb-3 size-10 text-black/15" />
                <div className="text-sm font-medium text-black/60">No saved searches yet</div>
                <p className="mt-1 text-xs text-black/40">Save your search criteria to quickly run them again</p>
                <Link href="/dashboard/lease-opportunities" className="mt-4 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80">
                  Create a Search
                </Link>
              </div>
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
              <h3 className="mb-2 text-[15px] font-semibold">Area Insights</h3>
              <p className="mb-4 text-[13px] leading-relaxed text-black/60">
                Explore over {rankingsData?.count?.toLocaleString() ?? '3,000'} ranked postcode districts with HMO scores, yields, and demand data.
              </p>
              <Link href="/dashboard/area-insights" className="flex items-center gap-2 text-[13px] font-medium hover:underline">
                Explore areas
                <ArrowRight className="size-3" />
              </Link>
            </Card>
            <Card variant="default">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-neutral-800">
                <BarChart3 className="size-5 text-white" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold">HMO Scorecards</h3>
              <p className="mb-4 text-[13px] leading-relaxed text-black/60">
                Generate detailed scorecards for individual properties to assess their HMO investment potential.
              </p>
              <Link href="/dashboard/hmo-scorecard" className="flex items-center gap-2 text-[13px] font-medium hover:underline">
                Generate scorecard
                <ArrowRight className="size-3" />
              </Link>
            </Card>
            <Card variant="default">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-neutral-800">
                <GraduationCap className="size-5 text-white" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold">Getting Started</h3>
              <p className="mb-4 text-[13px] leading-relaxed text-black/60">
                New to HMO investing? Start by exploring area insights to find high-yield locations across the UK.
              </p>
              <Link href="/dashboard/area-insights" className="flex items-center gap-2 text-[13px] font-medium hover:underline">
                Start exploring
                <ArrowRight className="size-3" />
              </Link>
            </Card>
          </div>
        </section>
      </main>

      <DashboardFooter />
    </div>
  );
}
