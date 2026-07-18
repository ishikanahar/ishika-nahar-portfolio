import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  Database,
  ExternalLink,
  Lightbulb,
  TriangleAlert,
  Workflow,
} from 'lucide-react'
import type { Project } from '@/content/projects'
import { PipelineDiagram } from '@/components/pipeline-diagram'

/** A titled block within the case study. */
function Block({
  id,
  title,
  icon,
  children,
}: {
  id: string
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground text-pretty">
        {children}
      </div>
    </section>
  )
}

function Bullets({ items, marker }: { items: string[]; marker?: React.ReactNode }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-1 shrink-0 text-primary">
            {marker ?? <span className="block size-1.5 rounded-full bg-primary" />}
          </span>
          <span className="text-foreground/85">{item}</span>
        </li>
      ))}
    </ul>
  )
}

const accentColor = (n: number) => `var(--chart-${n})`

export function CaseStudy({
  project,
  prev,
  next,
}: {
  project: Project
  prev: Project
  next: Project
}) {
  const accent = accentColor(project.accent)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {/* back link */}
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All work
      </Link>

      {/* header */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: `color-mix(in oklch, ${accent} 16%, transparent)`,
              color: accent,
            }}
          >
            {project.context}
          </span>
          {project.categories.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>

        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">
          {project.summary}
        </p>

        {/* meta grid */}
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              Organization
            </dt>
            <dd className="mt-1 text-sm font-medium">{project.organization}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              Timeline
            </dt>
            <dd className="mt-1 text-sm font-medium">{project.timeline}</dd>
          </div>
          {project.location && (
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                Location
              </dt>
              <dd className="mt-1 text-sm font-medium">{project.location}</dd>
            </div>
          )}
          <div className="col-span-2 sm:col-span-3">
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              My role
            </dt>
            <dd className="mt-1 text-sm text-foreground/90">{project.role}</dd>
          </div>
          {project.collaborators && (
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                Collaborators
              </dt>
              <dd className="mt-1 text-sm text-foreground/90">
                {project.collaborators}
              </dd>
            </div>
          )}
        </dl>

        {project.links && project.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                {link.label}
                <ExternalLink className="size-3.5" />
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="mt-12 space-y-12">
        <Block id="problem" title="The problem">
          <p>{project.problem}</p>
        </Block>

        <Block id="why" title="Why it matters">
          <p>{project.whyItMatters}</p>
        </Block>

        <Block id="data" title="Data & inputs" icon={<Database className="size-5" />}>
          <Bullets items={project.data} />
        </Block>

        <Block id="approach" title="Approach" icon={<Workflow className="size-5" />}>
          <p>{project.approach}</p>
          <PipelineDiagram steps={project.pipeline} />
        </Block>

        <Block id="contribution" title="My contribution">
          <Bullets items={project.contribution} />
        </Block>

        <Block id="technical" title="Technical details">
          <Bullets items={project.technicalDetails} />
        </Block>

        <Block id="challenges" title="Challenges & decisions">
          <Bullets items={project.challenges} />
        </Block>

        <Block
          id="results"
          title="Results"
          icon={<CircleCheck className="size-5" />}
        >
          <Bullets
            items={project.results}
            marker={<CircleCheck className="size-4" />}
          />
        </Block>

        <Block
          id="limitations"
          title="Limitations"
          icon={<TriangleAlert className="size-5" />}
        >
          <div className="rounded-xl border border-border bg-secondary/40 p-5 text-foreground/85">
            {project.limitations}
          </div>
        </Block>

        <Block
          id="learned"
          title="What I learned"
          icon={<Lightbulb className="size-5" />}
        >
          <p className="text-foreground/85">{project.learned}</p>
        </Block>

        {project.nextSteps && (
          <Block id="next" title="Next steps">
            <p>{project.nextSteps}</p>
          </Block>
        )}
      </div>

      {/* prev / next */}
      <nav
        className="mt-16 grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-2"
        aria-label="More case studies"
      >
        <Link
          href={`/work/${prev.slug}`}
          className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowLeft className="size-3.5" />
            Previous
          </span>
          <span className="mt-1 font-display font-semibold tracking-tight group-hover:text-primary">
            {prev.title}
          </span>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col rounded-xl border border-border bg-card p-5 text-right transition-colors hover:border-primary/40"
        >
          <span className="inline-flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
            Next
            <ArrowRight className="size-3.5" />
          </span>
          <span className="mt-1 font-display font-semibold tracking-tight group-hover:text-primary">
            {next.title}
          </span>
        </Link>
      </nav>
    </article>
  )
}
