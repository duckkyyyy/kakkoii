'use client';

import Image from 'next/image';
import { Button, Footer } from '../components';

const KAI_SLEEPY = '/images/kai/kai-sleepy.png';

export default function DailyTaskResult({
  score,
  totalQuestions,
  onViewAnswers,
}) {
  return (
    <div className="kanji-test-page__result">
      <div className="kanji-test-page__result-content">
        <div className="kanji-test-page__result-title-bar">
          <p className="kanji-test-page__result-title-text">
            результат — {score} из {totalQuestions}
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
            onClick={onViewAnswers}
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
