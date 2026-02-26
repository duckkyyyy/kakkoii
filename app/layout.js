import './globals.css'
import Header from './components/organisms/Header'
import Footer from './components/organisms/Footer'

export const metadata = {
  title: 'Мой проект',
  description: 'Описание проекта',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="main-with-header">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}