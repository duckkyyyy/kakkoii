import MascotErrorPage from './components/molecules/MascotErrorPage';

export default function NotFound() {
  return (
    <MascotErrorPage
      code={404}
      title="Страница не найдена"
      description="Кажется, этой страницы нет или ссылка устарела. Проверьте адрес в строке браузера."
    />
  );
}
