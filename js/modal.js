// Modal Module
export function initModal() {
  const modal = document.getElementById("resourceModal")
  const modalClose = document.getElementById("modalClose")
  const modalTitle = document.getElementById("modalTitle")
  const modalDescription = document.getElementById("modalDescription")
  const modalDownload = document.getElementById("modalDownload")
  const resourceButtons = document.querySelectorAll(".resource-btn")

  const resources = {
    "marketing-guide": {
      title: "Guía de Marketing Digital",
      description:
        "Una guía completa con las mejores estrategias de marketing digital para hacer crecer tu negocio en 2025.",
      file: "marketing-guide.pdf",
    },
    "design-templates": {
      title: "Templates de Diseño",
      description: "Colección de plantillas profesionales para tus proyectos de diseño, listas para personalizar.",
      file: "design-templates.zip",
    },
    "seo-checklist": {
      title: "Checklist SEO",
      description:
        "Lista completa de verificación para optimizar tu sitio web y mejorar tu posicionamiento en buscadores.",
      file: "seo-checklist.pdf",
    },
  }

  resourceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const resourceId = button.getAttribute("data-resource")
      const resource = resources[resourceId]

      if (resource) {
        modalTitle.textContent = resource.title
        modalDescription.textContent = resource.description
        modalDownload.onclick = () => {
          console.log("[v0] Downloading:", resource.file)
          alert(`Descargando: ${resource.file}`)
          modal.classList.remove("active")
        }
        modal.classList.add("active")
      }
    })
  })

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("active")
    })
  }

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })

  console.log("[v0] Modal initialized")
}
