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
    metaads: {
      title: "El ABC de Meta ADS",
      billing: "Curso completo",
      badge: null,
      description: "Aprende a realizar paso a paso tus campañas publicitarias con un blueprint claro y replicable.",
      icon: "🚀",
      features: [
        "Segmentación, creatividades y estructura",
        "Presupuestos y optimización diaria",
        "Pruebas A/B y escalado seguro",
        "Plantillas de reportes y flujos"
      ]
    },
    medicion: {
      title: "¡Medir para CONVERTIR!",
      billing: "Curso completo",
      badge: null,
      description: "Conoce y aprende cómo medir tus campañas para optimizar tus resultados y ROI.",
      icon: "📊",
      features: [
        "KPIs esenciales y modelos de atribución",
        "Tracking de eventos y etiquetado limpio",
        "Dashboards prácticos para clientes",
        "Casos reales de mejora de ROI"
      ]
    },
    reels: {
      title: "¡Reels y más REELS!",
      billing: "Curso completo",
      badge: null,
      description: "Edita como un PRO tus videos y lleva tus redes sociales a otro nivel con contenido que engancha.",
      icon: "🎥",
      features: [
        "Guiones cortos y hooks que retienen",
        "Grabación y edición ágil (mobile/desktop)",
        "Captions, música y ritmo optimizados",
        "Publicación, analítica y mejoras continuas"
      ]
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
