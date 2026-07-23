'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react'
import {
  featuredProjects,
  ideaProjects,
  personalProjects,
  type Project,
} from '@/content/projects'
import { SectionHeading } from '@/components/section-heading'
import { ProjectCard } from '@/components/project-card'
import { owkinDemoClaims } from '@/data/projects/owkin-demo'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { openHomeDemo } from '@/lib/open-home-demo'

/**
 * Homepage project strips — clear visuals that invite a click into #demos.
 */
export function FeaturedWork() {
  return (
    <>
      <section id="featured" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Case studies with measurable depth"
          description="Problem → action → result. Tap Try demo to jump into the live homepage explorers."
        />

        <div className="mt-12 space-y-8">
          {featuredProjects.map((project) => (
            <FeaturedParCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-accent"
          >
            View All Projects & Case Studies
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Projects"
            title="Analyses I ran end to end"
            description="Results-first cards — open a case study for methods and limitations."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {personalProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Ideas worth exploring"
            title="Prototypes still in motion"
            description="Live UI previews — open the homepage demos or the case study."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <MomentumIdeaCard />
            <StyleAdaptiveIdeaCard />
          </div>
        </div>
      </section>
    </>
  )
}

function FeaturedParCard({ project }: { project: Project }) {
  const demoKey =
    project.slug === 'sternson-behavioral-ml'
      ? ('sternson' as const)
      : project.slug === 'owkin-foundation-model-evaluation'
        ? ('owkin' as const)
        : project.slug === 'luveo-compliance-copilot'
          ? ('luveo' as const)
          : null

  const action =
    project.contribution[0] ??
    project.approach.slice(0, 220) + (project.approach.length > 220 ? '…' : '')

  const result = project.results[0] ?? project.headlineResult

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/5">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-[340px] overflow-hidden bg-secondary/40 sm:min-h-[300px] lg:min-h-[320px]">
          {project.slug === 'luveo-compliance-copilot' && <LuveoCardVisual />}
          {project.slug === 'sternson-behavioral-ml' && <SternsonCardVisual />}
          {project.slug === 'owkin-foundation-model-evaluation' && (
            <OwkinCardVisual />
          )}
        </div>

        <div className="flex flex-col p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {project.context}
            </span>
            <span className="text-xs text-muted-foreground">{project.timeline}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{project.organization}</p>
          <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-balance sm:text-2xl">
            {project.title}
          </h3>

          <div className="mt-5 space-y-3.5">
            <ParBlock label="Problem" text={project.problem} />
            <ParBlock label="Action" text={action} />
            <ParBlock label="Result" text={result} highlight />
          </div>

          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Tech stack
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {project.coreTech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-border/60 pt-5">
            {demoKey ? (
              <button
                type="button"
                onClick={() => openHomeDemo(demoKey)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                <Play className="size-3.5 fill-current" />
                Try demo
              </button>
            ) : (
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                <Play className="size-3.5 fill-current" />
                Open case study
              </Link>
            )}
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3.5 py-2 text-sm font-medium hover:bg-accent"
            >
              Read more
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function ParBlock({
  label,
  text,
  highlight,
}: {
  label: string
  text: string
  highlight?: boolean
}) {
  const clipped = text.length > 200 ? `${text.slice(0, 197)}…` : text
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
        {label}
      </p>
      <p
        className={`mt-1 text-sm leading-relaxed text-pretty ${
          highlight ? 'font-medium text-foreground' : 'text-muted-foreground'
        }`}
      >
        {clipped}
      </p>
    </div>
  )
}

function SternsonCardVisual() {
  return (
    <button
      type="button"
      onClick={() => openHomeDemo('sternson')}
      className="absolute inset-0 flex cursor-pointer flex-col justify-between bg-gradient-to-br from-[#e8f2ee] via-[#f4faf7] to-[#dceee6] p-5 text-left transition-colors hover:from-[#e2efe9] hover:to-[#d4e9df]"
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          Research · Sternson Lab
        </p>
        <p className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">
          Pose → features → behavior
        </p>
        <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
          Human-in-the-loop observation labeling for two interacting mice.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-border/70 bg-card/90 px-3 py-3 shadow-sm">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Frames labeled
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-primary">
            8,200
          </p>
        </div>
        <div className="rounded-xl border border-border/70 bg-card/90 px-3 py-3 shadow-sm">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Mean ROC-AUC
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-primary">
            0.85
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-border/70 bg-card/90 p-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          <span>Observation timeline</span>
          <span className="flex gap-2 normal-case tracking-normal">
            <span className="inline-flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-orange-500" /> DEM
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-violet-500" /> OBS
            </span>
          </span>
        </div>
        <div className="space-y-2">
          <div className="relative h-2.5 overflow-hidden rounded-full bg-secondary">
            <span className="absolute left-[8%] top-0 h-full w-[18%] rounded-full bg-orange-500/80" />
            <span className="absolute left-[38%] top-0 h-full w-[12%] rounded-full bg-orange-500/80" />
            <span className="absolute left-[62%] top-0 h-full w-[22%] rounded-full bg-orange-500/80" />
          </div>
          <div className="relative h-2.5 overflow-hidden rounded-full bg-secondary">
            <span className="absolute left-[14%] top-0 h-full w-[10%] rounded-full bg-violet-500/80" />
            <span className="absolute left-[42%] top-0 h-full w-[16%] rounded-full bg-violet-500/80" />
            <span className="absolute left-[70%] top-0 h-full w-[14%] rounded-full bg-violet-500/80" />
          </div>
        </div>
      </div>

      <span className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3.5 py-2.5 text-sm font-medium text-primary-foreground">
        <Play className="size-3.5 fill-current" />
        Play live explorer
      </span>
    </button>
  )
}

function LuveoCardVisual() {
  return (
    <button
      type="button"
      onClick={() => openHomeDemo('luveo')}
      className="absolute inset-0 flex cursor-pointer flex-col justify-between bg-[#07111d] p-5 text-left text-[#eef6ff] transition-colors hover:bg-[#0a1524]"
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#48d7ce]">
          Internship · Luveo Health
        </p>
        <p className="mt-2 font-display text-xl font-semibold leading-snug">
          Event → rules → explanation
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {['BLOCKED', 'REVIEW', 'PASS'].map((s) => (
            <span
              key={s}
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                s === 'PASS'
                  ? 'border-emerald-500/40 text-emerald-400'
                  : s === 'BLOCKED'
                    ? 'border-rose-500/40 text-rose-400'
                    : 'border-amber-500/40 text-amber-300'
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-[#263b52] bg-[#0e1b2b] p-4">
        <p className="text-[10px] uppercase tracking-wider text-[#9eb1c5]">
          Operator view
        </p>
        <p className="mt-1.5 text-sm leading-relaxed">
          Receiving blocked — supplier ID missing. Traced with Langfuse.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#48d7ce]">
          <Play className="size-3.5 fill-current" />
          Run walkthrough on this page
        </p>
      </div>
    </button>
  )
}

function OwkinCardVisual() {
  const [i, setI] = useState(0)
  const claim = owkinDemoClaims[i]

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0a0f18] p-4 text-[#e8eef7] sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#5eead4]">
            Owkin · K-Scope · 1st place
          </p>
          <p className="font-display text-base font-semibold">certify(prediction)</p>
        </div>
        <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
          {claim.verdict}
        </span>
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
        {owkinDemoClaims.map((c, idx) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setI(idx)}
            className={cn(
              'shrink-0 rounded-md border px-2 py-1 text-[10px] font-medium transition-colors',
              i === idx
                ? 'border-[#5eead4] bg-[#5eead4]/15 text-[#5eead4]'
                : 'border-white/10 text-white/45 hover:border-white/25',
            )}
          >
            {c.label.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
        {(
          [
            ['Necessity', claim.scores.necessity],
            ['Sufficiency', claim.scores.sufficiency],
            ['Specificity', claim.scores.specificity],
          ] as const
        ).map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col justify-center rounded-lg border border-white/10 bg-white/5 px-2 py-3 text-center"
          >
            <p className="text-[9px] uppercase tracking-wider text-white/40">{label}</p>
            <p className="mt-1 font-display text-lg font-semibold text-[#5eead4]">
              {value.toFixed(2)}
            </p>
            <div className="mx-auto mt-2 h-1 w-full max-w-[56px] overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#5eead4]"
                style={{ width: `${Math.min(100, value * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => openHomeDemo('owkin')}
        className="mt-3 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#5eead4] px-3 py-2.5 text-sm font-semibold text-[#0a0f18] hover:opacity-90"
      >
        <Play className="size-3.5 fill-current" />
        Run certify on this page
      </button>
    </div>
  )
}

export function MomentumIdeaCard() {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="relative flex justify-center bg-gradient-to-b from-secondary/60 to-secondary/20 px-4 pb-2 pt-5">
        <div className="relative h-[280px] w-[150px] overflow-hidden rounded-[1.4rem] border-[4px] border-foreground/80 bg-[#0b1220] shadow-xl">
          <iframe
            title="MOMentum preview"
            src="/projects/momentum/index.html"
            className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[280px] origin-top -translate-x-1/2 scale-[0.54] border-0"
            loading="lazy"
            tabIndex={-1}
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
          Live UI
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Independent
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs">Idea</span>
          <span className="text-xs text-muted-foreground">2025 – Present</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold">MOMentum</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Context-aware personal AI — RAG + structured user state for proactive nudges.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => openHomeDemo('momentum')}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
          >
            <Play className="size-3.5 fill-current" />
            Try demo
          </button>
          <Link
            href="/work/momentum"
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            Case study
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function StyleAdaptiveIdeaCard() {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-[#0a0a0a]">
        <iframe
          title="Style Adaptive preview"
          src="/projects/style-adaptive/index.html"
          className="pointer-events-none h-[140%] w-[140%] origin-top-left scale-[0.72] border-0"
          loading="lazy"
          tabIndex={-1}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
          Live UI
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Independent
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs">Idea</span>
          <span className="text-xs text-muted-foreground">2026</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold">
          Style-Adaptive Extraction
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Interactive exploration of pathology-style features and adaptive extraction paths.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => openHomeDemo('style')}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
          >
            <Play className="size-3.5 fill-current" />
            Try demo
          </button>
          <Link
            href="/work/style-adaptive-extraction"
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            Case study
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
