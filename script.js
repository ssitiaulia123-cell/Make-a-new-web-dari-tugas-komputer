const App = (() => {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const navPanel = document.getElementById("navPanel");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const backToTop = document.getElementById("backToTop");

  function onScroll() {
    const isScrolled = window.scrollY > 40;
    header.classList.toggle("scrolled", isScrolled);
    backToTop.classList.toggle("show", window.scrollY > 550);
  }

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    navPanel.classList.toggle("active", open);
    menuToggle.classList.toggle("active", open);
    mobileOverlay.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  }

  function initMenu() {
    menuToggle.addEventListener("click", () => {
      setMenu(!navPanel.classList.contains("active"));
    });

    mobileOverlay.addEventListener("click", () => setMenu(false));

    navPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
  }

  function initFaq() {
    document.querySelectorAll(".faq-item button").forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.parentElement;
        const isActive = item.classList.contains("active");
        document.querySelectorAll(".faq-item").forEach((faq) => {
          faq.classList.remove("active");
          faq.querySelector("span").textContent = "+";
        });

        if (!isActive) {
          item.classList.add("active");
          button.querySelector("span").textContent = "−";
        }
      });
    });
  }

  function initForm() {
    const form = document.getElementById("consultForm");
    const message = document.getElementById("formMessage");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fields = [...form.querySelectorAll("input, select, textarea")];
      let isValid = true;

      fields.forEach((field) => {
        const validEmail = field.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        const validPhone = field.type !== "tel" || /^[0-9+\-\s]{9,16}$/.test(field.value.trim());
        const valid = field.value.trim() && validEmail && validPhone;
        field.classList.toggle("error", !valid);
        if (!valid) isValid = false;
      });

      message.className = `form-message ${isValid ? "success" : "danger"}`;
      message.textContent = isValid
        ? "Terima kasih. Data konsultasi sudah tervalidasi dan siap dikirim."
        : "Mohon lengkapi data dengan format email dan nomor HP yang benar.";

      if (isValid) form.reset();
    });
  }

  function initBackToTop() {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function init() {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    initMenu();
    initFaq();
    initForm();
    initBackToTop();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", App.init);
