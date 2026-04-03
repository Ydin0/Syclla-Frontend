'use client';
import React, { useState } from 'react';
import { Building2, ArrowLeft, Pen, Save, Download, List, Map, Filter, X, Clock, PoundSterling, TrendingUp, Star, Bed, Check, Heart, ChevronLeft, ChevronRight, Scale, Lightbulb, Info, Settings, Bell } from 'lucide-react';
import { DashboardHeader } from '@/components/layout';

const properties = [
  { id: 1, address: 'Flat 4, 23 Marine Parade', postcode: 'SS1 2EJ', lease: 63, price: 145000, ppsqm: 2417, size: 60, beds: 2, extended: 195000, profit: 42000, score: 91 },
  { id: 2, address: 'Flat 3, 31 Warrior Square', postcode: 'SS1 2JY', lease: 61, price: 155000, ppsqm: 2214, size: 70, beds: 2, extended: 210000, profit: 47000, score: 89 },
  { id: 3, address: '15A Southchurch Road', postcode: 'SS1 2ND', lease: 58, price: 125000, ppsqm: 2273, size: 55, beds: 2, extended: 178000, profit: 45000, score: 88 },
  { id: 4, address: '22B Clifftown Road', postcode: 'SS1 1AB', lease: 66, price: 175000, ppsqm: 2500, size: 70, beds: 2, extended: 225000, profit: 41000, score: 85 },
  { id: 5, address: 'Flat 2, 8 York Road', postcode: 'SS1 2BN', lease: 71, price: 135000, ppsqm: 2700, size: 50, beds: 1, extended: 172000, profit: 31000, score: 84 },
  { id: 6, address: 'Flat 1, 9 Pleasant Road', postcode: 'SS1 2LB', lease: 69, price: 140000, ppsqm: 2545, size: 55, beds: 2, extended: 180000, profit: 33000, score: 81 },
  { id: 7, address: 'Flat 6, 44 London Road', postcode: 'SS1 1PG', lease: 72, price: 155000, ppsqm: 2583, size: 60, beds: 2, extended: 188000, profit: 28000, score: 79 },
  { id: 8, address: '8C Alexandra Street', postcode: 'SS1 1BU', lease: 74, price: 165000, ppsqm: 2357, size: 70, beds: 3, extended: 198000, profit: 26000, score: 74 },
];

const getLeaseStatus = (years: number) => {
  if (years < 60) return { color: 'bg-red-500', label: 'Unmortgageable' };
  if (years < 70) return { color: 'bg-amber-500', label: 'Sweet spot' };
  return { color: 'bg-yellow-400', label: 'Good' };
};

const getScoreStatus = (score: number) => {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
};

