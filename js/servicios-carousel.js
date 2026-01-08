
// Carrusel infinito automático para servicios - Matching Hero Carousel Style
const SELECTOR_SERV = '#carruselTrack';
let rafLoopServ = null;
let slideSizeServ = 0;
let gapSizeServ = 28;
let originalCountServ = 0;
let progressServ = 0;

function updateActiveSlide(track) {
  const slides = Array.from(track.querySelectorAll('img'));
  if (slides.length === 0) return;

  const containerRect = track.parentElement.getBoundingClientRect();
  const centerX = containerRect.left + containerRect.width / 2;

  let closestSlide = null;
  let minDistance = Infinity;

  slides.forEach(slide => {
    const rect = slide.getBoundingClientRect();
    const slideCenter = rect.left + rect.width / 2;
    const distance = Math.abs(slideCenter - centerX);

    if (distance < minDistance) {
      minDistance = distance;
      closestSlide = slide;
    }
  });

  slides.forEach(slide => slide.classList.remove('active'));
  if (closestSlide) {
    closestSlide.classList.add('active');
  }
}

function setupServiciosLoop() {
  const track = document.querySelector(SELECTOR_SERV);
  if (!track) return;

  const originals = Array.from(track.querySelectorAll('img'));
  if (originals.length === 0) return;

  // Store original count
  originalCountServ = originals.length / 2; // Dividido por 2 porque ya están duplicados en el HTML

  // Get computed gap
  const parent = track.parentElement;
  const style = getComputedStyle(track);
  gapSizeServ = parseInt(style.gap || 28);

  // Calculate slide size
  const first = originals[0];
  if (!first) return;
  slideSizeServ = first.offsetWidth + gapSizeServ;

  // Reset progress
  progressServ = 0;
  track.style.transform = 'translateX(0px)';

  // Set initial active slide
  updateActiveSlide(track);

  // Start loop
  if (rafLoopServ) cancelAnimationFrame(rafLoopServ);
  startServiciosLoop(track);
}

function startServiciosLoop(track) {
  const speed = 1.8; // px per frame - matching hero carousel speed
  const totalWidth = originalCountServ * slideSizeServ;
  let lastUpdate = 0;

  function loop(now) {
    progressServ -= speed;

    // Reset when we've scrolled through half the images (seamless loop)
    if (Math.abs(progressServ) >= totalWidth) {
      progressServ = 0;
    }

    track.style.transform = `translateX(${progressServ}px)`;

    // Update active slide every 100ms to avoid too many calculations
    if (now - lastUpdate > 100) {
      updateActiveSlide(track);
      lastUpdate = now;
    }

    rafLoopServ = requestAnimationFrame(loop);
  }

  rafLoopServ = requestAnimationFrame(loop);
}

export function initServiciosCarousel() {
  const track = document.querySelector(SELECTOR_SERV);
  if (!track) return;

  const imgs = track.querySelectorAll('img');
  let loaded = 0;

  if (imgs.length === 0) {
    setupServiciosLoop();
    return;
  }

  imgs.forEach((img) => {
    if (img.complete) {
      loaded++;
    } else {
      img.addEventListener('load', () => {
        loaded++;
        if (loaded === imgs.length) {
          setupServiciosLoop();
        }
      });
    }
  });

  if (loaded === imgs.length) {
    setupServiciosLoop();
  }

  // Reinitialize on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (track) setupServiciosLoop();
    }, 250);
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    try {
      initServiciosCarousel();
    } catch (e) {
      console.error('Error initializing servicios carousel:', e);
    }
  });
}
