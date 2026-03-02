'use client';

import { useState } from 'react';
import { ArticleCard, CategoryFilter, Button } from '../components';

const ARTICLES = [
  {
    id: 1,
    image: '/images/placeholder.png',
    tags: ['Лексика', 'Аниме'],
    title: '5 слов из аниме, которые ты слышишь в каждой серии',
    description: '«めっちゃ», «やばい», «うるさい» — эти слова звучат в каждом втором аниме. Узнай их настоящие значения и как их использовать, чтобы звучать как носитель.',
    cols: 7,
  },
  {
    id: 2,
    image: '/images/placeholder.png',
    tags: ['Грамматика', 'Манга'],
    title: 'Как частицы は и が решают, о ком ты вообще говоришь',
    description: 'Путаешь は и が? Мы разберём эту вечную битву на примерах из «Наруто» и «Нацумэ». Поймёшь разницу раз и навсегда.',
    cols: 3,
  },
  {
    id: 3,
    image: '/images/placeholder.png',
    tags: ['Аудирование', 'Магическая битва'],
    title: 'Пойми диалог из «Магической битвы»: Годжо vs. Сукуна',
    description: 'Разберём культовый диалог на проклятом языке. Услышишь, как грамматика передаёт абсолютную силу и презрение.',
    cols: 6,
  },
  {
    id: 4,
    image: '/images/placeholder.png',
    tags: ['Чтение', 'Еда'],
    title: 'Прочти и пойми отзыв о рамене как японец',
    description: 'Научись читать настоящие отзывы из японских блогов о еде. Узнай, как хвалят идеальный бульон и ругают переваренную лапшу.',
    cols: 4,
  },
  {
    id: 5,
    image: '/images/placeholder.png',
    tags: ['Лексика', 'Сленг'],
    title: 'Весь японский сленг из TikTok и Twitter за 5 минут',
    description: '«えぐい», «り» (w), «ぴえん» — без этого сленга ты не поймёшь современных японцев. Разбираем тренды соцсетей.',
    cols: 5,
  },
  {
    id: 6,
    image: '/images/placeholder.png',
    tags: ['Грамматика'],
    title: '~てください: Как вежливо попросить о чём угодно',
    description: '«えぐい», «り» (w), «ぴえん» — без этого сленга ты не поймёшь современных японцев. Разбираем тренды соцсетей.',
    cols: 5,
  },
];

export default function MaterialsPage() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [chosenTags, setChosenTags] = useState([]);

  return (
    <div className="materials">
      <div className="materials__layout">
        <aside className="materials__sidebar">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryClick={setActiveCategory}
            chosenTags={chosenTags}
            onChosenTagsChange={setChosenTags}
            className="materials__filter"
          />
        </aside>
        <div className="materials__articles">
            {ARTICLES.map((article) => (
              <ArticleCard
                key={article.id}
                href="#"
                image={article.image}
                imageAlt={article.title}
                tags={article.tags}
                title={article.title}
                description={article.description}
                cols={article.cols}
                className="materials__card"
              />
            ))}
            <div className="materials__load-more">
              <Button variant="main" size="big" className="materials__load-btn">
                Загрузить еще
              </Button>
            </div>
          </div>
        </div>
    </div>
  );
}
