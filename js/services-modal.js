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
      title: "Marketing Digital",
      description: "Estrategias multicanal para potenciar tu marca en el mundo digital",
      icon: "🎯",
      features: ["Auditoría digital", "Estrategia de contenido", "Ads & Remarketing", "Análisis de métricas"],
    },
    design: {
      title: "Diseño Creativo",
      description: "Branding, diseño gráfico y dirección de arte de clase mundial",
      icon: "🎨",
      features: ["Branding", "Identidad visual", "Materiales de marca", "Solicitar cotización"],
    },
    photography: {
      title: "Fotografía Profesional",
      description: "Sesiones en estudio y on-location para marcas y eventos",
      icon: "📸",
      features: ["Fotografía de producto", "Cobertura de eventos", "Retoque profesional", "Álbumes digitales"],
    },
    video: {
      title: "Video & Animación",
      description: "Producción audiovisual y motion graphics de alto impacto",
      icon: "🎬",
      features: ["Producción", "Edición profesional", "Animación 2D/3D", "Post-producción"],
    },
  }

  document.querySelectorAll(".service-card").forEach((card) => {
    const btn = card.querySelector(".service-detail-btn")
    const key = card.getAttribute("data-service")

    if (!btn) return

    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const svc = services[key]
      if (!svc) return

      serviceTitle.textContent = svc.title
      serviceDescription.textContent = svc.description
      serviceIcon.textContent = svc.icon
      serviceFeatures.innerHTML = ""

      svc.features.forEach((f) => {
        const li = document.createElement("li")
        li.textContent = f
        serviceFeatures.appendChild(li)
      })

      modalCta.onclick = () => {
        console.log("[v0] Requesting quote for:", svc.title)
        alert(`Solicitud enviada para: ${svc.title}`)
        modal.classList.remove("active")
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
