import { useState } from 'react'
import type { Site } from '../data/sites'

function hostOf(url: string) {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

// Path ikon yang umum dipakai; dicoba berurutan langsung dari web-nya sendiri
const ICON_PATHS = ['/favicon.svg', '/icon.svg', '/favicon.ico', '/favicon.png', '/logo.svg', '/vite.svg']

function iconCandidates(site: Site) {
  let origin: string
  try {
    origin = new URL(site.url).origin
  } catch {
    return site.icon ? [site.icon] : []
  }
  const guesses = ICON_PATHS.map((path) => origin + path)
  return site.icon ? [site.icon, ...guesses] : guesses
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}

export function SiteCard({ site }: { site: Site }) {
  const host = hostOf(site.url)
  const candidates = iconCandidates(site)
  const [iconIndex, setIconIndex] = useState(0)
  const iconSrc = candidates[iconIndex]

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-stage-orange/60 hover:bg-white/10 hover:shadow-[0_10px_40px_-10px_rgba(255,138,31,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stage-blue"
    >
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10">
        {iconSrc ? (
          <img
            key={iconSrc}
            src={iconSrc}
            alt=""
            loading="lazy"
            className="size-7 object-contain"
            onError={() => setIconIndex((i) => i + 1)}
          />
        ) : (
          <span className="font-display text-sm font-semibold text-stage-orange">
            {initials(site.name)}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-semibold">{site.name}</h3>
        <p className="mt-0.5 truncate text-xs text-white/40">{host}</p>
      </div>

      <span
        aria-hidden
        className="text-xl text-white/40 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-stage-orange"
      >
        ↗
      </span>
    </a>
  )
}
