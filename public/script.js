(() => {
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 48);
  };

  const closeMenu = () => {
    if (!header || !menuButton) return;
    header.classList.remove("is-menu-open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Ouvrir le menu");
  };

  menuButton?.addEventListener("click", () => {
    const open = !header?.classList.contains("is-menu-open");
    header?.classList.toggle("is-menu-open", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });

  mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) closeMenu();
  });
  updateHeader();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroBackground = document.querySelector("[data-parallax-bg]");
  const scrollProgress = document.querySelector("[data-scroll-progress]");
  let motionFrame = 0;
  const updateScrollMotion = () => {
    if (motionFrame || reduceMotion) return;
    motionFrame = window.requestAnimationFrame(() => {
      const shift = Math.min(window.scrollY * 0.09, 70);
      heroBackground?.style.setProperty("--hero-shift", `${shift}px`);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      scrollProgress?.style.setProperty("transform", `scaleX(${progress})`);
      motionFrame = 0;
    });
  };
  window.addEventListener("scroll", updateScrollMotion, { passive: true });
  updateScrollMotion();

  const protocol = document.querySelector("[data-protocol]");
  const protocolSteps = protocol ? [...protocol.querySelectorAll("li")] : [];
  if (protocolSteps.length && !reduceMotion) {
    let protocolIndex = 1;
    let protocolTimer;
    const advanceProtocol = () => {
      protocolSteps.forEach((step, index) => step.classList.toggle("is-active", index === protocolIndex));
      protocolIndex = (protocolIndex + 1) % protocolSteps.length;
    };
    const startProtocol = () => {
      window.clearInterval(protocolTimer);
      protocolTimer = window.setInterval(advanceProtocol, 2200);
    };
    protocol?.addEventListener("mouseenter", () => window.clearInterval(protocolTimer));
    protocol?.addEventListener("mouseleave", startProtocol);
    startProtocol();
  }

  if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
        card.style.setProperty("--shine-x", `${x * 100}%`);
        card.style.setProperty("--shine-y", `${y * 100}%`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });

    const fleetVisual = document.querySelector("[data-fleet-visual]");
    fleetVisual?.addEventListener("pointermove", (event) => {
      const rect = fleetVisual.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
      fleetVisual.style.setProperty("--fleet-x", `${x}px`);
      fleetVisual.style.setProperty("--fleet-y", `${y}px`);
    });
    fleetVisual?.addEventListener("pointerleave", () => {
      fleetVisual.style.setProperty("--fleet-x", "0px");
      fleetVisual.style.setProperty("--fleet-y", "0px");
    });
  }

  const quoteForm = document.querySelector("[data-quote-form]");
  const quoteContext = quoteForm?.querySelector("[data-quote-context]");
  const updateQuoteContext = () => {
    if (!quoteForm || !quoteContext) return;
    const volume = quoteForm.elements.volume?.value;
    const vehicle = quoteForm.elements.vehicle?.value;
    const distance = quoteForm.elements.distance?.value;
    const context = [
      distance ? `Trajet simulé : ${distance}` : "",
      volume ? `Volume : ${volume}` : "",
      vehicle ? `Véhicule conseillé : ${vehicle}` : "",
    ].filter(Boolean);
    quoteContext.hidden = !context.length;
    quoteContext.textContent = context.join(" · ");
  };
  const focusQuote = () => {
    document.querySelector("#devis")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  document.querySelectorAll("[data-service-choice]").forEach((link) => {
    link.addEventListener("click", () => {
      if (quoteForm?.elements.service) quoteForm.elements.service.value = link.dataset.serviceChoice;
    });
  });

  const sectionLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
  if (sectionLinks.length && "IntersectionObserver" in window) {
    const sections = sectionLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    const sectionObserver = new IntersectionObserver((entries) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (!visibleEntry) return;
      sectionLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visibleEntry.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-34% 0px -58% 0px", threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const volumeConfig = document.querySelector("[data-volume-config]");
  if (volumeConfig) {
    const range = volumeConfig.querySelector("[data-volume-range]");
    const output = volumeConfig.querySelector("[data-volume-output]");
    const recommendation = volumeConfig.querySelector("[data-vehicle-recommendation]");
    const vehicleCopy = volumeConfig.querySelector("[data-vehicle-copy]");
    let selectedVehicle = "Jumpy / Expert";

    const updateVolume = () => {
      const volume = Number(range?.value || 6);
      const progress = ((volume - 1) / 11) * 100;
      selectedVehicle = volume <= 6 ? "Jumpy / Expert" : "Master L2H2";
      if (output) output.textContent = `${volume} m³`;
      if (range) range.style.setProperty("--range-progress", `${progress}%`);
      if (recommendation) recommendation.textContent = selectedVehicle;
      if (vehicleCopy) {
        vehicleCopy.textContent = volume <= 6
          ? "Format agile pour les petits volumes et les accès urbains."
          : "Grand volume adapté aux chargements plus importants et aux longues distances.";
      }
    };

    range?.addEventListener("input", updateVolume);
    volumeConfig.querySelector("[data-volume-to-quote]")?.addEventListener("click", () => {
      if (!quoteForm || !range) return;
      quoteForm.elements.volume.value = `${range.value} m³`;
      quoteForm.elements.vehicle.value = selectedVehicle;
      updateQuoteContext();
      focusQuote();
    });
    updateVolume();
  }

  const routeStudio = document.querySelector("[data-route-studio]");
  if (routeStudio) {
    const base = { name: "Serémange-Erzange", coordinates: [49.321, 6.09] };
    const destinations = {
      paris: { name: "Paris", zone: "France", coordinates: [48.8566, 2.3522] },
      lyon: { name: "Lyon", zone: "France", coordinates: [45.764, 4.8357] },
      marseille: { name: "Marseille", zone: "France", coordinates: [43.2965, 5.3698] },
      luxembourg: { name: "Luxembourg", zone: "Benelux", coordinates: [49.6116, 6.1319] },
      brussels: { name: "Bruxelles", zone: "Benelux", coordinates: [50.8503, 4.3517] },
      amsterdam: { name: "Amsterdam", zone: "Benelux", coordinates: [52.3676, 4.9041] },
      frankfurt: { name: "Francfort", zone: "Allemagne", coordinates: [50.1109, 8.6821] },
      munich: { name: "Munich", zone: "Allemagne", coordinates: [48.1351, 11.582] },
      milan: { name: "Milan", zone: "Europe du Sud", coordinates: [45.4642, 9.19] },
      barcelona: { name: "Barcelone", zone: "Europe du Sud", coordinates: [41.3874, 2.1686] },
      prague: { name: "Prague", zone: "Europe centrale", coordinates: [50.0755, 14.4378] },
      vienna: { name: "Vienne", zone: "Europe centrale", coordinates: [48.2082, 16.3738] },
      warsaw: { name: "Varsovie", zone: "Europe de l’Est", coordinates: [52.2297, 21.0122] },
    };
    const select = routeStudio.querySelector("[data-route-select]");
    const quickButtons = [...routeStudio.querySelectorAll("[data-route-quick]")];
    const cityOutput = routeStudio.querySelector("[data-route-city]");
    const zoneOutput = routeStudio.querySelector("[data-route-zone]");
    const distanceOutput = routeStudio.querySelector("[data-route-distance]");
    const loading = routeStudio.querySelector("[data-map-loading]");
    const toggleButton = routeStudio.querySelector("[data-map-toggle]");
    let selectedKey = select?.value || "paris";
    let selectedDistance = 0;
    let map;
    let routeShadow;
    let routeLine;
    let destinationMarker;
    let routePoints = [];
    let vehicleMarkers = [];
    let animationFrame = 0;
    let animationStart = 0;
    let animationPaused = reduceMotion;
    let mapReady = false;

    const estimateDistance = (from, to) => {
      const earthRadius = 6371;
      const radians = (value) => (value * Math.PI) / 180;
      const latDelta = radians(to[0] - from[0]);
      const lngDelta = radians(to[1] - from[1]);
      const lat1 = radians(from[0]);
      const lat2 = radians(to[0]);
      const haversine = Math.sin(latDelta / 2) ** 2
        + Math.cos(lat1) * Math.cos(lat2) * Math.sin(lngDelta / 2) ** 2;
      const directDistance = 2 * earthRadius * Math.asin(Math.sqrt(haversine));
      return Math.max(10, Math.round((directDistance * 1.18) / 10) * 10);
    };

    const buildCurve = (from, to, steps = 120) => {
      const latDelta = to[0] - from[0];
      const lngDelta = to[1] - from[1];
      const span = Math.hypot(latDelta, lngDelta) || 1;
      const bend = Math.min(span * 0.13, 2.2);
      const control = [
        (from[0] + to[0]) / 2 + (lngDelta / span) * bend,
        (from[1] + to[1]) / 2 - (latDelta / span) * bend,
      ];
      return Array.from({ length: steps + 1 }, (_, index) => {
        const progress = index / steps;
        const inverse = 1 - progress;
        return [
          inverse ** 2 * from[0] + 2 * inverse * progress * control[0] + progress ** 2 * to[0],
          inverse ** 2 * from[1] + 2 * inverse * progress * control[1] + progress ** 2 * to[1],
        ];
      });
    };

    const markerIcon = (type, index = 0) => {
      if (type === "base") {
        return window.L.divIcon({ className: "ludhim-base-marker", html: '<div class="base-pin">LT</div>', iconSize: [36, 36], iconAnchor: [18, 18] });
      }
      if (type === "destination") {
        return window.L.divIcon({ className: "destination-marker", html: '<div class="destination-pin"></div>', iconSize: [24, 30], iconAnchor: [12, 24] });
      }
      const extraClass = index === 0 ? "is-primary" : "is-secondary";
      return window.L.divIcon({
        className: `vehicle-marker ${extraClass}`,
        html: '<div class="map-van"><span class="map-van-body"></span><span class="map-van-cab"></span></div>',
        iconSize: [37, 24],
        iconAnchor: [18, 12],
      });
    };

    const updatePlanner = (key) => {
      const destination = destinations[key];
      if (!destination) return;
      selectedKey = key;
      selectedDistance = estimateDistance(base.coordinates, destination.coordinates);
      if (select && select.value !== key) select.value = key;
      if (cityOutput) cityOutput.textContent = destination.name;
      if (zoneOutput) zoneOutput.textContent = destination.zone;
      if (distanceOutput) distanceOutput.textContent = `≈ ${selectedDistance.toLocaleString("fr-FR")} km`;
      quickButtons.forEach((button) => {
        const active = button.dataset.routeQuick === key;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      if (mapReady) drawRoute(destination);
    };

    const drawRoute = (destination) => {
      routePoints = buildCurve(base.coordinates, destination.coordinates);
      routeShadow?.setLatLngs(routePoints);
      routeLine?.setLatLngs(routePoints);
      destinationMarker?.setLatLng(destination.coordinates).setTooltipContent(destination.name);
      vehicleMarkers.forEach((marker, index) => {
        const pointIndex = Math.floor((index / vehicleMarkers.length) * (routePoints.length - 1));
        marker.setLatLng(routePoints[pointIndex]);
      });
      animationStart = performance.now();
      const bounds = window.L.latLngBounds(routePoints);
      map.flyToBounds(bounds.pad(0.24), { paddingTopLeft: [40, 95], paddingBottomRight: [40, 60], duration: reduceMotion ? 0 : 1.1, maxZoom: 7 });
    };

    const animateVehicles = (time) => {
      animationFrame = window.requestAnimationFrame(animateVehicles);
      if (animationPaused || document.hidden || !mapReady || routePoints.length < 2) return;
      const duration = Math.min(24000, Math.max(9000, selectedDistance * 18));
      const elapsed = (time - animationStart) / duration;
      const offsets = [0, 0.36, 0.71];
      vehicleMarkers.forEach((marker, index) => {
        const progress = (elapsed + offsets[index]) % 1;
        const pointIndex = Math.min(routePoints.length - 2, Math.floor(progress * (routePoints.length - 1)));
        const current = routePoints[pointIndex];
        const next = routePoints[pointIndex + 1];
        marker.setLatLng(current);
        const currentPixel = map.latLngToLayerPoint(current);
        const nextPixel = map.latLngToLayerPoint(next);
        const angle = Math.atan2(nextPixel.y - currentPixel.y, nextPixel.x - currentPixel.x) * (180 / Math.PI);
        marker.getElement()?.querySelector(".map-van")?.style.setProperty("--vehicle-angle", `${angle}deg`);
      });
    };

    const initializeMap = () => {
      if (mapReady || !routeStudio.querySelector("[data-real-map]")) return;
      if (!window.L) {
        loading?.classList.add("is-error");
        const message = loading?.querySelector("b");
        if (message) message.textContent = "La carte interactive n’a pas pu démarrer. Utilisez le sélecteur de destination pour préparer votre demande.";
        return;
      }

      map = window.L.map("europe-map", {
        attributionControl: true,
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([50.15, 9.4], 4);
      const tiles = window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      });
      tiles.on("load", () => loading?.classList.add("is-hidden"));
      tiles.on("tileerror", () => {
        const message = loading?.querySelector("b");
        loading?.classList.add("is-error");
        if (message) message.textContent = "Fond cartographique momentanément indisponible. Le simulateur reste utilisable.";
      });
      tiles.addTo(map);
      window.setTimeout(() => loading?.classList.add("is-hidden"), 4500);
      window.L.control.scale({ imperial: false, position: "bottomright" }).addTo(map);
      ["luxembourg", "brussels", "frankfurt", "milan", "warsaw"].forEach((key) => {
        window.L.polyline(buildCurve(base.coordinates, destinations[key].coordinates, 70), {
          color: "#79a6b8",
          dashArray: "3 11",
          interactive: false,
          opacity: 0.2,
          weight: 1.5,
        }).addTo(map);
      });
      Object.entries(destinations).forEach(([key, destination]) => {
        window.L.circleMarker(destination.coordinates, {
          color: "#d4edf5",
          fillColor: "#25c8ff",
          fillOpacity: 0.7,
          radius: 4,
          weight: 1,
        })
          .addTo(map)
          .bindTooltip(destination.name, { direction: "top", offset: [0, -5] })
          .on("click", () => updatePlanner(key));
      });
      window.L.marker(base.coordinates, { icon: markerIcon("base"), zIndexOffset: 900 })
        .addTo(map)
        .bindTooltip("Base Ludhim · Moselle", { direction: "top", offset: [0, -18] });
      destinationMarker = window.L.marker(base.coordinates, { icon: markerIcon("destination"), zIndexOffset: 800 })
        .addTo(map)
        .bindTooltip("Destination", { direction: "top", offset: [0, -20] });
      routeShadow = window.L.polyline([], { color: "#06101d", opacity: 0.72, weight: 10, lineCap: "round", interactive: false }).addTo(map);
      routeLine = window.L.polyline([], { className: "active-route-path", color: "#25c8ff", dashArray: "10 12", opacity: 0.96, weight: 4, lineCap: "round", interactive: false }).addTo(map);
      vehicleMarkers = [0, 1, 2].map((index) => window.L.marker(base.coordinates, {
        icon: markerIcon("vehicle", index),
        interactive: false,
        keyboard: false,
        zIndexOffset: 1000 + index,
      }).addTo(map));
      mapReady = true;
      drawRoute(destinations[selectedKey]);
      if (reduceMotion && toggleButton) {
        toggleButton.textContent = "Animation réduite";
        toggleButton.disabled = true;
      } else {
        animationFrame = window.requestAnimationFrame(animateVehicles);
      }
    };

    select?.addEventListener("change", () => updatePlanner(select.value));
    quickButtons.forEach((button) => button.addEventListener("click", () => updatePlanner(button.dataset.routeQuick)));
    routeStudio.querySelector("[data-map-reset]")?.addEventListener("click", () => {
      map?.flyTo([50.15, 9.4], 4, { duration: reduceMotion ? 0 : 1 });
    });
    toggleButton?.addEventListener("click", () => {
      animationPaused = !animationPaused;
      toggleButton.textContent = animationPaused ? "Reprendre les véhicules" : "Mettre en pause";
      toggleButton.setAttribute("aria-pressed", String(animationPaused));
      if (!animationPaused) animationStart = performance.now();
    });
    routeStudio.querySelector("[data-route-to-quote]")?.addEventListener("click", () => {
      if (!quoteForm) return;
      const destination = destinations[selectedKey];
      quoteForm.elements.depart.value = `${base.name} (57)`;
      quoteForm.elements.destination.value = destination.name;
      quoteForm.elements.service.value = "Course dédiée";
      quoteForm.elements.distance.value = `≈ ${selectedDistance.toLocaleString("fr-FR")} km (estimation non contractuelle)`;
      updateQuoteContext();
      focusQuote();
    });

    if ("IntersectionObserver" in window) {
      const mapObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          initializeMap();
          mapObserver.disconnect();
        }
      }, { rootMargin: "400px 0px" });
      mapObserver.observe(routeStudio);
    } else {
      initializeMap();
    }
    updatePlanner(selectedKey);
    window.addEventListener("beforeunload", () => window.cancelAnimationFrame(animationFrame));
  }

  const faqItems = [...document.querySelectorAll(".faq-list details")];
  faqItems.forEach((item) => item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) otherItem.open = false;
    });
  }));

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -7% 0px" },
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const dateField = document.querySelector('input[name="date"]');
  if (dateField) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
    dateField.min = localDate;
  }

  quoteForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;

    const data = new FormData(quoteForm);
    const depart = String(data.get("depart") || "").trim();
    const destination = String(data.get("destination") || "").trim();
    const date = String(data.get("date") || "").trim();
    const service = String(data.get("service") || "").trim();
    const details = String(data.get("details") || "").trim();
    const volume = String(data.get("volume") || "").trim();
    const vehicle = String(data.get("vehicle") || "").trim();
    const distance = String(data.get("distance") || "").trim();
    const subject = `Demande de transport — ${depart} → ${destination}`;
    const body = [
      "Bonjour Ludhim Transport,",
      "",
      "Je souhaite organiser un transport avec les informations suivantes :",
      `• Départ : ${depart}`,
      `• Destination : ${destination}`,
      `• Date souhaitée : ${date}`,
      `• Type de besoin : ${service}`,
      `• Distance simulée : ${distance || "À confirmer"}`,
      `• Volume estimé : ${volume || "À préciser"}`,
      `• Véhicule envisagé : ${vehicle || "À confirmer par Ludhim"}`,
      `• Marchandise / contraintes : ${details || "À préciser"}`,
      "",
      "Merci de me recontacter pour confirmer la faisabilité et le tarif.",
    ].join("\n");

    const note = quoteForm.querySelector("[data-form-note]");
    if (note) {
      note.classList.add("is-active");
      note.lastChild.textContent = " Votre demande est prête : ouverture de votre messagerie…";
    }
    window.location.href = `mailto:contact@ludhim.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
