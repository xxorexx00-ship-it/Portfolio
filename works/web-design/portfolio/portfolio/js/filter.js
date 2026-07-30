/**
 * filter.js
 * カテゴリフィルターの生成 + カード表示/非表示
 */

(function () {
  'use strict';

  /**
   * WORKS データから使用されているカテゴリを抽出し
   * フィルターボタンを動的に生成する
   */
  function buildFilters() {
    const filterContainer = document.getElementById('filter');
    if (!filterContainer || typeof WORKS === 'undefined') return;

    // カテゴリを重複なく抽出
    const categories = [...new Set(WORKS.map((w) => w.category))];

    categories.forEach((cat) => {
      const label = CATEGORY_LABELS[cat] || cat;
      const btn = document.createElement('button');
      btn.className = 'filter__btn';
      btn.dataset.filter = cat;
      btn.textContent = label;
      btn.setAttribute('aria-pressed', 'false');
      filterContainer.appendChild(btn);
    });
  }

  /**
   * WORKS データから作品カードを動的に生成し
   * グリッドにレンダリングする
   */
  function buildCards() {
    const grid = document.getElementById('worksGrid');
    if (!grid || typeof WORKS === 'undefined') return;

    WORKS.forEach((work) => {
      const li = document.createElement('li');
      li.className = 'work-card reveal';
      li.dataset.category = work.category;

      const thumbContent = work.thumbnail
        ? `<img
             src="${work.thumbnail}"
             alt="${work.title}のサムネイル"
             width="640"
             height="360"
             loading="lazy"
           />`
        : `<div class="work-card__thumb-placeholder" aria-hidden="true">No Image</div>`;

      const previewBtn = work.previewUrl && work.previewUrl !== '#'
        ? `<a
             href="${work.previewUrl}"
             class="btn btn--primary btn--sm"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="${work.title}のプレビューを開く（新しいタブ）"
           >Preview</a>`
        : `<span class="btn btn--outline btn--sm" aria-disabled="true" style="opacity:.4;cursor:default;">Preview</span>`;

      const githubBtn = work.githubUrl && work.githubUrl !== '#'
        ? `<a
             href="${work.githubUrl}"
             class="btn btn--outline btn--sm"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="${work.title}のGitHubリポジトリを開く（新しいタブ）"
           >GitHub</a>`
        : `<span class="btn btn--outline btn--sm" aria-disabled="true" style="opacity:.4;cursor:default;">GitHub</span>`;

      li.innerHTML = `
        <div class="work-card__thumb">${thumbContent}</div>
        <div class="work-card__body">
          <p class="work-card__category">${work.categoryLabel}</p>
          <h3 class="work-card__title">${work.title}</h3>
          <ul class="work-card__tags" aria-label="使用技術">
            ${work.tags.map((t) => `<li class="work-card__tag">${t}</li>`).join('')}
          </ul>
          <p class="work-card__desc">${work.description}</p>
          <div class="work-card__actions">
            ${previewBtn}
            ${githubBtn}
          </div>
        </div>
      `;

      grid.appendChild(li);
    });
  }

  /**
   * フィルターボタンのクリックイベントを設定する
   */
  function bindFilterEvents() {
    const filterContainer = document.getElementById('filter');
    const grid = document.getElementById('worksGrid');
    if (!filterContainer || !grid) return;

    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter__btn');
      if (!btn) return;

      const selected = btn.dataset.filter;

      // ボタンのアクティブ状態を更新
      filterContainer.querySelectorAll('.filter__btn').forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      // カードの表示/非表示
      grid.querySelectorAll('.work-card').forEach((card) => {
        const match = selected === 'all' || card.dataset.category === selected;
        card.classList.toggle('is-hidden', !match);
      });
    });
  }

  /**
   * 初期化
   */
  function init() {
    buildCards();
    buildFilters();
    bindFilterEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
