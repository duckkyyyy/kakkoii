'use client';

import clsx from 'clsx';
import Typography from '../atoms/Typography';

/**
 * Блок статьи. Типы по макету Figma:
 * - grammar: заголовок + параграфы + блок Construction (серый фон)
 * - vocab: заголовок + 4 параграфа
 * - reading: один параграф (32px)
 * - introduction: один параграф (24px)
 */
export default function ArticleBlock({
  type = 'grammar',
  title,
  paragraphs = [],
  construction,
  id,
  className,
}) {
  const isGrammarOrVocab = ['grammar', 'vocab'].includes(type);
  const isIntroduction = type === 'introduction';
  const isReading = type === 'reading';
  const isReadingOrIntroduction = ['reading', 'introduction'].includes(type);

  const p1 = paragraphs[0] ?? 'Paragraph 1';
  const p2 = paragraphs[1] ?? 'Paragraph 2';
  const p3 = paragraphs[2] ?? 'Paragraph 3';
  const p4 = paragraphs[3] ?? 'Paragraph 4';

  return (
    <article
      id={id}
      className={clsx(
        'article-block',
        `article-block--${type}`,
        className
      )}
    >
      {isReadingOrIntroduction ? (
        <Typography
          variant={isReading ? '32-medium' : '24-medium'}
          className="article-block__text"
        >
          {title ?? p1}
        </Typography>
      ) : (
        <>
          <Typography variant="h4" className="article-block__title">
            {title ?? 'Title'}
          </Typography>

          {isGrammarOrVocab && (
            <Typography variant="24-medium" className="article-block__text">
              {p1}
            </Typography>
          )}

          {type === 'grammar' && construction && (
            <div className="article-block__construction">
              <Typography variant="24-medium">{construction}</Typography>
            </div>
          )}

          {isGrammarOrVocab && (
            <>
              <Typography variant="24-medium" className="article-block__text">
                {p2}
              </Typography>
              <Typography variant="24-medium" className="article-block__text">
                {p3}
              </Typography>
            </>
          )}

          {type === 'vocab' && (
            <Typography variant="24-medium" className="article-block__text">
              {p4}
            </Typography>
          )}
        </>
      )}
    </article>
  );
}
