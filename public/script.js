const menuToggle = document.getElementById("menuToggle")
const navLinks = document.getElementById("navLinks")
const navbar = document.querySelector(".navbar")

function closeMenu() {
  if (!menuToggle || !navLinks) return

  menuToggle.classList.remove("active")
  menuToggle.setAttribute("aria-expanded", "false")
  menuToggle.setAttribute("aria-label", "Open navigation menu")
  navLinks.classList.remove("active")
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") !== "true"
    menuToggle.classList.toggle("active", isExpanded)
    navLinks.classList.toggle("active", isExpanded)
    menuToggle.setAttribute("aria-expanded", String(isExpanded))
    menuToggle.setAttribute("aria-label", isExpanded ? "Close navigation menu" : "Open navigation menu")
  })

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu()
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu()
      menuToggle.focus()
    }
  })

  document.addEventListener("click", (event) => {
    if (menuToggle.getAttribute("aria-expanded") === "true" && !event.target.closest(".navbar")) {
      closeMenu()
    }
  })

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu()
  })
}

if (navbar) {
  const updateNavbar = () => navbar.classList.toggle("scrolled", window.scrollY > 50)
  window.addEventListener("scroll", updateNavbar, { passive: true })
  updateNavbar()
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        currentObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" })

  document.querySelectorAll(".service-card, .portfolio-item, .blog-card, .testimonial-card").forEach((element) => {
    observer.observe(element)
  })
}

document.querySelectorAll(".current-year").forEach((element) => {
  element.textContent = new Date().getFullYear()
})

const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(contactForm)
    const name = String(formData.get("name") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const project = String(formData.get("project") || "").trim()
    const message = String(formData.get("message") || "").trim()
    const recipient = contactForm.dataset.recipient

    if (!name || !email || !message) {
      formMessage.textContent = "Please complete your name, email, and project message."
      formMessage.classList.add("error")
      return
    }

    if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
      formMessage.textContent = "The contact email is not configured. Please use the email address shown on this page."
      formMessage.classList.add("error")
      return
    }

    const subject = encodeURIComponent(`Project enquiry from ${name}`)
    const body = encodeURIComponent([
      `Name: ${name}`,
      `Email: ${email}`,
      project ? `Project type: ${project}` : "",
      "",
      message,
    ].filter(Boolean).join("\n"))

    formMessage.classList.remove("error")
    formMessage.textContent = "Opening your email app. Review and send the draft there; if it does not open, email us directly."
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`
  })
}
