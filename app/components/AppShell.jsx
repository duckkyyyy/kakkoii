'use client';

import { usePathname } from 'next/navigation';
import Header from './organisms/Header';
import Footer from './organisms/Footer';

export default function AppShell({ children }) {
  const pathname = usePathname();

  const isKanjiTestPage =
    typeof pathname === 'string' &&
    pathname.startsWith('/kanji/') &&
    pathname.endsWith('/test');
  const isDailyTaskPage =
    typeof pathname === 'string' && pathname.startsWith('/daily-task');
  const showFooter = !isKanjiTestPage && !isDailyTaskPage;

  return (
    <>
      <Header />
      <main className="main-with-header">{children}</main>
      {showFooter && <Footer />}
    </>
  );
}

