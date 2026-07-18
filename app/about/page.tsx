import type { Metadata } from 'next'
import { PageShell, PlaceholderNote } from '@/components/page-shell'
import { SectionHeading } from '@/components/section-heading'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'About',
  description: 'Ishika — background, education, and interests.',
}

export default function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeading eyebrow="About" title={`Hi, I'm ${site.name}`} />
        <p className="mt-6 leading-relaxed text-muted-foreground text-pretty">
          {site.intro}
        </p>
        <PlaceholderNote text="Next build: your full bio, education at UC San Diego (major, expected graduation, relevant coursework), interdisciplinary background, and personal interests. Share these and I'll drop them in." />
      </section>
    </PageShell>
  )
}
