import { ChevronRight } from 'lucide-react'
import type { PipelineStep } from '@/content/projects'

export function PipelineDiagram({ steps }: { steps: PipelineStep[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <ol className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {steps.map((step, i) => (
          <li key={step.label} className="flex items-stretch gap-3 lg:flex-1">
            <div className="flex flex-1 flex-col rounded-lg border border-border bg-background p-4">
              <span className="font-mono text-[11px] text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mt-1 font-display text-sm font-semibold tracking-tight">
                {step.label}
              </span>
              <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {step.detail}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex shrink-0 items-center justify-center">
                <ChevronRight className="size-4 rotate-90 text-muted-foreground lg:rotate-0" />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
