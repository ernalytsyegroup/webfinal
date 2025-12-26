// Courses Modal
export function initCoursesModal() {
  const modal = document.getElementById("courseModal")
  const modalClose = document.getElementById("courseModalClose")
  const courseTitle = document.getElementById("courseTitle")
  const courseDescription = document.getElementById("courseDescription")
  const courseFeatures = document.getElementById("courseFeatures")
  const courseIcon = document.getElementById("courseIcon")
  const modalCta = document.getElementById("courseModalCta")

  const courses = {
    marketing: {
      title: "Marketing Digital Avanzado",
      billing: "Curso completo",
      badge: "Popular",
      description: "Domina las estrategias más efectivas del marketing digital y aprende a crear campañas exitosas que generen resultados reales.",
      icon: "📈",
      features: [
        "8 semanas de contenido intensivo",
        "Material descargable y plantillas",
        "Acceso a comunidad privada",
        "Certificado de finalización"
      ],
      price: "$99",
      priceNote: "pago único"
    },
    diseno3d: {
      title: "Diseño 3D para Principiantes",
      billing: "Curso completo",
      badge: null,
      description: "Aprende a crear modelos 3D desde cero usando Blender y técnicas profesionales utilizadas en la industria.",
      icon: "🛠️",
      features: [
        "10 semanas de formación práctica",
        "Proyectos reales paso a paso",
        "Soporte docente personalizado",
        "Biblioteca de recursos 3D"
      ],
      price: "$149",
      priceNote: "pago único"
    },
    fotografia: {
      title: "Fotografía Profesional",
      billing: "Curso completo",
      badge: null,
      description: "Conviértete en un fotógrafo profesional dominando técnicas de iluminación, composición y edición avanzada.",
      icon: "📸",
      features: [
        "6 semanas de teoría y práctica",
        "Workshop presencial incluido",
        "Técnicas de retoque profesional",
        "Acceso a presets premium"
      ],
      price: "$129",
      priceNote: "pago único"
    },
    video: {
      title: "Edición de Video Profesional",
      billing: "Curso completo",
      badge: null,
      description: "Aprende a editar videos como un profesional usando las mejores herramientas y técnicas del mercado.",
      icon: "🎬",
      features: [
        "7 semanas de contenido práctico",
        "Plantillas y LUTs profesionales",
        "Revisión personalizada de proyectos",
        "Certificado profesional"
      ],
      price: "$119",
      priceNote: "pago único"
    },
    branding: {
      title: "Branding & Identidad Visual",
      billing: "Curso completo",
      badge: "Nuevo",
      description: "Crea identidades de marca memorables y coherentes que conecten emocionalmente con tu audiencia objetivo.",
      icon: "✨",
      features: [
        "5 semanas de formación intensiva",
        "Plantillas de entrega profesionales",
        "Guía de estilo completa",
        "Sesiones de feedback en vivo"
      ],
      price: "$89",
      priceNote: "pago único"
    },
    web: {
      title: "Diseño Web Moderno",
      billing: "Curso completo",
      badge: null,
      description: "Aprende a crear sitios web modernos, responsivos y optimizados para conversión usando las últimas tecnologías.",
      icon: "💻",
      features: [
        "9 semanas de desarrollo web",
        "Proyectos reales del mercado",
        "Optimización SEO incluida",
        "Guía de deployment completa"
      ],
      price: "$139",
      priceNote: "pago único"
    },
  }

  document.querySelectorAll(".course-full-card").forEach((card) => {
    const btn = card.querySelector(".course-detail-btn")
    const key = card.getAttribute("data-course")

    if (!btn) return

    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const course = courses[key]
      if (!course) return

      // Build the new clean modal structure (same as services)
      const modalContent = `
        <div class="service-modal-header-custom">
          <div class="service-detail-icon">${course.icon}</div>
          <div class="service-modal-title-section">
            <h2>${course.title}</h2>
            <p class="service-billing-modal">${course.billing}</p>
            ${course.badge ? `<span class="service-badge-modal">${course.badge}</span>` : ''}
          </div>
        </div>

        <p class="service-detail-description">${course.description}</p>

        <div class="service-detail-features">
          <h3>Incluye</h3>
          <ul>
            ${course.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <div class="service-price-modal-section">
          <div class="service-price-modal">${course.price}</div>
          <div class="service-price-note-modal">${course.priceNote}</div>
        </div>

        <div class="service-detail-cta">
          <button class="modal-cta" id="courseModalCtaBtn">Inscribirme Ahora</button>
        </div>
      `

      // Find the course-detail-content container and update it
      const contentContainer = document.querySelector('#courseModal .course-detail-content, #courseModal .service-detail-content')
      if (contentContainer) {
        contentContainer.innerHTML = modalContent
        
        // Re-attach the CTA button event
        const ctaBtn = document.getElementById('courseModalCtaBtn')
        if (ctaBtn) {
          ctaBtn.onclick = () => {
            console.log("Inscripción solicitada para:", course.title)
            alert(`Inscripción solicitada para: ${course.title}`)
            modal.classList.remove("active")
          }
        }
      }

      modal.classList.add("active")
    })
  })

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("active")
    })
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })
}
