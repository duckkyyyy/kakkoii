'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Typography from '../atoms/Typography';
import Play1 from '../atoms/icons/play1';
import Pause from '../atoms/icons/pause';

/**
 * Карточка словарного слова с чтением, кандзи и переводом.
 * При нажатии на play инвертирует цвета и показывает pause.
 */
export default function VocabCard({
  reading,
  kanji,
  translation,
  className,
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div
      className={clsx(
        'vocab-card',
        isPlaying && 'vocab-card--playing',
        className
      )}
    >
      <div className="vocab-card__content">
        <div className="vocab-card__japanese">
          {reading && (
            <Typography variant="16-regular" className="vocab-card__reading">
              {reading}
            </Typography>
          )}
          {kanji && (
            <Typography variant="32-medium" className="vocab-card__kanji">
              {kanji}
            </Typography>
          )}
        </div>
        {translation && (
          <Typography variant="20-regular" className="vocab-card__translation">
            {translation}
          </Typography>
        )}
      </div>

      <button
        type="button"
        className="vocab-card__play-btn"
        onClick={handlePlayClick}
        aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
      >
        {isPlaying ? (
          <Pause size={60} bgColor="#1C1B1B" iconColor="#F8F8F8" />
        ) : (
          <span className="vocab-card__play-icon">
            <Play1 size={20} color="currentColor" strokeColor="currentColor" />
          </span>
        )}
      </button>
    </div>
  );
}
