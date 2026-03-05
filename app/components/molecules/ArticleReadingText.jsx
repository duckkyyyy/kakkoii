'use client';

import clsx from 'clsx';

export default function ArticleReadingText({ segments, className, variant = '32-medium' }) {
  const typoClass = variant === '32-medium' ? 'typo typo-32-medium' : 'typo typo-24-medium';

  return (
    <p className={clsx(typoClass, 'article-reading-text', className)}>
      {segments.map((seg, i) => {
        if (seg.type === 'word') {
          return (
            <span
              key={i}
              className="article-reading-text__word"
              data-translation={seg.translation}
              tabIndex={0}
              role="button"
              aria-label={`Перевод: ${seg.translation}`}
            >
              {seg.value}
              <span className="article-reading-text__tooltip" role="tooltip">
                {seg.translation}
              </span>
            </span>
          );
        }
        return <span key={i}>{seg.value}</span>;
      })}
    </p>
  );
}
