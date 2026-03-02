'use client';

import { useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import GrammarTag from '../atoms/GrammarTag';
import Button from '../atoms/Button';

/**
 * Тест по грамматике: расставить слова в правильном порядке.
 * - correctWords: правильный порядок слов
 * - distractors: лишние слова для выбора
 */
const DEFAULT_SENTENCE = {
  correctWords: ['きのう', '晩ご飯を', '食べて', 'アニメを', '見て', '寝ました'],
  distractors: ['朝ごはん', '後ろ', '明日', '寝みました'],
};

function getSlotMinWidth(word) {
  const baseWidth = 24;
  const charWidth = 14;
  return Math.max(baseWidth, word.length * charWidth);
}

function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function GrammarTest({
  correctWords = DEFAULT_SENTENCE.correctWords,
  distractors = DEFAULT_SENTENCE.distractors,
}) {
  const [allWords, setAllWords] = useState(() => [
    ...correctWords,
    ...distractors,
  ]);
  const [slots, setSlots] = useState(() => correctWords.map(() => null));

  useEffect(() => {
    setAllWords(shuffleArray([...correctWords, ...distractors]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState(null);
  const [draggedWord, setDraggedWord] = useState(null);
  const [dragSource, setDragSource] = useState(null);

  const handleCheck = useCallback(() => {
    const filled = slots.every(Boolean);
    if (!filled) return;
    const userOrder = slots.map((w) => w);
    const correct = userOrder.every((w, i) => w === correctWords[i]);
    setResults(
      userOrder.map((word, i) => ({
        word,
        correct: word === correctWords[i],
      }))
    );
    setChecked(true);
  }, [slots, correctWords]);

  const handleReset = useCallback(() => {
    setSlots(correctWords.map(() => null));
    setChecked(false);
    setResults(null);
  }, [correctWords]);

  const handleNext = useCallback(() => {
    // TODO: переход к следующему заданию
  }, []);

  const handleDragStart = useCallback((e, word, source) => {
    setDraggedWord(word);
    setDragSource(source);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', word);
    e.dataTransfer.setData('application/json', JSON.stringify({ word, source }));
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedWord(null);
    setDragSource(null);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDropOnSlot = useCallback(
    (e, slotIndex) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('application/json');
      if (!data) return;
      const { word, source } = JSON.parse(data);

      if (source?.type === 'available') {
        setSlots((prev) => {
          const next = [...prev];
          next[slotIndex] = word;
          return next;
        });
      } else if (source?.type === 'slot' && source.index !== slotIndex) {
        setSlots((prev) => {
          const next = [...prev];
          const temp = next[source.index];
          next[source.index] = next[slotIndex];
          next[slotIndex] = temp;
          return next;
        });
      }
      setDraggedWord(null);
      setDragSource(null);
    },
    [slots]
  );

  const handleDropOnAvailable = useCallback(
    (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('application/json');
      if (!data) return;
      const { source } = JSON.parse(data);

      if (source?.type === 'slot') {
        setSlots((prev) => {
          const next = [...prev];
          next[source.index] = null;
          return next;
        });
      }
      setDraggedWord(null);
      setDragSource(null);
    },
    []
  );

  const getTagState = (word, slotIndex) => {
    if (!checked || !results) return 'default';
    const r = results[slotIndex];
    if (!r) return 'default';
    if (r.correct) return 'selectedCorrect';
    return 'selectedWrong';
  };

  const filled = slots.every(Boolean);

  return (
    <div className="grammar-test">
      <div className="grammar-test__field">
        <div className="grammar-test__slots">
          {slots.map((word, i) => (
            <div
              key={i}
              className={clsx(
                'grammar-test__slot',
                !word && 'grammar-test__slot--empty',
                draggedWord && 'grammar-test__slot--drag-over'
              )}
              style={{ minWidth: getSlotMinWidth(correctWords[i]) }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropOnSlot(e, i)}
            >
              {word ? (
                <div
                  className="grammar-test__slot-tag"
                  draggable={!checked}
                  onDragStart={(e) =>
                    handleDragStart(e, word, { type: 'slot', index: i })
                  }
                  onDragEnd={handleDragEnd}
                >
                  <GrammarTag
                    state={getTagState(word, i)}
                    disabled
                    className="grammar-test__grammar-tag-in-slot"
                  >
                    {word}
                  </GrammarTag>
                </div>
              ) : (
                <span className="grammar-test__slot-placeholder" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grammar-test__tags">
        {allWords.map((word, i) => {
          const isUsed = slots.includes(word);
          return (
            <div
              key={`${word}-${i}`}
              className={clsx(
                'grammar-test__tag-wrapper',
                isUsed && 'grammar-test__tag-wrapper--used'
              )}
              draggable={!checked && !isUsed}
              onDragStart={(e) =>
                handleDragStart(e, word, { type: 'available' })
              }
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={handleDropOnAvailable}
            >
              <GrammarTag
                state="default"
                disabled={checked}
                className="grammar-test__grammar-tag"
              >
                {word}
              </GrammarTag>
            </div>
          );
        })}
      </div>

      <div className="grammar-test__actions">
        {!checked ? (
          <Button
            variant="main"
            size="big"
            onClick={handleCheck}
            disabled={!filled}
            className="grammar-test__btn"
          >
            Проверить
          </Button>
        ) : (
          <>
            <Button
              variant="secondary"
              size="big"
              onClick={handleReset}
              className="grammar-test__btn grammar-test__btn--secondary"
            >
              Пройти заново
            </Button>
            <Button
              variant="main"
              size="big"
              onClick={handleNext}
              className="grammar-test__btn"
            >
              Далее
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
