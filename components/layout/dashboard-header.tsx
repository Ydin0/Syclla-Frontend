'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bell, HelpCircle, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/components/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

interface NavDropdownItem {
  label: string
  href: string
  description?: string
  comingSoon?: boolean
}

interface NavItem {
  label: string
  href?: string
  dropdown?: NavDropdownItem[]
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  {
    label: 'Scorecards',
    dropdown: [
      { label: 'Area Insights', href: '/dashboard/area-insights', description: 'View HMO area rankings and scores' },
      { label: 'HMO Scorecard', href: '/dashboard/hmo-scorecard', description: 'Assess HMO conversion suitability' },
      { label: 'Care Home Potential', href: '#', description: 'Evaluate care/supported living potential', comingSoon: true },
      { label: 'Serviced Accommodation', href: '#', description: 'Analyse short-term rental potential', comingSoon: true },
      { label: 'BRRR Analysis', href: '#', description: 'Buy, Refurbish, Refinance, Rent calculator', comingSoon: true },
      { label: 'Development Appraisal', href: '#', description: 'Assess conversion/redevelopment potential', comingSoon: true },
      { label: 'Flip Calculator', href: '#', description: 'Calculate buy-renovate-sell profit', comingSoon: true },
    ],
  },
  {
    label: 'Lease Opportunities',
    dropdown: [
      { label: 'Find Opportunities', href: '/dashboard/lease-opportunities', description: 'Search for short lease properties' },
      { label: 'My Leases', href: '/dashboard/leases', description: 'View your saved lease opportunities' },
    ],
  },
  { label: 'Watchlist', href: '/dashboard/watchlist' },
  { label: 'Saved Searches', href: '/dashboard/saved-searches' },
]

interface DashboardHeaderProps {
  currentPath?: string
}

export function DashboardHeader({
  currentPath = '/dashboard',
}: DashboardHeaderProps) {
  const { user, logout, isLoading } = useAuth()

  const userName = user
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email
    : 'User'
  const userAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${userName}&backgroundColor=000000&textColor=ffffff`

  const handleSignOut = async () => {
    await logout()
  }

  const isActive = (item: NavItem) => {
    if (item.href) {
      return currentPath === item.href
    }
    if (item.dropdown) {
      return item.dropdown.some((subItem) => currentPath === subItem.href)
    }
    return false
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/MainLogo.svg"
                alt="PropInvest Pro"
                width={110}
                height={24}
                priority
              />
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => {
                  const active = isActive(item)

                  if (item.dropdown) {
                    return (
                      <NavigationMenuItem key={item.label}>
                        <NavigationMenuTrigger
                          className={cn(
                            active && 'bg-[#F8F7FF] text-black'
                          )}
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="w-64 p-2">
                          <div className="px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-black/40">
                            {item.label}
                          </div>
                          <div className="-mx-1 my-1 h-px bg-black/5" />
                          <ul className="space-y-0.5">
                            {item.dropdown.map((subItem) => (
                              <li key={subItem.label}>
                                {subItem.comingSoon ? (
                                  <div className="flex cursor-default flex-col items-start gap-0.5 rounded-lg px-4 py-2 opacity-60">
                                    <span className="flex items-center gap-2 text-sm font-medium text-black/80">
                                      {subItem.label}
                                      <span className="rounded bg-black/5 px-1.5 py-0.5 text-[10px] font-medium text-black/40">
                                        Coming Soon
                                      </span>
                                    </span>
                                    {subItem.description && (
                                      <span className="text-xs text-black/50">{subItem.description}</span>
                                    )}
                                  </div>
                                ) : (
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={subItem.href}
                                      className="flex flex-col items-start gap-0.5 rounded-lg px-4 py-2 text-sm text-black/80 transition-colors hover:bg-black/5 hover:text-black"
                                    >
                                      <span className="font-medium">{subItem.label}</span>
                                      {subItem.description && (
                                        <span className="text-xs text-black/50">{subItem.description}</span>
                                      )}
                                    </Link>
                                  </NavigationMenuLink>
                                )}
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  }

                  return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href!}
                          className={cn(
                            'flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors',
                            active
                              ? 'bg-[#F8F7FF] text-black'
                              : 'text-black/60 hover:bg-black/[0.02] hover:text-black'
                          )}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex size-9 items-center justify-center rounded-full text-black/40 hover:bg-black/5 hover:text-black">
              <Bell className="size-4" />
            </button>
            <button className="flex size-9 items-center justify-center rounded-full text-black/40 hover:bg-black/5 hover:text-black">
              <HelpCircle className="size-4" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-2 flex items-center gap-2.5 border-l border-black/10 pl-4">
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="size-8 rounded-full"
                  />
                  <span className="text-[13px] font-medium">{userName}</span>
                  <ChevronDown className="size-3 text-black/40" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/billing">Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
