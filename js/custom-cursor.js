export function initCustomCursor() {
  // Create cursor tracker element
  const cursorTracker = document.createElement("div")
  cursorTracker.className = "cursor-tracker"
  document.body.appendChild(cursorTracker)

  let mouseX = 0
  let mouseY = 0
  let targetX = 0
  let targetY = 0

  // Track mouse position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    // Activate cursor tracker on first move
    if (!cursorTracker.classList.contains("active")) {
      cursorTracker.classList.add("active")
      document.body.classList.add("custom-cursor-active")
    }
  })

  // Hide cursor tracker when mouse leaves window
  document.addEventListener("mouseleave", () => {
    cursorTracker.classList.remove("active")
    document.body.classList.remove("custom-cursor-active")
  })

  let animationFrameId
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)

    // Smooth easing for cursor follow
    targetX += (mouseX - targetX) * 0.25
    targetY += (mouseY - targetY) * 0.25

    // Position cursor tracker with offset to center it on the mouse (25px for new 50px size)
    cursorTracker.style.left = targetX - 25 + "px"
    cursorTracker.style.top = targetY - 25 + "px"
  }

  animate()

  // Cleanup function
  return () => {
    cancelAnimationFrame(animationFrameId)
    cursorTracker.remove()
    document.body.classList.remove("custom-cursor-active")
  }
}
