import { cn } from '@/lib/utils'

export function ParBlock({
  tone,
  title,
  children,
}: {
  tone: 'problem' | 'action' | 'result'
  title: string
  children: React.ReactNode
}) {
  const styles = {
    problem: 'border-l-[var(--dem)] bg-[color-mix(in_oklch,var(--dem)_8%,transparent)]',
    action: 'border-l-primary bg-primary/8',
    result: 'border-l-[var(--chart-3)] bg-[color-mix(in_oklch,var(--chart-3)_10%,transparent)]',
  } as const
  const labels = {
    problem: 'THE PROBLEM',
    action: 'MY ROLE & ACTION',
    result: 'THE RESULT',
  } as const

  return (
    <div className={cn('rounded-xl border border-border border-l-4 p-5', styles[tone])}>
      <p
        className={cn(
          'text-[11px] font-semibold tracking-[0.14em]',
          tone === 'problem' && 'text-[var(--dem)]',
          tone === 'action' && 'text-primary',
          tone === 'result' && 'text-[var(--chart-3)]',
        )}
      >
        {labels[tone]}
      </p>
      <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">{title}</h3>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/85">
        {children}
      </div>
    </div>
  )
}

export function FigureBlock({
  src,
  alt,
  caption,
  pending = true,
  className,
}: {
  src: string
  alt: string
  caption: string
  pending?: boolean
  className?: string
}) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card',
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full object-contain bg-secondary/30" loading="lazy" />
      <figcaption className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        {caption}
        {pending && (
          <span className="mt-1 block font-medium text-amber-700 dark:text-amber-400">
            Preview · pending lab approval
          </span>
        )}
      </figcaption>
    </figure>
  )
}

export function ArchitectureFlow({
  steps,
}: {
  steps: { label: string; detail: string }[]
}) {
  return (
    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li
          key={step.label}
          className="relative rounded-xl border border-border bg-card p-4"
        >
          <span className="font-mono text-[11px] text-primary">
            {String(i + 1).padStart(2, '0')}
          </span>
          <p className="mt-1 font-display text-sm font-semibold tracking-tight">
            {step.label}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {step.detail}
          </p>
        </li>
      ))}
    </ol>
  )
}

export function FailureModeGrid({
  items,
}: {
  items: { title: string; detail: string }[]
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-border bg-card p-4"
        >
          <p className="text-sm font-semibold text-foreground">{item.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  )
}
