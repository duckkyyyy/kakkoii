'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Tag from '../atoms/Tag';
import Typography from '../atoms/Typography';

export default function ArticleCard({
  href,
  image,
  imageAlt = '',
  tags = [],
  title,
  description,
  readLabel = 'Читать',
  cols = 4,
  tabletCols = null,
  mobileCols = null,
  className,
}) {
  const colSpan = `col-span-${cols}`;
  const mdSpan = tabletCols != null ? `md-col-span-${tabletCols}` : '';
  const smSpan = mobileCols != null ? `sm-col-span-${mobileCols}` : '';
  const wrapperClasses = clsx(colSpan, mdSpan, smSpan, className);

  const isInternalHref =
    typeof href === 'string' && href.startsWith('/') && !href.startsWith('//');

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
              unoptimized={typeof image === 'string' && image.includes('/kai/')}
            />
          )}
        </div>
        {tags.length > 0 && (
          <div className="article-card__tags">
            {tags.map((tag, i) => (
              <Tag key={i} size="medium" variant="default" className="article-card__tag">
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
          <Typography variant="16-medium" className="article-card__description">
            {description}
          </Typography>
        )}
      </div>
    </>
  );

  if (href) {
    if (isInternalHref) {
      return (
        <Link href={href} className={clsx('article-card', wrapperClasses)}>
          {content}
        </Link>
      );
    }
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
