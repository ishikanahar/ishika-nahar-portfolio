'use client'

import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Play,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from 'lucide-react'
import { ExplorerLazy } from '@/components/projects/sternson/ExplorerLazy'
import { OwkinLandingDemo } from '@/components/owkin-landing-demo'
import { cn } from '@/lib/utils'
import {
  OPEN_HOME_DEMO_EVENT,
  type HomeDemoId,
} from '@/lib/open-home-demo'

type Tab =
  | 'sternson'
  | 'luveo'
  | 'owkin'
  | 'momentum'
  | 'style'
  | 'skillsoft'

const TABS: { id: Tab; label: string; shortLabel: string; hash: string }[] = [
  { id: 'sternson', label: 'Sternson', shortLabel: 'Sternson', hash: '#demos-sternson' },
  { id: 'luveo', label: 'Luveo', shortLabel: 'Luveo', hash: '#demos-luveo' },
  { id: 'owkin', label: 'Owkin', shortLabel: 'Owkin', hash: '#demos-owkin' },
  { id: 'momentum', label: 'MOMentum', shortLabel: 'MOMentum', hash: '#demos-momentum' },
  { id: 'style', label: 'Style Adaptive', shortLabel: 'Style', hash: '#demos-style' },
  { id: 'skillsoft', label: 'Skillsoft', shortLabel: 'Skillsoft', hash: '#demos-skillsoft' },
]

/**
 * Homepage interactive band — live embeds for every major project demo.
 */
