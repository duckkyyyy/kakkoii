'use client';

import { use, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArticleCover,
  ArticleBlock,
  ArticleReadingText,
  ArticleSidebar,
  ArticleCard,
  Grid,
  Button,
  TestChoiceInput,
  ArticleTest,
  VocabCard,
  Play1,
  Telegram,
  Vkontakte,
} from '../../components';
import styles from './page.module.css';
import ARTICLE_10_SLOV from '../../../data/articles/10-slov-anime.json';
import ARTICLE_TIKTOK_SLENEG from '../../../data/articles/tiktok-twitter-sleneg.json';
import ARTICLE_SLOVA_INTONACIYA from '../../../data/articles/slova-intonaciya.json';
import ARTICLE_RUGATELSTVA_ANIME from '../../../data/articles/rugatelstva-anime.json';
import ARTICLE_WA_GA from '../../../data/articles/chasticy-wa-i-ga.json';
import ARTICLE_TE_FORMA from '../../../data/articles/te-forma.json';
import ARTICLE_TAI_HOSHII from '../../../data/articles/tai-hoshii.json';
import ARTICLE_SUGIRU from '../../../data/articles/sugiru.json';
import ARTICLE_RAMEN_MENU from '../../../data/articles/ramen-menu.json';
import ARTICLE_BLOGGER_WEEKEND from '../../../data/articles/blogger-weekend.json';
import ARTICLE_WEATHER_FORECAST from '../../../data/articles/weather-forecast.json';
import ARTICLE_JUJUTSU_FIRST_PAGE from '../../../data/articles/jujutsu-first-page.json';

const KAI_PEEK = '/images/kai/kai-peek.png';
const KAI_CONFUSED = '/images/kai/kai-confused.png';
const KAI_TIRED = '/images/kai/kai-tired.png';

