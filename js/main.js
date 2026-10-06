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

  // ファーストビュー（ゲームのタイトル画面ふう）
  var front = document.getElementById("game-front");
  var frontImg = front && front.querySelector(".game-front__image");
  var frontSource = front && front.querySelector("source");
  if (frontImg) {
    // 画像を読み込めなかったら、見出しとボタンをふつうの文字で出す
    var useFallback = function () { front.classList.add("game-front--fallback"); };
    frontImg.addEventListener("error", useFallback);
    if (frontImg.complete && frontImg.naturalWidth === 0) useFallback();

    // config.js で別の画像名が指定されていれば、それに差し替える
    var gf = config.gameFront || {};
    if (gf.mobile && frontSource && frontSource.getAttribute("srcset") !== gf.mobile) {
      frontSource.setAttribute("srcset", gf.mobile);
    }
    if (gf.desktop && frontImg.getAttribute("src") !== gf.desktop) {
      frontImg.setAttribute("src", gf.desktop);
    }
  }

  // ことばのタネ（コンセプト画像）
  var seedFrame = document.querySelector('[data-slot="seed"] .frame');
  if (seedFrame) {
    loadImage(config.seed, function (img) {
      if (img) putImage(seedFrame, config.seed, img);
    });
  }

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

  // ファーストビューの「冒険をはじめる」
  // デモURLがあればデモへ。無いあいだは #demo（ページ内）のまま。
  var start = document.getElementById("front-start");
  if (start && config.demoUrl) {
    start.href = config.demoUrl;
    if (config.demoOpenInNewTab) {
      start.target = "_blank";
      start.rel = "noopener";
      start.setAttribute("aria-label", "TOMORIの冒険をはじめる（新しいタブで開きます）");
    }
  }
})();
