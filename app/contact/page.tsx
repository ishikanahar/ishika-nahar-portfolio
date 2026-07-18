import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { SectionHeading } from '@/components/section-heading'
import { SocialLinks } from '@/components/social-links'
import { site, isRealLink } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ishika about internships and collaborations.',
}

export default function ContactPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk"
          description="I'm looking for Applied AI, ML, and Data Science internships for Fall 2026 and Summer 2027. The fastest way to reach me is email."
        />

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          {isRealLink(site.email) ? (
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Mail className="size-4" />
              {site.email}
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">
              [Ishika: add your email in content/site.ts]
            </p>
          )}

          <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Elsewhere
            </span>
            <SocialLinks className="-ml-1" />
          </div>
        </div>
      </section>
    </PageShell>
  )
}
