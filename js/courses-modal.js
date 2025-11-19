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
      description: "Domina las estrategias más efectivas del marketing digital y aprende a crear campañas exitosas.",
      icon: "📈",
      features: ["8 semanas", "Material descargable", "Acceso a comunidad privada", "Certificado"],
    },
    diseno3d: {
      title: "Diseño 3D para Principiantes",
      description: "Aprende a crear modelos 3D desde cero usando Blender y técnicas profesionales.",
      icon: "🛠️",
      features: ["10 semanas", "Proyectos prácticos", "Soporte docente", "Recursos 3D"],
    },
    fotografia: {
      title: "Fotografía Profesional",
      description: "Conviértete en un fotógrafo profesional dominando técnicas de iluminación y composición.",
      icon: "📸",
      features: ["6 semanas", "Workshop práctico", "Retoque incluido", "Acceso a presets"],
    },
    video: {
      title: "Edición de Video Profesional",
      description: "Aprende a editar videos como un profesional usando las mejores herramientas del mercado.",
      icon: "🎬",
      features: ["7 semanas", "Plantillas y LUTs", "Revisión de proyectos", "Certificado"],
    },
    branding: {
      title: "Branding & Identidad Visual",
      description: "Crea identidades de marca memorables y coherentes que conecten con tu audiencia.",
      icon: "✨",
      features: ["5 semanas", "Plantillas de entrega", "Guía de estilo", "Feedback en vivo"],
    },
    web: {
      title: "Diseño Web Moderno",
      description: "Aprende a crear sitios web modernos, responsivos y optimizados para conversión.",
      icon: "💻",
      features: ["9 semanas", "Proyectos reales", "Optimización SEO básica", "Deploy guidance"],
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

      courseTitle.textContent = course.title
      courseDescription.textContent = course.description
      courseIcon.textContent = course.icon
      courseFeatures.innerHTML = ""

      course.features.forEach((f) => {
        const li = document.createElement("li")
        li.textContent = f
        courseFeatures.appendChild(li)
      })

      modalCta.onclick = () => {
        console.log("[v0] Inscripción solicitada para:", course.title)
        alert(`Inscripción solicitada para: ${course.title}`)
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
