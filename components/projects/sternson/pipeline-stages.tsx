'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LabImage } from '@/components/case-study/approval-notice'
export function PipelineStages({
  stages,
}: {
  stages: {
    id: string
    label: string
    short: string
    detail: string
    asset?: {
      src: string
      alt: string
      caption: string
      approvalStatus: 'pending' | 'approved' | 'hidden'
    }
  }[]
}) {
  const [active, setActive] = useState(stages[0]?.id ?? '')

  const current = stages.find((s) => s.id === active) ?? stages[0]

  return (
    <div className="space-y-5">
      <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
        {stages.map((stage, i) => (
          <li key={stage.id} className="flex items-stretch gap-2 lg:flex-1">
            <button
              type="button"
              onClick={() => {
                setActive(stage.id)
                document
                  .getElementById(`stage-${stage.id}`)
                  ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
              }}
              className={cn(
                'flex w-full cursor-pointer flex-col rounded-xl border px-3 py-3 text-left transition-all',
                active === stage.id
                  ? 'border-primary bg-primary/15 shadow-sm ring-2 ring-primary/30'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5',
              )}
            >
              <span className="font-mono text-[10px] text-primary">
                {String(i + 1).padStart(2, '0')} · tap
              </span>
              <span className="mt-1 font-display text-sm font-semibold tracking-tight">
                {stage.label}
              </span>
              <span className="mt-0.5 text-[11px] text-muted-foreground">
                {stage.short}
              </span>
            </button>
            {i < stages.length - 1 && (
              <div className="hidden items-center lg:flex">
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            )}
          </li>
        ))}
      </ol>

      {current && (
        <div
          id={`stage-${current.id}`}
          className="scroll-mt-28 space-y-4 rounded-xl border border-border bg-card p-5"
        >
          <h3 className="font-display text-lg font-semibold tracking-tight">
            {current.label}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            {current.detail}
          </p>
          {current.asset && (
            <LabImage
              src={current.asset.src}
              alt={current.asset.alt}
              caption={current.asset.caption}
              approvalStatus={current.asset.approvalStatus}
            />
          )}
        </div>
      )}
    </div>
  )
}
