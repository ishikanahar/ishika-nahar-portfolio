import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/hero'
import { LandingDemos } from '@/components/landing-demos'
import { CapabilitiesSection } from '@/components/capabilities-section'
import { FeaturedWork } from '@/components/featured-work'
import { HomeExperience } from '@/components/home-experience'
import { HomeCta } from '@/components/home-cta'

/**
 * Hero → live demos (Sternson / Luveo / Owkin) → skills → featured → experience → CTA
 */
export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <LandingDemos />
        <CapabilitiesSection />
        <FeaturedWork />
        <HomeExperience />
        <HomeCta />
      </main>
      <SiteFooter />
    </div>
  )
}
