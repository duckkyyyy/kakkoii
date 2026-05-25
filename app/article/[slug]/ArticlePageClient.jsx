'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import {
  ArticleCover,
  ArticleBlock,
  ArticleReadingText,
  ArticleSidebar,
  articleSidebarHasContent,
  ArticleCard,
  Grid,
  Button,
  TestChoiceInput,
  ArticleTest,
  AuditionVideo,
  VocabCard,
  Play1,
  Telegram,
  Vkontakte,
} from '../../components';
import ArticleTestResult from './ArticleTestResult';
import ArticleTestChoiceStep from './ArticleTestChoiceStep';
import ArticleGrammarQuestion from './ArticleGrammarQuestion';
import styles from './page.module.css';

const testQuestions = (test) => test?.questions && Array.isArray(test.questions) && test.questions.length > 0;

export default function ArticlePageClient({ article }) {
  const questions = article?.test?.questions ?? [];
  const grammarQuestions = article?.test?.type === 'grammar' ? (article?.test?.questions ?? []) : [];
  const hasGrammarDragTest = article?.type === 'grammar' && article?.test?.type === 'grammar' && grammarQuestions.length > 0;
  const hasMultiQuestionTest = testQuestions(article?.test) && !hasGrammarDragTest;
  const [testQuestionIndex, setTestQuestionIndex] = useState(0);
  const [testAnswers, setTestAnswers] = useState(() => questions.map(() => null));
  const [testMode, setTestMode] = useState('questions');
  const [grammarResults, setGrammarResults] = useState([]);
  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') setShareUrl(window.location.href);
  }, []);
  const testDone = hasMultiQuestionTest && testQuestionIndex >= questions.length;
  const isTestReview = hasMultiQuestionTest && testMode === 'review';
  const isTestResult = hasMultiQuestionTest && testMode === 'result' && testDone;

  const handleTestChoice = (qIndex, choiceIndex) => {
    if (!hasMultiQuestionTest || testDone || isTestReview) return;
    setTestAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = choiceIndex;
      return next;
    });
  };

  const handleTestNext = () => {
    if (!hasMultiQuestionTest) return;
    if (testQuestionIndex < questions.length - 1) {
      setTestQuestionIndex((i) => i + 1);
    } else {
      setTestQuestionIndex(questions.length);
      setTestMode('result');
    }
  };

  const testScore = hasMultiQuestionTest && testAnswers.length > 0
    ? questions.reduce((acc, q, i) => acc + (testAnswers[i] === q.correctChoiceIndex ? 1 : 0), 0)
    : null;

  const handleTestRestart = () => {
    setTestQuestionIndex(0);
    setTestAnswers(questions.map(() => null));
    setTestMode('questions');
    if (hasGrammarDragTest) setGrammarResults([]);
    const el = document.getElementById('test');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGrammarNext = useCallback((correct) => {
    setGrammarResults((prev) => [...prev, correct]);
  }, []);

  const handleViewAnswers = () => {
    if (hasGrammarDragTest) {
      const el = document.getElementById('test');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setTestQuestionIndex(0);
    setTestMode('review');
    const el = document.getElementById('test');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const getArticleTestChoiceState = (question, choiceIndex) => {
    const selectedIndex = testAnswers[testQuestionIndex];
    const correctIndex = question.correctChoiceIndex;
    if (choiceIndex === correctIndex) {
      return selectedIndex === choiceIndex ? 'selectedCorrect' : 'unselectedCorrect';
    }
    if (selectedIndex === choiceIndex) return 'selectedWrong';
    return 'default';
  };

  const handleReviewNext = () => {
    if (testQuestionIndex < questions.length - 1) {
      setTestQuestionIndex((i) => i + 1);
    } else {
      setTestMode('result');
      setTestQuestionIndex(questions.length);
    }
  };

  const currentQuestion = hasMultiQuestionTest && questions[testQuestionIndex];
  const canProceed = currentQuestion && testAnswers[testQuestionIndex] !== null;

  const isGrammarBlock = article.type === 'grammar';
  const isGrammarTest = article.test?.type === 'grammar' && !hasGrammarDragTest;
  const isReading = article.type === 'reading';
  const isAudition = article.type === 'audition';
  const articleSidebarVariant = isReading || isAudition ? 'links' : 'full';
  const showArticleSidebar = articleSidebarHasContent({
    variant: articleSidebarVariant,
    tocItems: article.toc ?? [],
    links: article.links ?? [],
  });
  const isResultView = (hasGrammarDragTest && testMode === 'result') || (hasMultiQuestionTest && isTestResult);
  const resultScore = hasGrammarDragTest ? (grammarResults?.filter(Boolean).length ?? 0) : testScore;
  const resultTotal = hasGrammarDragTest ? grammarQuestions.length : questions.length;
  const currentGrammarQuestion = hasGrammarDragTest && grammarQuestions[grammarResults.length];

  useEffect(() => {
    if (!hasGrammarDragTest || grammarQuestions.length === 0) return;
    if (grammarResults.length < grammarQuestions.length) return;
    if (testMode === 'result') return;
    setTestMode('result');
  }, [hasGrammarDragTest, grammarQuestions.length, grammarResults.length, testMode]);

  const handleShareMain = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (!url) return;
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, text: article.title, url });
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={styles.page}>
      <ArticleCover
        image={article.cover ?? article.image}
        imageAlt={article.title}
        title={article.title}
        backHref={article.backHref}
      />

      <div className={styles.content}>
        <div className={styles.contentMain}>
          <ArticleBlock
            type="reading"
            title={article.introduction}
            id="intro"
          />
          {isAudition ? (
            <>
              <div id="video" className={styles.videoBlock}>
                <div className={styles.videoBlockInner}>
                  {article.videoSrc ? (
                    <AuditionVideo
                      src={article.videoSrc}
                      className={styles.videoNative}
                      fallbackPoster={article.videoPoster ?? article.cover ?? article.image}
                    />
                  ) : (
                    <>
                      <div className={styles.videoBlockImage}>
                        <Image
                          src={article.videoPlaceholder ?? article.cover ?? article.image}
                          alt=""
                          fill
                          className={styles.videoBlockImg}
                          sizes="(max-width: 1200px) 100vw, 1300px"
                        />
                        <div className={styles.videoBlockOverlay} aria-hidden />
                      </div>
                      <button
                        type="button"
                        className={styles.videoBlockPlay}
                        aria-label="Воспроизвести видео"
                      >
                        <Play1 size={140} color="var(--color-white)" strokeColor="var(--color-white)" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              {article.vocabWords?.length > 0 && (
                <>
                  <div id="vocab" className={styles.vocabTitle}>
                    <h3 className={styles.vocabTitleText}>словарь</h3>
                  </div>
                  <div className={styles.vocabBlock}>
                    <div className={styles.vocabGrid}>
                      {article.vocabWords.map((word) => (
                        <VocabCard
                          key={word.kanji}
                          reading={word.reading}
                          kanji={word.kanji}
                          translation={word.translation}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : isReading ? (
            <>
              {(() => {
                const blocks = article.readingBlock
                  ? [article.readingBlock]
                  : article.readingBlocks ?? [];
                return blocks.map((block) => (
                  <article
                    key={block.id}
                    id={block.id}
                    className={`article-block article-block--reading ${styles.readingBlock}`}
                  >
                    <div className={styles.readingBlockParagraphs}>
                      {block.paragraphs?.map((segments, i) => (
                        <ArticleReadingText
                          key={i}
                          segments={segments}
                          variant="32-medium"
                        />
                      ))}
                    </div>
                  </article>
                ));
              })()}
              {article.vocabWords?.length > 0 && (
                <>
                  <div id="review" className={styles.vocabTitle}>
                    <h3 className={styles.vocabTitleText}>словарь</h3>
                  </div>
                  <div className={styles.vocabBlock}>
                    <div className={styles.vocabGrid}>
                      {article.vocabWords.map((word) => (
                        <VocabCard
                          key={word.kanji}
                          reading={word.reading}
                          kanji={word.kanji}
                          translation={word.translation}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            article.blocks?.map((block) => (
              <ArticleBlock
                key={block.id}
                type={isGrammarBlock ? 'grammar' : 'lexicon'}
                id={block.id}
                title={block.title}
                paragraphs={block.paragraphs}
                construction={block.construction}
              />
            ))
          )}

          <div className={styles.share}>
            <button type="button" className={styles.shareBtn} onClick={handleShareMain}>
              Поделиться статьей
            </button>
            <a
              href={shareUrl ? `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article?.title ?? '')}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shareIcon}
              aria-label="Поделиться в Telegram"
            >
              <Telegram size={64} />
            </a>
            <a
              href={shareUrl ? `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article?.title ?? '')}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shareIcon}
              aria-label="Поделиться ВКонтакте"
            >
              <Vkontakte size={64} />
            </a>
          </div>
        </div>

        {showArticleSidebar ? (
          <aside className={styles.sidebar}>
            <ArticleSidebar
              variant={articleSidebarVariant}
              tocItems={article.toc}
              links={article.links}
            />
          </aside>
        ) : null}
      </div>

      <section className={styles.testSection} id="test">
        <div className={styles.testInner}>
          {isResultView ? (
            <ArticleTestResult
              article={article}
              resultScore={resultScore}
              resultTotal={resultTotal}
              onRestart={handleTestRestart}
              onViewAnswers={handleViewAnswers}
            />
          ) : hasGrammarDragTest && currentGrammarQuestion ? (
            <ArticleGrammarQuestion
              key={grammarResults.length}
              instruction={article.test.instruction}
              question={currentGrammarQuestion}
              onNext={handleGrammarNext}
            />
          ) : isGrammarTest ? (
            <ArticleTest
              type="grammar"
              instruction={article.test.instruction}
              sentence={article.test.sentence}
              image={article.test.image}
              correctWords={article.test.correctWords}
              distractors={article.test.distractors}
            />
          ) : hasMultiQuestionTest ? (
            isTestReview ? (
              <ArticleTestChoiceStep
                question={currentQuestion}
                choices={currentQuestion?.choices ?? []}
                choiceStateForIndex={(choiceIndex) =>
                  getArticleTestChoiceState(currentQuestion, choiceIndex)
                }
                onNext={handleReviewNext}
                nextLabel={
                  testQuestionIndex < questions.length - 1 ? 'Далее' : 'К результату'
                }
                choicesDisabled
              />
            ) : (
              <ArticleTestChoiceStep
                question={currentQuestion}
                choices={currentQuestion?.choices ?? []}
                choiceStateForIndex={(choiceIndex) =>
                  testAnswers[testQuestionIndex] === choiceIndex ? 'selected' : 'default'
                }
                onChoiceClick={(choiceIndex) =>
                  handleTestChoice(testQuestionIndex, choiceIndex)
                }
                onNext={handleTestNext}
                nextLabel={
                  testQuestionIndex < questions.length - 1
                    ? 'Далее'
                    : 'Показать результат'
                }
                nextDisabled={!canProceed}
              />
            )
          ) : (
            <>
              <ArticleTest
                type="default"
                question={article.test?.question}
                image={article.test?.image}
              />
              <div className={styles.testChoices}>
                {(article.test?.choices ?? []).map((choice, choiceIndex) => (
                  <TestChoiceInput key={`static-${choiceIndex}`} state="default" onClick={() => {}}>
                    {choice}
                  </TestChoiceInput>
                ))}
                <Button variant="main" size="big" disabled>
                  Далее
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className={styles.relatedTitle}>
        <h2 className={styles.relatedTitleText}>похожие статьи</h2>
      </section>

      <section className={styles.related}>
        <Grid cols={12} gap="20px">
          {(article.related ?? []).map((item) => (
            <ArticleCard
              key={item.slug}
              href={`/article/${item.slug}`}
              image={item.image}
              imageAlt={item.title}
              tags={item.tags}
              title={item.title}
              description={item.description}
              cols={4}
              tabletCols={4}
              mobileCols={12}
            />
          ))}
        </Grid>
      </section>
    </div>
  );
}
