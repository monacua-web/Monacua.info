(() => {
  "use strict";

  document.body.classList.add("motion-ready");

  const WHATSAPP_PHONE = "573102682677";
  const PEOPLE_MIN = 1;
  const PEOPLE_MAX = 10000;

  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector("#mobile-menu");
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
  const form = document.querySelector("#quote-form");
  const peopleInput = document.querySelector("#people");
  const peopleRange = document.querySelector("#people-range");
  const peopleError = document.querySelector("#people-error");
  const peopleStepButtons = document.querySelectorAll("[data-people-step]");
  const settingInput = document.querySelector("#setting");
  const durationInput = document.querySelector("#duration");
  const coolingInput = document.querySelector("#cooling");
  const beveragesInput = document.querySelector("#beverages");
  const locationInput = document.querySelector("#location");
  const formatInput = document.querySelector("#format");
  const resultKg = document.querySelector("#result-kg");
  const resultSummary = document.querySelector("#result-summary");
  const breakdownElements = {
    service: document.querySelector("#breakdown-service"),
    cooling: document.querySelector("#breakdown-cooling"),
    climate: document.querySelector("#breakdown-climate"),
    safety: document.querySelector("#breakdown-safety"),
  };
  const packageLines = document.querySelector("#package-lines");
  const packageTitle = document.querySelector("#package-title");
  const packageCoverage = document.querySelector("#package-coverage");
  const packagePrice = document.querySelector("#package-price");
  const quoteLink = document.querySelector("#quote-link");
  const formStatus = document.querySelector("#form-status");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const settingRate = {
    home: 0.32,
    event: 0.5,
    business: 0.4,
  };

  const beverageRate = {
    sodas: 0.9,
    beer: 1.1,
    cocktails: 1.2,
    mixed: 1,
  };

  const formatData = {
    bag1: { weight: 1, price: 2500, category: "Bolsa", label: "Bolsa de 1 kg", shortLabel: "Bolsa 1 kg", singular: "bolsa de 1 kg", plural: "bolsas de 1 kg", detail: "Presentación individual" },
    bag25: { weight: 2.5, price: 5000, category: "Bolsa", label: "Bolsa de 2,5 kg", shortLabel: "Bolsa 2,5 kg", singular: "bolsa de 2,5 kg", plural: "bolsas de 2,5 kg", detail: "Presentación individual" },
    bag4: { weight: 4, price: 7000, category: "Bolsa", label: "Bolsa de 4 kg", shortLabel: "Bolsa 4 kg", singular: "bolsa de 4 kg", plural: "bolsas de 4 kg", detail: "Presentación individual" },
    paca1: { weight: 10, price: 22000, category: "Paca", label: "Paca de 10 bolsas de 1 kg", shortLabel: "Paca 10 x 1 kg", singular: "paca de 10 bolsas de 1 kg", plural: "pacas de 10 bolsas de 1 kg", detail: "10 bolsas de 1 kg" },
    paca25: { weight: 12.5, price: 22000, category: "Paca", label: "Paca de 5 bolsas de 2,5 kg", shortLabel: "Paca 5 x 2,5 kg", singular: "paca de 5 bolsas de 2,5 kg", plural: "pacas de 5 bolsas de 2,5 kg", detail: "5 bolsas de 2,5 kg" },
    bulk10: { weight: 10, price: 18000, category: "Bulto", label: "Bulto de 10 kg", shortLabel: "Bulto 10 kg", singular: "bulto de 10 kg", plural: "bultos de 10 kg", detail: "Presentación individual" },
    bulk30: { weight: 30, price: 45000, category: "Bulto", label: "Bulto de 30 kg", shortLabel: "Bulto 30 kg", singular: "bulto de 30 kg", plural: "bultos de 30 kg", detail: "Presentación individual" },
    block15: { weight: 15, price: 15000, category: "Bloque cuarto", label: "Bloque cuarto de 15 kg", shortLabel: "Bloque cuarto 15 kg", singular: "bloque cuarto de 15 kg", plural: "bloques cuarto de 15 kg", detail: "Presentación individual" },
    block30: { weight: 30, price: 28000, category: "Bloque medio", label: "Bloque medio de 30 kg", shortLabel: "Bloque medio 30 kg", singular: "bloque medio de 30 kg", plural: "bloques medio de 30 kg", detail: "Presentación individual" },
    block60: { weight: 60, price: 50000, category: "Bloque completo", label: "Bloque completo de 60 kg", shortLabel: "Bloque completo 60 kg", singular: "bloque completo de 60 kg", plural: "bloques completos de 60 kg", detail: "Presentación individual" },
  };

  const recommendationBands = [
    { max: 1, key: "bag1" },
    { max: 2.5, key: "bag25" },
    { max: 4, key: "bag4" },
    { max: 10, key: "bulk10" },
    { max: 12.5, key: "paca25" },
    { max: 15, key: "block15" },
    { max: 30, key: "bulk30" },
    { max: 60, key: "block60" },
  ];

  const packageAdjustments = {};
  const currencyFormatter = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

  function formatCurrency(value) {
    return currencyFormatter.format(Math.round(value)).replace(/\s/g, "");
  }

  function formatKg(value) {
    const rounded = Math.round(value * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(".", ",");
  }

  function updateRangeProgress(range) {
    if (!range) return;
    const min = Number(range.min) || 0;
    const max = Number(range.max) || 100;
    const value = Number(range.value) || min;
    const progress = ((value - min) / (max - min)) * 100;
    range.style.setProperty("--range-progress", `${Math.max(0, Math.min(100, progress))}%`);
  }

  function setPeople(value) {
    const people = Math.round(Number(value));
    if (!Number.isFinite(people)) return false;
    peopleInput.value = people;
    peopleRange.value = Math.min(Number(peopleRange.max), Math.max(Number(peopleRange.min), people));
    updateRangeProgress(peopleRange);
    peopleError.textContent = "";
    peopleInput.removeAttribute("aria-invalid");
    return true;
  }

  function readPeople({ showError = true } = {}) {
    const rawValue = peopleInput.value.trim();
    const people = rawValue === "" ? null : Number(rawValue);
    const valid = Number.isInteger(people) && people >= PEOPLE_MIN && people <= PEOPLE_MAX;
    if (!valid) {
      if (showError) {
        peopleError.textContent = "Escribe una cantidad entre 1 y 10.000 personas.";
        peopleInput.setAttribute("aria-invalid", "true");
      }
      return null;
    }
    setPeople(people);
    return people;
  }

  function selectedLabel(groupName) {
    return document.querySelector(`[data-choice-group="${groupName}"] .is-selected`)?.dataset.label || "No definido";
  }

  function selectChoice(button) {
    const group = button.closest("[data-choice-group]");
    if (!group) return;
    group.querySelectorAll("[data-choice]").forEach((choice) => {
      const selected = choice === button;
      choice.classList.toggle("is-selected", selected);
      choice.setAttribute("aria-pressed", String(selected));
    });

    const choiceGroup = group.dataset.choiceGroup;
    if (choiceGroup === "occasion") settingInput.value = button.dataset.setting;
    if (choiceGroup === "beverages") beveragesInput.value = button.dataset.value;
    if (choiceGroup === "location") locationInput.value = button.dataset.value;
    if (choiceGroup === "cooling") coolingInput.value = button.dataset.value;
  }

  function getRecommendedLines(totalKg) {
    if (totalKg <= 60) {
      const band = recommendationBands.find((candidate) => totalKg <= candidate.max);
      return [{ key: band?.key || "block60", units: 1 }];
    }

    const lines = [];
    let remaining = totalKg;
    const fullBlocks = Math.floor(remaining / formatData.block60.weight);
    if (fullBlocks > 0) {
      lines.push({ key: "block60", units: fullBlocks });
      remaining = Math.round((remaining - fullBlocks * formatData.block60.weight) * 10) / 10;
    }
    if (remaining > 0) {
      const band = recommendationBands.find((candidate) => remaining <= candidate.max);
      lines.push({ key: band?.key || "block60", units: 1 });
    }
    return lines;
  }

  function getPackageLines(totalKg, selectedFormat) {
    const baseLines = selectedFormat === "recommend"
      ? getRecommendedLines(totalKg)
      : [{ key: selectedFormat, units: Math.max(1, Math.ceil(totalKg / formatData[selectedFormat].weight)) }];
    const adjustments = packageAdjustments[selectedFormat] || {};
    return baseLines.map((line) => ({
      ...line,
      units: Math.max(1, line.units + (adjustments[line.key] || 0)),
    }));
  }

  function getEstimate() {
    const people = readPeople();
    if (people === null) return null;

    const setting = settingInput.value || "home";
    const hours = Number(durationInput.value) || 4;
    const durationFactor = hours <= 2 ? 0.82 : hours <= 4 ? 1 : hours <= 6 ? 1.15 : 1.3;
    const service = people * (settingRate[setting] || settingRate.home) * (beverageRate[beveragesInput.value] || 1) * durationFactor;
    const cooling = coolingInput.value === "yes" ? people * 0.4 : 0;
    const climateRate = locationInput.value === "sun" ? 0.2 : locationInput.value === "exterior" ? 0.1 : 0;
    const climate = (service + cooling) * climateRate;
    const safety = (service + cooling + climate) * 0.15;
    const estimatedKg = service + cooling + climate + safety;
    const totalKg = Math.max(1, Math.ceil(estimatedKg / 2.5) * 2.5);
    const selectedFormat = formatInput.value || "recommend";
    const lines = getPackageLines(totalKg, selectedFormat);
    const coveredKg = lines.reduce((total, line) => total + line.units * formatData[line.key].weight, 0);
    const totalPrice = lines.reduce((total, line) => total + line.units * formatData[line.key].price, 0);

    return {
      people,
      setting,
      hours,
      estimatedKg,
      totalKg,
      breakdown: { service, cooling, climate, safety },
      lines,
      coveredKg,
      totalPrice,
      selectedFormat,
    };
  }

  function formatLineLabel(line) {
    const pack = formatData[line.key];
    return `${line.units} ${line.units === 1 ? pack.singular : pack.plural}`;
  }

  function renderBreakdown(breakdown) {
    Object.entries(breakdown).forEach(([key, value]) => {
      if (breakdownElements[key]) breakdownElements[key].textContent = `${formatKg(value)} kg`;
    });
  }

  function renderPackage(estimate) {
    packageLines.innerHTML = estimate.lines.map((line) => {
      const pack = formatData[line.key];
      const lineTotal = line.units * pack.price;
      return `<div class="package-line"><span class="package-line-name"><strong>${pack.shortLabel}</strong><small>${pack.detail}</small></span><span class="package-line-price">${formatCurrency(lineTotal)}</span><button type="button" class="quantity-button" data-line-key="${line.key}" data-step="-1" aria-label="Restar una unidad de ${pack.label}">−</button><output>${line.units}</output><button type="button" class="quantity-button" data-line-key="${line.key}" data-step="1" aria-label="Sumar una unidad de ${pack.label}">+</button></div>`;
    }).join("");

    packageTitle.textContent = estimate.lines.length === 1 ? formatLineLabel(estimate.lines[0]) : "Combinación de presentaciones";
    packageCoverage.textContent = `${formatKg(estimate.coveredKg)} kg en tu selección. Puedes ajustar las unidades antes de solicitar la cotización.`;
    packagePrice.textContent = formatCurrency(estimate.totalPrice);
  }

  function resetResult() {
    resultKg.textContent = "--";
    resultSummary.textContent = "Revisa la cantidad de personas para actualizar la estimación.";
    Object.values(breakdownElements).forEach((element) => { if (element) element.textContent = "--"; });
    packageTitle.textContent = "Completa la cantidad de personas";
    packageLines.innerHTML = "";
    packageCoverage.textContent = "";
    packagePrice.textContent = "--";
  }

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  }

  function buildGenericMessage(context) {
    if (context === "business") {
      return "Hola, quiero solicitar atención empresarial de Hielos Claritas. Me interesa revisar presentaciones, cantidades, frecuencia y entrega.";
    }
    return "Hola, quiero cotizar un pedido de Hielos Claritas. ¿Me pueden ayudar con presentaciones, disponibilidad y entrega?";
  }

  function buildEstimateMessage(estimate) {
    const packageDescription = estimate.lines.map(formatLineLabel).join(" y ");
    return `Hola, quiero cotizar un pedido de Hielos Claritas. Seleccioné ${packageDescription}, con ${formatKg(estimate.coveredKg)} kg en total. La calculadora estima ${formatKg(estimate.totalKg)} kg para ${estimate.people} personas. Tipo de pedido: ${selectedLabel("occasion")}. Duración: ${estimate.hours} horas. Bebidas: ${selectedLabel("beverages")}. Lugar: ${selectedLabel("location")}. Enfriar botellas: ${coolingInput.value === "yes" ? "Sí" : "No"}.`;
  }

  function updateGenericWhatsAppLinks() {
    document.querySelectorAll("[data-whatsapp-quote]").forEach((link) => {
      if (link === quoteLink) return;
      link.href = buildWhatsAppUrl(buildGenericMessage(link.dataset.whatsappContext));
    });
  }

  function updateResult(showStatus = false) {
    const estimate = getEstimate();
    if (!estimate) {
      resetResult();
      return;
    }

    resultKg.textContent = formatKg(estimate.totalKg);
    resultSummary.textContent = `${formatLineLabel(estimate.lines[0])}. Puedes ajustar las unidades antes de solicitar la cotización.`;
    renderBreakdown(estimate.breakdown);
    renderPackage(estimate);
    quoteLink.href = buildWhatsAppUrl(buildEstimateMessage(estimate));
    if (showStatus) formStatus.textContent = "Estimación actualizada. Confirma los detalles con Hielos Claritas.";
  }

  function closeMobileMenu() {
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Abrir menú");
    mobileMenu?.classList.remove("is-open");
  }

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Abrir menú" : "Cerrar menú");
    mobileMenu?.classList.toggle("is-open", !open);
  });
  menuLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

  document.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      selectChoice(button);
      updateResult(true);
    });
  });

  peopleStepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const current = readPeople({ showError: false }) || PEOPLE_MIN;
      const next = Math.min(PEOPLE_MAX, Math.max(PEOPLE_MIN, current + Number(button.dataset.peopleStep)));
      setPeople(next);
      updateResult(true);
    });
  });

  peopleRange?.addEventListener("input", () => {
    setPeople(peopleRange.value);
    updateResult();
  });

  peopleInput?.addEventListener("input", () => {
    const people = readPeople({ showError: false });
    if (people !== null) updateResult();
  });
  peopleInput?.addEventListener("blur", () => {
    if (readPeople() !== null) updateResult();
  });

  [durationInput, formatInput].forEach((control) => control?.addEventListener("change", () => updateResult(true)));

  packageLines?.addEventListener("click", (event) => {
    const button = event.target.closest(".quantity-button");
    if (!button) return;
    const format = formatInput.value || "recommend";
    packageAdjustments[format] ||= {};
    const key = button.dataset.lineKey;
    packageAdjustments[format][key] = (packageAdjustments[format][key] || 0) + Number(button.dataset.step);
    updateResult(true);
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (readPeople() === null) {
      formStatus.textContent = "Revisa la cantidad de personas para continuar.";
      peopleInput.focus();
      return;
    }
    updateResult(true);
  });

  updateGenericWhatsAppLinks();

  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
  } else {
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
  }

  setPeople(peopleInput.value);
  updateRangeProgress(peopleRange);
  updateResult();
})();
