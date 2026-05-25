'use client';

import { useEffect } from 'react';
import MascotErrorPage from './components/molecules/MascotErrorPage';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MascotErrorPage
      code={500}
      title="Что-то пошло не так"
      description="Произошла ошибка при загрузке страницы. Попробуйте обновить её или вернитесь на главную."
      onRetry={reset}
    />
  );
}
