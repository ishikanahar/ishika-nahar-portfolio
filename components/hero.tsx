import Link from 'next/link'
import { ArrowRight, FileText, MapPin } from 'lucide-react'
import { site, isRealLink } from '@/content/site'
import { SocialLinks } from '@/components/social-links'
import { NeuroBackdrop } from '@/components/neuro-backdrop'

/**
 * Vedant-style centered hero: name is the brand signal,
 * one short bio, two clear CTAs, socials. No side panel / tab carousel.
 */
export function Hero() {
  const resumeHref = isRealLink(site.links.resume) ? site.links.resume : '/resume'

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <NeuroBackdrop />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-16 lg:py-20">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {site.availability && (
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Available for internships
            </div>
          )}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <MapPin className="size-3" />
            {site.location}
          </div>
        </div>

        <p className="mt-6 text-sm font-medium tracking-wide text-muted-foreground sm:mt-8">
          Hello, I&apos;m
        </p>

        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
          {site.fullName}
        </h1>

        <h2 className="mt-3 font-display text-lg font-medium text-foreground/90 sm:mt-4 sm:text-2xl">
          {site.role}
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:mt-6 sm:text-lg">
          {site.intro} Currently at {site.school} ({site.degree.split('|')[0]?.trim()}
          ), {site.graduation.toLowerCase()}.
        </p>

        <div className="mt-7 flex w-full max-w-md flex-col gap-2.5 sm:mt-9 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
          <Link
            href="#demos"
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:px-6"
          >
            Try interactive demos
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/work"
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-accent sm:w-auto sm:px-6"
          >
            All projects
          </Link>
          <a
            href={resumeHref}
            target={isRealLink(site.links.resume) ? '_blank' : undefined}
            rel="noreferrer"
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-accent sm:w-auto sm:px-6"
          >
            <FileText className="size-4" />
            Open Résumé
          </a>
        </div>

        <div className="mt-8">
          <SocialLinks />
        </div>
      </div>
    </section>
  )
}
