'use client'

import { useEffect, useState, type CSSProperties } from 'react'
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
    alt: 'Owkin spatial decomposition',
  },
  'neural-decoder-steinmetz': {
    src: '/projects/neural-decoder/decoder_results.png',
    alt: 'Neural decoder results',
  },
  'health-text-robustness': {
    src: '/projects/health-text/performance_comparison.png',
    alt: 'Health text robustness comparison',
  },
  'adwave-aaf': {
    src: '/about/aaf-adwave-team.png',
    alt: 'Adwave AAF team',
  },
  'skillsoft-product-analytics': {
    src: '/projects/skillsoft/slide-01.png',
    alt: 'Skillsoft presentation slide',
  },
}

const BLURBS: Record<string, string> = {
  'health-text-robustness':
    'TF-IDF vs LSTM vs DistilBERT under synonym, typo, and word-drop noise.',
  'neural-decoder-steinmetz':
    'Decode left vs right choice from Neuropixels population activity.',
  'adwave-aaf': 'AAF District 15 campaign — strategy, creative, and delivery.',
  'skillsoft-product-analytics':
    'CAISY beta conversation analytics → prompt & targeting recommendations.',
  momentum:
    'Tasks + location + device state → proactive nudges, not only chat.',
  'style-adaptive-extraction':
    'Classify physician writing style, then extract with an adapted prompt.',
  'luveo-compliance-copilot':
    'Event → rules → explanation for healthcare compliance.',
  'sternson-behavioral-ml':
    'Pose → features → behavior labels for two interacting mice.',
  'owkin-foundation-model-evaluation':
    'certify(prediction) evidence cards for pathology FM claims.',
}

const METRICS: Record<string, string> = {
  'sternson-behavioral-ml': '0.85 ROC-AUC · 8.2k frames',
  'owkin-foundation-model-evaluation': '1st place · Owkin hackathon',
  'health-text-robustness': 'Macro F1 0.86',
  'neural-decoder-steinmetz': 'ROC-AUC 0.884',
  momentum: 'RAG + /nudge MVP',
  'style-adaptive-extraction': '3 writing styles',
  'luveo-compliance-copilot': 'Langfuse tracing',
  'skillsoft-product-analytics': 'CAISY beta insights',
}

