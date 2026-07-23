'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  CircleCheck,
  ExternalLink,
  TriangleAlert,
} from 'lucide-react'
import { owkin } from '@/data/projects/owkin'
import {
  owkinBatterySteps,
  owkinDemoClaims,
  owkinDemoMeta,
} from '@/data/projects/owkin-demo'
import { ConceptImplementationCard } from '@/components/case-study/concept-card'
import {
  ArchitectureFlow,
  FigureBlock,
  ParBlock,
} from '@/components/case-study/visual-blocks'
import { cn } from '@/lib/utils'

/** Keep glossary short — three ideas that unlock the rest. */
const CONCEPTS = [
  {
    name: 'Decodable ≠ used',
    definition:
      'A probe can recover a concept from an embedding without the model’s prediction actually depending on it.',
    whyNeeded:
      'This is the core mistake accuracy-only evaluation makes in biomedical AI.',
    howUsed:
      'Every evidence card reports probe scores next to necessity and matched-random controls.',
    implementation:
      'Frozen embedding → linear probe; then targeted edit vs size-matched random edits.',
    limitation:
      'Strong probes can coexist with weak necessity when representations are redundant.',
  },
  {
    name: 'Matched-random null',
    definition:
      'Compare a targeted representation edit with random edits of similar size.',
    whyNeeded:
      'Otherwise a drop only shows the model was damaged — not that the target representation mattered.',
    howUsed:
      'Targeted ablation is scored relative to a matched-random distribution.',
    implementation:
      'Same layer, similar dimensionality, similar edit magnitude when possible.',
    limitation: 'Hackathon sample sizes limit strong significance claims.',
  },
  {
    name: 'certify(prediction)',
    definition:
      'A workflow name for “run the battery → return a structured evidence card.” Not FDA or clinical certification.',
    whyNeeded: 'Accuracy alone does not say what the model relied on.',
    howUsed:
      'The demo and MCP tools surface probe, necessity, specificity, and confound status as JSON-like evidence.',
    implementation:
      'Tile + model + layer → battery → machine-readable card with explicit limitations.',
    limitation: 'A card is only as honest as the controls that were actually run.',
  },
]

