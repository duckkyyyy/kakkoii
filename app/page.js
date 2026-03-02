'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { Tag, Button, TestChoiceInput, ArticleCard, Grid } from './components';

// Placeholder image
const PLACEHOLDER_IMAGE = '/images/placeholder.png';

const ARTICLES = [
  {
    id: 1,
    image: PLACEHOLDER_IMAGE,
    tags: ['Лексика', 'Аниме'],
    title: '5 слов из аниме, которые ты слышишь в каждой серии',
    description: '«めっちゃ», «やばい», «うるさい» — эти слова звучат в каждом втором аниме. Узнай их настоящие значения и как их использовать, чтобы звучать как носитель.',
    cols: 6,
    tabletCols: 6,
    mobileCols: 12,
  },
  {
    id: 2,
    image: PLACEHOLDER_IMAGE,
    tags: ['Грамматика', 'Манга'],
    title: 'Как частицы は и が решают, о ком ты вообще говоришь',
    description: 'Путаешь は и が? Мы разберём эту вечную битву на примерах из «Наруто» и «Нацумэ». Поймёшь разницу раз и навсегда.',
    cols: 6,
    tabletCols: 6,
    mobileCols: 12,
  },
  {
    id: 3,
    image: PLACEHOLDER_IMAGE,
    tags: ['Аудирование', 'Магическая битва'],
    title: 'Пойми диалог из «Магической битвы»: Годжо vs. Сукуна',
    description: 'Разберём культовый диалог на проклятом языке. Услышишь, как грамматика передаёт абсолютную силу и презрение.',
    cols: 4,
    tabletCols: 4,
    mobileCols: 12,
  },
  {
    id: 4,
    image: PLACEHOLDER_IMAGE,
    tags: ['Чтение', 'Еда'],
    title: 'Прочти и пойми отзыв о рамене как японец',
    description: 'Научись читать настоящие отзывы из японских блогов о еде. Узнай, как хвалят идеальный бульон и ругают переваренную лапшу.',
    cols: 4,
    tabletCols: 4,
    mobileCols: 12,
  },
  {
    id: 5,
    image: PLACEHOLDER_IMAGE,
    tags: ['Лексика', 'Сленг'],
    title: 'Весь японский сленг из TikTok и Twitter за 5 минут',
    description: '«えぐい», «り» (w), «ぴえん» — без этого сленга ты не поймёшь современных японцев. Разбираем тренды соцсетей.',
    cols: 4,
    tabletCols: 4,
    mobileCols: 12,
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      {/* First section: hero article + right cards */}
      <section className={styles.first}>
        <article className={styles.heroArticle}>
          <div className={styles.heroArticle__upper}>
            <div className={styles.heroArticle__cover}>
              <div className={styles.heroArticle__coverInner}>
                <Image
                  src={PLACEHOLDER_IMAGE}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1070px"
                />
              </div>
            </div>
            <div className={styles.heroArticle__tags}>
              <Tag size="medium" variant="default">Лексика</Tag>
              <Tag size="medium" variant="default">Сленг</Tag>
            </div>
          </div>
          <div className={styles.heroArticle__text}>
            <h2 className={styles.heroArticle__title}>
              Японский сленг: топ фраз, чтобы сойти за своего на Шибуе
            </h2>
            <p className={styles.heroArticle__desc}>
              Почему японцы в любой непонятной ситуации говорят «Ябай» и что за «Маджи», которое произносит каждый второй герой аниме?
            </p>
          </div>
        </article>

        <div className={styles.rightCards}>
          {/* Vocab card */}
          <div className={`${styles.card} ${styles.card_vocab}`}>
            <Tag size="small" variant="default" className={styles.card__tag}>Лексика</Tag>
            <div className={styles.card__content}>
              <div className={styles.card__char}>
                <Image src={PLACEHOLDER_IMAGE} alt="" width={109} height={135} />
              </div>
              <div className={styles.card__info}>
                <span className={styles.card__reading}>kuchipaku</span>
                <span className={styles.card__kanji}>口パク</span>
                <span className={styles.card__translation}>Липсинг</span>
              </div>
            </div>
          </div>

          {/* Audio card */}
          <div className={`${styles.card} ${styles.card_media}`}>
            <Tag size="small" variant="default" className={styles.card__tag}>Аудирование</Tag>
            <div className={styles.card__image}>
              <div className={styles.card__imageInner}>
                <Image src={PLACEHOLDER_IMAGE} alt="" fill sizes="365px" />
              </div>
            </div>
            <p className={styles.card__title}>Разбор популярных аниме-фраз</p>
          </div>

          {/* Grammar card */}
          <div className={`${styles.card} ${styles.card_media}`}>
            <Tag size="small" variant="default" className={styles.card__tag}>Грамматика</Tag>
            <div className={styles.card__image}>
              <div className={styles.card__imageInner}>
                <Image src={PLACEHOLDER_IMAGE} alt="" fill sizes="365px" />
              </div>
            </div>
            <p className={styles.card__title}>Всё о страдательном залоге</p>
          </div>

          {/* Reading card */}
          <div className={`${styles.card} ${styles.card_reading}`}>
            <Tag size="small" variant="default" className={styles.card__tag}>Чтение</Tag>
            <p className={styles.card__text}>
              大阪の賑やかな裏通りには、立ち飲み屋があります。立ち飲み屋は、地元の人々にとって特別な場所です。ある日、大阪に住むケンジは友達を連れて、彼のお気に入りの立ち飲み屋に行きました。
            </p>
            <div className={styles.card__btn}>Читать</div>
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

      {/* Articles grid: 2 карточки по 6 колонок, затем 3 по 4 */}
      <section className={styles.articles}>
        <Grid>
          {ARTICLES.map((article) => (
            <ArticleCard
              key={article.id}
              href="#"
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
              <Image src={PLACEHOLDER_IMAGE} alt="" width={120} height={150} />
            </div>
            <p className={styles.test__descrText}>
              Пройди 5-минутный тест и узнай, на какой стадии отношений ты со своим японским: стадия «внезапного румянца» или уже «обмен кольцами»
            </p>
          </div>
        </div>
        <div className={styles.test__right}>
          <div className={styles.test__question}>
            <p className={styles.test__questionText}>
              Персонаж в манге говорит: &quot;めっちゃ疲れた&quot;. Что он имеет в виду?
            </p>
            <div className={styles.test__questionImage}>
              <div className={styles.test__questionImageInner}>
                <Image src={PLACEHOLDER_IMAGE} alt="" fill sizes="400px" />
              </div>
            </div>
          </div>
          <div className={styles.test__choices}>
            <TestChoiceInput state="default" onClick={() => {}}>
              Я очень устал
            </TestChoiceInput>
            <TestChoiceInput state="default" onClick={() => {}}>
              Я очень голоден
            </TestChoiceInput>
            <TestChoiceInput state="default" onClick={() => {}}>
              Мне очень весело
            </TestChoiceInput>
            <Button variant="main" size="big" disabled>
              Далее
            </Button>
          </div>
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
            <Image src={PLACEHOLDER_IMAGE} alt="Кай" width={332} height={332} />
          </div>
        </div>
      </section>
    </div>
  );
}
