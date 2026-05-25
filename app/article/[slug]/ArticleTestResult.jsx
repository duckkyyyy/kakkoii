'use client';

import Image from 'next/image';
import { Button } from '../../components';
import styles from './page.module.css';

function getResultTier(score, total) {
  if (score === total) return 'perfect';
  if (score >= total / 2) return 'partial';
  return 'fail';
}

export default function ArticleTestResult({
  article,
  resultScore,
  resultTotal,
  onRestart,
  onViewAnswers,
}) {
  const tier = getResultTier(resultScore, resultTotal);
  const messages = article.test?.resultMessages?.[tier];

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
          {messages?.main && (
            <p className={styles.testResultMain} lang="ja">
              {messages.main}
            </p>
          )}
          {messages?.sub && (
            <p className={styles.testResultSub} lang="ja">
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
