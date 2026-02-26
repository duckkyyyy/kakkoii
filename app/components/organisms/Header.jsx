'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Search from '../atoms/icons/search';
import Cross from '../atoms/icons/cross';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const menuItems = [
    { name: 'Материалы', path: '/materials' },
    { name: 'Кандзи', path: '/kanji' },
    { name: 'Задание дня', path: '/daily-task' },
    { name: 'О нас', path: '/about' },
  ];

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className={`header-root ${isSearchOpen ? 'header-root--search-open' : ''}`}>
      <div className="header-inner">
        {isSearchOpen ? (
          <div className="header-search-bar">
            <span className="header-search-icon" aria-hidden>
              <Search size={32} color="var(--color-black)" />
            </span>
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Например, японский сленг"
              className="header-search-input"
              aria-label="Поиск"
            />
            <button
              type="button"
              className="header-icon-btn header-search-close"
              onClick={closeSearch}
              aria-label="Закрыть поиск"
            >
              <Cross size={32} color="var(--color-black)" />
            </button>
          </div>
        ) : (
          <>
            <Link href="/" className="header-logo">
              <Image
                src="/images/logo.png"
                alt="kakkii"
                width={200}
                height={45}
                priority
              />
            </Link>

            <nav className="nav">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={isActive ? 'header-link header-link-active' : 'header-link'}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              className="header-icon-btn"
              onClick={openSearch}
              aria-label="Открыть поиск"
            >
              <Search size={32} color="var(--color-black)" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
