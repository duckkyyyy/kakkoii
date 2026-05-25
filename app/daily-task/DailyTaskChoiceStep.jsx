'use client';

import Image from 'next/image';
import { Button, TestChoiceInput, TestQuestion } from '../components';

const KAI_SLEEPY = '/images/kai/kai-sleepy.png';

export default function DailyTaskChoiceStep({
  questionNumber,
  totalQuestions,
  title,
  choices,
  choiceStateForIndex,
  onChoiceClick,
  onNext,
  nextLabel,
  nextDisabled,
  choicesDisabled = false,
  variant = 'default',
  readingText,
}) {
  if (variant === 'reading') {
    return (
      <div className="kanji-test-page__audio kanji-test-page__reading">
        <div className="kanji-test-page__choice-layout">
          <div className="kanji-test-page__audio-left">
            <div className="kanji-test-page__audio-question">
              <TestQuestion
                questionNumber={questionNumber}
                totalQuestions={totalQuestions}
                title={title}
              />
            </div>
            <div className="kanji-test-page__reading-text-wrap">
              <p className="kanji-test-page__reading-text" lang="ja">
                {readingText}
              </p>
            </div>
          </div>
          <div className="kanji-test-page__choice-right">
            <div className="kanji-test-page__choices">
              {choices.map((choice, index) => (
                <TestChoiceInput
                  key={index}
                  state={choiceStateForIndex(index)}
                  onClick={() => onChoiceClick?.(index)}
                  disabled={choicesDisabled}
                >
                  {choice}
                </TestChoiceInput>
              ))}
            </div>
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

  if (variant === 'audio') {
    return (
      <div className="kanji-test-page__audio">
        <div className="kanji-test-page__choice-layout">
          <div className="kanji-test-page__audio-left">
            <div className="kanji-test-page__audio-question">
              <TestQuestion
                questionNumber={questionNumber}
                totalQuestions={totalQuestions}
                title={title}
              />
            </div>
            <div className="kanji-test-page__audio-media">
              <div className="kanji-test-page__audio-media-inner">
                <Image
                  src={KAI_SLEEPY}
                  alt="Видео к вопросу по аудированию"
                  fill
                  sizes="(max-width: 768px) 100vw, 622px"
                  unoptimized
                />
              </div>
            </div>
          </div>
          <div className="kanji-test-page__choice-right">
            <div className="kanji-test-page__choices">
              {choices.map((choice, index) => (
                <TestChoiceInput
                  key={index}
                  state={choiceStateForIndex(index)}
                  onClick={() => onChoiceClick?.(index)}
                  disabled={choicesDisabled}
                >
                  {choice}
                </TestChoiceInput>
              ))}
            </div>
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
            {choices.map((choice, index) => (
              <TestChoiceInput
                key={index}
                state={choiceStateForIndex(index)}
                onClick={() => onChoiceClick?.(index)}
                disabled={choicesDisabled}
              >
                {choice}
              </TestChoiceInput>
            ))}
          </div>
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
