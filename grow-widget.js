/* =========================================================
   grow-widget.js  (FutureSprouts "What can I grow right now?")

   Self-contained widget for USDA zone 6b/7a (Chester County, PA).
   The user picks a month and a growing space and gets 3 to 5 crops
   with sowing depth and days to harvest, plus a button per crop that
   adds the matching seed pack to the Request List.

   PUBLIC API (exactly one global):

     window.initGrowWidget(mountElementOrId)

   mountElementOrId may be a DOM element or the id of one. The widget
   renders inside that element. Safe to call more than once on
   different mounts.

   REQUIRED SCRIPT INCLUDE ORDER (plain script tags, no modules):

     1. grow-data.js    (defines window.FS_CROPS, required)
     2. grow-widget.js  (this file)
     3. your call to initGrowWidget(...)

   Also include grow-widget.css for styling. All styles are scoped
   under the .fs-grow root class.

   OPTIONAL SITE INTEGRATION (degrades gracefully when absent):
     - window.FS_CART.cartAddOrUpdate(id, name, meta, qtyDelta, constraints)
       from script.js powers the "Add to Request List" buttons. When
       FS_CART is missing (for example the standalone demo page) the
       buttons render disabled and a console note explains why.
     - window.FS_CONFIG.catalog from config.js supplies the display
       name of each seed pack when available.
   ========================================================= */

