/**
 * webdesign-top.js
 * works/web-design/TOP/index.html の共通ロジック。
 * URLの ?id= から works-data.js の該当作品を特定して描画する。
 *
 * work.localReady が true の場合は同フォルダ内のローカルファイル
 * （../{id}/index.html）を優先参照。false（既定）の場合は
 * previewUrl（外部static.jpサイト）を参照する。
 * → 実ファイルを works/web-design/{id}/ に配置し localReady を true にするだけで、
 *   このページも一覧ページも自動的にローカル参照へ切り替わる。
 *
 * 【戻るボタン対策】
 * iframeのsrcを繰り返し切り替える際は、直接 .src に代入せず
 * contentWindow.location.replace() を使う。iframe自身の内部履歴に
 * 余計なエントリを積ませないための処置（クロスオリジンでも実行可能）。
 */

(function () {
  'use strict';

  const PC_W = 1440, PC_H = 900;
  const SP_W = 390,  SP_H = 812;

  /**
   * iframeのURLを切り替える。
   * 初回（まだ何も読み込まれていない）は通常のsrc代入、
   * 2回目以降は contentWindow.location.replace() で履歴を汚さないようにする。
   */
  function navigateFrame(iframe, url) {
    if (!iframe) return;
    try {
      if (iframe.src && iframe.contentWindow) {
        iframe.contentWindow.location.replace(url);
        return;
      }
    } catch (e) {
      // クロスオリジン等で失敗した場合は通常のsrc代入にフォールバック
    }
    iframe.src = url;
  }

  function resolveTargetUrl(work) {
    if (work.localReady) {
      // works/web-design/TOP/ から見て同階層の作品フォルダを参照
      return `../${work.id}/index.html`;
    }
    return work.previewUrl;
  }

  function initTop() {
    if (typeof WORKS === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const work = WORKS.find(w => w.id === id);

    const categoryEl = document.getElementById('wdCategory');
    const titleEl     = document.getElementById('wdTitle');
    const tagsEl        = document.getElementById('wdTags');
    const descEl          = document.getElementById('wdDesc');
    const openNewTab        = document.getElementById('wdOpenNewTab');

    const laptopShell = document.getElementById('deviceLaptop');
    const phoneShell   = document.getElementById('devicePhone');
    const laptopScreen  = laptopShell ? laptopShell.querySelector('.laptop-frame__screen') : null;
    const phoneScreen     = phoneShell  ? phoneShell.querySelector('.phone-frame__screen')  : null;
    const laptopWrap       = document.getElementById('laptopScaleWrap');
    const phoneWrap          = document.getElementById('phoneScaleWrap');
    const laptopFrame          = document.getElementById('previewFrameLaptop');
    const phoneFrame              = document.getElementById('previewFrameGeneric');

    const modal      = document.getElementById('deviceModal');
    const modalBody  = document.getElementById('deviceModalBody');
    const modalMode  = document.getElementById('deviceModalMode');
    const modalClose = document.getElementById('deviceModalClose');
    const modalFrame = document.getElementById('previewFrameModal');

    if (!work) {
      titleEl.textContent = '作品が見つかりませんでした';
      descEl.textContent  = 'URLをご確認いただくか、Works一覧からお探しください。';
      const row = document.querySelector('.device-row');
      if (row) row.style.display = 'none';
      if (openNewTab) openNewTab.style.display = 'none';
      return;
    }

    const targetUrl = resolveTargetUrl(work);

    document.title           = `${work.title} | Hiroshi's Story`;
    categoryEl.textContent   = work.categoryLabel;
    titleEl.textContent      = work.title;
    tagsEl.innerHTML         = work.tags.map(t => `<li class="work-card__tag">${t}</li>`).join('');
    descEl.textContent       = work.longDescription || work.description;
    openNewTab.href          = targetUrl;

    // サムネイル用iframeへの初回読み込み
    navigateFrame(laptopFrame, targetUrl);
    navigateFrame(phoneFrame, targetUrl);

    /* ─── サムネイルの縮小スケールを計算 ─── */
    function fitScale(wrap, virtualW, virtualH, container) {
      if (!wrap || !container) return;
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const scale = Math.min(cw / virtualW, ch / virtualH);
      wrap.style.transform = `scale(${scale})`;
    }

    function updateThumbScales() {
      fitScale(laptopWrap, PC_W, PC_H, laptopScreen);
      fitScale(phoneWrap, SP_W, SP_H, phoneScreen);
    }

    window.addEventListener('resize', updateThumbScales);
    requestAnimationFrame(updateThumbScales);
    setTimeout(updateThumbScales, 300);

    /* ─── 全画面モーダル ─── */
    let currentMode = 'pc';

    function openModal(mode) {
      currentMode = mode;
      modal.classList.add('is-open');
      modal.removeAttribute('aria-hidden');
      document.body.style.overflow = 'hidden';
      modalMode.textContent = mode === 'pc' ? 'PC' : 'SP';
      navigateFrame(modalFrame, targetUrl);
      requestAnimationFrame(() => fitModal(mode));
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      // about:blank に戻すのは通常のsrc代入でよい（履歴を汚す心配がない）
      modalFrame.src = 'about:blank';
    }

    function fitModal(mode) {
      const virtualW = mode === 'pc' ? PC_W : SP_W;
      const virtualH = mode === 'pc' ? PC_H : SP_H;
      const cw = modalBody.clientWidth;
      const ch = modalBody.clientHeight;
      const scale = mode === 'pc'
        ? Math.min(cw / virtualW, ch / virtualH)
        : Math.min(cw / virtualW, ch / virtualH, 1);

      modalFrame.style.width  = `${virtualW}px`;
      modalFrame.style.height = `${virtualH}px`;
      modalFrame.style.transform = `scale(${scale})`;
      modalFrame.style.transformOrigin = 'center center';
      modalFrame.classList.toggle('is-sp', mode === 'sp');
    }

    if (laptopShell) laptopShell.addEventListener('click', () => openModal('pc'));
    if (phoneShell)  phoneShell.addEventListener('click', () => openModal('sp'));
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
    window.addEventListener('resize', () => {
      if (modal.classList.contains('is-open')) fitModal(currentMode);
    });
  }

  document.addEventListener('DOMContentLoaded', initTop);
})();