const LEXICON_ARTICLE = {
  slug: 'yaponskii-sleneg',
  title: 'Японский сленг: топ фраз, чтобы сойти за своего на Шибуе',
  image: KAI_PEEK,
  cover: KAI_PEEK,
  backHref: '/',
  toc: [
    { id: 'intro', label: 'Введение' },
    { id: 'meccha', label: '1. めっちゃ (Meccha) — «Очень»' },
    { id: 'uzai', label: '2. うざい (Uzai) — «Задолбал»' },
    { id: 'yabai', label: '3. やばい (Yabai) — «Офигеть»' },
    { id: 'majide', label: '4. マジで？ (Maji de?) — «Серьёзно?»' },
    { id: 'donbiki', label: '5. ドン引き (Donbiki) — «Испанский стыд»' },
    { id: 'test', label: 'Проверка себя' },
  ],
  links: [{ href: '#', label: 'Список слов из статьи' }],
  introduction: 'Кай тут как-то раз услышал, как ты смотришь аниме и чешешь затылок на очередной непонятной фразе. «Именно для этого мы и работаем», — подумал он, налил себе чаю и приготовил для тебя этот гайд.',
  blocks: [
    {
      id: 'meccha',
      title: '1. めっちゃ (Meccha) — «Очень»',
      paragraphs: [
        { bold: 'Что значит', text: ': Супер-усилитель. Означает «очень», «сильно», «нереально».' },
        { bold: 'Откуда ты его знаешь', text: ': Его вставляет каждый второй персонаж в своих репликах.' },
        '— Как тебе аниме, которое я посоветовал?\n— めっちゃ かっこいい！',
        { bold: 'Лайфхак от Кая', text: ': Если хочешь звучать как носитель, просто вставляй meccha перед любым прилагательным. Meccha oishii (очень вкусно), meccha tsukareta (я очень устал). Работает безотказно.' },
      ],
    },
    {
      id: 'uzai',
      title: '2. うざい (Uzai) — «Задолбал»',
      paragraphs: [
        { bold: 'Что значит', text: ': Выражение сильного раздражения. Может относиться к человеку, ситуации или назойливому звуку.' },
        { bold: 'Откуда ты его знаешь', text: ': Классика для цундэрэ-персонажей, которые отмахиваются от всех, или для сцен в классе, когда кто-то надоедает главному герою.' },
        '— うざいんだよ… 関わらないでよ',
        { bold: 'Лайфхак от Кая', text: ': Uzai — это не просто «скучно». Это когда у тебя уже нервы сдают. Используй с осторожностью!' },
      ],
    },
    {
      id: 'yabai',
      title: '3. やばい (Yabai) — «Офигеть»',
      paragraphs: [
        { bold: 'Что значит', text: ': Универсальное слово на все случаи жизни. Может быть и плохим («опасно», «кошмар»), и хорошим («офигенно», «обалдеть»).' },
        { bold: 'Откуда ты его знаешь', text: ': Из ВСЕХ аниме. Серьёзно, везде.' },
        '— (увидев монстра) やばい！逃げろ！\n— (попробовав рамен) これ、やばい美味しい…',
        { bold: 'Лайфхак от Кая', text: ': В 90% случаев в аниме это значит что-то положительное и впечатляющее. Просто смотри на контекст и интонацию.' },
      ],
    },
    {
      id: 'majide',
      title: '4. マジで？ (Maji de?) — «Серьёзно?»',
      paragraphs: [
        { bold: 'Что значит', text: ': «Всерьёз?» или «Ты это серьёзно?». Выражение крайнего удивления или недоверия.' },
        { bold: 'Откуда ты его знаешь', text: ': Стандартная реакция на любое шокирующее известие в любом аниме, от ромкомов до триллеров.' },
        '— マジで？ やったー！',
        { bold: 'Лайфхак от Кая', text: ': Maji — это усечение от majime (серьёзный). Запомни Maji de? и будешь звучать как настоящий.' },
      ],
    },
    {
      id: 'donbiki',
      title: '5. ドン引き (Donbiki) — «Испанский стыд»',
      paragraphs: [
        { bold: 'Что значит', text: ': Состояние, когда тебе настолько неловко за другого человека или его поведение, что ты мысленно отстраняешься и хочешь провалиться сквозь землю. От глагола biku — отпрянуть.' },
        { bold: 'Откуда ты его знаешь', text: ': Частый гость в комедийных сценах, когда один персонаж выдаёт что-то очень стыдное, а все остальные замирают в молчаливом ужасе.' },
        '(персонаж выдаёт неуместную шутку)\n— 周りはドン引きだった',
        'Это слово — ключ к пониманию половины юмора в комедийных аниме. Если все замолчали и на них маска ужаса — скорее всего, они donbiki.',
      ],
    },
  ],
  test: {
    question: 'Персонаж в манге говорит: "めっちゃ疲れた". Что он имеет в виду?',
    image: KAI_CONFUSED,
    choices: ['Я очень устал', 'Я очень голоден', 'Мне очень весело', 'Мне очень грустно'],
  },
  related: [
    { slug: 'rugatelstva-anime', image: '/images/covers/rugatelstva-anime.png', tags: ['Лексика', 'Аниме'], title: 'Как ругаются в японских аниме', description: 'バカ, くそ, この野郎. Разбираем ругательства из аниме.' },
    { slug: 'tiktok-twitter-sleneg', image: '/images/covers/tiktok-twitter-sleneg.png', tags: ['Лексика', 'Сленг'], title: 'Японский сленг из TikTok и Twitter', description: '«えぐい», «り» (w), «ぴえん» — без этого сленга не поймёшь современных японцев.' },
    { slug: 'slova-intonaciya', image: '/images/covers/slova-intonaciya.png', tags: ['Лексика', 'Интонация'], title: 'Слова, которые меняют смысл от интонации', description: 'Одно «はい» — и «да», и «чё тебе?». Разбираем слова-хамелеоны.' },
  ],
};

