import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function PersonalIntro() {
  return (
    <section className="border-t border-border/60 bg-secondary/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 sm:py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
            Beyond the work
          </p>
          <p className="mt-3 font-display text-xl font-medium leading-relaxed text-balance sm:text-2xl">
            I come from an interdisciplinary background and I&apos;m drawn to
            teams that pair technical problem-solving with meaningful,
            real-world applications.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
            {'[Ishika: add 1-2 sentences of personality — what you care about, '}
            {'what you\'re curious about, or what you do outside of work.]'}
          </p>
        </div>
        <Link
          href="/about"
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          More about me
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
