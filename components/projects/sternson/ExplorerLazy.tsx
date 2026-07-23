'use client'

import dynamic from 'next/dynamic'

const BehavioralMLExplorer = dynamic(
  () =>
    import('@/components/projects/sternson/BehavioralMLExplorer').then(
      (m) => m.BehavioralMLExplorer,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-border bg-card text-sm text-muted-foreground">
        Loading interactive annotation explorer…
      </div>
    ),
  },
)

export function ExplorerLazy() {
  return <BehavioralMLExplorer showPoseOverlay={false} />
}
