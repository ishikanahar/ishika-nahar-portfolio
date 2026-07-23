'use client'

import Link from 'next/link'
import { ArrowUpRight, Play } from 'lucide-react'

type ShowcaseItem = {
  href: string
  eyebrow: string
  title: string
  blurb: string
  cta: string
  demo?: boolean
  image?: string
  imageAlt?: string
  video?: string
  /** When no image — short monogram + tint */
  monogram?: string
  tint?: string
}

const SHOWCASE: ShowcaseItem[] = [
  {
    href: '/work/sternson-behavioral-ml#demo',
    eyebrow: 'Research · Sternson Lab',
    title: 'Behavioral ML Explorer',
    blurb: 'Human-in-the-loop review for interacting mice — try the live demo.',
    cta: 'Open Sternson',
    demo: true,
    image: '/projects/sternson/pyqt-orientation-editor.png',
    imageAlt: 'Sternson PyQt orientation editor',
  },
  {
    href: '/work/luveo-compliance-copilot',
    eyebrow: 'Internship · Luveo Health',
    title: 'Compliance Copilot',
    blurb: 'AI explanations over healthcare compliance results, traced end to end.',
    cta: 'Open Luveo',
    monogram: 'LH',
    tint: 'oklch(0.55 0.12 175)',
  },
  {
    href: '/work/owkin-foundation-model-evaluation#certify',
    eyebrow: 'Hackathon · Owkin K-Scope',
    title: 'certify(prediction)',
    blurb: '1st place evidence cards for pathology foundation-model predictions.',
    cta: 'Open Owkin',
    demo: true,
    image: '/projects/owkin/tumor_epithelium.png',
    imageAlt: 'Owkin evidence visualization',
    video: '/projects/owkin/demo.mp4',
  },
]

/**
 * Three always-visible project doorways — no tabs, no auto-rotate.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            Featured case studies
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Click any card — demos live inside.
          </p>
        </div>
        <Link
          href="/work"
          className="shrink-0 text-sm font-medium text-primary hover:underline"
        >
          All work
          <ArrowUpRight className="ml-0.5 inline size-3.5" />
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        {SHOWCASE.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex min-h-[7.25rem] overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-md hover:shadow-primary/10"
            >
              <div className="relative w-[38%] shrink-0 overflow-hidden bg-secondary/50 sm:w-40">
                {item.video ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={item.image}
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                ) : item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.imageAlt ?? ''}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(145deg, color-mix(in oklch, ${item.tint} 28%, transparent), color-mix(in oklch, ${item.tint} 8%, transparent))`,
                    }}
                  >
                    <span
                      className="font-display text-3xl font-semibold tracking-tight"
                      style={{ color: item.tint }}
                    >
                      {item.monogram}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3.5 sm:p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {item.eyebrow}
                </p>
                <p className="font-display text-base font-semibold leading-snug tracking-tight sm:text-lg">
                  {item.title}
                </p>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {item.blurb}
                </p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {item.demo && <Play className="size-3.5 fill-current" />}
                  {item.cta}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
