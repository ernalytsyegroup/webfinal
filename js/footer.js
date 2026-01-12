/**
 * Footer Loader Script
 * Incluye dinámicamente el footer.html en todas las páginas del sitio,
 * sin importar la profundidad de la carpeta.
 *
 * Autor: Big Leap Marketing
 */

window.addEventListener('DOMContentLoaded', () => {
  // Calcula la ruta relativa a footer.html según la profundidad de la URL
  const currentPath = window.location.pathname;
  const depth = currentPath.split('/').filter(Boolean).length - 1; // -1 porque el último es el archivo
  const footerPath = `${'../'.repeat(depth)}footer.html`;

  fetch(footerPath)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then(html => {
      // Extrae solo el <footer> del HTML cargado
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const footer = tempDiv.querySelector('footer');
      if (footer) {
        document.body.appendChild(footer);
        initScrollingText();
      }
    })
    .catch(error => {
      console.error('Error loading footer:', error);
      console.log('Attempted to load from:', footerPath);
    });
});

/**
 * Inicializa la animación de texto deslizante en el footer
 */
function initScrollingText() {
  const scrollingText = document.querySelector('.scrolling-text');
  if (!scrollingText) return;
  // Duplica el contenido para un bucle continuo
  const content = scrollingText.innerHTML;
  scrollingText.innerHTML = content + content;
  // Pausa la animación al pasar el mouse
  scrollingText.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
  });
  scrollingText.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
  });
}
