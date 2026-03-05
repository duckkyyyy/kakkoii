'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Button,
  TestQuestion,
  TestChoiceInput,
  Footer,
} from '../components';
import KanjiStrokeField from '../components/molecules/KanjiStrokeField';
import GrammarTest from '../components/molecules/GrammarTest';

const KAI_SLEEPY = '/images/kai/kai-sleepy.png';
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

  const renderChoices = (question) => {
    const selectedIndex = selectedChoices[currentIndex];
    const showResults = isReview;
    return (
      <div className="kanji-test-page__choices">
        {question.choices.map((choice, index) => {
          const state = showResults
            ? getChoiceState(question, index)
            : selectedIndex === index
              ? 'selected'
              : 'default';
          return (
            <TestChoiceInput
              key={index}
              state={state}
              onClick={() => !showResults && handleChoiceSelect(index)}
              disabled={showResults}
            >
              {choice}
            </TestChoiceInput>
          );
        })}
      </div>
    );
  };

  const renderQuestionContent = () => {
    if (mode === 'result') {
      const correctTotal = score ?? 0;
      return (
        <div className="kanji-test-page__result">
          <div className="kanji-test-page__result-content">
            <div className="kanji-test-page__result-title-bar">
              <p className="kanji-test-page__result-title-text">
                результат — {correctTotal} из {totalQuestions}
              </p>
            </div>
            <div className="kanji-test-page__result-descr">
              <div className="kanji-test-page__result-kai">
                <Image
                  src={KAI_SLEEPY}
                  alt=""
                  width={332}
                  height={332}
                  className="kanji-test-page__result-kai-img"
                  unoptimized
                />
              </div>
              <div className="kanji-test-page__result-text">
                <p className="kanji-test-page__result-text-main">
                  Хороший старт! Кай одобрительно кивает. Ты сделал важное дело — уделил время языку сегодня. Завтра будет ещё лучше!
                </p>
                <p className="kanji-test-page__result-text-tip">
                  Сегодня стоит обратить внимание на кандзи. Попробуй заглянуть в нашу статью по этой теме!
                </p>
              </div>
            </div>
            <div className="kanji-test-page__result-actions">
              <Button
                variant="secondary"
                size="big"
                onClick={() => {}}
                className="kanji-test-page__result-btn"
              >
                Поделиться результатом
              </Button>
              <Button
                variant="secondary"
                size="big"
                onClick={handleViewAnswers}
                className="kanji-test-page__result-btn kanji-test-page__result-btn--flex"
              >
                Смотреть ответы
              </Button>
              <Button
                variant="main"
                size="big"
                href="/"
                className="kanji-test-page__result-btn kanji-test-page__result-btn--flex"
              >
                На главную
              </Button>
            </div>
          </div>
          <div className="kanji-test-page__result-footer">
            <Footer />
          </div>
        </div>
      );
    }

    if (currentQuestion.type === 'grammar') {
      if (isReview && grammarAnswer) {
        const correctWords = currentQuestion.correctWords || [];
        const isCorrect =
          grammarAnswer.length === correctWords.length &&
          grammarAnswer.every((w, i) => w === correctWords[i]);
        return (
          <div className="kanji-test-page__choice">
            <div className="kanji-test-page__choice-layout">
              <div className="kanji-test-page__choice-left">
                <TestQuestion
                  questionNumber={currentIndex + 1}
                  totalQuestions={totalQuestions}
                  title={currentQuestion.title}
                />
              </div>
              <div className="kanji-test-page__choice-right">
                <div className="kanji-test-page__choices">
                  <p className="daily-task-grammar-review">
                    Ваш ответ: {grammarAnswer.join(' ')}.{' '}
                    {isCorrect ? 'Правильно.' : `Правильный порядок: ${correctWords.join(' ')}.`}
                  </p>
                </div>
                <Button
                  variant="main"
                  size="big"
                  onClick={handleNext}
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
                questionNumber={currentIndex + 1}
                totalQuestions={totalQuestions}
                title={currentQuestion.title}
              />
            </div>
            <div className="kanji-test-page__choice-right">
              <GrammarTest
                correctWords={currentQuestion.correctWords}
                distractors={currentQuestion.distractors}
                variant="embedded"
                onSlotsChange={setGrammarSlots}
              />
              <Button
                variant="main"
                size="big"
                onClick={handleNext}
                disabled={!canGoNext}
                className="kanji-test-page__next-btn"
              >
                {isLastQuestion ? 'Завершить тест' : 'Далее'}
              </Button>
            </div>
          </div>
        </div>
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
                {isLastQuestion
                  ? isReview
                    ? 'К результату'
                    : 'Завершить тест'
                  : 'Далее'}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (currentQuestion.type === 'reading') {
      return (
        <div className="kanji-test-page__audio kanji-test-page__reading">
          <div className="kanji-test-page__choice-layout">
            <div className="kanji-test-page__audio-left">
              <div className="kanji-test-page__audio-question">
                <TestQuestion
                  questionNumber={currentIndex + 1}
                  totalQuestions={totalQuestions}
                  title={currentQuestion.title}
                />
              </div>
              <div className="kanji-test-page__reading-text-wrap">
                <p className="kanji-test-page__reading-text" lang="ja">
                  {currentQuestion.text}
                </p>
              </div>
            </div>
            <div className="kanji-test-page__choice-right">
              {renderChoices(currentQuestion)}
              <Button
                variant="main"
                size="big"
                onClick={handleNext}
                disabled={!canGoNext}
                className="kanji-test-page__next-btn"
              >
                {isLastQuestion
                  ? isReview
                    ? 'К результату'
                    : 'Завершить тест'
                  : 'Далее'}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (currentQuestion.type === 'audio') {
      return (
        <div className="kanji-test-page__audio">
          <div className="kanji-test-page__choice-layout">
            <div className="kanji-test-page__audio-left">
              <div className="kanji-test-page__audio-question">
                <TestQuestion
                  questionNumber={currentIndex + 1}
                  totalQuestions={totalQuestions}
                  title={currentQuestion.title}
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
              {renderChoices(currentQuestion)}
              <Button
                variant="main"
                size="big"
                onClick={handleNext}
                disabled={!canGoNext}
                className="kanji-test-page__next-btn"
              >
                {isLastQuestion
                  ? isReview
                    ? 'К результату'
                    : 'Завершить тест'
                  : 'Далее'}
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
              questionNumber={currentIndex + 1}
              totalQuestions={totalQuestions}
              title={currentQuestion.title}
            />
          </div>
          <div className="kanji-test-page__choice-right">
            {renderChoices(currentQuestion)}
            <Button
              variant="main"
              size="big"
              onClick={handleNext}
              disabled={!canGoNext}
              className="kanji-test-page__next-btn"
            >
              {isLastQuestion
                ? isReview
                  ? 'К результату'
                  : 'Завершить тест'
                : 'Далее'}
            </Button>
          </div>
        </div>
      </div>
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
