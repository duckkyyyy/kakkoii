'use client';

import clsx from 'clsx';
import Typography from '../atoms/Typography';
import { hasJapanese } from '../../../lib/hasJapanese';

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
  const isLexicon = type === 'lexicon';
  const isReadingOrIntroduction = ['reading', 'introduction'].includes(type);

  const p1 = paragraphs[0] ?? 'Paragraph 1';
  const p2 = paragraphs[1] ?? 'Paragraph 2';
  const p3 = paragraphs[2] ?? 'Paragraph 3';
  const p4 = paragraphs[3] ?? 'Paragraph 4';

  const renderLexiconParagraph = (item) => {
    if (typeof item === 'string') {
      return (
        <Typography
          key={item.slice(0, 30)}
          variant="24-medium"
          className="article-block__text"
          lang={hasJapanese(item) ? 'ja' : undefined}
        >
          {item}
        </Typography>
      );
    }
    if (item?.bold != null && item?.text != null) {
      return (
        <Typography
          key={item.bold}
          variant="24-medium"
          className="article-block__text"
          lang={hasJapanese(item.bold) || hasJapanese(item.text) ? 'ja' : undefined}
        >
          <span className="article-block__bold" lang={hasJapanese(item.bold) ? 'ja' : undefined}>
            {item.bold}
          </span>
          {item.text}
        </Typography>
      );
    }
    return null;
  };

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
          lang={hasJapanese(title ?? p1) ? 'ja' : undefined}
        >
          {title ?? p1}
        </Typography>
      ) : isLexicon ? (
        <>
          {title && (
            <Typography
              variant="h3"
              className="article-block__title article-block__title--lexicon"
              lang={hasJapanese(title) ? 'ja' : undefined}
            >
              {title}
            </Typography>
          )}
          {paragraphs.map((item, i) => (
            <span key={i}>{renderLexiconParagraph(item)}</span>
          ))}
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            className="article-block__title"
            lang={hasJapanese(title) ? 'ja' : undefined}
          >
            {title ?? 'Title'}
          </Typography>

          {isGrammarOrVocab && (
            <Typography
              variant="24-medium"
              className="article-block__text"
              lang={hasJapanese(p1) ? 'ja' : undefined}
            >
              {p1}
            </Typography>
          )}

          {type === 'grammar' && construction && (
            <div className="article-block__construction">
              <Typography variant="24-medium" lang={hasJapanese(construction) ? 'ja' : undefined}>
                {construction}
              </Typography>
            </div>
          )}

          {isGrammarOrVocab && (
            <>
              <Typography
                variant="24-medium"
                className="article-block__text"
                lang={hasJapanese(p2) ? 'ja' : undefined}
              >
                {p2}
              </Typography>
              <Typography
                variant="24-medium"
                className="article-block__text"
                lang={hasJapanese(p3) ? 'ja' : undefined}
              >
                {p3}
              </Typography>
            </>
          )}

          {type === 'vocab' && (
            <Typography
              variant="24-medium"
              className="article-block__text"
              lang={hasJapanese(p4) ? 'ja' : undefined}
            >
              {p4}
            </Typography>
          )}
        </>
      )}
    </article>
  );
}
