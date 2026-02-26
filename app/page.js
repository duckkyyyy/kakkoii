'use client';

import { useState } from 'react';
import Section from './components/organisms/Section';
import Typography from './components/atoms/Typography';
import Tag from './components/atoms/Tag';
import Button from './components/atoms/Button';
import CategoryFilter from './components/organisms/CategoryFilter';
import Grid from './components/atoms/Grid';
import ArticleCard from './components/molecules/ArticleCard';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <main>
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