/* =========================================================
   差し替え用の設定ファイル
   デモURL・画像を差し替えるときは、このファイルだけを書き換える。
   空文字 "" のままなら、ページには「準備中」の枠が出る。
   ========================================================= */

window.TOMORI_CONFIG = {

  // デモのURL（例："https://example.com/demo/"）
  demoUrl: "",

  // デモを新しいタブで開くか（true / false）
  demoOpenInNewTab: true,

  // ── 世界観を伝えるコンセプト画像（実際のアプリ画面ではない） ──

  // ファーストビュー（ゲームのタイトル画面ふうの画像）
  // PC用は横長、スマホ用（画面幅767px以下）は縦長。切り取らずに表示する。
  // ※ 画像を作り直して、緑のボタンの位置が変わったときは、
  //   css/style.css の .game-front__start-hitarea の数値も直すこと。
  gameFront: {
    desktop: "images/tomori-game-front-desktop.webp",
    mobile: "images/tomori-game-front-mobile.webp"
  },

  // 「言葉にすると、世界が変わる」セクション
  seed: {
    src: "images/tomori-word-seed-concept.webp",
    alt: "朝の草原で、金色と水色の光に包まれて浮かぶ、芽の出たことばのタネ",
    ratio: "16 / 9"
  },

  // ── 実際のアプリ画面（スクリーンショットだけを入れる） ──
  // ・src が空のカード、画像を読み込めなかったカードは、ページに出ない。
  // ・1枚も無いときは、「実際のアプリ画面」のセクションごと出ない。
  // ・画像が届いたら images/ に置き、src の "" の中へファイル名を書く。
  //     1枚目 → "images/tomori-app-start.webp"
  //     2枚目 → "images/tomori-app-words.webp"
  //     3枚目 → "images/tomori-app-adventure.webp"
  // ・縦横比は画像そのものに合わせて自動で決まる（変形も切り取りもしない）。
  //   切り取って見せたいときだけ ratio（例："16 / 9"）と position（例："50% 30%"）を書く。
  // ・コンセプト画像をここへ入れないこと。
  screenshots: [
    {
      src: "",
      alt: "TOMORIのはじめの世界の画面",
      caption: "はじめの世界"
    },
    {
      src: "",
      alt: "写真から言葉を見つける画面",
      caption: "写真から、言葉を見つける"
    },
    {
      src: "",
      alt: "ことばのタネが世界をひらく場面の画面",
      caption: "ことばのタネが、世界をひらく"
    }
  ]
};
