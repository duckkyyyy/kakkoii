'use client';

import Image from 'next/image';
import Link from 'next/link';
import ArrowUp from './icons/arrowup';

export default function Footer() {
  // Функция для прокрутки вверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // плавная прокрутка
    });
  };

  return (
    <footer 
      className="bottom-0 left-0 right-0 z-50 border-4 border-black bg-white"
      style={{ 
        margin: '40px',  // отступы со всех сторон как в шапке
      }}
    >
      <div className="flex items-center justify-between py-[20px] px-[40px]">
        {/* Логотип слева */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={45}
            priority
          />
        </Link>

        {/* Кнопка "наверх" справа */}
        <button
          onClick={scrollToTop}
          className="flex-shrink-0 w-[40px] h-[40px] flex items-center justify-center hover:opacity-70 transition-opacity"
          aria-label="Наверх"
        >
          <ArrowUp size={40} color="#1C1B1B" />
        </button>
      </div>
    </footer>
  );
}