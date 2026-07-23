'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import {
  owkinDemoClaims,
  owkinDemoMeta,
  owkinBatterySteps,
} from '@/data/projects/owkin-demo'
import { cn } from '@/lib/utils'

/**
 * Homepage Owkin interactive demo — K-Scope-inspired cockpit.
 * Click a tissue claim → run certify → see evidence card scores.
 */
export function OwkinLandingDemo() {
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const claim = owkinDemoClaims[active]

  useEffect(() => {
    setStep(0)
    setDone(false)
    setRunning(false)
  }, [active])

  useEffect(() => {
    if (!running) return
    setStep(0)
    setDone(false)
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= owkinBatterySteps.length - 1) {
          window.clearInterval(id)
          setRunning(false)
          setDone(true)
          return s
        }
        return s + 1
      })
    }, 380)
    return () => window.clearInterval(id)
  }, [running])

  return (
    <div className="bg-[#0a0f18] text-[#e8eef7]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-md bg-[#1a3d35] font-mono text-xs font-bold text-[#5eead4]">
            KS
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5eead4]">
              K-Scope · Owkin Hackathon · 1st place
            </p>
            <p className="font-display text-sm font-semibold sm:text-base">
              certify(prediction)
            </p>
          </div>
        </div>
        <p className="max-w-md text-[11px] text-white/45 sm:text-right">
          Recorded evidence card — not a live GPU run. Click a claim, then run the battery.
        </p>
      </div>

      <div className="grid lg:grid-cols-[140px_1fr_280px]">
        {/* Patch / claim gallery */}
        <aside className="border-b border-white/10 p-3 lg:border-b-0 lg:border-r">
          <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
            Claims
          </p>
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {owkinDemoClaims.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  'relative w-[88px] shrink-0 overflow-hidden rounded-lg border transition-all lg:w-full',
                  active === i
                    ? 'border-[#5eead4] ring-1 ring-[#5eead4]/40'
                    : 'border-white/10 hover:border-white/30',
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.label}
                  className="aspect-square h-16 w-full object-cover lg:h-20"
                />
                <span className="absolute inset-x-0 bottom-0 bg-black/70 px-1 py-0.5 text-[9px] leading-tight text-white">
                  {c.label.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main stage */}
        <div className="flex flex-col p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">
                Active claim · {claim.contrast}
              </p>
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {claim.label}
              </h3>
            </div>
            <button
              type="button"
              disabled={running}
              onClick={() => setRunning(true)}
              className="inline-flex items-center gap-2 rounded-md bg-[#5eead4] px-4 py-2 text-sm font-semibold text-[#0a0f18] hover:opacity-90 disabled:opacity-60"
            >
              <Play className="size-3.5 fill-current" />
              {running ? 'Running…' : done ? 'Re-run battery' : 'Run certify'}
            </button>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={claim.image}
              alt={claim.label}
              className="mx-auto max-h-[280px] w-full object-contain"
            />
            {done && (
              <div className="absolute right-3 top-3 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-300 backdrop-blur">
                {claim.verdict}
              </div>
            )}
          </div>

          {/* Battery steps */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {owkinBatterySteps.map((s, i) => (
              <span
                key={s.id}
                title={s.question}
                className={cn(
                  'rounded-md border px-2 py-1 text-[10px] font-medium transition-all duration-300',
                  i <= step && (running || done)
                    ? 'border-[#5eead4]/50 bg-[#5eead4]/10 text-[#5eead4]'
                    : 'border-white/10 text-white/35',
                )}
              >
                {i <= step && (running || done) ? '✓ ' : ''}
                {s.title.replace(/^\d+ · /, '')}
              </span>
            ))}
          </div>

          {(running || done) && (
            <p className="mt-3 text-xs text-white/55 transition-opacity">
              {owkinBatterySteps[Math.min(step, owkinBatterySteps.length - 1)].question}
            </p>
          )}
        </div>

        {/* Evidence panel */}
        <aside className="flex flex-col border-t border-white/10 bg-[#0d1520] p-4 lg:border-l lg:border-t-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#5eead4]">
            Evidence card
          </p>

          {!done ? (
            <div className="mt-4 flex flex-1 flex-col justify-center text-sm text-white/40">
              <p>Select a claim on the left.</p>
              <p className="mt-2">Hit <span className="text-[#5eead4]">Run certify</span> to score it.</p>
              <p className="mt-6 text-[11px] leading-relaxed">
                Probe → ablate → matched-random → specificity → confound → steer
              </p>
            </div>
          ) : (
            <div className="mt-3 flex flex-1 flex-col gap-3">
              <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-center text-sm font-bold text-emerald-300">
                {claim.verdict}
              </div>

              {(
                [
                  ['Necessity', claim.scores.necessity],
                  ['Sufficiency', claim.scores.sufficiency],
                  ['Specificity', claim.scores.specificity],
                ] as const
              ).map(([label, value]) => (
                <div key={label}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] text-white/50">{label}</span>
                    <span className="font-display text-lg font-semibold text-[#5eead4]">
                      {value.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#5eead4] transition-all duration-700"
                      style={{ width: `${Math.min(100, value * 100)}%` }}
                    />
                  </div>
                </div>
              ))}

              <p className="mt-auto text-[10px] leading-relaxed text-white/35">
                {owkinDemoMeta.caveat}
              </p>
            </div>
          )}

          <Link
            href="/work/owkin-foundation-model-evaluation#certify"
            className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-sm font-medium text-[#5eead4] hover:bg-white/5"
          >
            Full case study
            <ArrowUpRight className="size-3.5" />
          </Link>
        </aside>
      </div>
    </div>
  )
}
