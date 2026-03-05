'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';
import Typography from '../atoms/Typography';
import Play1 from '../atoms/icons/play1';
import Pause from '../atoms/icons/pause';

function getTtsAudioUrl(text) {
  const q = encodeURIComponent(text);
  return `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${q}`;
}

export default function VocabCard({
  reading,
  kanji,
  translation,
  className,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const getTextToSpeak = () => {
    const text = (kanji || reading || '').trim();
    return text || null;
  };

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch (_) {}
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        try {
          audioRef.current.pause();
        } catch (_) {}
        audioRef.current = null;
      }
    };
  }, []);

  const speakWithFallback = useCallback((textToSpeak) => {
    if (typeof window === 'undefined') return;

    const synth = window.speechSynthesis;
    const hasVoices = synth && synth.getVoices().length > 0;

    if (hasVoices) {
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      const voices = synth.getVoices();
      const ja = voices.find((v) => v.lang === 'ja-JP' || v.lang.startsWith('ja'));
      if (ja) utterance.voice = ja;
      else if (voices[0]) utterance.voice = voices[0];
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      synth.speak(utterance);
      setIsPlaying(true);
      return;
    }

    const url = getTtsAudioUrl(textToSpeak);
    const audio = new Audio(url);
    audioRef.current = audio;
    setIsPlaying(true);
    audio.onended = () => {
      audioRef.current = null;
      setIsPlaying(false);
    };
    audio.onerror = () => {
      audioRef.current = null;
      setIsPlaying(false);
    };
    audio.play().catch(() => {
      audioRef.current = null;
      setIsPlaying(false);
    });
  }, []);

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const textToSpeak = getTextToSpeak();
    if (!textToSpeak) return;

    if (isPlaying) {
      stopSpeech();
      return;
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const synth = window.speechSynthesis;
      if (synth.getVoices().length > 0) {
        speakWithFallback(textToSpeak);
        return;
      }
      const once = () => {
        synth.removeEventListener('voiceschanged', once);
        speakWithFallback(textToSpeak);
      };
      synth.addEventListener('voiceschanged', once);
      synth.getVoices();
      setTimeout(() => {
        synth.removeEventListener('voiceschanged', once);
        if (!isPlaying && textToSpeak) speakWithFallback(textToSpeak);
      }, 350);
    } else {
      speakWithFallback(textToSpeak);
    }
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
        aria-label={isPlaying ? 'Остановить озвучку' : 'Озвучить слово'}
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
