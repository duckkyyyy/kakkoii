'use client';

import clsx from 'clsx';
import Image from 'next/image';
import ArrowUp from '../atoms/icons/arrowup';

export default function ArticleCover({
  image,
  imageAlt = '',
  title,
  backHref,
  onBack,
  className,
}) {
  const hasBack = Boolean(backHref || onBack);

  return (
    <div className={clsx('article-cover', className)}>
      <div className="article-cover__image-wrap">
        <div className="article-cover__image-inner">
          {image && (
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="article-cover__image"
              sizes="100vw"
              priority
              unoptimized={typeof image === 'string' && image.includes('/kai/')}
            />
          )}
        </div>
        {hasBack && (
          <div className="article-cover__back">
            {backHref ? (
              <a href={backHref} className="article-cover__back-btn" aria-label="Назад">
                <ArrowUp className="article-cover__back-icon" size={40} color="currentColor" />
              </a>
            ) : (
              <button
                type="button"
                onClick={onBack}
                className="article-cover__back-btn"
                aria-label="Назад"
              >
                <ArrowUp className="article-cover__back-icon" size={40} color="currentColor" />
              </button>
            )}
          </div>
        )}
        {title && (
          <div className="article-cover__title-block">
            <h1 className="article-cover__title">{title}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
