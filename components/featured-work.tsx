import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredProjects } from '@/content/projects'
import { SectionHeading } from '@/components/section-heading'
import { ProjectCard } from '@/components/project-card'

export function FeaturedWork() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Selected work"
          title="Case studies, not just screenshots"
          description="Each project traces the full path from data and inputs to a reliable, evaluated output — with my exact contribution made explicit."
        />
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          All projects
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
