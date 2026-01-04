// script.js — FULL REPLACEMENT (STABLE + FIXED)
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

  // Theme preference: "system" | "light" | "dark"
  const THEME_PREF_KEY = "fs_theme_pref";

  // ---------------------------
  // Utilities
  // ---------------------------
  function nowIso() { return new Date().toISOString(); }

  function escapeHtml(str) {
    return String(str)
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
    if (store.events.length > 2000) store.events = store.events.slice(store.events.length - 2000);
    saveJson(ANALYTICS_KEY, store);
  }

  // safe page-view
  try { logEvent("page_view", { path: location.pathname }); } catch {}

  // ---------------------------
  // Inventory (Admin-lite) — single source of truth
  // ---------------------------
  const defaultInv = {
    updatedAt: nowIso(),
    items: {
      "seed-tomato": { available: true, remaining: 999, note: "In stock" },
      "seed-corn":   { available: true, remaining: 999, note: "In stock" },
      "seed-multi":  { available: true, remaining: 999, note: "In stock" },
      "bed-2x4":     { available: true, remaining: 25,  note: "Limited" },
      "bed-4x4":     { available: true, remaining: 12,  note: "Limited" },
      "soil-kit-1":  { available: true, remaining: 30,  note: "In stock" }
    }
  };

  function loadInventory() {
    const inv = loadJson(INVENTORY_KEY, null);
    if (!inv || !inv.items) return defaultInv;
    return inv;
  }

  function saveInventory(inv) {
    const next = inv && inv.items ? inv : defaultInv;
    next.updatedAt = nowIso();
    saveJson(INVENTORY_KEY, next);
  }

  function getInventoryStatus(key) {
    const inv = loadInventory();
    return (inv.items && inv.items[key]) || { available: true, remaining: 999, note: "" };
  }

  // ---------------------------
  // /Footer injection
  // IMPORTANT: only inject if slots exist
  // ---------------------------
function headerHtml() {
  const name = cfg.siteName || "FutureSprouts";
  return `
<header class="navbar">
  <div class="container nav-inner">
    <a class="brand" href="index.html">
      <div class="brand-badge"><img src="images/logo.png" alt="logo"></div>
      <div>${name}</div>
    </a>
    <nav class="nav-links">
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <div class="cart-wrap">
        <a href="cart.html" class="cart-link">
          Cart <span class="cart-badge" id="cartBadge">0</span>
        </a>
        <div class="mini-cart" id="miniCart">
          <div class="mini-cart-header"><strong>Cart Preview</strong></div>
          <div id="miniCartItems" class="mini-cart-items"></div>
          <div class="mini-cart-footer"><a href="cart.html" class="btn primary">Checkout</a></div>
        </div>
      </div>
    </nav>
  </div>
</header>`;
}

