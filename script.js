      (() => {
        const menuToggle = document.querySelector(".menu-toggle");
        const mobileMenu = document.querySelector("#mobile-menu");
        const menuLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

        menuToggle?.addEventListener("click", () => {
          const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
          menuToggle.setAttribute("aria-expanded", String(!isOpen));
          menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
          mobileMenu?.classList.toggle("is-open", !isOpen);
        });

        menuLinks.forEach((link) => link.addEventListener("click", () => {
          menuToggle?.setAttribute("aria-expanded", "false");
          menuToggle?.setAttribute("aria-label", "Abrir menú");
          mobileMenu?.classList.remove("is-open");
        }));

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduceMotion) {
          document.documentElement.classList.add("motion-ready");
          const revealItems = document.querySelectorAll(".trust-strip, .section, .final-cta, .product-card, .process-item, .faq-list details");
          if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              });
            }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
            revealItems.forEach((item) => {
              item.classList.add("reveal");
              revealObserver.observe(item);
            });
          } else {
            revealItems.forEach((item) => item.classList.add("reveal", "is-visible"));
          }
        }

        const form = document.querySelector("#quote-form");
        const peopleInput = document.querySelector("#people");
        const peopleRange = document.querySelector("#people-range");
        const peopleOutput = document.querySelector("#people-output");
        const durationInput = document.querySelector("#duration");
        const settingInput = document.querySelector("#setting");
        const formatInput = document.querySelector("#format");
        const coolingInput = document.querySelector("#cooling");
        const resultKg = document.querySelector("#result-kg");
        const resultSummary = document.querySelector("#result-summary");
        const resultProductImage = document.querySelector("#result-product-image");
        const resultPack = document.querySelector("#result-pack");
        const resultPackMeta = document.querySelector("#result-pack-meta");
        const whatsappLinks = document.querySelectorAll("[data-whatsapp-quote]");
        const formStatus = document.querySelector("#form-status");
        const resultCard = document.querySelector(".result-card");
        const whatsappNumber = "573102682677";

        const baseBySetting = { event: 0.5, business: 0.4, home: 0.32 };
        const formatData = {
          bag: { size: 2.5, label: "bolsas de 2,5 kg", singular: "bolsa de 2,5 kg", display: "Bolsa de 2,5 kg", meta: "Consumo rápido", image: "img/hielos-claritas-bolsa-2-5kg-v2.png" },
          bulk: { size: 30, label: "bultos de 30 kg", singular: "bulto de 30 kg", display: "Bulto de 30 kg", meta: "Alto consumo", image: "img/hielos-claritas-bulto-30kg.png" },
          block: { size: 60, label: "bloques de 60 kg", singular: "bloque de 60 kg", display: "Bloque de 60 kg", meta: "Enfriamiento prolongado", image: "img/hielos-claritas-bloque-60kg.png" },
        };

        const roundTo = (value, step) => Math.max(step, Math.ceil(value / step) * step);

        const singularize = (pack, units) => units === 1 ? pack.singular : pack.label;

        function syncPeople(rawValue) {
          const people = Math.min(10000, Math.max(1, Math.round(Number(rawValue) || 1)));
          const sliderValue = Math.min(1000, people);
          peopleInput.value = people;
          peopleRange.value = sliderValue;
          peopleRange.style.setProperty("--range-progress", `${((sliderValue - 1) / 999) * 100}%`);
          peopleOutput.textContent = `${new Intl.NumberFormat("es-CO").format(people)} personas`;
        }

        function pulseResult() {
          if (reduceMotion || !resultCard) return;
          resultCard.classList.remove("is-updated");
          requestAnimationFrame(() => resultCard.classList.add("is-updated"));
        }

        function getEstimate() {
          const people = Math.min(10000, Math.max(1, Number(peopleInput.value) || 1));
          const duration = Number(durationInput.value) || 4;
          const setting = settingInput.value;
          const durationFactor = duration <= 4 ? 1 : 1 + ((duration - 4) * 0.08);
          const coolingFactor = coolingInput.checked ? 1.25 : 1;
          const estimatedKg = roundTo(people * baseBySetting[setting] * durationFactor * coolingFactor, 2.5);
          const chosen = formatInput.value === "recommend" ? (estimatedKg <= 10 ? "bag" : estimatedKg <= 35 ? "bulk" : "block") : formatInput.value;
          const pack = formatData[chosen];
          const units = Math.ceil(estimatedKg / pack.size);
          const totalForFormat = units * pack.size;
          return { people, estimatedKg, chosen, units, totalForFormat, pack };
        }

        function updateResult(showStatus = false, animate = false) {
          const estimate = getEstimate();
          const unitLabel = singularize(estimate.pack, estimate.units);
          resultKg.textContent = String(estimate.totalForFormat).replace(".", ",");
          resultSummary.textContent = `Aproximadamente ${estimate.units} ${unitLabel}. Recomendación para ${estimate.people} personas.`;
          const message = `Hola, quiero cotizar ${estimate.units} ${unitLabel} (${estimate.totalForFormat} kg) para ${estimate.people} personas.`;
          const body = encodeURIComponent(message);
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${body}`;
          whatsappLinks.forEach((link) => { link.href = whatsappUrl; });
          resultProductImage.src = estimate.pack.image;
          resultPack.textContent = estimate.pack.display;
          resultPackMeta.textContent = estimate.pack.meta;
          if (showStatus) formStatus.textContent = "Estimación actualizada. Puedes enviarnos estos datos para confirmar disponibilidad.";
          if (animate) pulseResult();
        }

        peopleRange?.addEventListener("input", () => {
          syncPeople(peopleRange.value);
          updateResult();
        });

        peopleRange?.addEventListener("change", () => {
          updateResult(false, true);
        });

        peopleInput?.addEventListener("input", () => {
          syncPeople(peopleInput.value);
          updateResult();
        });

        peopleInput?.addEventListener("change", () => {
          syncPeople(peopleInput.value);
          updateResult(false, true);
        });

        [durationInput, settingInput, formatInput, coolingInput].forEach((control) => {
          control?.addEventListener("change", () => updateResult(false, true));
        });

        form?.addEventListener("submit", (event) => {
          event.preventDefault();
          updateResult(true);
          document.querySelector(".result-card")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });

        document.querySelectorAll("[data-product-choice]").forEach((button) => {
          button.addEventListener("click", () => {
            formatInput.value = button.dataset.productChoice;
            document.querySelector("#calculadora")?.scrollIntoView({ behavior: "smooth" });
            updateResult();
            formStatus.textContent = "Presentación seleccionada. Completa los datos para actualizar la estimación.";
            peopleRange.focus({ preventScroll: true });
          });
        });

        syncPeople(peopleInput.value);
        updateResult();
      })();
