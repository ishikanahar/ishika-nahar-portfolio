'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
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
  'style-adaptive-extraction': {
    src: '/projects/owkin/FIG3_where_does_it_go.png',
    alt: 'Style adaptive extraction exploration',
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
}

const METRICS: Record<string, { label: string; value: string }> = {
  'health-text-robustness': {
    label: 'Clean Macro F1',
    value: '0.86',
  },
  'neural-decoder-steinmetz': {
    label: 'ROC-AUC',
    value: '0.884',
  },
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
  const metric = METRICS[project.slug]
  const github = project.links?.find((l) =>
    l.href.includes('github.com'),
  )

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5',
        className,
      )}
    >
      <Link href={`/work/${project.slug}`} className="flex flex-1 flex-col">
        {preview ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-secondary/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview.src}
              alt={preview.alt}
              className="h-full w-full object-contain object-center p-3 transition-transform duration-500 group-hover:scale-[1.02] sm:p-4"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
            {metric && (
              <div className="absolute bottom-3 left-3 rounded-lg border border-border/80 bg-card/95 px-3 py-2 backdrop-blur">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </p>
                <p className="font-display text-xl font-semibold tabular-nums text-primary">
                  {metric.value}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div
            className="h-1.5 w-full"
            style={{ backgroundColor: accent }}
            aria-hidden
          />
        )}

        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span
              className="rounded-full px-2 py-0.5 font-medium"
              style={{
                backgroundColor: `color-mix(in oklch, ${accent} 14%, transparent)`,
                color: accent,
              }}
            >
              {project.context}
            </span>
            <span>{project.timeline}</span>
          </div>

          <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-balance">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {blurb}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.coreTech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-secondary/70 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              Case study
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>

      {github && (
        <div className="border-t border-border/60 px-5 py-3">
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
