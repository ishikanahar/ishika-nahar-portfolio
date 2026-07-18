import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { PageShell, PlaceholderNote } from '@/components/page-shell'
import { SectionHeading } from '@/components/section-heading'
import { site, isRealLink } from '@/content/site'

export const metadata: Metadata = {
  title: 'Résumé',
  description: "Ishika's résumé.",
}

export default function ResumePage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Résumé"
          title="Résumé"
          description="View or download the latest version."
        />

        {isRealLink(site.links.resume) ? (
          <a
            href={site.links.resume}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <FileText className="size-4" />
            Download PDF
          </a>
        ) : (
          <PlaceholderNote text="Next build: drop your résumé PDF into the /public folder and set links.resume in content/site.ts (e.g. '/ishika-resume.pdf'). I can also render an HTML version of your résumé on this page for SEO and quick viewing." />
        )}
      </section>
    </PageShell>
  )
}
