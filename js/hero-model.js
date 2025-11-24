// Simple hero GLB preview — loads a small GLB and applies a subtle animation
export function initHeroModel() {
  console.log('[hero-model] init start')
  const container = document.getElementById('heroModel')
  if (!container) { console.warn('[hero-model] container not found'); return }

  // basic availability checks
  if (typeof THREE === 'undefined') {
    console.warn('[hero-model] THREE not found. Make sure three.js is loaded.')
    // show a small visible placeholder so user knows something tried to run
    container.innerHTML = '<div style="padding:20px;color:#fff;background:#111;border-radius:8px;">Three.js not loaded</div>'
    return
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, Math.max(0.1, container.clientWidth / Math.max(1, container.clientHeight)), 0.1, 100)
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio || 1)
  renderer.setSize(Math.max(1, container.clientWidth), Math.max(1, container.clientHeight))
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.maxWidth = '640px'
  renderer.domElement.style.width = '100%'
  container.appendChild(renderer.domElement)

  // lights: brighter ambient + warm fill + a subtle green rim/point light
  const ambient = new THREE.AmbientLight(0xffffff, 1.0)
  scene.add(ambient)
  const hemi = new THREE.HemisphereLight(0xffffff, 0x080820, 0.35)
  scene.add(hemi)
  const dir = new THREE.DirectionalLight(0xffffff, 1.0)
  dir.position.set(5, 10, 7)
  scene.add(dir)
  // green accent light to create green-tinted shadows/highlights
  const greenLight = new THREE.PointLight(0x7CFF78, 0.9, 8)
  greenLight.position.set(-1.5, 0.5, 1.5)
  scene.add(greenLight)

  // fallback cube
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ color: 0x90ee90, metalness: 0.3, roughness: 0.6 })
  const cube = new THREE.Mesh(geometry, material)
  cube.visible = false
  // ensure cube sits at the bob base
  cube.position.y = 0
  scene.add(cube)

  let model = null
  if (THREE && THREE.GLTFLoader) {
    try {
      const loader = new THREE.GLTFLoader()
    loader.load('/models/logologo.glb', (gltf) => {
      model = gltf.scene
      model.traverse((c) => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true } })
      // create a pivot so we can orbit the pivot while keeping the model orientation fixed
      const pivot = new THREE.Object3D()
      // scale/position adjustments on the model itself
      const s = 6.0
      model.scale.set(s, s, s)
      // apply rotation correction: if the GLB was exported lying on its side,
      // rotate it -90 degrees on X so it appears "derecho" (upright)
      model.rotation.set(-Math.PI / 2, 0, 0)
      // center the model geometry so its visual center sits at the pivot origin
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      model.position.sub(center)
      // small base lift so it sits visually centered in the hero (adjustable)
      const bobBase = 0
      model.position.y += bobBase
      pivot.add(model)
      scene.add(pivot)
      // replace model reference with pivot for animation targeting
      model = pivot
      cube.visible = false
    }, undefined, (err) => {
      console.warn('hero-model: failed to load GLB, using fallback', err)
      cube.visible = true
    })
    } catch (e) {
      console.warn('[hero-model] loader threw', e)
      cube.visible = true
    }
  } else {
    console.warn('hero-model: GLTFLoader not available; using fallback cube')
    cube.visible = true
  }

  camera.position.set(0, 0, 2.2)

  // simple bobbing animation + slow spin
  let t = 0
  // base vertical position for bobbing (keeps model visually centered)
  const bobBase = 0
  // slow spin speed (radians per second)
  // increased for a faster but still gentle rotation
  const spinSpeed = 0.5

  let lastTime = performance.now()
  function animate(time) {
    const dt = Math.min(0.05, (time - lastTime) / 1000)
    lastTime = time
    t += dt

    const target = model || cube
    if (target) {
      // keep centered (no orbit): smoothly return x/z to center
      target.position.x += (0 - target.position.x) * 0.18
      target.position.z += (0 - target.position.z) * 0.18
      // bobbing up/down for organic motion
      const bob = Math.sin(t * 1.2) * 0.05
      target.position.y += ((bobBase + bob) - target.position.y) * 0.12

      // apply slow continuous Y rotation (spin)
      target.rotation.y += spinSpeed * dt

      // keep model upright and stable: no tilt in X/Z
      target.rotation.x += (0 - target.rotation.x) * 0.2
      target.rotation.z += (0 - target.rotation.z) * 0.2
    }
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)

  // resize handling
  function onResize() {
    const w = container.clientWidth
    const h = container.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  window.addEventListener('resize', onResize)
  console.log('[hero-model] initialized')
}
