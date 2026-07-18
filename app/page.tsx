import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/hero'
import { FeaturedWork } from '@/components/featured-work'
import { CapabilitiesSection } from '@/components/capabilities-section'
import { CurrentFocus } from '@/components/current-focus'
import { PersonalIntro } from '@/components/personal-intro'

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <FeaturedWork />
        <CapabilitiesSection />
        <CurrentFocus />
        <PersonalIntro />
      </main>
      <SiteFooter />
    </div>
  )
}
