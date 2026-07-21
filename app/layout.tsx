import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Web & Visuals – Building Digital Experiences Powered by Design & AI',
  description:
    'Web & Visuals is a premium digital agency specializing in web development, UI/UX design, branding, AI solutions, automation, mobile apps, and digital marketing.',
  keywords: [
    'web development',
    'UI/UX design',
    'branding',
    'AI solutions',
    'digital agency',
    'automation',
    'mobile apps',
  ],
  authors: [{ name: 'Web & Visuals' }],
  creator: 'Web & Visuals',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://webandvisuals.com',
    title: 'Web & Visuals – Building Digital Experiences Powered by Design & AI',
    description: 'Premium digital agency specializing in web, design & AI.',
    siteName: 'Web & Visuals',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web & Visuals',
    description: 'Building Digital Experiences Powered by Design & AI',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
