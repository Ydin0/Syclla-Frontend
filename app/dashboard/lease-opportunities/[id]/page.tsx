"use client";

import {
  ArrowLeft,
  Heart,
  Download,
  Share2,
  Clock,
  Tag,
  TrendingUp,
  PoundSterling,
  Star,
  Lightbulb,
  FileText,
  Calculator,
  RotateCcw,
  Info,
  ChartLine,
  Coins,
  AlertTriangle,
  Home,
  ChartArea,
  MapPin,
  Train,
  Navigation,
  ListChecks,
  Layers,
  Check,
  Ruler,
  Bed,
  Bath,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardFooter } from "@/components/layout/dashboard-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Helper functions for color-coded indicators
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

const keyMetrics = [
  {
    icon: Clock,
    label: "Lease Remaining",
    value: "63 years",
    subtext: "Sweet spot range",
    indicator: true,
  },
  {
    icon: Tag,
    label: "Asking Price",
    value: "£145,000",
    subtext: "26% below extended value",
  },
  {
    icon: TrendingUp,
    label: "Extended Value",
    value: "£195,000",
    subtext: "With 99+ year lease",
  },
  {
    icon: PoundSterling,
    label: "Estimated Profit",
    value: "£42,000",
    subtext: "+29% ROI",
    highlight: true,
  },
  {
    icon: Star,
    label: "Opportunity Score",
    value: "91/100",
    subtext: "Excellent",
    dark: true,
  },
];

const tabs = [
  { id: "lease", label: "Lease Analysis", active: true },
  { id: "property", label: "Property Details", active: false },
  { id: "history", label: "Price History & Comparables", active: false },
  { id: "location", label: "Location", active: false },
];

const leaseDetails = [
  { label: "Original term", value: "99 years" },
  { label: "Lease start", value: "1986" },
  { label: "Years remaining", value: "63 years", indicator: true },
  { label: "Ground rent", value: "£250/year", subtext: "(estimated)" },
  { label: "Freeholder", value: "Unknown", subtext: "Would need to verify" },
  { label: "Building", value: "Marine Parade Court", subtext: "12 flats total" },
];

const calculatorOutputs = [
  { label: "Marriage value share", value: "£6,200" },
  { label: "Capitalised ground rent", value: "£1,800" },
  { label: "Estimated premium", value: "£8,000", large: true },
  { label: "Total cost (inc. fees)", value: "£10,500", highlight: true },
];

const valueImpactData = [
  { years: "99+ years", value: 100, amount: "£195,000" },
  { years: "80 years", value: 95, amount: "£185,000" },
  { years: "70 years", value: 85, amount: "£165,000" },
  { years: "63 years", value: 74, amount: "£145,000", current: true },
  { years: "55 years", value: 62, amount: "£120,000" },
  { years: "40 years", value: 44, amount: "£85,000" },
];

const profitBreakdown = [
  { label: "Purchase price", value: "£145,000" },
  { label: "Stamp duty (estimate)", value: "£2,500" },
  { label: "Legal fees (purchase)", value: "£1,500" },
  { label: "Lease extension premium", value: "£8,000" },
  { label: "Legal fees (extension)", value: "£2,500" },
  { label: "Total investment", value: "£159,500", isTotal: true },
  { label: "Extended value", value: "£195,000", isSubtotal: true },
  { label: "Gross profit", value: "£35,500", isProfit: true },
  { label: "Return on Investment (ROI)", value: "22%", isProfit: true },
];

const propertySpecs = [
  { icon: Ruler, value: "60 sqm", subtext: "646 sqft" },
  { icon: Bed, value: "2", subtext: "Bedrooms" },
  { icon: Bath, value: "1", subtext: "Bathroom" },
  { icon: Zap, value: "C", subtext: "EPC Rating" },
];

const salesHistory = [
  { date: "Jun 2018", price: "£138,000", lease: "69 years" },
  { date: "Mar 2012", price: "£95,000", lease: "75 years" },
  { date: "Nov 2005", price: "£72,000", lease: "82 years" },
];

