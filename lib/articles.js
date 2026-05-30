import articleIndex from '../data/articles/index.json';

import json10SlovAnime from '../data/articles/10-slov-anime.json';
import jsonTiktok from '../data/articles/tiktok-twitter-sleneg.json';
import jsonSlovaIntonaciya from '../data/articles/slova-intonaciya.json';
import jsonRugatelstva from '../data/articles/rugatelstva-anime.json';
import jsonWaGa from '../data/articles/chasticy-wa-i-ga.json';
import jsonTeForma from '../data/articles/te-forma.json';
import jsonTaiHoshii from '../data/articles/tai-hoshii.json';
import jsonSugiru from '../data/articles/sugiru.json';
import jsonMagicBattleS3e1 from '../data/articles/magic-battle-s3e1.json';
import jsonKimetsuS2e1 from '../data/articles/kimetsu-s2e1.json';
import jsonRamenMenu from '../data/articles/ramen-menu.json';
import jsonBloggerWeekend from '../data/articles/blogger-weekend.json';
import jsonWeatherForecast from '../data/articles/weather-forecast.json';
import jsonJujutsuFirstPage from '../data/articles/jujutsu-first-page.json';

const ARTICLE_JSON_BY_SLUG = {
  '10-slov-anime': json10SlovAnime,
  'tiktok-twitter-sleneg': jsonTiktok,
  'slova-intonaciya': jsonSlovaIntonaciya,
  'rugatelstva-anime': jsonRugatelstva,
  'chasticy-wa-i-ga': jsonWaGa,
  'te-forma': jsonTeForma,
  'tai-hoshii': jsonTaiHoshii,
  sugiru: jsonSugiru,
  'magic-battle-s3e1': jsonMagicBattleS3e1,
  'kimetsu-s2e1': jsonKimetsuS2e1,
  'ramen-menu': jsonRamenMenu,
  'blogger-weekend': jsonBloggerWeekend,
  'weather-forecast': jsonWeatherForecast,
  'jujutsu-first-page': jsonJujutsuFirstPage,
};

export const LAYOUT_SPANS = [5, 5, 7, 3, 4, 3, 3, 5, 5, 4, 4, 2];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getAllArticleSlugs() {
  return articleIndex.map((e) => e.slug);
}

export function getArticleBySlug(slug) {
  const meta = articleIndex.find((e) => e.slug === slug);
  const body = ARTICLE_JSON_BY_SLUG[slug];
  if (!meta || !body) return null;
  return { ...meta, ...body };
}

export function getArticlesList() {
  return articleIndex.map((entry, i) => {
    const body = ARTICLE_JSON_BY_SLUG[entry.slug];
    const merged = { ...entry, ...(body || {}) };
    return {
      id: i,
      slug: merged.slug,
      image: merged.image,
      tags: merged.tags,
      title: merged.title,
      description: merged.description,
    };
  });
}

export function getFeaturedArticles() {
  const list = getArticlesList();
  return shuffle(list).slice(0, 5).map((article, i) => ({
    ...article,
    cols: i < 2 ? 6 : 4,
    tabletCols: i < 2 ? 6 : 4,
    mobileCols: 12,
  }));
}

export function searchArticles(query) {
  const q = (query || '').trim().toLowerCase();
  const list = getArticlesList();
  if (!q) return list;
  return list.filter((a) => {
    const inTitle = a.title && a.title.toLowerCase().includes(q);
    const inDesc = a.description && a.description.toLowerCase().includes(q);
    const inTags = Array.isArray(a.tags) && a.tags.some((t) => String(t).toLowerCase().includes(q));
    return inTitle || inDesc || inTags;
  });
}
