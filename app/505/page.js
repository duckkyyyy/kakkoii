import MascotErrorPage from '../components/molecules/MascotErrorPage';

export const metadata = {
  title: 'Ошибка 505 — KAKKOII',
};

export default function Error505Page() {
  return (
    <MascotErrorPage
      code={505}
      title="Версия протокола не поддерживается"
      description="Сервер не смог обработать запрос в этом формате. Попробуйте обновить страницу или зайти чуть позже."
    />
  );
}
