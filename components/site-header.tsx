'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText } from 'lucide-react'
import { site, isRealLink } from '@/content/site'
import { primaryNav } from '@/content/site-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

/** Shown in the top bar — logo goes Home; Résumé is the button on the right. */
const barNav = primaryNav.filter(
  (item) => item.label !== 'Résumé' && item.label !== 'Home',
)

/**
 * Mobile: identity row + full-width scrollable nav.
 * Desktop: single row with centered links.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const resumeHref = isRealLink(site.links.resume) ? site.links.resume : '/resume'

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        {/* Identity + actions */}
        <div className="flex h-14 items-center gap-2 sm:h-16 sm:gap-4">
          <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-2.5">
            <Image
              src="/about/headshot.png"
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-full object-cover ring-2 ring-primary/25"
              priority
            />
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-sm font-semibold tracking-tight">
                {site.fullName}
              </span>
              <span className="hidden text-[11px] text-muted-foreground sm:block">
                Applied AI · ML · Data Science
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex"
            aria-label="Primary"
          >
            {barNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1">
            <ThemeToggle />
            <a
              href={resumeHref}
              target={isRealLink(site.links.resume) ? '_blank' : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:px-3.5 sm:py-2 sm:text-sm"
            >
              <FileText className="size-3.5 sm:size-4" />
              <span className="hidden sm:inline">Résumé</span>
            </a>
          </div>
        </div>

        {/* Mobile nav — second row, swipeable */}
        <nav
          className="-mx-3 flex gap-0.5 overflow-x-auto border-t border-border/50 px-3 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
          aria-label="Primary"
        >
          {barNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
