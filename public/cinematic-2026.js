/* LUDHIM 2026 — lightweight cinematic motion and accessible service selector.
 * No canvas, WebGL, tracking or external dependencies.
 */
(() => {
  const showcase = document.querySelector("[data-reel-showcase]");
  const visual = showcase?.querySelector("[data-reel-visual]");
  const title = showcase?.querySelector("[data-reel-title]");
  const description = showcase?.querySelector("[data-reel-description]");
  const cta = showcase?.querySelector("[data-reel-link]");
  const choices = [...(showcase?.querySelectorAll("[data-reel-choice]") || [])];

  const services = {
    express: {
      title: "QUAND CHAQUE MINUTE COMPTE.",
      description: "Un besoin urgent, une prise en charge réactive, une mission organisée directement vers sa destination.",
      cta: "DEMANDER UN EXPRESS",
      value: "Transport express",
      word: "EXPRESS",
    },
    dedie: {
      title: "VOTRE TRAJET. VOTRE PRIORITÉ.",
      description: "Un véhicule affecté à votre marchandise, sans groupage, avec des horaires et des consignes adaptés.",
      cta: "ORGANISER UNE COURSE DÉDIÉE",
      value: "Course dédiée",
      word: "DÉDIÉ",
    },
    suivi: {
      title: "LA PREUVE À CHAQUE ÉTAPE.",
      description: "Avancement de mission, signatures, photos et e-CMR : les informations utiles suivent votre transport.",
      cta: "PARLER DE VOTRE BESOIN",
      value: "Autre besoin",
      word: "e-CMR",
    },
  };

  const updateShowcase = (name) => {
    const service = services[name];
    if (!service || !showcase || !title || !description || !cta || !visual) return;
    visual.dataset.mode = name;
    title.textContent = service.title;
    description.textContent = service.description;
    cta.dataset.serviceChoice = service.value;
    cta.innerHTML = "";
    cta.append(document.createTextNode(service.cta + " "));
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    cta.append(arrow);
    const backdrop = showcase.querySelector(".reel-showcase-giant");
    if (backdrop) backdrop.textContent = service.word;
    choices.forEach((button) => {
      const selected = button.dataset.reelChoice === name;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };
  for (const button of choices) {
    button.addEventListener("click", () => updateShowcase(button.dataset.reelChoice));
  }
  updateShowcase("express");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const hero = document.querySelector("[data-cinematic-hero]");
  const van = document.querySelector("[data-cinematic-vehicle]");
  const bannerPhoto = document.querySelector(".reel-interlude-photo");
  if (!hero) return;

  // The page is fully legible without JS; only opt into entrance animation
  // after the DOM exists so there is never a permanently blank hero.
  document.body.classList.add("motion-enabled");

  let frame = 0;
  const updateMotion = () => {
    frame = 0;
    const viewport = window.innerHeight || 800;
    const scroll = Math.max(0, window.scrollY || 0);
    const heroProgress = Math.min(scroll / Math.max(hero.offsetHeight, 1), 1);
    if (van) {
      van.style.setProperty("--cinematic-y", String(Math.round(heroProgress * -24)));
      van.style.setProperty("--cinematic-x", String(Math.round(heroProgress * 12)));
      van.style.setProperty("--cinematic-van-shift", String(Math.round(heroProgress * -35)));
    }
    if (visual) {
      const rect = visual.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (rect.top + rect.height * .5 - viewport * .5) / viewport));
      visual.style.setProperty("--reel-y", Math.round(progress * -16) + "px");
    }
    if (bannerPhoto) {
      const rect = bannerPhoto.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < viewport) {
        const drift = Math.max(-24, Math.min(24, (rect.top / viewport) * 20));
        bannerPhoto.style.transform = "translateY(" + drift + "px) scale(1.1)";
      }
    }
  };

  const scheduleMotion = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(updateMotion);
  };
  window.addEventListener("scroll", scheduleMotion, { passive: true });
  window.addEventListener("resize", scheduleMotion, { passive: true });
  scheduleMotion();
})();
