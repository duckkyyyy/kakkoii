'use client';

import clsx from 'clsx';
import Image from 'next/image';
import GrammarTest from './GrammarTest';

export default function ArticleTest({
  type = 'default',
  question,
  image,
  imageAlt = '',
  instruction,
  sentence,
  correctWords,
  distractors,
  onNext,
  className,
}) {
  const isGrammar = type === 'grammar';

  const content = (
    <div
      className={clsx(
        'article-test',
        `article-test--${type}`,
        className
      )}
    >
      {isGrammar ? (
        <>
          <div className="article-test__question-block">
            <div className="article-test__header">
              <p className="article-test__instruction">{instruction ?? 'Соберите предложение'}</p>
              {sentence && (
                <p className="article-test__sentence">{sentence}</p>
              )}
            </div>
            <div className="article-test__image-wrap article-test__image-wrap--tall">
              {image && (
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="article-test__image"
                  sizes="(max-width: 768px) 100vw, 622px"
                />
              )}
            </div>
          </div>
          <div className="article-test__grammar-content">
            <GrammarTest
              correctWords={correctWords}
              distractors={distractors}
              onNext={onNext}
            />
          </div>
        </>
      ) : (
        <>
          <div className="article-test__header">
            {question && (
              <p className="article-test__question">{question}</p>
            )}
          </div>
          <div className="article-test__image-wrap">
            {image && (
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="article-test__image"
                sizes="(max-width: 768px) 100vw, 622px"
              />
            )}
          </div>
        </>
      )}
    </div>
  );

  return content;
}
