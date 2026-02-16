'use client';

import { useState } from 'react';

export default function Tag({ 
  children, 
  size = '', 
  className = '',
  onClick,
  href,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = 'inline-block transition-all duration-300 cursor-pointer';
  
  const sizeClasses = {
    big: 'text-[32px] font-medium px-[40px] py-[10px]',
    medium: 'text-[20px] font-medium px-[40px] py-[10px]',
    small: 'text-[16px] font-medium px-[16px] py-[6px]',
  };

  const stateClasses = isHovered
    ? 'bg-white text-black border-2 border-black'
    : 'bg-black text-white border-2 border-transparent';

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${sizeClasses[size]} ${stateClasses} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${sizeClasses[size]} ${stateClasses} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={`${baseClasses} ${sizeClasses[size]} ${stateClasses} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}