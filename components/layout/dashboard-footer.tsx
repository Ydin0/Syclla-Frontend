import Image from 'next/image'
import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'HMO Analysis', href: '/dashboard/area-insights' },
      { label: 'Lease Opportunities', href: '/dashboard/lease-opportunities' },
      { label: 'Watchlist', href: '/dashboard/watchlist' },
      { label: 'Saved Searches', href: '/dashboard/saved-searches' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'API Access', href: '#' },
      { label: 'Data Sources', href: '#' },
      { label: 'Methodology', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
]

const socialLinks = [
  { name: 'X', href: '#', label: 'X' },
  { name: 'LinkedIn', href: '#', label: 'LinkedIn' },
  { name: 'YouTube', href: '#', label: 'YouTube' },
]

interface DashboardFooterProps {
  lastUpdated?: string
}

export function DashboardFooter({ lastUpdated = '23 Jan 2026' }: DashboardFooterProps) {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-[1440px] px-8 py-10">
        <div className="mb-8 grid grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="mb-4 flex items-center">
              <Image src="/MainLogo.svg" alt="PropInvest Pro" width={110} height={24} />
            </div>
            <p className="mb-4 text-[13px] leading-relaxed text-black/60">
              Professional property investment analysis platform for HMO conversions and lease
              extension opportunities across the UK.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex size-9 items-center justify-center rounded-full border border-black/10 text-xs text-black/40 hover:border-black/20 hover:text-black"
                >
                  {social.label[0]}
                </a>
              ))}
            </div>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-black/40">
                {section.title}
              </div>
              <ul className="space-y-2 text-[13px] text-black/60">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-black">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-black/10 pt-6 text-xs text-black/50">
          <div>© 2026 PropInvest Pro. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <span>Data updated: {lastUpdated}</span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
