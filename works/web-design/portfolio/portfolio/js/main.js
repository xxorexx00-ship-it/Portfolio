/**
 * main.js
 * - ナビゲーションのスクロール背景変化
 * - ハンバーガーメニュー（モバイル）
 * - スムーズスクロール（href="#..." のリンク）
 * - アクティブナビリンクのハイライト
 */

(function () {
  'use strict';

  /* ─── Nav: スクロールで背景変化 ─── */
  function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    function updateNav() {
      if (window.scrollY > 40) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav(); // 初期状態
  }

  /* ─── Hamburger Menu ─── */
  function initHamburger() {
    const hamburger = document.getElementById('navHamburger');
    const menu = document.getElementById('navMenu');
    if (!hamburger || !menu) return;

    function openMenu() {
      menu.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'メニューを閉じる');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'メニューを開く');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      const isOpen = menu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    // メニューリンクをクリックしたら閉じる
    menu.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Escape キーで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        hamburger.focus();
      }
    });

    // メニュー外クリックで閉じる（メニュー本体のクリックは除く）
    menu.addEventListener('click', (e) => {
      if (e.target === menu) closeMenu();
    });
  }

  /* ─── Active Nav Link on Scroll ─── */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!sections.length || !navLinks.length) return;

    const NAV_HEIGHT = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '68'
    );

    function updateActiveLink() {
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - NAV_HEIGHT - 60;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('is-active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('is-active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initHamburger();
    initActiveNav();
  });
})();
