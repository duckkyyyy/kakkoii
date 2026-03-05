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

const DEFAULT_TAGS = [];

export default function CategoryFilter({
  categories = DEFAULT_CATEGORIES,
  disabledCategories = [],
  tags = DEFAULT_TAGS,
  activeCategory = null,
  chosenTags: controlledChosenTags,
  onChosenTagsChange,
  onCategoryClick,
  onTagClick,
  className,
  categoriesOnly = false,
  tagsOnly = false,
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

  const showCategories = !tagsOnly;
  const showTags = !categoriesOnly;

  return (
    <aside className={clsx('category-filter', className)}>
      {showCategories && (
        <nav className="category-filter__categories" aria-label="Категории">
          {categories.map((item) => {
            const label = typeof item === 'string' ? item : item.label;
            const value = typeof item === 'string' ? item : item.value ?? item.label;
            const isActive = activeCategory !== null && activeCategory === value;
            const isDisabled = disabledCategories.includes(value);

            return (
              <button
                key={value}
                type="button"
                disabled={isDisabled}
                className={clsx(
                  'category-filter__category',
                  isActive && 'category-filter__category_active',
                  isDisabled && 'category-filter__category_disabled'
                )}
                onClick={() => !isDisabled && onCategoryClick?.(value)}
                aria-pressed={isActive}
                aria-disabled={isDisabled}
              >
                <Typography variant="20-medium">
                  {label}
                </Typography>
              </button>
            );
          })}
        </nav>
      )}
      {showTags && (
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
      )}
    </aside>
  );
}
