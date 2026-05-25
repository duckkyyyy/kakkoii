'use client';

import { Button, TestQuestion } from '../components';
import GrammarTest from '../components/molecules/GrammarTest';

export default function DailyTaskGrammarQuestion({
  questionNumber,
  totalQuestions,
  title,
  correctWords,
  distractors,
  onSlotsChange,
  onNext,
  nextDisabled,
  nextLabel,
  reviewAnswer,
  reviewCorrectWords,
  isReview,
  isLastQuestion,
  onReviewNext,
}) {
  if (isReview && reviewAnswer) {
    const correctWordsList = reviewCorrectWords || [];
    const isCorrect =
      reviewAnswer.length === correctWordsList.length &&
      reviewAnswer.every((w, i) => w === correctWordsList[i]);

    return (
      <div className="kanji-test-page__choice">
        <div className="kanji-test-page__choice-layout">
          <div className="kanji-test-page__choice-left">
            <TestQuestion
              questionNumber={questionNumber}
              totalQuestions={totalQuestions}
              title={title}
            />
          </div>
          <div className="kanji-test-page__choice-right">
            <div className="kanji-test-page__choices">
              <p className="daily-task-grammar-review">
                Ваш ответ:{' '}
                <span lang="ja">{reviewAnswer.join(' ')}</span>.{' '}
                {isCorrect ? (
                  'Правильно.'
                ) : (
                  <>
                    Правильный порядок:{' '}
                    <span lang="ja">{correctWordsList.join(' ')}</span>.
                  </>
                )}
              </p>
            </div>
            <Button
              variant="main"
              size="big"
              onClick={onReviewNext}
              className="kanji-test-page__next-btn"
            >
              {isLastQuestion ? 'К результату' : 'Далее'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kanji-test-page__choice kanji-test-page__choice--grammar">
      <div className="kanji-test-page__choice-layout">
        <div className="kanji-test-page__choice-left">
          <TestQuestion
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            title={title}
          />
        </div>
        <div className="kanji-test-page__choice-right">
          <GrammarTest
            correctWords={correctWords}
            distractors={distractors}
            variant="embedded"
            onSlotsChange={onSlotsChange}
          />
          <Button
            variant="main"
            size="big"
            onClick={onNext}
            disabled={nextDisabled}
            className="kanji-test-page__next-btn"
          >
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
