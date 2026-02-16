'use client';

import { useState } from 'react';

export default function Button({ 
  children, 
  variant = 'main',        // 'main' или 'secondary'
  size = 'big',            // 'big' или 'small'
  disabled = false,
  className = '',
  onClick,
  href,
  type = 'button',
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Базовые стили для всех кнопок
  const baseClasses = 'inline-block transition-all duration-300 cursor-pointer text-center';
  
  // Стили в зависимости от размера
  const sizeClasses = {
    big: 'text-[24px] font-medium px-[40px] py-[20px]',
    small: 'text-[20px] font-medium px-[20px] py-[12px]',
  };

  // Стили для разных вариантов
  const getStateClasses = () => {
    // Если disabled
    if (disabled) {
      return 'bg-gray text-black/50 border-2 border-transparent cursor-not-allowed opacity-50';
    }

    // Main variant
    if (variant === 'main') {
      return isHovered
        ? 'bg-white text-black border-2 border-black'
        : 'bg-black text-white border-2 border-transparent';
    }

    // Secondary variant
    if (variant === 'secondary') {
      return isHovered
        ? 'bg-black text-white border-2 border-black'
        : 'bg-white text-black border-2 border-black';
    }

    return '';
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${getStateClasses()} ${className}`;

  // Если передан href - рендерим как ссылку
  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  // Иначе как кнопку
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={combinedClasses}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}