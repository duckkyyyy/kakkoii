'use client';

import Image from 'next/image';
import { Button } from '../../components';
import styles from './page.module.css';

function getResultTier(score, total) {
  if (score === total) return 'perfect';
  if (score >= total / 2) return 'partial';
  return 'fail';
}

const DEFAULT_RESULT_MESSAGES = {
  perfect: {
    main: 'やばい! Все ответы верны — отличная работа!',
    sub: 'Ты уверенно усвоил материал статьи. Так держать!',
  },
  partial: {
    main: 'Хороший результат! Пару вопросов стоит повторить.',
    sub: 'Перечитай статью и пройди тест ещё раз — будет ещё лучше.',
  },
  fail: {
    main: 'Не сдавайся! Перечитай статью и попробуй снова. 頑張って!',
    sub: 'Каждый повтор приближает к цели — слова запомнятся в контексте.',
  },
};

function textLang(text) {
  return /[\u3040-\u30FF\u4E00-\u9FFF]/.test(text ?? '') ? 'ja' : undefined;
}

export default function ArticleTestResult({
  article,
  resultScore,
  resultTotal,
  onRestart,
  onViewAnswers,
}) {
  const tier = getResultTier(resultScore, resultTotal);
  const messages =
    article.test?.resultMessages?.[tier] ?? DEFAULT_RESULT_MESSAGES[tier];

  return (
    <div className={styles.testResultWrap}>
      <div className={styles.testResultLeft}>
        <p className={styles.testResultTitle}>
          Результат — {resultScore} из {resultTotal}
        </p>
        <div className={styles.testResultCover}>
          <Image
            src={article.test?.resultImage ?? article.cover ?? article.image}
            alt=""
            fill
            className={styles.testResultCoverImg}
            sizes="622px"
            unoptimized={String(
              article.test?.resultImage ?? article.cover ?? article.image ?? ''
            ).includes('/kai/')}
          />
        </div>
      </div>
      <div className={styles.testResultRight}>
        <div className={styles.testResultCard}>
          {messages.main && (
            <p className={styles.testResultMain} lang={textLang(messages.main)}>
              {messages.main}
            </p>
          )}
          {messages.sub && (
            <p className={styles.testResultSub} lang={textLang(messages.sub)}>
              {messages.sub}
            </p>
          )}
        </div>
        <div className={styles.testResultActions}>
          <Button
            variant="secondary"
            size="big"
            className={styles.testResultBtn}
            onClick={onRestart}
          >
            Пройти заново
          </Button>
          <Button
            variant="main"
            size="big"
            className={styles.testResultBtn}
            onClick={onViewAnswers}
          >
            Смотреть ответы
          </Button>
        </div>
      </div>
    </div>
  );
}
