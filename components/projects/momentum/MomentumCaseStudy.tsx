import Link from 'next/link'
import {
  ArrowLeft,
  CircleCheck,
  ExternalLink,
  TriangleAlert,
} from 'lucide-react'
import { momentum } from '@/data/projects/momentum'
import { ConceptImplementationCard } from '@/components/case-study/concept-card'
import {
  ArchitectureFlow,
  ParBlock,
} from '@/components/case-study/visual-blocks'

const CONCEPTS = [
  {
    id: 'context',
    name: 'Context-aware AI',
    definition:
      'Responses depend on structured user state — location, tasks, focus, battery — not only the latest chat message.',
    whyNeeded:
      'Productivity tools fragment signals across apps. Useful guidance needs the current situation.',
    howUsed:
      'The /chat and /nudge paths accept a message plus fields like location, battery, tasks_done, focus_score, and next_deadline.',
    implementation:
      'Frontend builds a state object; FastAPI validates JSON and assembles a prompt with state + retrieved memory.',
    limitation:
      'Public Pages demo often uses simulated values because the live site still points BACKEND_URL at localhost.',
  },
  {
    id: 'rag',
    name: 'Retrieval-augmented generation',
    definition:
      'Embed the query, retrieve similar personal knowledge chunks, and ground Claude on that context instead of the message alone.',
    whyNeeded:
      'Without retrieval, the model invents generic advice and forgets user-specific habits or deadlines.',
    howUsed:
      '/chat embeds the query with sentence-transformers, searches an in-memory FAISS index, and inserts top-k chunks into the prompt.',
    implementation:
      'all-MiniLM-L6-v2 → IndexFlatIP over a small hardcoded knowledge base → Claude response.',
    limitation:
      'Knowledge base is a demo student scenario, not live calendars or wearables. /nudge does not currently call RAG.',
  },
  {
    id: 'nudge',
    name: 'Proactive nudges',
    definition:
      'A /nudge workflow that proposes guidance from current state without waiting for a chat message.',
    whyNeeded:
      'Reactive assistants miss moments when a short, timely interruption would help — or when silence is better.',
    howUsed:
      'Backend generates a nudge from structured state via Claude; the UI surfaces proactive cards and chat.',
    implementation:
      'POST /nudge with state → Claude → natural-language suggestion. Decision-to-interrupt policy is still lightweight.',
    limitation:
      'A mature system needs an explicit interrupt policy and evaluation of timing — not always speaking.',
  },
  {
    id: 'fastapi',
    name: 'FastAPI backend contract',
    definition:
      'Typed HTTP endpoints so the frontend can request chat, nudges, and light live utilities.',
    whyNeeded:
      'Keeps API keys server-side and makes request/response schemas inspectable.',
    howUsed:
      'GET /health, POST /chat, POST /nudge, plus thin live helpers for weather/news when the backend is running.',
    implementation:
      'Python FastAPI app with CORS and environment-based Anthropic client; offline canned replies if keys/RAG missing.',
    limitation:
      'Public demo runs in fallback mode until a hosted backend URL replaces localhost.',
  },
]

