import * as THREE from "https://cdn.jsdelivr.net/npm/three@r128/build/three.module.js"

let scene, camera, renderer
let zoomLevel = 1
const sections = []
let sectionDetailsVisible = false

export function init3DScene(containerId) {
  const container = document.getElementById(containerId)
  if (!container) return

  // Scene setup - Changed background to pure black
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)
  scene.fog = new THREE.Fog(0x000000, 100, 1000)

  // Camera
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
  camera.position.z = 5

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowShadowMap
  container.appendChild(renderer.domElement)

  // Enhanced Lighting - Improved lighting for black background
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xa3e635, 0.9)
  directionalLight.position.set(5, 10, 7)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  const pointLight = new THREE.PointLight(0xa3e635, 0.6)
  pointLight.position.set(-5, 5, 5)
  scene.add(pointLight)

  // Create central rotating cube with section labels
  createCentralCube()

  // Create orbital section nodes
  createSectionNodes()

  // Add stars background
  createStarfield()

  // Mouse wheel zoom with enhanced reveal
  container.addEventListener("wheel", handleZoom, false)
  window.addEventListener("resize", onWindowResize)

  // Animation loop
  animate()

  // Return public API
  return {
    getScene: () => scene,
    getCamera: () => camera,
    getRenderer: () => renderer,
    getZoomLevel: () => zoomLevel,
    triggerSectionReveal: (sectionIndex) => revealSpecificSection(sectionIndex),
  }
}

function createCentralCube() {
  const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)

  const materials = [
    new THREE.MeshStandardMaterial({ color: 0xa3e635, emissive: 0x4a8000, metalness: 0.8, roughness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: 0x7ec724, emissive: 0x2d5a0e, metalness: 0.8, roughness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: 0x8edb46, emissive: 0x3d6f1a, metalness: 0.8, roughness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: 0x6fc917, emissive: 0x1f4608, metalness: 0.8, roughness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: 0xa3e635, emissive: 0x4a8000, metalness: 0.8, roughness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: 0x9de62b, emissive: 0x3d7814, metalness: 0.8, roughness: 0.2 }),
  ]

  const cube = new THREE.Mesh(geometry, materials)
  cube.castShadow = true
  cube.receiveShadow = true
  cube.userData.type = "centralCube"
  scene.add(cube)
}

function createSectionNodes() {
  const sectionNames = [
    "Inicio",
    "Sobre Mí",
    "Servicios",
    "Galería",
    "Cursos",
    "Recursos",
    "Equipo",
    "Clientes",
    "Contacto",
  ]

  const radius = 8
  const angleStep = (Math.PI * 2) / sectionNames.length

  sectionNames.forEach((name, index) => {
    // Sphere node
    const geometry = new THREE.IcosahedronGeometry(0.3, 4)
    const material = new THREE.MeshStandardMaterial({
      color: 0xa3e635,
      emissive: 0x4a8000,
      metalness: 0.7,
      roughness: 0.3,
    })

    const sphere = new THREE.Mesh(geometry, material)
    const angle = angleStep * index

    sphere.position.x = Math.cos(angle) * radius
    sphere.position.y = Math.sin(angle) * radius
    sphere.position.z = Math.cos(angle * 0.5) * 2

    sphere.castShadow = true
    sphere.receiveShadow = true
    sphere.userData = {
      type: "sectionNode",
      name: name,
      index: index,
      orbitRadius: radius,
      angle: angle,
    }

    scene.add(sphere)
    sections.push(sphere)

    // Add text label
    addTextLabel(name, sphere.position, index)
  })
}

function addTextLabel(text, position, index) {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  canvas.width = 256
  canvas.height = 128

  ctx.fillStyle = "#a3e635"
  ctx.font = "bold 24px Arial"
  ctx.textAlign = "center"
  ctx.fillText(text, 128, 80)

  const texture = new THREE.CanvasTexture(canvas)
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
  const sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(2, 1, 1)
  sprite.position.copy(position)
  sprite.position.y += 1.2

  sprite.userData = { type: "label", index: index }
  scene.add(sprite)
}

