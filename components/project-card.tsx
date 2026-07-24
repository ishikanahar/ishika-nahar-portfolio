'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/content/projects'
import { cn } from '@/lib/utils'

const PREVIEWS: Record<string, { src: string; alt: string }> = {
  'sternson-behavioral-ml': {
    src: '/projects/sternson/pyqt-orientation-editor.png',
    alt: 'Sternson PyQt orientation editor',
  },
  'owkin-foundation-model-evaluation': {
    src: '/projects/owkin/FIG4_spatial_decomposition.png',
    alt: 'Owkin spatial decomposition: hot vs cold tumour maps',
  },
  'neural-decoder-steinmetz': {
    src: '/projects/neural-decoder/decoder_results.png',
    alt: 'Neural decoder result panels',
  },
  'health-text-robustness': {
    src: '/projects/health-text/performance_comparison.png',
    alt: 'Model performance comparison across perturbations',
  },
  'adwave-aaf': {
    src: '/about/aaf-adwave-team.png',
    alt: 'Adwave AAF team photo',
  },
  'skillsoft-product-analytics': {
    src: '/projects/skillsoft/slide-01.png',
    alt: 'Skillsoft internship presentation slide',
  },
}

/** Short one-liners for cards — keep the page scannable. */
const BLURBS: Record<string, string> = {
  'health-text-robustness':
    'TF-IDF vs LSTM vs DistilBERT under synonym, typo, and word-drop noise.',
  'neural-decoder-steinmetz':
    'Decode left vs right choice from Neuropixels population activity.',
  'adwave-aaf': 'AAF District 15 campaign — strategy, creative, and delivery.',
  'skillsoft-product-analytics':
    'CAISY beta conversation analytics → prompt & targeting recommendations.',
  momentum:
    'Tasks + location + device state → proactive nudges, not only chat replies.',
  'style-adaptive-extraction':
    'Classify how a physician writes, then extract clinical fields with a style-adapted prompt.',
  'luveo-compliance-copilot':
    'Event → rules → explanation for healthcare compliance — traced end to end.',
  'sternson-behavioral-ml':
    'Pose estimation → features → behavior labels for two interacting mice.',
  'owkin-foundation-model-evaluation':
    'certify(prediction) evidence cards for pathology foundation-model claims.',
}

const HIGHLIGHTS: Record<string, [string, string]> = {
  'sternson-behavioral-ml': ['8,200 frames', '0.85 mean ROC-AUC'],
  'owkin-foundation-model-evaluation': ['1st place', 'Evidence cards'],
  'health-text-robustness': ['Macro F1 0.86', 'Perturbation stress tests'],
  'neural-decoder-steinmetz': ['ROC-AUC 0.884', 'Neuropixels'],
  momentum: ['RAG + Claude', 'Proactive /nudge'],
  'style-adaptive-extraction': ['Style classify → extract', '3 physician styles'],
  'luveo-compliance-copilot': ['Langfuse tracing', 'Compliance scenarios'],
  'skillsoft-product-analytics': ['CAISY beta', 'Prompt recommendations'],
}

export function ProjectCard({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  const accent = `var(--chart-${project.accent})`
  const preview = PREVIEWS[project.slug]
  const blurb = BLURBS[project.slug] ?? project.summary
  const highlights = HIGHLIGHTS[project.slug]
  const github = project.links?.find((l) => l.href.includes('github.com'))
  const extraTech = Math.max(0, project.coreTech.length - 4)

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5',
        className,
      )}
    >
      <Link href={`/work/${project.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary/50">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview.src}
              alt={preview.alt}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <CardVisualFallback slug={project.slug} title={project.title} accent={accent} />
          )}
          <div className="absolute inset-x-0 top-0 flex flex-wrap gap-1.5 p-3">
            <span className="rounded-md bg-background/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
              {project.context}
            </span>
            {project.statusBadge && (
              <span className="rounded-md bg-primary/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur">
                {project.statusBadge}
              </span>
            )}
            {project.categories[0] && (
              <span className="rounded-md bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur">
                {project.categories[0]}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <p className="text-xs text-muted-foreground">{project.timeline}</p>
          <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug tracking-tight text-balance sm:text-xl">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {blurb}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.coreTech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-secondary/70 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {extraTech > 0 && (
              <span className="rounded-md bg-secondary/70 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                +{extraTech} more
              </span>
            )}
          </div>

          {highlights && (
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border/60 pt-3">
              {highlights.map((item) => (
                <p
                  key={item}
                  className="text-xs font-medium text-foreground/85"
                >
                  <span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary align-middle" />
                  {item}
                </p>
              ))}
            </div>
          )}

          <span className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3.5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity group-hover:opacity-90">
            View Case Study
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>

      {github && (
        <div className="border-t border-border/60 px-5 py-2.5">
          <a
            href={github.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub
            <ArrowUpRight className="size-3" />
          </a>
        </div>
      )}
    </article>
  )
}

function CardVisualFallback({
  slug,
  title,
  accent,
}: {
  slug: string
  title: string
  accent: string
}) {
  if (slug === 'luveo-compliance-copilot') {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[#07111d] p-4 text-[#eef6ff]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#48d7ce]">
          Compliance Copilot
        </p>
        <div className="space-y-2">
          {['BLOCKED', 'REVIEW', 'PASS'].map((s) => (
            <div
              key={s}
              className="rounded-lg border border-[#263b52] bg-[#0e1b2b] px-3 py-2 text-xs font-medium"
            >
              {s} · event → rules → explanation
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (slug === 'momentum') {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#d8d3cc] to-[#f0ede8] p-4 dark:from-[#1c1a22] dark:to-[#141218]">
        <div className="w-[42%] max-w-[120px] overflow-hidden rounded-[1.1rem] border-[3px] border-[#1a1a1a] bg-[#faf8f5] shadow-lg dark:bg-[#1c1a22]">
          <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-[#1a1a1a]/80" />
          <div className="space-y-1.5 p-2.5">
            <div className="rounded-md bg-[#fde8d8] p-1.5 text-[7px] leading-tight text-[#b84420]">
              Smart Nudge · CS 301 due tonight
            </div>
            <div className="rounded-md bg-[#c8f0e0] p-1.5 text-[7px] leading-tight text-[#1a7a52]">
              You&apos;re eating. Use this time wisely.
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (slug === 'style-adaptive-extraction') {
    return (
      <div className="flex h-full w-full flex-col justify-end bg-[#0f1720] p-4 text-[#e8eef7]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#5eead4]">
          Clinical NLP
        </p>
        <p className="mt-1 font-display text-sm font-semibold leading-snug">
          Style classify → adapted extract
        </p>
        <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[9px]">
          {['Terse', 'Narrative', 'Hedged'].map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/10 bg-white/5 px-1 py-1.5"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background: `linear-gradient(145deg, color-mix(in oklch, ${accent} 28%, transparent), transparent)`,
      }}
    >
      <span className="font-display text-3xl font-semibold text-primary/40">
        {title.slice(0, 2)}
      </span>
    </div>
  )
}
