'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Search from '../atoms/icons/search';
import Cross from '../atoms/icons/cross';

function BurgerIcon({ size = 32, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="4" y1="10" x2="28" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="4" y1="16" x2="28" y2="16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="4" y1="22" x2="28" y2="22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
    closeSearch();
  };

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
    <>
      <header className={`header-root ${isSearchOpen ? 'header-root--search-open' : ''}`}>
        <div className="header-inner">
          {isSearchOpen ? (
            <form className="header-search-bar" onSubmit={handleSearchSubmit}>
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
            </form>
          ) : (
            <>
              <div className="header-top-row">
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
                    const isActive = pathname === item.path || (item.path === '/daily-task' && typeof pathname === 'string' && pathname.startsWith('/daily-task'));
                    const isDailyTaskCurrent = item.path === '/daily-task' && isActive;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={isActive ? 'header-link header-link-active' : 'header-link'}
                        onClick={isDailyTaskCurrent ? (e) => { e.preventDefault(); window.location.href = '/daily-task'; } : undefined}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>

                <button
                  type="button"
                  className="header-icon-btn header-search-btn"
                  onClick={openSearch}
                  aria-label="Открыть поиск"
                >
                  <Search size={32} color="var(--color-black)" />
                </button>

                <button
                  type="button"
                  className="header-icon-btn header-burger-btn"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                >
                  {isMobileMenuOpen ? (
                    <Cross size={32} color="var(--color-black)" />
                  ) : (
                    <BurgerIcon size={32} color="var(--color-black)" />
                  )}
                </button>
              </div>

              {isMobileMenuOpen && (
                <nav className="header-mobile-nav">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.path || (item.path === '/daily-task' && typeof pathname === 'string' && pathname.startsWith('/daily-task'));
                    const isDailyTaskCurrent = item.path === '/daily-task' && isActive;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={isActive ? 'header-link header-link-active' : 'header-link'}
                        onClick={isDailyTaskCurrent ? (e) => { e.preventDefault(); window.location.href = '/daily-task'; } : undefined}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              )}
            </>
          )}
        </div>
      </header>
    </>
  );
}