export function MomentumCaseStudy() {
  const m = momentum

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
                Independent Build
              </span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs">
                Idea in progress
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {m.title}
            </h1>
            <p className="mt-3 text-xl text-foreground/90">{m.headline}</p>
            <p className="mt-2 text-muted-foreground text-pretty">{m.oneLiner}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              {m.context} · {m.status}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={m.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Open live UI <ExternalLink className="size-3.5" />
              </a>
              <a
                href={m.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium"
              >
                GitHub
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary"
              >
                Try embedded demo ↓
              </a>
            </div>
          </header>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">The problem</h2>
            <ParBlock tone="problem" title="Enough apps — not enough timing">
              <p>
                Calendars know schedules, task apps know unfinished work, phones
                know location and screen time, wearables may know sleep. Those
                signals stay fragmented, so people still interpret everything
                manually.
              </p>
            </ParBlock>
            <ParBlock tone="action" title="What I built">
              <ul className="space-y-1.5">
                <li>
                  · Interactive mobile frontend with world widget, tasks, chat,
                  and proactive nudge surfaces
                </li>
                <li>
                  · FastAPI backend with /chat (RAG + Claude) and /nudge
                </li>
                <li>
                  · Semantic memory via sentence-transformers + in-memory FAISS
                  over personal knowledge chunks
                </li>
                <li>
                  · Structured user-state schema for predictable prompt assembly
                </li>
              </ul>
            </ParBlock>
            <ParBlock tone="result" title="Honest status">
              <p>
                Functional interactive frontend live on GitHub Pages. FastAPI +
                RAG + Claude MVP implemented locally. Public demo falls back to
                offline replies until a hosted backend is wired. Not a
                production personal OS.
              </p>
            </ParBlock>
          </section>

          <section id="demo" className="scroll-mt-24 space-y-4">
            <h2 className="font-display text-xl font-semibold">
              Interactive product demo
            </h2>
            <p className="text-sm text-muted-foreground">
              Product demonstration — personal context in the UI is simulated.
              Chat may use offline fallbacks on the public host.
            </p>
            <div className="mx-auto max-w-[420px] overflow-hidden rounded-[2rem] border-4 border-foreground/20 bg-card shadow-xl">
              <iframe
                title="MOMentum interactive prototype"
                src={m.localDemo}
                className="h-[720px] w-full bg-background"
                loading="lazy"
              />
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Embedded local copy of the phone UI. Also available{' '}
              <a
                href={m.demoUrl}
                className="cursor-pointer text-primary underline"
                target="_blank"
                rel="noreferrer"
              >
                live on GitHub Pages
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">Architecture</h2>
            <ArchitectureFlow
              steps={m.architecture.map((a) => ({
                label: a.label,
                detail: `${a.detail} · ${a.maturity}`,
              }))}
            />
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">
              Technical concepts
            </h2>
            <p className="text-sm text-muted-foreground">
              Click a card to expand — each one says what it is, why it mattered,
              and what is still unverified.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {CONCEPTS.map((c, i) => (
                <ConceptImplementationCard key={c.id} {...c} defaultOpen={i === 0} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">Maturity</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Component</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {m.maturity.map((row) => (
                    <tr key={row.component} className="border-t border-border">
                      <td className="px-4 py-2.5 font-medium">{row.component}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">
              Example scenario
            </h2>
            <div className="rounded-xl border border-border bg-card p-5 text-sm space-y-3">
              <p>
                <span className="text-muted-foreground">Situation · </span>
                Home · 3/5 tasks done · focus 72 · screen time 2h 10m · lab
                report due Friday · slept 7h
              </p>
              <p>
                <span className="text-muted-foreground">User · </span>
                “I just finished my homework. What should I do next?”
              </p>
              <p>
                <span className="text-muted-foreground">Retrieved (example) · </span>
                Lab report due Friday · focuses better after a short walk ·
                screen-time preference · recent completed homework
              </p>
              <p>
                <span className="text-muted-foreground">Factors considered · </span>
                Deadline proximity, task completion, screen time, location —
                not private model chain-of-thought.
              </p>
              <p>
                <span className="text-muted-foreground">Response style · </span>
                Suggest starting the lab report in a short focus block, or a
                brief walk first if screen fatigue is high — and explain why.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold flex items-center gap-2">
              <TriangleAlert className="size-5 text-primary" />
              Limitations
            </h2>
            <ul className="space-y-2 text-sm text-foreground/85">
              <li>· Public Pages demo is not wired to a hosted Claude/RAG backend yet.</li>
              <li>· Location, biometrics, and many dashboard values are simulated.</li>
              <li>· Retrieval quality and nudge timing are not systematically evaluated.</li>
              <li>· Proactive systems can become intrusive without a quiet-mode policy.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold">What I learned</h2>
            <p className="text-foreground/85 text-pretty leading-relaxed">
              MOMentum pushed me past the chat box. A useful personal AI needs
              structured state, relevant memory, a retrieval layer, and a policy
              for when not to interrupt — plus a clear line between a compelling
              product experience and the infrastructure that makes it accurate
              and private.
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {m.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href="#demo"
              className="flex w-full items-center justify-center rounded-md bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Jump to demo
            </a>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex gap-1.5">
                <CircleCheck className="size-3.5 text-primary" /> UI live
              </li>
              <li className="flex gap-1.5">
                <CircleCheck className="size-3.5 text-primary" /> Backend MVP in repo
              </li>
              <li className="flex gap-1.5">
                <CircleCheck className="size-3.5 text-primary" /> Not production
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </article>
  )
}
