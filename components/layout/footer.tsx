import Image from 'next/image'
import Link from 'next/link'
import { Mail } from 'lucide-react'

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
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Roadmap', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '#contact' },
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  },
]

const socialLinks = [
  {
    name: 'X',
    href: '#',
    icon: (
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-black/10 bg-white py-12">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="mb-10 grid grid-cols-5 gap-10">
          <div className="col-span-2 space-y-5">
            <Link href="/" className="flex items-center">
              <Image
                src="/MainLogo.svg"
                alt="PropInvest Pro"
                width={110}
                height={24}
              />
            </Link>
            <p className="text-[13px] leading-relaxed text-black/60">
              The UK&apos;s most comprehensive property investment platform. Make
              smarter decisions with data-driven insights.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex size-9 items-center justify-center rounded-full border border-black/10 text-black/40 hover:border-black/20 hover:text-black"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-[10px] font-semibold uppercase tracking-wider text-black/40">
                {section.title}
              </h4>
              <nav className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[13px] text-black/60 hover:text-black"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-black/10 pt-8">
          <p className="text-xs text-black/50">
            © 2026 PropInvest Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-black/40" />
            <a
              href="mailto:hello@propinvestpro.com"
              className="text-xs text-black/50 hover:text-black"
            >
              hello@propinvestpro.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
