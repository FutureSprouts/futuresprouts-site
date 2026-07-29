/* =====================================================
   FUTURESPROUTS SEED SWAP MAP - PIN CONFIG
   =====================================================
   HOW TO EDIT PINS:
   Each entry below is one pin on the Chester County map
   on rsvp.html. To move, rename, or retype a pin, just
   change the values here. No other file needs editing.

     x     Horizontal position as a percent of the map,
           0 = left edge, 100 = right edge.
     y     Vertical position as a percent of the map,
           0 = top edge, 100 = bottom edge.
     label Text shown in the pin's tooltip. These are
           PLACEHOLDERS until real venues are confirmed,
           so keep wording like "Sample location: ...".
     type  Either "seed-swap" or "cleanup". This picks
           the marker color (seed swap = harvest orange,
           cleanup = leaf green).
   ===================================================== */
var SWAP_MAP_PINS = [
  {
    x: 63,
    y: 44,
    label: "Sample location: West Chester area",
    type: "seed-swap"
  },
  {
    x: 34,
    y: 37,
    label: "Sample location: Coatesville area",
    type: "cleanup"
  },
  {
    x: 52,
    y: 78,
    label: "Sample location: Kennett Square area",
    type: "seed-swap"
  }
];

/* ===================================================== */
/* Rendering below. You should not need to edit this.    */
/* ===================================================== */
(function () {
  "use strict";

  var TYPE_NAMES = {
    "seed-swap": "Seed swap",
    "cleanup": "Cleanup"
  };

  function closeAll(except) {
    document.querySelectorAll(".swapmap-pin.is-open").forEach(function (btn) {
      if (btn !== except) btn.classList.remove("is-open");
    });
  }

  function buildPin(pin) {
    var type = TYPE_NAMES.hasOwnProperty(pin.type) ? pin.type : "seed-swap";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "swapmap-pin";
    btn.dataset.type = type;
    btn.style.left = pin.x + "%";
    btn.style.top = pin.y + "%";
    btn.setAttribute("aria-label", TYPE_NAMES[type] + ". " + pin.label);

    var marker = document.createElement("span");
    marker.className = "swapmap-pin-marker";
    marker.setAttribute("aria-hidden", "true");

    var tip = document.createElement("span");
    tip.className = "swapmap-tip";
    tip.setAttribute("aria-hidden", "true");
    tip.textContent = pin.label;

    btn.appendChild(marker);
    btn.appendChild(tip);

    // Tap or click toggles the tooltip (hover and focus
    // already show it via CSS).
    btn.addEventListener("click", function () {
      var opening = !btn.classList.contains("is-open");
      closeAll(btn);
      btn.classList.toggle("is-open", opening);
    });

    return btn;
  }

  function init() {
    var layer = document.getElementById("swapMapPins");
    if (!layer || !Array.isArray(SWAP_MAP_PINS)) return;

    SWAP_MAP_PINS.forEach(function (pin) {
      layer.appendChild(buildPin(pin));
    });

    // Escape closes any tapped-open tooltip.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll(null);
    });

    // Clicking elsewhere closes tapped-open tooltips.
    document.addEventListener("click", function (e) {
      if (!e.target.closest || !e.target.closest(".swapmap-pin")) {
        closeAll(null);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
