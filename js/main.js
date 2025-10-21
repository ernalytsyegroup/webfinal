// Main JavaScript File
import { init3DScene } from "./3d-scene.js"
import { initNavigation } from "./navigation.js"
import { initCarousels } from "./carousels.js"
import { initModal } from "./modal.js"
import { initScrollAnimations } from "./scroll-animations.js"

// Initialize all modules when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Initializing application...")

  // Initialize 3D scene
  init3DScene()

  // Initialize navigation
  initNavigation()

  // Initialize carousels
  initCarousels()

  // Initialize modal
  initModal()

  // Initialize scroll animations
  initScrollAnimations()

  console.log("[v0] Application initialized successfully")
})
