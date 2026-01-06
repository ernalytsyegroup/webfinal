// Navigation Module
export function initNavigation() {
  const navbar = document.getElementById("navbar")
  const navToggle = document.getElementById("navToggle")
  const navMenu = document.getElementById("navMenu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle mobile menu
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })

  // Add scrolled class to navbar
  let lastScroll = 0
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    lastScroll = currentScroll
  })

  // Highlight active section in navigation
  const sections = document.querySelectorAll("section[id]")

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))
        if (navLink) navLink.classList.add("active")
      }
    })
  })

  // Inject or attach global decorative shapes once
  if (!window.__globalShapesInitialized) {
    createGlobalShapes()
    window.__globalShapesInitialized = true
  }

  console.log("[v0] Navigation initialized")
}

function createGlobalShapes() {
  // If the page already has its own shapes (old .shape), do nothing
  if (document.querySelector('.shape.s1')) return

  // If the page already provided global-shape elements, attach parallax and return
  if (document.querySelector('.global-shape')) {
    attachParallaxToExisting()
    return
  }

  const shapes = ['s1', 's2', 's3']

  const bg = document.createElement('div')
  bg.className = 'global-bg-gradient'
  document.body.appendChild(bg)

  shapes.forEach(cls => {
    const el = document.createElement('div')
    el.className = `global-shape ${cls}`
    document.body.appendChild(el)
  })

  const pulse = document.createElement('div')
  pulse.className = 'global-pulse'
  document.body.appendChild(pulse)

  attachParallaxToExisting()
}

function attachParallaxToExisting() {
  let lastX = 0, lastY = 0, raf = null
  window.addEventListener('mousemove', e => {
    lastX = (e.clientX - window.innerWidth / 2) / 40
    lastY = (e.clientY - window.innerHeight / 2) / 40
    if (!raf) raf = requestAnimationFrame(() => { raf = null; applyParallax(lastX, lastY) })
  })
}

function applyParallax(x, y) {
  const s1 = document.querySelector('.global-shape.s1')
  const s2 = document.querySelector('.global-shape.s2')
  const s3 = document.querySelector('.global-shape.s3')
  if (s1) s1.style.transform = `translate(${x*1.2}px, ${y*1.2}px)`
  if (s2) s2.style.transform = `translate(${x*-1.1}px, ${y*0.9}px)`
  if (s3) s3.style.transform = `translate(${x*0.6}px, ${y*-0.8}px)`
}
