'use client';

import { useState } from 'react';
import KanjiStrokeField from '../components/molecules/KanjiStrokeField';
import { Button, TestQuestion } from '../components';
import DailyTaskResult from './DailyTaskResult';
import DailyTaskChoiceStep from './DailyTaskChoiceStep';
import DailyTaskGrammarQuestion from './DailyTaskGrammarQuestion';

const DAILY_TASK_KANJI = '日';

const DAILY_TASK_QUESTIONS = [
  {
    id: 1,
    type: 'vocabulary',
    title: 'Выбери правильный перевод слова 勉強.',
    prompt: 'Лексика',
    choices: ['учить, заниматься', 'работать', 'отдыхать', 'спать'],
    correctChoiceIndex: 0,
  },
  {
    id: 2,
    type: 'grammar',
    title: 'Составьте предложение «Вчера я поужинал, посмотрел аниме и лёг спать»',
    prompt: 'Грамматика',
    correctWords: ['きのう', '晩ご飯を', '食べて', 'アニメを', '見て', '寝ました'],
    distractors: ['朝ごはん', '後ろ', '明日', '寝みました'],
  },
  {
    id: 3,
    type: 'reading',
    title: 'О чем говорится в тексте?',
    prompt: 'Чтение',
    text: '日本の幽霊話は、恐ろしいけれど魅力的な要素がいっぱいです。その中でも有名な幽霊は「お岩」です。お岩は、裏切られた妻として知られており、その怨念が強いと言われています。',
    choices: ['О землетрясении', 'О призраках', 'Об еде', 'О музыке'],
    correctChoiceIndex: 1,
  },
  {
    id: 4,
    type: 'audio',
    title: 'О чем говорит героиня?',
    prompt: 'Аудирование',
    choices: [
      'Скоро у нее День рождения',
      'Вчера она встретилась с подругой',
      'Она любит Японию',
      'Ей с ним каждый день так весело',
    ],
    correctChoiceIndex: 3,
  },
  {
    id: 5,
    type: 'drawing',
    title: 'Попробуйте написать 日',
    prompt: 'Нарисуй кандзи по порядку черт.',
  },
];

