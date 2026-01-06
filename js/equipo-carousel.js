// Carrusel manual para la sección de equipo

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.revista-carousel');
    const items = document.querySelectorAll('.revista-carousel-item');
    const prevBtn = document.querySelector('.revista-carousel-prev');
    const nextBtn = document.querySelector('.revista-carousel-next');
    let currentIndex = 0;
    const total = items.length;
    const visibleCount = 3; // Mostrar 3 elementos a la vez

    function updateCarousel() {
        items.forEach((item, idx) => {
            if (idx >= currentIndex && idx < currentIndex + visibleCount) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex - visibleCount;
        if (currentIndex < 0) {
            currentIndex = Math.max(0, total - visibleCount);
        }
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex + visibleCount;
        if (currentIndex > total - visibleCount) {
            currentIndex = 0;
        }
        updateCarousel();
    });

    updateCarousel();
});