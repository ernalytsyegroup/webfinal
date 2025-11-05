// 3D About Section Controller

let aboutSection // Declare the variable before using it

export function initAbout3D() {
  aboutSection = document.querySelector(".about-compact") // Assign the variable here
  if (!aboutSection) return

  initMouseFollowEffect()
  initParallaxEffect()
  initScrollTrigger()
}

// Mouse follow effect for 3D perspective
function initMouseFollowEffect() {
  const aboutImage = document.querySelector(".about-image")
  if (!aboutImage) return

  document.addEventListener("mousemove", (e) => {
    if (!isElementInViewport(aboutSection)) return

    const mouseX = e.clientX / window.innerWidth - 0.5
    const mouseY = e.clientY / window.innerHeight - 0.5

    aboutImage.style.transform = `
      perspective(1000px)
      rotateX(${mouseY * 10}deg)
      rotateY(${mouseX * 10}deg)
      scale(1.02)
      translateZ(20px)
    `
  })

  // Reset on mouse leave
  aboutSection.addEventListener("mouseleave", () => {
    aboutImage.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1) translateZ(0)"
  })
}

// Parallax effect based on scroll
function initParallaxEffect() {
  const aboutText = document.querySelector(".about-text")
  const aboutImage = document.querySelector(".about-image")
  if (!aboutText || !aboutImage) return

  window.addEventListener("scroll", () => {
    const sectionTop = aboutSection.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    // Calculate parallax intensity (0 to 1)
    const parallaxIntensity = Math.max(0, 1 - sectionTop / windowHeight)

    // Apply parallax to text (moves up)
    const textOffset = parallaxIntensity * 30
    aboutText.style.transform = `translateY(${textOffset}px)`

    // Apply parallax to image (moves down - opposite direction)
    const imageOffset = parallaxIntensity * -20
    aboutImage.style.transform = `translateY(${imageOffset}px)`
  })
}

// Trigger animations when section enters viewport
function initScrollTrigger() {
  const highlightItems = document.querySelectorAll(".highlight-item")
  if (highlightItems.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger number counter animation
          const numberElement = entry.target.querySelector(".highlight-number")
          if (numberElement && !numberElement.dataset.animated) {
            animateNumber(numberElement)
            numberElement.dataset.animated = "true"
          }
        }
      })
    },
    { threshold: 0.5 },
  )

  highlightItems.forEach((item) => observer.observe(item))
}

// Animate numbers from 0 to target
function animateNumber(element) {
  const text = element.textContent
  const targetValue = Number.parseInt(text) || 0
  const prefix = text.match(/[+]/)?.[0] || ""
  const suffix = text.match(/[%]/)?.[0] || ""

  let current = 0
  const duration = 1000 // 1 second
  const startTime = performance.now()

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    current = Math.floor(targetValue * progress)
    element.textContent = prefix + current + suffix

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

// Helper function to check if element is in viewport
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}
