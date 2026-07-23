import Link from 'next/link'
import { site, isRealLink } from '@/content/site'
import { SocialLinks } from '@/components/social-links'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="font-display text-xl font-semibold tracking-tight text-balance">
              Let&apos;s build something reliable together.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Open to Applied AI, ML, and Data Science internships for Fall 2026
              and Summer 2027.
            </p>
            {isRealLink(site.email) ? (
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            ) : (
              <span className="mt-3 inline-block text-sm text-muted-foreground">
                [Ishika: add email in content/site.ts]
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <SocialLinks />
            <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
              <Link href="/work" className="hover:text-foreground">Projects</Link>
              <Link href="/experience" className="hover:text-foreground">Experience</Link>
              <Link href="/about" className="hover:text-foreground">About</Link>
              <Link href="/contact" className="hover:text-foreground">Contact</Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          © {year} {site.name}. Built with care.
        </div>
      </div>
    </footer>
  )
}
