import Link from 'next/link'

export interface LegalSection {
  heading: string
  body: string[]
}

const legalNav = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Refund Policy', href: '/refund' },
  { label: 'Cookie Policy', href: '/cookies' },
]

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <section className="pt-32 pb-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[220px_1fr] gap-12">
          {/* Side nav */}
          <aside className="hidden lg:block">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Legal
            </p>
            <nav className="flex flex-col gap-1">
              {legalNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-3">{title}</h1>
            <p className="text-sm text-muted-foreground mb-8">Last updated: {updated}</p>
            <p className="text-muted-foreground leading-relaxed mb-10">{intro}</p>

            <div className="space-y-10">
              {sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="text-xl font-bold mb-3">{s.heading}</h2>
                  <div className="space-y-3">
                    {s.body.map((p, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed text-sm">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 bg-card border border-border rounded-2xl p-6">
              <p className="text-sm text-muted-foreground">
                Questions about this policy? Reach out at{' '}
                <a href="mailto:hello@webandvisuals.com" className="text-primary hover:underline">
                  hello@webandvisuals.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
