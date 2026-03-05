'use client';

import clsx from 'clsx';
import { Checkmark, Cross } from './icons';

export default function TestChoiceInput({
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
    'test-choice-input',
    state === 'default' && 'test-choice-input--default',
    state === 'selected' && 'test-choice-input--selected',
    state === 'selectedCorrect' && 'test-choice-input--selected-correct',
    state === 'selectedWrong' && 'test-choice-input--selected-wrong',
    state === 'unselectedCorrect' && 'test-choice-input--unselected-correct',
    disabled && 'test-choice-input--disabled',
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
      <span className="test-choice-input__text">{children}</span>
      {showCheckmark && (
        <span className="test-choice-input__icon" aria-hidden>
          <Checkmark
            size={40}
            color={isSelected ? 'var(--color-white)' : 'var(--color-black)'}
          />
        </span>
      )}
      {showCross && (
        <span className="test-choice-input__icon" aria-hidden>
          <Cross size={40} color="var(--color-white)" />
        </span>
      )}
    </button>
  );
}
