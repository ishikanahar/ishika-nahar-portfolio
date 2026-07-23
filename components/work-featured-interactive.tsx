'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import { ExplorerLazy } from '@/components/projects/sternson/ExplorerLazy'
import { owkinDemoClaims } from '@/data/projects/owkin-demo'
import { cn } from '@/lib/utils'

/**
 * Interactive featured strip for /work — not static thumbnail cards.
 */
export function WorkFeaturedInteractive() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Featured Applied AI and ML Work
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Try the demos here — then open the full case study for depth.
        </p>
      </div>

      {/* Sternson — live explorer is the card */}
      <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 px-5 py-4 sm:px-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                Research
              </span>
              <span className="text-xs text-muted-foreground">June 2025 – Present</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                Live demo
              </span>
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">
              Behavioral Machine Learning — Sternson Lab
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Mark observation intervals on the timeline and compare against lab labels.
              8,200 frames · 0.85 mean ROC-AUC.
            </p>
          </div>
          <Link
            href="/work/sternson-behavioral-ml#demo"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Full case study
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="p-3 sm:p-4">
          <ExplorerLazy />
        </div>
      </article>

      <div className="grid gap-5 lg:grid-cols-2">
        <LuveoWorkCard />
        <OwkinWorkCard />
      </div>
    </div>
  )
}

function LuveoWorkCard() {
  const scenarios = [
    { status: 'BLOCKED', label: 'Missing supplier ID', color: 'text-rose-600 border-rose-500/35 bg-rose-500/10' },
    { status: 'REVIEW', label: 'Qty mismatch', color: 'text-amber-700 border-amber-500/35 bg-amber-500/10' },
    { status: 'PASS', label: 'Complete receiving', color: 'text-emerald-700 border-emerald-500/35 bg-emerald-500/10' },
  ]
  const [i, setI] = useState(0)

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-1 flex-col bg-[#07111d] p-5 text-[#eef6ff] sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#48d7ce]">
            Internship · Luveo Health
          </span>
          <span className="rounded-full border border-[#48d7ce]/35 px-2 py-0.5 text-[10px] font-semibold text-[#48d7ce]">
            Interactive
          </span>
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
          Compliance Copilot
        </h3>
        <p className="mt-1 text-sm text-[#9eb1c5]">
          Tap a scenario — see Pass / Review / Blocked before opening the walkthrough.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {scenarios.map((s, idx) => (
            <button
              key={s.status}
              type="button"
              onClick={() => setI(idx)}
              className={cn(
                'rounded-full border px-2.5 py-1 text-xs font-semibold transition-all',
                i === idx ? s.color : 'border-[#263b52] text-[#9eb1c5] hover:border-[#48d7ce]/40',
              )}
            >
              {s.status}
            </button>
          ))}
        </div>

        <div className="mt-4 flex-1 rounded-xl border border-[#263b52] bg-[#0e1b2b] p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#9eb1c5]">Operator view</p>
          <p className="mt-2 text-sm font-medium">{scenarios[i].label}</p>
          <p className="mt-2 text-xs leading-relaxed text-[#9eb1c5]">
            Deterministic rules decide the verdict. The explainer only translates evidence —
            traced with Langfuse.
          </p>
          <div className="mt-3 flex gap-1.5">
            {['Event', 'Rules', 'Explain', 'Trace'].map((step, idx) => (
              <span
                key={step}
                className={cn(
                  'rounded-md border px-2 py-1 text-[10px]',
                  idx <= i
                    ? 'border-[#48d7ce]/40 text-[#48d7ce]'
                    : 'border-[#263b52] text-[#6a7f96]',
                )}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4">
        <p className="text-xs text-muted-foreground">June 2026 – Present</p>
        <Link
          href="/work/luveo-compliance-copilot#walkthrough"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Open walkthrough
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  )
}

function OwkinWorkCard() {
  const [active, setActive] = useState(0)
  const claim = owkinDemoClaims[active]

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Hackathon · 1st Place
          </span>
          <span className="text-xs text-muted-foreground">July 2026</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
          Owkin · certify(prediction)
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Does the model actually use the tissue concept it claims? Click a claim.
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {owkinDemoClaims.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(idx)}
              className={cn(
                'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                active === idx
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {c.label.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Clear evidence card — not a blurry histology zoom */}
        <div className="mt-4 flex-1 rounded-xl border border-border bg-secondary/40 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Evidence card
              </p>
              <p className="mt-1 font-display text-base font-semibold">{claim.label}</p>
              <p className="text-xs text-muted-foreground">{claim.contrast}</p>
            </div>
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700">
              {claim.verdict}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {(
              [
                ['Necessity', claim.scores.necessity],
                ['Sufficiency', claim.scores.sufficiency],
                ['Specificity', claim.scores.specificity],
              ] as const
            ).map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-card px-2 py-3 text-center"
              >
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-primary">
                  {value.toFixed(2)}
                </p>
                <div className="mx-auto mt-2 h-1.5 w-full max-w-[72px] overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${Math.min(100, value * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
            High specificity + necessity → prediction depends on the named concept, not noise.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4">
        <p className="text-xs text-muted-foreground">K-Scope · Phikon-v2</p>
        <Link
          href="/work/owkin-foundation-model-evaluation#certify"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <Play className="size-3.5 fill-current" />
          Open full demo
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  )
}
