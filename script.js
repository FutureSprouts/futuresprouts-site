// script.js — FULL REPLACEMENT (STABLE + FIXED)
// - Single source of truth for Header/Footer injection
// - Single theme system (system/light/dark)
// - Footer theme dropdown (Light/Dark/System) styled as pill + caret (no bold text)
// - Cart badge + mini cart preview
// - Cart page render + Formspree submit + lockout
// - Catalog-driven inventory defaults + auto-merge
// - Seed Packets page auto-renders cards from FS_CONFIG.catalog + filter chips
// - No duplicate footers, no duplicate theme code
// - FIXED: Seed grid now renders correctly on services page

(function () {
  const cfg = window.FS_CONFIG || {};
  const root = document.documentElement;

  // ---------------------------
  // Keys
  // ---------------------------
  const CART_KEY = "fs_cart_v1";
  const ANALYTICS_KEY = "fs_analytics_v1";
  const INVENTORY_KEY = "fs_inventory_v1";
  const LOCKOUT_KEY = "fs_order_lockout_until";
  const THEME_PREF_KEY = "fs_theme_pref"; // "system" | "light" | "dark"

  // ---------------------------
  // Utilities
  // ---------------------------
  function nowIso() { return new Date().toISOString(); }

  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return (parsed == null ? fallback : parsed);
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // ---------------------------
  // Modal
  // ---------------------------
  function showModal(title, message) {
    let backdrop = document.querySelector("#modalBackdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "modalBackdrop";
      backdrop.className = "modal-backdrop";
      backdrop.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <h3 id="modalTitle"></h3>
          <p id="modalMsg" class="small"></p>
          <div class="modal-actions">
            <button class="btn outline" id="modalClose" type="button">OK</button>
          </div>
        </div>`;
      document.body.appendChild(backdrop);

      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) backdrop.classList.remove("show");
      });
      backdrop.querySelector("#modalClose").addEventListener("click", () => {
        backdrop.classList.remove("show");
      });
    }
    backdrop.querySelector("#modalTitle").textContent = title;
    backdrop.querySelector("#modalMsg").textContent = message;
    backdrop.classList.add("show");
  }

  // ---------------------------
  // Analytics (localStorage)
  // ---------------------------
  function logEvent(type, data) {
    const store = loadJson(ANALYTICS_KEY, { events: [] });
    store.events.push({ type, data: data || {}, ts: nowIso() });
    if (store.events.length > 2000) store.events = store.events.slice(-2000);
    saveJson(ANALYTICS_KEY, store);
  }

  try { logEvent("page_view", { path: location.pathname }); } catch {}

  // ---------------------------
  // Catalog + Inventory (Catalog-driven)
  // ---------------------------
  function getCatalog() {
    const list = (window.FS_CONFIG && Array.isArray(window.FS_CONFIG.catalog))
      ? window.FS_CONFIG.catalog
      : [];
    // keep only valid items with a string key
    const validItems = list.filter(x => x && typeof x.key === "string" && x.key.trim());
    console.log(`getCatalog: Found ${list.length} total items, ${validItems.length} valid items`);
    return validItems;
  }

  function buildDefaultInv() {
    // Base defaults (non-catalog items you still track)
    const items = {
      "bed-2x4":    { available: true, remaining: 25, note: "Limited" },
      "bed-4x4":    { available: true, remaining: 12, note: "Limited" },
      "soil-kit-1": { available: true, remaining: 30, note: "In stock" }
    };

    // Catalog-driven defaults
    getCatalog().forEach(p => {
      const inv = (p.inv && typeof p.inv === "object") ? p.inv : {};
      items[p.key] = {
        available: inv.available !== false,
        remaining: Number.isFinite(+inv.remaining) ? Math.max(0, parseInt(inv.remaining, 10)) : 999,
        note: inv.note || ""
      };
    });

    return { updatedAt: nowIso(), items };
  }

  function loadInventory() {
    const base = buildDefaultInv();
    const saved = loadJson(INVENTORY_KEY, null);

    if (!saved || !saved.items) return base;

    // merge: preserve saved, auto-add any missing defaults/new catalog keys
    saved.items = saved.items || {};
    Object.keys(base.items).forEach(k => {
      if (!saved.items[k]) saved.items[k] = base.items[k];
    });

    if (!saved.updatedAt) saved.updatedAt = nowIso();
    return saved;
  }

  function saveInventory(inv) {
    const next = (inv && inv.items) ? inv : buildDefaultInv();
    next.updatedAt = nowIso();
    saveJson(INVENTORY_KEY, next);
  }

  function getInventoryStatus(key) {
    const inv = loadInventory();
    return (inv.items && inv.items[key]) || { available: true, remaining: 999, note: "" };
  }

  // ---------------------------
  // Theme: system/light/dark
  // ---------------------------
  const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function getThemePref() {
    const pref = localStorage.getItem(THEME_PREF_KEY);
    return (pref === "light" || pref === "dark" || pref === "system") ? pref : "system";
  }

  function applyTheme(pref) {
    if (pref === "dark") root.setAttribute("data-theme", "dark");
    else if (pref === "light") root.setAttribute("data-theme", "light");
    else {
      const sysDark = media ? media.matches : false;
      root.setAttribute("data-theme", sysDark ? "dark" : "light");
    }
  }

  function watchSystemTheme() {
    if (!media) return;
    const handler = () => {
      if (getThemePref() === "system") applyTheme("system");
    };
    if (typeof media.addEventListener === "function") media.addEventListener("change", handler);
    else if (typeof media.addListener === "function") media.addListener(handler);
  }

  // ---------------------------
  // Footer Theme Dropdown (Injected)
  // ---------------------------
  function bindThemeDropdownGlobalsOnce() {
    if (window.__FS_THEME_DD_GLOBAL__) return;
    window.__FS_THEME_DD_GLOBAL__ = true;

    document.addEventListener("click", (e) => {
      const open = document.querySelector(".theme-control.open");
      if (!open) return;
      if (!open.contains(e.target)) {
        open.classList.remove("open");
        const btn = open.querySelector(".theme-btn");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const open = document.querySelector(".theme-control.open");
      if (!open) return;
      open.classList.remove("open");
      const btn = open.querySelector(".theme-btn");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  function syncThemeDropdownUI() {
    const control = document.getElementById("themeControl");
    if (!control) return;

    const pref = getThemePref();
    const valueEl = control.querySelector("#themeValue");
    const items = Array.from(control.querySelectorAll(".theme-item"));

    if (valueEl) valueEl.textContent = pref.charAt(0).toUpperCase() + pref.slice(1);
    items.forEach((it) => {
      const t = it.getAttribute("data-theme");
      it.setAttribute("aria-checked", t === pref ? "true" : "false");
    });
  }

  function wireThemeDropdown() {
    const control = document.getElementById("themeControl");
    if (!control) return;

    if (control.__bound) return;
    control.__bound = true;

    bindThemeDropdownGlobalsOnce();

    const btn = control.querySelector("#themeBtn");
    const menu = control.querySelector("#themeMenu");
    if (!btn || !menu) return;

    syncThemeDropdownUI();
    applyTheme(getThemePref());

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = control.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    menu.addEventListener("click", (e) => {
      const item = e.target.closest(".theme-item");
      if (!item) return;

      const next = (item.getAttribute("data-theme") || "system").toLowerCase();
      if (next !== "light" && next !== "dark" && next !== "system") return;

      localStorage.setItem(THEME_PREF_KEY, next);
      applyTheme(next);
      syncThemeDropdownUI();

      control.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.focus();

      try { logEvent("theme_change", { pref: next }); } catch {}
    });
  }

  // ---------------------------
  // Header / Footer HTML
  // ---------------------------
  function headerHtml() {
    const name = cfg.siteName || "FutureSprouts";
    const orgLd = {
      "@context": "https://schema.org",
      "@type": "NonprofitOrganization",
      name,
      email: cfg.contactEmail || "info@futuresprouts.org",
      url: cfg.siteUrl || "",
      sameAs: [
        (cfg.socials && cfg.socials.instagram) || "",
        (cfg.socials && cfg.socials.tiktok) || "",
        (cfg.socials && cfg.socials.youtube) || ""
      ].filter(Boolean)
    };

    return `
<header class="navbar">
  <div class="container nav-inner">
    <a class="brand" href="index.html" aria-label="${escapeHtml(name)} Home">
      <div class="brand-badge">
        <img src="images/logo.png" alt="${escapeHtml(name)} logo">
      </div>
      <div>${escapeHtml(name)}</div>
    </a>

    <div class="nav-right">
      <button class="hamburger icon-btn" id="hamburgerBtn" aria-expanded="false" aria-label="Open menu" type="button">Menu</button>
    </div>

    <nav class="nav-links" aria-label="Primary">
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="events.html">Events</a>
      <a href="impact.html">Impact</a>
      <a href="get-involved.html">Get Involved</a>
      <a href="donate.html" class="donate-btn">Donate</a>
      <a href="contact.html">Contact</a>

      <div class="cart-wrap">
        <a href="cart.html" class="cart-link" aria-label="View cart">
          <span class="cart-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" role="img" focusable="false">
              <path d="M6.5 6.5h14l-1.2 7.2a2 2 0 0 1-2 1.7H9.1a2 2 0 0 1-2-1.6L5.2 3.8H2.8"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="9.5" cy="20" r="1.4" fill="currentColor"/>
              <circle cx="17.5" cy="20" r="1.4" fill="currentColor"/>
            </svg>
          </span>
          <span class="cart-badge" id="cartBadge">0</span>
        </a>

        <div class="mini-cart" id="miniCart" aria-label="Cart preview">
          <div class="mini-cart-header">
            <strong>Cart Preview</strong>
            <span class="small" id="miniCartCount">0 items</span>
          </div>
          <div class="mini-cart-items" id="miniCartItems"></div>
          <div class="mini-cart-footer">
            <a class="btn primary mini-cart-btn" href="cart.html">View Cart</a>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <div class="container mobile-menu" id="mobileMenu" aria-label="Mobile">
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="events.html">Events</a>
    <a href="impact.html">Impact</a>
    <a href="get-involved.html">Get Involved</a>
    <a href="contact.html">Contact</a>
    <a href="donate.html" class="donate-btn">Donate</a>

    <a href="cart.html" class="cart-link" aria-label="View cart">
      <span style="font-weight:700;">Cart</span>
      <span class="cart-badge" id="cartBadgeMobile">0</span>
    </a>
  </div>

  <script type="application/ld+json">${JSON.stringify(orgLd)}</script>
</header>`;
  }

  function footerHtml() {
    const email = cfg.contactEmail || "info@futuresprouts.org";
    const site = escapeHtml(cfg.siteName || "FutureSprouts");
    const ig = (cfg.socials && cfg.socials.instagram) || "#";
    const tt = (cfg.socials && cfg.socials.tiktok) || "#";
    const yt = (cfg.socials && cfg.socials.youtube) || "#";

    return `
<footer class="footer">
  <div class="container footer-grid">
    <div>
      <h3>${site}</h3>
      <p>Youth-led sustainable farming education and environmental stewardship.</p>
      <p style="margin-top:10px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    </div>

    <div>
      <h3>Quick Links</h3>
      <p><a href="services.html">Services</a></p>
      <p><a href="cart.html">Cart</a></p>
      <p><a href="events.html">Events</a></p>
      <p><a href="donate.html">Donate</a></p>
      <p><a href="wishlist.html">Wishlist</a></p>
    </div>

    <div>
      <h3>Legal</h3>
      <p><a href="privacy.html">Privacy Policy</a></p>
      <p><a href="terms.html">Terms of Service</a></p>
      <p style="margin-top:10px;"><a href="contact.html">Contact</a></p>
    </div>
  </div>

  <div class="container footer-bottom">
    <div class="footer-copy">© ${new Date().getFullYear()} ${site}</div>

    <div class="footer-actions">
      <div class="theme-control" id="themeControl">
        <button class="theme-btn" id="themeBtn" type="button" aria-haspopup="menu" aria-expanded="false">
          <span class="theme-label">Theme</span>
          <span class="theme-value" id="themeValue">System</span>
          <svg class="theme-caret" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5.5 7.5L10 12l4.5-4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </button>

        <div class="theme-menu" id="themeMenu" role="menu" aria-label="Theme options">
          <button class="theme-item" type="button" role="menuitemradio" data-theme="light" aria-checked="false">
            <span>Light</span>
            <span class="theme-check" aria-hidden="true">✓</span>
          </button>
          <button class="theme-item" type="button" role="menuitemradio" data-theme="dark" aria-checked="false">
            <span>Dark</span>
            <span class="theme-check" aria-hidden="true">✓</span>
          </button>
          <button class="theme-item" type="button" role="menuitemradio" data-theme="system" aria-checked="true">
            <span>System</span>
            <span class="theme-check" aria-hidden="true">✓</span>
          </button>
        </div>
      </div>

      <div class="footer-socials">
        <a href="${ig}" target="_blank" rel="noopener">Instagram</a>
        <span aria-hidden="true">·</span>
        <a href="${tt}" target="_blank" rel="noopener">TikTok</a>
        <span aria-hidden="true">·</span>
        <a href="${yt}" target="_blank" rel="noopener">YouTube</a>
      </div>
    </div>
  </div>
</footer>`;
  }

  function injectLayoutIfSlotsExist() {
    const headerSlot = document.getElementById("siteHeader");
    const footerSlot = document.getElementById("siteFooter");

    if (headerSlot) headerSlot.innerHTML = headerHtml();
    if (footerSlot) footerSlot.innerHTML = footerHtml();

    wireThemeDropdown();
  }

  // ---------------------------
  // Mobile menu
  // ---------------------------
  function wireMobileMenu() {
    const burger = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    if (!burger || !mobileMenu) return;

    burger.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
      burger.setAttribute("aria-expanded", mobileMenu.classList.contains("show") ? "true" : "false");
    });
  }

  // ---------------------------
  // Active nav highlight
  // ---------------------------
  function highlightActiveNav() {
    const currentFile = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(a => {
      const href = (a.getAttribute("href") || "").trim();
      if (href === currentFile) a.classList.add("active");
    });
  }

  // ---------------------------
  // Scroll reveal
  // ---------------------------
  function initReveal() {
    const reveals = document.querySelectorAll(".reveal:not(.seed-card)");
    if (!reveals.length || !("IntersectionObserver" in window)) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
        else entry.target.classList.remove("show");
      });
    }, { threshold: 0.18 });

    reveals.forEach(el => obs.observe(el));
  }

  // ---------------------------
  // Disable reveal for seed cards
  // ---------------------------
  function disableSeedCardReveal() {
    // Remove reveal class from any seed cards that might have it
    document.querySelectorAll(".seed-card.reveal").forEach(card => {
      card.classList.remove("reveal");
      card.classList.add("show"); // Make them visible immediately
    });
  }

  // ---------------------------
  // Impact count-up
  // ---------------------------
  function countUp(el, target) {
    const duration = 900;
    const start = performance.now();

    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const value = Math.floor(target * p);
      el.textContent = value.toLocaleString() + "+";
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCountUps() {
    const statNums = document.querySelectorAll("[data-count]");
    if (!statNums.length || !("IntersectionObserver" in window)) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count") || "0", 10);
        if (!Number.isFinite(target) || target <= 0) return;

        if (entry.isIntersecting) countUp(el, target);
        else el.textContent = "0+";
      });
    }, { threshold: 0.45 });

    statNums.forEach(el => obs.observe(el));
  }

  // ---------------------------
  // Programs filtering (kept for programs page)
  // ---------------------------
  function initProgramFilter() {
    const tagButtons = document.querySelectorAll("[data-filter]");
    const programCards = document.querySelectorAll("[data-category]");
    if (!tagButtons.length || !programCards.length) return;

    function applyFilter(filter) {
      tagButtons.forEach(b => b.classList.toggle("active", b.dataset.filter === filter));
      programCards.forEach(card => {
        const cats = (card.dataset.category || "").split(",").map(s => s.trim());
        const show = filter === "all" || cats.includes(filter);
        card.style.display = show ? "" : "none";
      });
    }

    tagButtons.forEach(btn => btn.addEventListener("click", () => applyFilter(btn.dataset.filter)));
    applyFilter("all");
  }

  // ---------------------------
  // Before/After slider
  // ---------------------------
  function initBeforeAfter() {
    const range = document.querySelector("#baRange");
    const afterImg = document.querySelector(".ba-after");
    if (!range || !afterImg) return;

    // Ensure range input is configured correctly
    range.min = "0";
    range.max = "100";
    range.value = range.value || "50";

    const update = () => {
      const pct = parseInt(range.value || "50", 10);
      // Clamp value between 0 and 100
      const clampedPct = Math.max(0, Math.min(100, pct));
      afterImg.style.clipPath = `inset(0 ${100 - clampedPct}% 0 0)`;
    };
    
    range.addEventListener("input", update);
    range.addEventListener("change", update);
    
    // Initialize on load
    update();
    
    // Re-initialize on window resize to ensure proper alignment
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(update, 100);
    });
  }

  // ---------------------------
  // Cart helpers
  // ---------------------------
  function loadCart() { return loadJson(CART_KEY, []); }
  function saveCart(items) { saveJson(CART_KEY, items); animateBadgeIfAdded(items); updateCartBadge(); }

  let lastCartTotal = 0;

  function renderMiniCart(cart, total) {
    const miniItems = document.getElementById("miniCartItems");
    const miniCount = document.getElementById("miniCartCount");
    if (!miniItems || !miniCount) return;

    miniCount.textContent = `${total} item${total === 1 ? "" : "s"}`;

    if (cart.length === 0) {
      miniItems.innerHTML = `<div class="small">Your cart is empty.</div>`;
      return;
    }

    const shown = cart.slice(0, 5);
    miniItems.innerHTML = shown.map(it => {
      const meta = it.meta || {};
      const parts = [];
      if (meta.brochures != null) parts.push(`Brochures: ${meta.brochures}`);
      if (meta.packets != null) parts.push(`Seed packs: ${meta.packets}`);
      if (meta.size) parts.push(`Size: ${meta.size}`);
      return `
        <div class="mini-cart-item">
          <div>
            <strong>${escapeHtml(it.name)}</strong>
            <div class="small">${escapeHtml(parts.join(" • "))}</div>
          </div>
          <div class="mini-cart-qty">×${it.qty}</div>
        </div>
      `;
    }).join("");

    if (cart.length > 5) miniItems.innerHTML += `<div class="small">+${cart.length - 5} more…</div>`;
  }

  function animateBadgeIfAdded(cartItems) {
    const newTotal = cartItems.reduce((s, it) => s + (it.qty || 0), 0);
    if (newTotal > lastCartTotal) {
      const b1 = document.getElementById("cartBadge");
      const b2 = document.getElementById("cartBadgeMobile");
      [b1, b2].forEach(b => {
        if (!b) return;
        b.classList.remove("pop");
        void b.offsetWidth;
        b.classList.add("pop");
      });
    }
    lastCartTotal = newTotal;
  }

  function updateCartBadge() {
    const cart = loadCart();
    const total = cart.reduce((sum, it) => sum + (it.qty || 0), 0);

    const badge = document.getElementById("cartBadge");
    const badgeMobile = document.getElementById("cartBadgeMobile");

    if (badge) {
      badge.textContent = String(total);
      badge.style.display = total > 0 ? "grid" : "none";
    }
    if (badgeMobile) {
      badgeMobile.textContent = String(total);
      badgeMobile.style.display = total > 0 ? "grid" : "none";
    }

    renderMiniCart(cart, total);
  }

  window.addEventListener("storage", (e) => {
    if (e.key === CART_KEY) updateCartBadge();
    if (e.key === THEME_PREF_KEY) {
      applyTheme(getThemePref());
      syncThemeDropdownUI();
    }
  });

  function cartAddOrUpdate(id, name, meta, qtyDelta, constraints) {
    const cart = loadCart();
    const idx = cart.findIndex(x => x.id === id);
    const currentQty = idx >= 0 ? cart[idx].qty : 0;
    const nextQty = Math.max(0, currentQty + qtyDelta);

    if (constraints) {
      if (constraints.maxPerItem != null && nextQty > constraints.maxPerItem) {
        showModal("Limit reached", `You can only request up to ${constraints.maxPerItem} of this item per order.`);
        return false;
      }
      if (constraints.bedMaxTotal != null) {
        const isBed = (id.startsWith("bed-") || (meta && meta.kind === "bed"));
        if (isBed) {
          const cartBeds = cart.filter(x => (x.id.startsWith("bed-") || (x.meta && x.meta.kind === "bed")));
          const totalBeds = cartBeds.reduce((s, x) => s + (x.qty || 0), 0);
          const nextTotalBeds = totalBeds - currentQty + nextQty;
          if (nextTotalBeds > constraints.bedMaxTotal) {
            showModal("Garden bed limit", "To prevent abuse, a maximum of 4 total garden beds can be requested per order (any combination).");
            return false;
          }
        }
      }
    }

    if (nextQty === 0) {
      if (idx >= 0) cart.splice(idx, 1);
    } else {
      const item = { id, name, qty: nextQty, meta: meta || {} };
      if (idx >= 0) cart[idx] = item;
      else cart.push(item);
    }

    saveCart(cart);
    try { logEvent("cart_update", { id, qty: nextQty }); } catch {}
    return true;
  }

  function cartRemove(id) {
    const cart = loadCart().filter(x => x.id !== id);
    saveCart(cart);
    try { logEvent("cart_remove", { id }); } catch {}
  }

  function cartUpdateMeta(id, newMeta) {
    const cart = loadCart();
    const idx = cart.findIndex(x => x.id === id);
    if (idx < 0) return false;
    cart[idx].meta = { ...(cart[idx].meta || {}), ...(newMeta || {}) };
    saveCart(cart);
    try { logEvent("cart_meta_update", { id }); } catch {}
    return true;
  }

  // expose helpers
  window.FS_CART = {
    loadCart,
    saveCart,
    cartAddOrUpdate,
    cartRemove,
    cartUpdateMeta,
    showModal,
    loadInventory,
    saveInventory,
    getInventoryStatus,
    logEvent,
    loadJson,
    saveJson
  };

  // ---------------------------
  // Seed Packets Page Renderer + Filters
  // ---------------------------
  function classifyInvStatus(key) {
    const it = getInventoryStatus(key);
    const availableFlag = (it.available !== false);
    const remaining = (typeof it.remaining === "number") ? it.remaining : null;
    const availableNow = availableFlag && (remaining == null || remaining > 0);

    if (!availableNow) return { label: "Out of stock", tone: "danger", out: true, remaining: 0 };
    if (remaining != null && remaining <= 10) return { label: "Limited", tone: "warn", out: false, remaining };
    return { label: "Available", tone: "ok", out: false, remaining };
  }
// ✅ DROP-IN REPLACEMENT (keeps your “build HTML all at once” performance + your filter wiring)
// Replace ONLY your existing renderSeedPackets() with this version.
// You do NOT need to change initSeedFilters().

function renderSeedPackets() {
  const grid = document.getElementById("seedGrid");
  if (!grid) {
    console.log("seedGrid element not found");
    return;
  }

  // Only include seed-related items:
  // - preferred: category === "seeds" (new config)
  // - fallback: kind === "seed" or kind === "pack" (works with your current config)
  const catalog = getCatalog().filter(item => {
    const kind = String(item.kind || item.type || "").toLowerCase();
    const category = String(item.category || "").toLowerCase();

    if (category) return category === "seeds";
    return kind === "seed" || kind === "pack";
  });

  console.log(`Rendering ${catalog.length} seed packets`);

  // Build all HTML at once (your old fast approach)
  const cardsHtml = catalog.map(item => {
    const tags = Array.isArray(item.tags) ? item.tags.join(" ") : "";
    const kindRaw = item.kind || item.type || "seed";
    const kind = String(kindRaw).toLowerCase();
    const name = item.name || item.title || item.key;
    const desc = item.desc || item.description || "";
    const image = item.image || "images/placeholder.jpg";

    const st = classifyInvStatus(item.key);
    const disabledAttr = st.out ? "disabled" : "";

    return `
      <div class="card seed-card"
        data-kind="${escapeHtml(kind)}"
        data-tags="${escapeHtml(tags)}"
        id="card-${escapeHtml(item.key)}">

        <img class="shop-img" src="${escapeHtml(image)}" alt="${escapeHtml(name)}">

        <div class="shop-body">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
            <div class="pill">${kind === "pack" ? "Seed Pack" : "Seed Packet"}</div>
            <span class="badge ${st.tone}" id="badge-${escapeHtml(item.key)}">${escapeHtml(st.label)}</span>
          </div>

          <h3 style="margin-top:10px;">${escapeHtml(name)}</h3>
          <p class="small" id="desc-${escapeHtml(item.key)}" data-base="${escapeHtml(desc)}">
            ${escapeHtml(desc)}
          </p>

          <div class="divider"></div>

          <button class="btn primary" type="button" data-add="${escapeHtml(item.key)}" ${disabledAttr}>
            ${st.out ? "Out of stock" : "Add to cart"}
          </button>
        </div>
      </div>
    `;
  }).join("");

  grid.innerHTML = cardsHtml;
  console.log(`Successfully rendered ${grid.children.length} seed cards`);
}


  function initSeedFilters() {
    const filters = document.getElementById("seedFilters");
    const countEl = document.getElementById("seedFilterCount");
    const grid = document.getElementById("seedGrid");
    if (!filters || !grid) return;

    // Prevent duplicate event listeners
    if (filters.__filtersWired) return;
    filters.__filtersWired = true;

    const tagButtons = Array.from(filters.querySelectorAll(".tag"));

    function getCards() {
      return Array.from(document.querySelectorAll(".seed-card"));
    }

    function applyFilter(filter) {
      tagButtons.forEach(b => b.classList.toggle("active", b.dataset.filter === filter));

      const cards = getCards();
      let shown = 0;

      cards.forEach(card => {
        const tagList = String(card.dataset.tags || "").split(/\s+/).filter(Boolean);
        const kind = String(card.dataset.kind || "");

        const show =
          filter === "all" ||
          tagList.includes(filter) ||
          kind === filter;

        card.style.display = show ? "" : "none";
        if (show) shown++;
      });

      if (countEl) countEl.textContent = `Showing ${shown} of ${cards.length}`;
    }

    tagButtons.forEach(btn => {
      btn.addEventListener("click", () => applyFilter(btn.dataset.filter || "all"));
    });

    applyFilter("all");
  }

  function wireSeedAddToCart() {
    const grid = document.getElementById("seedGrid");
    if (!grid) return;

    // Prevent duplicate event listeners
    if (grid.__cartWired) return;
    grid.__cartWired = true;

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;

      const key = btn.getAttribute("data-add");
      if (!key) return;

      const st = classifyInvStatus(key);
      if (st.out) {
        showModal("Out of stock", "This item is currently unavailable. Please check back later.");
        return;
      }

      const item = getCatalog().find(x => x.key === key);
      const name = item ? (item.name || item.title || item.key) : key;
      const kind = item ? (item.kind || item.type || "") : "";

      cartAddOrUpdate(key, name, { kind, baseId: key }, +1, null);
      showModal("Added to cart", "Item added. Click the cart icon to review and submit your request.");
    });
  }

  // ---------------------------
  // Cart page rendering
  // ---------------------------
  const cartList = document.querySelector("#cartList");
  const cartEmpty = document.querySelector("#cartEmpty");
  const cartForm = document.querySelector("#cartForm");

  function cartToText(cart) {
    return cart.map(it => {
      const meta = it.meta || {};
      const lines = [`- ${it.name} (qty: ${it.qty})`];
      if (meta.brochures != null) lines.push(`  brochures: ${meta.brochures}`);
      if (meta.packets != null) lines.push(`  seed packets: ${meta.packets}`);
      if (meta.size) lines.push(`  size: ${meta.size}`);
      if (meta.notes) lines.push(`  notes: ${meta.notes}`);
      if (meta.address1) lines.push(`  address1: ${meta.address1}`);
      return lines.join("\n");
    }).join("\n");
  }

  function renderCart() {
    if (!cartList) return;
    const cart = loadCart();

    if (cart.length === 0) {
      if (cartEmpty) cartEmpty.style.display = "block";
      cartList.innerHTML = "";
      return;
    }
    if (cartEmpty) cartEmpty.style.display = "none";

    cartList.innerHTML = cart.map(it => {
      const meta = it.meta || {};
      const metaParts = [];
      if (meta.brochures != null) metaParts.push(`Brochures: ${meta.brochures}`);
      if (meta.packets != null) metaParts.push(`Seed packs: ${meta.packets}`);
      if (meta.size) metaParts.push(`Size: ${meta.size}`);

      const showMetaEditor = (meta.brochures != null || meta.packets != null);

      return `
<div class="cart-line">
  <div style="flex:1;">
    <strong>${escapeHtml(it.name)}</strong>
    <div class="small">${escapeHtml(metaParts.join(" • "))}</div>

    ${showMetaEditor ? `
    <div class="meta-edit" aria-label="Edit item details">
      ${meta.brochures != null ? `
      <div class="mini-field">
        <label>Brochures</label>
        <input type="number" min="0" max="200" value="${meta.brochures}" data-meta-broch="${escapeHtml(it.id)}">
      </div>` : ""}
      ${meta.packets != null ? `
      <div class="mini-field">
        <label>Seed Packs</label>
        <input type="number" min="0" max="200" value="${meta.packets}" data-meta-pack="${escapeHtml(it.id)}">
      </div>` : ""}
    </div>` : ""}
  </div>

  <div class="cart-actions">
    <div class="qty" aria-label="Quantity controls">
      <button type="button" data-dec="${escapeHtml(it.id)}">−</button>
      <span>${it.qty}</span>
      <button type="button" data-inc="${escapeHtml(it.id)}">+</button>
    </div>
    <button type="button" class="trash-btn" data-remove="${escapeHtml(it.id)}" aria-label="Remove item">🗑</button>
  </div>
</div>`;
    }).join("");

    cartList.querySelectorAll("[data-dec]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-dec");
        const item = loadCart().find(x => x.id === id);
        if (!item) return;
        const constraints = { maxPerItem: item.id === "soil-kit-1" ? 1 : null, bedMaxTotal: 4 };
        cartAddOrUpdate(item.id, item.name, item.meta, -1, constraints);
        renderCart();
      });
    });

    cartList.querySelectorAll("[data-inc]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-inc");
        const item = loadCart().find(x => x.id === id);
        if (!item) return;
        const constraints = { maxPerItem: item.id === "soil-kit-1" ? 1 : null, bedMaxTotal: 4 };
        cartAddOrUpdate(item.id, item.name, item.meta, +1, constraints);
        renderCart();
      });
    });

    cartList.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-remove");
        cartRemove(id);
        renderCart();
      });
    });

    cartList.querySelectorAll("[data-meta-broch]").forEach(inp => {
      inp.addEventListener("change", () => {
        const id = inp.getAttribute("data-meta-broch");
        const val = Math.max(0, Math.min(200, parseInt(inp.value || "0", 10)));
        cartUpdateMeta(id, { brochures: val });
        renderCart();
      });
    });

    cartList.querySelectorAll("[data-meta-pack]").forEach(inp => {
      inp.addEventListener("change", () => {
        const id = inp.getAttribute("data-meta-pack");
        const val = Math.max(0, Math.min(200, parseInt(inp.value || "0", 10)));
        cartUpdateMeta(id, { packets: val });
        renderCart();
      });
    });
  }

  // ---------------------------
  // Order lockouts + validation + submit (Formspree)
  // ---------------------------
  function getLockoutUntil() {
    const raw = localStorage.getItem(LOCKOUT_KEY);
    if (!raw) return null;
    const t = Date.parse(raw);
    return Number.isFinite(t) ? t : null;
  }

  function setLockoutHours(hours) {
    const until = Date.now() + hours * 60 * 60 * 1000;
    localStorage.setItem(LOCKOUT_KEY, new Date(until).toISOString());
  }

  function validateUSState(state) {
    const st = String(state || "").trim().toUpperCase();
    const states = new Set([
      "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
      "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
      "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"
    ]);
    return states.has(st);
  }

  function validateZip(zip) {
    return /^\d{5}(-\d{4})?$/.test(String(zip || "").trim());
  }

  // ---------------------------
  // Init (runs once)
  // ---------------------------
  function init() {
    // Layout first
    injectLayoutIfSlotsExist();

    // Theme
    applyTheme(getThemePref());
    watchSystemTheme();

    // Header controls
    wireMobileMenu();
    highlightActiveNav();

    // Page features
    initReveal();
    initCountUps();
    initProgramFilter();
    initBeforeAfter();

    // Cart UI
    try { lastCartTotal = loadCart().reduce((s, it) => s + (it.qty || 0), 0); } catch { lastCartTotal = 0; }
    updateCartBadge();

    // Cart page
    if (cartList) renderCart();

    // Seed packets page: render with retry logic to ensure DOM is ready
    const initSeedPacketsPage = () => {
      const grid = document.getElementById("seedGrid");
      if (grid) {
        console.log("Initializing seed packets page");
        renderSeedPackets();
        initSeedFilters();
        wireSeedAddToCart();
        disableSeedCardReveal(); // Ensure seed cards don't have reveal animation
      } else {
        console.log("seedGrid not found during init");
      }
    };

    // Try immediately
    initSeedPacketsPage();

    // Also try after a short delay in case DOM updates
    setTimeout(initSeedPacketsPage, 100);

    // Form submit (only if present)
    if (cartForm) {
      cartForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const lockUntil = getLockoutUntil();
        if (lockUntil && Date.now() < lockUntil) {
          const mins = Math.ceil((lockUntil - Date.now()) / 60000);
          showModal("Please wait", `To prevent abuse, requests are limited. Try again in about ${mins} minute(s).`);
          return;
        }

        const cart = loadCart();
        if (cart.length === 0) {
          showModal("Cart empty", "Add services first, then submit your request.");
          return;
        }

        const formData = new FormData(cartForm);
        const email = String(formData.get("email") || "").trim();
        if (!email) {
          showModal("Missing email", "Please enter your email so we can follow up.");
          return;
        }

        const state = String(formData.get("state") || "").trim();
        const zip = String(formData.get("zip") || "").trim();

        if (!validateUSState(state)) {
          showModal("Check state", "Please enter a valid US state abbreviation (ex: PA).");
          return;
        }
        if (!validateZip(zip)) {
          showModal("Check ZIP", "Please enter a valid ZIP code (ex: 19382).");
          return;
        }

        const payload = {
          email,
          name: formData.get("name") || "",
          organization: formData.get("organization") || "",
          address1: formData.get("address1") || "",
          city: formData.get("city") || "",
          state: state.toUpperCase(),
          zip,
          location: `${formData.get("address1") || ""}, ${formData.get("city") || ""}, ${state} ${zip}`
            .replace(/\s+/g, " ")
            .trim(),
          notes: formData.get("notes") || "",
          order_summary: cartToText(cart)
        };

        try { logEvent("order_submit_attempt", { items: cart.length }); } catch {}

        try {
          const res = await fetch("https://formspree.io/f/mdakervk", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
              email: payload.email,
              message:
`SERVICE REQUEST (FutureSprouts)

Name: ${payload.name}
Email: ${payload.email}
Organization: ${payload.organization}
Address: ${payload.location}

Order:
${payload.order_summary}

Notes:
${payload.notes}`
            })
          });

          if (!res.ok) {
            showModal("Error", "Something went wrong submitting the request. Please try again or email info@futuresprouts.org.");
            try { logEvent("order_submit_error", { status: res.status }); } catch {}
            return;
          }

          // success
          saveCart([]);
          if (cartList) renderCart();
          cartForm.reset();

          setLockoutHours(6);

          showModal("Request sent", "Thanks! Your request was sent. We'll follow up by email.");
          try { logEvent("order_submit_success", {}); } catch {}
        } catch {
          showModal("Error", "Network error. Please try again or email info@futuresprouts.org.");
          try { logEvent("order_submit_error", { status: "network" }); } catch {}
        }
      });
    }
  }

  // ---------------------------
  // Ensure initialization happens after DOM is ready
  // ---------------------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();





