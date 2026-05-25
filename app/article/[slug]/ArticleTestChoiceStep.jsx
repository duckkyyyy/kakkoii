'use client';

import { ArticleTest, Button, TestChoiceInput } from '../../components';
import styles from './page.module.css';

export default function ArticleTestChoiceStep({
  question,
  choices,
  choiceStateForIndex,
  onChoiceClick,
  onNext,
  nextLabel,
  nextDisabled,
  choicesDisabled = false,
}) {
  return (
    <div className={styles.testChoiceWrap}>
      <div className={styles.testChoiceLayout}>
        <div className={styles.testChoiceLeft}>
          <ArticleTest
            type="default"
            question={question?.question}
            image={question?.image}
          />
        </div>
        <div className={styles.testChoiceRight}>
          {choices.map((choice, choiceIndex) => (
            <TestChoiceInput
              key={choiceIndex}
              state={choiceStateForIndex(choiceIndex)}
              onClick={() => onChoiceClick?.(choiceIndex)}
              disabled={choicesDisabled}
            >
              {choice}
            </TestChoiceInput>
          ))}
          <Button
            variant="main"
            size="big"
            disabled={nextDisabled}
            onClick={onNext}
          >
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
