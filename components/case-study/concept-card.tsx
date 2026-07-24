'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ConceptCardProps {
  name: string
  definition: string
  whyNeeded: string
  howUsed: string
  implementation: string
  limitation: string
  formula?: string
  defaultOpen?: boolean
}

export function ConceptImplementationCard({
  name,
  definition,
  whyNeeded,
  howUsed,
  implementation,
  limitation,
  formula,
  defaultOpen = false,
}: ConceptCardProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <article
      className={cn(
        'rounded-xl border bg-card transition-all',
        open
          ? 'border-primary/50 shadow-md shadow-primary/5'
          : 'border-border hover:border-primary/40 hover:shadow-sm',
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full cursor-pointer items-start justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold tracking-tight group-hover:text-primary">
              {name}
            </h3>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {open ? 'Open' : 'Click to expand'}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            {definition}
          </p>
        </div>
        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary transition-colors group-hover:border-primary group-hover:bg-primary/10">
          <ChevronDown
            className={cn(
              'size-4 transition-transform duration-200',
              // Closed → right, open → down (content expands below)
              !open && '-rotate-90',
            )}
          />
        </span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-border px-5 py-4 text-sm leading-relaxed">
          <Field label="Why it mattered here" body={whyNeeded} />
          <Field label="How I used it" body={howUsed} />
          <Field label="Technical detail" body={implementation} />
          {formula && (
            <pre className="overflow-x-auto rounded-lg bg-secondary/60 px-3 py-2 font-mono text-xs text-foreground">
              {formula}
            </pre>
          )}
          <div className="rounded-lg border border-border bg-secondary/40 px-3 py-2">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              What can go wrong
            </p>
            <p className="mt-1 text-foreground/85">{limitation}</p>
          </div>
        </div>
      )}
    </article>
  )
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wider text-primary">
        {label}
      </p>
      <p className="mt-1 text-foreground/85 text-pretty">{body}</p>
    </div>
  )
}
