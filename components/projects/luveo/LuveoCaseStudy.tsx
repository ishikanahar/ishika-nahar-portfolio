import Link from 'next/link'
import { ArrowLeft, CircleCheck, TriangleAlert } from 'lucide-react'
import { ConceptImplementationCard } from '@/components/case-study/concept-card'
import {
  ArchitectureFlow,
  ParBlock,
} from '@/components/case-study/visual-blocks'
import { getProject } from '@/content/projects'

const CONCEPTS = [
  {
    name: 'Deterministic rules + LLM explanation',
    definition:
      'Structured Pass / Warning / Fail comes from rules; natural language explains the result without inventing the verdict.',
    whyNeeded:
      'Near compliance decisions, free-form generation alone is hard to trust. The score must be grounded.',
    howUsed:
      'Rule engine emits structured evidence; an explainer agent turns it into actionable guidance for clinicians/ops.',
    implementation:
      'FastAPI case view exposes typed results; React sandbox consumes authenticated endpoints.',
    limitation:
      'Phase 1 uses synthetic payloads — architecture validation, not production regulatory guidance.',
  },
  {
    name: 'Interoperability payloads',
    definition:
      'Healthcare events arrive as HL7 v2.5, FHIR R4, or dispensing-system messages with different field semantics.',
    whyNeeded:
      'Compounding and medication workflows touch multiple vendor shapes that must normalize before rules run.',
    howUsed:
      'Mapped eight scenarios across Epic / Pyxis / Omnicell-style events into a shared domain model.',
    implementation:
      'Domain models, loaders, and API contracts updated together when compounding support expanded.',
    limitation:
      'Real hospital traffic will surface edge cases synthetic fixtures miss.',
  },
  {
    name: 'Langfuse tracing',
    definition:
      'Observability for LLM prompts, tool calls, latency, and failure modes across the explanation path.',
    whyNeeded:
      'Incomplete explanations often come from missing knowledge artifacts — tracing shows where the chain broke.',
    howUsed:
      'Instrumented the explainer so each scenario can be inspected end to end.',
    implementation: 'Langfuse spans around prompt assembly, tools, and responses.',
    limitation:
      'Tracing does not replace evaluation of clinical correctness.',
  },
  {
    name: 'Grounded knowledge artifacts',
    definition:
      'Structured workflow and regulatory schemas the model can cite instead of improvising policy.',
    whyNeeded: 'Hallucinated compliance advice is worse than silence.',
    howUsed:
      'Strengthened schemas connecting domain rules to model-consumable formats.',
    implementation: 'Knowledge files / schemas consumed by the explanation layer.',
    limitation: 'Coverage is only as good as the scenarios mapped so far.',
  },
]

export function LuveoCaseStudy() {
  const p = getProject('luveo-compliance-copilot')
  if (!p) return null

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All work
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-14">
          <header>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                Internship · Applied AI
              </span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs">
                Synthetic data · Phase 1
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {p.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground text-pretty">
              {p.summary}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {p.organization} · {p.timeline} · {p.location}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="#walkthrough"
                className="cursor-pointer rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Open walkthrough
              </a>
              <a
                href="/projects/luveo/explorer.html"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium"
              >
                Full-screen explorer
              </a>
            </div>
          </header>

          <section id="walkthrough" className="scroll-mt-24 space-y-3">
            <h2 className="font-display text-xl font-semibold">
              Interactive walkthrough
            </h2>
            <p className="text-sm text-muted-foreground">
              Synthetic demo. Trace a compliance result from event to
              explanation. No patient data. Prefer full-screen if the embed feels
              tight.
            </p>
            <div className="overflow-hidden rounded-2xl border border-border bg-[#07111d] shadow-lg">
              <iframe
                title="Luveo Compliance Copilot Explorer"
                src="/projects/luveo/explorer.html"
                className="h-[min(70vh,520px)] w-full"
                loading="lazy"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">The problem</h2>
            <ParBlock tone="problem" title="Compliance needs explainable structure">
              <p>{p.problem}</p>
            </ParBlock>
            <ParBlock tone="action" title="What I worked on">
              <ul className="space-y-1.5">
                {p.contribution.map((c) => (
                  <li key={c}>· {c}</li>
                ))}
              </ul>
            </ParBlock>
            <ParBlock tone="result" title="Current outcome">
              <ul className="space-y-1.5">
                {p.results.map((r) => (
                  <li key={r}>· {r}</li>
                ))}
              </ul>
            </ParBlock>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">Architecture</h2>
            <ArchitectureFlow steps={p.pipeline} />
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">
              What I personally contributed
            </h2>
            <ul className="space-y-2.5">
              {p.contribution.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">
              Technical concepts
            </h2>
            <p className="text-sm text-muted-foreground">Click a card to expand.</p>
            <div className="grid gap-3 md:grid-cols-2">
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
            <p className="text-sm text-foreground/85">{p.limitations}</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold">What I learned</h2>
            <p className="leading-relaxed text-foreground/85 text-pretty">
              {p.learned}
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {p.coreTech.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{p.headlineResult}</p>
          </div>
        </aside>
      </div>
    </article>
  )
}
