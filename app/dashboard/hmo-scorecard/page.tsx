'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  Pen,
  Upload,
  CloudUpload,
  FileText,
  X,
  Users,
  Key,
  RotateCcw,
  Building,
  Hammer,
  ArrowRight,
  Play,
  Lightbulb,
  BookOpen,
  Headphones,
  UserCircle,
} from 'lucide-react';
import { DashboardHeader, DashboardFooter } from '@/components/layout';
import { Card, Button, Input } from '@/components/ui';

const recentAnalyses = [
  { id: 1, address: '47 Southchurch Avenue', postcode: 'SS1 2RB', area: 'Southend-on-Sea', type: 'HMO', date: '23 Jan 2025', score: 74 },
  { id: 2, address: '12 Marine Parade', postcode: 'SS1 2EY', area: 'Southend-on-Sea', type: 'HMO', date: '20 Jan 2025', score: 68 },
  { id: 3, address: '89 Victoria Avenue', postcode: 'SS2 6DH', area: 'Southend-on-Sea', type: 'HMO', date: '18 Jan 2025', score: 82 },
  { id: 4, address: '34 Leigh Road', postcode: 'SS9 1BU', area: 'Leigh-on-Sea', type: 'HMO', date: '15 Jan 2025', score: 71 },
  { id: 5, address: '156 London Road', postcode: 'SS1 1PG', area: 'Southend-on-Sea', type: 'HMO', date: '12 Jan 2025', score: 65 },
];

const scorecardTypes = [
  {
    id: 'hmo',
    title: 'HMO Scorecard',
    description: 'Assess suitability for House in Multiple Occupation conversion. Analyses room potential, yield, demand, location factors.',
    icon: Users,
    available: true,
  },
  {
    id: 'care-home',
    title: 'Care Home Potential',
    description: 'Evaluate suitability for residential care or supported living conversion.',
    icon: Building,
    available: false,
  },
  {
    id: 'serviced',
    title: 'Serviced Accommodation',
    description: 'Analyse potential for short-term rental or serviced apartment use.',
    icon: Key,
    available: false,
  },
  {
    id: 'brrr',
    title: 'BRRR Analysis',
    description: 'Buy, Refurbish, Refinance, Rent - calculate full project viability.',
    icon: RotateCcw,
    available: false,
  },
  {
    id: 'development',
    title: 'Development Appraisal',
    description: 'Assess potential for conversion, extension, or redevelopment.',
    icon: Building,
    available: false,
  },
  {
    id: 'flip',
    title: 'Flip Calculator',
    description: 'Calculate profit potential for buy-renovate-sell strategy.',
    icon: Hammer,
    available: false,
  },
];

