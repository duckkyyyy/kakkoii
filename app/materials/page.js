'use client';

import { useState, useEffect } from 'react';
import { ArticleCard, CategoryFilter, Button } from '../components';
import { ARTICLES, LAYOUT_SPANS } from '../data/articles';

const COLS_TABLET = 2;
const COLS_MOBILE = 1;
const INITIAL_VISIBLE = 4;

const FIRST_TAGS = [...new Set(ARTICLES.map((a) => a.tags[0]).filter(Boolean))].sort();
const CATEGORIES = ['Все', ...FIRST_TAGS, 'Аудирование'];
const SECOND_TAGS = [...new Set(ARTICLES.map((a) => a.tags[1]).filter(Boolean))].sort();
const DISABLED_CATEGORIES = CATEGORIES.filter((c) => c !== 'Все' && !FIRST_TAGS.includes(c));

export default function MaterialsPage() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [chosenTags, setChosenTags] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filteredByCategory =
    activeCategory === 'Все'
      ? ARTICLES
      : ARTICLES.filter((a) => a.tags[0] === activeCategory);
  const filteredArticles =
    chosenTags.length === 0
      ? filteredByCategory
      : filteredByCategory.filter((a) => a.tags[1] && chosenTags.includes(a.tags[1]));
  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleCategoryClick = (value) => {
    setActiveCategory(value);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const handleChosenTagsChange = (next) => {
    setChosenTags(next);
    setVisibleCount(INITIAL_VISIBLE);
  };

  useEffect(() => {
    const footer = document.querySelector('.footer-root');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle('footer-in-viewport', entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    );
    observer.observe(footer);
    return () => {
      observer.disconnect();
      document.body.classList.remove('footer-in-viewport');
    };
  }, []);

  return (
    <div className="materials">
      <div className="materials__layout">
        <aside className="materials__sidebar">
          <CategoryFilter
            categories={CATEGORIES}
            disabledCategories={DISABLED_CATEGORIES}
            tags={SECOND_TAGS}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
            chosenTags={chosenTags}
            onChosenTagsChange={handleChosenTagsChange}
            className="materials__filter"
          />
        </aside>
        <div className="materials__articles">
            {visibleArticles.map((article, i) => (
              <ArticleCard
                key={article.id}
                href={article.slug ? `/article/${article.slug}` : '#'}
                image={article.image}
                imageAlt={article.title}
                tags={article.tags}
                title={article.title}
                description={article.description}
                cols={LAYOUT_SPANS[i % LAYOUT_SPANS.length]}
                tabletCols={COLS_TABLET}
                mobileCols={COLS_MOBILE}
                className="materials__card"
              />
            ))}
            {hasMore && (
              <div className="materials__load-more">
                <Button
                  variant="main"
                  size="big"
                  className="materials__load-btn"
                  onClick={() => setVisibleCount(filteredArticles.length)}
                >
                  Показать еще
                </Button>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