function footerHtml() {
  return `
<footer class="footer">
  <div class="container footer-bottom">
    <div>© 2026 FutureSprouts</div>
    <div class="footer-actions">
      <div class="theme-wrap">
        <strong>Theme:</strong>
        <select id="themeToggle" class="fs-theme-select">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
    </div>
  </div>
</footer>`;
}

  // Inject ONLY if slots exist
  const headerSlot = document.getElementById("siteHeader");
  if (headerSlot) headerSlot.outerHTML = headerHtml();

  const footerSlot = document.getElementById("siteFooter");
  if (footerSlot) footerSlot.outerHTML = footerHtml();

  // ---------------------------
  // Theme: system/light/dark (footer dropdown)
  // ---------------------------
  const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function getThemePref() {
    const pref = localStorage.getItem(THEME_PREF_KEY);
    return (pref === "light" || pref === "dark" || pref === "system") ? pref : "system";
  }

  function applyTheme(pref) {
    if (pref === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (pref === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      // system
      const sysDark = media ? media.matches : false;
      root.setAttribute("data-theme", sysDark ? "dark" : "light");
    }
  }

  function syncThemeUI() {
    const select = document.getElementById("themeToggle");
    if (!select) return;

    const pref = getThemePref();
    select.value = pref;

    // apply immediately
    applyTheme(pref);

    select.onchange = () => {
      const next = select.value;
      localStorage.setItem(THEME_PREF_KEY, next);
      applyTheme(next);
      logEvent("theme_change", { pref: next });
    };
  }

  // initial
  applyTheme(getThemePref());
  syncThemeUI();

  // if system theme changes while user is on "system"
  if (media && typeof media.addEventListener === "function") {
    media.addEventListener("change", () => {
      if (getThemePref() === "system") applyTheme("system");
    });
  } else if (media && typeof media.addListener === "function") {
    media.addListener(() => {
      if (getThemePref() === "system") applyTheme("system");
    });
  }

  // ---------------------------
  // Mobile menu
  // ---------------------------
  const burger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
      burger.setAttribute("aria-expanded", mobileMenu.classList.contains("show"));
    });
  }

  // ---------------------------
  // Active nav highlight
  // ---------------------------
  const currentFile = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(a => {
    const href = (a.getAttribute("href") || "").trim();
    if (href === currentFile) a.classList.add("active");
  });

  // ---------------------------
  // Scroll reveal (resets)
  // ---------------------------
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
        else entry.target.classList.remove("show");
      });
    }, { threshold: 0.18 });
    reveals.forEach(el => revealObs.observe(el));
  }

  // ---------------------------
  // Impact numbers (Count-up stats) — FIX for “stuck at 0”
  // Elements should look like: <span data-count="1200">0+</span>
  // ---------------------------
  function countUp(el, target) {
    const duration = 900;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(target * progress);
      el.textContent = value.toLocaleString() + "+";
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statNums = document.querySelectorAll("[data-count]");
  if (statNums.length && "IntersectionObserver" in window) {
    const statObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count") || "0", 10);
        if (!Number.isFinite(target) || target <= 0) return;

        if (entry.isIntersecting) countUp(el, target);
        else el.textContent = "0+";
      });
    }, { threshold: 0.45 });

    statNums.forEach(el => statObs.observe(el));
  }

  // ---------------------------
  // Programs filtering
  // ---------------------------
  const tagButtons = document.querySelectorAll("[data-filter]");
  const programCards = document.querySelectorAll("[data-category]");
  function applyFilter(filter) {
    tagButtons.forEach(b => b.classList.toggle("active", b.dataset.filter === filter));
    programCards.forEach(card => {
      const cats = (card.dataset.category || "").split(",").map(s => s.trim());
      const show = filter === "all" || cats.includes(filter);
      card.style.display = show ? "" : "none";
    });
  }
  if (tagButtons.length && programCards.length) {
    tagButtons.forEach(btn => btn.addEventListener("click", () => applyFilter(btn.dataset.filter)));
    applyFilter("all");
  }

  // ---------------------------
  // Before/After slider
  // ---------------------------
  const range = document.querySelector("#baRange");
  const afterImg = document.querySelector(".ba-after");
  if (range && afterImg) {
    const update = () => {
      const pct = parseInt(range.value || "50", 10);
      afterImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    };
    range.addEventListener("input", update);
    update();
  }

  // ---------------------------
  // Cart: storage helpers
  // ---------------------------
  function loadCart() { return loadJson(CART_KEY, []); }

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
        void b.offsetWidth; // restart animation
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

  function saveCart(items) {
    saveJson(CART_KEY, items);
    animateBadgeIfAdded(items);
    updateCartBadge();
  }

  try { lastCartTotal = loadCart().reduce((s, it) => s + (it.qty || 0), 0); }
  catch { lastCartTotal = 0; }
  updateCartBadge();

  window.addEventListener("storage", (e) => {
    if (e.key === CART_KEY) updateCartBadge();
  });

  // ---------------------------
  // Cart operations
  // ---------------------------
  function cartAddOrUpdate(id, name, meta, qtyDelta, constraints) {
    const cart = loadCart();
    const idx = cart.findIndex(x => x.id === id);
    const currentQty = idx >= 0 ? cart[idx].qty : 0;
    const nextQty = Math.max(0, currentQty + qtyDelta);

    // constraints
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

  // ---------------------------
  // Expose helpers
  // ---------------------------
  window.FS_CART = {
    // cart
    loadCart,
    saveCart,
    cartAddOrUpdate,
    cartRemove,
    cartUpdateMeta,

    // ui
    showModal,

    // inventory
    loadInventory,
    saveInventory,
    getInventoryStatus,

    // analytics + utils
    logEvent,
    loadJson,
    saveJson
  };

  // ---------------------------
  // Cart page rendering (if cart.html present)
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

    // qty buttons
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

    // remove
    cartList.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-remove");
        cartRemove(id);
        renderCart();
      });
    });

    // meta editors
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

  if (cartList) renderCart();

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
        state,
        zip,
        location: `${formData.get("address1") || ""}, ${formData.get("city") || ""}, ${state} ${zip}`.replace(/\s+/g, " ").trim(),
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
        renderCart();
        cartForm.reset();

        // lockout: 6 hours
        setLockoutHours(6);

        showModal("Request sent", "Thanks! Your request was sent. We’ll follow up by email.");
        try { logEvent("order_submit_success", {}); } catch {}
      } catch {
        showModal("Error", "Network error. Please try again or email info@futuresprouts.org.");
        try { logEvent("order_submit_error", { status: "network" }); } catch {}
      }
    });
  }

})();
const select = document.getElementById("theme-select");
select.value = document.documentElement.dataset.theme || "light";