export default function ScorecardPage() {
  const [propertyConfirmed] = useState(true);
  const [uploadedImages] = useState(['Property Front', 'Living Room', 'Kitchen']);
  const [uploadedDocs] = useState([
    { name: 'EPC_Certificate.pdf', size: '2.4 MB' },
    { name: 'Floor_Plan.pdf', size: '1.8 MB' },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader currentPath="/dashboard/scorecard" />

      <main className="mx-auto max-w-[1440px] px-8 py-8">
        {/* Page Header */}
        <section className="mb-10">
          <h1 className="mb-2 text-3xl font-semibold">Property Analysis</h1>
          <p className="text-[15px] text-black/60">Analyse any UK property for investment potential</p>
        </section>

        {/* Property Input Section */}
        <Card variant="default" className="mb-8 bg-[#FAFAFA]">
          <h2 className="mb-6 text-xl font-semibold">Property Details</h2>

          {/* Address Search */}
          <div className="mb-8">
            <label className="mb-2 block text-[13px] font-medium">Search Property Address</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Enter a UK property address..."
                  variant="search"
                  className="bg-white"
                />
              </div>
              <Button size="lg">Find Property</Button>
            </div>
            <p className="mt-2 text-xs text-black/50">Start typing to see address suggestions</p>
          </div>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-black/10" />
            <span className="text-xs text-black/50">or enter manually</span>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          {/* Manual Entry */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-[13px] font-medium">Address Line 1</label>
              <Input type="text" placeholder="Street and number" className="bg-white" />
            </div>
            <div>
              <label className="mb-2 block text-[13px] font-medium">
                Address Line 2 <span className="text-black/40">(optional)</span>
              </label>
              <Input type="text" placeholder="Apartment, suite, etc." className="bg-white" />
            </div>
            <div>
              <label className="mb-2 block text-[13px] font-medium">City/Town</label>
              <Input type="text" placeholder="City or town" className="bg-white" />
            </div>
            <div>
              <label className="mb-2 block text-[13px] font-medium">Postcode</label>
              <Input type="text" placeholder="e.g. SS1 2RB" className="bg-white" />
            </div>
          </div>
        </Card>

        {/* Property Confirmation */}
        {propertyConfirmed && (
          <Card variant="default" className="mb-8">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <CheckCircle className="size-5 text-black" />
                  <h3 className="text-[15px] font-medium">Property Confirmed</h3>
                </div>
                <p className="mb-1 text-2xl font-semibold">47 Southchurch Avenue</p>
                <p className="text-[13px] text-black/60">Southend-on-Sea, Essex, SS1 2RB</p>
              </div>
              <button className="flex items-center gap-2 text-[13px] font-medium hover:underline">
                <Pen className="size-3.5" />
                Change Address
              </button>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-6 border-t border-black/10 pt-6">
              <div>
                <p className="mb-1 text-xs text-black/50">Property Type</p>
                <p className="text-[13px] font-medium">Terraced House</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-black/50">Floor Area</p>
                <p className="text-[13px] font-medium">142 m²</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-black/50">Last Sale Price</p>
                <p className="text-[13px] font-medium">£285,000</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-black/50">Last Sale Date</p>
                <p className="text-[13px] font-medium">Mar 2023</p>
              </div>
            </div>
          </Card>
        )}

        {/* Upload Materials */}
        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold">Supporting Materials</h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Images Upload */}
            <Card variant="default" className="bg-[#FAFAFA]">
              <h3 className="mb-1 text-[15px] font-semibold">
                Property Images <span className="font-normal text-black/40">(optional)</span>
              </h3>
              <p className="mb-4 text-xs text-black/60">
                Upload photos of the property, rooms, exterior, floor plan, etc.
              </p>

              <div className="mb-4 cursor-pointer rounded-xl border-2 border-dashed border-black/10 bg-white p-8 text-center transition-colors hover:border-black/20">
                <CloudUpload className="mx-auto mb-3 size-10 text-black/30" />
                <p className="mb-1 text-[13px]">Drag and drop images here</p>
                <p className="mb-2 text-xs text-black/50">or click to browse</p>
                <p className="text-[10px] text-black/40">JPG, PNG, HEIC - Up to 20 files</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {uploadedImages.map((img, i) => (
                  <div key={i} className="group relative">
                    <div className="flex aspect-square items-center justify-center rounded-lg bg-black/20 text-xs text-white">
                      {img}
                    </div>
                    <button className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-black text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Documents Upload */}
            <Card variant="default" className="bg-[#FAFAFA]">
              <h3 className="mb-1 text-[15px] font-semibold">
                Documents <span className="font-normal text-black/40">(optional)</span>
              </h3>
              <p className="mb-4 text-xs text-black/60">
                Upload EPC certificate, floor plans, lease documents, surveys, etc.
              </p>

              <div className="mb-4 cursor-pointer rounded-xl border-2 border-dashed border-black/10 bg-white p-8 text-center transition-colors hover:border-black/20">
                <Upload className="mx-auto mb-3 size-10 text-black/30" />
                <p className="mb-1 text-[13px]">Drag and drop documents here</p>
                <p className="mb-2 text-xs text-black/50">or click to browse</p>
                <p className="text-[10px] text-black/40">PDF, DOC, DOCX - Up to 10 files</p>
              </div>

              <div className="space-y-2">
                {uploadedDocs.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-black/10 bg-white p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-black/40" />
                      <div>
                        <p className="text-[13px]">{doc.name}</p>
                        <p className="text-[10px] text-black/50">{doc.size}</p>
                      </div>
                    </div>
                    <button className="text-black/40 hover:text-black">
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Investment Scorecards */}
        <section className="mb-10">
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Investment Scorecards</h2>
            <p className="text-[13px] text-black/60">
              Analyse this property&apos;s potential for different investment strategies
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {scorecardTypes.map((scorecard) => (
              <Card
                key={scorecard.id}
                variant={scorecard.available ? 'default' : 'subtle'}
                className={`relative ${scorecard.available ? 'border-2 border-black' : 'bg-[#FAFAFA]'}`}
              >
                {!scorecard.available && (
                  <span className="absolute right-4 top-4 rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-medium text-black/50">
                    Coming Soon
                  </span>
                )}
                <div
                  className={`mb-4 flex size-12 items-center justify-center rounded-xl ${
                    scorecard.available ? 'bg-black' : 'bg-black/10'
                  }`}
                >
                  <scorecard.icon className={`size-5 ${scorecard.available ? 'text-white' : 'text-black/40'}`} />
                </div>
                <h3 className={`mb-2 text-lg font-semibold ${!scorecard.available && 'text-black/40'}`}>
                  {scorecard.title}
                </h3>
                <p className={`mb-6 text-[13px] leading-relaxed ${scorecard.available ? 'text-black/60' : 'text-black/40'}`}>
                  {scorecard.description}
                </p>
                <Button
                  variant={scorecard.available ? 'primary' : 'secondary'}
                  className="w-full"
                  disabled={!scorecard.available}
                >
                  Generate Scorecard
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Analyses */}
        <section className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Recent Analyses</h2>
            <Link href="#" className="flex items-center gap-2 text-[13px] font-medium hover:underline">
              View All
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <Card variant="default" padding="none">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10 bg-[#FAFAFA]">
                  <th className="p-4 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">
                    Property
                  </th>
                  <th className="p-4 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">
                    Scorecard
                  </th>
                  <th className="p-4 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">
                    Date
                  </th>
                  <th className="p-4 text-left text-[10px] font-semibold uppercase tracking-wider text-black/40">
                    Score
                  </th>
                  <th className="p-4 text-right text-[10px] font-semibold uppercase tracking-wider text-black/40">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {recentAnalyses.map((analysis) => (
                  <tr key={analysis.id} className="transition-colors hover:bg-[#F8F7FF]">
                    <td className="p-4">
                      <div className="text-[13px] font-medium">{analysis.address}</div>
                      <div className="text-[11px] text-black/50">
                        {analysis.postcode}, {analysis.area}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs">
                        <Users className="size-3" />
                        {analysis.type}
                      </span>
                    </td>
                    <td className="p-4 text-[13px] text-black/60">{analysis.date}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-medium">{analysis.score}</span>
                        <span className="text-xs text-black/50">/100</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="secondary" size="sm">
                        View Report
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        {/* Help Section */}
        <section className="mb-10">
          <div className="rounded-xl bg-black p-8 text-white">
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h2 className="mb-4 text-2xl font-semibold">Need Help Getting Started?</h2>
                <p className="mb-6 text-[15px] leading-relaxed text-white/60">
                  Our property analysis tools help you make informed investment decisions. Watch our tutorial or read
                  our guide to learn how to get the most accurate results.
                </p>
                <div className="flex gap-3">
                  <button className="flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black hover:bg-white/90">
                    <Play className="size-4" />
                    Watch Tutorial
                  </button>
                  <button className="h-11 rounded-full border border-white/20 px-5 text-sm font-medium hover:bg-white/10">
                    Read Guide
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-5">
                  <Lightbulb className="mb-3 size-6" />
                  <h3 className="mb-1 text-[13px] font-medium">Tips & Best Practices</h3>
                  <p className="text-xs text-white/50">Learn how to analyse properties effectively</p>
                </div>
                <div className="rounded-xl bg-white/10 p-5">
                  <BookOpen className="mb-3 size-6" />
                  <h3 className="mb-1 text-[13px] font-medium">Documentation</h3>
                  <p className="text-xs text-white/50">Detailed guides and FAQs</p>
                </div>
                <div className="rounded-xl bg-white/10 p-5">
                  <Headphones className="mb-3 size-6" />
                  <h3 className="mb-1 text-[13px] font-medium">Support</h3>
                  <p className="text-xs text-white/50">Get help from our team</p>
                </div>
                <div className="rounded-xl bg-white/10 p-5">
                  <UserCircle className="mb-3 size-6" />
                  <h3 className="mb-1 text-[13px] font-medium">Community</h3>
                  <p className="text-xs text-white/50">Connect with other investors</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DashboardFooter />
    </div>
  );
}
