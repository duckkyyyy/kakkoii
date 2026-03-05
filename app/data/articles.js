export const ARTICLES = [
  {
    id: 0,
    slug: '10-slov-anime',
    image: '/images/covers/10-slov-anime-cover.png',
    tags: ['Лексика', 'Аниме'],
    title: '10 слов, которые ты слышишь в каждом аниме, но не знаешь, что они значат',
    description: 'Топ самых частых слов из аниме — от «めっちゃ» до «マジで». Запоминай, они будут встречаться тебе постоянно.',
  },
  {
    id: 2,
    slug: 'slova-intonaciya',
    image: '/images/covers/slova-intonaciya.png',
    tags: ['Лексика', 'Интонация'],
    title: 'Слова, которые меняют смысл в зависимости от интонации',
    description: 'Одно и то же «はい» — и «да», и «чё тебе?», и «что?!!». Разбираем слова-хамелеоны.',
  },
  {
    id: 3,
    slug: 'rugatelstva-anime',
    image: '/images/covers/rugatelstva-anime.png',
    tags: ['Лексика', 'Аниме'],
    title: 'Как ругаются в японских аниме',
    description: 'Нет русского мата, но есть バカ, くそ и この野郎. Разбираем ругательства из аниме.',
  },
  {
    id: 4,
    slug: 'chasticy-wa-i-ga',
    image: '/images/covers/chasticy-wa-i-ga.png',
    tags: ['Грамматика', 'Манга'],
    title: 'Война миров: は vs が — кто главный в предложении?',
    description: 'Когда は, а когда が? Разбираем на примерах из аниме — перестанешь путать раз и навсегда.',
  },
  {
    id: 5,
    slug: 'te-forma',
    image: '/images/covers/te-forma.png',
    tags: ['Грамматика', 'Манга'],
    title: 'て-форма: главное комбо японского языка',
    description: 'Соединять действия, просить, описывать процесс. Освой て-форму — ключ к половине японской речи.',
  },
  {
    id: 6,
    slug: 'tai-hoshii',
    image: '/images/covers/tai-hoshii.png',
    tags: ['Грамматика', 'Манга'],
    title: '〜たい、〜ほしい、〜てほしい: как говорить о своих желаниях',
    description: 'Хочешь сделать сам, хочешь вещь или чтобы другой сделал? Разбираем たい, ほしい и てほしい.',
  },
  {
    id: 7,
    slug: 'sugiru',
    image: '/images/covers/sugiru.png',
    tags: ['Грамматика', 'Манга'],
    title: '〜すぎる: когда всего слишком много',
    description: 'Слишком жарко, переел, слишком дорого. Освой すぎる — и жалуйся как настоящий японец.',
  },
  {
    id: 10,
    slug: 'ramen-menu',
    image: '/images/covers/ramen-menu.png',
    tags: ['Чтение', 'Еда'],
    title: 'Меню в японском ресторане: что скрывается за названиями блюд',
    description: 'Заказывать еду в Японии страшно только первый раз. Реальное меню раменной — разобрали каждую строчку.',
  },
  {
    id: 13,
    slug: 'blogger-weekend',
    image: '/images/covers/blogger-weekend.png',
    tags: ['Чтение', 'Соцсети'],
    title: 'Пост японского блогера: как он провёл выходные',
    description: 'Реальные посты японцев — не учебниковый японский. Пост о поездке на море и разговорные конструкции.',
  },
  {
    id: 14,
    slug: 'weather-forecast',
    image: '/images/covers/weather-forecast.png',
    tags: ['Чтение', 'Новости'],
    title: 'Прогноз погоды: что говорят в японских новостях',
    description: 'Начни с прогноза погоды — простые конструкции. Говори о погоде как взрослый.',
  },
  {
    id: 15,
    slug: 'jujutsu-first-page',
    image: '/images/covers/jujutsu-first-page.png',
    tags: ['Чтение', 'Манга'],
    title: 'Первая страница манги «Магическая битва»',
    description: 'Первый разворот культовой манги: диалог Годжо и Мегуми. Читай в оригинале.',
  },
  {
    id: 11,
    slug: 'tiktok-twitter-sleneg',
    image: '/images/covers/tiktok-twitter-sleneg.png',
    tags: ['Лексика', 'Сленг'],
    title: 'Японский сленг из TikTok и Twitter',
    description: 'Сокращения, странные буквы и смайлики — без этого не поймёшь современного японца в сети.',
  },
];

export const LAYOUT_SPANS = [5, 5, 7, 3, 4, 3, 3, 5, 5, 4, 4, 2];

export function searchArticles(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return ARTICLES;
  return ARTICLES.filter((a) => {
    const inTitle = a.title && a.title.toLowerCase().includes(q);
    const inDesc = a.description && a.description.toLowerCase().includes(q);
    const inTags = Array.isArray(a.tags) && a.tags.some((t) => String(t).toLowerCase().includes(q));
    return inTitle || inDesc || inTags;
  });
}
