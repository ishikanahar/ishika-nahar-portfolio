import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SectionHeading } from '@/components/section-heading'
import { WorkGrid } from '@/components/work-grid'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Applied AI, machine learning, and data science case studies by Ishika — from data and inputs to reliable, evaluated outputs.',
}

export default function WorkPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Work"
            title="Projects & case studies"
            description="Try demos on this page. Each case study still has the full problem, contribution, approach, limitations, and what I learned."
          />
          <div className="mt-10">
            <WorkGrid />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
