import { init3DScene } from "./3d-scene.js"
import { initHeroModel } from "./hero-model.js"
import { initNavigation } from "./navigation.js"
import { initCarousels } from "./carousels.js"
import { initModal } from "./modal.js"
import { initScrollAnimations } from "./scroll-animations.js"
import { initAbout3D } from "./about-3d.js"
import { initHomepage3D } from "./homepage-3d.js"
import { initCustomCursor } from "./custom-cursor.js"

// Initialize all modules when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  try {
    initCustomCursor()
    initScrollAnimations()
    initNavigation()
    initCarousels()
    initModal()
    init3DScene()
    initHeroModel()
    initAbout3D()
    initHomepage3D() // Added homepage 3D initialization
  } catch (error) {
    console.error("[v0] Error during app initialization:", error)
  }
})
