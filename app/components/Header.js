'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from './Container';
import Search from './icons/search';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Материалы', path: '/materials' },
    { name: 'Кандзи', path: '/kanji' },
    { name: 'Задание дня', path: '/daily-task' },
    { name: 'О нас', path: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-4 border-black ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}

        style={{ margin: '40px', width: 'calc(100% - 80px)'}}

    >
      <Container>
        <div className="flex items-center justify-between py-[20px]">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={200}
              height={45}
              priority
            />
          </Link>

          <nav className="flex items-center gap-[32px] ml-auto mr-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-[24px] leading-[120%] transition-all ${
                    isActive 
                      ? 'font-semibold text-black' 
                      : 'font-medium text-black hover:text-gray-600'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <button 
            className="flex-shrink-0 w-[32px] h-[32px] flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Поиск"
          >
            <Search size={32} color="#1C1B1B" />
          </button>
        </div>
      </Container>
    </header>
  );
}