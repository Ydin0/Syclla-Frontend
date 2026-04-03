"use client";

import {
  ArrowLeft,
  Heart,
  Share2,
  Home,
  MapPin,
  Train,
  ShoppingBag,
  Building,
  TrendingUp,
  Calculator,
  Users,
  Check,
  AlertTriangle,
  Ruler,
  Bed,
  Calendar,
  PoundSterling,
  BarChart3,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardFooter } from "@/components/layout/dashboard-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Helper function for score color
const getScoreStatus = (score: number) => {
  if (score >= 80) return { color: "bg-emerald-500", label: "Excellent" };
  if (score >= 60) return { color: "bg-amber-500", label: "Good" };
  return { color: "bg-red-500", label: "Poor" };
};

// Property Data
const propertyData = {
  address: "47 Southchurch Avenue",
  city: "Southend-on-Sea, Essex",
  postcode: "SS1 2RB",
  type: "Semi-detached House",
  lastSalePrice: "£285,000",
  lastSaleDate: "March 2021",
  pricePerSqm: "£2,415",
  priceVsArea: "-12%",
  floorArea: "118 sqm",
  bedrooms: 4,
  estimatedValue: "£310k",
  estimatedRange: "£310k - £325k",
  hmoScore: 74,
};

// Property Details
const propertyDetails = [
  { label: "Address", value: "47 Southchurch Avenue" },
  { label: "Postcode", value: "SS1 2RB" },
  { label: "Type", value: "Semi-detached House" },
  { label: "Floor Area", value: "118 sqm (1,270 sqft)" },
  { label: "Bedrooms", value: "4" },
  { label: "Construction Age", value: "1930-1949" },
  { label: "EPC Rating", value: "D (58)" },
  { label: "Tenure", value: "Freehold" },
  { label: "Council Tax", value: "Band D" },
];

// Key Metrics
const keyMetrics = [
  {
    icon: Calendar,
    label: "Last Sale",
    value: propertyData.lastSalePrice,
    subtext: propertyData.lastSaleDate,
  },
  {
    icon: Ruler,
    label: "Price/sqm",
    value: propertyData.pricePerSqm,
    subtext: `${propertyData.priceVsArea} vs area avg`,
  },
  {
    icon: Bed,
    label: "Floor Area",
    value: propertyData.floorArea,
    subtext: `${propertyData.bedrooms} bedrooms`,
  },
  {
    icon: BarChart3,
    label: "HMO Score",
    value: `${propertyData.hmoScore}/100`,
    subtext: getScoreStatus(propertyData.hmoScore).label,
    dark: true,
  },
  {
    icon: PoundSterling,
    label: "Estimated Value",
    value: propertyData.estimatedValue,
    subtext: propertyData.estimatedRange,
  },
];

// Tabs
const tabs = [
  { id: "overview", label: "Overview", active: true },
  { id: "price-history", label: "Price History", active: false },
  { id: "comparables", label: "Comparables", active: false },
  { id: "hmo-analysis", label: "HMO Analysis", active: false },
  { id: "location", label: "Location", active: false },
];

// HMO Score Breakdown
const scoreBreakdown = [
  { label: "Property", score: 24, max: 30, percentage: 80 },
  { label: "Location", score: 18, max: 25, percentage: 72 },
  { label: "Financial", score: 22, max: 30, percentage: 73 },
  { label: "Demand", score: 10, max: 15, percentage: 67 },
];

// Strengths & Considerations
const strengths = [
  "Good floor area for 4+ bedroom HMO conversion",
  "Below area average price per sqm",
  "Strong rental demand in SS1 area",
  "Good transport links to London",
];

const considerations = [
  "EPC rating D - may need improvements",
  "HMO licensing required in this area",
  "Semi-detached may have soundproofing needs",
  "Older property may need refurbishment",
];

// Transaction History
const transactionHistory = [
  { date: "Mar 2021", price: "£285,000", change: "+22%", type: "Sale" },
  { date: "Sep 2015", price: "£234,000", change: "+18%", type: "Sale" },
  { date: "Jun 2010", price: "£198,000", change: "-", type: "Sale" },
];

// Comparables
const comparables = [
  { address: "52 Southchurch Avenue", date: "Oct 2024", price: "£295,000", pricePerSqm: "£2,580", floorArea: "114 sqm", distance: "0.1 mi" },
  { address: "31 Ambleside Drive", date: "Aug 2024", price: "£310,000", pricePerSqm: "£2,460", floorArea: "126 sqm", distance: "0.3 mi" },
  { address: "89 Lifstan Way", date: "Jul 2024", price: "£275,000", pricePerSqm: "£2,390", floorArea: "115 sqm", distance: "0.4 mi" },
  { address: "14 Eastwood Boulevard", date: "May 2024", price: "£298,000", pricePerSqm: "£2,510", floorArea: "119 sqm", distance: "0.5 mi" },
];

