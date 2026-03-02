'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';

/**
 * Данные о чертах кандзи (нормализованные координаты 0-100).
 * Порядок соответствует правильному порядку черт по японским правилам.
 * Каждая черта — массив точек [x, y].
 */
const KANJI_STROKES = {
  日: [
    [[20, 25], [20, 85]],           // 1: левая вертикаль
    [[10, 20], [90, 20], [90, 85]], // 2: верхняя горизонталь + правая вертикаль (одна черта)
    [[25, 45], [85, 45]],           // 3: первая средняя горизонталь
    [[25, 65], [85, 65]],           // 4: вторая средняя горизонталь
  ],
  水: [
    [[50, 10], [50, 40]],
    [[25, 45], [75, 45]],
    [[20, 55], [20, 95]],
    [[80, 55], [80, 95]],
  ],
  人: [
    [[30, 15], [70, 85]],
    [[70, 15], [30, 85]],
  ],
  一: [
    [[10, 50], [90, 50]],
  ],
};

/**
 * Сопоставление нарисованной черты с эталонной.
 * Нормализует координаты по bounding box всех черт — так рисунок
 * в любом месте и размере canvas сопоставляется с эталоном.
 */
function matchStrokeToReference(userStroke, refStrokes, allUserStrokes) {
  if (userStroke.length < 2) return -1;

  const cx = userStroke.reduce((s, p) => s + p[0], 0) / userStroke.length;
  const cy = userStroke.reduce((s, p) => s + p[1], 0) / userStroke.length;

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  allUserStrokes.forEach((stroke) => {
    stroke.forEach(([x, y]) => {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    });
  });
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  const normCx = ((cx - minX) / rangeX) * 100;
  const normCy = ((cy - minY) / rangeY) * 100;

  let bestIdx = -1;
  let bestDist = Infinity;

  refStrokes.forEach((ref, i) => {
    const refCx = ref.reduce((s, p) => s + p[0], 0) / ref.length;
    const refCy = ref.reduce((s, p) => s + p[1], 0) / ref.length;
    const dx = normCx - refCx;
    const dy = normCy - refCy;
    const d = dx * dx + dy * dy;
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  });

  return bestIdx;
}

/**
 * Поле для отработки порядка черт кандзи.
 * Фон — крупное светло-серое кандзи, пользователь рисует поверх.
 */
export default function KanjiStrokeField({
  kanji = '日',
  className,
  onComplete,
}) {
  const canvasRef = useRef(null);
  const innerRef = useRef(null);
  const currentStrokeRef = useRef([]);
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [result, setResult] = useState(null); // 'correct' | 'wrong' | null

  const refStrokes = KANJI_STROKES[kanji] || KANJI_STROKES['日'];
  const expectedCount = refStrokes.length;

  const getPoint = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return [
      (clientX - rect.left) * scaleX,
      (clientY - rect.top) * scaleY,
    ];
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const inner = innerRef.current;
    if (!canvas || !inner) return;

    const rect = inner.getBoundingClientRect();
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const w = Math.floor(rect.width * dpr);
    const h = Math.floor(rect.height * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    const inner = innerRef.current;
    if (!inner) return;
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [resizeCanvas]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const allStrokes = [...strokes];
    if (currentStroke.length > 0) allStrokes.push(currentStroke);

    ctx.strokeStyle = 'var(--color-black, #1C1B1B)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    allStrokes.forEach((stroke) => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0][0], stroke[0][1]);
      stroke.slice(1).forEach((p) => ctx.lineTo(p[0], p[1]));
      ctx.stroke();
    });
  }, [strokes, currentStroke]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  const handleStart = useCallback((e) => {
    e.preventDefault();
    if (result) return;
    const pt = getPoint(e);
    currentStrokeRef.current = [pt];
    setCurrentStroke([pt]);
    setIsDrawing(true);
  }, [getPoint, result]);

  const handleMove = useCallback((e) => {
    e.preventDefault();
    if (!isDrawing || result) return;
    const pt = getPoint(e);
    currentStrokeRef.current = [...currentStrokeRef.current, pt];
    setCurrentStroke([...currentStrokeRef.current]);
  }, [isDrawing, getPoint, result]);

  const handleEnd = useCallback((e) => {
    e.preventDefault();
    if (!isDrawing || result) return;
    setIsDrawing(false);

    const pt = getPoint(e);
    const stroke = [...currentStrokeRef.current, pt];
    currentStrokeRef.current = [];
    setCurrentStroke([]);

    if (stroke.length < 2) return;

    const newStrokes = [...strokes, stroke];
    setStrokes(newStrokes);
    setCurrentStroke([]);

    if (newStrokes.length === expectedCount) {
      const matched = newStrokes.map((s) =>
        matchStrokeToReference(s, refStrokes, newStrokes)
      );
      const used = new Set();
      let correctOrder = true;
      for (let i = 0; i < matched.length; i++) {
        if (matched[i] < 0 || used.has(matched[i])) {
          correctOrder = false;
          break;
        }
        used.add(matched[i]);
        if (matched[i] !== i) correctOrder = false;
      }
      const isCorrect = correctOrder && matched.length === expectedCount;
      setResult(isCorrect ? 'correct' : 'wrong');
      onComplete?.(isCorrect);
    }
  }, [isDrawing, strokes, result, getPoint, expectedCount, refStrokes, onComplete]);

  const handleClear = useCallback(() => {
    setStrokes([]);
    setCurrentStroke([]);
    setResult(null);
  }, []);

  const handlePointerDown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    handleStart(e);
  };

  const handlePointerMove = (e) => {
    if (isDrawing) handleMove(e);
  };

  const handlePointerUp = (e) => {
    handleEnd(e);
  };

  const handlePointerLeave = (e) => {
    if (isDrawing) handleEnd(e);
  };

  return (
    <div
      className={clsx('kanji-stroke-field', className)}
      style={{ width: '100%', maxWidth: 877, minHeight: 352 }}
    >
      <div ref={innerRef} className="kanji-stroke-field__inner">
        <span className="kanji-stroke-field__counter">
          {strokes.length} / {expectedCount} черт
        </span>
        <button
          type="button"
          className="kanji-stroke-field__clear"
          onClick={handleClear}
        >
          Очистить
        </button>
        <div className="kanji-stroke-field__hint" aria-hidden="true">
          {kanji}
        </div>
        <canvas
          ref={canvasRef}
          className="kanji-stroke-field__canvas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'none' }}
        />
        {result && (
          <span
            className={clsx(
              'kanji-stroke-field__result',
              result === 'correct' && 'kanji-stroke-field__result--correct',
              result === 'wrong' && 'kanji-stroke-field__result--wrong'
            )}
          >
            {result === 'correct' ? 'Правильно!' : 'Попробуй ещё раз'}
          </span>
        )}
      </div>
    </div>
  );
}
