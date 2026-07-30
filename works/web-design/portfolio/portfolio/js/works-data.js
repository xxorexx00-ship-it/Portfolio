/**
 * works-data.js
 * 作品データを管理するファイル。
 * 作品を追加するときはこの配列にオブジェクトを1つ追記するだけでOK。
 *
 * category の値がフィルターボタンに自動反映されます。
 * 使用できる category:
 *   'web-app'    → Web App
 *   'web-design' → Web Design
 *   'python'     → Python
 *   'ai-tool'    → AI Tool
 */

const WORKS = [
  {
    id: 'biz-director',
    title: 'BizDirector AI',
    category: 'ai-tool',
    categoryLabel: 'AI Tool',
    tags: ['Python', 'Streamlit', 'Gemini API'],
    description: '業務改善・人材評価・新人教育の3軸でCSVを分析し、AIがアドバイスを出すWebアプリ。キャラクター選択UIやエラーハンドリングも実装済み。',
    thumbnail: 'images/works/biz-director.svg',
    previewUrl: 'https://streamlit-biz-analyst.onrender.com/',
    githubUrl: '#',
  },
  {
    id: 'byakkotai',
    title: '白虎隊サイト',
    category: 'web-design',
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: '幕末・会津藩の白虎隊をテーマにした歴史解説サイト。和風デザインとアニメーションで当時の世界観を表現。',
    thumbnail: 'images/works/byakkotai.svg',
    previewUrl: 'https://st828256.static.jp/byakkotai/',
    githubUrl: '#',
  },
  {
    id: 'it-drill',
    title: 'IT Drill',
    category: 'python',
    categoryLabel: 'Python',
    tags: ['Python', 'AI', 'Notion'],
    description: 'PythonとAIを活用したITスキル学習ドリル。Notionと連携し、学習履歴の管理と出題のパーソナライズを実現。',
    thumbnail: 'images/works/it-drill.svg',
    previewUrl: '#',
    githubUrl: '#',
  },
];

/**
 * カテゴリの表示名マッピング
 * 新しいカテゴリを追加したらここにも追記してください。
 */
const CATEGORY_LABELS = {
  'web-app':    'Web App',
  'web-design': 'Web Design',
  'python':     'Python',
  'ai-tool':    'AI Tool',
};
