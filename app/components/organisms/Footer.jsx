'use client';

import Image from 'next/image';
import Link from 'next/link';
import ArrowUp from '../atoms/icons/arrowup';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-root">
      <div className="footer-inner">
        <Link href="/" className="footer-logo">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={45}
            priority
          />
        </Link>

        <button
          onClick={scrollToTop}
          className="footer-icon-btn"
          aria-label="Наверх"
        >
          <ArrowUp size={40} color="#1C1B1B" />
        </button>
      </div>
    </footer>
  );
}
