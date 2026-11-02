import { useEffect, useState } from 'react'
import stage1 from '../assets/bg/stage-1.webp'
import stage2 from '../assets/bg/stage-2.webp'
import stage3 from '../assets/bg/stage-3.webp'

const slides = [stage1, stage2, stage3]
const INTERVAL_MS = 7000

export function BackgroundSlideshow() {
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setActive((current) => {
        setPrev(current)
        return (current + 1) % slides.length
      })
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {slides.map((src, i) => {
        // Slide yang lagi fade-out tetap dianimasikan supaya zoom-nya nggak loncat balik
        const animating = i === active || i === prev
        return (
          <img
            key={src}
            src={src}
            alt=""
            fetchPriority={i === 0 ? 'high' : 'low'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            } ${animating ? 'animate-kenburns' : ''}`}
          />
        )
      })}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
      <div className="grain absolute inset-0" />
    </div>
  )
}
