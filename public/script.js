/* ===================================
   MLS Premium Portfolio - JavaScript
   =================================== */

// ===================================
// DOM Elements
// ===================================
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const metricNumbers = document.querySelectorAll(".metric-number");
const filterSelects = document.querySelectorAll(".filter-select");
const filterReset = document.getElementById("filterReset");
const stoneGrid = document.getElementById("stoneGrid");
const stoneCards = document.querySelectorAll(".stone-card");
const noResults = document.getElementById("noResults");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const compareCheckboxes = document.querySelectorAll(".compare-checkbox");
const compareBar = document.getElementById("compareBar");
const compareCount = document.getElementById("compareCount");
const compareBtn = document.getElementById("compareBtn");
const stoneModal = document.getElementById("stoneModal");
const compareModal = document.getElementById("compareModal");
const modalClose = document.getElementById("modalClose");
const compareModalClose = document.getElementById("compareModalClose");
const modalBody = document.getElementById("modalBody");
const compareGrid = document.getElementById("compareGrid");
const quickViewButtons = document.querySelectorAll(".stone-quick-view");
const contactForm = document.getElementById("contactForm");
let eventListenersInitialized = false;
let smoothScrollInitialized = false;

// ===================================
// Stone Data
// ===================================
const stoneData = {
  "makrana-white": {
    name: "Makrana White Marble",
    type: "Marble",
    origin: "Makrana, Rajasthan, India",
    color: "Pure White with subtle grey veining",
    dimensions: "60x60cm, 80x80cm, 120x60cm, Custom",
    finishes: ["Polished", "Honed", "Brushed"],
    applications: ["Flooring", "Wall Cladding", "Countertops", "Monuments"],
    durability: "9/10",
    maintenance: "Low - Regular sealing recommended",
    priceTier: "Premium",
    density: "2.71 g/cm³",
    waterAbsorption: "0.10%",
    compressiveStrength: "110 MPa",
    installGuide:
      "Professional installation recommended. Use white adhesive to prevent discoloration.",
    textureClass: "marble",
  },
  "black-galaxy": {
    name: "Black Galaxy Granite",
    type: "Granite",
    origin: "Ongole, Andhra Pradesh, India",
    color: "Deep Black with golden/copper flecks",
    dimensions: "60x60cm, 80x80cm, 120x60cm, Custom Slabs",
    finishes: ["Polished", "Leathered", "Flamed"],
    applications: ["Countertops", "Flooring", "Facades", "Staircases"],
    durability: "10/10",
    maintenance: "Very Low - Occasional cleaning",
    priceTier: "Premium",
    density: "2.87 g/cm³",
    waterAbsorption: "0.05%",
    compressiveStrength: "180 MPa",
    installGuide:
      "Suitable for high-traffic areas. Use grey or black adhesive.",
    textureClass: "granite-black",
  },
  "jodhpur-beige": {
    name: "Jodhpur Beige Sandstone",
    type: "Sandstone",
    origin: "Jodhpur, Rajasthan, India",
    color: "Warm Beige with natural variations",
    dimensions: "30x30cm, 60x60cm, 90x60cm, Irregular",
    finishes: ["Natural", "Honed", "Bush-hammered"],
    applications: ["Exterior Cladding", "Landscaping", "Pathways", "Facades"],
    durability: "7/10",
    maintenance: "Medium - Sealing recommended for exterior use",
    priceTier: "Standard",
    density: "2.35 g/cm³",
    waterAbsorption: "2.5%",
    compressiveStrength: "65 MPa",
    installGuide: "Ideal for dry climates. Apply sealant before grouting.",
    textureClass: "sandstone",
  },
  "ambaji-beige": {
    name: "Ambaji Beige Marble",
    type: "Marble",
    origin: "Ambaji, Gujarat, India",
    color: "Cream Beige with light brown veining",
    dimensions: "60x60cm, 80x80cm, 120x60cm",
    finishes: ["Polished", "Honed"],
    applications: ["Interior Flooring", "Wall Cladding", "Bathroom"],
    durability: "7/10",
    maintenance: "Medium - Regular cleaning and sealing",
    priceTier: "Standard",
    density: "2.65 g/cm³",
    waterAbsorption: "0.25%",
    compressiveStrength: "95 MPa",
    installGuide: "Use white adhesive. Suitable for residential interiors.",
    textureClass: "marble-beige",
  },
  "steel-grey": {
    name: "Steel Grey Granite",
    type: "Granite",
    origin: "Hosur, Karnataka, India",
    color: "Silver Grey with dark mineral deposits",
    dimensions: "60x60cm, 80x80cm, Large Slabs",
    finishes: ["Polished", "Flamed", "Leathered"],
    applications: ["Kitchen Countertops", "Commercial Flooring", "Staircases"],
    durability: "10/10",
    maintenance: "Very Low - Stain resistant",
    priceTier: "Standard",
    density: "2.75 g/cm³",
    waterAbsorption: "0.08%",
    compressiveStrength: "165 MPa",
    installGuide: "Excellent for heavy-use areas. Grey adhesive recommended.",
    textureClass: "granite-grey",
  },
  "kota-lime": {
    name: "Kota Limestone",
    type: "Limestone",
    origin: "Kota, Rajasthan, India",
    color: "Blue-Grey with natural patterns",
    dimensions: "30x30cm, 60x30cm, 60x60cm",
    finishes: ["Natural", "Honed", "Polished"],
    applications: ["Flooring", "Exterior Paving", "Pool Surrounds"],
    durability: "8/10",
    maintenance: "Low - Develops natural patina",
    priceTier: "Economy",
    density: "2.55 g/cm³",
    waterAbsorption: "1.8%",
    compressiveStrength: "80 MPa",
    installGuide:
      "Non-slip surface ideal for wet areas. Use standard adhesive.",
    textureClass: "limestone",
  },
  "indian-slate": {
    name: "Indian Black Slate",
    type: "Slate",
    origin: "Rajasthan, India",
    color: "Deep Black with natural cleft texture",
    dimensions: "30x30cm, 60x30cm, Irregular",
    finishes: ["Natural Cleft", "Honed", "Calibrated"],
    applications: ["Flooring", "Roofing", "Landscaping", "Feature Walls"],
    durability: "8/10",
    maintenance: "Low - Natural resilience",
    priceTier: "Economy",
    density: "2.70 g/cm³",
    waterAbsorption: "0.4%",
    compressiveStrength: "100 MPa",
    installGuide:
      "Allow for natural thickness variation. Flexible adhesive recommended.",
    textureClass: "slate",
  },
  "dholpur-pink": {
    name: "Dholpur Pink Sandstone",
    type: "Sandstone",
    origin: "Dholpur, Rajasthan, India",
    color: "Soft Pink with warm undertones",
    dimensions: "30x30cm, 60x60cm, Custom sizes",
    finishes: ["Natural", "Honed", "Shot-blasted"],
    applications: ["Heritage Buildings", "Exterior Cladding", "Monuments"],
    durability: "7/10",
    maintenance: "Medium - Weather sealing recommended",
    priceTier: "Standard",
    density: "2.32 g/cm³",
    waterAbsorption: "3.0%",
    compressiveStrength: "55 MPa",
    installGuide:
      "Famous for Red Fort construction. Ideal for heritage restorations.",
    textureClass: "sandstone-pink",
  },
};

