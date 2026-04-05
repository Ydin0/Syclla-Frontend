'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Bookmark,
  Search,
  Check,
  AlertTriangle,
  Briefcase,
  GraduationCap,
  MapPin,
  Train,
  Building,
  FileText,
  Shield,
  TrendingUp,
  BarChart3,
  Scale,
  ChevronRight,
  ShoppingBag,
  Hospital,
  Coffee,
} from 'lucide-react';
import { DashboardHeader } from '@/components/layout';
import { DashboardFooter } from '@/components/layout/dashboard-footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchAreaDetail, type PostcodeDistrict } from '@/lib/api/areas';


const scoreBreakdown = [
  {
    category: 'Yield Potential',
    score: 28,
    max: 35,
    points: [
      'Above average rental yields for the region',
      'Strong rent-to-price ratio',
      'Affordable entry prices compared to London',
    ],
  },
  {
    category: 'Rental Demand',
    score: 22,
    max: 25,
    points: [
      'High demand from young professionals',
      'Low vacancy rates in HMO properties',
      'Growing population in the area',
    ],
  },
  {
    category: 'Transport & Connectivity',
    score: 18,
    max: 25,
    points: [
      'Direct train line to London Liverpool Street',
      'Multiple bus routes serving the area',
      'Good local road network',
    ],
  },
  {
    category: 'Regulatory Environment',
    score: 13,
    max: 15,
    points: [
      'No Article 4 direction in place',
      'Straightforward HMO licensing process',
      'Council supportive of quality HMOs',
    ],
  },
];

const priceTrends = [
  { year: 2025, avgPrice: 265000, change: '+5.2%' },
  { year: 2024, avgPrice: 252000, change: '+4.1%' },
  { year: 2023, avgPrice: 242000, change: '+3.8%' },
  { year: 2022, avgPrice: 233000, change: '+6.2%' },
  { year: 2021, avgPrice: 219000, change: '+8.1%' },
];

const rentTrends = [
  { year: 2025, avgRent: 548, change: '+6.4%' },
  { year: 2024, avgRent: 515, change: '+5.1%' },
  { year: 2023, avgRent: 490, change: '+4.3%' },
  { year: 2022, avgRent: 470, change: '+3.5%' },
  { year: 2021, avgRent: 454, change: '+2.9%' },
];

const propertyTypes = [
  { type: 'Terraced', percentage: 42 },
  { type: 'Semi-detached', percentage: 28 },
  { type: 'Flats', percentage: 18 },
  { type: 'Detached', percentage: 12 },
];

const majorEmployers = [
  { name: 'Southend University Hospital', sector: 'Healthcare' },
  { name: 'Southend Borough Council', sector: 'Public Sector' },
  { name: 'The Forum', sector: 'Education/Culture' },
  { name: 'Olympus KeyMed', sector: 'Medical Technology' },
  { name: 'Ipeco Holdings', sector: 'Manufacturing' },
];

const universities = [
  { name: 'University of Essex Southend', distance: '1.2 miles' },
  { name: 'South Essex College', distance: '0.8 miles' },
  { name: 'Anglia Ruskin University', distance: '18 miles' },
];

const keyAmenities = [
  { name: 'Southend Central Station', type: 'Transport', distance: '0.5 miles' },
  { name: 'Southend Victoria Station', type: 'Transport', distance: '0.8 miles' },
  { name: 'Southend High Street', type: 'Shopping', distance: '0.6 miles' },
  { name: 'Southend Hospital', type: 'Healthcare', distance: '1.5 miles' },
  { name: 'Southend Seafront', type: 'Leisure', distance: '0.4 miles' },
];

const nearbyAreas = [
  { code: 'SS0', name: 'Westcliff-on-Sea', score: 79, yield: 11.2, price: 285000, comparison: 'Higher prices, similar yield' },
  { code: 'SS2', name: 'Prittlewell', score: 74, yield: 10.8, price: 245000, comparison: 'Lower score, more affordable' },
  { code: 'SS3', name: 'Shoeburyness', score: 72, yield: 10.5, price: 255000, comparison: 'Emerging area, good potential' },
  { code: 'SS9', name: 'Leigh-on-Sea', score: 68, yield: 9.2, price: 385000, comparison: 'Premium location, lower yield' },
];

const strengths = [
  'Above-average rental yields compared to national average',
  'Strong transport links to London (55 min to Liverpool Street)',
  'Growing demand from young professionals and students',
  'No Article 4 direction restricting HMO development',
  'Affordable property prices relative to London commuter belt',
];

