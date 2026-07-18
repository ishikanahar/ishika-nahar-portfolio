import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ishika.dev'),
  title: {
    default: 'Ishika — Applied AI, Data Science & Machine Learning',
    template: '%s · Ishika',
  },
  description:
    'UC San Diego student building practical, reliable AI systems from data to product. Portfolio of applied machine learning, AI evaluation, and data science work across healthcare, behavioral, and biomedical data.',
  keywords: [
    'Ishika',
    'Applied AI',
    'Machine Learning',
    'Data Science',
    'AI Engineer Intern',
    'UC San Diego',
    'LLM Evaluation',
    'Computer Vision',
  ],
  authors: [{ name: 'Ishika' }],
  openGraph: {
    title: 'Ishika — Applied AI, Data Science & Machine Learning',
    description:
      'Building practical, reliable AI systems from data to product. Applied ML, AI evaluation, and data science portfolio.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ishika — Applied AI, Data Science & Machine Learning',
    description:
      'Building practical, reliable AI systems from data to product.',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f6f2' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1a24' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
