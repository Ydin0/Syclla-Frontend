'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Plus, ChevronRight, ChevronLeft, Download, Trophy, TrendingUp, AlertTriangle, ArrowRight, Bookmark, BarChart3, LineChart } from 'lucide-react';
import { DashboardHeader } from '@/components/layout';
import { HMOHeatmap, HeatmapLegend, AreaDetailSidebar } from '@/components/map';
import { fetchAreaRankings, type HeatmapMetric, type RankingsResponse } from '@/lib/api/areas';

const getRankBg = (rank: number) => {
  if (rank === 1) return 'bg-black';
  if (rank <= 3) return 'bg-neutral-700';
  if (rank <= 6) return 'bg-neutral-500';
  return 'bg-neutral-400';
};

const MAP_VIEW_OPTIONS: { label: string; value: HeatmapMetric }[] = [
  { label: 'HMO Score', value: 'hmo_score' },
  { label: 'Average Yield', value: 'average_yield' },
  { label: 'Room Demand', value: 'demand' },
];

export default function AreaInsights() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [mapMetric, setMapMetric] = useState<HeatmapMetric>('hmo_score');
  const [article4Filter, setArticle4Filter] = useState(false);
  const [selectedAreaCode, setSelectedAreaCode] = useState<string | null>(null);
  const [rankingsData, setRankingsData] = useState<RankingsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadRankings() {
      setLoading(true);
      try {
        const data = await fetchAreaRankings({ page: currentPage, page_size: 10 });
        setRankingsData(data);
      } catch (err) {
        console.error('Failed to fetch rankings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRankings();
  }, [currentPage]);

  const toggle = (code: string) => setSelected(p => p.includes(code) ? p.filter(c => c !== code) : p.length < 4 ? [...p, code] : p);

  const areas = rankingsData?.results.map((area, index) => ({
    rank: (currentPage - 1) * 10 + index + 1,
    name: area.post_town || area.region || area.name,
    code: area.code,
    region: area.region,
    price: area.average_price ?? 0,
    rent: area.average_rent ?? 0,
    yield: area.average_yield ?? 0,
    demand: area.demand_score,
    transport: area.transport_score,
    score: area.hmo_score,
  })) ?? [];

  const totalPages = rankingsData ? Math.ceil(rankingsData.count / 10) : 1;
  const totalAreas = rankingsData?.count ?? 0;

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader currentPath="/dashboard/area-insights" />

      <main className="mx-auto max-w-[1440px] px-8 py-8">
        {/* Page Header */}
        <section className="mb-8">
          <h1 className="text-2xl font-semibold">Area Insights</h1>
          <p className="mt-1 text-sm text-black/50">Discover the best areas for HMO investment across the UK</p>
        </section>

        {/* Search & Filters */}
        <section className="mb-6 rounded-xl border border-black/10 bg-white p-5">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-5">
              <label className="mb-1.5 block text-xs font-medium text-black/50">Search Location</label>
              <div className="relative">
                <input type="text" placeholder="Search by town, city, or postcode area..." className="h-10 w-full rounded-lg border border-black/10 bg-black/[0.02] pl-10 pr-4 text-[13px] placeholder:text-black/40 focus:border-black/20 focus:outline-none" />
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black/30" />
              </div>
            </div>
            <div className="col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-black/50">Region</label>
              <select className="h-10 w-full rounded-lg border border-black/10 bg-black/[0.02] px-3 text-[13px] focus:border-black/20 focus:outline-none">
                <option>All Regions</option>
                <option>East of England</option>
                <option>South East</option>
                <option>London</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-black/50">Minimum Yield</label>
              <select className="h-10 w-full rounded-lg border border-black/10 bg-black/[0.02] px-3 text-[13px] focus:border-black/20 focus:outline-none">
                <option>Any</option>
                <option>8%+</option>
                <option>10%+</option>
                <option>12%+</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-black/50">Minimum Score</label>
              <select className="h-10 w-full rounded-lg border border-black/10 bg-black/[0.02] px-3 text-[13px] focus:border-black/20 focus:outline-none">
                <option>Any</option>
                <option>60+</option>
                <option>70+</option>
                <option>80+</option>
              </select>
            </div>
            <div className="col-span-1 flex items-end">
              <button className="flex h-10 w-full items-center justify-center rounded-full bg-black text-white hover:bg-black/80">
                <Filter className="size-4" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-black/50">Quick filters:</span>
            {['High Demand', 'Student Areas', 'Transport Hubs', 'Article 4 Free'].map(f => (
              <button key={f} className="rounded-full border border-black/10 px-3 py-1 text-[11px] font-medium hover:border-black/20">{f}</button>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-6 overflow-hidden rounded-xl border border-black/10 bg-white">
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-3">
            <h2 className="text-lg font-semibold">UK HMO Investment Map</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-black/50">Show by:</span>
                {MAP_VIEW_OPTIONS.map(({ label, value }) => (
                  <button key={value} onClick={() => { setMapMetric(value); setArticle4Filter(false); }} className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${!article4Filter && mapMetric === value ? 'bg-black text-white' : 'border border-black/10 hover:border-black/20'}`}>{label}</button>
                ))}
              </div>
              <div className="h-5 w-px bg-black/10" />
              <button
                onClick={() => setArticle4Filter(prev => !prev)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${article4Filter ? 'bg-red-600 text-white' : 'border border-black/10 hover:border-black/20'}`}
              >
                <AlertTriangle className="size-3" />
                Article 4
              </button>
            </div>
          </div>
          <div className="relative h-[500px]">
            <HMOHeatmap
              selectedMetric={mapMetric}
              article4Filter={article4Filter}
              onAreaClick={setSelectedAreaCode}
            />
            <HeatmapLegend metric={article4Filter ? 'article4' : mapMetric} className="absolute right-4 top-4" />
            <AreaDetailSidebar
              areaCode={selectedAreaCode}
              onClose={() => setSelectedAreaCode(null)}
            />
          </div>
        </section>

        {/* Compare Section */}
        <section className="mb-6 flex items-center justify-between rounded-xl border border-black/10 bg-[#FAFAFA] p-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium">Compare areas:</span>
            <span className="text-xs text-black/50">Select up to 4 areas from the table below</span>
            <span className="rounded-full bg-black px-2.5 py-1 text-[10px] font-medium text-white">{selected.length} selected</span>
          </div>
          <button disabled={selected.length < 2} className="h-9 rounded-full bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/20">Compare Selected</button>
        </section>

        {/* Area Rankings Table */}
        <section className="mb-6 overflow-hidden rounded-xl border border-black/10 bg-white">
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-3">
            <h2 className="text-lg font-semibold">Area Rankings</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-black/50">
                {loading ? 'Loading...' : `Showing ${(currentPage - 1) * 10 + 1}-${Math.min(currentPage * 10, totalAreas)} of ${totalAreas} areas`}
              </span>
              <div className="flex items-center gap-1">
                <button className="flex size-8 items-center justify-center rounded-full hover:bg-black/5"><Download className="size-4 text-black/60" /></button>
                <button className="flex size-8 items-center justify-center rounded-full hover:bg-black/5"><Filter className="size-4 text-black/60" /></button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10 bg-[#FAFAFA]">
                  <th className="w-10 p-3"><input type="checkbox" className="size-4 rounded" /></th>
                  <th className="p-3 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">Rank</th>
                  <th className="p-3 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">Area</th>
                  <th className="p-3 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">Region</th>
                  <th className="p-3 text-right text-[10px] font-semibold uppercase tracking-wider text-black/40">Avg Price</th>
                  <th className="p-3 text-right text-[10px] font-semibold uppercase tracking-wider text-black/40">Avg Rent</th>
                  <th className="p-3 text-right text-[10px] font-semibold uppercase tracking-wider text-black/40">Avg Yield</th>
                  <th className="p-3 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">Demand</th>
                  <th className="p-3 text-center text-[10px] font-semibold uppercase tracking-wider text-black/40">Transport</th>
                  <th className="p-3 text-right text-[10px] font-semibold uppercase tracking-wider text-black/40">HMO Score</th>
                  <th className="w-10 p-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {loading ? (
                  <tr>
                    <td colSpan={11} className="p-8 text-center">
                      <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      <div className="text-xs text-black/50">Loading rankings...</div>
                    </td>
                  </tr>
                ) : areas.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="p-8 text-center text-sm text-black/50">No areas found</td>
                  </tr>
                ) : (
                  areas.map(a => (
                    <tr key={a.code} onClick={() => router.push(`/dashboard/area-insights/${a.code}`)} className="group cursor-pointer transition-colors hover:bg-[#F8F7FF]">
                      <td className="p-3"><input type="checkbox" checked={selected.includes(a.code)} onChange={() => toggle(a.code)} className="size-4 rounded" /></td>
                      <td className="p-3"><div className={`flex size-7 items-center justify-center rounded text-xs font-medium text-white ${getRankBg(a.rank)}`}>{a.rank}</div></td>
                      <td className="p-3">
                        <div className="text-[13px] font-medium">{a.name}</div>
                        <div className="text-[11px] text-black/50">{a.code}</div>
                      </td>
                      <td className="p-3 text-[13px] text-black/60">{a.region}</td>
                      <td className="p-3 text-right text-[13px]">£{a.price.toLocaleString()}</td>
                      <td className="p-3 text-right">
                        <div className="text-[13px]">£{a.rent}</div>
                        <div className="text-[10px] text-black/40">/month</div>
                      </td>
                      <td className="p-3 text-right text-[15px] font-medium">{a.yield}%</td>
                      <td className="p-3 text-center text-[15px] font-medium">{a.demand}</td>
                      <td className="p-3 text-center text-[15px] font-medium">{a.transport}/100</td>
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-black/10">
                            <div className="h-full rounded-full bg-black" style={{ width: `${a.score}%` }} />
                          </div>
                          <span className="w-6 text-right text-[15px] font-medium">{a.score}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <button className="flex size-8 items-center justify-center rounded-full opacity-0 transition-all hover:bg-black/5 group-hover:opacity-100"><ChevronRight className="size-4 text-black/40" /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-black/5 bg-[#FAFAFA] px-4 py-3">
            <span className="text-xs text-black/50">
              {loading ? 'Loading...' : `Showing ${(currentPage - 1) * 10 + 1}-${Math.min(currentPage * 10, totalAreas)} of ${totalAreas} areas`}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="flex size-8 items-center justify-center rounded-lg border border-black/10 bg-white disabled:text-black/30 hover:bg-black/2"
              >
                <ChevronLeft className="size-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  className={`flex size-8 items-center justify-center rounded-lg text-xs font-medium ${n === currentPage ? 'bg-black text-white' : 'border border-black/10 bg-white hover:bg-black/2'}`}
                >
                  {n}
                </button>
              ))}
              {totalPages > 5 && (
                <>
                  <span className="px-1 text-black/30">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="flex size-8 items-center justify-center rounded-lg border border-black/10 bg-white text-xs font-medium hover:bg-black/2"
                  >
                    {totalPages}
                  </button>
                </>
              )}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="flex size-8 items-center justify-center rounded-lg border border-black/10 bg-white disabled:text-black/30 hover:bg-black/2"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Insight Cards */}
        <section className="mb-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-black/10 bg-white p-5">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-black"><Trophy className="size-5 text-white" /></div>
              <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium text-black/60">TRENDING</span>
            </div>
            <h3 className="text-sm font-semibold">Top Performing Region</h3>
            <div className="mt-2 text-2xl font-semibold">East of England</div>
            <p className="mt-1 text-xs text-black/50">6 out of top 10 areas are in this region</p>
            <div className="mt-4 space-y-2 border-t border-black/5 pt-4">
              <div className="flex items-center justify-between text-xs"><span className="text-black/50">Average yield</span><span className="font-medium">11.3%</span></div>
              <div className="flex items-center justify-between text-xs"><span className="text-black/50">Average score</span><span className="font-medium">76</span></div>
            </div>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-5">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-neutral-700"><TrendingUp className="size-5 text-white" /></div>
              <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium text-black/60">INSIGHT</span>
            </div>
            <h3 className="text-sm font-semibold">Best Value Areas</h3>
            <p className="mt-1 text-xs text-black/50">Highest yield-to-price ratio</p>
            <div className="mt-3 space-y-2">
              {[{ name: 'Ipswich IP1', yield: '12.1%' }, { name: 'Colchester CO1', yield: '12.4%' }, { name: 'Basildon SS14', yield: '11.2%' }].map(a => (
                <div key={a.name} className="flex items-center justify-between text-xs"><span>{a.name}</span><span className="font-medium">{a.yield}</span></div>
              ))}
            </div>
            <button className="mt-4 flex items-center gap-1.5 text-xs font-medium hover:underline">View all value areas <ArrowRight className="size-3" /></button>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-5">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-neutral-700"><AlertTriangle className="size-5 text-white" /></div>
              <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium text-black/60">ALERT</span>
            </div>
            <h3 className="text-sm font-semibold">Regulatory Updates</h3>
            <p className="mt-1 text-xs text-black/50">Recent Article 4 changes</p>
            <div className="mt-3 space-y-2.5">
              <div className="border-b border-black/5 pb-2.5"><div className="text-xs font-medium">Brighton & Hove</div><div className="text-[11px] text-black/50">Article 4 extended - Jan 2026</div></div>
              <div><div className="text-xs font-medium">Bristol</div><div className="text-[11px] text-black/50">New HMO licensing - Dec 2025</div></div>
            </div>
            <button className="mt-4 flex items-center gap-1.5 text-xs font-medium hover:underline">View all updates <ArrowRight className="size-3" /></button>
          </div>
        </section>

        {/* Comparison Tool */}
        <section className="mb-6 rounded-xl border border-black/10 bg-white">
          <div className="border-b border-black/5 px-5 py-3">
            <h2 className="text-lg font-semibold">Area Comparison Tool</h2>
          </div>
          <div className="p-5">
            <div className="mb-5 grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="flex min-h-[160px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-black/10 bg-black/[0.01] p-5 transition-colors hover:border-black/20 hover:bg-black/[0.02]">
                  <div className="flex size-10 items-center justify-center rounded-full bg-black/5"><Plus className="size-5 text-black/30" /></div>
                  <span className="mt-2.5 text-xs text-black/50">Select area {n}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-xs text-black/50">Select areas from the table above to compare them side by side</p>
              <button disabled className="mt-3 h-9 rounded-full bg-black/20 px-5 text-sm font-medium text-white">Compare Areas</button>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-black/10 bg-white">
            <div className="border-b border-black/5 px-5 py-3">
              <h2 className="text-lg font-semibold">Yield Trends by Region</h2>
            </div>
            <div className="p-5">
              <div className="flex h-[240px] items-center justify-center rounded-xl bg-[#FAFAFA]">
                <div className="text-center">
                  <BarChart3 className="mx-auto mb-2 size-12 text-black/20" />
                  <div className="text-xs text-black/50">Regional Yield Comparison Chart</div>
                </div>
              </div>
              <div className="mt-4 space-y-2.5">
                {[{ region: 'East of England', yield: '11.3%', color: 'bg-black' }, { region: 'North West', yield: '10.8%', color: 'bg-neutral-700' }, { region: 'Yorkshire', yield: '10.2%', color: 'bg-neutral-500' }].map(r => (
                  <div key={r.region} className="flex items-center justify-between border-b border-black/5 pb-2.5 last:border-0">
                    <div className="flex items-center gap-2"><div className={`size-3 rounded ${r.color}`} /><span className="text-xs">{r.region}</span></div>
                    <span className="text-xs font-medium">{r.yield}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-black/10 bg-white">
            <div className="border-b border-black/5 px-5 py-3">
              <h2 className="text-lg font-semibold">Room Demand Analysis</h2>
            </div>
            <div className="p-5">
              <div className="flex h-[240px] items-center justify-center rounded-xl bg-[#FAFAFA]">
                <div className="text-center">
                  <LineChart className="mx-auto mb-2 size-12 text-black/20" />
                  <div className="text-xs text-black/50">Demand Distribution Chart</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[{ label: 'High Demand', value: '42%' }, { label: 'Medium Demand', value: '38%' }, { label: 'Low Demand', value: '20%' }].map((d, i) => (
                  <div key={d.label} className={i > 0 ? 'border-l border-black/10' : ''}>
                    <div className="text-2xl font-semibold">{d.value}</div>
                    <div className="mt-0.5 text-[10px] text-black/50">{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Save Search CTA */}
        <section className="rounded-xl border border-black/10 bg-white">
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-3">
            <h2 className="text-lg font-semibold">Save Your Area Search</h2>
            <button className="flex h-9 items-center gap-2 rounded-full bg-black px-4 text-sm font-medium text-white hover:bg-black/80"><Bookmark className="size-4" /> Save Current Filters</button>
          </div>
          <div className="p-8 text-center">
            <Bookmark className="mx-auto mb-3 size-10 text-black/20" />
            <div className="text-sm font-medium text-black/60">No saved area searches yet</div>
            <p className="mt-1 text-xs text-black/40">Save your current filter settings to quickly access them later</p>
          </div>
        </section>
      </main>
    </div>
  );
}