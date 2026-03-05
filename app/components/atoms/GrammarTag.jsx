'use client';

import clsx from 'clsx';
import { Checkmark, Cross } from './icons';

export default function GrammarTag({
  children,
  state = 'default',
  onClick,
  disabled = false,
  className,
}) {
  const isSelected = ['selected', 'selectedCorrect', 'selectedWrong'].includes(state);
  const isCorrect = state === 'selectedCorrect' || state === 'unselectedCorrect';
  const isWrong = state === 'selectedWrong';
  const showCheckmark = isCorrect;
  const showCross = isWrong;

  const combinedClasses = clsx(
    'grammar-tag',
    state === 'default' && 'grammar-tag--default',
    state === 'selected' && 'grammar-tag--selected',
    state === 'selectedCorrect' && 'grammar-tag--selected-correct',
    state === 'selectedWrong' && 'grammar-tag--selected-wrong',
    state === 'unselectedCorrect' && 'grammar-tag--unselected-correct',
    disabled && 'grammar-tag--disabled',
    className
  );

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-pressed={isSelected}
      aria-invalid={isWrong}
    >
      {(showCheckmark || showCross) && (state === 'selectedCorrect' || state === 'selectedWrong') && (
        <span className="grammar-tag__icon" aria-hidden>
          {showCheckmark && (
            <Checkmark size={20} color="var(--color-white)" />
          )}
          {showCross && (
            <Cross size={20} color="var(--color-black)" />
          )}
        </span>
      )}
      <span className="grammar-tag__text">{children}</span>
      {(showCheckmark || showCross) && state === 'unselectedCorrect' && (
        <span className="grammar-tag__icon" aria-hidden>
          <Checkmark size={20} color="var(--color-black)" />
        </span>
      )}
    </button>
  );
}
