/**
 * works-data.js
 * categories に複数指定可能。フィルターはOR検索（どれか1つ含めば表示）。
 *
 * Web Design作品の localReady について：
 *   false（既定） → previewUrl（外部static.jpサイト）を参照
 *   true          → 同名フォルダ内のローカルファイル（../{id}/index.html）を優先参照
 *   実ファイルを works/web-design/{id}/ に配置したら true にするだけで
 *   一覧・詳細ページ両方が自動的にローカル参照に切り替わる。
 */

const WORKS = [
  {
    id: 'loop-learning',
    title: 'Loop Learning',
    categories: ['python', 'ai-tool'],
    categoryLabel: 'Python / AI Tool',
    tags: ['Python', 'AI', 'Notion'],
    description: 'PythonとAIを活用したITスキル学習ドリル。Notionと連携し、学習履歴の管理と出題のパーソナライズを実現。',
    thumbnail: 'images/works/it-drill.svg',
    previewUrl: 'loop-learning/index.html',
  },

  {
    id: 'biz-director',
    title: 'BizDirector AI',
    categories: ['ai-tool', 'python'],
    categoryLabel: 'AI Tool / Python',
    tags: ['Python', 'Streamlit', 'Gemini API'],
    description: '業務改善・人材評価・新人教育の3軸でCSVを分析し、AIがアドバイスを出すWebアプリ。キャラクター選択UIやエラーハンドリングも実装済み。',
    thumbnail: 'images/works/biz-director.svg',
    previewUrl: '#',
  },

  {
    id: 'loop-learning-showcase',
    title: 'Loop Learning 紹介サイト',
    categories: ['web-design'],
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: '自作ツール「Loop Learning」を紹介する単独のWebページ。JavaScript実装の授業の一環として制作。',
    thumbnail: 'images/works/loop-learning-showcase.svg',
    previewUrl: '/works/web-design/LoopLearning-showcase/index.html',
    localReady: false,
  },
  {
    id: 'jojo-fansite',
    title: 'ジョジョ名言集ファンサイト',
    categories: ['web-design'],
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: '「ジョジョの奇妙な冒険」の名言を紹介する架空のファンサイト。世界観を意識したビジュアル表現に挑戦。',
    thumbnail: 'images/works/jojo-fansite.svg',
    previewUrl: '/works/web-design/jojo-fansite/index.html',
    localReady: false,
  },

  {
    id: 'grid-layout',
    title: '架空のインテリアサイトページ',
    categories: ['web-design'],
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: '家具、インテリアをテーマにした商品紹介風サイト。グリッドレイアウトで可変的な空間を表現。',
    thumbnail: 'images/works/grid-layout.svg',
    previewUrl: '/works/web-design/grid-layout/index.html',
    localReady: false,
  },
  {
    id: 'music-lessons',
    title: 'Music Lessons',
    categories: ['web-design'],
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: '音楽レッスンをテーマにした架空のスクール紹介サイト。',
    thumbnail: 'images/works/music-lessons.svg',
    previewUrl: '/works/web-design/music-lessons/index.html',
    localReady: false,
  },
    {
    id: 'clippath',
    title: 'clippath',
    categories: ['web-design'],
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: 'クリップパス、ファビコン課題の習作',
    thumbnail: 'images/works/music-lessons.svg',
    previewUrl: '/works/web-design/clippath/index.html',
    localReady: false,
  },
  {
    id: 'byakkotai',
    title: '白虎隊サイト',
    categories: ['web-design'],
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: '幕末・会津藩の白虎隊をテーマにした歴史解説サイト。和風デザインとアニメーションで当時の世界観を表現。',
    thumbnail: 'images/works/byakkotai.svg',
    previewUrl: '/works/web-design/byakkotai/index.html',
    localReady: false,
  },

  {
    id: 'art-gallery',
    title: 'Art Gallery',
    categories: ['design'],
    categoryLabel: 'Graphic Design',
    tags: ['Photoshop', 'Illustrator'],
    description: 'PhotoshopおよびIllustratorで制作したグラフィック作品集。',
    thumbnail: 'images/works/biz-director.svg',
    previewUrl: '#gallery',
  },
];

const CATEGORY_LABELS = {
  'web-app':    'Web App',
  'web-design': 'Web Design',
  'python':     'Python',
  'ai-tool':    'AI Tool',
  'design':     'Design',
};
