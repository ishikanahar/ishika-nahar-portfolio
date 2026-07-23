import type { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap, MapPin, Mail, FileText } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { site, isRealLink } from '@/content/site'

export const metadata: Metadata = {
  title: 'About',
  description: `About ${site.fullName} — applied AI, machine learning, and the story behind the work.`,
}

const QUICK = [
  { icon: GraduationCap, label: 'Education', value: 'UC San Diego' },
  { icon: MapPin, label: 'Location', value: site.location },
  { icon: Mail, label: 'Email', value: site.email },
]

const TAGS = [
  'Applied AI',
  'Machine Learning',
  'Data Science',
  'Neurobiology',
  'House Captain',
  'Competitive Swimmer',
]

const LIFE = [
  {
    src: '/about/swimming.png',
    alt: 'Ishika swimming breaststroke in competition',
    caption: 'Competitive swimming',
  },
  {
    src: '/about/house-captain.png',
    alt: 'House captains holding house flags on sports day',
    caption: 'House Captain',
  },
  {
    src: '/about/sports-day-win.png',
    alt: 'House team celebrating sports day trophies at La Martiniere',
    caption: 'Sports Day win',
  },
  {
    src: '/about/swim-team-prizes.png',
    alt: 'Swim team with trophies on the pool deck',
    caption: 'Swim team prizes',
  },
]

export default function AboutPage() {
  const resumeHref = isRealLink(site.links.resume) ? site.links.resume : '/resume'

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <header className="max-w-2xl">
          <p className="text-sm font-medium text-primary">About</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Builder. Researcher. Teammate.
          </h1>
          <p className="mt-3 text-muted-foreground text-pretty">
            The work is technical — the path here is not only code.
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/headshot.png"
              alt={`${site.fullName} headshot`}
              className="aspect-square w-full rounded-2xl border border-border object-cover object-top shadow-sm"
            />
            <div className="rounded-2xl border border-border bg-card p-4">
              <ul className="space-y-3">
                {QUICK.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex gap-3 text-sm">
                    <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                        {label}
                      </p>
                      <p className="font-medium">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
                {TAGS.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6 text-base leading-relaxed text-foreground/85">
            <p>{site.intro}</p>
            <p>
              I study {site.degree} at {site.school} ({site.graduation}). Day to
              day I work across behavioral pose estimation, healthcare
              compliance copilots, pathology foundation-model evaluation, and
              personal AI prototypes — always trying to keep failure modes and
              limitations visible.
            </p>
            <p>
              Before UC San Diego I competed as a national-level swimmer and
              served as Martin House Captain (2022–2023) at La Martinière for
              Girls. I won CISCE Nationals in the 50m, 100m, and 200m
              breaststroke, qualified for the School Games Federation of India,
              and received Telegraph School Awards for swimming.
            </p>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-display text-lg font-semibold text-primary">
                Let&apos;s connect
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {site.availability}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
                >
                  <Mail className="size-4" />
                  Get in touch
                </Link>
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium"
                >
                  <FileText className="size-4" />
                  Résumé
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Beyond the lab
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Swimming, House Captaincy, and the teams that shaped how I work.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {LIFE.map((item) => (
              <figure
                key={item.src}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="border-t border-border px-4 py-2.5 text-sm font-medium">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </section>
    </PageShell>
  )
}