// ===================================
// Navigation
// ===================================
let lastNavScrollY = window.scrollY || window.pageYOffset || 0;
let navScrollTicking = false;
const navDirectionThreshold = 10;

function setNavVisibility(isVisible) {
  if (!nav) return;

  nav.classList.toggle("nav-visible", isVisible);
  nav.classList.toggle("nav-hidden", !isVisible);
}

function handleNavScroll() {
  if (!nav) return;

  const currentScrollY = window.scrollY || window.pageYOffset || 0;

  if (currentScrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  if (navMenu && navMenu.classList.contains("active")) {
    setNavVisibility(true);
    lastNavScrollY = currentScrollY;
    navScrollTicking = false;
    return;
  }

  if (currentScrollY <= 50) {
    setNavVisibility(true);
    lastNavScrollY = currentScrollY;
    navScrollTicking = false;
    return;
  }

  const scrollDelta = currentScrollY - lastNavScrollY;

  if (Math.abs(scrollDelta) >= navDirectionThreshold) {
    setNavVisibility(scrollDelta < 0);
    lastNavScrollY = currentScrollY;
  }

  navScrollTicking = false;
}

function onNavScroll() {
  if (!nav || navScrollTicking) return;

  navScrollTicking = true;
  window.requestAnimationFrame(handleNavScroll);
}

// Mobile menu toggle
function toggleMobileMenu() {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains("active")
    ? "hidden"
    : "";
}

// Handle mobile dropdowns
const dropdownItems = document.querySelectorAll(".nav-item-dropdown");

dropdownItems.forEach((dropdown) => {
  const link = dropdown.querySelector(".nav-link");
  if (link) {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default anchor click behavior

      // Close other open dropdowns
      dropdownItems.forEach((item) => {
        if (item !== dropdown) {
          item.classList.remove("active");
        }
      });

      // Toggle the clicked dropdown
      dropdown.classList.toggle("active");
    });
  }
});

// Close mobile menu on link click (except dropdown toggles)
navLinks.forEach((link) => {
  if (link.parentElement.classList.contains("nav-item-dropdown")) return;

  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";

    // Close any open dropdowns when menu closes
    dropdownItems.forEach((item) => item.classList.remove("active"));
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-item-dropdown")) {
    dropdownItems.forEach((item) => item.classList.remove("active"));
  }
});

// ===================================
// Animated Counter
// ===================================
function animateCounter(element) {
  const target = parseInt(element.dataset.count);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += step;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Intersection Observer for counters
function initCounterAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  metricNumbers.forEach((counter) => observer.observe(counter));
}

// ===================================
// Premium Stats Counter Animation
// ===================================
function animatePremiumCounter(element) {
  if (element.dataset.animated === "1") return;
  element.dataset.animated = "1";

  const target = parseInt(element.dataset.target, 10);
  if (isNaN(target)) return;

  const suffixEl =
    element.nextElementSibling &&
    element.nextElementSibling.classList.contains("stat-plus")
      ? element.nextElementSibling
      : null;

  const duration =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches
      ? 1400
      : 2000;
  const startTime = performance.now();

  const easeOutQuad = (t) => t * (2 - t);

  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const current = Math.floor(easedProgress * target);

    element.textContent = current;
    if (suffixEl) suffixEl.style.visibility = "visible";

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(updateCounter);
}

function initPremiumStatsAnimation() {
  const premiumStats = document.querySelectorAll(
    ".stat-card-premium .stat-number[data-target]",
  );

  if (premiumStats.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animatePremiumCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25, rootMargin: "0px 0px -50px 0px" },
  );

  premiumStats.forEach((stat) => observer.observe(stat));
}

// ===================================
// Timeline: horizontal years, story on hover
// ===================================
function initTimelineAnimation() {
  const timeline = document.getElementById("timeline");
  const storyPanel = document.getElementById("timelineStory");
  const storyTitle = document.getElementById("timelineStoryTitle");
  const storyDesc = document.getElementById("timelineStoryDesc");

  if (!timeline || !storyPanel || !storyTitle || !storyDesc) return;

  const items = timeline.querySelectorAll(".timeline-item");
  const firstItem = items[0];

  function showStory(item) {
    const content = item.querySelector(".timeline-content");
    if (!content) return;
    const h4 = content.querySelector("h4");
    const p = content.querySelector("p");
    storyTitle.textContent = h4 ? h4.textContent : "";
    storyDesc.textContent = p ? p.textContent : "";
    items.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
    storyPanel.classList.remove("flash");
    storyPanel.offsetHeight; // reflow
    storyPanel.classList.add("flash");
    setTimeout(() => storyPanel.classList.remove("flash"), 350);
  }

  function showFirst() {
    if (firstItem) showStory(firstItem);
  }

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => showStory(item));
    item.addEventListener("focus", () => showStory(item));
  });

  timeline.addEventListener("mouseleave", showFirst);

  // Initial: show first year's story
  showFirst();
}

// ===================================
// Stone Filtering
// ===================================

function getDummyImageColor(type, label) {
  let color = "b0b0b0",
    text = "cccccc";
  const t = type.toLowerCase();
  if (t.includes("sandstone")) {
    color = "d4c5a0";
    text = "e8dcb8";
  } else if (t.includes("limestone")) {
    color = "7e8b92";
    text = "9aaab3";
  } else if (t.includes("granite")) {
    color = "3a3a3a";
    text = "555555";
  } else if (t.includes("block")) {
    color = "8b7355";
    text = "a68a66";
  } else if (t.includes("marble")) {
    color = "f4f4f4";
    text = "aaaaaa";
  }
  return `https://placehold.co/600x400/${color}/${text}?text=${label}`;
}

