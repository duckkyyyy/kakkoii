'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Tag from '../atoms/Tag';

function CaretIcon({ className }) {
  return (
    <svg
      className={className}
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1 1.5L7 8.5L13 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
}) {
  const [internalChosen, setInternalChosen] = useState([]);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const chosenTags = controlledChosenTags ?? internalChosen;
  const setChosenTags = onChosenTagsChange ?? setInternalChosen;

  const activeItem = categories.find((item) => {
    const value = typeof item === 'string' ? item : item.value ?? item.label;
    return activeCategory !== null && activeCategory === value;
  });
  const activeCategoryLabel =
    activeItem == null
      ? 'Все'
      : typeof activeItem === 'string'
        ? activeItem
        : activeItem.label;

  const handleCategorySelect = (value, isDisabled) => {
    if (isDisabled) return;
    onCategoryClick?.(value);
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1440px)').matches) {
      setMobileCategoriesOpen(false);
    }
  };

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

  const categoriesNav = (
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
            onClick={() => handleCategorySelect(value, isDisabled)}
            aria-pressed={isActive}
            aria-disabled={isDisabled}
          >
            <span className="typo typo-20-medium">{label}</span>
          </button>
        );
      })}
    </nav>
  );

  const tagsBlock = (
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
  );

  return (
    <div className={clsx('category-filter', className)}>
      <button
        type="button"
        className="category-filter__mobile-summary"
        aria-expanded={mobileCategoriesOpen}
        aria-controls="category-filter-mobile-panel"
        id="category-filter-mobile-summary"
        onClick={() => setMobileCategoriesOpen((o) => !o)}
      >
        <span className="typo typo-20-medium category-filter__mobile-summary-label">
          {activeCategoryLabel}
        </span>
        <CaretIcon
          className={clsx('category-filter__mobile-caret', mobileCategoriesOpen && 'category-filter__mobile-caret_open')}
        />
      </button>

      <div
        className={clsx(
          'category-filter__mobile-panel',
          mobileCategoriesOpen && 'category-filter__mobile-panel_open'
        )}
        id="category-filter-mobile-panel"
        role="region"
        aria-labelledby="category-filter-mobile-summary"
      >
        {categoriesNav}
        {tagsBlock}
      </div>
    </div>
  );
}
