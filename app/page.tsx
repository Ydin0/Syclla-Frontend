import {
  Check,
  Shield,
  FileText,
  Landmark,
  DoorOpen,
  Search,
  MapPin,
  TrendingUp,
  CircleCheck,
  Star,
} from "lucide-react";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";

export default function Home() {
  return (
    <div className="w-full bg-white">
      <Header currentPath="/" />

      {/* Hero Section */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1440px] px-8 py-20">
          <div className="grid grid-cols-2 items-center gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-semibold leading-tight text-black">
                  Find Your Next Property Investment in Minutes, Not Months
                </h1>
                <p className="text-lg leading-relaxed text-black/60">
                  The UK&apos;s most comprehensive property investment platform.
                  Discover the best areas for HMO conversions and uncover hidden
                  lease extension opportunities across 25 million properties.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="h-11 rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/80">
                  Start Free Trial
                </button>
                <button className="h-11 rounded-full border-2 border-black px-6 text-sm font-medium text-black hover:bg-black/[0.02]">
                  See How It Works
                </button>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-black" />
                  <span className="text-[13px] text-black/60">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-black" />
                  <span className="text-[13px] text-black/60">No credit card required</span>
                </div>
              </div>
            </div>
            <div className="flex h-[440px] items-center justify-center rounded-xl border-2 border-dashed border-black/10 bg-black/[0.01]">
              <span className="text-[13px] text-black/40">
                Dashboard Screenshot - Property Map with Data Points
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="w-full border-y border-black/10 bg-[#FAFAFA] py-8">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Shield className="size-5 text-black/50" />
              <span className="text-[13px] text-black/60">
                Powered by official UK data sources
              </span>
            </div>
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-black/40" />
                <span className="text-[13px] text-black/60">EPC Register</span>
              </div>
              <div className="flex items-center gap-2">
                <Landmark className="size-4 text-black/40" />
                <span className="text-[13px] text-black/60">HM Land Registry</span>
              </div>
              <div className="flex items-center gap-2">
                <DoorOpen className="size-4 text-black/40" />
                <span className="text-[13px] text-black/60">SpareRoom</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-black">25M+</span>
              <span className="text-[13px] text-black/60">properties analysed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Solution Section */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-semibold text-black">
              Stop Wasting Hours on Property Research
            </h2>
            <p className="text-lg text-black/60">
              Get all the insights you need to make smart investment decisions, fast.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-black/5">
                <Search className="size-5 text-black/50" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                Tired of searching multiple websites?
              </h3>
              <div className="mb-3 h-px w-12 bg-black/10" />
              <p className="text-[13px] leading-relaxed text-black/60">
                All UK property data in one platform. No more juggling between EPC
                registers, Land Registry, and rental sites.
              </p>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-black/5">
                <MapPin className="size-5 text-black/50" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                Missing out on the best areas?
              </h3>
              <div className="mb-3 h-px w-12 bg-black/10" />
              <p className="text-[13px] leading-relaxed text-black/60">
                HMO area rankings show you exactly where to invest. Compare 380+
                areas based on demand, yields, and regulations.
              </p>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-black/5">
                <TrendingUp className="size-5 text-black/50" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                Can&apos;t find lease extension deals?
              </h3>
              <div className="mb-3 h-px w-12 bg-black/10" />
              <p className="text-[13px] leading-relaxed text-black/60">
                We identify 847,000+ short lease opportunities with instant profit
                calculations and extension cost estimates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full bg-[#FAFAFA] py-20">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-semibold text-black">
              Two Powerful Investment Strategies, One Platform
            </h2>
            <p className="text-lg text-black/60">
              Whether you&apos;re building an HMO portfolio or hunting lease
              extensions, we&apos;ve got you covered.
            </p>
          </div>

          <div className="space-y-20">
            {/* HMO Feature */}
            <div className="grid grid-cols-2 items-center gap-12">
              <div className="space-y-5">
                <span className="inline-block rounded-full bg-black px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                  HMO Area Analysis
                </span>
                <h3 className="text-2xl font-semibold text-black">
                  Discover the Best Areas for HMO Investment
                </h3>
                <p className="text-[15px] leading-relaxed text-black/60">
                  Stop guessing where to invest. Our comprehensive area analysis
                  ranks 380+ UK locations based on real data from transport links,
                  universities, rental demand, and local regulations.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 size-5 text-black" />
                    <div>
                      <p className="text-[13px] font-medium text-black">
                        Area scoring and rankings
                      </p>
                      <p className="text-xs text-black/50">
                        Compare yields, demand, and regulations at a glance
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 size-5 text-black" />
                    <div>
                      <p className="text-[13px] font-medium text-black">
                        Transport and amenity analysis
                      </p>
                      <p className="text-xs text-black/50">
                        Proximity to stations, universities, and employment hubs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 size-5 text-black" />
                    <div>
                      <p className="text-[13px] font-medium text-black">
                        Room rent insights
                      </p>
                      <p className="text-xs text-black/50">
                        Real rental data from SpareRoom and other sources
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 size-5 text-black" />
                    <div>
                      <p className="text-[13px] font-medium text-black">
                        Side-by-side comparison
                      </p>
                      <p className="text-xs text-black/50">
                        Compare multiple areas to find your perfect location
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex h-[400px] items-center justify-center rounded-xl border-2 border-dashed border-black/10 bg-black/[0.01]">
                <span className="text-[13px] text-black/40">
                  HMO Area Rankings Dashboard Screenshot
                </span>
              </div>
            </div>

            {/* Lease Feature */}
            <div className="grid grid-cols-2 items-center gap-12">
              <div className="flex h-[400px] items-center justify-center rounded-xl border-2 border-dashed border-black/10 bg-black/[0.01]">
                <span className="text-[13px] text-black/40">
                  Lease Opportunity Finder Screenshot
                </span>
              </div>
              <div className="space-y-5">
                <span className="inline-block rounded-full bg-black px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                  Lease Opportunity Finder
                </span>
                <h3 className="text-2xl font-semibold text-black">
                  Uncover Profitable Lease Extension Deals
                </h3>
                <p className="text-[15px] leading-relaxed text-black/60">
                  Find flats with short leases trading at below-market prices. We
                  calculate extension costs and potential profits automatically, so
                  you can spot deals in seconds.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 size-5 text-black" />
                    <div>
                      <p className="text-[13px] font-medium text-black">
                        847,000+ opportunities identified
                      </p>
                      <p className="text-xs text-black/50">
                        Short lease flats across England and Wales
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 size-5 text-black" />
                    <div>
                      <p className="text-[13px] font-medium text-black">
                        Instant profit estimates
                      </p>
                      <p className="text-xs text-black/50">
                        See potential gains before you make an offer
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 size-5 text-black" />
                    <div>
                      <p className="text-[13px] font-medium text-black">
                        Extension cost calculations
                      </p>
                      <p className="text-xs text-black/50">
                        Accurate estimates based on lease length and property value
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 size-5 text-black" />
                    <div>
                      <p className="text-[13px] font-medium text-black">
                        Advanced filtering
                      </p>
                      <p className="text-xs text-black/50">
                        Filter by lease length, price, location, and profit potential
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-semibold text-black">
              From Search to Investment in 3 Steps
            </h2>
            <p className="text-lg text-black/60">
              Our streamlined process gets you from research to action faster than
              ever.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-5">
              <div className="flex size-14 items-center justify-center rounded-xl bg-black text-2xl font-semibold text-white">
                1
              </div>
              <h3 className="text-lg font-semibold text-black">Explore Areas</h3>
              <p className="text-[13px] leading-relaxed text-black/60">
                Use our rankings and filters to find the best locations for your
                investment strategy. Compare areas side-by-side and dive into
                detailed metrics.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-black" />
                  <span className="text-xs text-black/60">Browse 380+ ranked areas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-black" />
                  <span className="text-xs text-black/60">Filter by your criteria</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-black" />
                  <span className="text-xs text-black/60">View detailed area profiles</span>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex size-14 items-center justify-center rounded-xl bg-black text-2xl font-semibold text-white">
                2
              </div>
              <h3 className="text-lg font-semibold text-black">
                Analyse Opportunities
              </h3>
              <p className="text-[13px] leading-relaxed text-black/60">
                Dive deep into property data, area scores, and profit calculations.
                Get all the insights you need to make confident investment
                decisions.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-black" />
                  <span className="text-xs text-black/60">View detailed property data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-black" />
                  <span className="text-xs text-black/60">Calculate potential returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-black" />
                  <span className="text-xs text-black/60">Compare similar properties</span>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex size-14 items-center justify-center rounded-xl bg-black text-2xl font-semibold text-white">
                3
              </div>
              <h3 className="text-lg font-semibold text-black">Take Action</h3>
              <p className="text-[13px] leading-relaxed text-black/60">
                Save your favourite opportunities, track them over time, and export
                data to share with partners or agents. Turn insights into
                investments.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-black" />
                  <span className="text-xs text-black/60">Save and bookmark deals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-black" />
                  <span className="text-xs text-black/60">Export to CSV or PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-black" />
                  <span className="text-xs text-black/60">Track opportunities over time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-black py-20">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-semibold text-white">
              The Numbers Speak for Themselves
            </h2>
            <p className="text-lg text-white/50">
              Comprehensive data coverage across the entire UK property market.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div className="rounded-xl border border-white/10 p-6 text-center">
              <div className="mb-2 text-4xl font-semibold text-white">25M+</div>
              <div className="mb-1 text-sm text-white/60">Properties in Database</div>
              <p className="text-xs text-white/40">
                Complete coverage of residential properties across England and Wales
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 text-center">
              <div className="mb-2 text-4xl font-semibold text-white">847K+</div>
              <div className="mb-1 text-sm text-white/60">Short Lease Flats</div>
              <p className="text-xs text-white/40">
                Identified opportunities for profitable lease extensions
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 text-center">
              <div className="mb-2 text-4xl font-semibold text-white">380+</div>
              <div className="mb-1 text-sm text-white/60">Areas Ranked</div>
              <p className="text-xs text-white/40">
                Comprehensive HMO area analysis and scoring across the UK
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 text-center">
              <div className="mb-2 text-4xl font-semibold text-white">£32K</div>
              <div className="mb-1 text-sm text-white/60">Avg. Extension Profit</div>
              <p className="text-xs text-white/40">
                Average potential profit from lease extension opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-[#FAFAFA] py-20">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-semibold text-black">
              Trusted by Property Investors
            </h2>
            <p className="text-lg text-black/60">
              See what our users have to say about PropInvest Pro.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-black text-black" />
                ))}
              </div>
              <p className="mb-6 text-[13px] leading-relaxed text-black/70">
                &quot;Found my first HMO deal within a week of signing up. The area
                insights saved me months of research. Absolutely worth the
                investment.&quot;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=12345"
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-[13px] font-medium text-black">James T.</p>
                  <p className="text-xs text-black/50">HMO Investor, Essex</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-black text-black" />
                ))}
              </div>
              <p className="mb-6 text-[13px] leading-relaxed text-black/70">
                &quot;The lease opportunity finder is a game-changer. I&apos;ve
                completed 3 profitable extensions this year already. The profit
                calculations are spot on.&quot;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=67890"
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-[13px] font-medium text-black">Sarah M.</p>
                  <p className="text-xs text-black/50">Property Developer, London</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-black text-black" />
                ))}
              </div>
              <p className="mb-6 text-[13px] leading-relaxed text-black/70">
                &quot;Finally, all the data I need in one place. No more switching
                between multiple websites. Worth every penny for the time it saves
                me.&quot;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=24680"
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-[13px] font-medium text-black">David R.</p>
                  <p className="text-xs text-black/50">Portfolio Landlord, Manchester</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-black py-20">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-3xl font-semibold leading-tight text-white">
              Ready to Find Your Next Investment?
            </h2>
            <p className="text-lg text-white/50">
              Join thousands of investors using PropInvest Pro to make smarter,
              data-driven decisions.
            </p>
            <div className="flex items-center justify-center pt-2">
              <button className="h-11 rounded-full bg-white px-8 text-sm font-medium text-black hover:bg-white/90">
                Start Your Free Trial
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-white" />
                <span className="text-[13px] text-white/50">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-white" />
                <span className="text-[13px] text-white/50">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-white" />
                <span className="text-[13px] text-white/50">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
