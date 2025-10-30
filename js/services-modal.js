// Services Modal
export function initServicesModal() {
  const modal = document.getElementById("serviceModal")
  const modalClose = document.getElementById("modalClose")
  const serviceTitle = document.getElementById("serviceTitle")
  const serviceDescription = document.getElementById("serviceDescription")
  const serviceFeatures = document.getElementById("serviceFeatures")
  const serviceIcon = document.getElementById("serviceIcon")

  const services = {
    marketing: {
      title: "Marketing Digital",
      description: "Estrategias multicanal, campañas y optimización de conversiones",
      icon: "🎯",
      features: ["Auditoría", "Estrategia de contenido", "Ads & Remarketing"],
    },
    design: {
      title: "Diseño Creativo",
      description: "Branding, diseño gráfico y dirección de arte",
      icon: "🎨",
      features: ["Branding", "Identidad visual", "Materiales de marca"],
    },
    photography: {
      title: "Fotografía Profesional",
      description: "Sesiones en estudio y on-location para marcas y eventos",
      icon: "📸",
      features: ["Fotografía de producto", "Cobertura de eventos", "Retoque profesional"],
    },
    video: {
      title: "Video & Animación",
      description: "Producción audiovisual y motion graphics",
      icon: "🎬",
      features: ["Producción", "Edición", "Animación 2D/3D"],
    },
    "3d": {
      title: "Diseño 3D",
      description: "Modelado, texturizado y visualización",
      icon: "🎮",
      features: ["Modelado", "Texturizado", "Render & Post"],
    },
    branding: {
      title: "Branding",
      description: "Construimos identidades memorables",
      icon: "✨",
      features: ["Arquitectura de marca", "Manual de marca", "Naming"],
    },
    web: {
      title: "Desarrollo Web",
      description: "Sitios web modernos y optimizados",
      icon: "💻",
      features: ["Frontend", "Backend", "Performance"],
    },
    consulting: {
      title: "Consultoría",
      description: "Asesoría estratégica para crecimiento digital",
      icon: "💡",
      features: ["Estrategia", "Workshops", "Roadmaps"],
    },
  }

  document.querySelectorAll(".service-full-card").forEach((card) => {
    const btn = card.querySelector(".service-detail-btn")
    const key = card.getAttribute("data-service")
    btn.addEventListener("click", () => {
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
      modal.classList.add("active")
    })
  })

  if (modalClose) modalClose.addEventListener("click", () => modal.classList.remove("active"))
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active")
  })

}