const comparablesExtended = [
  { address: "Flat 8, 23 Marine Parade", date: "Oct 2024", price: "£188,000", size: "58 sqm", lease: "125 years" },
  { address: "Flat 2, 25 Marine Parade", date: "Aug 2024", price: "£195,000", size: "62 sqm", lease: "99 years" },
  { address: "14A Thorpe Esplanade", date: "Jun 2024", price: "£182,000", size: "55 sqm", lease: "115 years" },
];

const comparablesShort = [
  { address: "Flat 1, 19 Marine Parade", date: "Sep 2024", price: "£140,000", size: "58 sqm", lease: "61 years" },
  { address: "22B Eastern Esplanade", date: "Jul 2024", price: "£152,000", size: "65 sqm", lease: "67 years" },
];

const transportLinks = [
  { name: "Southend Central Station", time: "12 min walk", distance: "0.6 miles" },
  { name: "Southend Victoria Station", time: "18 min walk", distance: "0.9 miles" },
  { name: "London Liverpool Street", time: "By train", distance: "55 min" },
];

const amenities = [
  { name: "Seafront", type: "Walking distance", distance: "0.1 miles" },
  { name: "Southend High Street", type: "Shopping & dining", distance: "0.4 miles" },
  { name: "Southend Hospital", type: "Healthcare", distance: "1.2 miles" },
];

const scoreBreakdown = [
  { label: "Lease length (sweet spot)", score: 25, max: 25 },
  { label: "Profit margin", score: 23, max: 25 },
  { label: "Price vs market", score: 22, max: 25 },
  { label: "Location quality", score: 12, max: 15 },
  { label: "Building condition", score: 9, max: 10 },
];

const riskFactors = [
  {
    type: "warning",
    title: "Cash/bridging likely required",
    description: "Difficult to mortgage with 63 years remaining - most lenders require 70+ years at end of term",
  },
  {
    type: "warning",
    title: "Freeholder unknown",
    description: "Verify responsiveness and track record before proceeding",
  },
  {
    type: "warning",
    title: "Ground rent may increase",
    description: "Verify lease terms for any escalation clauses",
  },
  {
    type: "positive",
    title: "Good location with strong resale demand",
    description: "Marine Parade is a desirable seafront location with consistent market activity",
  },
  {
    type: "positive",
    title: "Healthy profit margin",
    description: "Even with conservative estimates, the profit potential is strong",
  },
];

const nextSteps = [
  {
    step: 1,
    title: "Verify lease details with Land Registry",
    description: "Download official lease documents (£3)",
    action: "Order from Land Registry",
  },
  {
    step: 2,
    title: "Contact agent to arrange viewing",
    description: "Inspect property condition and confirm details",
    action: "Find agent details",
  },
  {
    step: 3,
    title: "Check freeholder and ground rent terms",
    description: "Verify responsiveness and any escalation clauses",
  },
  {
    step: 4,
    title: "Get formal lease extension quote",
    description: "Obtain professional valuation for accurate costs",
  },
];

const similarOpportunities = [
  {
    address: "Flat 3, 31 Warrior Square",
    postcode: "SS1 2JY, Southend",
    lease: "61 years",
    price: "£155,000",
    size: "70 sqm",
    profit: "£47,000",
    score: 89,
  },
  {
    address: "15A Southchurch Road",
    postcode: "SS1 2ND, Southend",
    lease: "58 years",
    price: "£125,000",
    size: "55 sqm",
    profit: "£45,000",
    score: 88,
  },
  {
    address: "22B Clifftown Road",
    postcode: "SS1 1AB, Southend",
    lease: "66 years",
    price: "£175,000",
    size: "70 sqm",
    profit: "£41,000",
    score: 85,
  },
];

export default function LeaseOpportunityDetailPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <DashboardHeader currentPath="/dashboard/lease-opportunities" />

      <main className="flex-1">
        {/* Property Header */}
        <section className="border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1440px] px-8 py-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard/lease-opportunities/search"
                  className="rounded-full p-2 hover:bg-black/5"
                >
                  <ArrowLeft className="size-5" />
                </Link>
                <div>
                  <p className="mb-2 text-xs text-black/60">← Back to results</p>
                  <h1 className="mb-2 text-3xl font-semibold text-black">
                    Flat 4, 23 Marine Parade, Southend-on-Sea
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="text-black/60">SS1 2EY</span>
                    <span className="rounded-full bg-black/10 px-3 py-1 text-sm">Leasehold Flat</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-2 border-black">
                  <Heart className="mr-2 size-4" />
                  Add to Watchlist
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 size-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="border-b border-black/10 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px] px-8 py-8">
            <div className="grid grid-cols-5 gap-6">
              {keyMetrics.map((metric) => (
                <Card
                  key={metric.label}
                  className={`rounded-xl ${
                    metric.dark
                      ? "border-0 bg-black text-white"
                      : metric.highlight
                      ? "border-2 border-black"
                      : "border border-black/10"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <metric.icon className={`size-4 ${metric.dark ? "text-white" : "text-black/60"}`} />
                      <span className={`text-xs ${metric.dark ? "text-white" : "text-black/60"}`}>
                        {metric.label}
                      </span>
                    </div>
                    <div className="mb-2 flex items-center gap-3">
                      {metric.indicator && <span className={`size-2 rounded-full ${getLeaseStatus(63).color}`} />}
                      <span className={`text-3xl font-semibold ${metric.dark ? "text-white" : "text-black"}`}>
                        {metric.value}
                      </span>
                    </div>
                    {metric.highlight ? (
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-black px-2 py-1 text-xs text-white">+29%</span>
                        <span className="text-xs text-black/60">ROI</span>
                      </div>
                    ) : (
                      <span className={`text-xs ${metric.dark ? "text-white/70" : "text-black/60"}`}>
                        {metric.subtext}
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Opportunity Summary */}
        <section className="border-b border-black/10">
          <div className="mx-auto max-w-[1440px] px-8 py-6">
            <Card className="rounded-xl border border-black/10 bg-[#FAFAFA]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-black">
                    <Lightbulb className="size-5 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-black">Opportunity Summary</h3>
                    <p className="leading-relaxed text-black/60">
                      This flat has 63 years remaining on the lease, putting it in the &apos;sweet spot&apos; for
                      lease extension profit. At £145,000, it&apos;s priced 26% below what it would be worth
                      with a long lease. After extending (estimated cost £8,000), the property could be
                      worth £195,000 - a potential profit of £42,000.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-[1440px] px-8 py-8">
          {/* Tabs */}
          <div className="mb-6 border-b border-black/20">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
                    tab.active
                      ? "border-black text-black"
                      : "border-transparent text-black/60 hover:border-black/20 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lease Analysis Tab Content */}
          <div className="space-y-8">
            {/* Current Lease Details */}
            <Card className="rounded-xl border border-black/10">
              <div className="border-b border-black/10 p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                  <FileText className="size-5" />
                  Current Lease Details
                </h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  {leaseDetails.map((detail) => (
                    <div key={detail.label}>
                      <p className="mb-1 text-sm text-black/60">{detail.label}</p>
                      <div className="flex items-center gap-2">
                        {detail.indicator && <span className={`size-2 rounded-full ${getLeaseStatus(63).color}`} />}
                        <span className="text-xl text-black">{detail.value}</span>
                      </div>
                      {detail.subtext && <p className="text-xs text-black/60">{detail.subtext}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lease Extension Calculator */}
            <Card className="rounded-xl border border-black/10">
              <div className="border-b border-black/10 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                    <Calculator className="size-5" />
                    Lease Extension Calculator
                  </h2>
                  <button className="flex items-center gap-2 text-sm text-black/60 hover:text-black">
                    <RotateCcw className="size-4" />
                    Reset to defaults
                  </button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-8">
                  {/* Inputs */}
                  <div>
                    <h3 className="mb-4 border-b border-black/10 pb-2 text-sm font-medium text-black">
                      Inputs (editable)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm text-black/60">
                          Current lease remaining (years)
                        </label>
                        <input
                          type="number"
                          defaultValue="63"
                          className="w-full rounded-lg border border-black/10 px-4 py-2 focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm text-black/60">
                          Flat value with extended lease (£)
                        </label>
                        <input
                          type="number"
                          defaultValue="195000"
                          className="w-full rounded-lg border border-black/10 px-4 py-2 focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm text-black/60">Ground rent (£/year)</label>
                        <input
                          type="number"
                          defaultValue="250"
                          className="w-full rounded-lg border border-black/10 px-4 py-2 focus:border-black focus:outline-none"
                        />
                      </div>
                      <Button className="w-full">
                        <Calculator className="mr-2 size-4" />
                        Recalculate
                      </Button>
                    </div>
                  </div>

                  {/* Outputs */}
                  <div>
                    <h3 className="mb-4 border-b border-black/10 pb-2 text-sm font-medium text-black">
                      Calculated Outputs
                    </h3>
                    <div className="space-y-4">
                      {calculatorOutputs.map((output, i) => (
                        <div
                          key={output.label}
                          className={`flex items-center justify-between py-3 ${
                            output.highlight
                              ? "-mx-4 bg-[#FAFAFA] px-4"
                              : i < calculatorOutputs.length - 2
                              ? "border-b border-black/10"
                              : "border-b-2 border-black/20"
                          }`}
                        >
                          <span className={`text-sm ${output.large ? "font-medium text-black" : "text-black/60"}`}>
                            {output.label}
                          </span>
                          <span className={output.large ? "text-2xl font-semibold text-black" : "text-lg text-black"}>
                            {output.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl border border-black/10 bg-[#FAFAFA] p-4 text-xs text-black/60">
                      <Info className="mr-2 inline size-3" />
                      Includes estimated legal fees (£2,500) and valuation costs. Actual costs may vary -
                      obtain formal quotes.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Value Impact Chart */}
            <Card className="rounded-xl border border-black/10">
              <div className="border-b border-black/10 p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                  <ChartLine className="size-5" />
                  Value Impact by Lease Length
                </h2>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {valueImpactData.map((item) => (
                    <div key={item.years} className="flex items-center gap-4">
                      <div className={`w-32 text-sm ${item.current ? "font-medium text-black" : "text-black/60"}`}>
                        {item.years}
                      </div>
                      <div
                        className={`relative h-12 flex-1 overflow-hidden rounded-lg bg-black/10 ${
                          item.current ? "border-2 border-black" : ""
                        }`}
                      >
                        <div
                          className={`absolute inset-0 rounded-lg ${item.current ? "bg-black" : "bg-black/60"}`}
                          style={{ width: `${item.value}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-end pr-4 text-sm text-white">
                          {item.amount}
                        </div>
                        {item.current && (
                          <div className="absolute -right-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-black px-2 py-1 text-xs text-white">
                            ← Current
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl border border-black/10 bg-[#FAFAFA] p-4 text-sm text-black/60">
                  The chart shows how property value decreases as lease length reduces. The steepest decline
                  occurs below 80 years, making this 63-year lease a prime opportunity.
                </div>
              </CardContent>
            </Card>

            {/* Detailed Profit Breakdown */}
            <Card className="rounded-xl border border-black/10">
              <div className="border-b border-black/10 p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                  <Coins className="size-5" />
                  Detailed Profit Breakdown
                </h2>
              </div>
              <CardContent className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-black/20">
                      <th className="py-3 text-left text-sm font-medium text-black">Item</th>
                      <th className="py-3 text-right text-sm font-medium text-black">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {profitBreakdown.map((item, i) => (
                      <tr
                        key={i}
                        className={
                          item.isTotal
                            ? "border-t-2 border-black/20 bg-[#FAFAFA]"
                            : item.isProfit
                            ? "bg-black text-white"
                            : item.isSubtotal
                            ? "border-t-2 border-black/20"
                            : ""
                        }
                      >
                        <td
                          className={`py-3 text-sm ${
                            item.isTotal || item.isProfit ? "font-medium" : "text-black/60"
                          } ${item.isProfit ? "py-4 text-white" : ""}`}
                        >
                          {item.label}
                        </td>
                        <td
                          className={`py-3 text-right ${
                            item.isTotal ? "text-xl font-semibold" : item.isProfit ? "py-4 text-2xl font-semibold" : ""
                          }`}
                        >
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Mortgage Note */}
            <Card className="rounded-xl border-2 border-black/60 bg-[#FAFAFA]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-black/60">
                    <AlertTriangle className="size-5 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-black">Mortgage Consideration</h3>
                    <p className="text-black/60">
                      With 63 years remaining, this property may be difficult to mortgage. Many lenders
                      require 70+ years at end of mortgage term. Cash purchase or bridging finance may be
                      required.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Property Details Section */}
          <Card className="mt-8 rounded-xl border border-black/10">
            <div className="border-b border-black/10 p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                <Home className="size-5" />
                Property Information
              </h2>
            </div>
            <CardContent className="p-6">
              <div className="mb-8 grid grid-cols-3 gap-6">
                <div>
                  <p className="mb-1 text-sm text-black/60">Address</p>
                  <p className="text-base text-black">Flat 4, 23 Marine Parade</p>
                  <p className="text-base text-black">Southend-on-Sea, Essex</p>
                  <p className="text-base text-black">SS1 2EY</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-black/60">Type</p>
                  <p className="mb-3 text-base text-black">Purpose-built flat</p>
                  <p className="mb-1 text-sm text-black/60">Floor</p>
                  <p className="text-base text-black">2nd floor</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-black/60">Construction</p>
                  <p className="mb-3 text-base text-black">1980-1989</p>
                  <p className="mb-1 text-sm text-black/60">Council tax band</p>
                  <p className="text-base text-black">C</p>
                </div>
              </div>

              <div className="mb-8 grid grid-cols-4 gap-6 border-b border-black/10 pb-8">
                {propertySpecs.map((spec) => (
                  <div
                    key={spec.subtext}
                    className="rounded-lg border border-black/10 bg-[#FAFAFA] p-4 text-center"
                  >
                    <spec.icon className="mx-auto mb-2 size-6 text-black" />
                    <p className="mb-1 text-2xl font-semibold text-black">{spec.value}</p>
                    <p className="text-xs text-black/60">{spec.subtext}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-black">Building Information</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="mb-1 text-sm text-black/60">Building name</p>
                    <p className="text-base text-black">Marine Parade Court</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-black/60">Total flats in building</p>
                    <p className="text-base text-black">12</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-black/60">Service charge</p>
                    <p className="text-base text-black">Unknown</p>
                    <p className="text-xs text-black/60">(verify with agent)</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-black/60">Freeholder</p>
                    <p className="text-base text-black">Unknown</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price History Section */}
          <Card className="mt-8 rounded-xl border border-black/10">
            <div className="border-b border-black/10 p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                <ChartArea className="size-5" />
                Price History & Comparables
              </h2>
            </div>
            <CardContent className="p-6">
              {/* Sales History */}
              <h3 className="mb-4 border-b border-black/10 pb-3 text-base font-medium text-black">
                This Property&apos;s Sales History
              </h3>
              <table className="mb-8 w-full">
                <thead>
                  <tr className="border-b-2 border-black/20 bg-[#FAFAFA]">
                    <th className="p-3 text-left text-sm font-medium text-black">Date</th>
                    <th className="p-3 text-right text-sm font-medium text-black">Price</th>
                    <th className="p-3 text-right text-sm font-medium text-black">Lease at time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {salesHistory.map((sale) => (
                    <tr key={sale.date}>
                      <td className="p-3 text-sm text-black">{sale.date}</td>
                      <td className="p-3 text-right text-sm text-black">{sale.price}</td>
                      <td className="p-3 text-right text-sm text-black">{sale.lease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Extended Lease Comparables */}
              <h3 className="mb-4 border-b border-black/10 pb-3 text-base font-medium text-black">
                Comparable Sales - Similar Flats with Extended Leases
              </h3>
              <table className="mb-8 w-full">
                <thead>
                  <tr className="border-b-2 border-black/20 bg-[#FAFAFA]">
                    <th className="p-3 text-left text-sm font-medium text-black">Address</th>
                    <th className="p-3 text-left text-sm font-medium text-black">Date</th>
                    <th className="p-3 text-right text-sm font-medium text-black">Price</th>
                    <th className="p-3 text-right text-sm font-medium text-black">Size</th>
                    <th className="p-3 text-right text-sm font-medium text-black">Lease</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {comparablesExtended.map((comp) => (
                    <tr key={comp.address}>
                      <td className="p-3 text-sm text-black">{comp.address}</td>
                      <td className="p-3 text-sm text-black">{comp.date}</td>
                      <td className="p-3 text-right text-sm text-black">{comp.price}</td>
                      <td className="p-3 text-right text-sm text-black">{comp.size}</td>
                      <td className="p-3 text-right text-sm text-black">{comp.lease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Short Lease Comparables */}
              <h3 className="mb-4 border-b border-black/10 pb-3 text-base font-medium text-black">
                Short Lease Sales - For Comparison
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black/20 bg-[#FAFAFA]">
                    <th className="p-3 text-left text-sm font-medium text-black">Address</th>
                    <th className="p-3 text-left text-sm font-medium text-black">Date</th>
                    <th className="p-3 text-right text-sm font-medium text-black">Price</th>
                    <th className="p-3 text-right text-sm font-medium text-black">Size</th>
                    <th className="p-3 text-right text-sm font-medium text-black">Lease</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {comparablesShort.map((comp) => (
                    <tr key={comp.address}>
                      <td className="p-3 text-sm text-black">{comp.address}</td>
                      <td className="p-3 text-sm text-black">{comp.date}</td>
                      <td className="p-3 text-right text-sm text-black">{comp.price}</td>
                      <td className="p-3 text-right text-sm text-black">{comp.size}</td>
                      <td className="p-3 text-right text-sm text-black">{comp.lease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Location Section */}
          <Card className="mt-8 rounded-xl border border-black/10">
            <div className="border-b border-black/10 p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                <MapPin className="size-5" />
                Location
              </h2>
            </div>
            <CardContent className="p-6">
              {/* Map Placeholder */}
              <div className="mb-6 flex h-80 flex-col items-center justify-center rounded-xl bg-black/5">
                <MapPin className="mb-4 size-16 text-black/40" />
                <p className="text-black/60">Map showing property location</p>
                <p className="text-sm text-black/40">Marine Parade, Southend-on-Sea, SS1 2EY</p>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-8">
                {/* Transport */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 border-b border-black/10 pb-3 text-base font-medium text-black">
                    <Train className="size-4" />
                    Transport
                  </h3>
                  <div className="space-y-3">
                    {transportLinks.map((link) => (
                      <div key={link.name} className="flex items-start justify-between">
                        <div>
                          <p className="mb-1 text-sm text-black">{link.name}</p>
                          <p className="text-xs text-black/60">{link.time}</p>
                        </div>
                        <span className="text-sm text-black">{link.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 border-b border-black/10 pb-3 text-base font-medium text-black">
                    <Navigation className="size-4" />
                    Local Amenities
                  </h3>
                  <div className="space-y-3">
                    {amenities.map((amenity) => (
                      <div key={amenity.name} className="flex items-start justify-between">
                        <div>
                          <p className="mb-1 text-sm text-black">{amenity.name}</p>
                          <p className="text-xs text-black/60">{amenity.type}</p>
                        </div>
                        <span className="text-sm text-black">{amenity.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-black/10 bg-[#FAFAFA] p-4">
                <h3 className="mb-2 text-sm font-medium text-black">Area Context</h3>
                <p className="text-sm text-black/60">
                  Marine Parade is a popular seafront location with a mix of owner-occupiers and rental
                  properties. Strong rental demand if choosing to let.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Opportunity Score Breakdown */}
          <Card className="mt-8 rounded-xl border border-black/10">
            <div className="border-b border-black/10 p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                <Star className="size-5" />
                Opportunity Score Breakdown
              </h2>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                {scoreBreakdown.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-black">{item.label}</span>
                      <span className="text-sm text-black">
                        {item.score}/{item.max}
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-black/10">
                      <div
                        className="h-3 rounded-full bg-black"
                        style={{ width: `${(item.score / item.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t-2 border-black/20 pt-4">
                  <span className="text-base font-medium text-black">Total Score</span>
                  <span className="text-3xl font-semibold text-black">91/100</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card className="mt-8 rounded-xl border border-black/10">
            <div className="border-b border-black/10 p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                <AlertTriangle className="size-5" />
                Risk Factors
              </h2>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                {riskFactors.map((risk, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 ${
                      i < riskFactors.length - 1 ? "border-b border-black/10 pb-4" : ""
                    }`}
                  >
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                        risk.type === "warning" ? "bg-black/60" : "bg-black"
                      }`}
                    >
                      {risk.type === "warning" ? (
                        <AlertTriangle className="size-4 text-white" />
                      ) : (
                        <Check className="size-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-sm font-medium text-black">{risk.title}</p>
                      <p className="text-xs text-black/60">{risk.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mt-8 rounded-xl border-2 border-black bg-[#FAFAFA]">
            <div className="border-b border-black/10 bg-white p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                <ListChecks className="size-5" />
                Next Steps
              </h2>
            </div>
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-black">Interested in this opportunity?</h3>
                <p className="text-sm text-black/60">
                  Follow these steps to move forward with this lease extension deal:
                </p>
              </div>
              <div className="space-y-4">
                {nextSteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex items-start gap-4 rounded-lg border border-black/10 bg-white p-4"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-black text-xl text-white">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-sm font-medium text-black">{step.title}</p>
                      <p className="mb-3 text-xs text-black/60">{step.description}</p>
                      {step.action && (
                        <Button size="sm" className="text-xs">
                          {step.action}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center gap-4">
            <Button className="flex-1 py-6">
              <Heart className="mr-2 size-4" />
              Add to Watchlist
            </Button>
            <Button variant="outline" className="flex-1 border-2 border-black py-6">
              <Download className="mr-2 size-4" />
              Export Full Report
            </Button>
            <Button variant="outline" className="flex-1 border-2 border-black py-6">
              <Share2 className="mr-2 size-4" />
              Share Opportunity
            </Button>
          </div>

          {/* Similar Opportunities */}
          <Card className="mt-8 rounded-xl border border-black/10">
            <div className="border-b border-black/10 p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                <Layers className="size-5" />
                Similar Opportunities Nearby
              </h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {similarOpportunities.map((opp) => {
                  const leaseYears = parseInt(opp.lease);
                  return (
                    <div
                      key={opp.address}
                      className="cursor-pointer rounded-lg border border-black/10 p-4 transition-colors hover:border-black"
                    >
                      <p className="mb-2 text-sm font-medium text-black">{opp.address}</p>
                      <p className="mb-3 text-xs text-black/60">{opp.postcode}</p>
                      <div className="mb-2 flex items-center gap-2">
                        <span className={`size-2 rounded-full ${getLeaseStatus(leaseYears).color}`} />
                        <span className="text-xs text-black">{opp.lease}</span>
                      </div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-black">{opp.price}</span>
                        <span className="text-xs text-black/60">{opp.size}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-black/10 pt-2">
                        <span className="text-xs text-black/60">Est. profit: {opp.profit}</span>
                        <span className={`rounded-full px-2 py-1 text-xs text-white ${getScoreStatus(opp.score)}`}>{opp.score}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
