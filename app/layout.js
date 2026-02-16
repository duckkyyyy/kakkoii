import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata = {
  title: 'Мой проект',
  description: 'Описание проекта',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="pt-[165]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}