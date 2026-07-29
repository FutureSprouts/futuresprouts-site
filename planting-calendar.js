/* =========================================================
   planting-calendar.js  (FutureSprouts planting calendar module)

   Renders a 12-month planting calendar for the crops defined in
   grow-data.js (window.FS_CROPS). Selecting a month highlights every
   crop you can start indoors (green circle), direct sow (brown
   diamond), or harvest (orange triangle) that month. On narrow
   screens the module shows a month picker plus a filtered crop list;
   from 760px up it shows the full 12-column grid.

   USAGE
   -----
   Include the files with plain script tags, in this order
   (grow-data.js MUST load first; no modules, no fetch):

     <link rel="stylesheet" href="planting-calendar.css">
     <script src="grow-data.js"></script>
     <script src="planting-calendar.js"></script>

   Then call the single global init with a mount element or its id:

     <div id="planting-calendar"></div>
     <script>window.initPlantingCalendar("planting-calendar");</script>

   window.initPlantingCalendar(mountElementOrId)
     mountElementOrId: an Element, or the id string of one.
     Re-invoking on the same mount re-renders it from scratch.

   Interaction: months are real toggle buttons (click / tap / Enter /
   Space, plus Left, Right, Home and End arrow-key movement). On
   devices with a fine hover pointer, hovering a month button also
   selects it, but hover is never required. A polite aria-live region
   announces the selected month's crops for screen readers.
   ========================================================= */

