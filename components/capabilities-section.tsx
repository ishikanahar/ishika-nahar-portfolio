import { capabilityGroups } from '@/content/capabilities'
import { SectionHeading } from '@/components/section-heading'

export function CapabilitiesSection() {
  return (
    <section className="border-y border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Technical Skills"
          title="What I actually use"
          description="Grouped by the work I've done — applied ML, AI evaluation, analytics, and scientific data."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {capabilityGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {group.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{group.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-sm text-foreground/80"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
