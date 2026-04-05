'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, MapPin, TrendingUp, Home, Users, Train, AlertTriangle, GraduationCap } from 'lucide-react';
import { fetchAreaDetail, type PostcodeDistrict } from '@/lib/api/areas';

interface AreaDetailSidebarProps {
  areaCode: string | null;
  onClose: () => void;
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}

function getDemandColor(score: number): string {
  if (score >= 70) return 'bg-emerald-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-red-500';
}

function splitAreas(name: string): string[] {
  return name.split(',').map(s => s.trim()).filter(Boolean);
}

export function AreaDetailSidebar({ areaCode, onClose }: AreaDetailSidebarProps) {
  const [area, setArea] = useState<PostcodeDistrict | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!areaCode) {
      setArea(null);
      return;
    }

    const code = areaCode; // Capture for closure

    async function loadArea() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchAreaDetail(code);
        setArea(data);
      } catch (err) {
        console.error('Failed to load area details:', err);
        setError('Failed to load area details');
      } finally {
        setLoading(false);
      }
    }

    loadArea();
  }, [areaCode]);

  if (!areaCode) return null;

  return (
    <div className="absolute inset-y-0 left-0 z-20 w-80 overflow-y-auto border-r border-black/10 bg-white shadow-lg">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/5 bg-white px-4 py-3">
        <h3 className="text-sm font-semibold">Area Details</h3>
        <button
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-full hover:bg-black/5"
        >
          <X className="size-4 text-black/60" />
        </button>
      </div>

      {loading && (
        <div className="flex h-64 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="p-4 text-center">
          <div className="text-sm text-red-600">{error}</div>
        </div>
      )}

      {area && !loading && (
        <div className="p-4">
          {/* Area Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {area.code} - {area.region}
                </h2>
                {area.post_town && (
                  <div className="text-xs text-black/50">{area.post_town}</div>
                )}
              </div>
              <div
                className={`flex size-12 items-center justify-center rounded-xl text-lg font-bold text-white ${getScoreColor(area.hmo_score)}`}
              >
                {area.hmo_score}
              </div>
            </div>
            {/* Areas list */}
            {area.name && (
              <div className="mt-3">
                <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-black/40">
                  Areas
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {splitAreas(area.name).map((a) => (
                    <span
                      key={a}
                      className="rounded-full bg-black/5 px-2.5 py-1 text-[11px] text-black/70"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-[#FAFAFA] p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-black/50">
                <TrendingUp className="size-3" />
                Avg Yield
              </div>
              <div className="mt-1 text-lg font-semibold">
                {area.average_yield ? `${area.average_yield}%` : '-'}
              </div>
            </div>
            <div className="rounded-lg bg-[#FAFAFA] p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-black/50">
                <Home className="size-3" />
                Avg Price
              </div>
              <div className="mt-1 text-lg font-semibold">
                {area.average_price ? `£${area.average_price.toLocaleString()}` : '-'}
              </div>
            </div>
            <div className="rounded-lg bg-[#FAFAFA] p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-black/50">
                <Users className="size-3" />
                Avg Rent
              </div>
              <div className="mt-1 text-lg font-semibold">
                {area.average_rent ? `£${area.average_rent}/m` : '-'}
              </div>
            </div>
            <div className="rounded-lg bg-[#FAFAFA] p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-black/50">
                <Train className="size-3" />
                Transport
              </div>
              <div className="mt-1 text-lg font-semibold">{area.transport_score}/10</div>
            </div>
          </div>

          {/* Demand Score */}
          <div className="mb-4">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-black/40">
              Room Demand
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
                <div
                  className={`h-full rounded-full ${getDemandColor(area.demand_score)}`}
                  style={{ width: `${area.demand_score}%` }}
                />
              </div>
              <span className="w-8 text-right text-sm font-semibold">{area.demand_score}</span>
            </div>
          </div>

          {/* Area Features */}
          <div className="mb-4">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-black/40">
              Area Features
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="size-3.5 text-black/40" />
                  <span>Article 4 Direction</span>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    area.has_article_4
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {area.has_article_4 ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <GraduationCap className="size-3.5 text-black/40" />
                  <span>Student Area</span>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    area.student_area ? 'bg-blue-100 text-blue-700' : 'bg-neutral-100 text-black/60'
                  }`}
                >
                  {area.student_area ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="mb-4">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-black/40">
              HMO Score
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
                  <div
                    className={`h-full rounded-full ${getScoreColor(area.hmo_score)}`}
                    style={{ width: `${area.hmo_score}%` }}
                  />
                </div>
                <span className="w-8 text-right text-sm font-semibold">{area.hmo_score}</span>
              </div>
              <div className="text-[11px] text-black/50">
                {area.hmo_score >= 80 && 'Excellent investment potential'}
                {area.hmo_score >= 60 && area.hmo_score < 80 && 'Good investment potential'}
                {area.hmo_score < 60 && 'Consider other factors carefully'}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Link href={`/dashboard/area-insights/${area.code}`} className="block w-full rounded-full bg-black py-2.5 text-center text-sm font-medium text-white hover:bg-black/80">
              View Full Analysis
            </Link>
            <button className="w-full rounded-full border border-black/10 py-2.5 text-sm font-medium hover:bg-black/5">
              Add to Watchlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
