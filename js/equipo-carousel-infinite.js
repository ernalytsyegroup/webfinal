const SELECTOR = '.revista-carousel'
let rafLoop = null
let slideSize = 0
let gapSize = 24
let originalCount = 0
let index = 0

function setupEquipoLoop() {
  const el = document.querySelector(SELECTOR)
  if (!el) return

  // Guardar solo los originales
  let originals = Array.from(el.querySelectorAll('img'));
  if (originals.length === 0) return;
  // Eliminar todos los hijos
  while (el.firstChild) el.removeChild(el.firstChild);
  // Insertar los originales
  originals.forEach(img => el.appendChild(img.cloneNode(true)));
  // Duplicar solo si el ancho total es menor que el contenedor (asegura bucle largo)
  let minClones = Math.ceil(window.innerWidth / (originals[0].offsetWidth + 36)) + 2;
  for (let i = 0; i < minClones; i++) {
    el.appendChild(originals[i % originals.length].cloneNode(true));
  }
  originalCount = originals.length;

  // Calcular slideSize y gap
  const first = el.querySelector('img');
  gapSize = 36;
  slideSize = first.offsetWidth + gapSize;

  // Reset
  index = 0;
  el.style.transition = 'none';
  el.style.transform = 'translateX(0px)';

  // Iniciar loop
  if (rafLoop) cancelAnimationFrame(rafLoop);
  startEquipoLoop(el);

  // Reset
  index = 0
  el.style.transition = 'none'
  el.style.transform = 'translateX(0px)'

  // Iniciar loop
  if (rafLoop) cancelAnimationFrame(rafLoop)
  startEquipoLoop(el)
}

function startEquipoLoop(el) {
  let progress = 0;
  const totalWidth = el.scrollWidth - window.innerWidth; // bucle completo
  const speed = slideSize / 2.2; // px por segundo
  let last = performance.now();

  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    progress += speed * dt;
    if (progress >= totalWidth) progress -= totalWidth;
    el.style.transition = 'none';
    el.style.transform = `translateX(-${Math.round(progress)}px)`;
    rafLoop = window.requestAnimationFrame(loop);
  }
  rafLoop = window.requestAnimationFrame(loop);
}

export function initEquipoCarouselInfinite() {
  const el = document.querySelector(SELECTOR)
  if (!el) return
  const imgs = el.querySelectorAll('img')
  let loaded = 0
  if (imgs.length === 0) { setupEquipoLoop(); return }
  imgs.forEach((img) => {
    if (img.complete) loaded++
    else img.addEventListener('load', () => { loaded++; if (loaded === imgs.length) setupEquipoLoop() })
  })
  if (loaded === imgs.length) setupEquipoLoop()
  window.addEventListener('resize', () => { if (el) setupEquipoLoop() })
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    try { initEquipoCarouselInfinite() } catch (e) { /* ignore */ }
  })
}
