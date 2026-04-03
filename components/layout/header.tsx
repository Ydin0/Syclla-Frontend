import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/components/lib/utils'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
]

interface HeaderProps {
  currentPath?: string
}

export function Header({ currentPath = '/' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center">
              <Image
                src="/MainLogo.svg"
                alt="PropInvest Pro"
                width={110}
                height={24}
                priority
              />
            </Link>
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = currentPath === item.href ||
                  (item.href.startsWith('/') && currentPath.startsWith(item.href))

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors',
                      isActive
                        ? 'bg-[#F8F7FF] text-black'
                        : 'text-black/60 hover:bg-black/[0.02] hover:text-black'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-black" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="ghost">
                Sign In
              </Button>
            </Link>
            <Button>Start Free Trial</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
