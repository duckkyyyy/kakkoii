# Деплой на Vercel

## Вариант 1: Через сайт Vercel (рекомендуется)

1. **Залейте проект на GitHub** (если ещё не залит):
   ```bash
   git remote add origin https://github.com/ВАШ_ЛОГИН/kakkoii.git
   git push -u origin main
   ```

2. **Зайдите на [vercel.com](https://vercel.com)** и войдите через GitHub.

3. **Import Project**: нажмите «Add New» → «Project», выберите репозиторий `kakkoii`.

4. **Deploy**: оставьте настройки по умолчанию (Vercel сам определит Next.js) и нажмите «Deploy».

5. Через 1–2 минуты появится **ссылка на сайт** вида `https://kakkoii-xxx.vercel.app`.

---

## Вариант 2: Через CLI

1. **Войдите в Vercel** (откроется браузер):
   ```bash
   npx vercel login
   ```

2. **Деплой в прод и получение постоянной ссылки**:
   ```bash
   npx vercel --prod
   ```

   Ссылка будет выведена в терминале.

---

После первого деплоя при каждом `git push` в подключённый репозиторий Vercel будет автоматически пересобирать и обновлять сайт.
