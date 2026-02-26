'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Tag from '../atoms/Tag';
import Typography from '../atoms/Typography';

/**
 * Карточка статьи. Ширина задаётся количеством колонок в сетке (desktop / tablet / mobile).
 * Использовать внутри Grid: <Grid><ArticleCard cols={4} ... /></Grid>
 */
export default function ArticleCard({
  href,
  image,
  imageAlt = '',
  tags = [],
  title,
  description,
  readLabel = 'Читать',
  // колонки сетки (1–12): ширина карточки = cols
  cols = 4,
  tabletCols = null,
  mobileCols = null,
  className,
}) {
  const colSpan = `col-span-${cols}`;
  const mdSpan = tabletCols != null ? `md-col-span-${tabletCols}` : '';
  const smSpan = mobileCols != null ? `sm-col-span-${mobileCols}` : '';
  const wrapperClasses = clsx(colSpan, mdSpan, smSpan, className);

  const content = (
    <>
      <div className="article-card__image-wrap">
        <div className="article-card__image-inner">
          {image && (
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="article-card__image"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          )}
        </div>
        {tags.length > 0 && (
          <div className="article-card__tags">
            {tags.map((tag, i) => (
              <Tag key={i} size="small" variant="default" className="article-card__tag">
                {typeof tag === 'string' ? tag : tag.label}
              </Tag>
            ))}
          </div>
        )}
        <div className="article-card__hover">
          <span className="article-card__read-btn">{readLabel}</span>
        </div>
      </div>
      <div className="article-card__content">
        {title && (
          <Typography variant="20-semi" className="article-card__title">
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="16-regular" className="article-card__description">
            {description}
          </Typography>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={clsx('article-card', wrapperClasses)}>
        {content}
      </a>
    );
  }

  return (
    <article className={clsx('article-card', 'article-card--no-link', wrapperClasses)}>
      {content}
    </article>
  );
}
