/**
 * intro.js
 * sessionStorageを使い、セッション初回のみイントロを表示。
 * 別ページから戻った場合・同一セッション内の再訪問はスキップしてサイトを直接表示。
 *
 * INTRO_ENABLED を false にすると、イントロ画面を完全に停止し
 * 常にメインサイトが即表示される（元に戻す場合は true に戻すだけ）。
 */

(function () {
  'use strict';

  const INTRO_ENABLED = false; // ← true にすればイントロ画面を復活できます

  const SESSION_KEY = 'hs_intro_done';

  function initIntro() {
    const intro    = document.getElementById('intro');
    const enterBtn = document.getElementById('enterBtn');
    const site     = document.getElementById('site');

    if (!intro || !enterBtn || !site) return;

    // イントロ停止中は常にスキップして即サイト表示
    if (!INTRO_ENABLED) {
      skipIntro(intro, site);
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // セッション内で一度でもENTERを押していたらスキップ
    if (sessionStorage.getItem(SESSION_KEY)) {
      skipIntro(intro, site);
      return;
    }

    // 初回：イントロを表示してアニメーション
    requestAnimationFrame(() => {
      intro.querySelector('.intro__eyebrow').classList.add('is-visible');
      intro.querySelectorAll('.intro__title-line').forEach(el => el.classList.add('is-visible'));
      intro.querySelector('.intro__enter').classList.add('is-visible');
    });

    function enterSite() {
      enterBtn.disabled = true;
      sessionStorage.setItem(SESSION_KEY, '1');

      if (reducedMotion) { finalize(); return; }

      intro.classList.add('is-leaving');
      intro.addEventListener('animationend', finalize, { once: true });
      setTimeout(finalize, 800);
    }

    enterBtn.addEventListener('click', enterSite);
    enterBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enterSite(); }
    });

    let finalized = false;
    function finalize() {
      if (finalized) return;
      finalized = true;
      showSite(intro, site);
    }
  }

  // イントロをスキップして即サイト表示
  function skipIntro(intro, site) {
    intro.style.display = 'none';
    intro.setAttribute('aria-hidden', 'true');
    showSite(intro, site, true);
  }

  // サイトを表示する共通処理
  function showSite(intro, site, immediate) {
    intro.style.display    = 'none';
    intro.setAttribute('aria-hidden', 'true');
    site.classList.add('is-active');
    site.removeAttribute('aria-hidden');
    document.body.classList.add('site-active');
    document.body.style.overflow = '';

    // スキップ時はアニメーションなしで即表示
    if (immediate) {
      site.style.animation = 'none';
      site.style.opacity   = '1';
    }

    setTimeout(() => {
      if (typeof window.__initObserver === 'function') window.__initObserver();
    }, 100);
  }

  document.addEventListener('DOMContentLoaded', initIntro);
})();