const considerations = [
  'Seasonal tourism may affect consistent tenant demand',
  'Some areas require HMO licensing',
  'Competition from other landlords in popular streets',
];

const getAmenityIcon = (type: string) => {
  switch (type) {
    case 'Transport':
      return Train;
    case 'Shopping':
      return ShoppingBag;
    case 'Healthcare':
      return Hospital;
    case 'Leisure':
      return Coffee;
    default:
      return MapPin;
  }
};

export default function AreaDetailPage() {
  const params = useParams();
  const areaCode = params.id as string;
  const [areaData, setAreaData] = useState<PostcodeDistrict | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAreaData() {
      try {
        setLoading(true);
        const data = await fetchAreaDetail(areaCode);
        setAreaData(data);
      } catch (err) {
        console.error('Failed to fetch area data:', err);
      } finally {
        setLoading(false);
      }
    }
    if (areaCode) {
      loadAreaData();
    }
  }, [areaCode]);

  const displayData = {
    code: areaData?.code || areaCode,
    name: areaData?.post_town || areaData?.region || areaData?.name || areaCode,
    region: areaData?.region || '—',
    hmoScore: areaData?.hmo_score ?? 0,
    avgPrice: areaData?.average_price ?? null,
    avgRent: areaData?.average_rent ?? null,
    avgYield: areaData?.average_yield ?? null,
    demandScore: areaData?.demand_score ?? 50,
    transportScore: areaData?.transport_score ?? 0,
    hasArticle4: areaData?.has_article_4 ?? false,
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <DashboardHeader currentPath="/dashboard/area-insights" />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
            <p className="text-sm text-black/60">Loading area data...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <DashboardHeader currentPath="/dashboard/area-insights" />

      <main className="flex-1">
        {/* Breadcrumb & Header Section */}
        <section className="border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1440px] px-8 py-6">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard/area-insights"
                  className="rounded-full p-2 hover:bg-black/5"
                >
                  <ArrowLeft className="size-5" />
                </Link>
                <div>
                  <p className="mb-2 text-xs text-black/60">
                    ← Back to Area Insights
                  </p>
                  <h1 className="mb-2 text-3xl font-semibold text-black">
                    {displayData.name}, {displayData.code}
                  </h1>
                  <p className="text-black/60">{displayData.region}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-2 border-black">
                  <Bookmark className="mr-2 size-4" />
                  Save Area
                </Button>
                <Button>
                  <Search className="mr-2 size-4" />
                  Search properties in {displayData.code}
                </Button>
              </div>
            </div>

            {/* HMO Score Display */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-4">
                <Card className="rounded-xl border-2 border-black bg-black text-white">
                  <CardContent className="p-6">
                    <div className="mb-2 text-sm text-white/70">HMO Score</div>
                    <div className="mb-3 flex items-baseline gap-2">
                      <span className="text-5xl font-bold">{displayData.hmoScore}</span>
                      <span className="text-xl text-white/70">/100</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${displayData.hmoScore}%` }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-white/70">
                      {displayData.hmoScore >= 80
                        ? 'Excellent investment potential'
                        : displayData.hmoScore >= 60
                          ? 'Good investment potential'
                          : 'Moderate investment potential'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Key Metrics Grid */}
              <div className="col-span-8 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-black/10 p-4">
                  <div className="mb-1 text-xs text-black/60">Avg Property Price</div>
                  <div className="text-2xl font-semibold">
                    {displayData.avgPrice ? `£${displayData.avgPrice.toLocaleString()}` : '—'}
                  </div>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <div className="mb-1 text-xs text-black/60">Avg Price/sqm</div>
                  <div className="text-2xl font-semibold">—</div>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <div className="mb-1 text-xs text-black/60">Avg Room Rent</div>
                  <div className="text-2xl font-semibold">{displayData.avgRent ? `£${displayData.avgRent}/mo` : '—'}</div>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <div className="mb-1 text-xs text-black/60">Est. HMO Yield</div>
                  <div className="text-2xl font-semibold">{displayData.avgYield ? `${displayData.avgYield}%` : '—'}</div>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <div className="mb-1 text-xs text-black/60">Room Demand</div>
                  <div className="text-2xl font-semibold">{displayData.demandScore}/100</div>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <div className="mb-1 text-xs text-black/60">Properties in Area</div>
                  <div className="text-2xl font-semibold">—</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px] px-8 py-8">
          {/* Score Breakdown Section */}
          <section className="mb-8">
            <Card className="rounded-xl border border-black/10">
              <div className="border-b border-black/10 px-6 py-4">
                <h2 className="text-xl font-semibold">Score Breakdown</h2>
                <p className="mt-1 text-sm text-black/60">
                  How the HMO score is calculated for {displayData.name}
                </p>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  {scoreBreakdown.map((item) => (
                    <div key={item.category} className="rounded-xl border border-black/10 p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-semibold">{item.category}</h3>
                        <span className="text-lg font-semibold">
                          {item.score}/{item.max}
                        </span>
                      </div>
                      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-black/10">
                        <div
                          className="h-full rounded-full bg-black"
                          style={{ width: `${(item.score / item.max) * 100}%` }}
                        />
                      </div>
                      <ul className="space-y-2">
                        {item.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-black/70">
                            <Check className="mt-0.5 size-4 shrink-0 text-black/40" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Market Data Section */}
          <section className="mb-8">
            <Card className="rounded-xl border border-black/10">
              <div className="border-b border-black/10 px-6 py-4">
                <h2 className="text-xl font-semibold">Market Data</h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Price Trends */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 font-semibold">
                      <TrendingUp className="size-4" />
                      Price Trends (5 Year)
                    </h3>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-black/10 bg-[#FAFAFA]">
                          <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-black/60">Year</th>
                          <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wide text-black/60">Avg Price</th>
                          <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wide text-black/60">Change</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/10">
                        {priceTrends.map((row) => (
                          <tr key={row.year} className="hover:bg-black/2">
                            <td className="px-3 py-2 text-sm">{row.year}</td>
                            <td className="px-3 py-2 text-right text-sm font-medium">
                              £{row.avgPrice.toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-right text-sm text-emerald-600">
                              {row.change}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Room Rent Trends */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 font-semibold">
                      <BarChart3 className="size-4" />
                      Room Rent Trends
                    </h3>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-black/10 bg-[#FAFAFA]">
                          <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-black/60">Year</th>
                          <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wide text-black/60">Avg Rent</th>
                          <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wide text-black/60">Change</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/10">
                        {rentTrends.map((row) => (
                          <tr key={row.year} className="hover:bg-black/2">
                            <td className="px-3 py-2 text-sm">{row.year}</td>
                            <td className="px-3 py-2 text-right text-sm font-medium">
                              £{row.avgRent}/mo
                            </td>
                            <td className="px-3 py-2 text-right text-sm text-emerald-600">
                              {row.change}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-4 rounded-lg bg-[#FAFAFA] p-3">
                      <div className="text-xs text-black/60">5-Year Rent Growth</div>
                      <div className="text-lg font-semibold text-emerald-600">+20.7%</div>
                    </div>
                  </div>

                  {/* Property Type Breakdown */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 font-semibold">
                      <Building className="size-4" />
                      Property Type Breakdown
                    </h3>
                    <div className="space-y-3">
                      {propertyTypes.map((item) => (
                        <div key={item.type}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>{item.type}</span>
                            <span className="font-medium">{item.percentage}%</span>
                          </div>
                          <div className="h-3 w-full overflow-hidden rounded-full bg-black/10">
                            <div
                              className="h-full rounded-full bg-black"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-black/50">
                      Terraced and semi-detached properties are most common, ideal for HMO conversions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Local Information Section */}
          <section className="mb-8">
            <Card className="rounded-xl border border-black/10">
              <div className="border-b border-black/10 px-6 py-4">
                <h2 className="text-xl font-semibold">Local Information</h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Major Employers */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 font-semibold">
                      <Briefcase className="size-4" />
                      Major Employers
                    </h3>
                    <div className="space-y-3">
                      {majorEmployers.map((employer) => (
                        <div key={employer.name} className="flex items-center justify-between border-b border-black/5 pb-3 last:border-0">
                          <div>
                            <div className="text-sm font-medium">{employer.name}</div>
                            <div className="text-xs text-black/50">{employer.sector}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Universities & Colleges */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 font-semibold">
                      <GraduationCap className="size-4" />
                      Universities & Colleges
                    </h3>
                    <div className="space-y-3">
                      {universities.map((uni) => (
                        <div key={uni.name} className="flex items-center justify-between border-b border-black/5 pb-3 last:border-0">
                          <div className="text-sm font-medium">{uni.name}</div>
                          <div className="text-xs text-black/50">{uni.distance}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-lg bg-[#FAFAFA] p-3">
                      <div className="text-xs text-black/60">Student Population</div>
                      <div className="text-lg font-semibold">~12,000</div>
                    </div>
                  </div>

                  {/* Key Amenities */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 font-semibold">
                      <MapPin className="size-4" />
                      Key Amenities
                    </h3>
                    <div className="space-y-3">
                      {keyAmenities.map((amenity) => {
                        const Icon = getAmenityIcon(amenity.type);
                        return (
                          <div key={amenity.name} className="flex items-center justify-between border-b border-black/5 pb-3 last:border-0">
                            <div className="flex items-center gap-2">
                              <Icon className="size-4 text-black/40" />
                              <div className="text-sm">{amenity.name}</div>
                            </div>
                            <div className="text-xs text-black/50">{amenity.distance}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Nearby Areas Comparison */}
          <section className="mb-8">
            <Card className="rounded-xl border border-black/10">
              <div className="border-b border-black/10 px-6 py-4">
                <h2 className="text-xl font-semibold">Nearby Areas Comparison</h2>
                <p className="mt-1 text-sm text-black/60">
                  Compare {displayData.code} with neighboring postcode areas
                </p>
              </div>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-black/10 bg-[#FAFAFA]">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-black/60">Area</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-black/60">HMO Score</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-black/60">Avg Yield</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-black/60">Avg Price</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-black/60">Comparison</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-black/60">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {/* Current Area Row */}
                    <tr className="bg-black/2">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-black px-2 py-0.5 text-xs font-medium text-white">Current</span>
                          <div>
                            <div className="font-medium">{displayData.name}</div>
                            <div className="text-xs text-black/50">{displayData.code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-1.5 w-12 overflow-hidden rounded-full bg-black/10">
                            <div className="h-full rounded-full bg-black" style={{ width: `${displayData.hmoScore}%` }} />
                          </div>
                          <span className="font-semibold">{displayData.hmoScore}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">{displayData.avgYield}%</td>
                      <td className="px-6 py-4 text-right font-medium">£{displayData.avgPrice?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-black/60">—</td>
                      <td className="px-6 py-4 text-center">—</td>
                    </tr>
                    {/* Nearby Areas */}
                    {nearbyAreas.map((area) => (
                      <tr key={area.code} className="hover:bg-black/2">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{area.name}</div>
                            <div className="text-xs text-black/50">{area.code}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="h-1.5 w-12 overflow-hidden rounded-full bg-black/10">
                              <div className="h-full rounded-full bg-black" style={{ width: `${area.score}%` }} />
                            </div>
                            <span className="font-medium">{area.score}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">{area.yield}%</td>
                        <td className="px-6 py-4 text-right">£{area.price.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-black/60">{area.comparison}</td>
                        <td className="px-6 py-4 text-center">
                          <Link
                            href={`/dashboard/area-insights/${area.code}`}
                            className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                          >
                            View <ChevronRight className="size-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>

          {/* Market Insights Section */}
          <section className="mb-8">
            <Card className="rounded-xl border border-black/10">
              <div className="border-b border-black/10 px-6 py-4">
                <h2 className="text-xl font-semibold">Market Insights</h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Investment Opportunity Score */}
                  <div className="rounded-xl border border-black/10 p-5">
                    <h3 className="mb-4 font-semibold">Investment Opportunity Score</h3>
                    <div className="mb-4 flex h-48 items-center justify-center rounded-xl bg-[#FAFAFA]">
                      <div className="text-center">
                        <BarChart3 className="mx-auto mb-2 size-12 text-black/20" />
                        <p className="text-xs text-black/50">Radar chart visualization</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-[#FAFAFA] p-3">
                        <div className="text-xs text-black/60">Overall Rating</div>
                        <div className="text-xl font-semibold">A-</div>
                      </div>
                      <div className="rounded-lg bg-[#FAFAFA] p-3">
                        <div className="text-xs text-black/60">Risk Level</div>
                        <div className="text-xl font-semibold">Low-Medium</div>
                      </div>
                    </div>
                  </div>

                  {/* Historical Performance */}
                  <div className="rounded-xl border border-black/10 p-5">
                    <h3 className="mb-4 font-semibold">Historical Performance</h3>
                    <div className="mb-4 flex h-48 items-center justify-center rounded-xl bg-[#FAFAFA]">
                      <div className="text-center">
                        <TrendingUp className="mx-auto mb-2 size-12 text-black/20" />
                        <p className="text-xs text-black/50">Line chart visualization</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-[#FAFAFA] p-3">
                        <div className="text-xs text-black/60">5-Year Price Growth</div>
                        <div className="text-xl font-semibold text-emerald-600">+21.0%</div>
                      </div>
                      <div className="rounded-lg bg-[#FAFAFA] p-3">
                        <div className="text-xs text-black/60">5-Year Rental Growth</div>
                        <div className="text-xl font-semibold text-emerald-600">+20.7%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Regulatory & Licensing Section */}
          <section className="mb-8">
            <Card className="rounded-xl border border-black/10">
              <div className="border-b border-black/10 px-6 py-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Scale className="size-5" />
                  Regulatory & Licensing
                </h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Article 4 Status */}
                  <div className="rounded-xl border border-black/10 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold">Article 4 Status</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${displayData.hasArticle4 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {displayData.hasArticle4 ? 'In Force' : 'Not in Force'}
                      </span>
                    </div>
                    <p className="text-sm text-black/60">
                      {displayData.hasArticle4
                        ? 'Planning permission required to convert a property to HMO use.'
                        : 'No special planning permission required for HMO conversion in this area. Standard permitted development rights apply.'}
                    </p>
                  </div>

                  {/* Licensing Requirements */}
                  <div className="rounded-xl border border-black/10 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold">Licensing Requirements</h3>
                      <FileText className="size-5 text-black/40" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 text-emerald-500" />
                        <div>
                          <div className="text-sm font-medium">Mandatory HMO Licence</div>
                          <div className="text-xs text-black/50">Required for 5+ occupants from 2+ households</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="mt-0.5 size-4 text-amber-500" />
                        <div>
                          <div className="text-sm font-medium">Additional Licensing</div>
                          <div className="text-xs text-black/50">Check with local council for smaller HMOs</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Council Stance */}
                  <div className="rounded-xl border border-black/10 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold">Council Stance</h3>
                      <Shield className="size-5 text-black/40" />
                    </div>
                    <div className="mb-3">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                        Generally Favorable
                      </span>
                    </div>
                    <p className="text-sm text-black/60">
                      Southend-on-Sea Borough Council has a neutral-to-positive approach to quality HMO developments. Focus on maintaining housing standards and community integration.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Investment Summary Section */}
          <section className="mb-8">
            <Card className="rounded-xl border border-black/10">
              <div className="border-b border-black/10 px-6 py-4">
                <h2 className="text-xl font-semibold">Investment Summary</h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-12 gap-6">
                  {/* Strengths */}
                  <div className="col-span-5">
                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-emerald-700">
                      <Check className="size-5" />
                      Strengths
                    </h3>
                    <ul className="space-y-3">
                      {strengths.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 rounded-lg bg-emerald-50 p-3">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                          <span className="text-sm text-emerald-800">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Considerations */}
                  <div className="col-span-4">
                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-amber-700">
                      <AlertTriangle className="size-5" />
                      Considerations
                    </h3>
                    <ul className="space-y-3">
                      {considerations.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 rounded-lg bg-amber-50 p-3">
                          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                          <span className="text-sm text-amber-800">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Overall Recommendation */}
                  <div className="col-span-3">
                    <div className="h-full rounded-xl bg-black p-5 text-white">
                      <h3 className="mb-3 text-sm font-medium text-white/70">Overall Recommendation</h3>
                      <div className="mb-2 text-3xl font-bold">Strong Buy</div>
                      <div className="mb-4 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            className={`size-4 rounded-full ${star <= 4 ? 'bg-white' : 'bg-white/30'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-white/70">
                        {displayData.name} offers excellent HMO investment opportunities with strong yields and favorable market conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="mb-8">
            <Card className="rounded-xl border border-black/10 bg-[#FAFAFA]">
              <CardContent className="p-8 text-center">
                <h2 className="mb-2 text-2xl font-semibold">Ready to invest in {displayData.code}?</h2>
                <p className="mb-6 text-black/60">
                  Explore available properties or compare with other areas
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Button size="lg" className="px-6">
                    <Search className="mr-2 size-4" />
                    Search properties
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-black px-6">
                    Compare with other areas
                  </Button>
                  <Button size="lg" variant="outline" className="px-6">
                    <Bookmark className="mr-2 size-4" />
                    Save this area
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