function filterStones() {
  const typeEl = document.getElementById("filterType");
  const colorEl = document.getElementById("filterColor");
  if (!typeEl || !colorEl) return;
  const typeFilter = typeEl.value;
  const colorFilter = colorEl.value;
  const applicationFilter =
    (document.getElementById("filterApplication") || {}).value || "all";
  const priceFilter =
    (document.getElementById("filterPrice") || {}).value || "all";

  const cards = document.querySelectorAll(".stone-card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const type = card.dataset.type;
    const color = card.dataset.color;
    const applications = card.dataset.application;
    const price = card.dataset.price;

    const matchType = typeFilter === "all" || type === typeFilter;
    const matchColor = colorFilter === "all" || color === colorFilter;
    const matchApplication =
      applicationFilter === "all" || applications.includes(applicationFilter);
    const matchPrice = priceFilter === "all" || price === priceFilter;

    if (matchType && matchColor && matchApplication && matchPrice) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  // Show/hide no results message (only on stones page with filter UI)
  if (noResults) noResults.classList.toggle("visible", visibleCount === 0);
  if (stoneGrid) stoneGrid.style.display = visibleCount === 0 ? "none" : "grid";

  const totalCountEl = document.getElementById("stoneTotalCount");
  const visibleCountEl = document.getElementById("stoneVisibleCount");
  const activeFiltersEl = document.getElementById("stoneActiveFilters");
  const totalCards = cards.length;
  const activeFilters = [];

  if (typeFilter !== "all") activeFilters.push(typeEl.options[typeEl.selectedIndex].text);
  if (colorFilter !== "all") activeFilters.push(colorEl.options[colorEl.selectedIndex].text);

  const applicationEl = document.getElementById("filterApplication");
  if (applicationFilter !== "all" && applicationEl) {
    activeFilters.push(applicationEl.options[applicationEl.selectedIndex].text);
  }

  const priceEl = document.getElementById("filterPrice");
  if (priceFilter !== "all" && priceEl) {
    activeFilters.push(priceEl.options[priceEl.selectedIndex].text);
  }

  if (totalCountEl) totalCountEl.textContent = String(totalCards);
  if (visibleCountEl) visibleCountEl.textContent = String(visibleCount);
  if (activeFiltersEl) {
    activeFiltersEl.textContent =
      activeFilters.length > 0
        ? `Active filters: ${activeFilters.join(" / ")}`
        : "Showing the full curated collection.";
  }
}

function resetFilters() {
  filterSelects.forEach((select) => {
    select.value = "all";
  });
  filterStones();

  // Clear compare selections
  compareCheckboxes.forEach((cb) => {
    cb.checked = false;
  });
  updateCompareCount();
}

// ===================================
// Stone Comparison
// ===================================
function updateCompareCount() {
  const selected = document.querySelectorAll(".compare-checkbox:checked");
  const count = selected.length;
  if (compareCount) compareCount.textContent = count;
  if (compareBtn) compareBtn.disabled = count < 2;

  // Limit to 2 selections for a clean side-by-side comparison
  if (count >= 2) {
    compareCheckboxes.forEach((cb) => {
      if (!cb.checked) {
        cb.disabled = true;
      }
    });
  } else {
    compareCheckboxes.forEach((cb) => {
      cb.disabled = false;
    });
  }
}

function getStoneCardData(stoneId) {
  const checkbox = document.querySelector(
    `.compare-checkbox[data-stone="${stoneId}"]`,
  );
  const card = checkbox ? checkbox.closest(".stone-card") : null;

  if (!card) return null;

  const nameEl = card.querySelector(".stone-name");
  const typeEl = card.querySelector(".stone-type");
  const imgEl = card.querySelector(".stone-image img");
  const specs = Array.from(card.querySelectorAll(".spec-brief")).map((el) =>
    el.textContent.trim(),
  );

  const readSpec = (prefix) => {
    const match = specs.find((value) => value.startsWith(prefix));
    return match ? match.replace(prefix, "").trim() : "Available on request";
  };

  return {
    id: stoneId,
    name: nameEl ? nameEl.textContent.trim() : "Stone",
    type: typeEl ? typeEl.textContent.trim() : "Stone",
    origin: readSpec("Origin: "),
    applications: readSpec("Use: "),
    dimensions: readSpec("Size: "),
    image: imgEl ? imgEl.getAttribute("src") : getDummyImageColor("stone", "Stone"),
    priceTier:
      card.dataset.price === "premium"
        ? "Premium"
        : card.dataset.price === "standard"
          ? "Standard"
          : "On Request",
    finishes: "Available on request",
    durability: "Available on request",
    maintenance: "Available on request",
    density: "Available on request",
    waterAbsorption: "Available on request",
  };
}

function normalizeStoneForCompare(stoneId) {
  let sourceStone = null;

  if (typeof window.getAllStones === "function") {
    const allStones = window.getAllStones();
    sourceStone = allStones.find((stone) => stone.id === stoneId) || null;
  }

  if (!sourceStone && stoneData[stoneId]) {
    sourceStone = stoneData[stoneId];
  }

  if (!sourceStone) {
    return getStoneCardData(stoneId);
  }

  const specs = sourceStone.specs || {};

  return {
    id: stoneId,
    name: sourceStone.name || "Stone",
    type:
      sourceStone.type ||
      specs.Category ||
      getStoneCardData(stoneId)?.type ||
      "Stone",
    origin: sourceStone.origin || "Available on request",
    applications:
      Array.isArray(sourceStone.applications)
        ? sourceStone.applications.join(", ")
        : sourceStone.applications || "Available on request",
    dimensions:
      sourceStone.dimensions ||
      sourceStone.sizes ||
      getStoneCardData(stoneId)?.dimensions ||
      "Available on request",
    image:
      sourceStone.image ||
      getStoneCardData(stoneId)?.image ||
      getDummyImageColor(sourceStone.type || "stone", sourceStone.name || "Stone"),
    priceTier:
      sourceStone.priceTier ||
      (getStoneCardData(stoneId) ? getStoneCardData(stoneId).priceTier : "On Request"),
    finishes:
      Array.isArray(sourceStone.finishes)
        ? sourceStone.finishes.join(", ")
        : sourceStone.finishes || "Available on request",
    durability:
      sourceStone.durability ||
      specs.Durability ||
      "Available on request",
    maintenance:
      sourceStone.maintenance ||
      "Available on request",
    density:
      sourceStone.density ||
      specs.Density ||
      "Available on request",
    waterAbsorption:
      sourceStone.waterAbsorption ||
      specs["Water Absorption"] ||
      "Available on request",
  };
}

function formatCompareText(value) {
  if (!value) return "Available on request";
  return String(value)
    .replace(/\s*·\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
}

function showCompareModal() {
  const selected = Array.from(
    document.querySelectorAll(".compare-checkbox:checked"),
  ).slice(0, 2);
  const compareSubtitle = document.getElementById("compareSubtitle");

  if (selected.length < 2 || !compareModal || !compareGrid) return;

  if (compareSubtitle) {
    compareSubtitle.textContent =
      "A row-by-row view of the two selected stones for easier comparison.";
  }

  const stones = selected
    .map((cb) => normalizeStoneForCompare(cb.dataset.stone))
    .filter(Boolean);

  if (stones.length < 2) {
    if (compareSubtitle) {
      compareSubtitle.textContent = "Please choose other stones to continue the comparison.";
    }
    compareGrid.innerHTML = `
      <div class="compare-item" style="grid-column: 1 / -1;">
        <h4 class="compare-stone-name">Comparison data unavailable</h4>
        <p>Please try selecting other stones, or open the stone details for a full specification view.</p>
      </div>
    `;
    compareModal.classList.add("active");
    document.body.style.overflow = "hidden";
    return;
  }

  const rows = [
    ["Type", stones[0].type, stones[1].type],
    ["Origin", stones[0].origin, stones[1].origin],
    ["Applications", stones[0].applications, stones[1].applications],
    ["Dimensions", stones[0].dimensions, stones[1].dimensions],
    ["Price Tier", stones[0].priceTier, stones[1].priceTier],
    ["Finishes", stones[0].finishes, stones[1].finishes],
    ["Durability", stones[0].durability, stones[1].durability],
    ["Water Absorption", stones[0].waterAbsorption, stones[1].waterAbsorption],
  ];

  const renderStoneSummary = (stone) => `
    <div class="compare-stone-summary">
      <div class="compare-stone-figure">
        <img src="${stone.image}" alt="${stone.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${getDummyImageColor(stone.type, stone.type)}'">
      </div>
      <div class="compare-stone-meta">
        <span class="compare-stone-kicker">${stone.type}</span>
        <h4 class="compare-stone-name">${stone.name}</h4>
        <p class="compare-stone-origin">${stone.origin.split(",")[0]}</p>
      </div>
    </div>
  `;

  const rowsHtml = rows
    .map(
      ([label, leftValue, rightValue]) => `
        <div class="compare-table-row">
          <div class="compare-row-label">${label}</div>
          <div class="compare-row-value"><p>${formatCompareText(leftValue)}</p></div>
          <div class="compare-row-value"><p>${formatCompareText(rightValue)}</p></div>
        </div>
      `,
    )
    .join("");

  compareGrid.innerHTML = `
    <div class="compare-dashboard">
      <div class="compare-table-row compare-table-head">
        <div class="compare-row-label compare-row-label-head">Specification</div>
        <div class="compare-row-value compare-row-value-head">${renderStoneSummary(stones[0])}</div>
        <div class="compare-row-value compare-row-value-head">${renderStoneSummary(stones[1])}</div>
      </div>
      ${rowsHtml}
    </div>
  `;
  compareModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// ===================================
// Stone Detail Modal
// ===================================
function showStoneDetail(stoneId) {
  const stone = stoneData[stoneId];

  if (!stone) return;

  const html = `
        <div class="stone-detail">
            <div class="stone-detail-image">
                <img src="${getDummyImageColor(stone.type, stone.type)}" alt="${stone.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="stone-detail-info">
                <h2>${stone.name}</h2>
                <div class="stone-detail-type">${stone.type}</div>
                
                <div class="stone-detail-specs">
                    <div class="spec-row">
                        <span class="spec-label">Origin</span>
                        <span class="spec-value">${stone.origin}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Color</span>
                        <span class="spec-value">${stone.color}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Dimensions</span>
                        <span class="spec-value">${stone.dimensions}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Finishes</span>
                        <span class="spec-value">${stone.finishes.join(
                          ", ",
                        )}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Applications</span>
                        <span class="spec-value">${stone.applications.join(
                          ", ",
                        )}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Durability</span>
                        <span class="spec-value">${stone.durability}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Maintenance</span>
                        <span class="spec-value">${stone.maintenance}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Price Tier</span>
                        <span class="spec-value">${stone.priceTier}</span>
                    </div>
                </div>
                
                <h4 style="margin-bottom: 12px; margin-top: 24px;">Technical Specifications</h4>
                <div class="stone-detail-specs">
                    <div class="spec-row">
                        <span class="spec-label">Density</span>
                        <span class="spec-value">${stone.density}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Water Absorption</span>
                        <span class="spec-value">${stone.waterAbsorption}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Compressive Strength</span>
                        <span class="spec-value">${
                          stone.compressiveStrength
                        }</span>
                    </div>
                </div>
                
                <h4 style="margin-bottom: 12px; margin-top: 24px;">Installation Guide</h4>
                <p style="color: #666; line-height: 1.6; margin-bottom: 24px;">${
                  stone.installGuide
                }</p>
                
                <div class="stone-detail-actions">
                    <button class="btn btn-primary" onclick="downloadSpec('${stoneId}')">Download Spec Sheet</button>
                    <a href="#contact" class="btn btn-secondary" onclick="closeModal()">Request Sample</a>
                </div>
            </div>
        </div>
    `;

  modalBody.innerHTML = html;
  stoneModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Download spec sheet (simulated)
function downloadSpec(stoneId) {
  const stone = stoneData[stoneId];
  if (!stone) return;

  // Create spec sheet content
  const content = `
STONE SPECIFICATION SHEET
========================

Name: ${stone.name}
Type: ${stone.type}
Origin: ${stone.origin}

COLOR & APPEARANCE
------------------
${stone.color}

AVAILABLE DIMENSIONS
--------------------
${stone.dimensions}

FINISH OPTIONS
--------------
${stone.finishes.join("\n")}

RECOMMENDED APPLICATIONS
------------------------
${stone.applications.join("\n")}

TECHNICAL SPECIFICATIONS
------------------------
Durability Rating: ${stone.durability}
Maintenance Level: ${stone.maintenance}
Price Tier: ${stone.priceTier}
Density: ${stone.density}
Water Absorption: ${stone.waterAbsorption}
Compressive Strength: ${stone.compressiveStrength}

INSTALLATION GUIDELINES
-----------------------
${stone.installGuide}

---
Mohanlal & Sons
Kota, Rajasthan, India
Contact: +91 98285 81143
Email: info@mohanlalsons.com
    `;

  // Create and trigger download
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${stoneId}-specification.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Close modals
function closeModal() {
  if (stoneModal) stoneModal.classList.remove("active");
  if (compareModal) compareModal.classList.remove("active");
  document.body.style.overflow = "";
}

// ===================================
// Contact Form
// ===================================
function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const interest = formData.get("interest");
  const message = formData.get("message");

  // Basic validation
  if (!name || !email || !phone || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Phone validation (basic)
  const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  // Success message (in real implementation, this would send to server)
  alert(
    `Thank you, ${name}! Your message has been received. We'll get back to you soon.`,
  );
  contactForm.reset();
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".property-card, .stone-card, .value-item, .dining-card",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(30px)";

          setTimeout(() => {
            entry.target.style.transition =
              "opacity 0.6s ease, transform 0.6s ease";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  animatedElements.forEach((el) => {
    // Skip elements already initialized to avoid race conditions from duplicate calls
    if (el.dataset.scrollInit) return;
    el.dataset.scrollInit = "1";
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    observer.observe(el);
  });
}

// ===================================
// Smooth Scroll
// ===================================
function initSmoothScroll() {
  if (smoothScrollInitialized) return;
  smoothScrollInitialized = true;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") {
        e.preventDefault();
        return;
      }
      
      try {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80; // Account for fixed nav
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      } catch (err) {
        // Ignore invalid selectors like '#/' or others that fail querySelector
      }
    });
  });
}

// ===================================
// Event Listeners
// ===================================
function initEventListeners() {
  if (eventListenersInitialized) return;
  eventListenersInitialized = true;

  // Navigation scroll
  if (nav) {
    setNavVisibility(true);
    handleNavScroll();
    window.addEventListener("scroll", onNavScroll, { passive: true });
  }

  // Load cart on page load
  loadCart();

  // Listen for storage events to sync cart across tabs
  window.addEventListener("storage", (e) => {
    if (e.key === "mls_cart") {
      if (e.newValue) {
        cartState = JSON.parse(e.newValue);
      } else {
        cartState = { stones: [] };
      }
      updateCartUI();
      updateSaveButtonStates();
    }
  });

  // Mobile menu
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", toggleMobileMenu);
  }

  // Stone filters (only on stones page)
  if (filterSelects && filterSelects.length > 0) {
    filterSelects.forEach((select) => {
      select.addEventListener("change", filterStones);
    });
    filterStones();
  }

  // Reset filters
  if (filterReset) {
    filterReset.addEventListener("click", resetFilters);
  }
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", resetFilters);
  }

  // Compare checkboxes
  if (compareCheckboxes && compareCheckboxes.length > 0) {
    compareCheckboxes.forEach((cb) => {
      cb.addEventListener("change", updateCompareCount);
    });
  }

  // Compare button
  if (compareBtn) {
    compareBtn.addEventListener("click", showCompareModal);
  }

  // Quick view buttons
  if (quickViewButtons && quickViewButtons.length > 0) {
    quickViewButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        showStoneDetail(btn.dataset.stone);
      });
    });
  }

  // Modal close buttons
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }
  if (compareModalClose) {
    compareModalClose.addEventListener("click", closeModal);
  }

  // Close modal on backdrop click
  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", closeModal);
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Contact form listener removed - handled by specific handler at bottom of file
}

