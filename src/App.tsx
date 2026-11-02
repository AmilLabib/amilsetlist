import { useMemo, useState } from 'react'
import { BackgroundSlideshow } from './components/BackgroundSlideshow'
import { SiteCard } from './components/SiteCard'
import { sites } from './data/sites'

const PORTAL_NAME = 'Backstage'

export default function App() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sites
    return sites.filter((site) =>
      [site.name, site.url].some((field) => field.toLowerCase().includes(q)),
    )
  }, [query])

  return (
    <>
      <BackgroundSlideshow />

      <main className="min-h-svh px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-display text-3xl font-semibold drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] sm:text-4xl">
              {PORTAL_NAME}
            </h1>
            <label className="relative block w-full sm:w-80">
              <span className="sr-only">Cari web</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari web…"
                className="w-full rounded-full border border-white/15 bg-white/7 px-5 py-3 text-sm placeholder:text-white/40 backdrop-blur-md transition outline-none focus:border-stage-blue focus:bg-white/10"
              />
            </label>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((site) => (
                <SiteCard key={site.url} site={site} />
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center text-white/50">
              Nggak ada web yang cocok sama “{query}”.
            </p>
          )}
        </div>
      </main>
    </>
  )
}
