(() => {
  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector("#mobile-menu");
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
  const form = document.querySelector("#quote-form");
  const peopleInput = document.querySelector("#people");
  const peopleRange = document.querySelector("#people-range");
  const peopleError = document.querySelector("#people-error");
  const settingInput = document.querySelector("#setting");
  const durationRange = document.querySelector("#duration-range");
  const durationOutput = document.querySelector("#duration-output");
  const durationInput = document.querySelector("#duration");
  const coolingInput = document.querySelector("#cooling");
  const glassesInput = document.querySelector("#glasses");
  const beveragesInput = document.querySelector("#beverages");
  const locationInput = document.querySelector("#location");
  const formatInput = document.querySelector("#format");
  const resultKg = document.querySelector("#result-kg");
  const breakdownElements = {
    service: { value: document.querySelector("#breakdown-service"), bar: document.querySelector("#breakdown-service-bar") },
    cooling: { value: document.querySelector("#breakdown-cooling"), bar: document.querySelector("#breakdown-cooling-bar") },
    climate: { value: document.querySelector("#breakdown-climate"), bar: document.querySelector("#breakdown-climate-bar") },
    safety: { value: document.querySelector("#breakdown-safety"), bar: document.querySelector("#breakdown-safety-bar") },
  };
  const packageLines = document.querySelector("#package-lines");
  const packageCoverage = document.querySelector("#package-coverage");
  const packagePrice = document.querySelector("#package-price");
  const packageSavings = document.querySelector("#package-savings");
  const packageOptions = document.querySelectorAll("[data-format-choice]");
  const quoteLink = document.querySelector("#quote-link");
  const cartButton = document.querySelector("#cart-button");
  const copyLinkButton = document.querySelector("#copy-link");
  const formStatus = document.querySelector("#form-status");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const beverageKgPerPerson = { sodas: 0.35, beer: 0.56, liquor: 0.45, cocktails: 0.7, mixed: 0.5 };
  const packageAdjustments = {};
  const formatData = {
    bag: { size: 2.5, unitPrice: 4400, display: "Bolsas de 2,5 kg", label: "Bolsa 2,5 kg", singular: "bolsa de 2,5 kg", plural: "bolsas de 2,5 kg" },
    bulk: { size: 25, unitPrice: 25000, display: "Bultos de 25 kg", label: "Bulto 25 kg", singular: "bulto de 25 kg", plural: "bultos de 25 kg" },
    block: { size: 60, unitPrice: 35000, display: "Bloques de 60 kg", label: "Bloque entero (60 kg)", singular: "bloque de 60 kg", plural: "bloques de 60 kg" },
  };
  const currencyFormatter = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

  function clampPeople(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return null;
    return Math.round(numeric);
  }

  function setPeople(value) {
    const people = clampPeople(value);
    if (people === null || people < 1 || people > 10000) return false;
    peopleInput.value = people;
    if (peopleRange) {
      peopleRange.value = Math.min(Number(peopleRange.max), people);
      updateRangeProgress(peopleRange);
    }
    peopleError.textContent = "";
    peopleInput.removeAttribute("aria-invalid");
    return true;
  }

  function updateRangeProgress(range) {
    if (!range) return;
    const min = Number(range.min) || 0;
    const max = Number(range.max) || 100;
    const value = Number(range.value) || min;
    const progress = ((value - min) / (max - min)) * 100;
    range.style.setProperty("--range-progress", `${Math.max(0, Math.min(100, progress))}%`);
  }

  function syncDuration(value) {
    const duration = Math.min(8, Math.max(2, Number(value) || 5));
    durationRange.value = duration;
    durationOutput.textContent = `${duration} h`;
    durationInput.value = duration <= 2 ? "2" : duration <= 4 ? "4" : duration <= 6 ? "6" : "8";
    updateRangeProgress(durationRange);
  }

  function formatCurrency(value) {
    return currencyFormatter.format(Math.round(value)).replace(/\s/g, "");
  }

  function formatKg(value) {
    return Number.isInteger(value) ? String(value) : String(value).replace(".", ",");
  }

  function getPackageLines(totalKg, selectedFormat) {
    let lines;
    if (selectedFormat === "recommend") {
      if (totalKg <= 10) lines = [{ key: "bag", units: Math.ceil(totalKg / formatData.bag.size) }];
      else if (totalKg <= 60) lines = [{ key: "bulk", units: Math.ceil(totalKg / formatData.bulk.size) }];
      else {
        const bulkUnits = Math.max(0, Math.ceil((totalKg - formatData.block.size) / formatData.bulk.size));
        lines = [
        ...(bulkUnits ? [{ key: "bulk", units: bulkUnits }] : []),
        { key: "block", units: 1 },
        ];
      }
    } else {
      lines = [{ key: selectedFormat, units: Math.ceil(totalKg / formatData[selectedFormat].size) }];
    }
    const adjustments = packageAdjustments[selectedFormat] || {};
    return lines.map((line) => ({ ...line, units: Math.max(1, line.units + (adjustments[line.key] || 0)) }));
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
    if (choiceGroup === "cooling") coolingInput.checked = button.dataset.value === "yes";
    if (choiceGroup === "glasses") glassesInput.checked = button.dataset.value === "yes";
  }

  function selectedLabel(groupName) {
    return document.querySelector(`[data-choice-group="${groupName}"] .is-selected`)?.dataset.label || "No definido";
  }

  function validatePeople() {
    const people = clampPeople(peopleInput.value);
    const valid = people !== null && people >= 1 && people <= 10000;
    if (!valid) {
      peopleError.textContent = "Escribe una cantidad entre 1 y 10.000 personas.";
      peopleInput.setAttribute("aria-invalid", "true");
      return null;
    }
    setPeople(people);
    return people;
  }

  function getEstimate() {
    const people = validatePeople();
    if (people === null) return null;
    const hours = Number(durationRange.value) || 5;
    const durationFactor = hours <= 4 ? 1 : 1 + ((hours - 4) * 0.08);
    const service = people * (beverageKgPerPerson[beveragesInput.value] || beverageKgPerPerson.mixed) * durationFactor;
    const cooling = coolingInput.checked ? people * 0.4 : 0;
    const climateRate = locationInput.value === "sun" ? 0.3 : locationInput.value === "exterior" ? 0.15 : 0;
    const climate = (service + cooling) * climateRate;
    const safety = (service + cooling + climate) * 0.15;
    const estimatedKg = service + cooling + climate + safety;
    const totalKg = Math.max(2.5, Math.ceil(estimatedKg / 5) * 5);
    const selectedFormat = formatInput.value || "recommend";
    const lines = getPackageLines(totalKg, selectedFormat);
    const coveredKg = lines.reduce((total, line) => total + line.units * formatData[line.key].size, 0);
    const packagePrice = lines.reduce((total, line) => total + line.units * formatData[line.key].unitPrice, 0);
    return {
      people,
      hours,
      estimatedKg,
      totalKg,
      breakdown: { service, cooling, climate, safety },
      lines,
      coveredKg,
      packagePrice,
      selectedFormat,
    };
  }

  function renderBreakdown(breakdown) {
    const maxValue = Math.max(1, breakdown.service);
    Object.entries(breakdown).forEach(([key, rawValue]) => {
      const element = breakdownElements[key];
      if (!element) return;
      element.value.textContent = String(Math.round(rawValue));
      element.bar.style.width = `${Math.min(100, (rawValue / maxValue) * 100)}%`;
    });
  }

  function renderPackage(estimate) {
    packageLines.innerHTML = estimate.lines.map((line) => {
      const pack = formatData[line.key];
      const lineTotal = line.units * pack.unitPrice;
      return `<div class="package-line"><strong>${pack.label}</strong><span>${formatCurrency(lineTotal)}</span><button type="button" class="quantity-button" data-line-key="${line.key}" data-step="-1" aria-label="Restar una unidad de ${pack.label}">−</button><output>${line.units}</output><button type="button" class="quantity-button" data-line-key="${line.key}" data-step="1" aria-label="Sumar una unidad de ${pack.label}">+</button></div>`;
    }).join("");
    packageCoverage.textContent = `${formatKg(estimate.coveredKg)} kg cubiertos de ${formatKg(estimate.totalKg)} recomendados${estimate.lines.some((line) => line.key === "block") ? " · el bloque dura mucho más" : ""}`;
    packagePrice.textContent = formatCurrency(estimate.packagePrice);
    const allBagsPrice = Math.ceil(estimate.totalKg / formatData.bag.size) * formatData.bag.unitPrice;
    const savings = Math.max(0, allBagsPrice - estimate.packagePrice);
    packageSavings.textContent = `Ahorros ${formatCurrency(Math.round(savings / 1000) * 1000)} vs. la opción más cara`;
  }

  function syncFormatChoice(value) {
    packageOptions.forEach((option) => {
      const selected = option.dataset.formatChoice === value;
      option.classList.toggle("is-selected", selected);
      option.setAttribute("aria-pressed", String(selected));
    });
  }

  function updateResult(showStatus = false) {
    const estimate = getEstimate();
    if (!estimate) return;
    resultKg.textContent = formatKg(estimate.totalKg);
    renderBreakdown(estimate.breakdown);
    renderPackage(estimate);
    const packageDescription = estimate.lines.map((line) => `${line.units} ${formatData[line.key].label}`).join(" + ");
    const message = `Hola, quiero cotizar ${packageDescription} (${estimate.coveredKg} kg cubiertos) para ${estimate.people} personas. Necesito aprox. ${estimate.totalKg} kg. Uso: ${selectedLabel("occasion")}. Duración: ${estimate.hours} h. Bebidas: ${selectedLabel("beverages")}. Lugar: ${selectedLabel("location")}. Enfriar botellas: ${coolingInput.checked ? "Sí" : "No"}. Hielo para vasos: ${glassesInput.checked ? "Sí" : "No"}.`;
    quoteLink.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
    if (showStatus) formStatus.textContent = "Estimación actualizada. Confirma los detalles con Monacua.";
  }

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Abrir menú" : "Cerrar menú");
    mobileMenu?.classList.toggle("is-open", !open);
  });
  menuLinks.forEach((link) => link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    mobileMenu?.classList.remove("is-open");
  }));

  document.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      selectChoice(button);
      updateResult(true);
    });
  });
  packageOptions.forEach((button) => {
    button.addEventListener("click", () => {
      formatInput.value = button.dataset.formatChoice;
      syncFormatChoice(formatInput.value);
      updateResult(true);
    });
  });
  packageLines?.addEventListener("click", (event) => {
    const button = event.target.closest(".quantity-button");
    if (!button) return;
    const format = formatInput.value || "recommend";
    packageAdjustments[format] ||= {};
    const key = button.dataset.lineKey;
    packageAdjustments[format][key] = (packageAdjustments[format][key] || 0) + Number(button.dataset.step);
    updateResult(true);
  });
  peopleRange?.addEventListener("input", () => {
    setPeople(peopleRange.value);
    updateResult();
  });
  peopleInput?.addEventListener("input", () => {
    const people = clampPeople(peopleInput.value);
    if (people !== null && people >= 1 && people <= 10000) {
      setPeople(people);
      updateResult();
    }
  });
  durationRange?.addEventListener("input", () => {
    syncDuration(durationRange.value);
    updateResult();
  });
  [settingInput, durationInput, coolingInput].forEach((control) => control?.addEventListener("change", () => updateResult(true)));
  formatInput?.addEventListener("change", () => {
    syncFormatChoice(formatInput.value);
    updateResult(true);
  });
  copyLinkButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(quoteLink.href);
      formStatus.textContent = "Enlace de cotización copiado.";
    } catch {
      formStatus.textContent = "No se pudo copiar el enlace. Usa el botón de WhatsApp para continuar.";
    }
  });
  cartButton?.addEventListener("click", () => {
    cartButton.textContent = "Configuración guardada ✓";
    cartButton.classList.add("is-confirmed");
    formStatus.textContent = "La configuración quedó lista para cotizar.";
  });
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    updateResult(true);
  });

  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
  } else {
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
  }

  setPeople(peopleInput.value);
  syncDuration(durationRange.value);
  syncFormatChoice(formatInput.value);
  updateResult();
})();
