'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { Tag, Button, TestChoiceInput, ArticleCard, Grid } from './components';
import { ARTICLES } from './data/articles';

const TEST_QUESTIONS = [
  {
    id: 1,
    text: 'Персонаж в манге говорит: «めっちゃ疲れた». Что он имеет в виду?',
    image: '/images/covers/10-slov-anime-cover.png',
    choices: ['Я очень устал', 'Я очень голоден', 'Мне очень весело'],
    correctIndex: 0,
  },
  {
    id: 2,
    text: 'Что значит バカ (baka) в японском?',
    image: '/images/covers/rugatelstva-anime.png',
    choices: ['Дурак, идиот', 'Спасибо', 'Доброе утро'],
    correctIndex: 0,
  },
  {
    id: 3,
    text: 'На картинке — меню. Что обычно означает ラーメン?',
    image: '/images/covers/ramen-menu.png',
    choices: ['Рамен, лапша', 'Суши', 'Десерт'],
    correctIndex: 0,
  },
  {
    id: 4,
    text: 'Как по-японски «слишком жарко» с грамматикой 〜すぎる?',
    image: '/images/covers/sugiru.png',
    choices: ['暑すぎる (atsusugiru)', '寒すぎる (samusugiru)', '涼しすぎる (suzushisugiru)'],
    correctIndex: 0,
  },
  {
    id: 5,
    text: 'て-форма глагола нужна, чтобы:',
    image: '/images/covers/te-forma.png',
    choices: ['Соединять действия и просить', 'Только для прошедшего времени', 'Только в вежливой речи'],
    correctIndex: 0,
  },
];

const TEST_RESULTS = [
  { minScore: 0, title: 'Стадия «кто ты такой?»', text: 'Японский пока машет ручкой издалека. Время познакомиться поближе — загляни в статьи и начни с основ. 頑張って!' },
  { minScore: 1, title: 'Стадия «внезапного румянца»', text: 'Ты уже что-то слышал и узнаёшь знакомое. Ещё чуть-чуть — и первый разговор не за горами.' },
  { minScore: 2, title: 'Стадия «тайных взглядов»', text: 'Ты начинаешь понимать контекст. Продолжай в том же духе — грамматика и лексика из статей укрепят связь.' },
  { minScore: 3, title: 'Стадия «первого признания»', text: 'Ты уже неплохо чувствуешь язык. Осталось набраться практики и смелости — и можно переходить на «ты».' },
  { minScore: 4, title: 'Стадия «обмена кольцами»', text: 'Почти идеальное совпадение! Ты и японский — крепкая пара. Дорабатывай мелочи и наслаждайся.' },
  { minScore: 5, title: 'Стадия «мы с тобой навсегда»', text: 'Все пять из пяти. Ты не просто знаешь — ты в теме. Сэнпай гордится. おめでとう!' },
];

const KAI_PEEK = '/images/kai/kai-peek.png';
const KAI_SLEEPY = '/images/kai/kai-sleepy.png';
const KAI_HAPPY = '/images/kai/kai-happy.png';

