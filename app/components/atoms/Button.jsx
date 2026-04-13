'use client';

import clsx from 'clsx';
import Link from 'next/link';

export default function Button({
  children,
  variant = 'main',
  size = 'big',
  disabled = false,
  className,
  onClick,
  href,
  type = 'button',
}) {
  const combinedClasses = clsx(
    'btn',
    size === 'big' ? 'btn-big' : 'btn-small',
    variant === 'main' ? 'btn-main' : 'btn-secondary',
    disabled && 'btn-disabled',
    className
  );

  if (href) {
    const internal = typeof href === 'string' && href.startsWith('/') && !href.startsWith('//');
    if (internal) {
      return (
        <Link
          href={href}
          className={combinedClasses}
          aria-disabled={disabled}
          onClick={disabled ? (e) => e.preventDefault() : undefined}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={combinedClasses}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={combinedClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