function createStarfield() {
  const geometry = new THREE.BufferGeometry()
  const count = 500
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 200
    positions[i + 1] = (Math.random() - 0.5) * 200
    positions[i + 2] = (Math.random() - 0.5) * 200
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0xa3e635,
    size: 0.2,
    sizeAttenuation: true,
  })

  const stars = new THREE.Points(geometry, material)
  scene.add(stars)
}

function handleZoom(event) {
  event.preventDefault()

  const scrollDelta = event.deltaY > 0 ? 0.9 : 1.1
  zoomLevel *= scrollDelta
  zoomLevel = Math.max(0.5, Math.min(5, zoomLevel))

  camera.position.z = 5 / zoomLevel

  revealSectionsByZoom()
}

function revealSectionsByZoom() {
  sections.forEach((section, index) => {
    const baseScale = 1
    const zoomFactor = Math.max(0, Math.min(1, (zoomLevel - 0.8) / 2.5))
    const newScale = baseScale + zoomFactor * 1.2

    section.scale.set(newScale, newScale, newScale)
    section.material.emissiveIntensity = zoomFactor * 1.2

    // Reveal text labels at optimal zoom level
    scene.children.forEach((child) => {
      if (child.userData.type === "label" && child.userData.index === index) {
        child.visible = zoomLevel > 1.3
        child.scale.set(1 + zoomFactor * 0.8, 1 + zoomFactor * 0.8, 1)
        child.material.opacity = Math.min(1, zoomFactor + 0.3)
      }
    })
  })

  if (zoomLevel > 2.5 && !sectionDetailsVisible) {
    revealPortfolioSections()
    sectionDetailsVisible = true
  } else if (zoomLevel < 1.8) {
    hidePortfolioSections()
    sectionDetailsVisible = false
  }
}

function revealPortfolioSections() {
  // Trigger animation on portfolio sections
  const pageContent = document.querySelector(".page-content")
  if (pageContent) {
    pageContent.style.opacity = "1"
    pageContent.style.animation = "expandSectionContent 0.8s ease-out forwards"
  }
}

function hidePortfolioSections() {
  const pageContent = document.querySelector(".page-content")
  if (pageContent) {
    pageContent.style.opacity = "0"
  }
}

function revealSpecificSection(sectionIndex) {
  const section = sections[sectionIndex]
  if (section) {
    section.material.emissiveIntensity = 1.5
    setTimeout(() => {
      section.material.emissiveIntensity = 1
    }, 500)
  }
}

function animate() {
  requestAnimationFrame(animate)

  // Rotate central cube with smoother animation
  const cube = scene.children.find((child) => child.userData.type === "centralCube")
  if (cube) {
    cube.rotation.x += 0.002
    cube.rotation.y += 0.004
  }

  // Orbit sections
  sections.forEach((section) => {
    const data = section.userData
    data.angle += 0.0008
    section.position.x = Math.cos(data.angle) * data.orbitRadius
    section.position.y = Math.sin(data.angle) * data.orbitRadius
    section.position.z = Math.cos(data.angle * 0.5) * 2

    // Gentle rotation
    section.rotation.x += 0.001
    section.rotation.y += 0.0015

    // Update label positions
    scene.children.forEach((child) => {
      if (child.userData.type === "label" && child.userData.index === data.index) {
        child.position.copy(section.position)
        child.position.y += 1.2
      }
    })
  })

  renderer.render(scene, camera)
}

function onWindowResize() {
  const container = renderer.domElement.parentElement
  const width = container.clientWidth
  const height = container.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

// Export initialization
export function attachZoomIndicator() {
  const indicator = document.createElement("div")
  indicator.id = "zoomIndicator"
  indicator.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(163, 230, 53, 0.2);
    border: 1px solid #a3e635;
    padding: 12px 16px;
    border-radius: 8px;
    color: #a3e635;
    font-weight: 600;
    font-size: 0.9rem;
    pointer-events: none;
    z-index: 100;
  `

  const container = document.querySelector("#canvas-3d-container") || document.body
  container.appendChild(indicator)

  return indicator
}
