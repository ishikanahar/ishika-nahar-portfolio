import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
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
        <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              Projects
            </h1>
            <p className="text-xs text-muted-foreground">
              All work · tap a card
            </p>
          </div>
          <WorkGrid />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
