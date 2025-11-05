/**
 * Initialize homepage 3D animations and statistics counter
 */
export function initHomepage3D() {
  initStatsAnimation()
  initServiceCards3D()
  initResourceCards()
  setupScrollAnimations()
}

/**
 * Animate statistics numbers when in viewport
 */
function initStatsAnimation() {
  const statNumbers = document.querySelectorAll(".stat-number")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
          const target = Number.parseInt(entry.target.getAttribute("data-target"))
          animateNumber(entry.target, target)
          entry.target.classList.add("animated")
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => observer.observe(stat))
}

/**
 * Animate a number from 0 to target value
 */
function animateNumber(element, target) {
  const duration = 2000
  const start = Date.now()
  const initialValue = 0

  function updateNumber() {
    const now = Date.now()
    const progress = Math.min((now - start) / duration, 1)
    const current = Math.floor(initialValue + (target - initialValue) * easeOutQuad(progress))
    element.textContent = current
    if (progress < 1) requestAnimationFrame(updateNumber)
  }

  updateNumber()
}

/**
 * Easing function for smooth animation
 */
function easeOutQuad(t) {
  return t * (2 - t)
}

/**
 * 3D card interactions for service cards
 */
function initServiceCards3D() {
  const cards = document.querySelectorAll(".service-card-3d")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1200px) rotateX(0) rotateY(0) translateZ(0)"
    })
  })
}

/**
 * Add hover effects to resource cards
 */
function initResourceCards() {
  const resourceCards = document.querySelectorAll(".resource-card-3d")

  resourceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.animation = "floatAnimation 3s ease-in-out infinite"
    })

    card.addEventListener("mouseleave", () => {
      card.style.animation = "none"
    })
  })
}

/**
 * Setup scroll animations for sections
 */
function setupScrollAnimations() {
  const sections = document.querySelectorAll('[class*="-section"]')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.8s ease-out"
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((section) => observer.observe(section))
}
