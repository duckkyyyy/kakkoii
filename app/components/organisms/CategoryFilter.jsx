'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Typography from '../atoms/Typography';
import Tag from '../atoms/Tag';

const DEFAULT_CATEGORIES = [
  'Все',
  'Лексика',
  'Грамматика',
  'Чтение',
  'Аудио',
];

const DEFAULT_TAGS = [
  'Культура',
  'Еда',
  'История',
  'Мифология',
  'Аниме',
  'Манга',
  'Игры',
  'Литература',
  'Музыка',
];

export default function CategoryFilter({
  categories = DEFAULT_CATEGORIES,
  tags = DEFAULT_TAGS,
  activeCategory = null,
  chosenTags: controlledChosenTags,
  onChosenTagsChange,
  onCategoryClick,
  onTagClick,
  className,
}) {
  const [internalChosen, setInternalChosen] = useState([]);
  const chosenTags = controlledChosenTags ?? internalChosen;
  const setChosenTags = onChosenTagsChange ?? setInternalChosen;

  const handleTagClick = (value) => {
    if (!chosenTags.includes(value)) {
      setChosenTags([...chosenTags, value]);
    }
    onTagClick?.(value);
  };

  const handleTagClose = (value) => {
    setChosenTags(chosenTags.filter((v) => v !== value));
    onTagClick?.(value);
  };

  return (
    <aside className={clsx('category-filter', className)}>
      <nav className="category-filter__categories" aria-label="Категории">
        {categories.map((item) => {
          const label = typeof item === 'string' ? item : item.label;
          const value = typeof item === 'string' ? item : item.value ?? item.label;
          const isActive = activeCategory !== null && activeCategory === value;

          return (
            <button
              key={value}
              type="button"
              className={clsx(
                'category-filter__category',
                isActive && 'category-filter__category_active'
              )}
              onClick={() => onCategoryClick?.(value)}
              aria-pressed={isActive}
            >
              <Typography variant="20-medium">
                {label}
              </Typography>
            </button>
          );
        })}
      </nav>
      <div className="category-filter__tags">
        {tags.map((item) => {
          const label = typeof item === 'string' ? item : item.label ?? item;
          const value = typeof item === 'string' ? item : item.value ?? item;
          const chosen = chosenTags.includes(value);
          return (
            <Tag
              key={value}
              variant={chosen ? 'textRemovable' : 'text'}
              onClick={() => handleTagClick(value)}
              onClose={chosen ? () => handleTagClose(value) : undefined}
              className="category-filter__tag"
            >
              {label}
            </Tag>
          );
        })}
      </div>
    </aside>
  );
}
