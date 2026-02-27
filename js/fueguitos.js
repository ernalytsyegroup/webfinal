// Animación de fueguitos para webinar.html
// Crea y anima fueguitos flotando en la pantalla


function crearFueguito(tipo = null) {
    const fueguito = document.createElement('div');
    fueguito.className = 'fueguito-animado';
    fueguito.style.left = Math.random() * 90 + '%';
    fueguito.style.animationDuration = (2 + Math.random() * 2) + 's';
    // Alternar entre fuego y dinero
    if (tipo === 'dinero') {
        fueguito.innerHTML = '💸';
        fueguito.classList.add('fueguito-dinero');
    } else {
        fueguito.innerHTML = '🔥';
    }
    document.body.appendChild(fueguito);
    setTimeout(() => fueguito.remove(), 4000);
}


function lanzarFueguitos(cantidad = 6) {
    for(let i=0; i<cantidad; i++) {
        // Alternar entre fuego y dinero
        const tipo = Math.random() < 0.5 ? 'fuego' : 'dinero';
        setTimeout(() => crearFueguito(tipo), i * 600);
    }
}

// Lanzar fueguitos al cargar y al hacer hover en el botón principal
window.addEventListener('DOMContentLoaded', () => {
    lanzarFueguitos();
    const btn = document.getElementById('abrir-modal-registro');
    if(btn) {
        btn.addEventListener('mouseenter', () => lanzarFueguitos(8));
    }
});
