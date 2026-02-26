'use client';

import clsx from 'clsx';
import Cross from './icons/cross';

export default function Tag({
  children,
  size = '',
  variant = 'default',
  className,
  onClick,
  onClose,
  href,
}) {
  const isText = variant === 'text' || variant === 'textRemovable';
  const classes = clsx(
    'tag',
    !isText && 'tag-default',
    variant === 'text' && 'tag-text',
    variant === 'textRemovable' && 'tag-text tag-text-removable',
    size === 'big' && 'tag-big',
    size === 'medium' && 'tag-medium',
    (size === 'small' || !size) && 'tag-small',
    className
  );

  const content = (
    <>
      {variant === 'textRemovable' && (
        <span className="tag-text__icon" aria-hidden>
          <Cross size={16} color="currentColor" />
        </span>
      )}
      <span className={variant === 'textRemovable' ? 'tag-text__label' : undefined}>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  if (onClick || onClose) {
    return (
      <button
        type="button"
        onClick={(e) => {
          if (onClose && e.target.closest('.tag-text__icon')) {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          } else {
            onClick?.(e);
          }
        }}
        className={classes}
      >
        {content}
      </button>
    );
  }

  return <div className={classes}>{content}</div>;
}