export function OwkinCaseStudy() {
  const o = owkin
  const [claimId, setClaimId] = useState(owkinDemoClaims[0].id)
  const [step, setStep] = useState(0)
  const [ran, setRan] = useState(false)
  const claim = owkinDemoClaims.find((c) => c.id === claimId) ?? owkinDemoClaims[0]

  function runBattery() {
    setRan(true)
    setStep(0)
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setStep(i)
      if (i >= owkinBatterySteps.length) window.clearInterval(id)
    }, 320)
  }

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All work
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-12">
          <header>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                Owkin · 1st Place
              </span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs">
                Hackathon · July 2026
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {o.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/80 text-pretty sm:text-lg">
              {o.subtitle}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Team: {o.team.join(' · ')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="#certify"
                className="cursor-pointer rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Try the demo
              </a>
              <a
                href={o.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium hover:border-primary/40"
              >
                GitHub <ExternalLink className="size-3.5" />
              </a>
            </div>
          </header>

          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {o.atAGlance.map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-card p-4">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-primary">
                  {m.value}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{m.detail}</p>
              </div>
            ))}
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold">In one breath</h2>
            <div className="space-y-3">
              <ParBlock tone="problem" title="Problem">
                <p>
                  Pathology foundation models can score well and still rely on
                  the wrong internal signal. Accuracy alone does not say what a
                  prediction depended on.
                </p>
              </ParBlock>
              <ParBlock tone="action" title="What we built">
                <p>
                  A short evaluation battery — probe, ablate, matched-random,
                  specificity — packaged as{' '}
                  <code className="font-mono text-xs">certify(prediction)</code>{' '}
                  evidence cards.
                </p>
              </ParBlock>
              <ParBlock tone="result" title="Outcome">
                <p>
                  1st place at Owkin Hacking Biology. Working prototype on
                  Phikon-v2 / H-optimus-0 + NCT-CRC-HE tiles — not clinical
                  validation.
                </p>
              </ParBlock>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold">
              My contribution
            </h2>
            <ul className="space-y-2.5">
              {o.myContribution.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-xl border border-dashed border-border bg-secondary/30 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Team-built (not claimed as mine alone)
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {o.teamBuilt.map((t) => (
                  <li key={t}>· {t}</li>
                ))}
              </ul>
            </div>
          </section>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="relative aspect-video bg-secondary/40">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
                poster="/projects/owkin/tumor_epithelium.png"
              >
                <source src="/projects/owkin/demo.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
              Screen recording of the K-Scope certify interface from the
              hackathon.
            </p>
          </div>

          <section id="certify" className="scroll-mt-24 space-y-4">
            <div>
              <h2 className="font-display text-xl font-semibold">
                Try certify(prediction)
              </h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Pick a tissue claim, run the battery, and read the evidence card.
                Scores come from a recorded team artifact — not a live GPU pass
                in this browser.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-foreground">
                    Concept claim
                    <select
                      className="mt-1.5 w-full cursor-pointer rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                      value={claimId}
                      onChange={(e) => {
                        setClaimId(e.target.value)
                        setRan(false)
                        setStep(0)
                      }}
                    >
                      {owkinDemoClaims.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Contrast: {claim.contrast}
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={claim.image}
                    alt={`${claim.label} tissue tile`}
                    className="aspect-square w-full rounded-lg border border-border object-cover bg-secondary/40"
                  />
                  <button
                    type="button"
                    onClick={runBattery}
                    className="w-full cursor-pointer rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Run evidence battery
                  </button>
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Evaluation steps
                  </p>
                  <ol className="space-y-2.5">
                    {owkinBatterySteps.map((s, i) => {
                      const active = ran && i < step
                      const current = ran && i === step - 1
                      return (
                        <li
                          key={s.id}
                          className={cn(
                            'rounded-xl border px-4 py-3 transition-colors',
                            active
                              ? 'border-primary/45 bg-primary/10'
                              : 'border-border bg-background/60',
                            current && 'ring-1 ring-primary/40',
                          )}
                        >
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-xs font-semibold text-primary">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <p className="font-medium text-foreground">{s.title}</p>
                          </div>
                          <p className="mt-1 text-sm leading-snug text-foreground/85">
                            {s.question}
                          </p>
                          {active && (
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                              {s.detail}
                            </p>
                          )}
                        </li>
                      )
                    })}
                  </ol>

                  {ran && step >= owkinBatterySteps.length && (
                    <div className="space-y-3 rounded-xl border border-primary/35 bg-primary/8 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                        Evidence card · {claim.verdict}
                      </p>
                      <p className="text-sm text-foreground">
                        <strong>{claim.label}</strong>
                        <span className="text-muted-foreground">
                          {' '}
                          · {claim.contrast}
                        </span>
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {(
                          [
                            ['Necessity', claim.scores.necessity],
                            ['Sufficiency', claim.scores.sufficiency],
                            ['Specificity', claim.scores.specificity],
                          ] as const
                        ).map(([label, val]) => (
                          <div
                            key={label}
                            className="rounded-lg border border-border bg-card px-2 py-2.5"
                          >
                            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                              {label}
                            </p>
                            <p className="mt-0.5 font-display text-lg font-semibold text-primary">
                              {val.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {owkinDemoMeta.caveat}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold">Architecture</h2>
            <ArchitectureFlow steps={[...o.architecture]} />
          </section>

          <div className="grid gap-4 sm:grid-cols-2">
            <FigureBlock
              src="/projects/owkin/FIG1_tile_decomposition.png"
              alt="Tile decomposition figure from Owkin presentation"
              caption="Tile → layered embeddings."
              pending={false}
            />
            <FigureBlock
              src="/projects/owkin/team-hackathon-win.png"
              alt="Owkin hacking biology team celebrating"
              caption="Owkin Hacking Biology — team photo."
              pending={false}
            />
          </div>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold">
              Three ideas behind the battery
            </h2>
            <p className="text-sm text-muted-foreground">
              Expand a card if you want the definition.
            </p>
            <div className="grid gap-3">
              {CONCEPTS.map((c, i) => (
                <ConceptImplementationCard
                  key={c.name}
                  {...c}
                  defaultOpen={i === 0}
                />
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold flex items-center gap-2">
              <TriangleAlert className="size-5 text-primary" />
              Limitations
            </h2>
            <ul className="space-y-2 text-[15px] leading-relaxed text-foreground/85">
              <li>· Hackathon prototype — not clinical validation.</li>
              <li>· Model-internal dependence ≠ biological causality.</li>
              <li>· Tile-level evidence ≠ whole-slide interpretation.</li>
              <li>· Confound testing is limited without multi-site metadata.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold">What I learned</h2>
            <p className="text-[15px] leading-relaxed text-foreground/85 text-pretty">
              A representation can encode information without the final
              prediction depending on it — and a prediction can change after an
              intervention simply because the model was perturbed. Useful
              evaluation needs targeted tests, matched controls, and explicit
              limitations packaged as structured evidence.
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {o.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href="#certify"
              className="flex w-full cursor-pointer items-center justify-center rounded-md bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Jump to demo
            </a>
            <p className="text-xs text-muted-foreground">{owkinDemoMeta.track}</p>
          </div>
        </aside>
      </div>
    </article>
  )
}
