/* =========================================================
   config.js の内容をページへ反映する
   （このファイルはふだん触らなくてよい）
   ========================================================= */

(function () {
  var config = window.TOMORI_CONFIG || {};

  // 画像を読み込む。読み込めたら img を、だめなら null を返す。
  function loadImage(item, done) {
    if (!item || !item.src) return done(null);
    var img = document.createElement("img");
    img.alt = item.alt || "";
    img.decoding = "async";
    img.onload = function () { done(img); };
    img.onerror = function () { done(null); };
    img.src = item.src;
  }

  // 枠に画像を入れる。縦横比の指定が無ければ、画像そのものの比率を使う。
  function putImage(frame, item, img) {
    var ratio = item.ratio || (img.naturalWidth + " / " + img.naturalHeight);
    if (item.ratio || frame.dataset.autoRatio === "true") {
      frame.style.setProperty("--ratio", ratio);
    }
    if (item.position) frame.style.setProperty("--pos", item.position);
    frame.appendChild(img);
    frame.classList.add("has-image");
  }

  // コンセプト画像（ファーストビュー・ことばのタネ）
  [["hero", config.hero], ["seed", config.seed]].forEach(function (pair) {
    var frame = document.querySelector('[data-slot="' + pair[0] + '"] .frame');
    if (!frame) return;
    loadImage(pair[1], function (img) {
      if (img) putImage(frame, pair[1], img);
    });
  });

  // 実際のアプリ画面：読み込めた画像だけでカードを作る
  var section = document.getElementById("screens");
  var list = document.getElementById("screens-list");
  var shots = config.screenshots || [];
  var results = [];
  var waiting = shots.length;

  function renderScreens() {
    var count = 0;
    results.forEach(function (r) {
      if (!r || !r.img) return;
      var figure = document.createElement("figure");
      figure.className = "screen";
      var frame = document.createElement("div");
      frame.className = "frame";
      frame.dataset.autoRatio = "true";
      putImage(frame, r.item, r.img);
      if (r.img.naturalHeight > r.img.naturalWidth) figure.classList.add("screen-portrait");
      figure.appendChild(frame);
      if (r.item.caption) {
        var cap = document.createElement("figcaption");
        cap.textContent = r.item.caption;
        figure.appendChild(cap);
      }
      list.appendChild(figure);
      count++;
    });
    if (count > 0) {
      list.classList.add("screens-" + count);
      section.hidden = false;
    }
  }

  if (section && list && waiting > 0) {
    shots.forEach(function (item, i) {
      loadImage(item, function (img) {
        results[i] = img ? { item: item, img: img } : null;
        waiting--;
        if (waiting === 0) renderScreens();
      });
    });
  }

  // デモボタン（URLが無いあいだは、リンクにしない）
  var link = document.getElementById("demo-link");
  var note = document.getElementById("demo-note");
  if (link && config.demoUrl) {
    link.href = config.demoUrl;
    link.removeAttribute("aria-disabled");
    link.textContent = "デモを体験する";
    if (config.demoOpenInNewTab) {
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute("aria-label", "デモを体験する（新しいタブで開きます）");
    }
    if (note) note.hidden = true;
  }
})();
