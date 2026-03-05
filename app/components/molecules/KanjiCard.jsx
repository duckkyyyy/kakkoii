'use client';

import clsx from 'clsx';
import Typography from '../atoms/Typography';

export default function KanjiCard({
  kanji,
  meaning,
  reading,
  buttonText = 'Учить',
  className,
}) {
  return (
    <div className={clsx('kanji-card', className)}>
      <div className="kanji-card__kanji">{kanji}</div>
      <div className="kanji-card__info">
        <Typography variant="28-semi" className="kanji-card__meaning">
          {meaning}
        </Typography>
        {reading && (
          <Typography variant="24-medium" className="kanji-card__reading">
            {reading}
          </Typography>
        )}
      </div>
      <div className="kanji-card__button">{buttonText}</div>
    </div>
  );
}
