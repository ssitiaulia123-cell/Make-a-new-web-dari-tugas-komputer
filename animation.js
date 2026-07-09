const Motion = (() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initLoader() {
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("hidden"), 450);
    });
  }

  function initReveal() {
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  function initCounter() {
    const counters = document.querySelectorAll("[data-counter]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = Number(el.dataset.counter);
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 75));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current.toLocaleString("id-ID");
          }, 18);
          observer.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function initSlider() {
    const slides = [...document.querySelectorAll(".testimonial")];
    const dotsWrap = document.getElementById("sliderDots");
    if (!slides.length || !dotsWrap) return;
    let activeIndex = 0;

    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Testimoni ${index + 1}`);
      dot.addEventListener("click", () => showSlide(index));
      dotsWrap.appendChild(dot);
      return dot;
    });

    function showSlide(index) {
      slides[activeIndex].classList.remove("active");
      dots[activeIndex].classList.remove("active");
      activeIndex = index;
      slides[activeIndex].classList.add("active");
      dots[activeIndex].classList.add("active");
    }

    showSlide(0);
    setInterval(() => showSlide((activeIndex + 1) % slides.length), 5200);
  }

  function initTyping() {
    const target = document.getElementById("typingText");
    if (!target || prefersReduced) return;
    const text = target.textContent;
    target.textContent = "";
    let index = 0;
    const timer = setInterval(() => {
      target.textContent += text[index];
      index += 1;
      if (index >= text.length) clearInterval(timer);
    }, 72);
  }

  function initRipple() {
    document.querySelectorAll(".ripple").forEach((button) => {
      button.addEventListener("click", (event) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
        button.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
        button.classList.remove("clicked");
        void button.offsetWidth;
        button.classList.add("clicked");
      });
    });
  }

  function initMouseMotion() {
    const glow = document.getElementById("cursorGlow");
    const heroBg = document.querySelector("[data-parallax]");
    const floatingItems = document.querySelectorAll("[data-move]");
    if (prefersReduced) return;

    window.addEventListener("mousemove", (event) => {
      const x = event.clientX;
      const y = event.clientY;
      glow.style.transform = `translate(${x - 130}px, ${y - 130}px)`;

      const moveX = (x / window.innerWidth - 0.5) * 18;
      const moveY = (y / window.innerHeight - 0.5) * 18;
      if (heroBg) heroBg.style.transform = `translate3d(${moveX * -0.45}px, ${moveY * -0.45}px, 0) scale(1.04)`;
      floatingItems.forEach((item, index) => {
        item.style.transform = `translate(${moveX * (index + 1) * 0.35}px, ${moveY * (index + 1) * 0.35}px)`;
      });
    });
  }

  function initTilt() {
    if (prefersReduced) return;
    document.querySelectorAll(".team-card").forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -8;
        const rotateY = ((x / rect.width) - 0.5) * 8;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  function init() {
    initLoader();
    initReveal();
    initCounter();
    initSlider();
    initTyping();
    initRipple();
    initMouseMotion();
    initTilt();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", Motion.init);
