import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

export function PlaceholderNote({ text }: { text: string }) {
  return (
    <div className="mt-8 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-6">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
        To build next
      </p>
      <p className="mt-2 leading-relaxed text-muted-foreground text-pretty">
        {text}
      </p>
    </div>
  )
}
