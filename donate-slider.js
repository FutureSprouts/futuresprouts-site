/* Donation impact slider for donate.html.
   Illustrative only: never touches donation amounts, PayPal
   plans, or monthly chips. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var range = document.getElementById('impactRange');
  var readout = document.getElementById('impactReadout');
  var line = document.getElementById('impactLine');
  var figure = document.getElementById('impactFigure');
  if (!range || !readout || !line || !figure) return;

  var stages = figure.querySelectorAll('.impact-stage');

  /* Anchors: $5 = 8 seed packs, $25 = 40 seed packs (one classroom),
     $50 = a full garden kit, $100 = supplies for a community
     planting event. Seed packs interpolate linearly (1.6 packs
     per dollar) between the $5 and $25 anchors. */
  function seedPacks(v) {
    return Math.round(v * 1.6);
  }

  function describe(v) {
    if (v >= 100) {
      return 'supplies for a community planting event';
    }
    if (v >= 50) {
      return 'a full garden kit: seeds, soil, markers, and a growing guide';
    }
    var packs = seedPacks(v);
    if (v >= 25) {
      return 'about ' + packs + ' seed packs, enough to supply ' +
        (v === 25 ? 'one full classroom' : 'a classroom and then some');
    }
    return 'about ' + packs + ' seed packs for young growers';
  }

  function stageFor(v) {
    if (v >= 100) return 4;
    if (v >= 50) return 3;
    if (v >= 25) return 2;
    return 1;
  }

  function update() {
    var v = Number(range.value);
    var min = Number(range.min);
    var max = Number(range.max);
    var pct = ((v - min) / (max - min)) * 100;

    range.style.setProperty('--is-fill', pct + '%');

    var text = describe(v);
    readout.textContent = '$' + v;
    line.textContent = 'A $' + v + ' gift grows ' + text + '.';
    range.setAttribute('aria-valuetext', v + ' dollars, ' + text);

    var stage = stageFor(v);
    for (var i = 0; i < stages.length; i++) {
      var minStage = Number(stages[i].getAttribute('data-stage'));
      stages[i].classList.toggle('on', stage >= minStage);
    }
  }

  range.addEventListener('input', update);
  update();
})();