const READING_ARTICLE = {
  slug: 'ramen',
  type: 'reading',
  title: 'Прочти и пойми отзыв о рамене как японец',
  image: KAI_PEEK,
  cover: KAI_PEEK,
  backHref: '/',
  toc: [
    { id: 'intro', label: 'Введение' },
    { id: 'text', label: 'Текст' },
    { id: 'review', label: 'Словарь' },
    { id: 'test', label: 'Проверка себя' },
  ],
  links: [{ href: '#', label: 'Конспект' }],
  introduction: 'Научись читать настоящие отзывы из японских блогов о еде. Узнай, как хвалят идеальный бульон и ругают переваренную лапшу — и подмечай нужные слова прямо в тексте.',
  readingBlock: {
    id: 'text',
    paragraphs: [
      [
        { type: 'text', value: 'この' },
        { type: 'word', value: 'ラーメン', translation: 'рамен' },
        { type: 'text', value: 'は' },
        { type: 'word', value: '味', translation: 'вкус' },
        { type: 'text', value: 'が' },
        { type: 'word', value: '濃い', translation: 'густой' },
        { type: 'text', value: '。' },
        { type: 'word', value: 'スープ', translation: 'бульон' },
        { type: 'text', value: 'が熱くて、' },
        { type: 'word', value: '麺', translation: 'лапша' },
        { type: 'text', value: 'はちょうど良い' },
        { type: 'word', value: '硬さ', translation: 'жёсткость' },
        { type: 'text', value: 'だった。' },
      ],
      [
        { type: 'text', value: '次は' },
        { type: 'word', value: '替え玉', translation: 'добавка лапши' },
        { type: 'text', value: 'を頼もうと思う。' },
        { type: 'word', value: '最高', translation: 'лучше не бывает' },
        { type: 'text', value: '！' },
      ],
    ],
  },
  vocabWords: [
    { reading: 'raamen', kanji: 'ラーメン', translation: 'рамен' },
    { reading: 'aji', kanji: '味', translation: 'вкус' },
    { reading: 'koi', kanji: '濃い', translation: 'густой' },
    { reading: 'sūpu', kanji: 'スープ', translation: 'бульон' },
    { reading: 'men', kanji: '麺', translation: 'лапша' },
    { reading: 'katasa', kanji: '硬さ', translation: 'жёсткость' },
    { reading: 'kaedama', kanji: '替え玉', translation: 'добавка лапши' },
    { reading: 'saikō', kanji: '最高', translation: 'лучше не бывает' },
  ],
  test: {
    question: 'В отзыве слово «濃い» описывает бульон. Что оно значит?',
    image: KAI_CONFUSED,
    choices: ['Густой', 'Слабый', 'Солёный', 'Сладкий'],
  },
  related: [
    { slug: 'ramen-menu', image: '/images/covers/ramen-menu.png', tags: ['Чтение', 'Еда'], title: 'Меню в японском ресторане', description: 'Реальное меню раменной — разобрали каждую строчку.' },
    { slug: 'chasticy-wa-i-ga', image: '/images/covers/chasticy-wa-i-ga.png', tags: ['Грамматика', 'Манга'], title: 'Война миров: は vs が', description: 'Когда は, а когда が? Разберём на примерах из аниме.' },
    { slug: 'jujutsu-first-page', image: '/images/covers/jujutsu-first-page.png', tags: ['Чтение', 'Манга'], title: 'Первая страница манги «Магическая битва»', description: 'Первый разворот культовой манги — читай в оригинале.' },
  ],
};

