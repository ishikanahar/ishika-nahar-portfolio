import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { experienceRoles, leadership } from '@/content/experience'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Roles across Luveo Health, Sternson Lab, Owkin, Skillsoft, and independent AI builds.',
}

export default function ExperiencePage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <header className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Experience</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Where I&apos;ve built and shipped
          </h1>
          <p className="mt-3 text-muted-foreground text-pretty">
            Applied AI, machine learning research, biomedical evaluation, and
            product analytics — each card links into the deeper case study.
          </p>
        </header>

        <div className="mt-12 space-y-6">
          {experienceRoles.map((role) => (
            <article
              key={role.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
            >
              <span className="inline-flex rounded-full bg-primary/12 px-2.5 py-0.5 text-xs font-medium text-primary">
                {role.id === 'owkin'
                  ? 'Hackathon'
                  : role.id === 'momentum'
                    ? 'Independent'
                    : role.id === 'skillsoft'
                      ? 'Internship'
                      : role.id === 'luveo'
                        ? 'Internship'
                        : 'Research'}
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                {role.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-primary">
                {role.organization}
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {role.timeline}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  {role.location}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                {role.context}
              </p>

              <h3 className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Key work
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
                {role.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Skills
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {role.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {role.caseStudySlug && (
                <Link
                  href={`/work/${role.caseStudySlug}`}
                  className="mt-5 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Open case study <ArrowUpRight className="size-3.5" />
                </Link>
              )}
            </article>
          ))}
        </div>

        <div className="mt-14 space-y-4">
          <h2 className="font-display text-xl font-semibold">Leadership & beyond</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {leadership.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-4"
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
            <div className="rounded-xl border border-border bg-card p-4 sm:col-span-2">
              <p className="text-sm font-semibold">House Captain · Competitive swimming</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Led house teams and competed in swimming at La Martinière for Girls —
                early practice in responsibility, pressure, and team delivery.{' '}
                <Link href="/about" className="text-primary hover:underline">
                  Photos on About →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
