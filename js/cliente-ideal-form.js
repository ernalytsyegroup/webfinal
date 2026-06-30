document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.contact-form[action="../enviar.php"][method="POST"]');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: fd,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (res.ok) {
        const json = await res.json().catch(() => null);
        // mostrar popup de confirmación
        alert('Formulario registrado, revisa el correo que nos indicaste');
        form.reset();
      } else {
        const txt = await res.text();
        console.error('Error response:', res.status, txt);
        alert('Ocurrió un error al enviar el formulario. Intenta otra vez.');
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo conectar con el servidor. Verifica tu conexión.');
    }
  });
});