const AUDITION_ARTICLE = {
  slug: 'magic-battle',
  type: 'audition',
  title: 'Пойми диалог из «Магической битвы»: Годжо vs. Сукуна',
  image: KAI_TIRED,
  cover: KAI_TIRED,
  backHref: '/',
  toc: [
    { id: 'intro', label: 'Введение' },
    { id: 'video', label: 'Видео' },
    { id: 'vocab', label: 'Словарь' },
    { id: 'test', label: 'Проверка себя' },
  ],
  links: [{ href: '#', label: 'Список слов' }],
  introduction: 'Разберём культовый диалог Годжо и Сукуны на японском. Сначала посмотри отрывок — потом разберём слова и грамматику.',
  videoPlaceholder: KAI_TIRED,
  vocabWords: [
    { reading: 'jogen', kanji: '呪言', translation: 'проклятие, заклинание' },
    { reading: 'saikyō', kanji: '最強', translation: 'сильнейший' },
    { reading: 'korosu', kanji: '殺す', translation: 'убивать' },
    { reading: 'omae', kanji: 'お前', translation: 'ты (грубо)' },
    { reading: 'noroi', kanji: '呪い', translation: 'проклятие' },
    { reading: 'chikara', kanji: '力', translation: 'сила' },
    { reading: 'tatakau', kanji: '戦う', translation: 'сражаться' },
    { reading: 'makeru', kanji: '負ける', translation: 'проигрывать' },
    { reading: 'shinu', kanji: '死ぬ', translation: 'умирать' },
  ],
  test: {
    question: 'Что в диалоге подчёркивает отношение Годжо к Сукуне?',
    image: KAI_CONFUSED,
    choices: ['Уважение к противнику', 'Презрение и уверенность в победе', 'Страх перед силой Сукуны', 'Желание договориться'],
  },
  related: [
    { slug: '10-slov-anime', image: '/images/covers/10-slov-anime-cover.png', tags: ['Лексика', 'Аниме'], title: '10 слов из каждого аниме', description: 'От «めっちゃ» до «マジで» — топ слов из аниме.' },
    { slug: 'ramen-menu', image: '/images/covers/ramen-menu.png', tags: ['Чтение', 'Еда'], title: 'Меню в японском ресторане', description: 'Реальное меню раменной — разобрали каждую строчку.' },
    { slug: 'chasticy-wa-i-ga', image: '/images/covers/chasticy-wa-i-ga.png', tags: ['Грамматика', 'Манга'], title: 'Война миров: は vs が', description: 'Когда は, а когда が? Разберём на примерах из аниме.' },
  ],
};

const ARTICLES = [ARTICLE_10_SLOV, ARTICLE_TIKTOK_SLENEG, ARTICLE_SLOVA_INTONACIYA, ARTICLE_RUGATELSTVA_ANIME, ARTICLE_WA_GA, ARTICLE_TE_FORMA, ARTICLE_TAI_HOSHII, ARTICLE_SUGIRU, LEXICON_ARTICLE, READING_ARTICLE, ARTICLE_RAMEN_MENU, ARTICLE_BLOGGER_WEEKEND, ARTICLE_WEATHER_FORECAST, ARTICLE_JUJUTSU_FIRST_PAGE, AUDITION_ARTICLE];

const testQuestions = (test) => test?.questions && Array.isArray(test.questions) && test.questions.length > 0;

