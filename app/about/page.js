'use client';

import Image from 'next/image';
import { ArticleCard, Grid } from '../components';
import styles from './page.module.css';

const HERO_IMAGE = '/images/kakkoii.png';
const KAI_LOVE = '/images/kai/kai-love.png';

const PRINCIPLES = [
  {
    title: 'Контекстное обучение',
    text: 'Учим грамматику и лексику на примерах из аниме, дорам, манги и песен.',
  },
  {
    title: 'Уважительная геймификация',
    text: (
      <>
        Вовлекаем через челленджи и прогресс,
        <br />а не манипуляции и чувство вины.
      </>
    ),
  },
  {
    title: (
      <>
        Поддержка,
        <br />а не давление
      </>
    ),
    text: 'Наш виртуальный сэнпай Кай всегда поможет советом и подбодрит.',
  },
  {
    title: 'Практика с первого дня',
    text: 'Упражнения сразу учат применять знания в реальных ситуациях.',
  },
];

const KOROCHE_ITEMS = [
  'Современный сленг, мемы и фразы, которые используют реальные японцы',
  (
    <>
      Правила, объяснённые через сцены из аниме,
      <br />а не абстрактные примеры.
    </>
  ),
  'Короткие тексты, посты, отзывы и отрывки из манги',
  'Кадры из аниме и дорам, диалоги, песни',
];

const ARTICLES = [
  {
    id: 1,
    slug: 'jujutsu-first-page',
    image: '/images/covers/jujutsu-first-page.png',
    tags: ['Чтение', 'Манга'],
    title: 'Первая страница манги «Магическая битва»',
    description:
      'Первый разворот культовой манги: диалог Годжо и Мегуми. Читай в оригинале.',
  },
  {
    id: 2,
    slug: 'rugatelstva-anime',
    image: '/images/covers/rugatelstva-anime.png',
    tags: ['Лексика', 'Аниме'],
    title: 'Как ругаются в японских аниме',
    description:
      'Нет русского мата, но есть バカ, くそ и この野郎. Разбираем ругательства из аниме.',
  },
  {
    id: 3,
    slug: 'te-forma',
    image: '/images/covers/te-forma.png',
    tags: ['Грамматика', 'Манга'],
    title: 'て-форма: главное комбо японского языка',
    description:
      'Соединять действия, просить, описывать процесс. Освой て-форму — ключ к половине японской речи.',
  },
];

const AUTHORS = [
  {
    name: 'Аня Солдатова',
    role: 'Скромный кохай. Создатель КАККОЙЙ, своего дипломного проекта, и главный ценитель японского вайба',
    image: '/images/me.png',
  },
  {
    name: 'Антон Ларин',
    role: (
      <>
        Мудрый сенсей. UX/UI-дизайнер, куратор профиля «UX/UI и frontend-разработка»
        <br />в Школе дизайна НИУ ВШЭ — Нижний Новгород
      </>
    ),
    image: '/images/anton.png',
  },
  {
    name: 'Кирилл Ермолаев',
    role: 'Великолепный сэнпай. Frontend-разработчик и преподаватель профиля «UX/UI и frontend-разработка»',
    image: '/images/kirill.png',
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            className={styles.heroImage}
            sizes="100vw"
            priority
            unoptimized
          />
        </div>
      </section>

      <section className={styles.descr}>
        <div className={styles.descrText}>
          <h1 className={styles.descrTitle}>
            Kakkoii — это мост между учебником и жизнью
          </h1>
          <p className={styles.descrParagraph}>
            Мы верим, что язык — это ключ к культуре, а не набор правил для
            зубрёжки. Наша миссия — стать самым дружелюбным и эффективным
            проводником в мир японского языка для тех, кто влюблён в аниме,
            мангу, музыку и современную Японию.
          </p>
        </div>
        <div className={styles.descrKai}>
          <div className={styles.descrKaiImage}>
            <Image
              src={KAI_LOVE}
              alt="Кай"
              fill
              className={styles.descrKaiImg}
              sizes="(max-width: 768px) 100vw, 493px"
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className={styles.sectionTitle}>
        <h2 className={styles.sectionTitleText}>о чем мы?</h2>
      </section>

      <section className={styles.principles}>
        {PRINCIPLES.map((item, i) => (
          <div key={i} className={styles.principleCard}>
            <p className={styles.principleTitle}>{item.title}</p>
            <p className={styles.principleText}>{item.text}</p>
          </div>
        ))}
      </section>

      <section className={styles.quoteBlock}>
        <div className={styles.quoteLeft}>
          <p className={styles.quoteText}>
            Переродившись в мире, где нужно знать все аспекты японского, я,
            используя эту платформу как гринд, решил прокачать лексику,
            грамматику, чтение, аудирование и кандзи до максимального уровня,
            чтобы наконец понять свою любимую мангу!
          </p>
        </div>
        <div className={styles.quoteRight}>
          <div className={styles.korocheCard}>
            <p className={styles.korocheTitle}>КОРОЧЕ ДА...</p>
          </div>
          {KOROCHE_ITEMS.map((content, i) => (
            <div key={i} className={styles.korocheItem}>
              <p className={styles.korocheItemText}>{content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.sectionTitle}>
        <h2 className={styles.sectionTitleText}>теперь и почитать можно</h2>
      </section>

      <section className={styles.articles}>
        <Grid>
          {ARTICLES.map((article) => (
            <ArticleCard
              key={article.id}
              href={article.slug ? `/article/${article.slug}` : '#'}
              image={article.image}
              imageAlt={article.title}
              tags={article.tags}
              title={article.title}
              description={article.description}
              cols={4}
              tabletCols={4}
              mobileCols={12}
              className={styles.articleCard}
            />
          ))}
        </Grid>
      </section>

      <section className={styles.sectionTitle}>
        <h2 className={styles.sectionTitleText}>авторы проекта</h2>
      </section>

      <section className={styles.authors}>
        {AUTHORS.map((author, i) => (
          <div key={i} className={styles.authorCard}>
            <div className={styles.authorImageWrap}>
              <Image
                src={author.image}
                alt=""
                fill
                className={styles.authorImage}
                sizes="(max-width: 768px) 100vw, 493px"
                unoptimized
              />
            </div>
            <div className={styles.authorContent}>
              <p className={styles.authorName}>{author.name}</p>
              <p className={styles.authorRole}>{author.role}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
