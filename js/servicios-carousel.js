
// Carrusel infinito automático para servicios (seamless, sin huecos)
const SELECTOR_SERV = '.servicios-carousel';
let rafLoopServ = null;
let slideSizeServ = 0;
let gapSizeServ = 36;
let originalCountServ = 0;
let indexServ = 0;

function setupServiciosLoop() {
  const el = document.querySelector(SELECTOR_SERV);
  if (!el) return;
  let originals = Array.from(el.querySelectorAll('img'));
  if (originals.length === 0) return;

  // Eliminar todos los hijos
  while (el.firstChild) el.removeChild(el.firstChild);
  // Insertar los originales
  originals.forEach(img => el.appendChild(img.cloneNode(true)));
  originalCountServ = originals.length;

  // Calcular slideSize y gap dinámicamente
  const first = el.querySelector('img');
  if (!first) return;
  // Obtener gap real de CSS
  const style = getComputedStyle(el);
  gapSizeServ = parseInt(style.gap || 36);
  slideSizeServ = first.offsetWidth + gapSizeServ;

  // Calcular cuántos clones se necesitan para llenar el área visible + buffer
  const visibleWidth = el.parentElement ? el.parentElement.offsetWidth : window.innerWidth;
  let minSlides = Math.ceil(visibleWidth / slideSizeServ) + 2; // +2 buffer
  let clonesNeeded = Math.max(minSlides, originalCountServ);

  // Clonar suficientes slides para llenar el área visible y permitir loop
  for (let i = 0; i < clonesNeeded; i++) {
    el.appendChild(originals[i % originalCountServ].cloneNode(true));
  }

  // Reset transform y estado
  indexServ = 0;
  el.style.transition = 'none';
  el.style.transform = 'translateX(0px)';

  // Iniciar loop
  if (rafLoopServ) cancelAnimationFrame(rafLoopServ);
  startServiciosLoop(el);
}

function startServiciosLoop(el) {
  let progress = 0;
  const totalWidth = originalCountServ * slideSizeServ;
  const speed = slideSizeServ / 1.5; // px por segundo
  let last = performance.now();

  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    progress += speed * dt;
    if (progress >= totalWidth) progress -= totalWidth;
    el.style.transition = 'none';
    el.style.transform = `translateX(-${Math.round(progress)}px)`;
    rafLoopServ = window.requestAnimationFrame(loop);
  }
  rafLoopServ = window.requestAnimationFrame(loop);
}

export function initServiciosCarousel() {
  const el = document.querySelector(SELECTOR_SERV);
  if (!el) return;
  const imgs = el.querySelectorAll('img');
  let loaded = 0;
  if (imgs.length === 0) { setupServiciosLoop(); return; }
  imgs.forEach((img) => {
    if (img.complete) loaded++;
    else img.addEventListener('load', () => { loaded++; if (loaded === imgs.length) setupServiciosLoop(); });
  });
  if (loaded === imgs.length) setupServiciosLoop();
  window.addEventListener('resize', () => { if (el) setupServiciosLoop(); });
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    try { initServiciosCarousel(); } catch (e) { /* ignore */ }
  });
}