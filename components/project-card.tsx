import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/content/projects'
import { cn } from '@/lib/utils'

export function ProjectCard({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  const accent = `var(--chart-${project.accent})`

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5',
        className,
      )}
    >
      {/* accent bar */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 opacity-70"
        style={{ backgroundColor: accent }}
      />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: `color-mix(in oklch, ${accent} 16%, transparent)`,
              color: accent,
            }}
          >
            {project.context}
          </span>
          <span className="text-xs text-muted-foreground">{project.timeline}</span>
        </div>
        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-balance">
        {project.title}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{project.organization}</p>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
        {project.summary}
      </p>

      <div className="mt-4 rounded-lg border border-border/70 bg-secondary/50 p-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Result
        </p>
        <p className="mt-1 text-sm leading-snug text-foreground/90">
          {project.headlineResult}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.coreTech.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary">
        Read case study
        <ArrowUpRight className="size-3.5" />
      </div>
    </Link>
  )
}
