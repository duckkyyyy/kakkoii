'use client';

import clsx from 'clsx';

/**
 * Карточка вопроса теста — номер и заголовок.
 */
export default function TestQuestion({
  questionNumber = 1,
  totalQuestions = 8,
  title,
  className,
}) {
  return (
    <div className={clsx('test-question', className)}>
      <p className="test-question__counter">
        Вопрос теста {questionNumber} из {totalQuestions}
      </p>
      <p className="test-question__title">{title}</p>
    </div>
  );
}
