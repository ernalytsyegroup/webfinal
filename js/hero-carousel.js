// Simple looping carousel placed behind the hero text
const SELECTOR = '#heroCarousel .slides'
let intervalId = null
let rafLoop = null
let index = 0
let originalCount = 0
let slideSize = 0
let gapSize = 36
const TRANSITION_MS = 900
const HOLD_MS = 2200
let parallaxTarget = 0
let parallaxOffset = 0
let rafParallax = null

function setupLoop() {
  const el = document.querySelector(SELECTOR)
  if (!el) return

  // ensure consistent sizing and duplicate nodes for seamless loop
  const items = Array.from(el.children)
  originalCount = items.length

  if (originalCount === 0) return

  // clone items so we can reset without visible jump
  if (el.dataset.looped !== '1') {
    items.forEach((node) => el.appendChild(node.cloneNode(true)))
    el.dataset.looped = '1'
  }

  // compute slide width + gap
  const first = el.children[0]
  const style = getComputedStyle(el)
  gapSize = parseInt(style.gap || 36)
  slideSize = first.offsetWidth + gapSize

  // reset transform and index
  index = 0
  el.style.transition = 'none'
  el.style.transform = 'translateX(0px)'

  // mark initial active
  setActive(el, 0)

  // clear existing interval / loop
  if (intervalId) { clearInterval(intervalId); intervalId = null }
  if (rafLoop) { window.cancelAnimationFrame(rafLoop); rafLoop = null }

  // start continuous RAF-driven loop for a smooth seamless effect
  startContinuousLoop(el)

  // start parallax tied to the hero area (uses el as root for transforms)
  startParallax(el)
}

function startContinuousLoop(el) {
  if (!el) return
  // progress in pixels
  let progress = 0
  const totalWidth = originalCount * slideSize
  const speed = slideSize / (HOLD_MS / 1000) // px per second -> one slide per HOLD_MS
  let last = performance.now()

  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    progress += speed * dt
    // wrap progress to keep seamless loop
    if (progress >= totalWidth) progress -= totalWidth

    // compute index for active marking
    index = Math.floor(progress / slideSize) % originalCount

    // apply transform with parallax offset considered
    const base = Math.round(progress)
    const total = Math.round(base - parallaxOffset)
    el.style.transition = 'none'
    el.style.transform = `translateX(-${total}px)`

    setActive(el, index)
    rafLoop = window.requestAnimationFrame(loop)
  }

  rafLoop = window.requestAnimationFrame(loop)
}

function applyTransform(el) {
  const base = index * slideSize
  const total = Math.round(base - parallaxOffset)
  el.style.transform = `translateX(-${total}px)`
}

function startParallax(rootEl) {
  const hero = document.querySelector('.hero')
  if (!hero) return

  if (hero.dataset.parallaxAttached === '1') return

  const maxOffset = Math.min(140, Math.round(slideSize * 0.12)) // limit parallax magnitude

  const onMove = (e) => {
    const rect = hero.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const dx = (e.clientX - cx) / (rect.width / 2) // -1 .. 1
    parallaxTarget = dx * maxOffset
  }

  hero.addEventListener('mousemove', onMove)
  hero.addEventListener('mouseleave', () => { parallaxTarget = 0 })

  hero.dataset.parallaxAttached = '1'

  const loop = () => {
    parallaxOffset += (parallaxTarget - parallaxOffset) * 0.12 // smoothing
    // update transform if slides exist
    if (rootEl) {
      const base = index * slideSize
      const total = Math.round(base - parallaxOffset)
      rootEl.style.transform = `translateX(-${total}px)`
    }
    rafParallax = window.requestAnimationFrame(loop)
  }

  if (!rafParallax) rafParallax = window.requestAnimationFrame(loop)
}

function stopParallax() {
  if (rafParallax) { window.cancelAnimationFrame(rafParallax); rafParallax = null }
}

function setActive(el, idx) {
  if (!el) return
  const children = Array.from(el.children)
  children.forEach((c) => c.classList.remove('active'))
  const node = el.children[idx]
  if (node) node.classList.add('active')
}

export function initHeroCarousel() {
  // init on DOM ready
  const el = document.querySelector(SELECTOR)
  if (!el) return
  // ensure images are loaded then setup
  const imgs = el.querySelectorAll('img')
  let loaded = 0
  if (imgs.length === 0) { setupLoop(); return }
  imgs.forEach((img) => {
    if (img.complete) loaded++
    else img.addEventListener('load', () => { loaded++; if (loaded === imgs.length) setupLoop() })
  })
  if (loaded === imgs.length) setupLoop()

  window.addEventListener('resize', () => { if (el) setupLoop() })

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (intervalId) { clearInterval(intervalId); intervalId = null }
      stopParallax()
    } else setupLoop()
  })
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    try { initHeroCarousel() } catch (e) { /* ignore */ }
  })
}