select.addEventListener("change", () => {
  const theme = select.value;
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
});
(function () {
  // ---------------------------
  // Theme UI Injection (Footer)
  // ---------------------------

  const THEME_KEY = "fs_theme"; // change if you already use a key
  const THEME_ATTR = "data-theme";

  function getSavedTheme() {
    const t = localStorage.getItem(THEME_KEY);
    return (t === "dark" || t === "light") ? t : null;
  }

  function setTheme(theme) {
    document.documentElement.setAttribute(THEME_ATTR, theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function ensureThemeInitialized() {
    // If already set in HTML, respect it
    const existing = document.documentElement.getAttribute(THEME_ATTR);
    if (existing === "dark" || existing === "light") return;

    // Otherwise use saved theme, fallback to light
    setTheme(getSavedTheme() || "light");
  }

  function injectThemeStylesOnce() {
    if (document.getElementById("fs-theme-pill-styles")) return;

    const style = document.createElement("style");
    style.id = "fs-theme-pill-styles";
    style.textContent = `
      .footer-bottom-right {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .theme-pill {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 14px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.25);
        background: rgba(255,255,255,0.06);
        font-size: 14px;
      }

      .theme-label {
        opacity: 0.85;
        white-space: nowrap;
      }

      .theme-pill select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        font-size: 14px;
        font-weight: 500;
        padding-right: 18px;
        cursor: pointer;
        line-height: 1;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right center;
      }

      .theme-pill select:focus { outline: none; }

      /* Light theme variant */
      [data-theme="light"] .theme-pill {
        background: rgba(0,0,0,0.05);
        border-color: rgba(0,0,0,0.2);
        color: #000;
      }

      [data-theme="light"] .theme-pill select {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='black' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
      }
    `;
    document.head.appendChild(style);
  }

  function buildThemePill() {
    const pill = document.createElement("div");
    pill.className = "theme-pill";
    pill.setAttribute("data-fs-theme-pill", "1");

    const label = document.createElement("span");
    label.className = "theme-label";
    label.textContent = "Theme";

    const select = document.createElement("select");
    select.id = "theme-select";
    select.setAttribute("aria-label", "Theme selector");

    const optLight = document.createElement("option");
    optLight.value = "light";
    optLight.textContent = "Light";

    const optDark = document.createElement("option");
    optDark.value = "dark";
    optDark.textContent = "Dark";

    select.appendChild(optLight);
    select.appendChild(optDark);

    // Set current
    const current = document.documentElement.getAttribute(THEME_ATTR) || "light";
    select.value = (current === "dark") ? "dark" : "light";

    select.addEventListener("change", () => {
      setTheme(select.value);
    });

    pill.appendChild(label);
    pill.appendChild(select);

    return pill;
  }

  function injectThemePillIntoFooter() {
    const footer = document.querySelector("footer");
    if (!footer) return;

    // Don't inject twice
    if (footer.querySelector('[data-fs-theme-pill="1"]')) return;

    // Try to find your bottom-right container; fall back to something sane
    let right = footer.querySelector(".footer-bottom-right");

    // If it doesn't exist, try to locate a socials container and use its parent
    if (!right) {
      const socials = footer.querySelector(".socials");
      if (socials && socials.parentElement) {
        right = socials.parentElement;
        right.classList.add("footer-bottom-right");
      }
    }

    // If still not found, create a container at the end of footer
    if (!right) {
      right = document.createElement("div");
      right.className = "footer-bottom-right";
      footer.appendChild(right);
    }

    // Insert theme pill before socials if socials exists, otherwise append
    const socials = right.querySelector(".socials") || footer.querySelector(".socials");
    const pill = buildThemePill();

    if (socials && socials.parentElement === right) {
      right.insertBefore(pill, socials);
    } else {
      right.appendChild(pill);
    }
  }

  function initFooterThemeInjection() {
    ensureThemeInitialized();
    injectThemeStylesOnce();
    injectThemePillIntoFooter();

    // If your footer is injected later by JS, try again a few times
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      injectThemePillIntoFooter();
      const footer = document.querySelector("footer");
      if ((footer && footer.querySelector('[data-fs-theme-pill="1"]')) || tries >= 20) {
        clearInterval(timer);
      }
    }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFooterThemeInjection);
  } else {
    initFooterThemeInjection();
  }
})();
(function () {
  // ---------------------------
  // Footer Injection
  // ---------------------------

  function buildFooterHTML() {
    return `
      <footer class="site-footer">
        <div class="footer-top">
          <div class="footer-brand">
            <strong>FUTURESPROUTS</strong>
            <p>Youth-led sustainable farming education and environmental stewardship.</p>
            <a href="mailto:info@futuresprouts.org">info@futuresprouts.org</a>
          </div>

          <div class="footer-links">
            <h4>Quick Links</h4>
            <a href="/services">Services</a>
            <a href="/cart">Cart</a>
            <a href="/events">Events</a>
            <a href="/donate">Donate</a>
            <a href="/wishlist">Wishlist</a>
          </div>

          <div class="footer-links">
            <h4>Legal</h4>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact</a>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} FutureSprouts</span>

          <div class="footer-bottom-right">
            <!-- Theme pill injected separately -->
            <div class="socials">
              <a href="#">Instagram</a> ·
              <a href="#">TikTok</a> ·
              <a href="#">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function injectFooter() {
    const mount = document.getElementById("siteFooter");
    if (!mount || mount.dataset.injected) return;

    mount.innerHTML = buildFooterHTML();
    mount.dataset.injected = "true";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectFooter);
  } else {
    injectFooter();
  }
})();
/* ===============================
   Social Links Auto-Injection
   Injects social icons into all footers
================================ */

(function injectSocials() {
  const cfg = window.FS_CONFIG;
  if (!cfg || !cfg.socials) return;

  const ICONS = {
    instagram: "icons/instagram.svg",
    x: "icons/x.svg",
    linkedin: "icons/linkedin.svg",
    youtube: "icons/youtube.svg",
    facebook: "icons/facebook.svg"
  };

  // HTML template
  function buildSocialHTML() {
    return Object.entries(cfg.socials)
      .filter(([key, url]) => url && ICONS[key])
      .map(([key, url]) => `
        <a
          href="${url}"
          data-social="${key}"
          aria-label="${key}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="${ICONS[key]}" alt="">
        </a>
      `)
      .join("");
  }

  // Inject into every .footer-socials container
  document.querySelectorAll(".footer-socials").forEach(container => {
    if (container.dataset.injected === "true") return;

    container.innerHTML = buildSocialHTML();
    container.dataset.injected = "true";
  });

})();



