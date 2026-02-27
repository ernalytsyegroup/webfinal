// webinar-modals.js
// Manejo escalable y limpio de modales para webinar.html

document.addEventListener('DOMContentLoaded', function() {
  // Utilidad para abrir/cerrar cualquier modal por id
  function openModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';
  }
  function closeModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
  }

  // Registro de botones que abren modales
  document.querySelectorAll('[data-modal-open]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal(btn.getAttribute('data-modal-open'));
    });
  });

  // Registro de overlays para cerrar modales al hacer clic fuera del contenido
  document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // Registro de botones de cierre
  document.querySelectorAll('[data-modal-close]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      closeModal(btn.getAttribute('data-modal-close'));
    });
  });

  // Manejar envío del formulario de registro
  var form = document.getElementById('form-registro');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      closeModal('modal-registro');
      openModal('modal-gracias');
    });
  }
});