export function ProjectCard({
  project,
  className,
  index = 0,
  compact = false,
}: {
  project: Project
  className?: string
  index?: number
  compact?: boolean
}) {
  const accent = `var(--chart-${project.accent})`
  const preview = PREVIEWS[project.slug]
  const blurb = BLURBS[project.slug] ?? project.summary
  const metric = METRICS[project.slug]
  const github = project.links?.find((l) => l.href.includes('github.com'))

  return (
    <article
      className={cn(
        'work-card-enter group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10',
        className,
      )}
      style={{ '--work-delay': `${Math.min(index, 8) * 45}ms` } as CSSProperties}
    >
      <Link href={`/work/${project.slug}`} className="flex flex-1 flex-col">
        <div
          className={cn(
            'relative overflow-hidden bg-secondary/40',
            compact ? 'aspect-[2/1]' : 'aspect-[16/10]',
          )}
        >
          <LivePreview
            slug={project.slug}
            title={project.title}
            accent={accent}
            preview={preview}
          />
          <div className="absolute inset-x-0 top-0 flex flex-wrap gap-1 p-2">
            <span className="rounded bg-background/90 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
              {project.context}
            </span>
            {project.statusBadge && (
              <span className="rounded bg-primary/90 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary-foreground">
                {project.statusBadge}
              </span>
            )}
          </div>
        </div>

        <div className={cn('flex flex-1 flex-col', compact ? 'px-3 pb-3 pt-2.5' : 'px-5 pb-5 pt-4')}>
          <h3
            className={cn(
              'font-display font-semibold leading-snug tracking-tight text-balance',
              compact ? 'line-clamp-2 text-[15px]' : 'text-lg sm:text-xl',
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              'mt-1 text-muted-foreground',
              compact ? 'line-clamp-1 text-xs' : 'line-clamp-3 text-sm',
            )}
          >
            {blurb}
          </p>

          {!compact && (
            <div className="mt-2.5 flex flex-wrap gap-1">
              {project.coreTech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-secondary/70 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {metric && (
            <p className={cn('font-medium text-primary', compact ? 'mt-1.5 text-[10px]' : 'mt-2 text-[11px]')}>
              {metric}
            </p>
          )}

          <span
            className={cn(
              'work-cta-shimmer mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary font-medium text-primary-foreground',
              compact ? 'mt-2.5 px-2.5 py-1.5 text-[11px]' : 'mt-5 px-3.5 py-2.5 text-sm',
            )}
          >
            View Case Study
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>

      {github && !compact && (
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

function LivePreview({
  slug,
  title,
  accent,
  preview,
}: {
  slug: string
  title: string
  accent: string
  preview?: { src: string; alt: string }
}) {
  if (slug === 'luveo-compliance-copilot') return <LuveoLive />
  if (slug === 'momentum') return <MomentumLive />
  if (slug === 'style-adaptive-extraction') return <StyleLive />
  if (slug === 'sternson-behavioral-ml') return <SternsonLive src={preview?.src} alt={preview?.alt} />
  if (slug === 'owkin-foundation-model-evaluation') {
    return <OwkinLive src={preview?.src} alt={preview?.alt} />
  }

  if (preview) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={preview.src}
        alt={preview.alt}
        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
    )
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background: `linear-gradient(145deg, color-mix(in oklch, ${accent} 28%, transparent), transparent)`,
      }}
    >
      <span className="font-display text-2xl font-semibold text-primary/40">
        {title.slice(0, 2)}
      </span>
    </div>
  )
}

function LuveoLive() {
  const statuses = [
    { label: 'BLOCKED', color: 'border-rose-500/40 text-rose-400 bg-rose-500/10' },
    { label: 'REVIEW', color: 'border-amber-500/40 text-amber-300 bg-amber-500/10' },
    { label: 'PASS', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' },
  ]
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % statuses.length), 1600)
    return () => window.clearInterval(id)
  }, [statuses.length])

  const active = statuses[i]

  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#07111d] p-3 text-[#eef6ff]">
      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#48d7ce]">
        Compliance Copilot
      </p>
      <div className="space-y-1.5">
        {statuses.map((s, idx) => (
          <div
            key={s.label}
            className={cn(
              'rounded-md border px-2 py-1.5 text-[10px] font-medium transition-all duration-500',
              idx === i ? `${s.color} scale-[1.02]` : 'border-[#263b52] bg-[#0e1b2b] text-[#9eb1c5] opacity-50',
            )}
          >
            {s.label} · event → rules → explain
          </div>
        ))}
      </div>
      <p className="text-[10px] text-[#48d7ce]">
        Now: <span className="font-semibold">{active.label}</span>
      </p>
    </div>
  )
}

const MOMENTUM_SCENES = [
  {
    push: 'Smart Nudge · CS 301 due tonight',
    pushTone: 'bg-[#fde8d8] text-[#b84420]',
    now: "You're eating. Use this time wisely.",
    nowTone: 'bg-[#c8f0e0] text-[#1a7a52]',
    place: '📍 Chipotle',
  },
  {
    push: 'Battery 18% · charge before 7 PM',
    pushTone: 'bg-[#fde8d8] text-[#b84420]',
    now: 'Party in 4h. Protect your battery.',
    nowTone: 'bg-[#fff3d0] text-[#8a5a00]',
    place: '🚌 Bus to campus',
  },
  {
    push: "Jake's party · day reshuffled",
    pushTone: 'bg-[#e8e0f8] text-[#5a3fa8]',
    now: 'CS 301 moved to 4–6 PM.',
    nowTone: 'bg-[#c8f0e0] text-[#1a7a52]',
    place: '📚 Geisel Library',
  },
]

