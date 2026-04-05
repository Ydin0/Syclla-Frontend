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
  MapPin,
  Train,
  FileText,
  Shield,
  TrendingUp,
  BarChart3,
  Scale,
  ChevronRight,
} from 'lucide-react';
import { DashboardHeader } from '@/components/layout';
import { DashboardFooter } from '@/components/layout/dashboard-footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchAreaDetail, type PostcodeDistrict } from '@/lib/api/areas';

function getScoreLabel(score: number) {
  if (score >= 80) return 'Excellent investment potential';
  if (score >= 60) return 'Good investment potential';
  if (score >= 40) return 'Moderate investment potential';
  return 'Limited investment potential';
}

function getDemandLabel(score: number) {
  if (score >= 70) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
}

function getRecommendation(score: number) {
  if (score >= 80) return { label: 'Strong Buy', stars: 5 };
  if (score >= 70) return { label: 'Buy', stars: 4 };
  if (score >= 60) return { label: 'Consider', stars: 3 };
  if (score >= 40) return { label: 'Caution', stars: 2 };
  return { label: 'Avoid', stars: 1 };
}

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

  const d = {
    code: areaData?.code || areaCode,
    name: areaData?.post_town || areaData?.region || areaData?.name || areaCode,
    region: areaData?.region || '—',
    ukRegion: areaData?.uk_region || '',
    hmoScore: areaData?.hmo_score ?? 0,
    avgPrice: areaData?.average_price ?? null,
    avgRent: areaData?.average_rent ?? null,
    avgYield: areaData?.average_yield ?? null,
    demandScore: areaData?.demand_score ?? 0,
    transportScore: areaData?.transport_score ?? 0,
    hasArticle4: areaData?.has_article_4 ?? false,
    studentArea: areaData?.student_area ?? false,
    councilAttitude: areaData?.council_attitude_score ?? 5,
    population: areaData?.population ?? null,
    households: areaData?.households ?? null,
  };

  const recommendation = getRecommendation(d.hmoScore);

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
                    {d.name}, {d.code}
                  </h1>
                  <p className="text-black/60">{d.region}{d.ukRegion ? `, ${d.ukRegion}` : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-2 border-black">
                  <Bookmark className="mr-2 size-4" />
                  Save Area
                </Button>
                <Button>
                  <Search className="mr-2 size-4" />
                  Search properties in {d.code}
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
                      <span className="text-5xl font-bold">{d.hmoScore}</span>
                      <span className="text-xl text-white/70">/100</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${d.hmoScore}%` }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-white/70">
                      {getScoreLabel(d.hmoScore)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Key Metrics Grid */}
              <div className="col-span-8 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-black/10 p-4">
                  <div className="mb-1 text-xs text-black/60">Avg Property Price</div>
                  <div className="text-2xl font-semibold">
                    {d.avgPrice ? `£${d.avgPrice.toLocaleString()}` : '—'}
                  </div>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <div className="mb-1 text-xs text-black/60">Avg Room Rent</div>
                  <div className="text-2xl font-semibold">
                    {d.avgRent ? `£${d.avgRent}/mo` : '—'}
                  </div>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <div className="mb-1 text-xs text-black/60">Est. HMO Yield</div>
                  <div className="text-2xl font-semibold">
                    {d.avgYield ? `${d.avgYield}%` : '—'}
                  </div>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <div className="mb-1 text-xs text-black/60">Room Demand</div>
                  <div className="text-2xl font-semibold">{d.demandScore}/100</div>
                  <div className="text-xs text-black/40">{getDemandLabel(d.demandScore)}</div>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <div className="mb-1 text-xs text-black/60">Transport Score</div>
                  <div className="text-2xl font-semibold">{d.transportScore}/100</div>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <div className="mb-1 text-xs text-black/60">Population</div>
                  <div className="text-2xl font-semibold">
                    {d.population ? d.population.toLocaleString() : '—'}
                  </div>
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
                  How the HMO score is calculated for {d.name}
                </p>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-xl border border-black/10 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold">Yield Potential</h3>
                      <span className="text-lg font-semibold">
                        {d.avgYield ? `${d.avgYield}%` : '—'}
                      </span>
                    </div>
                    <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-black/10">
                      <div
                        className="h-full rounded-full bg-black"
                        style={{ width: `${Math.min((d.avgYield ?? 0) / 15 * 100, 100)}%` }}
                      />
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-black/70">
                        <Check className="mt-0.5 size-4 shrink-0 text-black/40" />
                        Average property price: {d.avgPrice ? `£${d.avgPrice.toLocaleString()}` : 'N/A'}
                      </li>
                      <li className="flex items-start gap-2 text-sm text-black/70">
                        <Check className="mt-0.5 size-4 shrink-0 text-black/40" />
                        Average room rent: {d.avgRent ? `£${d.avgRent}/mo` : 'N/A'}
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-black/10 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold">Rental Demand</h3>
                      <span className="text-lg font-semibold">
                        {d.demandScore}/100
                      </span>
                    </div>
                    <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-black/10">
                      <div
                        className="h-full rounded-full bg-black"
                        style={{ width: `${d.demandScore}%` }}
                      />
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-black/70">
                        <Check className="mt-0.5 size-4 shrink-0 text-black/40" />
                        Demand level: {getDemandLabel(d.demandScore)}
                      </li>
                      {d.studentArea && (
                        <li className="flex items-start gap-2 text-sm text-black/70">
                          <Check className="mt-0.5 size-4 shrink-0 text-black/40" />
                          Student area — additional demand from students
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-black/10 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold">Transport & Connectivity</h3>
                      <span className="text-lg font-semibold">
                        {d.transportScore}/100
                      </span>
                    </div>
                    <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-black/10">
                      <div
                        className="h-full rounded-full bg-black"
                        style={{ width: `${d.transportScore}%` }}
                      />
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-black/70">
                        <Train className="mt-0.5 size-4 shrink-0 text-black/40" />
                        Transport accessibility score based on rail connectivity to major cities
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-black/10 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold">Regulatory Environment</h3>
                      <span className="text-lg font-semibold">
                        {d.councilAttitude}/10
                      </span>
                    </div>
                    <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-black/10">
                      <div
                        className="h-full rounded-full bg-black"
                        style={{ width: `${d.councilAttitude * 10}%` }}
                      />
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-black/70">
                        {d.hasArticle4 ? (
                          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
                        ) : (
                          <Check className="mt-0.5 size-4 shrink-0 text-black/40" />
                        )}
                        Article 4 Direction: {d.hasArticle4 ? 'In force — planning permission required' : 'Not in force'}
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Area Demographics */}
          <section className="mb-8">
            <Card className="rounded-xl border border-black/10">
              <div className="border-b border-black/10 px-6 py-4">
                <h2 className="text-xl font-semibold">Area Demographics</h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="rounded-xl border border-black/10 p-4 text-center">
                    <div className="mb-1 text-xs text-black/60">Population</div>
                    <div className="text-2xl font-semibold">{d.population ? d.population.toLocaleString() : '—'}</div>
                  </div>
                  <div className="rounded-xl border border-black/10 p-4 text-center">
                    <div className="mb-1 text-xs text-black/60">Households</div>
                    <div className="text-2xl font-semibold">{d.households ? d.households.toLocaleString() : '—'}</div>
                  </div>
                  <div className="rounded-xl border border-black/10 p-4 text-center">
                    <div className="mb-1 text-xs text-black/60">Student Area</div>
                    <div className="text-2xl font-semibold">{d.studentArea ? 'Yes' : 'No'}</div>
                  </div>
                  <div className="rounded-xl border border-black/10 p-4 text-center">
                    <div className="mb-1 text-xs text-black/60">Region</div>
                    <div className="text-lg font-semibold">{d.ukRegion || d.region}</div>
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
                  <div className="rounded-xl border border-black/10 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold">Article 4 Status</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${d.hasArticle4 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {d.hasArticle4 ? 'In Force' : 'Not in Force'}
                      </span>
                    </div>
                    <p className="text-sm text-black/60">
                      {d.hasArticle4
                        ? 'Planning permission required to convert a property to HMO use in this area.'
                        : 'No special planning permission required for HMO conversion. Standard permitted development rights apply.'}
                    </p>
                  </div>

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

                  <div className="rounded-xl border border-black/10 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold">Council Attitude</h3>
                      <Shield className="size-5 text-black/40" />
                    </div>
                    <div className="mb-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        d.councilAttitude >= 7 ? 'bg-emerald-100 text-emerald-800' :
                        d.councilAttitude >= 4 ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {d.councilAttitude >= 7 ? 'Generally Favorable' :
                         d.councilAttitude >= 4 ? 'Neutral' :
                         'Restrictive'}
                      </span>
                    </div>
                    <p className="text-sm text-black/60">
                      Council attitude score: {d.councilAttitude}/10
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
                  <div className="col-span-5">
                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-emerald-700">
                      <Check className="size-5" />
                      Strengths
                    </h3>
                    <ul className="space-y-3">
                      {d.avgYield && d.avgYield > 8 && (
                        <li className="flex items-start gap-3 rounded-lg bg-emerald-50 p-3">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                          <span className="text-sm text-emerald-800">Above-average rental yield of {d.avgYield}%</span>
                        </li>
                      )}
                      {d.demandScore >= 60 && (
                        <li className="flex items-start gap-3 rounded-lg bg-emerald-50 p-3">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                          <span className="text-sm text-emerald-800">Strong rental demand (score: {d.demandScore}/100)</span>
                        </li>
                      )}
                      {d.transportScore >= 50 && (
                        <li className="flex items-start gap-3 rounded-lg bg-emerald-50 p-3">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                          <span className="text-sm text-emerald-800">Good transport connectivity (score: {d.transportScore}/100)</span>
                        </li>
                      )}
                      {!d.hasArticle4 && (
                        <li className="flex items-start gap-3 rounded-lg bg-emerald-50 p-3">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                          <span className="text-sm text-emerald-800">No Article 4 direction restricting HMO development</span>
                        </li>
                      )}
                      {d.studentArea && (
                        <li className="flex items-start gap-3 rounded-lg bg-emerald-50 p-3">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                          <span className="text-sm text-emerald-800">Student area — additional demand from students</span>
                        </li>
                      )}
                      {d.councilAttitude >= 7 && (
                        <li className="flex items-start gap-3 rounded-lg bg-emerald-50 p-3">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                          <span className="text-sm text-emerald-800">Favorable council attitude towards HMOs</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="col-span-4">
                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-amber-700">
                      <AlertTriangle className="size-5" />
                      Considerations
                    </h3>
                    <ul className="space-y-3">
                      {d.hasArticle4 && (
                        <li className="flex items-start gap-3 rounded-lg bg-amber-50 p-3">
                          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                          <span className="text-sm text-amber-800">Article 4 in force — planning permission required for HMO conversion</span>
                        </li>
                      )}
                      {d.transportScore < 30 && (
                        <li className="flex items-start gap-3 rounded-lg bg-amber-50 p-3">
                          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                          <span className="text-sm text-amber-800">Limited transport connectivity (score: {d.transportScore}/100)</span>
                        </li>
                      )}
                      {d.demandScore < 40 && (
                        <li className="flex items-start gap-3 rounded-lg bg-amber-50 p-3">
                          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                          <span className="text-sm text-amber-800">Lower rental demand in this area (score: {d.demandScore}/100)</span>
                        </li>
                      )}
                      {d.councilAttitude < 4 && (
                        <li className="flex items-start gap-3 rounded-lg bg-amber-50 p-3">
                          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                          <span className="text-sm text-amber-800">Restrictive council attitude towards HMOs</span>
                        </li>
                      )}
                      <li className="flex items-start gap-3 rounded-lg bg-amber-50 p-3">
                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                        <span className="text-sm text-amber-800">Always check local HMO licensing requirements with the council</span>
                      </li>
                    </ul>
                  </div>

                  <div className="col-span-3">
                    <div className="h-full rounded-xl bg-black p-5 text-white">
                      <h3 className="mb-3 text-sm font-medium text-white/70">Overall Recommendation</h3>
                      <div className="mb-2 text-3xl font-bold">{recommendation.label}</div>
                      <div className="mb-4 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            className={`size-4 rounded-full ${star <= recommendation.stars ? 'bg-white' : 'bg-white/30'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-white/70">
                        Based on HMO score of {d.hmoScore}/100, {getDemandLabel(d.demandScore).toLowerCase()} demand, and {d.avgYield ? `${d.avgYield}% yield` : 'available metrics'}.
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
                <h2 className="mb-2 text-2xl font-semibold">Interested in {d.code}?</h2>
                <p className="mb-6 text-black/60">
                  Explore available properties or compare with other areas
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Link href="/dashboard/lease-opportunities">
                    <Button size="lg" className="px-6">
                      <Search className="mr-2 size-4" />
                      Search properties
                    </Button>
                  </Link>
                  <Link href="/dashboard/area-insights">
                    <Button size="lg" variant="outline" className="border-2 border-black px-6">
                      Compare with other areas
                    </Button>
                  </Link>
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