// Transport Links
const transportLinks = [
  { name: "Southend East Station", distance: "0.4 miles", time: "8 min walk" },
  { name: "Southend Central Station", distance: "0.9 miles", time: "18 min walk" },
  { name: "London Liverpool Street", distance: "Train", time: "55 min" },
];

// Nearby Amenities
const amenities = [
  { name: "Tesco Express", distance: "0.2 miles" },
  { name: "Southend High Street", distance: "0.8 miles" },
  { name: "Southend Hospital", distance: "1.5 miles" },
  { name: "Southend Beach", distance: "0.6 miles" },
];

// Quick Stats
const quickStats = [
  { label: "Avg Price (SS1)", value: "£325,000" },
  { label: "Avg Price/sqm", value: "£2,750" },
  { label: "vs Average", value: "-12%", highlight: true },
  { label: "Area HMO Score", value: "72/100" },
  { label: "Existing HMOs", value: "156 in SS1" },
  { label: "Article 4 Status", value: "Not in force" },
];

// Room Demand Data
const roomDemand = [
  { type: "Single Room", avgRent: "£450", demand: "High", daysToLet: "8 days" },
  { type: "Double Room", avgRent: "£550", demand: "Very High", daysToLet: "5 days" },
  { type: "En-suite Room", avgRent: "£650", demand: "High", daysToLet: "7 days" },
  { type: "Studio", avgRent: "£750", demand: "Medium", daysToLet: "12 days" },
];

const getDemandColor = (demand: string) => {
  if (demand === "Very High") return "bg-emerald-500";
  if (demand === "High") return "bg-emerald-400";
  if (demand === "Medium") return "bg-amber-500";
  return "bg-red-500";
};