function MomentumLive() {
  const [i, setI] = useState(0)
  const [bpm, setBpm] = useState(72)

  useEffect(() => {
    const sceneId = window.setInterval(
      () => setI((v) => (v + 1) % MOMENTUM_SCENES.length),
      1800,
    )
    const bpmId = window.setInterval(
      () => setBpm(68 + Math.floor(Math.random() * 10)),
      1400,
    )
    return () => {
      window.clearInterval(sceneId)
      window.clearInterval(bpmId)
    }
  }, [])

  const scene = MOMENTUM_SCENES[i]

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#d8d3cc] to-[#f0ede8] p-3 dark:from-[#1c1a22] dark:to-[#141218]">
      <div className="animate-nudge-float w-[48%] max-w-[118px] overflow-hidden rounded-[1rem] border-[3px] border-[#1a1a1a] bg-[#faf8f5] shadow-md dark:bg-[#1c1a22]">
        <div className="mx-auto mt-1 h-1 w-7 rounded-full bg-[#1a1a1a]/80" />
        <div className="space-y-1 p-2">
          <div className="flex items-center justify-between text-[6px] font-semibold text-[#6b6058]">
            <span className="transition-all duration-500">{scene.place}</span>
            <span className="tabular-nums text-[#e85080]">❤️ {bpm}</span>
          </div>
          <div
            key={`push-${i}`}
            className={cn(
              'rounded-md p-1.5 text-[6.5px] leading-tight transition-all duration-500',
              scene.pushTone,
            )}
          >
            {scene.push}
          </div>
          <div
            key={`now-${i}`}
            className={cn(
              'rounded-md p-1.5 text-[6.5px] leading-tight transition-all duration-500',
              scene.nowTone,
            )}
          >
            {scene.now}
          </div>
        </div>
      </div>
    </div>
  )
}

function StyleLive() {
  const styles = ['Terse', 'Narrative', 'Hedged']
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % styles.length), 1400)
    return () => window.clearInterval(id)
  }, [styles.length])

  return (
    <div className="flex h-full w-full flex-col justify-end bg-[#0f1720] p-3 text-[#e8eef7]">
      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#5eead4]">
        Clinical NLP
      </p>
      <p className="mt-0.5 font-display text-xs font-semibold">
        Style → adapted extract
      </p>
      <div className="mt-2 grid grid-cols-3 gap-1 text-center text-[9px]">
        {styles.map((s, idx) => (
          <span
            key={s}
            className={cn(
              'rounded border px-1 py-1.5 transition-all duration-500',
              idx === i
                ? 'border-[#5eead4]/50 bg-[#5eead4]/15 text-[#5eead4]'
                : 'border-white/10 bg-white/5 text-white/40',
            )}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

function SternsonLive({ src, alt }: { src?: string; alt?: string }) {
  return (
    <div className="relative h-full w-full">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ''}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="h-full w-full bg-secondary" />
      )}
      <div className="absolute inset-x-2 bottom-2 rounded-md border border-border/70 bg-card/90 p-2 backdrop-blur">
        <div className="relative h-1.5 overflow-hidden rounded-full bg-secondary">
          <span className="absolute top-0 h-full w-[18%] rounded-full bg-orange-500/80 animate-timeline-scan" />
          <span className="absolute left-[40%] top-0 h-full w-[12%] rounded-full bg-violet-500/70" />
        </div>
        <p className="mt-1 text-[9px] font-medium text-muted-foreground">
          Timeline scanning · DEM / OBS
        </p>
      </div>
    </div>
  )
}

function OwkinLive({ src, alt }: { src?: string; alt?: string }) {
  return (
    <div className="relative h-full w-full">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ''}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      ) : null}
      <div className="absolute inset-x-2 bottom-2 grid grid-cols-3 gap-1">
        {[
          ['Nec', '0.46'],
          ['Suf', '0.51'],
          ['Spec', '0.80'],
        ].map(([label, val], i) => (
          <div
            key={label}
            className="rounded border border-white/15 bg-[#0a0f18]/85 px-1.5 py-1 text-center backdrop-blur"
          >
            <p className="text-[8px] uppercase text-white/50">{label}</p>
            <p className="font-display text-[11px] font-semibold text-[#5eead4]">{val}</p>
            <div className="mx-auto mt-0.5 h-0.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="animate-bar-grow h-full rounded-full bg-[#5eead4]"
                style={{ animationDelay: `${i * 0.25}s`, width: `${Number(val) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
