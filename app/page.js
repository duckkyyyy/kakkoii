'use client';

import { useState } from 'react';
import Section from './components/organisms/Section';
import Typography from './components/atoms/Typography';
import Tag from './components/atoms/Tag';
import Button from './components/atoms/Button';
import CategoryFilter from './components/organisms/CategoryFilter';
import Grid from './components/atoms/Grid';
import ArticleCard from './components/molecules/ArticleCard';
import VocabCard from './components/molecules/VocabCard';
import KanjiCard from './components/molecules/KanjiCard';
import ArticleCover from './components/molecules/ArticleCover';
import ArticleBlock from './components/molecules/ArticleBlock';
import ArticleSidebar from './components/molecules/ArticleSidebar';
import TestChoiceInput from './components/atoms/TestChoiceInput';
import GrammarTag from './components/atoms/GrammarTag';
import KanjiStrokeField from './components/molecules/KanjiStrokeField';
import GrammarTest from './components/molecules/GrammarTest';
import TestQuestion from './components/molecules/TestQuestion';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <main>
      <Section>
        <Typography variant="h3" style={{ marginBottom: 24 }}>Test question</Typography>
        <Grid>
          <TestQuestion
            questionNumber={1}
            totalQuestions={8}
            title="Выберите все подходящие значения 日"
            className="col-span-5"
          />
          <TestQuestion
            questionNumber={2}
            totalQuestions={8}
            title="Попробуйте начертить 日"
            className="col-span-5"
          />
          <TestQuestion
            questionNumber={3}
            totalQuestions={8}
            title="О чем говорит героиня?"
            className="col-span-5"
          />
        </Grid>
      </Section>
      <Section>
        <Typography variant="h3" style={{ marginBottom: 24 }}>Тест по грамматике</Typography>
        <GrammarTest />
      </Section>
      <Section>
        <Typography variant="h3" style={{ marginBottom: 24 }}>Порядок черт кандзи</Typography>
        <KanjiStrokeField kanji="日" />
      </Section>
      <ArticleCover
        image="https://picsum.photos/1920/800?random=cover"
        imageAlt="Обложка статьи"
        title="Японский сленг: топ фраз, чтобы сойти за своего на Шибуе"
        backHref="/"
      />
      <Section>
        <Typography variant="h3" style={{ marginBottom: 24 }}>Грамматические теги</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
          <GrammarTag state="default" onClick={() => {}}>きのう</GrammarTag>
          <GrammarTag state="selected" onClick={() => {}}>きのう</GrammarTag>
          <GrammarTag state="selectedCorrect" onClick={() => {}}>きのう</GrammarTag>
          <GrammarTag state="selectedWrong" onClick={() => {}}>きのう</GrammarTag>
        </div>
      </Section>
      <Section>
        <Typography variant="h3" style={{ marginBottom: 24 }}>Карточки кандзи</Typography>
        <Grid>
          <KanjiCard
            className="col-span-3"
            kanji="日"
            meaning="День, Солнце"
            reading="nichi, jitsu"
          />
          <KanjiCard
            className="col-span-3"
            kanji="食"
            meaning="Еда, питание"
            reading="shoku, taberu"
          />
          <KanjiCard
            className="col-span-3"
            kanji="水"
            meaning="Вода"
            reading="mizu, sui"
          />
          <KanjiCard
            className="col-span-3"
            kanji="人"
            meaning="Человек"
            reading="hito, jin"
          />
        </Grid>
      </Section>
      <Section>
        <div className="grid-12 article-with-sidebar">
          <div className="col-span-9 article-with-sidebar__content">
            <Typography variant="h3" style={{ marginBottom: 24 }}>Блоки статей</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <ArticleBlock
                id="introduction"
                type="grammar"
                title="Частица は (wa)"
                paragraphs={[
                  'Частица は обозначает тему предложения. Она ставится после слова, о котором идёт речь.',
                  'В японском языке порядок слов свободный, и は помогает выделить главное.',
                  'Пример: 私は学生です — «Я (что касается меня) — студент».',
                ]}
                construction="Noun + は + Predicate"
              />
              <ArticleBlock
                id="point-1"
                type="vocab"
                title="Кандзи дня: 食 (табэру)"
                paragraphs={[
                  '食 (しょく) — «еда», «принимать пищу».',
                  'Часто встречается в словах: 食事 (сёкудзи) — приём пищи, 食堂 (сёкудо) — столовая.',
                  'Глагол 食べる (табэру) — «есть» — образован от этого кандзи.',
                  'Идиома: 食わず嫌い — «нелюбовь без пробы» (предвзятость).',
                ]}
              />
              <ArticleBlock
                id="point-2"
                type="reading"
                title="Текст для чтения: короткий диалог в кафе. コーヒーをください。 — Одну кофе, пожалуйста。かしこまりました。 — Сейчас принесу。"
              />
              <ArticleBlock
                id="point-3"
                type="introduction"
                title="Введение: этот раздел знакомит с базовыми понятиями японского языка. Начните с изучения азбук хирагана и катакана, затем переходите к грамматике и лексике."
              />
            </div>
          </div>
          <div className="col-span-3 article-with-sidebar__sidebar">
            <ArticleSidebar
              variant="full"
              tocItems={[
                { id: 'introduction', label: 'Introduction' },
                { id: 'point-1', label: 'Point 1' },
                { id: 'point-2', label: 'Point 2' },
                { id: 'point-3', label: 'Point 3' },
              ]}
              links={[
                { href: '/files/slovar.pdf', label: 'Список слов из статьи' },
              ]}
            />
          </div>
        </div>
      </Section>
      <Section>
        <Typography variant="h3" style={{ marginBottom: 24 }}>Сайдбар без оглавления (только ссылки)</Typography>
        <div className="grid-12 article-with-sidebar">
          <div className="col-span-9 article-with-sidebar__content">
            <ArticleBlock
              type="introduction"
              title="Краткая статья без оглавления. Здесь сайдбар показывает только блок с PDF-ссылками."
            />
          </div>
          <div className="col-span-3 article-with-sidebar__sidebar">
            <ArticleSidebar
              variant="links"
              links={[
                { href: '/files/slovar.pdf', label: 'Список слов из статьи' },
                { href: '/files/grammar.pdf', label: 'Грамматика урока' },
              ]}
            />
          </div>
        </div>
      </Section>
      <Section>
        <Typography variant="h3" style={{ marginBottom: 24 }}>Фильтр категорий</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryClick={setActiveCategory}
          />
          <CategoryFilter
            activeCategory="Лексика"
            onCategoryClick={setActiveCategory}
          />
          <CategoryFilter
            activeCategory="Грамматика"
            onCategoryClick={() => {}}
          />
          <CategoryFilter
            activeCategory="Чтение"
            onCategoryClick={() => {}}
          />
          <CategoryFilter
            activeCategory="Аудио"
            onCategoryClick={() => {}}
          />
        </div>
      </Section>

      <Section>
        <div className="flex-wrap-gap mb">
          <Tag size="big">Большой тег</Tag>
          <Tag size="medium">Средний тег</Tag>
          <Tag size="small">Маленький тег</Tag>
        </div>
      </Section>

      <Section>
        <Typography variant="h3" style={{ marginBottom: 24 }}>Карточки слов</Typography>
        <Grid>
          <VocabCard
            className="col-span-3"
            reading="にほんのゆうれいばなし"
            kanji="日本の幽霊話"
            translation="японские истории о привидениях"
          />
          <VocabCard
            className="col-span-3"
            reading="こんにちは"
            kanji="今日は"
            translation="здравствуйте"
          />
          <VocabCard
            className="col-span-3"
            reading="ありがとう"
            kanji="有難う"
            translation="спасибо"
          />
          <VocabCard
            className="col-span-3"
            reading="さようなら"
            kanji="左様なら"
            translation="до свидания"
          />
        </Grid>
      </Section>

      <Section>
        <Typography variant="h3" style={{ marginBottom: 24 }}>Карточки статей</Typography>
          <Grid>
            <ArticleCard
              cols={7}
              tabletCols={7}
              mobileCols={12}
              href="#"
              image="https://picsum.photos/800/500?random=1"
              imageAlt=""
              tags={['7 колонок']}
              title="Карточка на 7 колонок"
              description="Широкая карточка по макету."
            />
            <ArticleCard
              cols={5}
              tabletCols={5}
              mobileCols={12}
              href="#"
              image="https://picsum.photos/600/400?random=2"
              imageAlt=""
              tags={['5 колонок']}
              title="Карточка на 5 колонок"
              description="7 + 5 = 12 в ряд."
            />
            <ArticleCard
              cols={6}
              tabletCols={6}
              mobileCols={12}
              href="#"
              image="https://picsum.photos/800/500?random=3"
              imageAlt=""
              tags={['6 колонок']}
              title="Карточка на 6 колонок"
              description="Две карточки в ряд."
            />
            <ArticleCard
              cols={6}
              tabletCols={6}
              mobileCols={12}
              href="#"
              image="https://picsum.photos/800/500?random=4"
              imageAlt=""
              tags={['6 колонок']}
              title="Вторая на 6 колонок"
              description="Ряд из двух равных."
            />
            <ArticleCard
              cols={4}
              tabletCols={6}
              mobileCols={12}
              href="#"
              image="https://picsum.photos/600/400?random=5"
              imageAlt=""
              tags={['4 колонки']}
              title="Карточка на 4 колонки"
              description="Три карточки в ряд."
            />
            <ArticleCard
              cols={4}
              tabletCols={6}
              mobileCols={12}
              href="#"
              image="https://picsum.photos/600/400?random=6"
              imageAlt=""
              tags={['4 колонки']}
              title="Вторая на 4"
              description="Вариант из макета."
            />
            <ArticleCard
              cols={4}
              tabletCols={6}
              mobileCols={12}
              href="#"
              image="https://picsum.photos/600/400?random=7"
              imageAlt=""
              tags={['4 колонки']}
              title="Третья на 4 колонки"
              description="Ряд из трёх."
            />
            <ArticleCard
              cols={3}
              tabletCols={4}
              mobileCols={6}
              href="#"
              image="https://picsum.photos/400/300?random=8"
              imageAlt=""
              tags={['3 колонки']}
              title="Карточка на 3 колонки"
              description="Четыре в ряд."
            />
            <ArticleCard
              cols={3}
              tabletCols={4}
              mobileCols={6}
              href="#"
              image="https://picsum.photos/400/300?random=9"
              imageAlt=""
              tags={['3 колонки']}
              title="Вторая на 3"
              description="Узкие карточки."
            />
            <ArticleCard
              cols={3}
              tabletCols={4}
              mobileCols={6}
              href="#"
              image="https://picsum.photos/400/300?random=10"
              imageAlt=""
              tags={['3 колонки']}
              title="Третья на 3"
              description="По макету."
            />
            <ArticleCard
              cols={3}
              tabletCols={4}
              mobileCols={6}
              href="#"
              image="https://picsum.photos/400/300?random=11"
              imageAlt=""
              tags={['3 колонки']}
              title="Четвёртая на 3"
              description="Ряд из четырёх."
            />
          </Grid>
      </Section>

      <Section>
        <Typography variant="h3" style={{ marginBottom: 24 }}>Инпуты выбора в тестах</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 600 }}>
          <TestChoiceInput state="default" onClick={() => {}}>1 — Дефолт</TestChoiceInput>
          <TestChoiceInput state="selected" onClick={() => {}}>2 — Выбранный</TestChoiceInput>
          <TestChoiceInput state="selectedCorrect" onClick={() => {}}>3 — Выбранный и правильный</TestChoiceInput>
          <TestChoiceInput state="selectedWrong" onClick={() => {}}>4 — Выбранный и неправильный</TestChoiceInput>
          <TestChoiceInput state="unselectedCorrect" disabled>5 — Невыбранный и правильный</TestChoiceInput>
        </div>
      </Section>

      <Section>
        <div className="flex-wrap-gap">
            <Button variant="main" size="big">Main Big</Button>
            <Button variant="main" size="small">Main Small</Button>
            <Button variant="secondary" size="big">Secondary Big</Button>
            <Button variant="secondary" size="small">Secondary Small</Button>
            <Button variant="main" size="big" disabled>Main Big Disabled</Button>
            <Button variant="main" size="small" disabled>Main Small Disabled</Button>
            <Button variant="secondary" size="big" disabled>Secondary Big Disabled</Button>
            <Button variant="secondary" size="small" disabled>Secondary Small Disabled</Button>
            <Button variant="main" size="big" className="w-full">На всю ширину</Button>
          </div>
      </Section>
    </main>
  );
}