(function () {
  "use strict";

  var MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var MONTH_SHORT = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  var SPACES = [
    { id: "windowsill", label: "Windowsill" },
    { id: "raised-bed", label: "Raised bed" },
    { id: "yard", label: "Yard" }
  ];

  var instanceCount = 0;
  var cartNoteLogged = false;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDepth(inches) {
    var whole = Math.floor(inches);
    var frac = inches - whole;
    var fracText = "";
    if (Math.abs(frac - 0.125) < 0.01) fracText = "1/8";
    else if (Math.abs(frac - 0.25) < 0.01) fracText = "1/4";
    else if (Math.abs(frac - 0.5) < 0.01) fracText = "1/2";
    else if (Math.abs(frac - 0.75) < 0.01) fracText = "3/4";
    else if (frac > 0.01) fracText = String(frac);
    if (whole > 0 && fracText) return whole + " " + fracText + " in";
    if (whole > 0) return whole + " in";
    if (fracText) return fracText + " in";
    return inches + " in";
  }

  function formatMonthList(months) {
    var names = (months || []).slice().sort(function (a, b) { return a - b; })
      .map(function (m) { return MONTH_SHORT[m - 1]; });
    if (!names.length) return "";
    return names.join(", ");
  }

  // Decide whether a crop matches the chosen month and space, and how.
  // Returns null (no match) or { mode: "direct-sow" | "start-indoors" | "sow-indoors" }.
  //  - windowsill: any month listed in startIndoors works, because these
  //    crops can live their whole life indoors.
  //  - raised bed / yard: either direct sow this month, or start seed
  //    indoors this month for an outdoor transplant. An indoor start only
  //    counts when it lines up with the crop's outdoor season: crops with
  //    no direct-sow window (tomato, pepper, broccoli) list only true
  //    transplant-start months, and for the rest the indoor start must be
  //    one or two months ahead of a direct-sow month.
  function matchCrop(crop, month, space) {
    if (!crop.spaces || crop.spaces.indexOf(space) < 0) return null;
    var indoors = (crop.startIndoors || []).indexOf(month) >= 0;
    var direct = (crop.directSow || []).indexOf(month) >= 0;

    if (space === "windowsill") {
      return indoors ? { mode: "sow-indoors" } : null;
    }
    if (direct) return { mode: "direct-sow" };
    if (indoors) {
      var ds = crop.directSow || [];
      if (!ds.length) return { mode: "start-indoors" };
      for (var i = 0; i < ds.length; i++) {
        var gap = (ds[i] - month + 12) % 12;
        if (gap === 1 || gap === 2) return { mode: "start-indoors" };
      }
    }
    return null;
  }

  function getResults(month, space) {
    var data = window.FS_CROPS;
    if (!data || !Array.isArray(data.crops)) return [];
    var out = [];
    data.crops.forEach(function (crop) {
      var match = matchCrop(crop, month, space);
      if (match) out.push({ crop: crop, mode: match.mode });
    });
    var modeRank = { "direct-sow": 0, "sow-indoors": 0, "start-indoors": 1 };
    out.sort(function (a, b) {
      var r = modeRank[a.mode] - modeRank[b.mode];
      if (r !== 0) return r;
      return a.crop.daysToHarvest - b.crop.daysToHarvest;
    });
    return out.slice(0, 5);
  }

  function modeLabel(mode) {
    if (mode === "direct-sow") return "Direct sow now";
    if (mode === "start-indoors") return "Start indoors now";
    return "Sow on the windowsill";
  }

  function cartAvailable() {
    return !!(window.FS_CART && typeof window.FS_CART.cartAddOrUpdate === "function");
  }

  function seedPackName(crop) {
    var catalog = (window.FS_CONFIG && window.FS_CONFIG.catalog) || [];
    for (var i = 0; i < catalog.length; i++) {
      if (catalog[i].key === crop.seedPackKey) {
        return catalog[i].name || crop.name;
      }
    }
    return crop.name + " Seeds";
  }

  function cardHtml(result, hasCart) {
    var crop = result.crop;
    var btnHtml;
    if (!crop.seedPackKey) {
      btnHtml =
        '<p class="fs-grow-nopack">Bring your own seed for this one. We do not stock a pack yet.</p>';
    } else if (hasCart) {
      btnHtml =
        '<button type="button" class="fs-grow-add" data-fs-grow-add="' +
        escapeHtml(crop.key) + '">Add ' + escapeHtml(seedPackName(crop)) +
        ' to Request List</button>';
    } else {
      btnHtml =
        '<button type="button" class="fs-grow-add" disabled aria-disabled="true" ' +
        'title="Request List is available on the FutureSprouts site">' +
        'Add ' + escapeHtml(seedPackName(crop)) + ' to Request List</button>';
    }
    return (
      '<li class="fs-grow-card">' +
        '<div class="fs-grow-card-head">' +
          '<h4 class="fs-grow-crop">' + escapeHtml(crop.name) + '</h4>' +
          '<span class="fs-grow-badge fs-grow-badge-' + escapeHtml(result.mode) + '">' +
            modeLabel(result.mode) + '</span>' +
        '</div>' +
        '<dl class="fs-grow-facts">' +
          '<div class="fs-grow-fact"><dt>Sow depth</dt><dd>' +
            escapeHtml(formatDepth(crop.sowDepthIn)) + '</dd></div>' +
          '<div class="fs-grow-fact"><dt>Days to harvest</dt><dd>about ' +
            crop.daysToHarvest + '</dd></div>' +
          '<div class="fs-grow-fact"><dt>Harvest window</dt><dd>' +
            escapeHtml(formatMonthList(crop.harvest) || "varies") + '</dd></div>' +
        '</dl>' +
        btnHtml +
      '</li>'
    );
  }

  function spaceLabel(spaceId) {
    for (var i = 0; i < SPACES.length; i++) {
      if (SPACES[i].id === spaceId) return SPACES[i].label.toLowerCase();
    }
    return spaceId;
  }

  function initGrowWidget(mountElementOrId) {
    var mount = typeof mountElementOrId === "string"
      ? document.getElementById(mountElementOrId)
      : mountElementOrId;
    if (!mount) {
      console.warn("initGrowWidget: mount element not found:", mountElementOrId);
      return null;
    }
    if (!window.FS_CROPS || !Array.isArray(window.FS_CROPS.crops)) {
      mount.innerHTML =
        '<p class="fs-grow-error">Grow guide data is missing. ' +
        'Include grow-data.js before grow-widget.js.</p>';
      console.warn("initGrowWidget: window.FS_CROPS not found. Load grow-data.js first.");
      return null;
    }

    instanceCount += 1;
    var uid = "fs-grow-" + instanceCount;
    var state = {
      month: new Date().getMonth() + 1,
      space: "raised-bed"
    };

    var hasCart = cartAvailable();
    if (!hasCart && !cartNoteLogged) {
      cartNoteLogged = true;
      console.info(
        "FutureSprouts grow widget: window.FS_CART is not on this page, so " +
        '"Add to Request List" buttons are shown disabled. On the live site, ' +
        "script.js provides FS_CART and the buttons add seed packs to the Request List."
      );
    }

    var monthOptions = MONTH_NAMES.map(function (name, i) {
      return '<option value="' + (i + 1) + '">' + name + "</option>";
    }).join("");

    var spaceInputs = SPACES.map(function (s, i) {
      var inputId = uid + "-space-" + s.id;
      return (
        '<span class="fs-grow-space-option">' +
          '<input type="radio" name="' + uid + '-space" id="' + inputId +
            '" value="' + s.id + '"' + (i === 1 ? " checked" : "") + ">" +
          '<label for="' + inputId + '">' + s.label + "</label>" +
        "</span>"
      );
    }).join("");

    mount.innerHTML =
      '<section class="fs-grow" aria-label="What can I grow right now?">' +
        '<div class="fs-grow-inner">' +
          '<p class="fs-grow-kicker">Zone ' + escapeHtml(window.FS_CROPS.zone) +
            " &middot; Chester County, PA</p>" +
          '<h3 class="fs-grow-title">What can I grow right now?</h3>' +
          '<p class="fs-grow-sub">Pick a month and a growing space. ' +
            "We will suggest crops that can go in the soil, plus the seed " +
            "packs to request.</p>" +
          '<form class="fs-grow-controls">' +
            '<div class="fs-grow-field">' +
              '<label class="fs-grow-label" for="' + uid + '-month">Month</label>' +
              '<select class="fs-grow-month" id="' + uid + '-month">' +
                monthOptions +
              "</select>" +
            "</div>" +
            '<fieldset class="fs-grow-field fs-grow-spaces">' +
              '<legend class="fs-grow-label">Growing space</legend>' +
              '<div class="fs-grow-space-group">' + spaceInputs + "</div>" +
            "</fieldset>" +
          "</form>" +
          '<p class="fs-grow-status" role="status" aria-live="polite"></p>' +
          '<ul class="fs-grow-results"></ul>' +
          '<p class="fs-grow-cart-live" role="status" aria-live="polite"></p>' +
        "</div>" +
      "</section>";

    var monthSelect = mount.querySelector(".fs-grow-month");
    var statusEl = mount.querySelector(".fs-grow-status");
    var resultsEl = mount.querySelector(".fs-grow-results");
    var cartLiveEl = mount.querySelector(".fs-grow-cart-live");
    var form = mount.querySelector(".fs-grow-controls");

    monthSelect.value = String(state.month);
    form.addEventListener("submit", function (e) { e.preventDefault(); });

    function render() {
      var results = getResults(state.month, state.space);
      var monthName = MONTH_NAMES[state.month - 1];
      var where = spaceLabel(state.space);

      if (!results.length) {
        statusEl.textContent =
          "Nothing to sow in a " + where + " in " + monthName + ".";
        resultsEl.innerHTML =
          '<li class="fs-grow-empty">The soil is resting. Try the windowsill ' +
          "for herbs and salad greens, or browse the seed catalog and plan " +
          "for early spring.</li>";
        return;
      }

      var countWord = results.length === 1 ? "crop" : "crops";
      statusEl.textContent =
        results.length + " " + countWord + " for a " + where + " in " +
        monthName + (results.length < 3 ? ". A quiet month out there." : ".");
      resultsEl.innerHTML = results.map(function (r) {
        return cardHtml(r, hasCart);
      }).join("");
    }

    monthSelect.addEventListener("change", function () {
      state.month = parseInt(monthSelect.value, 10) || 1;
      render();
    });

    mount.querySelectorAll('input[name="' + uid + '-space"]').forEach(function (input) {
      input.addEventListener("change", function () {
        if (input.checked) {
          state.space = input.value;
          render();
        }
      });
    });

    resultsEl.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-fs-grow-add]") : null;
      if (!btn || btn.disabled) return;
      var key = btn.getAttribute("data-fs-grow-add");
      var crop = null;
      window.FS_CROPS.crops.forEach(function (c) {
        if (c.key === key) crop = c;
      });
      if (!crop || !crop.seedPackKey) return;
      if (!cartAvailable()) {
        console.info("FutureSprouts grow widget: FS_CART unavailable, cannot add " + key);
        return;
      }
      var packName = seedPackName(crop);
      var ok = window.FS_CART.cartAddOrUpdate(
        crop.seedPackKey,
        packName,
        { kind: "seed", baseId: crop.seedPackKey },
        +1,
        null
      );
      if (ok !== false) {
        cartLiveEl.textContent = packName + " added to your Request List.";
        var original = btn.textContent;
        btn.textContent = "Added to Request List";
        btn.classList.add("is-added");
        window.setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("is-added");
        }, 1800);
      }
    });

    render();
    return mount;
  }

  window.initGrowWidget = initGrowWidget;
})();