// ===================================
// Stone Cart System
// ===================================

// API base URL. Use same origin so frontend and backend run on one server.
// Override with window.MLS_API_BASE before this script only if API is on another origin (e.g. production).
const API_BASE =
  typeof window !== "undefined" &&
  window.MLS_API_BASE != null &&
  window.MLS_API_BASE !== ""
    ? window.MLS_API_BASE
    : window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ? window.location.origin
      : "";

// Generate or get user ID
function getUserId() {
  let userId = localStorage.getItem("mls_user_id");
  if (!userId) {
    userId =
      "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("mls_user_id", userId);
  }
  return userId;
}

// Cart state
let cartState = { stones: [] };

// DOM Elements for cart
const floatingCartBtn = document.getElementById("floatingCartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartFooter = document.getElementById("cartFooter");
const cartCount = document.getElementById("cartCount");
const sendInquiryBtn = document.getElementById("sendInquiryBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
const inquiryModal = document.getElementById("inquiryModal");
const inquiryModalClose = document.getElementById("inquiryModalClose");
const inquiryForm = document.getElementById("inquiryForm");
const inquiryStonesPreview = document.getElementById("inquiryStonesPreview");
const stoneAddCartBtns = document.querySelectorAll(".stone-add-cart");

// Load cart from API
async function loadCart() {
  try {
    const response = await fetch(`${API_BASE}/api/cart/${getUserId()}`);
    if (response.ok) {
      cartState = await response.json();
      updateCartUI();
      updateSaveButtonStates();
    } else {
      throw new Error("API Error");
    }
  } catch (error) {
    console.log("Cart API not available, using local storage");
    // Fallback to localStorage
    const saved = localStorage.getItem("mls_cart");
    if (saved) {
      cartState = JSON.parse(saved);
      updateCartUI();
      updateSaveButtonStates();
    }
  }
}

// Save to cart
async function addToCart(stoneId, stoneName, stoneType, priceTier, stoneImage) {
  try {
    const response = await fetch(`${API_BASE}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: getUserId(),
        stoneId,
        stoneName,
        stoneType,
        priceTier,
        stoneImage: stoneImage || "",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      cartState =
        data && data.cart ? data.cart : { stones: cartState.stones || [] };
      updateCartUI();
      updateSaveButtonStates();
      if (typeof showToast === "function") showToast("Stone saved!");
    } else {
      throw new Error("API Error");
    }
  } catch (error) {
    // Fallback to localStorage
    try {
      if (!cartState.stones) cartState.stones = [];
      if (!cartState.stones.find((s) => s.stoneId === stoneId)) {
        cartState.stones.push({
          stoneId,
          stoneName,
          stoneType,
          priceTier,
          stoneImage: stoneImage || "",
          addedAt: new Date().toISOString(),
        });
        localStorage.setItem("mls_cart", JSON.stringify(cartState));
        if (typeof showToast === "function") showToast("Stone saved!");
      }
    } finally {
      updateCartUI();
      updateSaveButtonStates();
    }
  }
}

// Remove from cart
async function removeFromCart(stoneId) {
  try {
    const response = await fetch(
      `${API_BASE}/api/cart/${getUserId()}/${stoneId}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      const data = await response.json();
      cartState = data.cart;
      updateCartUI();
      updateSaveButtonStates();
    } else {
      throw new Error("API Error");
    }
  } catch (error) {
    // Fallback to localStorage
    cartState.stones = cartState.stones.filter((s) => s.stoneId !== stoneId);
    localStorage.setItem("mls_cart", JSON.stringify(cartState));
    updateCartUI();
    updateSaveButtonStates();
  }
}

// Clear cart
async function clearCart() {
  try {
    const response = await fetch(`${API_BASE}/api/cart/${getUserId()}`, {
      method: "DELETE",
    });

    if (response.ok) {
      cartState = { stones: [] };
      updateCartUI();
      updateSaveButtonStates();
    } else {
      throw new Error("API Error");
    }
  } catch (error) {
    cartState = { stones: [] };
    localStorage.setItem("mls_cart", JSON.stringify(cartState));
    updateCartUI();
    updateSaveButtonStates();
  }
}

// Update cart UI
function updateCartUI() {
  const stones = cartState && cartState.stones ? cartState.stones : [];
  const count = stones.length;

  // Update count badge
  if (cartCount) {
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? "flex" : "none";
  }

  // Update cart items
  if (cartItems && cartEmpty && cartFooter) {
    if (count === 0) {
      cartItems.style.display = "none";
      cartEmpty.style.display = "flex";
      cartFooter.style.display = "none";
    } else {
      cartItems.style.display = "block";
      cartEmpty.style.display = "none";
      cartFooter.style.display = "flex";

      // Render cart items
      cartItems.innerHTML = stones
        .map((stone) => {
          const imgSrc =
            stone.stoneImage ||
            getDummyImageColor(
              stone.stoneType || "stone",
              stone.stoneType || "stone",
            );
          return `
        <div class="cart-item" data-stone="${stone.stoneId}">
          <div class="cart-item-image">
            <img src="${imgSrc}" alt="${stone.stoneName}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${getDummyImageColor(stone.stoneType || "stone", stone.stoneType || "stone")}'">
          </div>
          <div class="cart-item-info">
            <h4>${stone.stoneName}</h4>
            <span>${stone.stoneType} • ${stone.priceTier}</span>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${stone.stoneId}')">×</button>
        </div>
      `;
        })
        .join("");
    }
  }
}

// Get texture class for stone placeholder
function getTextureClass(stoneId) {
  const textureMap = {
    "makrana-white": "marble",
    "black-galaxy": "granite-black",
    "jodhpur-beige": "sandstone",
    "ambaji-beige": "marble-beige",
    "steel-grey": "granite-grey",
    "kota-lime": "limestone",
    "indian-slate": "slate",
    "dholpur-pink": "sandstone-pink",
  };
  return textureMap[stoneId] || "marble";
}

// Update save button states
function updateSaveButtonStates() {
  const stones = cartState && cartState.stones ? cartState.stones : [];
  document.querySelectorAll(".stone-add-cart").forEach((btn) => {
    const stoneId = btn.dataset.stone;
    const isSaved = stones.some((s) => s.stoneId === stoneId);
    btn.classList.toggle("added", isSaved);
    btn.textContent = isSaved ? "Added" : "Add to Cart";
  });
}

// Toggle cart sidebar
function toggleCartSidebar() {
  if (cartSidebar) {
    cartSidebar.classList.toggle("active");
    document.body.style.overflow = cartSidebar.classList.contains("active")
      ? "hidden"
      : "";
  }
}

// Close cart sidebar
function closeCartSidebar() {
  if (cartSidebar) {
    cartSidebar.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Show inquiry modal
function showInquiryModal() {
  if (inquiryModal && inquiryStonesPreview) {
    // Show selected stones
    inquiryStonesPreview.innerHTML = `
      <h4>Selected Stones (${cartState.stones.length})</h4>
      ${cartState.stones.map((s) => `<span class="inquiry-stone-tag">${s.stoneName}</span>`).join("")}
    `;

    closeCartSidebar();
    inquiryModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Close inquiry modal
function closeInquiryModal() {
  if (inquiryModal) {
    inquiryModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Submit inquiry
async function submitInquiry(e) {
  e.preventDefault();

  const formData = new FormData(inquiryForm);
  const data = {
    userId: getUserId(),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    stones: cartState.stones,
  };

  try {
    const response = await fetch(`${API_BASE}/api/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      showNotification(
        "success",
        "Inquiry Submitted!",
        "Thank you for your interest. Our team will get back to you with a quotation shortly.",
      );
      closeInquiryModal();
      cartState = { stones: [] };
      updateCartUI();
      updateSaveButtonStates();
      inquiryForm.reset();
      localStorage.removeItem("mls_cart"); // Clear local storage too
    } else {
      const err = await response.json().catch(() => ({}));
      showNotification(
        "error",
        "Submission Failed",
        (err.error || "Could not submit inquiry. Please try again.") +
          " Opening your email client so you can send the inquiry instead.",
      );
      // Fallback: open mailto so user can send inquiry by email when API is down or returns error
      const stoneNames = (cartState.stones || [])
        .map((s) => s.stoneName)
        .join(", ");
      const subject = encodeURIComponent("Stone Inquiry - Mohan Lal & Sons");
      const body = encodeURIComponent(
        "Name: " +
          (data.name || "") +
          "\nEmail: " +
          (data.email || "") +
          "\nPhone: " +
          (data.phone || "") +
          "\n\nSelected Stones: " +
          stoneNames +
          "\n\nMessage: " +
          (data.message || "N/A"),
      );
      setTimeout(function () {
        window.location.href =
          "mailto:dhaker.stone@gmail.com?subject=" + subject + "&body=" + body;
      }, 800);
    }
  } catch (error) {
    // Fallback - open email
    const stoneNames = (cartState.stones || [])
      .map((s) => s.stoneName)
      .join(", ");
    const subject = encodeURIComponent("Stone Inquiry - Mohan Lal & Sons");
    const body = encodeURIComponent(
      "Name: " +
        (data.name || "") +
        "\nEmail: " +
        (data.email || "") +
        "\nPhone: " +
        (data.phone || "") +
        "\n\nSelected Stones: " +
        stoneNames +
        "\n\nMessage: " +
        (data.message || "N/A"),
    );
    window.location.href =
      "mailto:dhaker.stone@gmail.com?subject=" + subject + "&body=" + body;
    closeInquiryModal();
  }
}

// Toast notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 24px;
    background: #333;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    z-index: 3000;
    animation: fadeIn 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// Initialize cart event listeners
function initCartEventListeners() {
  // Floating cart button
  if (floatingCartBtn) {
    floatingCartBtn.addEventListener("click", toggleCartSidebar);
  }

  // Cart close button
  if (cartClose) {
    cartClose.addEventListener("click", closeCartSidebar);
  }

  // Cart backdrop
  if (cartBackdrop) {
    cartBackdrop.addEventListener("click", closeCartSidebar);
  }

  // Save buttons (event delegation so dynamically added stone cards work)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".stone-add-cart");
    if (!btn) return;
    e.stopPropagation();
    const { stone, name, type, price } = btn.dataset;
    // Find the stone image from the card's img element
    const card = btn.closest(".stone-card");
    let stoneImage = "";
    if (card) {
      const img = card.querySelector(".stone-image img");
      if (img && img.src && !img.src.includes("placehold.co")) {
        stoneImage = img.src;
      }
    }
    if (btn.classList.contains("added")) {
      removeFromCart(stone);
    } else {
      addToCart(stone, name, type, price, stoneImage);
    }
  });

  // Send inquiry button
  if (sendInquiryBtn) {
    sendInquiryBtn.addEventListener("click", showInquiryModal);
  }

  // Clear cart button
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Clear all saved stones?")) {
        clearCart();
      }
    });
  }

  // Inquiry modal close
  if (inquiryModalClose) {
    inquiryModalClose.addEventListener("click", closeInquiryModal);
  }

  // Inquiry modal backdrop
  if (inquiryModal) {
    inquiryModal
      .querySelector(".modal-backdrop")
      ?.addEventListener("click", closeInquiryModal);
  }

  // Inquiry form submit
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", submitInquiry);
  }

  // Use a MutationObserver to watch for new stone cards being dynamically added (not text/attr changes to avoid loop)
  const mainGrid = document.getElementById("stoneGrid");
  if (mainGrid) {
    const observer = new MutationObserver((mutations) => {
      let addedCard = false;
      mutations.forEach((m) => {
        if (m.addedNodes.length === 0) return;
        for (let i = 0; i < m.addedNodes.length; i++) {
          const n = m.addedNodes[i];
          if (
            n.nodeType === 1 &&
            n.classList &&
            n.classList.contains("stone-card")
          ) {
            addedCard = true;
            break;
          }
        }
      });
      if (addedCard && typeof updateSaveButtonStates === "function") {
        updateSaveButtonStates();
      }
    });
    observer.observe(mainGrid, { childList: true, subtree: false });
  }
}

// ===================================
// Career Modal Functionality
// ===================================
function initCareerModal() {
  const openBtn = document.getElementById("openApplyModal");
  const modal = document.getElementById("careerModal");
  const closeBtn = document.getElementById("closeModal");
  const overlay = document.getElementById("modalOverlay");

  if (!openBtn || !modal) return;

  // Open modal
  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close modal
  function closeCareerModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeCareerModal);
  }

  if (overlay) {
    overlay.addEventListener("click", closeCareerModal);
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeCareerModal();
    }
  });
}

// ===================================
// Journey Accordion
// ===================================
function initJourneyAccordion() {
  const accordionItems = document.querySelectorAll(".journey-accordion-item");

  if (!accordionItems || accordionItems.length === 0) return;

  // Expand first item by default
  if (accordionItems[0]) {
    accordionItems[0].classList.add("expanded");
  }

  accordionItems.forEach((item) => {
    const header = item.querySelector(".journey-accordion-header");

    if (header) {
      header.addEventListener("click", () => {
        // Check if this item is already expanded
        const isExpanded = item.classList.contains("expanded");

        // Close all items
        accordionItems.forEach((i) => i.classList.remove("expanded"));

        // If it wasn't expanded, expand it
        if (!isExpanded) {
          item.classList.add("expanded");
        }
      });
    }
  });
}

// ===================================
// Initialize
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();

  // Only init counter if metric numbers exist
  if (metricNumbers && metricNumbers.length > 0) {
    initCounterAnimation();
  }

  initTimelineAnimation();
  initPremiumStatsAnimation();
  initScrollAnimations();
  initSmoothScroll();
  handleNavScroll(); // Initial check

  // Initialize cart system
  initCartEventListeners();
  loadCart();

  // Initialize career modal
  initCareerModal();

  // Initialize journey accordion
  initJourneyAccordion();
});

// Make functions available globally for inline onclick handlers
window.downloadSpec = downloadSpec;
window.closeModal = closeModal;
window.removeFromCart = removeFromCart;

// ===================================
// Vyanjanam Carousel Logic
// ===================================
function initCarousel() {
  const track = document.getElementById("carouselTrack");
  if (!track) return; // Exit if carousel not on page

  const slides = Array.from(track.children);
  const nextButton = document.getElementById("nextBtn");
  const prevButton = document.getElementById("prevBtn");
  const dotsNav = document.getElementById("carouselDots");

  if (!nextButton || !prevButton || !dotsNav) return;

  let currentIndex = 0;

  // Calculate items per view based on CSS
  function getItemsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  // Create dots
  const totalSlides = slides.length;
  dotsNav.innerHTML = ""; // Clear existing dots if any

  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
    dotsNav.appendChild(dot);
  });

  const dots = Array.from(dotsNav.children);

  function updateCarousel() {
    const itemsPerView = getItemsPerView();
    const maxIndex = totalSlides - itemsPerView;

    // Bounds check with loop
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex; // Jump to end

    // Ensure we don't go out of bounds if window resized causing maxIndex to change
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const slideWidth = slides[0].getBoundingClientRect().width;
    const amountToMove = slideWidth * currentIndex;
    track.style.transform = `translateX(-${amountToMove}px)`;

    // Update dots
    dots.forEach((d) => d.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");
  }

  nextButton.addEventListener("click", () => {
    currentIndex++;
    updateCarousel();
  });

  prevButton.addEventListener("click", () => {
    currentIndex--;
    updateCarousel();
  });

  window.addEventListener("resize", () => {
    // Reset to 0 or adjust to keep valid? Resetting is safer for now.
    // Or just update
    updateCarousel();
  });

  // Initial update
  setTimeout(updateCarousel, 100);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initCarousel);

// ===================================
// Custom Notification Modal
// ===================================
function showNotification(type, title, message) {
  const modal = document.getElementById("notificationModal");
  const icon = document.getElementById("notificationIcon");
  const titleEl = document.getElementById("notificationTitle");
  const messageEl = document.getElementById("notificationMessage");
  const closeBtn = document.getElementById("notificationClose");
  const backdrop = modal?.querySelector(".notification-backdrop");

  if (!modal) {
    // Fallback to alert if modal doesn't exist
    alert(message);
    return;
  }

  // Set icon type (success or error)
  icon.className = "notification-icon " + type;
  if (type === "success") {
    icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>`;
  } else {
    icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>`;
  }

  titleEl.textContent = title;
  messageEl.textContent = message;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Close handlers
  function closeNotification() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    closeBtn.removeEventListener("click", closeNotification);
    backdrop.removeEventListener("click", closeNotification);
  }

  closeBtn.addEventListener("click", closeNotification);
  backdrop.addEventListener("click", closeNotification);
}

// Contact Form Handler (index.html)
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    // Remove existing listeners if necessary (though DOMContentLoaded runs once)
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn
        ? submitBtn.textContent
        : "Send Message";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      // Get values from FormData
      const data = {
        name: formData.get("name")?.trim() || "",
        email: formData.get("email")?.trim() || "",
        phone: formData.get("phone")?.trim() || "",
        interest: formData.get("interest") || "General Inquiry",
        message: formData.get("message")?.trim() || "",
      };

      console.log("------------------------");
      console.log("Form Submission Debug:");
      console.log("Form Name Value:", data.name);
      console.log("Form Email Value:", data.email);
      console.log("Full Data Object:", data);
      console.log("------------------------");

      // Client-side validation check
      if (!data.name) {
        console.error("Validation Error: Name is empty");
        // If name is empty but user sees text, there's a UI issue
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          showNotification(
            "success",
            "Message Sent!",
            "Thank you for contacting us. We will get back to you within 24 hours.",
          );
          contactForm.reset();
        } else {
          console.error("Server error:", result);
          showNotification(
            "error",
            "Error",
            result.error || "Failed to send message. Please try again.",
          );
        }
      } catch (err) {
        console.error("Contact form error:", err);
        showNotification(
          "error",
          "Connection Error",
          "Failed to connect to server. Please check your internet connection and try again.",
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }
});

// Career Application Handler (if career modal exists)
document.addEventListener("DOMContentLoaded", function () {
  const careerForm =
    document.getElementById("careersForm") ||
    document.getElementById("careerForm"); // Handle both IDs just in case
  if (careerForm) {
    careerForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formDataObj = new FormData(careerForm);
      const submitBtn = careerForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn
        ? submitBtn.textContent
        : "Submit Application";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";
      }

      const data = {
        name:
          formDataObj.get("applicantName") ||
          document.getElementById("careerName")?.value ||
          "",
        email:
          formDataObj.get("applicantEmail") ||
          document.getElementById("careerEmail")?.value ||
          "",
        phone:
          formDataObj.get("applicantPhone") ||
          document.getElementById("careerPhone")?.value ||
          "",
        position:
          formDataObj.get("applyPosition") ||
          document.getElementById("careerPosition")?.value ||
          "General Application",
        experience:
          formDataObj.get("experience") ||
          document.getElementById("careerExperience")?.value ||
          "",
        message:
          formDataObj.get("coverLetter") ||
          document.getElementById("careerMessage")?.value ||
          "",
      };

      try {
        const response = await fetch("/api/career", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          showNotification(
            "success",
            "Application Submitted!",
            "Thank you for applying. We will review your application and get back to you within 7 business days.",
          );
          careerForm.reset();

          // Close modal if exists
          const careerModal = document.getElementById("careerModal");
          if (careerModal) {
            careerModal.classList.remove("active");
            document.body.style.overflow = "";
          }
        } else {
          showNotification(
            "error",
            "Error",
            result.error || "Failed to submit application. Please try again.",
          );
        }
      } catch (err) {
        console.error("Career form error:", err);
        showNotification(
          "error",
          "Connection Error",
          "Failed to connect to server. Please try again later.",
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }
});

// ===================================
// Student Accommodation Stats Counter
// ===================================
function initStatsCounter() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-target"));
          // Special consistency check: ensure we start from 0 explicitly
          counter.innerText = "0";

          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart function for smooth landing
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(ease * target);
            counter.innerText = current;

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              counter.innerText = target;
              if (target === 570) counter.innerText += "+";
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => observer.observe(c));
}

document.addEventListener("DOMContentLoaded", initStatsCounter);

// ===================================
// Floating Stone Popup
// ===================================
function initStonePopup() {
  const stonePopup = document.getElementById("stonePopup");
  const stonesSection = document.getElementById("stones");

  if (!stonePopup || !stonesSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stonePopup.classList.add("active");
        } else {
          stonePopup.classList.remove("active");
        }
      });
    },
    { threshold: 0.1 }, // Show when 10% of section is visible
  );

  observer.observe(stonesSection);
}


// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initStonePopup();
  initStoneLightbox();
  if (typeof initHeroVideoControls === "function") initHeroVideoControls();
});

// ===================================
// Stone collection lightbox carousel
// ===================================
function initStoneLightbox() {
  const lightbox = document.getElementById("stoneLightbox");
  if (!lightbox) return;

  const imgEl = lightbox.querySelector(".stone-lightbox-img");
  const captionEl = lightbox.querySelector(".stone-lightbox-caption");
  const counterEl = lightbox.querySelector(".stone-lightbox-counter");
  const backdrop = lightbox.querySelector(".stone-lightbox-backdrop");
  const closeBtn = lightbox.querySelector(".stone-lightbox-close");
  const prevBtn = lightbox.querySelector(".stone-lightbox-prev");
  const nextBtn = lightbox.querySelector(".stone-lightbox-next");

  // Collect all gallery images from both grids (stone + general)
  let galleryItems = [];
  let currentIndex = 0;

  function collectGalleryItems() {
    galleryItems = [];
    document.querySelectorAll(".legacy-gallery-grid .gallery-item").forEach((item) => {
      const img = item.querySelector("img");
      const cap = item.querySelector(".gallery-item-caption");
      if (img && img.src) {
        galleryItems.push({
          src: img.src,
          alt: img.alt || "",
          caption: cap ? cap.textContent : "",
        });
      }
    });
  }

  function showImage(index) {
    if (galleryItems.length === 0) return;
    // Wrap around (loop)
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    currentIndex = index;
    const item = galleryItems[currentIndex];
    imgEl.style.opacity = "0";
    setTimeout(() => {
      imgEl.src = item.src;
      imgEl.alt = item.alt;
      captionEl.textContent = item.caption;
      if (counterEl) counterEl.textContent = (currentIndex + 1) + " / " + galleryItems.length;
      imgEl.style.opacity = "1";
    }, 150);
  }

  function openLightbox(index) {
    collectGalleryItems();
    if (galleryItems.length === 0) return;
    currentIndex = index;
    const item = galleryItems[currentIndex];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    imgEl.style.opacity = "1";
    captionEl.textContent = item.caption;
    if (counterEl) counterEl.textContent = (currentIndex + 1) + " / " + galleryItems.length;
    // Show/hide nav buttons based on number of images
    if (prevBtn) prevBtn.style.display = galleryItems.length > 1 ? "flex" : "none";
    if (nextBtn) nextBtn.style.display = galleryItems.length > 1 ? "flex" : "none";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function goNext() { showImage(currentIndex + 1); }
  function goPrev() { showImage(currentIndex - 1); }

  // Attach click handlers to all gallery items
  document.querySelectorAll(".legacy-gallery-grid .gallery-item").forEach((item, _) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", function (e) {
      e.preventDefault();
      // Re-collect and find the index of this specific item
      collectGalleryItems();
      const img = this.querySelector("img");
      if (!img || !img.src) return;
      const clickedSrc = img.src;
      let idx = galleryItems.findIndex((gi) => gi.src === clickedSrc);
      if (idx === -1) idx = 0;
      openLightbox(idx);
    });
  });

  // Navigation buttons
  if (prevBtn) prevBtn.addEventListener("click", function (e) { e.stopPropagation(); goPrev(); });
  if (nextBtn) nextBtn.addEventListener("click", function (e) { e.stopPropagation(); goNext(); });

  // Close handlers
  if (backdrop) backdrop.addEventListener("click", closeLightbox);
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    switch (e.key) {
      case "Escape": closeLightbox(); break;
      case "ArrowRight": goNext(); break;
      case "ArrowLeft": goPrev(); break;
    }
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  lightbox.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) { // Min swipe distance
      if (diff > 0) goNext(); // Swipe left = next
      else goPrev(); // Swipe right = prev
    }
  }, { passive: true });
}

// ===================================
// Hero Video Custom Controls
// ===================================
function initHeroVideoControls() {
  const video = document.getElementById('homeVideo');
  const playBtn = document.getElementById('heroVideoPlayBtn');
  const muteBtn = document.getElementById('heroVideoMuteBtn');
  const speedBtn = document.getElementById('heroVideoSpeedBtn');
  const normalSpeed = 1;
  const doubleSpeed = 2;

  if (!video || !playBtn || !muteBtn) return;

  const playIcon = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
  const pauseIcon = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
  
  const muteIcon = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
  const soundIcon = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';

  const syncSpeedState = () => {
    if (!speedBtn) return;

    const isDoubleSpeed = video.playbackRate === doubleSpeed;
    speedBtn.classList.toggle('active', isDoubleSpeed);
    speedBtn.setAttribute('aria-pressed', String(isDoubleSpeed));
    speedBtn.setAttribute(
      'aria-label',
      isDoubleSpeed ? 'Switch Video Speed To Normal' : 'Toggle 2x Video Speed',
    );
  };

  // Sync icons with initial state
  const updatePlayState = () => { playBtn.innerHTML = video.paused ? playIcon : pauseIcon; };
  const updateMuteState = () => { muteBtn.innerHTML = video.muted ? muteIcon : soundIcon; };

  video.addEventListener('loadedmetadata', () => {
    updatePlayState();
    updateMuteState();
    syncSpeedState();
  });
  
  // Set immediately for already loaded videos
  updatePlayState();
  updateMuteState();
  syncSpeedState();

  // Listen to native events to catch browser autoplay or other changes
  video.addEventListener('play', updatePlayState);
  video.addEventListener('pause', updatePlayState);
  video.addEventListener('volumechange', updateMuteState);

  playBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
  });

  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      video.playbackRate = video.playbackRate === doubleSpeed ? normalSpeed : doubleSpeed;
      syncSpeedState();
    });
  }

  video.addEventListener('ratechange', syncSpeedState);
}

/* ===================================================
   Operations & Legacy Image Viewer
   =================================================== */
(function () {
  var thumbsContainer = document.getElementById('ops-viewer-thumbs');
  if (!thumbsContainer) return;

  var mainImg = document.getElementById('ops-main-img');
  var prevBtn = document.querySelector('.ops-prev');
  var nextBtn = document.querySelector('.ops-next');
  var captionTitle = document.getElementById('ops-viewer-caption-title');
  var thumbs  = Array.from(thumbsContainer.querySelectorAll('.ops-thumb'));
  var current = 0;

  function preloadImage(src) {
    if (!src) return;

    var img = new Image();
    img.src = src;
  }

  function goTo(index) {
    var prev = thumbs[current];
    prev && prev.classList.remove('active');

    current = (index + thumbs.length) % thumbs.length;
    var t   = thumbs[current];
    t.classList.add('active');

    // Direct swap — images already cached, no decode delay needed
    mainImg.src = t.dataset.src;
    if (captionTitle) {
      captionTitle.textContent = t.dataset.caption || t.querySelector('img')?.alt || '';
    }

    // Scroll active thumb into view in the strip
    t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // Initialise caption from first active thumb
  if (captionTitle && thumbs[0]) {
    captionTitle.textContent = thumbs[0].dataset.caption || thumbs[0].querySelector('img')?.alt || '';
  }

  thumbs.forEach(function (th, i) {
    th.addEventListener('click', function () { goTo(i); });
  });

  prevBtn && prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn && nextBtn.addEventListener('click', function () { goTo(current + 1); });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    var rect = thumbsContainer.getBoundingClientRect();
    if (rect.top >= window.innerHeight || rect.bottom <= 0) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
  });

  // Preload first 3 images on idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(function () {
      [1, 2, 3].forEach(function (i) {
        var t = thumbs[i];
        if (t) preloadImage(t.dataset.src || (t.querySelector('img') && t.querySelector('img').src));
      });
    });
  }
})();
