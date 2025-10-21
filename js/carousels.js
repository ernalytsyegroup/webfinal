// Carousels Module
export function initCarousels() {
  // Gallery Carousel
  initGalleryCarousel()

  // Team Carousel
  initTeamCarousel()

  // Clients Carousel (auto-scroll)
  initClientsCarousel()

  console.log("[v0] Carousels initialized")
}

function initGalleryCarousel() {
  const carousel = document.getElementById("galleryCarousel")
  if (!carousel) return

  const track = carousel.querySelector(".carousel-track")
  const prevBtn = document.getElementById("galleryPrev")
  const nextBtn = document.getElementById("galleryNext")
  const images = track.querySelectorAll(".carousel-image")

  let currentIndex = 0

  function updateCarousel() {
    const offset = -currentIndex * 100
    track.style.transform = `translateX(${offset}%)`
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length
      updateCarousel()
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length
      updateCarousel()
    })
  }

  // Auto-advance every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length
    updateCarousel()
  }, 5000)
}

function initTeamCarousel() {
  const carousel = document.getElementById("teamCarousel")
  if (!carousel) return

  const track = carousel.querySelector(".team-track")
  const prevBtn = document.getElementById("teamPrev")
  const nextBtn = document.getElementById("teamNext")
  const members = track.querySelectorAll(".team-member")

  let currentIndex = 0

  function updateCarousel() {
    const memberWidth = members[0].offsetWidth + 32 // width + gap
    const offset = -currentIndex * memberWidth
    track.style.transform = `translateX(${offset}px)`
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = Math.max(0, currentIndex - 1)
      updateCarousel()
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = Math.min(members.length - 1, currentIndex + 1)
      updateCarousel()
    })
  }
}

function initClientsCarousel() {
  const carousel = document.getElementById("clientsCarousel")
  if (!carousel) return

  const track = carousel.querySelector(".clients-track")

  // Duplicate logos for infinite scroll effect
  const logos = Array.from(track.children)
  logos.forEach((logo) => {
    const clone = logo.cloneNode(true)
    track.appendChild(clone)
  })
}