export default function HmoScorecardDetailPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <DashboardHeader currentPath="/dashboard/hmo-scorecard" />

      <main className="flex-1">
        {/* Breadcrumb & Property Header */}
        <section className="border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1440px] px-8 py-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard/hmo-scorecard"
                  className="rounded-full p-2 hover:bg-black/5"
                >
                  <ArrowLeft className="size-5" />
                </Link>
                <div>
                  <p className="mb-2 text-xs text-black/60">
                    ← Back to results &nbsp;·&nbsp; Results &gt; {propertyData.postcode} &gt; {propertyData.address}
                  </p>
                  <h1 className="mb-2 text-3xl font-semibold text-black">
                    {propertyData.address}, {propertyData.city}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="text-black/60">{propertyData.postcode}</span>
                    <span className="rounded-full bg-black/10 px-3 py-1 text-sm">{propertyData.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-2 border-black">
                  <Heart className="mr-2 size-4" />
                  Add to Watchlist
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-2 size-4" />
                  Share
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
                      <span className={`text-3xl font-semibold ${metric.dark ? "text-white" : "text-black"}`}>
                        {metric.value}
                      </span>
                    </div>
                    <span className={`text-xs ${metric.dark ? "text-white/70" : "text-black/60"}`}>
                      {metric.subtext}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="sticky top-0 z-10 border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1440px] px-8">
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
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-[1440px] px-8 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content Column */}
            <div className="col-span-8 space-y-8">
              {/* Property Details */}
              <Card className="rounded-xl border border-black/10">
                <div className="border-b border-black/10 p-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                    <Home className="size-5" />
                    Property Details
                  </h2>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {propertyDetails.map((detail) => (
                      <div key={detail.label} className="flex justify-between border-b border-black/5 py-2">
                        <span className="text-sm text-black/60">{detail.label}</span>
                        <span className="text-sm font-medium text-black">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Location Map */}
              <Card className="rounded-xl border border-black/10">
                <div className="border-b border-black/10 p-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                    <MapPin className="size-5" />
                    Location
                  </h2>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-80 flex-col items-center justify-center rounded-xl bg-black/5">
                    <MapPin className="mb-4 size-16 text-black/40" />
                    <p className="text-black/60">Map showing property location</p>
                    <p className="text-sm text-black/40">{propertyData.address}, {propertyData.postcode}</p>
                  </div>
                  <p className="text-sm text-black/60">
                    {propertyData.address}, {propertyData.city}, {propertyData.postcode}
                  </p>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card className="rounded-xl border border-black/10">
                <div className="border-b border-black/10 p-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                    <TrendingUp className="size-5" />
                    Transaction History
                  </h2>
                </div>
                <CardContent className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-black/20">
                        <th className="py-3 text-left text-sm font-medium text-black">Date</th>
                        <th className="py-3 text-right text-sm font-medium text-black">Price</th>
                        <th className="py-3 text-right text-sm font-medium text-black">Change</th>
                        <th className="py-3 text-right text-sm font-medium text-black">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                      {transactionHistory.map((tx, i) => (
                        <tr key={i} className="hover:bg-black/[0.02]">
                          <td className="py-3 text-sm text-black">{tx.date}</td>
                          <td className="py-3 text-right text-sm font-medium text-black">{tx.price}</td>
                          <td className="py-3 text-right text-sm text-black/60">{tx.change}</td>
                          <td className="py-3 text-right text-sm text-black/60">{tx.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Price Trend Chart */}
              <Card className="rounded-xl border border-black/10">
                <div className="border-b border-black/10 p-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                    <BarChart3 className="size-5" />
                    Price Trend
                  </h2>
                </div>
                <CardContent className="p-6">
                  <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-black/5">
                    <BarChart3 className="mb-4 size-12 text-black/40" />
                    <p className="text-black/60">Price trend chart placeholder</p>
                    <p className="text-sm text-black/40">Historical price data visualization</p>
                  </div>
                </CardContent>
              </Card>

              {/* Comparables */}
              <Card className="rounded-xl border border-black/10">
                <div className="border-b border-black/10 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                      <Building className="size-5" />
                      Comparables
                    </h2>
                    <Button variant="outline" size="sm">
                      <MapPin className="mr-2 size-3" />
                      Show on map
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-black/20">
                        <th className="py-3 text-left text-sm font-medium text-black">Address</th>
                        <th className="py-3 text-left text-sm font-medium text-black">Date</th>
                        <th className="py-3 text-right text-sm font-medium text-black">Price</th>
                        <th className="py-3 text-right text-sm font-medium text-black">Price/sqm</th>
                        <th className="py-3 text-right text-sm font-medium text-black">Floor Area</th>
                        <th className="py-3 text-right text-sm font-medium text-black">Distance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                      {comparables.map((comp, i) => (
                        <tr key={i} className="hover:bg-black/[0.02]">
                          <td className="py-3 text-sm text-black">{comp.address}</td>
                          <td className="py-3 text-sm text-black/60">{comp.date}</td>
                          <td className="py-3 text-right text-sm font-medium text-black">{comp.price}</td>
                          <td className="py-3 text-right text-sm text-black/60">{comp.pricePerSqm}</td>
                          <td className="py-3 text-right text-sm text-black/60">{comp.floorArea}</td>
                          <td className="py-3 text-right text-sm text-black/60">{comp.distance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* HMO Score Breakdown */}
              <Card className="rounded-xl border border-black/10">
                <div className="border-b border-black/10 p-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                    <Users className="size-5" />
                    HMO Score Breakdown
                  </h2>
                </div>
                <CardContent className="p-6">
                  <div className="mb-8 space-y-4">
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
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between border-t-2 border-black/20 pt-4">
                      <span className="text-base font-medium text-black">Total Score</span>
                      <span className="text-3xl font-semibold text-black">{propertyData.hmoScore}/100</span>
                    </div>
                  </div>

                  {/* Strengths & Considerations */}
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="mb-4 flex items-center gap-2 border-b border-black/10 pb-3 text-base font-medium text-black">
                        <Check className="size-4 text-emerald-500" />
                        Strengths
                      </h3>
                      <ul className="space-y-3">
                        {strengths.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-black/60">
                            <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-4 flex items-center gap-2 border-b border-black/10 pb-3 text-base font-medium text-black">
                        <AlertTriangle className="size-4 text-amber-500" />
                        Considerations
                      </h3>
                      <ul className="space-y-3">
                        {considerations.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-black/60">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Yield Calculator */}
              <Card className="rounded-xl border border-black/10">
                <div className="border-b border-black/10 p-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                    <Calculator className="size-5" />
                    Yield Calculator
                  </h2>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div>
                      <h3 className="mb-4 border-b border-black/10 pb-2 text-sm font-medium text-black">
                        Inputs
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="mb-2 block text-sm text-black/60">
                            Number of Rooms
                          </label>
                          <Input
                            type="number"
                            defaultValue="5"
                            className="bg-white"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-black/60">
                            Avg Rent per Room (£/month)
                          </label>
                          <Input
                            type="number"
                            defaultValue="550"
                            className="bg-white"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-black/60">
                            Purchase Price (£)
                          </label>
                          <Input
                            type="number"
                            defaultValue="285000"
                            className="bg-white"
                          />
                        </div>
                        <Button className="w-full">
                          <Calculator className="mr-2 size-4" />
                          Calculate Yield
                        </Button>
                      </div>
                    </div>

                    {/* Outputs */}
                    <div>
                      <h3 className="mb-4 border-b border-black/10 pb-2 text-sm font-medium text-black">
                        Calculated Returns
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-black/10 py-3">
                          <span className="text-sm text-black/60">Monthly Income</span>
                          <span className="text-lg text-black">£2,750</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-black/10 py-3">
                          <span className="text-sm text-black/60">Annual Income</span>
                          <span className="text-lg text-black">£33,000</span>
                        </div>
                        <div className="flex items-center justify-between border-b-2 border-black/20 py-3">
                          <span className="text-sm font-medium text-black">Gross Yield</span>
                          <span className="text-2xl font-semibold text-black">11.6%</span>
                        </div>
                      </div>

                      <div className="mt-6 rounded-xl border border-black/10 bg-[#FAFAFA] p-4">
                        <h4 className="mb-3 text-sm font-medium text-black">Estimated Costs</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-black/60">Mortgage (75% LTV)</span>
                            <span className="text-black">£950/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-black/60">Maintenance (10%)</span>
                            <span className="text-black">£275/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-black/60">Management (10%)</span>
                            <span className="text-black">£275/month</span>
                          </div>
                          <div className="flex justify-between border-t border-black/10 pt-2 font-medium">
                            <span className="text-black">Net Yield</span>
                            <span className="text-black">7.2%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Room Demand */}
              <Card className="rounded-xl border border-black/10">
                <div className="border-b border-black/10 p-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                    <FileText className="size-5" />
                    Room Demand in SS1
                  </h2>
                </div>
                <CardContent className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-black/20">
                        <th className="py-3 text-left text-sm font-medium text-black">Room Type</th>
                        <th className="py-3 text-right text-sm font-medium text-black">Avg Rent</th>
                        <th className="py-3 text-center text-sm font-medium text-black">Demand Level</th>
                        <th className="py-3 text-right text-sm font-medium text-black">Avg Days to Let</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                      {roomDemand.map((room, i) => (
                        <tr key={i} className="hover:bg-black/[0.02]">
                          <td className="py-3 text-sm text-black">{room.type}</td>
                          <td className="py-3 text-right text-sm font-medium text-black">{room.avgRent}</td>
                          <td className="py-3 text-center">
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium text-white ${getDemandColor(room.demand)}`}>
                              {room.demand}
                            </span>
                          </td>
                          <td className="py-3 text-right text-sm text-black/60">{room.daysToLet}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="col-span-4">
              <div className="sticky top-16 space-y-6">
                {/* HMO Score Summary */}
                <Card className="rounded-xl border-2 border-black">
                  <CardContent className="p-6">
                    <div className="mb-4 text-center">
                      <p className="mb-2 text-sm text-black/60">HMO Score</p>
                      <div className="mb-2 text-6xl font-bold text-black">{propertyData.hmoScore}</div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium text-white ${getScoreStatus(propertyData.hmoScore).color}`}>
                        {getScoreStatus(propertyData.hmoScore).label}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {scoreBreakdown.map((item) => (
                        <div key={item.label}>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-black/60">{item.label}</span>
                            <span className="text-black">{item.score}/{item.max}</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
                            <div
                              className="h-2 rounded-full bg-black"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="rounded-xl border border-black/10">
                  <div className="border-b border-black/10 p-4">
                    <h3 className="text-sm font-semibold text-black">Quick Stats</h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {quickStats.map((stat, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-sm text-black/60">{stat.label}</span>
                          <span className={`text-sm font-medium ${stat.highlight ? "text-emerald-600" : "text-black"}`}>
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Transport Links */}
                <Card className="rounded-xl border border-black/10">
                  <div className="border-b border-black/10 p-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-black">
                      <Train className="size-4" />
                      Transport Links
                    </h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {transportLinks.map((link, i) => (
                        <div key={i} className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-black">{link.name}</p>
                            <p className="text-xs text-black/60">{link.time}</p>
                          </div>
                          <span className="text-sm text-black/60">{link.distance}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Nearby Amenities */}
                <Card className="rounded-xl border border-black/10">
                  <div className="border-b border-black/10 p-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-black">
                      <ShoppingBag className="size-4" />
                      Nearby Amenities
                    </h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-sm text-black">{amenity.name}</span>
                          <span className="text-sm text-black/60">{amenity.distance}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Area Context */}
                <Card className="rounded-xl border border-black/10 bg-[#FAFAFA]">
                  <CardContent className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-black">Area HMO Score</h3>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium text-white ${getScoreStatus(72).color}`}>
                        72/100
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-black/60">Avg Yield</span>
                        <span className="text-black">10.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black/60">Rental Demand</span>
                        <span className="text-black">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black/60">HMO Licensing</span>
                        <span className="text-black">Required</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black/60">Article 4</span>
                        <span className="text-black">Not in force</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full py-6">
                    <Heart className="mr-2 size-4" />
                    Add to Watchlist
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-black py-6">
                    <Share2 className="mr-2 size-4" />
                    Share Property
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
