export function AtAGlance({
  items,
}: {
  items: { label: string; value: string; detail: string }[]
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-border bg-card p-4"
        >
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {item.label}
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-primary">
            {item.value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}
