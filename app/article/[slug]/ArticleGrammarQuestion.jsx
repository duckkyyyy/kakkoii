'use client';

import { ArticleTest } from '../../components';
import styles from './page.module.css';

export default function ArticleGrammarQuestion({
  instruction,
  question,
  onNext,
}) {
  return (
    <div className={styles.testGrammarFullWidth}>
      <ArticleTest
        type="grammar"
        instruction={instruction}
        sentence={question.sentence}
        image={question.image}
        correctWords={question.correctWords}
        distractors={question.distractors}
        onNext={onNext}
      />
    </div>
  );
}
