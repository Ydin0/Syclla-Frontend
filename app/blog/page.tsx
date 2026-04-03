import {
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  Building,
  FileText,
  TrendingUp,
  BookOpen,
  Newspaper,
  Lightbulb,
} from "lucide-react";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";

const articles = [
  {
    id: 1,
    title: "How to Make £40k Profit from Lease Extensions: A Complete Guide",
    excerpt: "Lease extensions can be incredibly profitable if you know what to look for. Here's our step-by-step guide...",
    category: "Lease Extensions",
    date: "18 January 2026",
    readTime: "12 min read",
  },
  {
    id: 2,
    title: "Article 4 Directions Explained: What Every HMO Investor Needs to Know",
    excerpt: "Article 4 can make or break your HMO plans. Learn which areas have restrictions and how to work around them...",
    category: "HMO Strategy",
    date: "15 January 2026",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "HMO Investing 101: Everything You Need to Get Started",
    excerpt: "New to HMO investing? This comprehensive guide covers licensing, planning, finance, and everything in between...",
    category: "Beginner Guides",
    date: "12 January 2026",
    readTime: "15 min read",
  },
  {
    id: 4,
    title: "Manchester vs Birmingham: Which City Offers Better HMO Returns in 2026?",
    excerpt: "A deep-dive comparison of two of the UK's hottest HMO markets. We analyze yields, demand, regulations, and growth potential...",
    category: "Market Analysis",
    date: "8 January 2026",
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "New HMO Licensing Rules Announced for 2026: What You Need to Know",
    excerpt: "The government has announced changes to HMO licensing requirements. Here's what's changing and how it affects your investments...",
    category: "News",
    date: "5 January 2026",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "Understanding the Marriage Value: Why Leases Under 80 Years Are Goldmines",
    excerpt: "Marriage value can add tens of thousands to your lease extension costs - or profits. Here's how to calculate and capitalize on it...",
    category: "Lease Extensions",
    date: "2 January 2026",
    readTime: "9 min read",
  },
];

const categories = [
  "All",
  "HMO Strategy",
  "Lease Extensions",
  "Market Analysis",
  "Beginner Guides",
  "News",
];

const topics = [
  {
    icon: Building,
    title: "HMO Strategy",
    description: "Learn how to find, analyze, and manage profitable HMO investments",
    count: 24,
  },
  {
    icon: FileText,
    title: "Lease Extensions",
    description: "Master the art of lease extension investing for maximum profit",
    count: 18,
  },
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Data-driven insights into UK property markets and trends",
    count: 31,
  },
  {
    icon: BookOpen,
    title: "Beginner Guides",
    description: "Start your property investment journey with confidence",
    count: 15,
  },
  {
    icon: Newspaper,
    title: "News & Updates",
    description: "Stay updated on regulations, policy changes, and industry news",
    count: 27,
  },
  {
    icon: Lightbulb,
    title: "Case Studies",
    description: "Real-world examples of successful property investments",
    count: 12,
  },
];

export default function BlogPage() {
  return (
    <div className="w-full bg-white">
      <Header currentPath="/blog" />

      {/* Blog Header */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <h1 className="text-4xl font-semibold text-black">The PropInvest Pro Blog</h1>
            <p className="text-lg text-black/60">
              Insights, strategies, and market analysis for UK property investors
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="w-full bg-white pb-12">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
            <div className="grid grid-cols-2">
              <div className="flex h-[400px] items-center justify-center bg-black/[0.02]">
                <span className="text-[13px] text-black/40">Featured Article Image</span>
              </div>
              <div className="flex flex-col justify-center space-y-5 p-10">
                <span className="inline-block w-fit rounded-full bg-black px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                  Market Analysis
                </span>
                <h2 className="text-2xl font-semibold leading-tight text-black">
                  The Top 10 UK Areas for HMO Investment in 2026
                </h2>
                <p className="text-[15px] leading-relaxed text-black/60">
                  We&apos;ve analysed yield potential, rental demand, and regulatory
                  environments across 380 areas. Here are the best places to invest
                  this year...
                </p>
                <div className="flex items-center gap-5 pt-2">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=3847"
                      alt="Author"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-[13px] text-black/70">PropInvest Team</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-black/50">
                    <span>20 January 2026</span>
                    <span>•</span>
                    <span>8 min read</span>
                  </div>
                </div>
                <button className="mt-2 h-10 w-fit rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/80">
                  Read Article →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="w-full border-b border-black/10 bg-white py-6">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category, i) => (
              <button
                key={category}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                  i === 0
                    ? "bg-black text-white"
                    : "border border-black/10 text-black/60 hover:border-black/20 hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="w-full bg-white py-12">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="grid grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-white transition-colors hover:border-black/20"
              >
                <div className="flex h-[200px] items-center justify-center bg-black/[0.02]">
                  <span className="text-[13px] text-black/40">Article Thumbnail</span>
                </div>
                <div className="space-y-3 p-5">
                  <span className="inline-block rounded-full bg-black px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-semibold leading-snug text-black group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-black/60">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-xs text-black/50">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="w-full border-t border-black/10 bg-white py-8">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="flex items-center justify-center gap-1">
            <button
              disabled
              className="flex size-10 items-center justify-center rounded-lg border border-black/10 bg-white text-black/30"
            >
              <ChevronLeft className="size-4" />
            </button>
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                className={`flex size-10 items-center justify-center rounded-lg text-sm font-medium ${
                  n === 1
                    ? "bg-black text-white"
                    : "border border-black/10 bg-white hover:bg-black/[0.02]"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="px-2 text-black/30">...</span>
            <button className="flex size-10 items-center justify-center rounded-lg border border-black/10 bg-white text-sm font-medium hover:bg-black/[0.02]">
              12
            </button>
            <button className="flex size-10 items-center justify-center rounded-lg border border-black/10 bg-white hover:bg-black/[0.02]">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="w-full bg-[#FAFAFA] py-16">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="mx-auto max-w-xl space-y-5 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-black">
              <Mail className="size-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-black">
              Get Weekly Investment Insights
            </h2>
            <p className="text-[15px] text-black/60">
              Join 5,000+ investors receiving our weekly newsletter with market
              analysis, investment strategies, and new opportunities.
            </p>
            <div className="mx-auto flex max-w-md items-center gap-2 pt-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="h-11 flex-1 rounded-lg border border-black/10 bg-black/[0.02] px-4 text-[13px] placeholder:text-black/40 focus:border-black/20 focus:outline-none"
              />
              <button className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/80">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-black/40">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl font-semibold text-black">Popular Topics</h2>
            <p className="text-[15px] text-black/60">Browse articles by topic</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="group cursor-pointer space-y-3 rounded-xl border border-black/10 p-5 transition-colors hover:border-black/20"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-black">
                  <topic.icon className="size-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black group-hover:underline">
                  {topic.title}
                </h3>
                <p className="text-[13px] text-black/60">{topic.description}</p>
                <div className="pt-1">
                  <span className="text-xs text-black/50">{topic.count} articles</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-black py-16">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-3xl font-semibold leading-tight text-white">
              Ready to Find Your Next Investment?
            </h2>
            <p className="text-lg text-white/50">
              Join thousands of investors using PropInvest Pro to discover
              profitable property opportunities across the UK.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button className="h-11 rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-white/90">
                Start Free Trial
              </button>
              <button className="h-11 rounded-full border-2 border-white px-6 text-sm font-medium text-white hover:bg-white/10">
                View Pricing
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-white" />
                <span className="text-[13px] text-white/50">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-white" />
                <span className="text-[13px] text-white/50">No credit card required</span>
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
