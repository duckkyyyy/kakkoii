'use client';

import clsx from 'clsx';
import Typography from '../atoms/Typography';
import Clip from '../atoms/icons/clip';

/** Заглушки в данных статей — не показываем в боковом меню. */
const HIDDEN_SIDEBAR_LINK_LABELS = new Set([
  'Конспект',
  'Список слов из статьи',
  'Список слов',
]);

export function filterArticleSidebarLinks(links = []) {
  return links.filter((item) => !HIDDEN_SIDEBAR_LINK_LABELS.has(item.label));
}

export function articleSidebarHasContent({
  variant = 'full',
  tocItems = [],
  links = [],
}) {
  const hasToc = variant === 'full' && tocItems.length > 0;
  return hasToc || filterArticleSidebarLinks(links).length > 0;
}

export default function ArticleSidebar({
  variant = 'full',
  tocItems = [],
  links = [],
  className,
}) {
  const hasToc = variant === 'full' && tocItems.length > 0;
  const visibleLinks = filterArticleSidebarLinks(links);

  if (!hasToc && visibleLinks.length === 0) {
    return null;
  }

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
      {visibleLinks.length > 0 && (
        <div className="article-sidebar__links">
          {visibleLinks.map(({ href, label }) => (
            <a
              key={`${href}-${label}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="article-sidebar__link-item"
            >
              <Clip size={28} color="currentColor" className="article-sidebar__link-icon" />
              <Typography variant="24-semi">{label}</Typography>
            </a>
          ))}
        </div>
      )}
    </aside>
  );
}
