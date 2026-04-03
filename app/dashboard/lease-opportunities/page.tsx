'use client';

import { useState } from 'react';
import {
  Save,
  Play,
  Lightbulb,
  Search,
  MapPin,
  Map,
  Filter,
  Clock,
  PoundSterling,
  TrendingUp,
  Building,
  Star,
  RotateCcw,
  BarChart3,
  Info,
  MapPinned,
  ArrowRight,
  Trophy,
  AlertTriangle,
  Check,
  X,
  Rocket,
  ChevronDown,
} from 'lucide-react';
import { DashboardHeader, DashboardFooter } from '@/components/layout';

const topAreas = [
  { name: 'Southend SS1', code: 'SS1' },
  { name: 'Colchester CO1', code: 'CO1' },
  { name: 'Chelmsford CM1', code: 'CM1' },
  { name: 'Basildon SS14', code: 'SS14' },
];

const recentSearches = [
  {
    id: 1,
    query: 'SS1, Under 75 years, <£200k',
    date: '2 days ago',
    results: 234,
    filters: ['SS1', '<75 yrs', '<£200k'],
  },
  {
    id: 2,
    query: 'CO1, 60-70 years',
    date: '1 week ago',
    results: 87,
    filters: ['CO1', '60-70 yrs'],
  },
];

const areaHotspots = [
  { name: 'Southend-on-Sea', codes: 'SS1, SS0, SS9', count: 1847 },
  { name: 'Colchester', codes: 'CO1, CO2, CO3', count: 1432 },
  { name: 'Chelmsford', codes: 'CM1, CM2', count: 982 },
  { name: 'Basildon', codes: 'SS13, SS14, SS15', count: 1124 },
  { name: 'Ipswich', codes: 'IP1, IP2', count: 876 },
];

