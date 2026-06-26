/**
 * AI活用事例 — Main Script
 * 依存ライブラリなし / No external dependencies
 */
(function () {
  "use strict";

  /* ── 読了時間の計算 ──────────────────────────────────────────── */
  function calcReadingTime() {
    var body = document.querySelector(".article-body");
    if (!body) return;
    // 日本語の平均読書速度 400〜500 字/分、本サイトは 400 字/分を採用
    var chars = (body.textContent || "").replace(/\s+/g, "").length;
    var minutes = Math.max(1, Math.round(chars / 400));
    document.querySelectorAll(".js-reading-time").forEach(function (el) {
      el.textContent = "約" + minutes + "分で読めます";
    });
  }

  /* ── スクロール進捗バー ─────────────────────────────────────── */
  function initProgressBar() {
    var bar = document.getElementById("progress-bar");
    if (!bar) return;

    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = Math.min(100, pct) + "%";
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ── アクティブなナビリンクのハイライト ─────────────────────── */
  function initActiveNav() {
    var path = window.location.pathname;
    document.querySelectorAll(".nav-link").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      // トップページ判定
      var isTop =
        href === "index.html" || href === "../index.html" || href === "/";
      var isCurrentTop =
        path === "/" ||
        path.endsWith("/index.html") ||
        path.endsWith("/ai-usecase/");
      if (isTop && isCurrentTop) {
        a.classList.add("active");
      }
    });
  }

  /* ── 初期化 ─────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    calcReadingTime();
    initProgressBar();
    initActiveNav();
  });
})();
