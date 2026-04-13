import './globals.css'
import AppShell from './components/AppShell'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'KAKKOII',
  description: 'Описание проекта',
  icons: {
    icon: '/images/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}