import type { Metadata } from 'next'
import { PageShell, PlaceholderNote } from '@/components/page-shell'
import { SectionHeading } from '@/components/section-heading'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience, research, and leadership.',
}

export default function ExperiencePage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Experience & leadership"
          title="Where I've worked and grown"
          description="A clean timeline of roles at Luveo Health, the Sternson Lab, Skillsoft, and the All of Us program — each with context, contributions, skills used, and a link to the related case study."
        />
        <PlaceholderNote text="Next build: a vertical timeline/stepper of roles (organization, title, dates, location, one-line context, 2–4 key contributions, skills, and a link to the matching case study), plus a 'Beyond the work' leadership section. This is scaffolded and ready for your verified role details." />
      </section>
    </PageShell>
  )
}
