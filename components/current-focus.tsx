import { currentFocus } from '@/content/capabilities'

export function CurrentFocus() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
          Current focus
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {currentFocus.heading}
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {currentFocus.questions.map((q, i) => (
            <li key={q} className="border-t border-primary/40 pt-4">
              <span className="font-mono text-sm text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-2 leading-relaxed text-foreground/90 text-pretty">
                {q}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
