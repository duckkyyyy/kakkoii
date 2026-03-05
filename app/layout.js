import './globals.css'
import AppShell from './components/AppShell'

export const metadata = {
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