export default function Home() {
  const displayedArticles = useMemo(() =>
    ARTICLES.slice(0, 5).map((article, i) => ({
      ...article,
      cols: i < 2 ? 6 : 4,
      tabletCols: i < 2 ? 6 : 4,
      mobileCols: 12,
    }))
  , []);

  const [testQuestionIndex, setTestQuestionIndex] = useState(0);
  const [testSelectedChoice, setTestSelectedChoice] = useState(null);
  const [testAnswers, setTestAnswers] = useState([]);

  const showTestResult = testQuestionIndex >= TEST_QUESTIONS.length;
  const currentQuestion = TEST_QUESTIONS[testQuestionIndex];
  const testScore = testAnswers.filter((a, i) => a === TEST_QUESTIONS[i].correctIndex).length;
  const resultItem = [...TEST_RESULTS].reverse().find((r) => testScore >= r.minScore) ?? TEST_RESULTS[0];

  const handleTestChoice = (choiceIndex) => {
    if (!showTestResult) setTestSelectedChoice(choiceIndex);
  };

  const handleTestNext = () => {
    if (testSelectedChoice === null && !showTestResult) return;
    if (showTestResult) {
      setTestQuestionIndex(0);
      setTestSelectedChoice(null);
      setTestAnswers([]);
      return;
    }
    setTestAnswers((prev) => [...prev, testSelectedChoice]);
    setTestSelectedChoice(null);
    setTestQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className={styles.page}>
      {/* First section: первая статья (ArticleCard) + правые карточки */}
      <section className={styles.first}>
        <div className={styles.heroCardWrap}>
          <ArticleCard
            href="/article/jujutsu-first-page"
            image="/images/covers/jujutsu-first-page.png"
            imageAlt="Первая страница манги «Магическая битва»"
            tags={['Чтение', 'Манга']}
            title="Первая страница манги «Магическая битва»"
            description="Первый разворот культовой манги: от фразы про «бестактного учителя» до согласия Мегуми. Читай в оригинале."
            className={styles.heroCard}
          />
        </div>

        <div className={styles.rightCards}>
          {/* Vocab card */}
          <div className={`${styles.card} ${styles.card_vocab}`}>
            <Tag size="small" variant="default" className={styles.card__tag}>Лексика</Tag>
            <div className={styles.card__content}>
              <div className={styles.card__char}>
                <Image src={KAI_PEEK} alt="" width={109} height={135} unoptimized />
              </div>
              <div className={styles.card__info}>
                <span className={styles.card__reading}>kuchipaku</span>
                <span className={styles.card__kanji}>口パク</span>
                <span className={styles.card__translation}>Липсинг</span>
              </div>
            </div>
          </div>

          {/* Лексика: Как ругаются в аниме */}
          <Link href="/article/rugatelstva-anime" className={styles.cardLink}>
            <div className={`${styles.card} ${styles.card_media}`}>
              <Tag size="small" variant="default" className={styles.card__tag}>Лексика</Tag>
              <div className={styles.card__image}>
                <div className={styles.card__imageInner}>
                  <Image src="/images/covers/rugatelstva-anime.png" alt="" fill sizes="365px" />
                </div>
                <div className={styles.card__hover}>
                  <span className={styles.card__readBtn}>Читать</span>
                </div>
              </div>
              <p className={styles.card__title}>Как ругаются в японских аниме</p>
            </div>
          </Link>

          {/* Грамматика: て-форма */}
          <Link href="/article/te-forma" className={styles.cardLink}>
            <div className={`${styles.card} ${styles.card_media}`}>
              <Tag size="small" variant="default" className={styles.card__tag}>Грамматика</Tag>
              <div className={styles.card__image}>
                <div className={styles.card__imageInner}>
                  <Image src="/images/covers/te-forma.png" alt="" fill sizes="365px" />
                </div>
                <div className={styles.card__hover}>
                  <span className={styles.card__readBtn}>Читать</span>
                </div>
              </div>
              <p className={styles.card__title}>て-форма: главное комбо японского языка</p>
            </div>
          </Link>

          {/* Reading card */}
          <div className={`${styles.card} ${styles.card_reading}`}>
            <Tag size="small" variant="default" className={styles.card__tag}>Чтение</Tag>
            <p className={styles.card__text}>
              大阪の賑やかな裏通りには、立ち飲み屋があります。立ち飲み屋は、地元の人々にとって特別な場所です。ある日、大阪に住むケンジは友達を連れて、彼のお気に入りの立ち飲み屋に行きました。
            </p>
            <Link href="/article/ramen-menu" className={styles.card__btn}>Читать</Link>
          </div>
        </div>
      </section>

      {/* Description block */}
      <section className={styles.description}>
        <p className={styles.description__text}>
          Каккойй — это изучение японского вместе с твоим сэнпаем. Всё, что
          <br />
          ты не найдёшь в учебнике: живой язык, культурные отсылки и ощущение,
          <br />
          что ты в теме. учись так, как любишь. よろしく ヽ(・∀・)ﾉ
        </p>
      </section>

      {/* Section title */}
      <section className={styles.sectionTitle}>
        <h2 className={styles.sectionTitle__text}>интересные статьи</h2>
      </section>

      {/* Articles grid: 5 рандомных — первая строка 2 по 6 колонок, вторая 3 по 4 */}
      <section className={styles.articles}>
        <Grid>
          {displayedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              href={article.slug ? `/article/${article.slug}` : '#'}
              image={article.image}
              imageAlt={article.title}
              tags={article.tags}
              title={article.title}
              description={article.description}
              cols={article.cols}
              tabletCols={article.tabletCols}
              mobileCols={article.mobileCols}
            />
          ))}
        </Grid>
      </section>

      {/* Test block */}
      <section className={styles.test}>
        <div className={styles.test__left}>
          <div className={styles.test__title}>
            <p className={styles.test__titleText}>
              Я влюбился в японский язык, но он оказался слишком цундэрэ,
              <br />
              и чтобы понять его, мне пришлось пройти тест
              <br />
              и узнать свою истинную силу
            </p>
          </div>
          <div className={styles.test__descr}>
            <div className={styles.test__descrChar}>
              <Image src={KAI_SLEEPY} alt="" width={120} height={150} unoptimized />
            </div>
            <p className={styles.test__descrText}>
              Пройди 5-минутный тест и узнай, на какой стадии отношений ты со своим японским: стадия «внезапного румянца» или уже «обмен кольцами»
            </p>
          </div>
        </div>
        <div className={styles.test__right}>
          {showTestResult ? (
            <div className={styles.test__result}>
              <p className={styles.test__resultScore}>
                Ты набрал {testScore} из {TEST_QUESTIONS.length}
              </p>
              <p className={styles.test__resultTitle}>{resultItem.title}</p>
              <p className={styles.test__resultText}>{resultItem.text}</p>
              <Button variant="main" size="big" onClick={handleTestNext}>
                Пройти ещё раз
              </Button>
            </div>
          ) : (
            <>
              <div className={styles.test__question}>
                <p className={styles.test__questionText}>{currentQuestion.text}</p>
                {currentQuestion.image && (
                  <div className={styles.test__questionImage}>
                    <div className={styles.test__questionImageInner}>
                      <Image src={currentQuestion.image} alt="" fill sizes="400px" />
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.test__choices}>
                {currentQuestion.choices.map((choice, idx) => (
                  <TestChoiceInput
                    key={idx}
                    state={testSelectedChoice === idx ? 'selected' : 'default'}
                    onClick={() => handleTestChoice(idx)}
                  >
                    {choice}
                  </TestChoiceInput>
                ))}
                <Button
                  variant="main"
                  size="big"
                  disabled={testSelectedChoice === null}
                  onClick={handleTestNext}
                >
                  Далее
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Section title */}
      <section className={styles.sectionTitle}>
        <h2 className={styles.sectionTitle__text}>вы его видели?</h2>
      </section>

      {/* Kai block */}
      <section className={styles.kai}>
        <div className={styles.kai__left}>
          <div className={styles.kai__title}>
            <p className={styles.kai__titleText}>
              Это кай. Снаружи — лед. Внутри — булочка с корицей
            </p>
          </div>
          <div className={styles.kai__description}>
            <div className={styles.kai__descriptionLeft}>
              <p className={styles.kai__descriptionText}>
                Твой сэнпай в Kakkoii. Он не будет грузить тебя скучными правилами. Вместо этого разложит грамматику по полочкам на примерах из любимых аниме и всегда будет на твоей стороне.
              </p>
            </div>
            <div className={styles.kai__descriptionRight}>
              <p className={styles.kai__descriptionText}>
                Под маской крутого парня скрывается ранимая душа: он подкармливает бездомных кошек, заботится об одноклассниках и обнимает плюшевых игрушек, когда никто не видит.
              </p>
            </div>
          </div>
          <div className={styles.kai__quote}>
            <p className={styles.kai__quoteText}>
              «Да, я выгляжу круто. Но моя миссия — сделать крутым тебя.»
            </p>
          </div>
        </div>
        <div className={styles.kai__right}>
          <div className={styles.kai__char}>
            <Image src={KAI_HAPPY} alt="Кай" width={332} height={332} unoptimized />
          </div>
        </div>
      </section>
    </div>
  );
}
