'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { ArticleCard } from '../components';
import { searchArticles, LAYOUT_SPANS } from '../data/articles';

const COLS_TABLET = 2;
const COLS_MOBILE = 1;

function SearchPageContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  const results = useMemo(() => searchArticles(q), [q]);

  return (
    <div className="search-page">
      <div className="search-page__grid">
        {!q.trim() ? (
          <p className="search-page__empty">Введите запрос в поиск</p>
        ) : results.length === 0 ? (
          <p className="search-page__empty">Ничего не найдено</p>
        ) : (
          results.map((article, i) => (
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
              className="search-page__card"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="search-page"><p className="search-page__empty">Загрузка…</p></div>}>
      <SearchPageContent />
    </Suspense>
  );
}
