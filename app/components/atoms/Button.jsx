'use client';

import clsx from 'clsx';

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
