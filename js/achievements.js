// achievements navigation: prev/next buttons scroll the horizontal achievements grid
export function initAchievementsNav() {
  const grid = document.getElementById('achievementsGrid')
  const prev = document.getElementById('achPrev')
  const next = document.getElementById('achNext')
  if (!grid) return

  const scrollAmount = () => {
    // scroll by 80% of the container width
    return Math.floor(grid.clientWidth * 0.8)
  }

  if (prev) prev.addEventListener('click', () => {
    grid.scrollBy({ left: -scrollAmount(), behavior: 'smooth' })
  })

  if (next) next.addEventListener('click', () => {
    grid.scrollBy({ left: scrollAmount(), behavior: 'smooth' })
  })

  // Optional: enable/disable buttons at edges
  const updateButtons = () => {
    if (!prev || !next) return
    prev.disabled = grid.scrollLeft <= 0
    next.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1
    prev.style.opacity = prev.disabled ? '0.35' : '1'
    next.style.opacity = next.disabled ? '0.35' : '1'
  }

  grid.addEventListener('scroll', () => updateButtons())
  window.addEventListener('resize', () => updateButtons())
  // initial
  updateButtons()
}
