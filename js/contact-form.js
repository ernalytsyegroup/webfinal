// Formulario de contacto a WhatsApp
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  
  if (contactForm) {
    console.log("Formulario de contacto encontrado")
    
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault()
      console.log("Formulario enviado")
      
      // Capturar valores del formulario
      const nombre = document.getElementById("fullname").value.trim()
      const pais = document.getElementById("country").value.trim()
      const empresa = document.getElementById("company").value.trim()
      const instagram = document.getElementById("instagram").value.trim()
      
      console.log("Datos capturados:", { nombre, pais, empresa, instagram })
      
      // Validar que todos los campos estén llenos
      if (!nombre || !pais || !empresa || !instagram) {
        alert("Por favor, completa todos los campos del formulario.")
        return
      }
      
        // Crear mensaje formateado para WhatsApp
        const mensaje = 
          `Hola! Quiero contactar contigo.\n\n` +
          `Nombre completo: ${nombre}\n` +
          `Pais: ${pais}\n` +
          `Empresa: ${empresa}\n` +
          `Instagram: ${instagram}`
      
      // Codificar el mensaje para URL
      const mensajeCodificado = encodeURIComponent(mensaje)
      
      // Número de WhatsApp (formato internacional sin + ni espacios)
      const numero = "584145364028"
      
      // Crear URL de WhatsApp
      const url = `https://wa.me/${numero}?text=${mensajeCodificado}`
      
      console.log("URL de WhatsApp:", url)
      
      // Abrir WhatsApp en nueva pestaña
      window.open(url, "_blank")
      
      // Limpiar el formulario después de enviar
      contactForm.reset()
      
      // Mostrar mensaje de confirmación
      setTimeout(() => {
        alert("¡Redirigiendo a WhatsApp! Si no se abre automáticamente, verifica que tengas WhatsApp instalado.")
      }, 500)
    })
  } else {
    console.error("No se encontró el formulario de contacto")
  }
})
