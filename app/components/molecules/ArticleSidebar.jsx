'use client';

import clsx from 'clsx';
import Typography from '../atoms/Typography';
import Clip from '../atoms/icons/clip';

export default function ArticleSidebar({
  variant = 'full',
  tocItems = [],
  links = [],
  className,
}) {
  const hasToc = variant === 'full' && tocItems.length > 0;

  return (
    <aside
      className={clsx(
        'article-sidebar',
        hasToc && 'article-sidebar--with-toc',
        className
      )}
    >
      {hasToc && (
        <nav className="article-sidebar__toc">
          {tocItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="article-sidebar__toc-link"
            >
              <Typography variant="24-medium">{label}</Typography>
            </a>
          ))}
        </nav>
      )}
      <div className="article-sidebar__links">
        {links.length > 0 ? (
          links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="article-sidebar__link-item"
            >
              <Clip size={28} color="currentColor" className="article-sidebar__link-icon" />
              <Typography variant="24-semi">{label}</Typography>
            </a>
          ))
        ) : (
          <div className="article-sidebar__link-item article-sidebar__link-item--placeholder">
            <Clip size={28} color="currentColor" className="article-sidebar__link-icon" />
            <Typography variant="24-semi">Список слов из статьи</Typography>
          </div>
        )}
      </div>
    </aside>
  );
}