export default function LeaseOpportunities() {
  const [leaseFilter, setLeaseFilter] = useState('under60');
  const [scoreValue, setScoreValue] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader currentPath="/dashboard/lease-opportunities" />

      <main className="mx-auto max-w-[1440px] px-8 py-8">
        {/* Page Header */}
        <section className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-semibold">Lease Opportunities</h1>
              <p className="text-[13px] text-black/60">
                Find flats with short leases and profit from lease extensions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-9 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-[13px] font-medium hover:bg-black/[0.02]">
                <Save className="size-3.5" />
                Saved Searches
              </button>
              <button className="flex h-9 items-center gap-2 rounded-full bg-black px-4 text-[13px] font-medium text-white hover:bg-black/80">
                <Play className="size-3.5" />
                Run Last Search
              </button>
            </div>
          </div>
        </section>

        {/* Educational Callout */}
        <section className="mb-6">
          <div className="rounded-xl border-2 border-black/20 bg-[#FAFAFA]">
            <button className="group flex w-full items-start justify-between p-5 text-left">
              <div className="flex flex-1 items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-black">
                  <Lightbulb className="size-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="mb-1.5 flex items-center gap-2">
                    <h3 className="text-sm font-semibold">How lease extensions work</h3>
                    <span className="rounded-full bg-black px-2 py-0.5 text-[10px] font-medium text-white">
                      Learn
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-black/60">
                    Flats with leases under 80 years are harder to mortgage and sell at a discount.
                    Buy at the discounted price, extend the lease (typically £10-30k), and the
                    property is now worth significantly more.{' '}
                    <span className="font-medium text-black">Sweet spot: 60-80 years remaining.</span>
                  </p>
                </div>
              </div>
              <ChevronDown className="mt-1 size-4 text-black/40 transition-transform group-hover:text-black" />
            </button>
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-6">
          <div className="rounded-xl border-2 border-black bg-white p-6">
            <div className="mb-5">
              <label className="mb-2 block text-[13px] font-medium">Search by location</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter postcode, area, or town..."
                    className="h-11 w-full rounded-lg border border-black/10 bg-black/[0.02] pl-4 pr-10 text-[13px] placeholder:text-black/40 focus:border-black/20 focus:outline-none"
                  />
                  <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-black/30" />
                </div>
                <button className="flex h-11 items-center gap-2 rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/80">
                  <Search className="size-4" />
                  Search
                </button>
              </div>
            </div>

            <div className="mb-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-black/10" />
                <span className="text-xs text-black/50">Or browse top areas for lease opportunities</span>
                <div className="h-px flex-1 bg-black/10" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {topAreas.map((area) => (
                  <button
                    key={area.code}
                    className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-[13px] font-medium hover:border-black/20 hover:bg-black/[0.02]"
                  >
                    <MapPin className="size-3.5 text-black/40" />
                    {area.name}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Filters Section */}
        <section className="mb-6">
          <div className="rounded-xl border border-black/10 bg-white">
            <div className="flex items-center justify-between border-b border-black/5 p-5">
              <div className="flex items-center gap-2">
                <Filter className="size-4" />
                <h2 className="text-lg font-semibold">Search Filters</h2>
              </div>
              <button className="text-xs text-black/50 hover:text-black">Reset all</button>
            </div>

            <div className="space-y-5 p-5">
              {/* Lease Length Filter */}
              <div>
                <label className="mb-2.5 flex items-center gap-2 text-[13px] font-medium">
                  <Clock className="size-3.5 text-black/40" />
                  Lease length
                </label>
                <div className="mb-3 grid grid-cols-4 gap-2">
                  {[
                    { id: 'under60', label: 'Under 60 years' },
                    { id: '60-70', label: '60-70 years' },
                    { id: '70-80', label: '70-80 years' },
                    { id: 'under80', label: 'Under 80 years' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setLeaseFilter(opt.id)}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                        leaseFilter === opt.id
                          ? 'border-black bg-black text-white'
                          : 'border-black/10 hover:border-black/20'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="mb-1 block text-[10px] text-black/50">Min years</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="h-9 w-full rounded-lg border border-black/10 bg-black/[0.02] px-3 text-xs focus:border-black/20 focus:outline-none"
                    />
                  </div>
                  <div className="pt-4 text-black/30">—</div>
                  <div className="flex-1">
                    <label className="mb-1 block text-[10px] text-black/50">Max years</label>
                    <input
                      type="number"
                      placeholder="999"
                      className="h-9 w-full rounded-lg border border-black/10 bg-black/[0.02] px-3 text-xs focus:border-black/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-black/5" />

              {/* Price Range Filter */}
              <div>
                <label className="mb-2.5 flex items-center gap-2 text-[13px] font-medium">
                  <PoundSterling className="size-3.5 text-black/40" />
                  Price range
                </label>
                <div className="mb-3 grid grid-cols-4 gap-2">
                  {['Any', '<£150k', '£150-250k', '£250-400k'].map((opt) => (
                    <button
                      key={opt}
                      className="rounded-lg border border-black/10 px-3 py-2 text-xs font-medium hover:border-black/20"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="mb-1 block text-[10px] text-black/50">Min £</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="h-9 w-full rounded-lg border border-black/10 bg-black/[0.02] px-3 text-xs focus:border-black/20 focus:outline-none"
                    />
                  </div>
                  <div className="pt-4 text-black/30">—</div>
                  <div className="flex-1">
                    <label className="mb-1 block text-[10px] text-black/50">Max £</label>
                    <input
                      type="number"
                      placeholder="No max"
                      className="h-9 w-full rounded-lg border border-black/10 bg-black/[0.02] px-3 text-xs focus:border-black/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-black/5" />

              {/* Profit Potential Filter */}
              <div>
                <label className="mb-2.5 flex items-center gap-2 text-[13px] font-medium">
                  <TrendingUp className="size-3.5 text-black/40" />
                  Minimum profit potential
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['Any', '£20k+', '£30k+', '£50k+'].map((opt) => (
                    <button
                      key={opt}
                      className="rounded-lg border border-black/10 px-3 py-2 text-xs font-medium hover:border-black/20"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-black/5" />

              {/* Property Type Filter */}
              <div>
                <label className="mb-2.5 flex items-center gap-2 text-[13px] font-medium">
                  <Building className="size-3.5 text-black/40" />
                  Property type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Flat', 'Maisonette', 'Leasehold house'].map((opt) => (
                    <label
                      key={opt}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-black/10 p-3 hover:border-black/20"
                    >
                      <input type="checkbox" className="size-4 rounded" />
                      <span className="text-xs font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-black/5" />

              {/* Opportunity Score Filter */}
              <div>
                <label className="mb-2.5 flex items-center gap-2 text-[13px] font-medium">
                  <Star className="size-3.5 text-black/40" />
                  Minimum opportunity score
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scoreValue}
                    onChange={(e) => setScoreValue(Number(e.target.value))}
                    className="h-2 flex-1 appearance-none rounded-full bg-black/10"
                  />
                  <div className="w-14 rounded-lg border border-black/10 px-2 py-1.5 text-center text-xs">
                    {scoreValue}
                  </div>
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] text-black/40">
                  <span>0 (Any)</span>
                  <span>50</span>
                  <span>100 (Best)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-black/5 bg-[#FAFAFA] p-4">
              <span className="text-xs text-black/50">
                <span className="font-medium text-black">3 filters</span> applied
              </span>
              <div className="flex items-center gap-2">
                <button className="flex h-9 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-xs font-medium hover:bg-black/[0.02]">
                  Clear filters
                </button>
                <button className="flex h-9 items-center gap-2 rounded-full bg-black px-4 text-xs font-medium text-white hover:bg-black/80">
                  <Search className="size-3.5" />
                  Apply & Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Searches */}
        <section className="mb-6">
          <div className="rounded-xl border border-black/10 bg-white">
            <div className="flex items-center gap-2 border-b border-black/5 p-5">
              <RotateCcw className="size-4" />
              <h2 className="text-lg font-semibold">Recent Lease Searches</h2>
            </div>
            <div className="divide-y divide-black/5">
              {recentSearches.map((search) => (
                <div
                  key={search.id}
                  className="group flex items-center justify-between p-5 hover:bg-[#F8F7FF]"
                >
                  <div className="flex flex-1 items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-black/5">
                      <Search className="size-5 text-black/40" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1.5 text-[13px] font-medium">{search.query}</div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-black/50">{search.date}</span>
                        <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium text-black/60">
                          {search.results} results
                        </span>
                        <div className="flex gap-1.5">
                          {search.filters.map((f) => (
                            <span
                              key={f}
                              className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] text-black/50"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="flex h-8 items-center gap-2 rounded-full bg-black px-3 text-xs font-medium text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100">
                    <Play className="size-3" />
                    Run
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mb-6">
          <div className="rounded-xl border border-black/10 bg-white p-6">
            <div className="mb-5 flex items-center gap-2">
              <BarChart3 className="size-5" />
              <h2 className="text-lg font-semibold">UK Short Lease Market Overview</h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-black">
                  <Building className="size-6 text-white" />
                </div>
                <div>
                  <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-black/40">
                    Short lease flats in UK
                  </div>
                  <div className="mb-0.5 text-2xl font-semibold">847,000</div>
                  <div className="text-xs text-black/50">Properties with &lt;80 years remaining</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-black">
                  <PoundSterling className="size-6 text-white" />
                </div>
                <div>
                  <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-black/40">
                    Average profit potential
                  </div>
                  <div className="mb-0.5 text-2xl font-semibold">£32,000</div>
                  <div className="text-xs text-black/50">Based on 60-75 year leases</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-black">
                  <MapPin className="size-6 text-white" />
                </div>
                <div>
                  <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-black/40">
                    Best areas
                  </div>
                  <div className="mb-0.5 text-lg font-semibold">Southend, Colchester, Basildon</div>
                  <div className="text-xs text-black/50">Highest concentration of opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-6">
          <div className="rounded-xl border border-black/10 bg-white">
            <div className="flex items-center gap-2 border-b border-black/5 p-5">
              <Info className="size-4" />
              <h2 className="text-lg font-semibold">How to find the best lease opportunities</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-4 gap-6">
                {[
                  {
                    step: 1,
                    title: 'Choose your area',
                    desc: 'Search by postcode or browse top areas with high opportunity concentration',
                  },
                  {
                    step: 2,
                    title: 'Set lease criteria',
                    desc: 'Filter by lease length - sweet spot is 60-80 years for maximum profit potential',
                  },
                  {
                    step: 3,
                    title: 'Define budget',
                    desc: 'Set your price range and minimum profit expectations to match your strategy',
                  },
                  {
                    step: 4,
                    title: 'Review results',
                    desc: 'Analyze opportunities ranked by profit potential and opportunity score',
                  },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-black text-xl font-semibold text-white">
                      {item.step}
                    </div>
                    <div className="mb-1.5 text-sm font-medium">{item.title}</div>
                    <div className="text-xs leading-relaxed text-black/50">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Top Areas Map */}
        <section className="mb-6">
          <div className="rounded-xl border border-black/10 bg-white">
            <div className="flex items-center justify-between border-b border-black/5 p-5">
              <div className="flex items-center gap-2">
                <MapPinned className="size-4" />
                <h2 className="text-lg font-semibold">Top Lease Opportunity Areas</h2>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-medium hover:underline">
                View full area hotspots
                <ArrowRight className="size-3" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-5 flex h-80 items-center justify-center rounded-xl bg-black/[0.02]">
                <div className="text-center">
                  <Map className="mx-auto mb-3 size-12 text-black/20" />
                  <div className="text-sm text-black/50">Interactive UK Map</div>
                  <div className="text-xs text-black/40">
                    Areas with highest concentration of short lease properties
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {areaHotspots.map((area) => (
                  <div
                    key={area.name}
                    className="cursor-pointer rounded-xl border border-black/10 p-4 transition-colors hover:border-black/20"
                  >
                    <div className="mb-1 text-sm font-medium">{area.name}</div>
                    <div className="mb-2 text-xs text-black/50">{area.codes}</div>
                    <div className="flex items-center gap-1.5 text-xs text-black/60">
                      <Building className="size-3" />
                      <span>{area.count.toLocaleString()} properties</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-6">
          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-xl border border-black/10 bg-white p-5">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-black">
                  <Trophy className="size-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Pro Tips for Success</h3>
                  <p className="text-xs text-black/50">Maximize your lease extension profits</p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Focus on 60-80 year leases - the "sweet spot" for maximum discount and profit',
                  'Properties under 60 years are unmortgageable - bigger discount but harder to finance',
                  'Check ground rent and service charges - high costs can reduce profit margins',
                  'Budget £10-30k for extension costs depending on property value and location',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-black" />
                    <span className="text-black/70">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-5">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-black">
                  <AlertTriangle className="size-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Common Pitfalls to Avoid</h3>
                  <p className="text-xs text-black/50">Watch out for these red flags</p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Avoid properties with marriage value already factored into the asking price',
                  'Check for difficult freeholders who may complicate the extension process',
                  'Properties with major defects can reduce post-extension value significantly',
                  "Don't forget to factor in legal fees, surveyor costs, and holding costs",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs">
                    <X className="mt-0.5 size-3.5 shrink-0 text-black" />
                    <span className="text-black/70">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-6">
          <div className="rounded-xl border-2 border-black bg-[#FAFAFA] p-10 text-center">
            <div className="mx-auto max-w-xl">
              <Rocket className="mx-auto mb-3 size-10" />
              <h2 className="mb-2 text-2xl font-semibold">Ready to find your next opportunity?</h2>
              <p className="mb-5 text-[13px] text-black/60">
                Start searching for short lease properties with high profit potential in your target
                areas
              </p>
              <div className="flex items-center justify-center gap-3">
                <button className="flex h-11 items-center gap-2 rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/80">
                  <Search className="size-4" />
                  Start Searching Now
                </button>
                <button className="flex h-11 items-center gap-2 rounded-full border-2 border-black px-6 text-sm font-medium hover:bg-white">
                  <Map className="size-4" />
                  Browse Area Hotspots
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DashboardFooter />
    </div>
  );
}
