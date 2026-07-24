import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import { site, isRealLink } from '@/content/site'

/** Closing CTA — Vedant-style “let’s build” band. */
export function HomeCta() {
  const resumeHref = isRealLink(site.links.resume) ? site.links.resume : '/resume'

  return (
    <section className="border-t border-border/60">
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 50% 100%, color-mix(in oklch, var(--primary) 16%, transparent), transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Let&apos;s build the things we wish already existed.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Open to Applied AI, ML, and Data Science internships for Fall 2026 and
            Summer 2027 — especially teams that care about evaluation, not just demos.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Get In Touch
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={resumeHref}
              target={isRealLink(site.links.resume) ? '_blank' : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-accent"
            >
              <FileText className="size-4" />
              Download Résumé
            </a>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-block text-sm font-medium text-primary hover:underline"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  )
}
