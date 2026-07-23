import { TriangleAlert } from 'lucide-react'
import type { ApprovalStatus } from '@/data/projects/sternson'

export function ApprovalNotice({
  status,
  message,
}: {
  status: ApprovalStatus
  message: string
}) {
  if (status !== 'pending') return null

  return (
    <div
      role="status"
      className="flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-foreground/90"
    >
      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
      <p className="text-pretty">{message}</p>
    </div>
  )
}

export function LabImage({
  src,
  alt,
  caption,
  approvalStatus,
  showPending = true,
}: {
  src: string
  alt: string
  caption: string
  approvalStatus: ApprovalStatus
  showPending?: boolean
}) {
  if (approvalStatus === 'hidden') return null
  if (approvalStatus === 'pending' && !showPending) return null

  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full object-cover" loading="lazy" />
      <figcaption className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        {caption}
        {approvalStatus === 'pending' && (
          <span className="mt-1 block font-medium text-amber-700 dark:text-amber-400">
            Preview · pending lab approval
          </span>
        )}
      </figcaption>
    </figure>
  )
}