(function () {
  "use strict";

  var MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var MONTHS_LONG = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"];

  var STATES = [
    { key: "startIndoors", label: "Start indoors", glyph: "indoors" },
    { key: "directSow", label: "Direct sow", glyph: "sow" },
    { key: "harvest", label: "Harvest", glyph: "harvest" }
  ];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined && text !== null) { node.textContent = text; }
    return node;
  }

  function makeGlyph(stateGlyph) {
    var g = el("span", "fs-pcal-glyph fs-pcal-glyph--" + stateGlyph);
    g.setAttribute("aria-hidden", "true");
    return g;
  }

  function cropStatesForMonth(crop, month) {
    var hits = [];
    for (var i = 0; i < STATES.length; i++) {
      var list = crop[STATES[i].key];
      if (list && list.indexOf(month) !== -1) { hits.push(STATES[i]); }
    }
    return hits;
  }

  function joinNames(names) {
    if (names.length === 0) { return "none"; }
    return names.join(", ");
  }

  window.initPlantingCalendar = function (mountElementOrId) {
    var mount = typeof mountElementOrId === "string"
      ? document.getElementById(mountElementOrId)
      : mountElementOrId;

    if (!mount) {
      if (window.console) {
        console.warn("initPlantingCalendar: mount element not found.");
      }
      return null;
    }
    if (!window.FS_CROPS || !window.FS_CROPS.crops || !window.FS_CROPS.crops.length) {
      if (window.console) {
        console.warn("initPlantingCalendar: window.FS_CROPS missing. Load grow-data.js first.");
      }
      return null;
    }

    var data = window.FS_CROPS;
    var crops = data.crops;
    var selectedMonth = new Date().getMonth() + 1;
    var hoverSelects = window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    mount.textContent = "";

    var root = el("div", "fs-pcal");

    /* header */
    var title = el("h3", "fs-pcal__title", "Planting Calendar");
    title.id = "fs-pcal-title-" + Math.floor(Math.random() * 100000);
    root.appendChild(title);
    root.appendChild(el("p", "fs-pcal__zone",
      "USDA zone " + data.zone + ". Pick a month to see what to start indoors, sow outside, or harvest."));

    /* month picker */
    var picker = el("div", "fs-pcal__months");
    picker.setAttribute("role", "group");
    picker.setAttribute("aria-label", "Choose a month");
    var monthButtons = [];

    function onMonthKeydown(evt) {
      var idx = monthButtons.indexOf(evt.currentTarget);
      var next = null;
      if (evt.key === "ArrowRight" || evt.key === "ArrowDown") { next = (idx + 1) % 12; }
      else if (evt.key === "ArrowLeft" || evt.key === "ArrowUp") { next = (idx + 11) % 12; }
      else if (evt.key === "Home") { next = 0; }
      else if (evt.key === "End") { next = 11; }
      if (next !== null) {
        evt.preventDefault();
        monthButtons[next].focus();
        selectMonth(next + 1);
      }
    }

    MONTHS_SHORT.forEach(function (shortName, i) {
      var btn = el("button", "fs-pcal__month-btn", shortName);
      btn.type = "button";
      btn.setAttribute("aria-label", MONTHS_LONG[i]);
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", function () { selectMonth(i + 1); });
      btn.addEventListener("keydown", onMonthKeydown);
      if (hoverSelects) {
        btn.addEventListener("mouseenter", function () { selectMonth(i + 1); });
      }
      monthButtons.push(btn);
      picker.appendChild(btn);
    });
    root.appendChild(picker);

    /* legend */
    var legend = el("div", "fs-pcal__legend");
    legend.setAttribute("aria-label", "Legend");
    STATES.forEach(function (state) {
      var item = el("span", "fs-pcal__legend-item");
      item.appendChild(makeGlyph(state.glyph));
      item.appendChild(el("span", null, state.label));
      legend.appendChild(item);
    });
    root.appendChild(legend);

    /* live summary (visible and announced) */
    var summary = el("p", "fs-pcal__summary");
    summary.setAttribute("aria-live", "polite");
    root.appendChild(summary);

    /* wide layout: 12-column grid as a real table */
    var tablewrap = el("div", "fs-pcal__tablewrap");
    var table = el("table", "fs-pcal__table");
    var caption = el("caption", "fs-pcal-sr",
      "Planting calendar for zone " + data.zone +
      ". Rows are crops, columns are months. Cell marks: start indoors, direct sow, or harvest.");
    table.appendChild(caption);

    var thead = el("thead");
    var headRow = el("tr");
    var cropHead = el("th", null, "Crop");
    cropHead.setAttribute("scope", "col");
    headRow.appendChild(cropHead);
    var monthHeads = [];
    MONTHS_SHORT.forEach(function (shortName, i) {
      var th = el("th");
      th.setAttribute("scope", "col");
      th.appendChild(el("span", null, shortName));
      var srName = el("span", "fs-pcal-sr", " " + MONTHS_LONG[i].slice(shortName.length));
      th.appendChild(srName);
      monthHeads.push(th);
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = el("tbody");
    var rowIndex = [];   /* [{ tr: tr, cells: [td x12], crop: crop }] */
    crops.forEach(function (crop) {
      var tr = el("tr");
      var nameTh = el("th", null, crop.name);
      nameTh.setAttribute("scope", "row");
      tr.appendChild(nameTh);
      var cells = [];
      for (var m = 1; m <= 12; m++) {
        var td = el("td");
        var hits = cropStatesForMonth(crop, m);
        if (hits.length) {
          var wrap = el("span", "fs-pcal__cell-glyphs");
          var labels = [];
          hits.forEach(function (state) {
            wrap.appendChild(makeGlyph(state.glyph));
            labels.push(state.label.toLowerCase());
          });
          td.appendChild(wrap);
          td.appendChild(el("span", "fs-pcal-sr", labels.join(" and ")));
        }
        cells.push(td);
        tr.appendChild(td);
      }
      rowIndex.push({ tr: tr, cells: cells, crop: crop });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    tablewrap.appendChild(table);
    root.appendChild(tablewrap);

    /* narrow layout: filtered list for the selected month */
    var list = el("div", "fs-pcal__list");
    root.appendChild(list);

    function rebuildList(month) {
      list.textContent = "";
      STATES.forEach(function (state) {
        var group = el("section", "fs-pcal__group");
        var head = el("h4", "fs-pcal__group-title");
        head.appendChild(makeGlyph(state.glyph));
        head.appendChild(el("span", null, state.label + " in " + MONTHS_LONG[month - 1]));
        group.appendChild(head);
        var names = crops.filter(function (c) {
          return c[state.key] && c[state.key].indexOf(month) !== -1;
        });
        if (names.length) {
          var ul = el("ul", "fs-pcal__chips");
          names.forEach(function (c) {
            ul.appendChild(el("li", "fs-pcal__chip", c.name));
          });
          group.appendChild(ul);
        } else {
          group.appendChild(el("p", "fs-pcal__none", "Nothing this month."));
        }
        list.appendChild(group);
      });
    }

    function selectMonth(month) {
      selectedMonth = month;

      monthButtons.forEach(function (btn, i) {
        btn.setAttribute("aria-pressed", i + 1 === month ? "true" : "false");
      });

      monthHeads.forEach(function (th, i) {
        th.classList.toggle("is-selmonth", i + 1 === month);
      });

      var indoorNames = [], sowNames = [], harvestNames = [];
      rowIndex.forEach(function (row) {
        var hits = cropStatesForMonth(row.crop, month);
        row.tr.classList.toggle("is-hit", hits.length > 0);
        row.tr.classList.toggle("is-quiet", hits.length === 0);
        row.cells.forEach(function (td, i) {
          td.classList.toggle("is-selmonth", i + 1 === month);
        });
      });
      crops.forEach(function (c) {
        if (c.startIndoors.indexOf(month) !== -1) { indoorNames.push(c.name); }
        if (c.directSow.indexOf(month) !== -1) { sowNames.push(c.name); }
        if (c.harvest.indexOf(month) !== -1) { harvestNames.push(c.name); }
      });

      summary.textContent = "";
      var strong = el("strong", null, MONTHS_LONG[month - 1] + " in zone " + data.zone + ":");
      summary.appendChild(strong);
      summary.appendChild(document.createTextNode(
        " Start indoors: " + joinNames(indoorNames) +
        ". Direct sow: " + joinNames(sowNames) +
        ". Harvest: " + joinNames(harvestNames) + "."));

      rebuildList(month);
    }

    mount.appendChild(root);
    selectMonth(selectedMonth);
    return root;
  };
})();