export default function PropInvestLeaseResults() {
  const [selectedProps, setSelectedProps] = useState<number[]>([]);
  const [activeFilters] = useState(['<80 years', 'SS1 area', '2 beds']);

  const toggleSelect = (id: number) => {
    setSelectedProps(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader currentPath="/dashboard/lease-opportunities" />

      {/* Search Context */}
      <section className="border-b border-black/10 bg-[#FAFAFA]">
        <div className="mx-auto px-8 py-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="flex size-9 items-center justify-center rounded-full hover:bg-black/5"><ArrowLeft className="size-4" /></button>
              <div>
                <div className="text-xs text-black/50">Search results for</div>
                <div className="text-lg font-semibold">SS1, Southend-on-Sea - Leases under 80 years</div>
              </div>
              <button className="ml-2 flex h-8 items-center gap-2 rounded-full border border-black/10 bg-white px-3 text-xs font-medium hover:bg-black/[0.02]">
                <Pen className="size-3" /> Edit search
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-8 items-center gap-2 rounded-full border border-black/10 bg-white px-3 text-xs font-medium hover:bg-black/[0.02]"><Save className="size-3" /> Save search</button>
              <button className="flex h-8 items-center gap-2 rounded-full border border-black/10 bg-white px-3 text-xs font-medium hover:bg-black/[0.02]"><Download className="size-3" /> Export CSV</button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-black/40" />
              <span className="text-2xl font-semibold">156</span>
              <span className="text-black/60">lease opportunities found</span>
            </div>
            <div className="flex overflow-hidden rounded-lg border border-black/10 bg-white">
              <button className="flex size-8 items-center justify-center bg-black text-white"><List className="size-4" /></button>
              <button className="flex size-8 items-center justify-center text-black/40 hover:bg-black/5"><Map className="size-4" /></button>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <aside className="col-span-3">
            <div className="sticky top-20 rounded-xl border border-black/10 bg-white">
              <div className="flex items-center justify-between border-b border-black/5 p-4">
                <div className="flex items-center gap-2 text-sm font-medium"><Filter className="size-4" /> Filters</div>
                <button className="text-xs text-black/50 hover:text-black">Clear all</button>
              </div>
              <div className="space-y-5 p-4">
                <div className="border-b border-black/5 pb-4">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-black/40">Active filters (3)</div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeFilters.map(f => (
                      <span key={f} className="flex items-center gap-1.5 rounded-full bg-black px-2.5 py-1 text-[10px] font-medium text-white">
                        {f} <X className="size-3 cursor-pointer hover:text-white/70" />
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2.5 flex items-center gap-2 text-xs font-medium"><Clock className="size-3.5 text-black/40" /> Lease years remaining</div>
                  <div className="space-y-1.5">
                    {['<60 yrs (Unmortgageable)', '60-70 yrs (Sweet spot)', '70-80 yrs (Good)'].map((opt, i) => (
                      <button key={opt} className={`w-full rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${i === 0 ? 'border-black bg-black text-white' : 'border-black/10 hover:border-black/20'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-black/5" />
                <div>
                  <div className="mb-2.5 flex items-center gap-2 text-xs font-medium"><PoundSterling className="size-3.5 text-black/40" /> Price range</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['Any', '<£150k', '£150-250k', '£250k+'].map(p => (
                      <button key={p} className="rounded-lg border border-black/10 px-2 py-1.5 text-[10px] font-medium hover:border-black/20">{p}</button>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-black/5" />
                <div>
                  <div className="mb-2.5 flex items-center gap-2 text-xs font-medium"><TrendingUp className="size-3.5 text-black/40" /> Estimated profit</div>
                  <select className="w-full rounded-lg border border-black/10 bg-black/[0.02] px-3 py-2 text-xs focus:border-black/20 focus:outline-none">
                    <option>Any profit</option>
                    <option>£20,000+</option>
                    <option>£30,000+</option>
                    <option>£50,000+</option>
                  </select>
                </div>
                <div className="h-px bg-black/5" />
                <div>
                  <div className="mb-2.5 flex items-center gap-2 text-xs font-medium"><Star className="size-3.5 text-black/40" /> Opportunity score</div>
                  <input type="range" min="0" max="100" defaultValue="60" className="w-full" />
                  <div className="mt-1 flex justify-between text-[10px] text-black/40"><span>0</span><span>50</span><span>100</span></div>
                </div>
                <div className="h-px bg-black/5" />
                <div>
                  <div className="mb-2.5 flex items-center gap-2 text-xs font-medium"><Bed className="size-3.5 text-black/40" /> Bedrooms</div>
                  <div className="space-y-2">
                    {['1 bedroom', '2 bedrooms', '3 bedrooms', '4+ bedrooms'].map((b, i) => (
                      <label key={b} className="flex cursor-pointer items-center gap-2 text-xs">
                        <input type="checkbox" defaultChecked={i === 1} className="size-4 rounded" /> {b}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-black/5 bg-[#FAFAFA] p-4">
                <button className="flex h-9 w-full items-center justify-center gap-2 rounded-full bg-black text-sm font-medium text-white hover:bg-black/80">
                  <Check className="size-4" /> Apply filters
                </button>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="col-span-9 space-y-5">
            {/* Summary Stats */}
            <div className="flex items-center gap-8 rounded-xl border border-black/10 bg-white p-5">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-black/40">Avg lease remaining</div>
                <div className="mt-1 text-2xl font-semibold">67 years</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-black/50"><span className="size-2 rounded-full bg-amber-500" /> Sweet spot range</div>
              </div>
              <div className="h-12 w-px bg-black/10" />
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-black/40">Avg asking price</div>
                <div className="mt-1 text-2xl font-semibold">£152,000</div>
                <div className="mt-0.5 text-[10px] text-black/50">£2,451/sqm average</div>
              </div>
              <div className="h-12 w-px bg-black/10" />
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-black/40">Avg profit potential</div>
                <div className="mt-1 text-2xl font-semibold">£36,000</div>
                <div className="mt-0.5 text-[10px] text-black/50">After extension costs</div>
              </div>
              <div className="h-12 w-px bg-black/10" />
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-black/40">Best opportunity</div>
                <div className="mt-1 text-sm font-medium">Flat 3, 31 Warrior Square</div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="rounded-full bg-black px-2 py-0.5 text-[10px] font-medium text-white">£47k profit</span>
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium text-black/60">Score: 89</span>
                </div>
              </div>
            </div>

            {/* Results Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs text-black/50">Showing <span className="text-black">1-20</span> of <span className="text-black">156</span></span>
                <label className="flex cursor-pointer items-center gap-2 text-xs text-black/50">
                  <input type="checkbox" className="size-4 rounded" /> Select all visible
                </label>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-black/50">Sort by:</span>
                <select className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs focus:border-black/20 focus:outline-none">
                  <option>Opportunity Score (High to Low)</option>
                  <option>Profit Potential (High to Low)</option>
                  <option>Lease Years (Low to High)</option>
                </select>
              </div>
            </div>

            {/* Results Table */}
            <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/10 bg-[#FAFAFA]">
                    <th className="w-10 p-3"><input type="checkbox" className="size-4 rounded" /></th>
                    <th className="p-3 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">Address</th>
                    <th className="p-3 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">Lease Left</th>
                    <th className="p-3 text-right text-[10px] font-semibold uppercase tracking-wider text-black/40">Price</th>
                    <th className="p-3 text-right text-[10px] font-semibold uppercase tracking-wider text-black/40">£/sqm</th>
                    <th className="p-3 text-center text-[10px] font-semibold uppercase tracking-wider text-black/40">Size</th>
                    <th className="p-3 text-center text-[10px] font-semibold uppercase tracking-wider text-black/40">Beds</th>
                    <th className="p-3 text-right text-[10px] font-semibold uppercase tracking-wider text-black/40">Extended</th>
                    <th className="p-3 text-right text-[10px] font-semibold uppercase tracking-wider text-black/40">Est. Profit</th>
                    <th className="p-3 text-center text-[10px] font-semibold uppercase tracking-wider text-black/40">Score</th>
                    <th className="w-10 p-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {properties.map(p => (
                    <tr key={p.id} className="group cursor-pointer transition-colors hover:bg-[#F8F7FF]">
                      <td className="p-3"><input type="checkbox" checked={selectedProps.includes(p.id)} onChange={() => toggleSelect(p.id)} className="size-4 rounded" /></td>
                      <td className="p-3">
                        <div className="text-[13px] font-medium">{p.address}</div>
                        <div className="text-[11px] text-black/50">{p.postcode}, Southend</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className={`size-2 rounded-full ${getLeaseStatus(p.lease).color}`} />
                          <span className="text-[13px]">{p.lease} years</span>
                        </div>
                      </td>
                      <td className="p-3 text-right text-[13px]">£{p.price.toLocaleString()}</td>
                      <td className="p-3 text-right text-[13px] text-black/50">£{p.ppsqm.toLocaleString()}</td>
                      <td className="p-3 text-center text-[13px]">{p.size} sqm</td>
                      <td className="p-3 text-center text-[13px]">{p.beds}</td>
                      <td className="p-3 text-right text-[13px]">£{p.extended.toLocaleString()}</td>
                      <td className="p-3 text-right text-[13px] font-medium">£{p.profit.toLocaleString()}</td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className={`size-2 rounded-full ${getScoreStatus(p.score)}`} />
                          <span className="text-[13px] font-medium">{p.score}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <button className="flex size-8 items-center justify-center rounded-full text-black/30 opacity-0 transition-all hover:bg-black/5 hover:text-black group-hover:opacity-100">
                          <Heart className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between border-t border-black/5 bg-[#FAFAFA] px-4 py-3">
                <span className="text-xs text-black/50">Page 1 of 8</span>
                <div className="flex items-center gap-1">
                  <button disabled className="flex size-8 items-center justify-center rounded-lg border border-black/10 bg-white text-black/30"><ChevronLeft className="size-4" /></button>
                  {[1, 2, 3, 4].map(n => (
                    <button key={n} className={`flex size-8 items-center justify-center rounded-lg text-xs font-medium ${n === 1 ? 'bg-black text-white' : 'border border-black/10 bg-white hover:bg-black/[0.02]'}`}>{n}</button>
                  ))}
                  <span className="px-1 text-black/30">...</span>
                  <button className="flex size-8 items-center justify-center rounded-lg border border-black/10 bg-white text-xs font-medium hover:bg-black/[0.02]">8</button>
                  <button className="flex size-8 items-center justify-center rounded-lg border border-black/10 bg-white hover:bg-black/[0.02]"><ChevronRight className="size-4" /></button>
                </div>
                <select className="rounded-lg border border-black/10 bg-white px-2 py-1 text-xs"><option>20 per page</option></select>
              </div>
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center justify-between rounded-xl border border-black/10 bg-[#FAFAFA] p-4">
              <span className="text-xs text-black/50"><span className="font-medium text-black">{selectedProps.length} properties</span> selected</span>
              <div className="flex items-center gap-2">
                {[{ icon: Heart, label: 'Add to Watchlist' }, { icon: Download, label: 'Export Selected' }, { icon: Scale, label: 'Compare Selected' }].map(a => (
                  <button key={a.label} disabled={!selectedProps.length} className="flex h-8 items-center gap-2 rounded-full border border-black/10 bg-white px-3 text-xs font-medium transition-colors hover:bg-black/[0.02] disabled:cursor-not-allowed disabled:opacity-40">
                    <a.icon className="size-3.5" /> {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div className="rounded-xl border border-black/10 bg-white">
              <div className="flex items-center gap-2 border-b border-black/5 p-5">
                <Lightbulb className="size-5 text-black/40" />
                <h2 className="text-lg font-semibold">SS1 Area Insights</h2>
              </div>
              <div className="p-5">
                <div className="mb-5 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-black/40">Average lease length</div>
                    <div className="mt-1 text-2xl font-semibold">67 years</div>
                    <div className="mt-0.5 text-[10px] text-black/50">12% below national average</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-black/40">Properties under 80 years</div>
                    <div className="mt-1 text-2xl font-semibold">1,847</div>
                    <div className="mt-0.5 text-[10px] text-black/50">23% of all flats in area</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-black/40">Typical extension cost</div>
                    <div className="mt-1 text-2xl font-semibold">£18,500</div>
                    <div className="mt-0.5 text-[10px] text-black/50">Based on local valuations</div>
                  </div>
                </div>
                <div className="flex gap-3 rounded-xl border border-black/5 bg-[#FAFAFA] p-4">
                  <Info className="mt-0.5 size-4 shrink-0 text-black/40" />
                  <div>
                    <div className="text-sm font-medium">Why SS1 is a strong market for lease extensions</div>
                    <p className="mt-1 text-xs leading-relaxed text-black/60">SS1 has a high concentration of Victorian and Edwardian conversions with original 99-year leases from the 1960s-1980s, many now approaching the critical 80-year threshold. Strong rental demand from London commuters and local amenities support good post-extension values.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Search CTA */}
            <div className="rounded-xl border-2 border-black bg-[#FAFAFA] p-6">
              <div className="flex items-start gap-5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-black">
                  <Bell className="size-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Get alerts for new opportunities</h3>
                  <p className="mt-1 text-sm text-black/60">Save this search and we&apos;ll email you when new properties matching your criteria come on the market in SS1.</p>
                  <div className="mt-4 flex items-center gap-2">
                    <button className="flex h-9 items-center gap-2 rounded-full bg-black px-4 text-sm font-medium text-white hover:bg-black/80"><Save className="size-4" /> Save this search</button>
                    <button className="flex h-9 items-center gap-2 rounded-full border-2 border-black px-4 text-sm font-medium hover:bg-white"><Settings className="size-4" /> Configure alerts</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