export default function DailyTaskPage() {
  const totalQuestions = DAILY_TASK_QUESTIONS.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState(
    () => DAILY_TASK_QUESTIONS.map(() => null)
  );
  const [grammarSlots, setGrammarSlots] = useState(null);
  const [grammarAnswer, setGrammarAnswer] = useState(null);
  const [drawingResult, setDrawingResult] = useState(null);
  const [mode, setMode] = useState('questions');

  const currentQuestion = DAILY_TASK_QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const isGrammarQuestion = currentQuestion?.type === 'grammar';
  const grammarFilled =
    isGrammarQuestion &&
    currentQuestion.correctWords &&
    grammarSlots &&
    grammarSlots.length === currentQuestion.correctWords.length &&
    grammarSlots.every(Boolean);

  const handleChoiceSelect = (choiceIndex) => {
    setSelectedChoices((prev) => {
      const next = [...prev];
      next[currentIndex] = choiceIndex;
      return next;
    });
  };

  const handleDrawingComplete = (isCorrect) => {
    setDrawingResult(isCorrect ? 'correct' : 'wrong');
  };

  const handleViewAnswers = () => {
    setCurrentIndex(0);
    setMode('review');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const computeScore = () => {
    let score = 0;
    DAILY_TASK_QUESTIONS.forEach((q, index) => {
      if (q.type === 'drawing') {
        if (drawingResult === 'correct') score += 1;
        return;
      }
      if (q.type === 'grammar') {
        const answer = grammarAnswer;
        if (
          answer &&
          q.correctWords &&
          answer.length === q.correctWords.length &&
          answer.every((w, i) => w === q.correctWords[i])
        ) {
          score += 1;
        }
        return;
      }
      const answer = selectedChoices[index];
      if (answer === q.correctChoiceIndex) {
        score += 1;
      }
    });
    return score;
  };

  const isReview = mode === 'review';
  const canGoNext =
    isReview ||
    (mode === 'questions' &&
      ((currentQuestion.type === 'drawing' && !!drawingResult) ||
        (currentQuestion.type === 'grammar' && grammarFilled) ||
        (currentQuestion.type !== 'drawing' &&
          currentQuestion.type !== 'grammar' &&
          selectedChoices[currentIndex] !== null)));

  const handleNext = () => {
    if (!canGoNext && !isReview) return;
    if (mode === 'questions' && isGrammarQuestion && grammarFilled && grammarSlots) {
      setGrammarAnswer([...grammarSlots]);
    }
    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setMode('result');
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const score = mode === 'result' ? computeScore() : null;

  const getChoiceState = (question, index) => {
    const selectedIndex = selectedChoices[currentIndex];
    const correctIndex = question.correctChoiceIndex;
    if (index === correctIndex) {
      return selectedIndex === index ? 'selectedCorrect' : 'unselectedCorrect';
    }
    if (selectedIndex === index) return 'selectedWrong';
    return 'default';
  };

  const getNextLabel = () => {
    if (isLastQuestion) {
      return isReview ? 'К результату' : 'Завершить тест';
    }
    return 'Далее';
  };

  const renderQuestionContent = () => {
    if (mode === 'result') {
      return (
        <DailyTaskResult
          score={score ?? 0}
          totalQuestions={totalQuestions}
          onViewAnswers={handleViewAnswers}
        />
      );
    }

    if (currentQuestion.type === 'grammar') {
      return (
        <DailyTaskGrammarQuestion
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          title={currentQuestion.title}
          correctWords={currentQuestion.correctWords}
          distractors={currentQuestion.distractors}
          onSlotsChange={setGrammarSlots}
          onNext={handleNext}
          nextDisabled={!canGoNext}
          nextLabel={getNextLabel()}
          reviewAnswer={grammarAnswer}
          reviewCorrectWords={currentQuestion.correctWords}
          isReview={isReview}
          isLastQuestion={isLastQuestion}
          onReviewNext={handleNext}
        />
      );
    }

    if (currentQuestion.type === 'drawing') {
      return (
        <div className="kanji-test-page__drawing">
          <div className="kanji-test-page__choice-layout">
            <div className="kanji-test-page__choice-left">
              <TestQuestion
                questionNumber={currentIndex + 1}
                totalQuestions={totalQuestions}
                title={currentQuestion.title}
              />
            </div>
            <div className="kanji-test-page__choice-right">
              {isReview && drawingResult != null && (
                <p className="kanji-test-page__drawing-review-result">
                  {drawingResult === 'correct' ? 'Правильно' : 'Неправильно'}
                </p>
              )}
              {!isReview && (
                <KanjiStrokeField
                  kanji={DAILY_TASK_KANJI}
                  onComplete={handleDrawingComplete}
                />
              )}
              {isReview && (
                <div
                  className="kanji-test-page__drawing-review-placeholder"
                  aria-hidden
                />
              )}
              <Button
                variant="main"
                size="big"
                onClick={handleNext}
                disabled={!canGoNext}
                className="kanji-test-page__next-btn"
              >
                {getNextLabel()}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (currentQuestion.type === 'reading') {
      return (
        <DailyTaskChoiceStep
          variant="reading"
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          title={currentQuestion.title}
          choices={currentQuestion.choices}
          readingText={currentQuestion.text}
          choiceStateForIndex={(index) =>
            isReview
              ? getChoiceState(currentQuestion, index)
              : selectedChoices[currentIndex] === index
                ? 'selected'
                : 'default'
          }
          onChoiceClick={handleChoiceSelect}
          onNext={handleNext}
          nextLabel={getNextLabel()}
          nextDisabled={!canGoNext}
          choicesDisabled={isReview}
        />
      );
    }

    if (currentQuestion.type === 'audio') {
      return (
        <DailyTaskChoiceStep
          variant="audio"
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          title={currentQuestion.title}
          choices={currentQuestion.choices}
          choiceStateForIndex={(index) =>
            isReview
              ? getChoiceState(currentQuestion, index)
              : selectedChoices[currentIndex] === index
                ? 'selected'
                : 'default'
          }
          onChoiceClick={handleChoiceSelect}
          onNext={handleNext}
          nextLabel={getNextLabel()}
          nextDisabled={!canGoNext}
          choicesDisabled={isReview}
        />
      );
    }

    return (
      <DailyTaskChoiceStep
        questionNumber={currentIndex + 1}
        totalQuestions={totalQuestions}
        title={currentQuestion.title}
        choices={currentQuestion.choices}
        choiceStateForIndex={(index) =>
          isReview
            ? getChoiceState(currentQuestion, index)
            : selectedChoices[currentIndex] === index
              ? 'selected'
              : 'default'
        }
        onChoiceClick={handleChoiceSelect}
        onNext={handleNext}
        nextLabel={getNextLabel()}
        nextDisabled={!canGoNext}
        choicesDisabled={isReview}
      />
    );
  };

  const progressCounterText =
    mode === 'result' ? 'Тест завершён' : `${currentIndex + 1}/${totalQuestions}`;
  const filledSegments = mode === 'result' ? totalQuestions : currentIndex + 1;
  const showProgress = mode !== 'result';

  return (
    <div
      className={`kanji-test-page daily-task-page${mode === 'result' ? ' kanji-test-page--result' : ''}`}
    >
      <div className="kanji-test-page__center">
        <div className="kanji-test-page__spacer" aria-hidden />
        <div className="kanji-test-page__content">
          <div className="kanji-test-page__body">
            {renderQuestionContent()}
          </div>
        </div>
        <div className="kanji-test-page__spacer" aria-hidden />
      </div>

      {showProgress && (
        <div className="kanji-test-progress">
          <div className="kanji-test-progress__inner">
            <div className="kanji-test-progress__counter-box">
              <p className="kanji-test-progress__counter">
                {progressCounterText}
              </p>
            </div>
            <div className="kanji-test-progress__segments">
              {Array.from({ length: totalQuestions }, (_, i) => (
                <div
                  key={i}
                  className={`kanji-test-progress__segment ${i < filledSegments ? 'kanji-test-progress__segment--filled' : ''}`}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
