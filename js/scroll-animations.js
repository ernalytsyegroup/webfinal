// Scroll Animations Module
export function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // add revealed class (CSS transitions handle appearance)
        const el = entry.target
        // if data-delay specified, use it
        const delay = el.dataset.delay || 0
        if (delay) el.style.transitionDelay = `${delay}ms`
        el.classList.add('revealed')
        // unobserve if you don't want repeat animations
        observer.unobserve(el)
      }
    })
  }, observerOptions)

  // Observe elements with .reveal OR preview sections
  const selector = '.reveal, .preview-section'
  const sections = document.querySelectorAll(selector)
  sections.forEach((section, i) => {
    // if element has data-anim, add the correct starting class
    const anim = section.dataset.anim || 'fade-up'
    // normalize to match CSS helpers
    switch (anim) {
      case 'fade-left':
        section.classList.add('reveal', 'fade-left')
        break
      case 'fade-right':
        section.classList.add('reveal', 'fade-right')
        break
      case 'fade-down':
        section.classList.add('reveal', 'fade-down')
        break
      case 'zoom':
        section.classList.add('reveal', 'zoom')
        break
      default:
        section.classList.add('reveal', 'fade-up')
        break
    }

    // set default transition if not present
    if (!section.style.transition) {
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      // allow per-element delay via data-delay
      if (!section.dataset.delay) section.dataset.delay = i * 80
    }
    observer.observe(section)
  })

  console.log("[v0] Scroll animations initialized")
}
