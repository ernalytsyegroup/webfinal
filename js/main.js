import { init3DScene } from "./3d-scene.js"
import { initHeroModel } from "./hero-model.js"
import { initNavigation } from "./navigation.js"
import { initCarousels } from "./carousels.js"
import { initModal } from "./modal.js"
import { initScrollAnimations } from "./scroll-animations.js"
import { initAbout3D } from "./about-3d.js"
import { initHomepage3D } from "./homepage-3d.js"
import { initCustomCursor } from "./custom-cursor.js"

// Initialize all modules when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  try {
    initCustomCursor()
    initScrollAnimations()
    initNavigation()
    initCarousels()
    initModal()
    init3DScene()
    initHeroModel()
    initAbout3D()
    initHomepage3D()

    // Formulario contacto a WhatsApp
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", function(e) {
        e.preventDefault()
        
        // Capturar valores del formulario
        const nombre = document.getElementById("fullname").value.trim()
        const pais = document.getElementById("country").value.trim()
        const empresa = document.getElementById("company").value.trim()
        const instagram = document.getElementById("instagram").value.trim()
        
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
        
        // Abrir WhatsApp en nueva pestaña
        window.open(url, "_blank")
        
        // Limpiar el formulario después de enviar
        contactForm.reset()
        
        // Mostrar mensaje de confirmación
        setTimeout(() => {
          alert("¡Redirigiendo a WhatsApp! Si no se abre automáticamente, verifica que tengas WhatsApp instalado.")
        }, 500)
      })
    }
  } catch (error) {
    console.error("[v0] Error durante la inicialización de la app:", error)
  }
})
