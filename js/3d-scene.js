

export function init3DScene() {
  const container = document.getElementById("hero3DContainer")
  if (!container) return

  // Scene setup
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  const pointLight = new THREE.PointLight(0x6366f1, 1, 100)
  pointLight.position.set(-5, 5, 5)
  scene.add(pointLight)

  // Camera position
  camera.position.z = 5

  // Zoom control state (camera z)
  let zoomTarget = camera.position.z
  const ZOOM_MIN = 1.5
  const ZOOM_MAX = 25
  const ZOOM_STEP = 0.35

  // Sections reveal setup
  const previewSections = Array.from(document.querySelectorAll('.preview-section'))
  // hide all sections initially
  previewSections.forEach((s) => {
    s.classList.add('hidden-section')
    s.classList.remove('visible-section')
  })

  const baseThreshold = 4.5 // z at which first section starts appearing when zooming in
  const thresholdStep = 0.8 // decrease per section
  const sectionThresholds = previewSections.map((_, i) => baseThreshold - i * thresholdStep)
  console.log('[3D] previewSections count:', previewSections.length)
  console.log('[3D] section thresholds:', sectionThresholds)

  // Create a placeholder 3D object (cube with gradient material) as a fallback
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    metalness: 0.7,
    roughness: 0.2,
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)


  let model = null
  if (typeof THREE !== 'undefined' && THREE.GLTFLoader) {
    const loader = new THREE.GLTFLoader()
    loader.load(
      '/models/logologo.glb', // relative path; serve the site over HTTP
      (gltf) => {
        model = gltf.scene
        // optional: adjust scale/position if necessary
        model.scale.set(1, 1, 1)
        model.position.set(0, 0, 0)
        scene.add(model)
        // hide fallback cube when model is present
        if (cube) cube.visible = false
        console.log('3D model loaded successfully: /models/logologo.glb')
      },
      (xhr) => {
        if (xhr.total) {
          console.log('Model loading:', (xhr.loaded / xhr.total) * 100 + '% loaded')
        }
      },
      (error) => {
        console.error('Error loading model:', error)
      }
    )
  } else {
    console.warn('THREE.GLTFLoader not available. Make sure GLTFLoader script is included in index.html')
  }

  // Mouse interaction
  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1
  })

  // Zoom buttons and wheel
  const zoomInBtn = document.getElementById('zoomInBtn')
  const zoomOutBtn = document.getElementById('zoomOutBtn')
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      zoomTarget = Math.max(ZOOM_MIN, zoomTarget - ZOOM_STEP)
      console.log('[3D] zoomIn clicked, zoomTarget ->', zoomTarget)
    })
  }
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      zoomTarget = Math.min(ZOOM_MAX, zoomTarget + ZOOM_STEP)
      console.log('[3D] zoomOut clicked, zoomTarget ->', zoomTarget)
    })
  }

  // Wheel zoom (over the container)
  container.addEventListener('wheel', (e) => {
    // prevent page scroll when zooming over the 3D area
    e.preventDefault()
    const delta = Math.sign(e.deltaY)
    zoomTarget = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoomTarget + delta * ZOOM_STEP))
    console.log('[3D] wheel delta', delta, 'zoomTarget ->', zoomTarget)
  }, { passive: false })

  // Lock page scroll while interacting with 3D container
  container.addEventListener('mouseenter', () => {
    document.body.style.overflow = 'hidden'
  })
  container.addEventListener('mouseleave', () => {
    document.body.style.overflow = ''
  })

  // Zoom overlay for debugging / UX
  const zoomOverlay = document.createElement('div')
  zoomOverlay.className = 'zoom-overlay'
  zoomOverlay.innerText = `zoom: ${camera.position.z.toFixed(2)}`
  document.body.appendChild(zoomOverlay)

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    // Rotate the loaded model if present, otherwise rotate the cube fallback
    const target = model || cube
    if (target) {
      // basic automatic rotation
      target.rotation.y += 0.005
      target.rotation.x += 0.002

      // apply mouse-based subtle rotation
      target.rotation.y += mouseX * 0.01
      target.rotation.x += mouseY * 0.01
    }

    // smooth camera zoom towards target (adjusted lerp)
    camera.position.z += (zoomTarget - camera.position.z) * 0.35

    // update zoom overlay
    if (zoomOverlay) {
      zoomOverlay.innerText = `zoom: ${camera.position.z.toFixed(2)} (target ${zoomTarget.toFixed(2)})`
    }

    // reveal sections based on camera distance (zoom out)
    previewSections.forEach((section, idx) => {
      const threshold = sectionThresholds[idx]
      // Reveal when camera is close enough (z is less than or equal to threshold)
      if (camera.position.z <= threshold) {
        if (!section.classList.contains('visible-section')) {
          // staggered reveal via transitionDelay
          section.style.transitionDelay = `${idx * 80}ms`
          section.classList.add('visible-section')
          section.classList.remove('hidden-section')
          console.log(`[3D] reveal section ${idx} (threshold=${threshold}) - camera.z=${camera.position.z.toFixed(2)}`)
        }
      } else {
        if (!section.classList.contains('hidden-section')) {
          section.style.transitionDelay = `0ms`
          section.classList.add('hidden-section')
          section.classList.remove('visible-section')
          console.log(`[3D] hide section ${idx} (threshold=${threshold}) - camera.z=${camera.position.z.toFixed(2)}`)
        }
      }
    })

    renderer.render(scene, camera)
  }

  animate()

  // Optional: add OrbitControls for easier debugging if available globally
  if (typeof THREE !== 'undefined' && THREE.OrbitControls) {
    try {
      const controls = new THREE.OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.update()
      // update controls each frame
      const origAnimate = animate
      function animateWithControls() {
        requestAnimationFrame(animateWithControls)
        controls.update()
        const target = model || cube
        if (target) {
          target.rotation.y += 0.005
          target.rotation.x += 0.002
          target.rotation.y += mouseX * 0.01
          target.rotation.x += mouseY * 0.01
        }
        renderer.render(scene, camera)
      }
      // replace the running loop
      // stop the previous loop by simply not calling it again and start the new one
      animateWithControls()
    } catch (e) {
      console.warn('OrbitControls available but failed to initialize:', e)
    }
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  console.log("[v0] 3D scene initialized")
}