export function LandingDemos() {
  const [tab, setTab] = useState<Tab>('sternson')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    const applyHash = () => {
      const h = window.location.hash.toLowerCase()
      if (h.includes('luveo')) setTab('luveo')
      else if (h.includes('owkin')) setTab('owkin')
      else if (h.includes('momentum')) setTab('momentum')
      else if (h.includes('style')) setTab('style')
      else if (h.includes('skillsoft')) setTab('skillsoft')
      else if (h.includes('sternson') || h === '#demos') setTab('sternson')

      if (h.startsWith('#demos')) {
        document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const onOpenDemo = (e: Event) => {
      const demo = (e as CustomEvent<{ demo: HomeDemoId }>).detail?.demo
      if (demo) setTab(demo)
    }

    applyHash()
    window.addEventListener('hashchange', applyHash)
    window.addEventListener(OPEN_HOME_DEMO_EVENT, onOpenDemo)
    return () => {
      window.removeEventListener('hashchange', applyHash)
      window.removeEventListener(OPEN_HOME_DEMO_EVENT, onOpenDemo)
    }
  }, [])

  if (!ready) {
    return (
      <section id="demos" className="scroll-mt-20 border-b border-border/60 bg-secondary/25">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            Try before you scroll
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Interactive demos on the homepage
          </h2>
          <div className="mt-6 h-[420px] animate-pulse rounded-2xl border border-border bg-card/60" />
        </div>
      </section>
    )
  }

  return (
    <section id="demos" className="scroll-mt-20 border-b border-border/60 bg-secondary/25">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            Try before you scroll
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Interactive demos on the homepage
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Tap into Sternson, Luveo, Owkin, MOMentum, Style Adaptive, and Skillsoft —
            live embeds, not screenshots.
          </p>
        </div>

        <div
          className="mt-6 flex gap-1 overflow-x-auto rounded-full border border-border bg-card p-1 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Landing demos"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => {
                setTab(t.id)
                window.history.replaceState(null, '', t.hash)
              }}
              className={cn(
                'shrink-0 cursor-pointer rounded-full px-3 py-2 text-xs font-medium transition-colors sm:px-3.5 sm:text-sm',
                tab === t.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <span className="sm:hidden">{t.shortLabel}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-primary/5">
          {tab === 'sternson' && (
            <DemoShell
              blurb="Mark an observation interval on the timeline — compare against the lab labels."
              caseHref="/work/sternson-behavioral-ml#demo"
              caseLabel="Full Sternson case study"
            >
              <ExplorerLazy />
            </DemoShell>
          )}

          {tab === 'luveo' && <LuveoTeaser />}

          {tab === 'owkin' && <OwkinLandingDemo />}

          {tab === 'momentum' && (
            <HtmlEmbed
              title="MOMentum"
              blurb="A personal AI that uses tasks, location, and device context to nudge you at the right moment — not only when you open chat."
              src="/projects/momentum/index.html?embed=1"
              caseHref="/work/momentum"
              caseLabel="MOMentum case study"
              fullscreenHref="/projects/momentum/index.html"
              height={820}
              phone
            />
          )}

          {tab === 'style' && (
            <HtmlEmbed
              title="Style-Adaptive Clinical Note Extraction"
              blurb="Physicians write differently — terse, narrative, or hedged. Classify the style first, then extract with a prompt adapted to that voice."
              src="/projects/style-adaptive/index.html"
              caseHref="/work/style-adaptive-extraction"
              caseLabel="Style Adaptive case study"
              fullscreenHref="/projects/style-adaptive/index.html"
              height={820}
            />
          )}

          {tab === 'skillsoft' && <SkillsoftCarousel />}
        </div>
      </div>
    </section>
  )
}

function DemoShell({
  blurb,
  caseHref,
  caseLabel,
  children,
}: {
  blurb: string
  caseHref: string
  caseLabel: string
  children: ReactNode
}) {
  return (
    <div className="p-3 sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
        <p className="text-sm text-muted-foreground">{blurb}</p>
        <Link
          href={caseHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {caseLabel}
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
      {children}
    </div>
  )
}

function HtmlEmbed({
  title,
  blurb,
  src,
  caseHref,
  caseLabel,
  fullscreenHref,
  height,
  phone,
}: {
  title: string
  blurb: string
  src: string
  caseHref: string
  caseLabel: string
  fullscreenHref: string
  height: number
  phone?: boolean
}) {
  return (
    <div className="p-3 sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
        <div>
          <p className="font-display text-sm font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{blurb}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={caseHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {caseLabel}
            <ArrowUpRight className="size-3.5" />
          </Link>
          <a
            href={fullscreenHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            Full screen
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>

      {phone ? (
        // No extra hardware bezel — the HTML already draws its own phone chrome.
        <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-2xl bg-[#d8d3cc] dark:bg-[#0a0810]">
          <iframe
            title={title}
            src={src}
            className="h-[min(78vh,820px)] w-full border-0"
            loading="lazy"
          />
        </div>
      ) : (
        <iframe
          title={title}
          src={src}
          className="w-full rounded-xl border border-border bg-background"
          style={{ height }}
          loading="lazy"
        />
      )}
    </div>
  )
}

const SKILLSOFT_SLIDES = Array.from({ length: 8 }, (_, i) => ({
  src: `/projects/skillsoft/slide-${String(i + 1).padStart(2, '0')}.png`,
  label: `Slide ${i + 1}`,
}))

function SkillsoftCarousel() {
  const [i, setI] = useState(0)
  const slide = SKILLSOFT_SLIDES[i]

  return (
    <div className="p-3 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            Skillsoft · CAISY analytics
          </p>
          <p className="font-display text-lg font-semibold">Internship deck — flip through</p>
          <p className="text-sm text-muted-foreground">
            Conversation analytics → prompt & audience recommendations.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/work/skillsoft-product-analytics"
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-accent"
          >
            Case study
            <ArrowUpRight className="size-3.5" />
          </Link>
          <a
            href="/projects/skillsoft/presentation.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Open PDF
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-secondary/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.src}
          alt={slide.label}
          className="mx-auto max-h-[620px] w-full object-contain"
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setI((v) => (v - 1 + SKILLSOFT_SLIDES.length) % SKILLSOFT_SLIDES.length)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
        >
          <ArrowLeft className="size-4" />
          Prev
        </button>
        <div className="flex items-center gap-1.5">
          {SKILLSOFT_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={cn(
                'size-2 rounded-full transition-colors',
                idx === i ? 'bg-primary' : 'bg-border hover:bg-muted-foreground/40',
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setI((v) => (v + 1) % SKILLSOFT_SLIDES.length)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
        >
          Next
          <ArrowRight className="size-4" />
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {i + 1} / {SKILLSOFT_SLIDES.length} · full deck also available as PDF
      </p>
    </div>
  )
}

const SCENARIOS = [
  {
    id: 'dea',
    name: 'Missing supplier ID',
    status: 'BLOCKED' as const,
    what: 'Receiving blocked — required supplier identifier is missing.',
    next: 'Confirm supplier record → enter identifier → retry check',
  },
  {
    id: 'qty',
    name: 'PO quantity mismatch',
    status: 'REVIEW' as const,
    what: 'Received qty 80 vs expected 100 — routed for review.',
    next: 'Verify physical count → compare packing slip → document variance',
  },
  {
    id: 'compound',
    name: 'Incomplete BUD docs',
    status: 'BLOCKED' as const,
    what: 'Compounding record blocked — beyond-use date missing.',
    next: 'Review preparation record → set BUD → update before release',
  },
  {
    id: 'pass',
    name: 'Complete receiving',
    status: 'PASS' as const,
    what: 'All required fields present — synthetic receiving check passed.',
    next: 'Continue receiving workflow',
  },
]

const PIPELINE = [
  'Event',
  'Normalize',
  'Rules',
  'CaseView',
  'Knowledge',
  'Explain',
  'Trace',
]

function LuveoTeaser() {
  const [active, setActive] = useState(0)
  const [stage, setStage] = useState(0)
  const [running, setRunning] = useState(false)
  const scenario = SCENARIOS[active]

  useEffect(() => {
    if (!running) return
    setStage(0)
    const id = window.setInterval(() => {
      setStage((s) => {
        if (s >= PIPELINE.length - 1) {
          window.clearInterval(id)
          setRunning(false)
          return s
        }
        return s + 1
      })
    }, 420)
    return () => window.clearInterval(id)
  }, [running, active])

  const StatusIcon =
    scenario.status === 'PASS'
      ? ShieldCheck
      : scenario.status === 'BLOCKED'
        ? ShieldAlert
        : ShieldQuestion

  const statusColor =
    scenario.status === 'PASS'
      ? 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30'
      : scenario.status === 'BLOCKED'
        ? 'text-rose-600 bg-rose-500/10 border-rose-500/30'
        : 'text-amber-700 bg-amber-500/10 border-amber-500/30'

  return (
    <div className="grid lg:grid-cols-[1fr_1.15fr]">
      <div className="border-b border-border p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          Luveo Health · Compliance Copilot
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
          Pick a scenario. Watch the pipeline fire.
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Synthetic walkthrough of event → rules → explanation. No patient data.
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActive(i)
                setStage(0)
                setRunning(false)
              }}
              className={cn(
                'rounded-xl border px-3 py-3 text-left transition-all',
                active === i
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/40 hover:bg-accent/50',
              )}
            >
              <span className="block text-sm font-medium">{s.name}</span>
              <span
                className={cn(
                  'mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                  s.status === 'PASS' && 'border-emerald-500/30 text-emerald-700',
                  s.status === 'BLOCKED' && 'border-rose-500/30 text-rose-700',
                  s.status === 'REVIEW' && 'border-amber-500/30 text-amber-700',
                )}
              >
                {s.status}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setRunning(true)}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 sm:w-auto"
        >
          <Play className="size-3.5 fill-current" />
          Run walkthrough
        </button>
      </div>

      <div className="flex flex-col gap-4 bg-[#07111d] p-5 text-[#eef6ff] sm:p-6">
        <div className="flex flex-wrap gap-1.5">
          {PIPELINE.map((label, i) => (
            <span
              key={label}
              className={cn(
                'rounded-md border px-2 py-1 text-[10px] font-medium transition-all duration-300',
                i <= stage
                  ? 'border-[#48d7ce]/50 bg-[#15314a] text-[#48d7ce]'
                  : 'border-[#263b52] text-[#9eb1c5]',
              )}
            >
              {i <= stage ? '✓ ' : `${i + 1}. `}
              {label}
            </span>
          ))}
        </div>

        <div
          className={cn(
            'inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold',
            statusColor,
          )}
        >
          <StatusIcon className="size-4" />
          {scenario.status}
        </div>

        <div className="rounded-xl border border-[#263b52] bg-[#0e1b2b] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#48d7ce]">
            Operator explanation
          </p>
          <p className="mt-2 text-sm leading-relaxed">{scenario.what}</p>
          <p className="mt-3 text-xs text-[#9eb1c5]">
            <span className="font-semibold text-[#f2bd66]">Next · </span>
            {scenario.next}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <Link
            href="/work/luveo-compliance-copilot#walkthrough"
            className="inline-flex items-center gap-1.5 rounded-md bg-[#e8f3ff] px-3.5 py-2 text-sm font-medium text-[#07111d]"
          >
            Open full interactive explorer
            <ArrowUpRight className="size-3.5" />
          </Link>
          <a
            href="/projects/luveo/explorer.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#9eb1c5] hover:text-[#eef6ff]"
          >
            Full-screen
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
