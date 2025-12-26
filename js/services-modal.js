// Services Modal
export function initServicesModal() {
  const modal = document.getElementById("serviceModal")
  const modalClose = document.getElementById("serviceModalClose")
  const serviceTitle = document.getElementById("serviceTitle")
  const serviceDescription = document.getElementById("serviceDescription")
  const serviceFeatures = document.getElementById("serviceFeatures")
  const serviceIcon = document.getElementById("serviceIcon")
  const modalCta = document.getElementById("serviceModalCta")

  const services = {
    marketing: {
      title: "Gestión de Redes Sociales",
      billing: "Facturado mensualmente",
      badge: "Popular",
      description: "Estrategias multicanal para potenciar tu marca en el mundo digital con contenido de calidad y engagement real.",
      icon: "🎯",
      features: [
        "Estrategia de contenido personalizada",
        "Publicaciones diarias programadas",
        "Análisis de métricas y reportes",
        "Gestión de comunidad"
      ],
      price: "$299",
      priceNote: "por mes"
    },
    design: {
      title: "Campañas de Meta ADS",
      billing: "Facturado mensualmente",
      badge: "Destacado",
      description: "Campañas publicitarias efectivas en Facebook e Instagram con segmentación avanzada y optimización continua.",
      icon: "🎨",
      features: [
        "Diseño de anuncios creativos",
        "Segmentación de audiencia avanzada",
        "Optimización de campañas",
        "Reportes de rendimiento semanales"
      ],
      price: "$399",
      priceNote: "por mes"
    },
    photography: {
      title: "Branding",
      billing: "Pago único",
      badge: null,
      description: "Construimos identidades de marca memorables y coherentes que conectan emocionalmente con tu audiencia.",
      icon: "📸",
      features: [
        "Identidad visual completa",
        "Manual de marca",
        "Logo y variaciones",
        "Paleta de colores y tipografías"
      ],
      price: "$899",
      priceNote: "pago único"
    },
    video: {
      title: "Asesorías Personalizadas",
      billing: "Por sesión",
      badge: null,
      description: "Sesiones individuales de consultoría para optimizar tu estrategia digital y resolver desafíos específicos.",
      icon: "🎬",
      features: [
        "Sesión 1:1 de 60 minutos",
        "Análisis de tu estrategia actual",
        "Plan de acción personalizado",
        "Seguimiento por email"
      ],
      price: "$149",
      priceNote: "por sesión"
    },
    "3d": {
      title: "Diseño Gráfico",
      billing: "Facturado mensualmente",
      badge: null,
      description: "Diseños ilimitados para todas tus necesidades de comunicación visual con revisiones sin límite.",
      icon: "🎮",
      features: [
        "Diseños ilimitados",
        "Revisiones sin límite",
        "Entrega en 24-48 horas",
        "Archivos fuente incluidos"
      ],
      price: "$499",
      priceNote: "por mes"
    },
    branding: {
      title: "Edición de Videos",
      billing: "Por proyecto",
      badge: "Nuevo",
      description: "Edición profesional de videos para redes sociales, YouTube y campañas publicitarias.",
      icon: "✨",
      features: [
        "Edición profesional",
        "Corrección de color",
        "Efectos y transiciones",
        "Música y subtítulos"
      ],
      price: "$199",
      priceNote: "por video"
    },
    web: {
      title: "Email Marketing",
      billing: "Facturado mensualmente",
      badge: null,
      description: "Campañas de email marketing automatizadas que convierten suscriptores en clientes.",
      icon: "💻",
      features: [
        "Diseño de campañas de email",
        "Automatizaciones personalizadas",
        "Segmentación de listas",
        "Análisis de resultados"
      ],
      price: "$249",
      priceNote: "por mes"
    },
    consulting: {
      title: "Desarrollo Web",
      billing: "Por proyecto",
      badge: null,
      description: "Sitios web modernos, rápidos y optimizados para conversión con diseño responsive.",
      icon: "💡",
      features: [
        "Diseño web responsive",
        "Desarrollo a medida",
        "Optimización SEO",
        "Hosting y dominio incluido"
      ],
      price: "$1,499",
      priceNote: "pago único"
    },
  }

  // Support both compact cards and full-page service cards
  document.querySelectorAll(".service-card, .service-full-card").forEach((card) => {
    const btn = card.querySelector(".service-detail-btn")
    const key = card.getAttribute("data-service")

    if (!btn) return

    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const svc = services[key]
      if (!svc) return

      // Build the new clean modal structure
      const modalContent = `
        <div class="service-modal-header-custom">
          <div class="service-detail-icon">${svc.icon}</div>
          <div class="service-modal-title-section">
            <h2>${svc.title}</h2>
            <p class="service-billing-modal">${svc.billing}</p>
            ${svc.badge ? `<span class="service-badge-modal">${svc.badge}</span>` : ''}
          </div>
        </div>

        <p class="service-detail-description">${svc.description}</p>

        <div class="service-detail-features">
          <h3>Incluye</h3>
          <ul>
            ${svc.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <div class="service-price-modal-section">
          <div class="service-price-modal">${svc.price}</div>
          <div class="service-price-note-modal">${svc.priceNote}</div>
        </div>

        <div class="service-detail-cta">
          <button class="modal-cta" id="serviceModalCtaBtn">Solicitar Servicio</button>
        </div>
      `

      // Find the service-detail-content container and update it
      const contentContainer = document.querySelector('.service-detail-content')
      if (contentContainer) {
        contentContainer.innerHTML = modalContent
        
        // Re-attach the CTA button event
        const ctaBtn = document.getElementById('serviceModalCtaBtn')
        if (ctaBtn) {
          ctaBtn.onclick = () => {
            console.log("Requesting service:", svc.title)
            alert(`Solicitud enviada para: ${svc.title}`)
            modal.classList.remove("active")
          }
        }
      }

      if (modal) modal.classList.add("active")
    })
  })

  if (modalClose && modal) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("active")
    })
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active")
      }
    })
  }
}
