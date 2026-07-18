import { Mail } from 'lucide-react'
import { site, isRealLink } from '@/content/site'
import { cn } from '@/lib/utils'

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

interface SocialLinksProps {
  className?: string
  iconClassName?: string
}

export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  const items = [
    isRealLink(site.links.linkedin) && {
      label: 'LinkedIn',
      href: site.links.linkedin,
      Icon: LinkedinIcon,
    },
    isRealLink(site.links.github) && {
      label: 'GitHub',
      href: site.links.github,
      Icon: GithubIcon,
    },
    isRealLink(site.email) && {
      label: 'Email',
      href: `mailto:${site.email}`,
      Icon: Mail,
    },
  ].filter(Boolean) as { label: string; href: string; Icon: React.ComponentType<{ className?: string }> }[]

  // Fallback: show disabled-looking placeholders so structure is visible.
  const showPlaceholders = items.length === 0

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {showPlaceholders && (
        <span className="text-xs text-muted-foreground">
          [Ishika: add LinkedIn / GitHub / email in content/site.ts]
        </span>
      )}
      {items.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noreferrer"
          aria-label={label}
          className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Icon className={cn('size-[18px]', iconClassName)} />
        </a>
      ))}
    </div>
  )
}
