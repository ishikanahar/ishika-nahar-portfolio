import Link from 'next/link'
import { ArrowRight, FileText, Mail } from 'lucide-react'
import { site, isRealLink } from '@/content/site'
import { SocialLinks } from '@/components/social-links'
import { HeroVisual } from '@/components/hero-visual'

export function Hero() {
  const resumeHref = isRealLink(site.links.resume) ? site.links.resume : '/resume'

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div>
          {site.availability && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {site.availability}
            </div>
          )}

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {site.intro}
          </p>

          <p className="mt-5 font-mono text-sm text-primary">{site.role}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              View my work
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={resumeHref}
              target={isRealLink(site.links.resume) ? '_blank' : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              <FileText className="size-4" />
              View résumé
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" />
              Get in touch
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3 border-t border-border/60 pt-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Find me
            </span>
            <SocialLinks className="-ml-1" />
          </div>
        </div>

        <div className="relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