export default function ArticlePage({ params }) {
  const { slug } = use(params) ?? {};
  const article = ARTICLES.find((a) => a.slug === slug);
  const questions = article?.test?.questions ?? [];
  const grammarQuestions = article?.test?.type === 'grammar' ? (article?.test?.questions ?? []) : [];
  const hasGrammarDragTest = article?.type === 'grammar' && article?.test?.type === 'grammar' && grammarQuestions.length > 0;
  const hasMultiQuestionTest = testQuestions(article?.test) && !hasGrammarDragTest;
  const [testQuestionIndex, setTestQuestionIndex] = useState(0);
  const [testAnswers, setTestAnswers] = useState(() => questions.map(() => null));
  const [testMode, setTestMode] = useState('questions');
  const [grammarResults, setGrammarResults] = useState([]);
  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') setShareUrl(window.location.href);
  }, []);
  const testDone = hasMultiQuestionTest && testQuestionIndex >= questions.length;
  const isTestReview = hasMultiQuestionTest && testMode === 'review';
  const isTestResult = hasMultiQuestionTest && testMode === 'result' && testDone;

  const handleTestChoice = (qIndex, choiceIndex) => {
    if (!hasMultiQuestionTest || testDone || isTestReview) return;
    setTestAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = choiceIndex;
      return next;
    });
  };

  const handleTestNext = () => {
    if (!hasMultiQuestionTest) return;
    if (testQuestionIndex < questions.length - 1) {
      setTestQuestionIndex((i) => i + 1);
    } else {
      setTestQuestionIndex(questions.length);
      setTestMode('result');
    }
  };

  const testScore = hasMultiQuestionTest && testAnswers.length > 0
    ? questions.reduce((acc, q, i) => acc + (testAnswers[i] === q.correctChoiceIndex ? 1 : 0), 0)
    : null;

  const handleTestRestart = () => {
    setTestQuestionIndex(0);
    setTestAnswers(questions.map(() => null));
    setTestMode('questions');
    if (hasGrammarDragTest) setGrammarResults([]);
    const el = document.getElementById('test');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGrammarNext = useCallback((correct) => {
    setGrammarResults((prev) => [...prev, correct]);
    if (grammarResults.length + 1 >= grammarQuestions.length) setTestMode('result');
  }, [grammarQuestions.length, grammarResults.length]);

  const handleViewAnswers = () => {
    if (hasGrammarDragTest) {
      const el = document.getElementById('test');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setTestQuestionIndex(0);
    setTestMode('review');
    const el = document.getElementById('test');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const getArticleTestChoiceState = (question, choiceIndex) => {
    const selectedIndex = testAnswers[testQuestionIndex];
    const correctIndex = question.correctChoiceIndex;
    if (choiceIndex === correctIndex) {
      return selectedIndex === choiceIndex ? 'selectedCorrect' : 'unselectedCorrect';
    }
    if (selectedIndex === choiceIndex) return 'selectedWrong';
    return 'default';
  };

  const handleReviewNext = () => {
    if (testQuestionIndex < questions.length - 1) {
      setTestQuestionIndex((i) => i + 1);
    } else {
      setTestMode('result');
      setTestQuestionIndex(questions.length);
    }
  };

  const currentQuestion = hasMultiQuestionTest && questions[testQuestionIndex];
  const canProceed = currentQuestion && testAnswers[testQuestionIndex] !== null;

  if (!article) {
    return (
      <div className={styles.page}>
        <p>Статья не найдена.</p>
        <Link href="/">На главную</Link>
      </div>
    );
  }

  const isGrammarBlock = article.type === 'grammar';
  const isGrammarTest = article.test?.type === 'grammar' && !hasGrammarDragTest;
  const isReading = article.type === 'reading';
  const isAudition = article.type === 'audition';
  const isResultView = (hasGrammarDragTest && testMode === 'result') || (hasMultiQuestionTest && isTestResult);
  const resultScore = hasGrammarDragTest ? (grammarResults?.filter(Boolean).length ?? 0) : testScore;
  const resultTotal = hasGrammarDragTest ? grammarQuestions.length : questions.length;
  const currentGrammarQuestion = hasGrammarDragTest && grammarQuestions[grammarResults.length];

  return (
    <div className={styles.page}>
      <ArticleCover
        image={article.cover ?? article.image}
        imageAlt={article.title}
        title={article.title}
        backHref={article.backHref}
      />

      <div className={styles.content}>
        <div className={styles.contentMain}>
          <ArticleBlock
            type="reading"
            title={article.introduction}
            id="intro"
          />
          {isAudition ? (
            <>
              <div id="video" className={styles.videoBlock}>
                <div className={styles.videoBlockInner}>
                  <div className={styles.videoBlockImage}>
                    <Image
                      src={article.videoPlaceholder}
                      alt=""
                      fill
                      className={styles.videoBlockImg}
                      sizes="(max-width: 1200px) 100vw, 1300px"
                    />
                    <div className={styles.videoBlockOverlay} aria-hidden />
                  </div>
                  <button
                    type="button"
                    className={styles.videoBlockPlay}
                    aria-label="Воспроизвести видео"
                  >
                    <Play1 size={140} color="var(--color-white)" strokeColor="var(--color-white)" />
                  </button>
                </div>
              </div>
              {article.vocabWords?.length > 0 && (
                <>
                  <div id="vocab" className={styles.vocabTitle}>
                    <h3 className={styles.vocabTitleText}>словарь</h3>
                  </div>
                  <div className={styles.vocabBlock}>
                    <div className={styles.vocabGrid}>
                      {article.vocabWords.map((word) => (
                        <VocabCard
                          key={word.kanji}
                          reading={word.reading}
                          kanji={word.kanji}
                          translation={word.translation}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : isReading ? (
            <>
              {(() => {
                const blocks = article.readingBlock
                  ? [article.readingBlock]
                  : article.readingBlocks ?? [];
                return blocks.map((block) => (
                  <article
                    key={block.id}
                    id={block.id}
                    className={`article-block article-block--reading ${styles.readingBlock}`}
                  >
                    <div className={styles.readingBlockParagraphs}>
                      {block.paragraphs?.map((segments, i) => (
                        <ArticleReadingText
                          key={i}
                          segments={segments}
                          variant="32-medium"
                        />
                      ))}
                    </div>
                  </article>
                ));
              })()}
              {article.vocabWords?.length > 0 && (
                <>
                  <div id="review" className={styles.vocabTitle}>
                    <h3 className={styles.vocabTitleText}>словарь</h3>
                  </div>
                  <div className={styles.vocabBlock}>
                    <div className={styles.vocabGrid}>
                      {article.vocabWords.map((word) => (
                        <VocabCard
                          key={word.kanji}
                          reading={word.reading}
                          kanji={word.kanji}
                          translation={word.translation}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            article.blocks?.map((block) => (
              <ArticleBlock
                key={block.id}
                type={isGrammarBlock ? 'grammar' : 'lexicon'}
                id={block.id}
                title={block.title}
                paragraphs={block.paragraphs}
                construction={block.construction}
              />
            ))
          )}

          <div className={styles.share}>
            <button type="button" className={styles.shareBtn}>
              Поделиться статьей
            </button>
            <a
              href={shareUrl ? `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article?.title ?? '')}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shareIcon}
              aria-label="Поделиться в Telegram"
            >
              <Telegram size={64} />
            </a>
            <a
              href={shareUrl ? `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article?.title ?? '')}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shareIcon}
              aria-label="Поделиться ВКонтакте"
            >
              <Vkontakte size={64} />
            </a>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <ArticleSidebar
            variant={isReading || isAudition ? 'links' : 'full'}
            tocItems={article.toc}
            links={article.links}
          />
        </aside>
      </div>

      <section className={styles.testSection} id="test">
        <div className={styles.testInner}>
          {isResultView ? (
              <div className={styles.testResultWrap}>
                <div className={styles.testResultLeft}>
                  <p className={styles.testResultTitle}>Результат — {resultScore} из {resultTotal}</p>
                  <div className={styles.testResultCover}>
                    <Image
                      src={article.test?.resultImage ?? article.cover ?? article.image}
                      alt=""
                      fill
                      className={styles.testResultCoverImg}
                      sizes="622px"
                      unoptimized={String(article.test?.resultImage ?? article.cover ?? article.image ?? '').includes('/kai/')}
                    />
                  </div>
                </div>
                <div className={styles.testResultRight}>
                  <div className={styles.testResultCard}>
                    <p className={styles.testResultMain}>
                      {resultScore === resultTotal
                        ? (hasGrammarDragTest
                            ? (article.slug === 'te-forma'
                                ? 'やばい! Все предложения с て-формой собраны верно. Теперь можешь соединять действия и вежливо просить!'
                                : article.slug === 'tai-hoshii'
                                  ? 'やばい! Все желания собраны верно. たい, ほしい и てほしい — теперь твои!'
                                  : article.slug === 'sugiru'
                                    ? 'やばい! Все «слишком» собраны верно. すぎる — теперь твой!'
                                    : 'やばい! Все предложения собраны верно. は и が больше не путаются!')
                            : isReading
                              ? 'やばい! Все вопросы по меню покорены. Теперь в раменной не промахнёшься!'
                              : 'やばい! Ты покорил весь сленг без единой ошибки. Настоящий мастер!')
                        : resultScore >= resultTotal / 2
                          ? (hasGrammarDragTest
                              ? (article.slug === 'te-forma'
                                  ? 'Хорошо! Пару конструкций с て стоит повторить — ты уже на верном пути.'
                                  : article.slug === 'tai-hoshii'
                                    ? 'Хорошо! Пару конструкций желаний стоит повторить — ты уже на верном пути.'
                                    : article.slug === 'sugiru'
                                      ? 'Хорошо! Пару конструкций с すぎる стоит повторить — ты уже на верном пути.'
                                      : 'Хорошо! Пару конструкций стоит повторить — ты уже на верном пути.')
                              : isReading
                                ? 'Хорошо! Пару вопросов по тексту стоит повторить — ты уже на верном пути.'
                                : 'Хорошо! Пару слов стоит повторить — ты уже на верном пути.')
                          : 'Не сдавайся! Перечитай статью и попробуй ещё раз. 頑張って!'}
                    </p>
                    <p className={styles.testResultSub}>
                      {resultScore === resultTotal
                        ? (hasGrammarDragTest
                            ? (article.slug === 'te-forma'
                                ? 'С て-формой ты сможешь просить 待ってください, говорить 見ている и связывать действия. Ключ к половине японской речи — твой!'
                                : article.slug === 'tai-hoshii'
                                  ? 'Теперь сможешь говорить 食べたい, ほしい и てほしい — о своих желаниях и о том, чего хочешь от других.'
                                  : article.slug === 'sugiru'
                                    ? 'Теперь сможешь жаловаться по-японски: 辛すぎる, 食べすぎた, 高すぎて買えない. やばすぎ!'
                                    : 'Теперь в аниме будешь слышать, кто тема, а кто в фокусе. は и が — твои.')
                            : isReading
                              ? 'Теперь в японской раменной сможешь уверенно заказать 醤油 или 味噌 и не перепутать 大盛り с 替玉. いただきます！'
                              : 'Теперь ты можешь спокойно смотреть аниме, понимая эмоции своих любимых героев. めっちゃかっこいい！')
                        : resultScore >= resultTotal / 2
                          ? (hasGrammarDragTest
                              ? (article.slug === 'te-forma'
                                  ? 'Ещё немного практики — и て-форма станет твоим главным комбо.'
                                  : article.slug === 'tai-hoshii'
                                    ? 'Ещё немного практики — и たい, ほしい, てほしい станут твоими.'
                                    : article.slug === 'sugiru'
                                      ? 'Ещё немного практики — и すぎる станет твоим.'
                                      : 'Ещё немного практики — и частицы станут твоими.')
                              : isReading
                                ? 'Ещё раз загляни в словарь и в текст — и меню будет как родное.'
                                : 'Ещё немного практики — и эти слова станут твоими.')
                          : (hasGrammarDragTest
                              ? (article.slug === 'te-forma'
                                  ? 'Каждый пример из статьи приближает к чувству て-формы: просьба, процесс, цепочка действий.'
                                  : article.slug === 'tai-hoshii'
                                    ? 'Каждый пример из статьи приближает к чувству たい, ほしい и てほしい — свои желания и желания от других.'
                                    : article.slug === 'sugiru'
                                      ? 'Каждый пример из статьи приближает к чувству すぎる — когда всего слишком много.'
                                      : 'Каждый пример из статьи приближает к чувству は и が.')
                              : isReading
                                ? 'Перечитай меню и словарь — и в следующий раз все ответы будут твоими.'
                                : 'Каждый раз, когда услышишь слово из статьи в аниме, оно запомнится лучше.')}
                    </p>
                  </div>
                  <div className={styles.testResultActions}>
                    <Button variant="secondary" size="big" className={styles.testResultBtn} onClick={handleTestRestart}>
                      Пройти заново
                    </Button>
                    <Button variant="main" size="big" className={styles.testResultBtn} onClick={handleViewAnswers}>
                      Смотреть ответы
                    </Button>
                  </div>
                </div>
              </div>
          ) : hasGrammarDragTest && currentGrammarQuestion ? (
            <div key={grammarResults.length} className={styles.testGrammarFullWidth}>
              <ArticleTest
                type="grammar"
                instruction={article.test.instruction}
                sentence={currentGrammarQuestion.sentence}
                image={currentGrammarQuestion.image}
                correctWords={currentGrammarQuestion.correctWords}
                distractors={currentGrammarQuestion.distractors}
                onNext={handleGrammarNext}
              />
            </div>
          ) : isGrammarTest ? (
            <ArticleTest
              type="grammar"
              instruction={article.test.instruction}
              sentence={article.test.sentence}
              image={article.test.image}
              correctWords={article.test.correctWords}
              distractors={article.test.distractors}
            />
          ) : hasMultiQuestionTest ? (
            isTestReview ? (
              <div className={styles.testChoiceWrap}>
                <div className={styles.testChoiceLayout}>
                  <div className={styles.testChoiceLeft}>
                    <ArticleTest
                      type="default"
                      question={currentQuestion?.question}
                      image={currentQuestion?.image}
                    />
                  </div>
                  <div className={styles.testChoiceRight}>
                    {(currentQuestion?.choices ?? []).map((choice, choiceIndex) => (
                      <TestChoiceInput
                        key={choice}
                        state={getArticleTestChoiceState(currentQuestion, choiceIndex)}
                        onClick={() => {}}
                        disabled
                      >
                        {choice}
                      </TestChoiceInput>
                    ))}
                    <Button
                      variant="main"
                      size="big"
                      onClick={handleReviewNext}
                    >
                      {testQuestionIndex < questions.length - 1 ? 'Далее' : 'К результату'}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.testChoiceWrap}>
                <div className={styles.testChoiceLayout}>
                  <div className={styles.testChoiceLeft}>
                    <ArticleTest
                      type="default"
                      question={currentQuestion?.question}
                      image={currentQuestion?.image}
                    />
                  </div>
                  <div className={styles.testChoiceRight}>
                    {(currentQuestion?.choices ?? []).map((choice, choiceIndex) => (
                      <TestChoiceInput
                        key={choice}
                        state={testAnswers[testQuestionIndex] === choiceIndex ? 'selected' : 'default'}
                        onClick={() => handleTestChoice(testQuestionIndex, choiceIndex)}
                      >
                        {choice}
                      </TestChoiceInput>
                    ))}
                    <Button
                      variant="main"
                      size="big"
                      disabled={!canProceed}
                      onClick={handleTestNext}
                    >
                      {testQuestionIndex < questions.length - 1 ? 'Далее' : 'Показать результат'}
                    </Button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <>
              <ArticleTest
                type="default"
                question={article.test?.question}
                image={article.test?.image}
              />
              <div className={styles.testChoices}>
                {(article.test?.choices ?? []).map((choice) => (
                  <TestChoiceInput key={choice} state="default" onClick={() => {}}>
                    {choice}
                  </TestChoiceInput>
                ))}
                <Button variant="main" size="big" disabled>
                  Далее
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className={styles.relatedTitle}>
        <h2 className={styles.relatedTitleText}>похожие статьи</h2>
      </section>

      <section className={styles.related}>
        <Grid>
          {article.related.map((item) => (
            <ArticleCard
              key={item.slug}
              href={`/article/${item.slug}`}
              image={item.image}
              imageAlt={item.title}
              tags={item.tags}
              title={item.title}
              description={item.description}
              cols={4}
              tabletCols={4}
              mobileCols={12}
            />
          ))}
        </Grid>
      </section>
    </div>
  );
}
