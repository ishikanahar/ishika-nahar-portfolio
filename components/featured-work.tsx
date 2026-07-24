'use client'

import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import {
  featuredProjects,
  ideaProjects,
  personalProjects,
  additionalProjects,
} from '@/content/projects'
import { SectionHeading } from '@/components/section-heading'
import { ProjectCard } from '@/components/project-card'
import { openHomeDemo } from '@/lib/open-home-demo'

/**
 * Homepage projects — Vedant-style grid so recruiters see everything in one glance.
 * Live demos stay in the #demos band above; this is the scannable case-study index.
 */
export function FeaturedWork() {
  const allProjects = [
    ...featuredProjects,
    ...ideaProjects,
    ...personalProjects,
    ...additionalProjects,
  ]

  return (
    <section id="featured" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        eyebrow="Projects"
        title="Everything I’ve built, at a glance"
        description="Case studies with demos where they exist. Tap a card for the full write-up — or jump into a live explorer on this page."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => openHomeDemo('sternson')}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-primary/40 hover:bg-accent"
        >
          <Play className="size-3 fill-current text-primary" />
          Sternson demo
        </button>
        <button
          type="button"
          onClick={() => openHomeDemo('luveo')}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-primary/40 hover:bg-accent"
        >
          <Play className="size-3 fill-current text-primary" />
          Luveo demo
        </button>
        <button
          type="button"
          onClick={() => openHomeDemo('owkin')}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-primary/40 hover:bg-accent"
        >
          <Play className="size-3 fill-current text-primary" />
          Owkin demo
        </button>
        <button
          type="button"
          onClick={() => openHomeDemo('momentum')}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-primary/40 hover:bg-accent"
        >
          <Play className="size-3 fill-current text-primary" />
          MOMentum demo
        </button>
        <button
          type="button"
          onClick={() => openHomeDemo('style')}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-primary/40 hover:bg-accent"
        >
          <Play className="size-3 fill-current text-primary" />
          Style Adaptive demo
        </button>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-accent"
        >
          Open full projects page
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
