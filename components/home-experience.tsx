import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { experienceRoles } from '@/content/experience'
import { SectionHeading } from '@/components/section-heading'

/** Vedant-style experience strip on the homepage. */
export function HomeExperience() {
  const preview = experienceRoles.slice(0, 4)

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Professional Experience"
          title="Research, internships, and builds"
          description="Roles where I shipped models, evaluations, and product-facing AI systems — with case studies linked where they exist."
        />

        <div className="mt-10 space-y-5">
          {preview.map((role) => (
            <article
              key={role.id}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/35"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {role.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-primary">{role.organization}</p>
                </div>
                <p className="text-sm text-muted-foreground">{role.timeline}</p>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                {role.context}
              </p>

              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Key achievements
                </p>
                <ul className="mt-2 space-y-1.5">
                  {role.bullets.slice(0, 3).map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm leading-snug text-foreground/90"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {role.caseStudySlug && (
                <Link
                  href={`/work/${role.caseStudySlug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Open case study
                  <ArrowRight className="size-3.5" />
                </Link>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-accent"
          >
            View Complete Experience Timeline
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
