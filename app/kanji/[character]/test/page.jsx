'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Container,
  Typography,
  Button,
  TestQuestion,
  TestChoiceInput,
  KanjiCard,
  Footer,
} from '../../../components';
import KanjiStrokeField from '../../../components/molecules/KanjiStrokeField';

const KAI_CONFUSED = '/images/kai/kai-confused.png';

const KANJI_TESTS = {
  '日': {
    title: 'Тест по кандзи 日',
    questions: [
      {
        id: 1,
        type: 'choice',
        title: 'Какое базовое значение имеет кандзи 日?',
        prompt: 'Выбери значение, которое лучше всего передаёт смысл этого иероглифа.',
        choices: [
          'День, солнце; счётчик для дней',
          'Вода, река; счётчик для стаканов',
          'Луна, ночь; счётчик для месяцев',
          'Огонь, пламя; счётчик для очагов',
        ],
        correctChoiceIndex: 0,
      },
      {
        id: 2,
        type: 'choice',
        title: 'Выбери правильное Onyomi‑чтение кандзи 日.',
        prompt: 'Onyomi — китайские чтения, которые чаще встречаются в сложных словах.',
        choices: ['にち、じつ', 'ひ、-び、-か', 'つき、げつ', 'こく、おに'],
        correctChoiceIndex: 0,
      },
      {
        id: 3,
        type: 'choice',
        title: 'Выбери правильное Kunyomi‑чтение кандзи 日.',
        prompt: 'Kunyomi — японские чтения, которые чаще используются в одиночных кандзи и глаголах.',
        choices: ['にち', 'つき', 'ひ', 'か'],
        correctChoiceIndex: 2,
      },
      {
        id: 4,
        type: 'choice',
        title: 'Как переводится слово 毎日?',
        prompt: 'Подумай, какие значения кандзи 毎 и 日 ты уже знаешь.',
        example: {
          jp: '毎日、日本語を勉強します。',
          ru: 'Я учу японский каждый день.',
        },
        choices: ['каждый день', 'выходной день', 'весь день напролёт', 'вчера'],
        correctChoiceIndex: 0,
      },
      {
        id: 5,
        type: 'choice',
        title: 'Как правильно читается слово 日本?',
        prompt: 'Это одно из самых частотных слов с кандзи 日.',
        choices: ['にほん', 'にちにち', 'ひもと', 'ひのけ'],
        correctChoiceIndex: 0,
      },
      {
        id: 6,
        type: 'choice',
        title: 'В каком слове кандзи 日 читается как び?',
        prompt: 'Обрати внимание на сочетания с другими кандзи и суффиксами.',
        choices: ['記念日', '毎日', '日本人', '日曜日'],
        correctChoiceIndex: 0,
      },
      {
        id: 7,
        type: 'drawing',
        title: 'Нарисуй кандзи 日 по порядку черт.',
        prompt:
          'Веди линии поверх серого иероглифа. Важно как расположение, так и порядок черт.',
      },
    ],
  },
  '一': {
    title: 'Тест по кандзи 一',
    questions: [
      { id: 1, type: 'choice', title: 'Какое значение имеет кандзи 一?', prompt: 'Выбери основное значение.', choices: ['Один; единица', 'Два; второй', 'Десять', 'Сто'], correctChoiceIndex: 0 },
      { id: 2, type: 'choice', title: 'Выбери правильное Onyomi‑чтение кандзи 一.', prompt: 'Onyomi — китайское чтение.', choices: ['いち、いつ', 'ひと', 'に', 'じゅう'], correctChoiceIndex: 0 },
      { id: 3, type: 'choice', title: 'Выбери правильное Kunyomi‑чтение кандзи 一.', prompt: 'Kunyomi — японское чтение в счётчиках.', choices: ['いち', 'ひと(つ)', 'に', 'さん'], correctChoiceIndex: 1 },
      { id: 4, type: 'choice', title: 'Как переводится слово 一番?', prompt: 'Частое слово с 一.', choices: ['номер один, самый', 'один раз', 'один человек', 'первый этаж'], correctChoiceIndex: 0 },
      { id: 5, type: 'choice', title: 'Как читается слово 一緒?', prompt: 'Важное слово для «вместе».', choices: ['いっしょ', 'ひとり', 'いちにち', 'いちがつ'], correctChoiceIndex: 0 },
      { id: 6, type: 'choice', title: 'В каком слове 一 читается как いっ?', prompt: 'Обрати внимание на озвончение.', choices: ['一緒', '一月', '一人', '一年'], correctChoiceIndex: 0 },
      { id: 7, type: 'drawing', title: 'Нарисуй кандзи 一 по порядку черт.', prompt: 'Веди линии поверх серого иероглифа.' },
    ],
  },
  '国': {
    title: 'Тест по кандзи 国',
    questions: [
      { id: 1, type: 'choice', title: 'Какое значение имеет кандзи 国?', prompt: 'Выбери основное значение.', choices: ['Страна, государство', 'Город', 'Деревня', 'Мир'], correctChoiceIndex: 0 },
      { id: 2, type: 'choice', title: 'Выбери правильное Onyomi‑чтение кандзи 国.', prompt: 'Onyomi — китайское чтение.', choices: ['こく', 'くに', 'にほん', 'がい'], correctChoiceIndex: 0 },
      { id: 3, type: 'choice', title: 'Выбери правильное Kunyomi‑чтение кандзи 国.', prompt: 'Kunyomi — японское чтение.', choices: ['こく', 'くに', 'ごく', 'こっ'], correctChoiceIndex: 1 },
      { id: 4, type: 'choice', title: 'Как переводится слово 外国?', prompt: 'Слово с 国.', choices: ['заграница', 'своя страна', 'Китай', 'Япония'], correctChoiceIndex: 0 },
      { id: 5, type: 'choice', title: 'Как читается слово 中国?', prompt: 'Название страны.', choices: ['ちゅうごく', 'にほんこく', 'がいこく', 'こくご'], correctChoiceIndex: 0 },
      { id: 6, type: 'choice', title: 'Что значит 国語?', prompt: 'Составное слово с 国.', choices: ['родной язык', 'иностранный язык', 'страна', 'международный'], correctChoiceIndex: 0 },
      { id: 7, type: 'drawing', title: 'Нарисуй кандзи 国 по порядку черт.', prompt: 'Веди линии поверх серого иероглифа.' },
    ],
  },
  '人': {
    title: 'Тест по кандзи 人',
    questions: [
      { id: 1, type: 'choice', title: 'Какое значение имеет кандзи 人?', prompt: 'Выбери основное значение.', choices: ['Человек, люди', 'Ребёнок', 'Взрослый', 'Друг'], correctChoiceIndex: 0 },
      { id: 2, type: 'choice', title: 'Выбери правильное Onyomi‑чтение кандзи 人.', prompt: 'Onyomi — китайское чтение.', choices: ['じん、にん', 'ひと', 'にんげん', 'じんるい'], correctChoiceIndex: 0 },
      { id: 3, type: 'choice', title: 'Выбери правильное Kunyomi‑чтение кандзи 人.', prompt: 'Kunyomi — японское чтение.', choices: ['じん', 'ひと', 'にん', 'ひとり'], correctChoiceIndex: 1 },
      { id: 4, type: 'choice', title: 'Как переводится 日本人?', prompt: 'Частое слово.', choices: ['японец', 'иностранец', 'человек', 'взрослый'], correctChoiceIndex: 0 },
      { id: 5, type: 'choice', title: 'Как читается слово 大人?', prompt: 'Особое чтение.', choices: ['おとな', 'だいじん', 'おおひと', 'たいじん'], correctChoiceIndex: 0 },
      { id: 6, type: 'choice', title: 'Как читается 一人?', prompt: 'Счёт «один человек».', choices: ['ひとり', 'いちにん', 'ひと', 'いちじん'], correctChoiceIndex: 0 },
      { id: 7, type: 'drawing', title: 'Нарисуй кандзи 人 по порядку черт.', prompt: 'Веди линии поверх серого иероглифа.' },
    ],
  },
  '年': {
    title: 'Тест по кандзи 年',
    questions: [
      { id: 1, type: 'choice', title: 'Какое значение имеет кандзи 年?', prompt: 'Выбери основное значение.', choices: ['Год; возраст', 'День', 'Месяц', 'Неделя'], correctChoiceIndex: 0 },
      { id: 2, type: 'choice', title: 'Выбери правильное Onyomi‑чтение кандзи 年.', prompt: 'Onyomi — китайское чтение.', choices: ['ねん', 'とし', 'きねん', 'まい'], correctChoiceIndex: 0 },
      { id: 3, type: 'choice', title: 'Выбери правильное Kunyomi‑чтение кандзи 年.', prompt: 'Kunyomi — японское чтение.', choices: ['ねん', 'とし', 'ねんかん', 'ことし'], correctChoiceIndex: 1 },
      { id: 4, type: 'choice', title: 'Как переводится 今年?', prompt: 'Частое слово с 年.', choices: ['этот год', 'прошлый год', 'следующий год', 'каждый год'], correctChoiceIndex: 0 },
      { id: 5, type: 'choice', title: 'Как читается 一年?', prompt: '«Один год».', choices: ['いちねん', 'ひととし', 'いちとし', 'ねんいち'], correctChoiceIndex: 0 },
      { id: 6, type: 'choice', title: 'Что значит 新年?', prompt: 'Праздничное слово.', choices: ['Новый год', 'прошлый год', 'конец года', 'день рождения'], correctChoiceIndex: 0 },
      { id: 7, type: 'drawing', title: 'Нарисуй кандзи 年 по порядку черт.', prompt: 'Веди линии поверх серого иероглифа.' },
    ],
  },
  '大': {
    title: 'Тест по кандзи 大',
    questions: [
      { id: 1, type: 'choice', title: 'Какое значение имеет кандзи 大?', prompt: 'Выбери основное значение.', choices: ['Большой, огромный', 'Маленький', 'Средний', 'Высокий'], correctChoiceIndex: 0 },
      { id: 2, type: 'choice', title: 'Выбери правильное Onyomi‑чтение кандзи 大.', prompt: 'Onyomi — китайское чтение.', choices: ['だい、たい', 'おお', 'たい', 'だ'], correctChoiceIndex: 0 },
      { id: 3, type: 'choice', title: 'Выбери правильное Kunyomi‑чтение кандзи 大.', prompt: 'Kunyomi — японское чтение.', choices: ['だい', 'おお(きい)', 'たい', 'だ'], correctChoiceIndex: 1 },
      { id: 4, type: 'choice', title: 'Как переводится 大学?', prompt: 'Частое слово с 大.', choices: ['университет', 'большая школа', 'большой дом', 'огромный'], correctChoiceIndex: 0 },
      { id: 5, type: 'choice', title: 'Как читается 大好き?', prompt: '«Очень нравится».', choices: ['だいすき', 'おおすき', 'たいすき', 'だすき'], correctChoiceIndex: 0 },
      { id: 6, type: 'choice', title: 'Как читается 大人?', prompt: 'Особое чтение.', choices: ['おとな', 'だいじん', 'おおひと', 'たいじん'], correctChoiceIndex: 0 },
      { id: 7, type: 'drawing', title: 'Нарисуй кандзи 大 по порядку черт.', prompt: 'Веди линии поверх серого иероглифа.' },
    ],
  },
  '十': {
    title: 'Тест по кандзи 十',
    questions: [
      { id: 1, type: 'choice', title: 'Какое значение имеет кандзи 十?', prompt: 'Выбери основное значение.', choices: ['Десять', 'Один', 'Сто', 'Тысяча'], correctChoiceIndex: 0 },
      { id: 2, type: 'choice', title: 'Выбери правильное Onyomi‑чтение кандзи 十.', prompt: 'Onyomi — китайское чтение.', choices: ['じゅう、じっ', 'とお', 'じゅ', 'じっ'], correctChoiceIndex: 0 },
      { id: 3, type: 'choice', title: 'Выбери правильное Kunyomi‑чтение кандзи 十.', prompt: 'Kunyomi — японское чтение.', choices: ['じゅう', 'とお', 'じっ', 'てん'], correctChoiceIndex: 1 },
      { id: 4, type: 'choice', title: 'Как переводится 十月?', prompt: 'Название месяца.', choices: ['октябрь', 'десять месяцев', 'десятый', 'десять'], correctChoiceIndex: 0 },
      { id: 5, type: 'choice', title: 'Как читается 十分?', prompt: '«Десять минут».', choices: ['じゅっぷん', 'とおふん', 'じゅうふん', 'じっぷん'], correctChoiceIndex: 0 },
      { id: 6, type: 'choice', title: 'Как читается 二十?', prompt: 'Число «двадцать».', choices: ['にじゅう', 'じゅうに', 'ふたじゅう', 'はたち'], correctChoiceIndex: 0 },
      { id: 7, type: 'drawing', title: 'Нарисуй кандзи 十 по порядку черт.', prompt: 'Веди линии поверх серого иероглифа.' },
    ],
  },
  '二': {
    title: 'Тест по кандзи 二',
    questions: [
      { id: 1, type: 'choice', title: 'Какое значение имеет кандзи 二?', prompt: 'Выбери основное значение.', choices: ['Два; второй', 'Один', 'Три', 'Десять'], correctChoiceIndex: 0 },
      { id: 2, type: 'choice', title: 'Выбери правильное Onyomi‑чтение кандзи 二.', prompt: 'Onyomi — китайское чтение.', choices: ['に、じ', 'ふた', 'にい', 'じい'], correctChoiceIndex: 0 },
      { id: 3, type: 'choice', title: 'Выбери правильное Kunyomi‑чтение кандзи 二.', prompt: 'Kunyomi — японское чтение.', choices: ['に', 'ふた(つ)', 'じ', 'にい'], correctChoiceIndex: 1 },
      { id: 4, type: 'choice', title: 'Как переводится 二月?', prompt: 'Название месяца.', choices: ['февраль', 'второй месяц', 'два месяца', 'второй'], correctChoiceIndex: 0 },
      { id: 5, type: 'choice', title: 'Как читается 二人?', prompt: '«Двое» (людей).', choices: ['ふたり', 'ににん', 'にじん', 'ふたたり'], correctChoiceIndex: 0 },
      { id: 6, type: 'choice', title: 'Как читается 二日?', prompt: '«Второе число» или «два дня».', choices: ['ふつか', 'ににち', 'にちに', 'ふたか'], correctChoiceIndex: 0 },
      { id: 7, type: 'drawing', title: 'Нарисуй кандзи 二 по порядку черт.', prompt: 'Веди линии поверх серого иероглифа.' },
    ],
  },
  '本': {
    title: 'Тест по кандзи 本',
    questions: [
      { id: 1, type: 'choice', title: 'Какое значение имеет кандзи 本?', prompt: 'Выбери основное значение.', choices: ['Книга; корень; настоящее', 'Страница', 'Дерево', 'Дом'], correctChoiceIndex: 0 },
      { id: 2, type: 'choice', title: 'Выбери правильное Onyomi‑чтение кандзи 本.', prompt: 'Onyomi — китайское чтение.', choices: ['ほん', 'もと', 'ほ', 'ぼん'], correctChoiceIndex: 0 },
      { id: 3, type: 'choice', title: 'Выбери правильное Kunyomi‑чтение кандзи 本.', prompt: 'Kunyomi — японское чтение.', choices: ['ほん', 'もと', 'ほ', 'き'], correctChoiceIndex: 1 },
      { id: 4, type: 'choice', title: 'Как переводится 日本?', prompt: 'Название страны.', choices: ['Япония', 'книга', 'основа', 'японский'], correctChoiceIndex: 0 },
      { id: 5, type: 'choice', title: 'Как читается 本屋?', prompt: '«Книжный магазин».', choices: ['ほんや', 'もとや', 'ほんおく', 'ほや'], correctChoiceIndex: 0 },
      { id: 6, type: 'choice', title: 'Что значит 本当?', prompt: 'Частое слово.', choices: ['правда, настоящий', 'книга', 'основа', 'сегодня'], correctChoiceIndex: 0 },
      { id: 7, type: 'drawing', title: 'Нарисуй кандзи 本 по порядку черт.', prompt: 'Веди линии поверх серого иероглифа.' },
    ],
  },
  '中': {
    title: 'Тест по кандзи 中',
    questions: [
      { id: 1, type: 'choice', title: 'Какое значение имеет кандзи 中?', prompt: 'Выбери основное значение.', choices: ['Внутри, центр; середина', 'Снаружи', 'Верх', 'Низ'], correctChoiceIndex: 0 },
      { id: 2, type: 'choice', title: 'Выбери правильное Onyomi‑чтение кандзи 中.', prompt: 'Onyomi — китайское чтение.', choices: ['ちゅう', 'なか', 'じゅう', 'うち'], correctChoiceIndex: 0 },
      { id: 3, type: 'choice', title: 'Выбери правильное Kunyomi‑чтение кандзи 中.', prompt: 'Kunyomi — японское чтение.', choices: ['ちゅう', 'なか', 'じゅう', 'あいだ'], correctChoiceIndex: 1 },
      { id: 4, type: 'choice', title: 'Как переводится 中国?', prompt: 'Название страны.', choices: ['Китай', 'середина', 'внутри', 'центр'], correctChoiceIndex: 0 },
      { id: 5, type: 'choice', title: 'Что значит 勉強中?', prompt: 'Состав с 中.', choices: ['в процессе учёбы', 'середина учёбы', 'конец учёбы', 'начало учёбы'], correctChoiceIndex: 0 },
      { id: 6, type: 'choice', title: 'Как читается 一日中?', prompt: '«Целый день».', choices: ['いちにちじゅう', 'いちにちなか', 'ついたちちゅう', 'ひとひちゅう'], correctChoiceIndex: 0 },
      { id: 7, type: 'drawing', title: 'Нарисуй кандзи 中 по порядку черт.', prompt: 'Веди линии поверх серого иероглифа.' },
    ],
  },
  '長': {
    title: 'Тест по кандзи 長',
    questions: [
      { id: 1, type: 'choice', title: 'Какое значение имеет кандзи 長?', prompt: 'Выбери основное значение.', choices: ['Длинный; лидер; глава', 'Короткий', 'Высокий', 'Широкий'], correctChoiceIndex: 0 },
      { id: 2, type: 'choice', title: 'Выбери правильное Onyomi‑чтение кандзи 長.', prompt: 'Onyomi — китайское чтение.', choices: ['ちょう', 'なが', 'ちょ', 'じょう'], correctChoiceIndex: 0 },
      { id: 3, type: 'choice', title: 'Выбери правильное Kunyomi‑чтение кандзи 長.', prompt: 'Kunyomi — японское чтение.', choices: ['ちょう', 'なが(い)', 'ちょ', 'おさ'], correctChoiceIndex: 1 },
      { id: 4, type: 'choice', title: 'Как переводится 社長?', prompt: 'Частое слово с 長.', choices: ['директор компании', 'длинная компания', 'глава общества', 'большой начальник'], correctChoiceIndex: 0 },
      { id: 5, type: 'choice', title: 'Как читается 長い?', prompt: 'Прилагательное «длинный».', choices: ['ながい', 'ちょうい', 'おおきい', 'みじかい'], correctChoiceIndex: 0 },
      { id: 6, type: 'choice', title: 'Что значит 成長?', prompt: 'Состав с 長.', choices: ['рост, развитие', 'длинный', 'глава', 'взрослый'], correctChoiceIndex: 0 },
      { id: 7, type: 'drawing', title: 'Нарисуй кандзи 長 по порядку черт.', prompt: 'Веди линии поверх серого иероглифа.' },
    ],
  },
  '出': {
    title: 'Тест по кандзи 出',
    questions: [
      { id: 1, type: 'choice', title: 'Какое значение имеет кандзи 出?', prompt: 'Выбери основное значение.', choices: ['Выходить; покидать; выезжать', 'Входить', 'Сидеть', 'Стоять'], correctChoiceIndex: 0 },
      { id: 2, type: 'choice', title: 'Выбери правильное Onyomi‑чтение кандзи 出.', prompt: 'Onyomi — китайское чтение.', choices: ['しゅつ、すい', 'で', 'だ', 'しゅっ'], correctChoiceIndex: 0 },
      { id: 3, type: 'choice', title: 'Выбери правильное Kunyomi‑чтение кандзи 出.', prompt: 'Kunyomi — японское чтение в глаголах.', choices: ['しゅつ', 'で(る)、だ(す)', 'しゅっ', 'でん'], correctChoiceIndex: 1 },
      { id: 4, type: 'choice', title: 'Как переводится 出口?', prompt: 'Частое слово с 出.', choices: ['выход', 'вход', 'выезд', 'отправление'], correctChoiceIndex: 0 },
      { id: 5, type: 'choice', title: 'Как читается 出発?', prompt: '«Отправление» (поезда и т.д.).', choices: ['しゅっぱつ', 'でばつ', 'だしはつ', 'しゅつぱつ'], correctChoiceIndex: 0 },
      { id: 6, type: 'choice', title: 'Что значит 出張?', prompt: 'Состав с 出.', choices: ['командировка', 'выход', 'отправка', 'присутствие'], correctChoiceIndex: 0 },
      { id: 7, type: 'drawing', title: 'Нарисуй кандзи 出 по порядку черт.', prompt: 'Веди линии поверх серого иероглифа.' },
    ],
  },
};

export default function KanjiTestPage() {
  const params = useParams();
  const character = decodeURIComponent(params?.character || '');
  const testConfig = KANJI_TESTS[character];

  if (!testConfig) {
    return (
      <div className="kanji-test-page">
        <Container>
          <div className="kanji-test-page__not-found">
            <Typography variant="24-medium">
              Для этого кандзи тест пока не готов.
            </Typography>
          </div>
        </Container>
      </div>
    );
  }

  const totalQuestions = testConfig.questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState(
    () => testConfig.questions.map(() => null)
  );
  const [drawingResult, setDrawingResult] = useState(null);
  const [mode, setMode] = useState('questions');

  const currentQuestion = testConfig.questions[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleChoiceSelect = (choiceIndex) => {
    setSelectedChoices((prev) => {
      const next = [...prev];
      next[currentIndex] = choiceIndex;
      return next;
    });
  };

  const handleDrawingComplete = (isCorrect) => {
    setDrawingResult(isCorrect ? 'correct' : 'wrong');
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedChoices(testConfig.questions.map(() => null));
    setDrawingResult(null);
    setMode('questions');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleViewAnswers = () => {
    setCurrentIndex(0);
    setMode('review');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const computeScore = () => {
    let score = 0;
    testConfig.questions.forEach((q, index) => {
      if (q.type === 'drawing') {
        if (drawingResult === 'correct') score += 1;
        return;
      }
      const answer = selectedChoices[index];
      if (answer === q.correctChoiceIndex) {
        score += 1;
      }
    });
    return score;
  };

  const isReview = mode === 'review';
  const canGoNext =
    isReview ||
    (mode === 'questions' &&
      ((currentQuestion.type === 'drawing' && !!drawingResult) ||
        (currentQuestion.type !== 'drawing' &&
          selectedChoices[currentIndex] !== null)));

  const handleNext = () => {
    if (!canGoNext && !isReview) return;
    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setMode('result');
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const score = mode === 'result' ? computeScore() : null;

  const getResultText = (correctTotal, total) => {
    const ratio = total > 0 ? correctTotal / total : 0;
    if (ratio === 1) {
      return {
        main: 'Идеально! Ты ответил на все вопросы верно — этот кандзи ты знаешь на отлично. Так держать!',
        tip: 'Закрепи результат: попробуй написать несколько слов с этим иероглифом по памяти или пройди тест ещё раз через пару дней.',
      };
    }
    if (ratio >= 0.86) {
      return {
        main: 'Отличный результат! Ты уверенно знаешь этот кандзи. Пару мелочей можно повторить — и будет полный балл.',
        tip: 'Посмотри в карточке кандзи раздел «Особые чтения»: там часто прячутся коварные исключения.',
      };
    }
    if (ratio >= 0.57) {
      return {
        main: 'Хороший старт! Больше половины ответов верные. Основу ты уловил — осталось подтянуть чтения и примеры.',
        tip: 'Попробуй не просто прописывать кандзи, а нарисовать рядом маленькую картинку-ассоциацию. Так он запомнится быстрее!',
      };
    }
    if (ratio >= 0.29) {
      return {
        main: 'Есть над чем поработать. Часть ответов верная — значит, база уже есть. Повтори карточку кандзи и пройди тест снова.',
        tip: 'Удели время блокам Onyomi и Kunyomi на странице кандзи: от них проще всего поднять результат.',
      };
    }
    return {
      main: 'Пока сложновато. Не переживай — кандзи учат постепенно. Открой карточку этого иероглифа, спокойно прочитай значения и примеры, потом попробуй тест ещё раз.',
      tip: 'Сначала запомни одно значение и одно-два частых слова (например, 日本 для 日). Так проще связать иероглиф с живым языком.',
    };
  };

  const getChoiceState = (question, index) => {
    const selectedIndex = selectedChoices[currentIndex];
    const correctIndex = question.correctChoiceIndex;
    if (index === correctIndex) {
      return selectedIndex === index ? 'selectedCorrect' : 'unselectedCorrect';
    }
    if (selectedIndex === index) return 'selectedWrong';
    return 'default';
  };

  const renderChoices = (question) => {
    const selectedIndex = selectedChoices[currentIndex];
    const showResults = isReview;
    return (
      <div className="kanji-test-page__choices">
        {question.choices.map((choice, index) => {
          const state = showResults ? getChoiceState(question, index) : (selectedIndex === index ? 'selected' : 'default');
          return (
            <TestChoiceInput
              key={index}
              state={state}
              onClick={() => !showResults && handleChoiceSelect(index)}
              disabled={showResults}
            >
              {choice}
            </TestChoiceInput>
          );
        })}
      </div>
    );
  };

  const renderQuestionContent = () => {
    if (mode === 'result') {
      const correctTotal = score ?? 0;
      const resultText = getResultText(correctTotal, totalQuestions);
      return (
        <div className="kanji-test-page__result">
          <div className="kanji-test-page__result-content">
            <div className="kanji-test-page__result-title-bar">
              <p className="kanji-test-page__result-title-text">
                результат — {correctTotal} из {totalQuestions}
              </p>
            </div>
            <div className="kanji-test-page__result-descr">
              <div className="kanji-test-page__result-kai">
                <Image
                  src={KAI_CONFUSED}
                  alt=""
                  width={332}
                  height={332}
                  className="kanji-test-page__result-kai-img"
                  unoptimized
                />
              </div>
              <div className="kanji-test-page__result-text">
                <p className="kanji-test-page__result-text-main">
                  {resultText.main}
                </p>
                <p className="kanji-test-page__result-text-tip">
                  {resultText.tip}
                </p>
              </div>
            </div>
            <div className="kanji-test-page__result-actions">
              <Button
                variant="secondary"
                size="big"
                onClick={() => {}}
                className="kanji-test-page__result-btn"
              >
                Поделиться результатом
              </Button>
              <Button
                variant="secondary"
                size="big"
                onClick={handleViewAnswers}
                className="kanji-test-page__result-btn kanji-test-page__result-btn--flex"
              >
                Смотреть ответы
              </Button>
              <Button
                variant="main"
                size="big"
                href="/"
                className="kanji-test-page__result-btn kanji-test-page__result-btn--flex"
              >
                На главную
              </Button>
            </div>

            <div className="kanji-test-page__result-other-title-bar">
              <p className="kanji-test-page__result-other-title-text">Другие кандзи</p>
            </div>
            <div className="kanji-test-page__result-other-grid">
              {[
                { kanji: '一', meaning: 'Один', reading: 'ichi, hito(tsu)' },
                { kanji: '国', meaning: 'Страна', reading: 'koku, kuni' },
                { kanji: '人', meaning: 'Человек', reading: 'jin, hito' },
                { kanji: '年', meaning: 'Год', reading: 'nen, toshi' },
              ].map((item) => (
                <Link
                  key={item.kanji}
                  href={`/kanji/${encodeURIComponent(item.kanji)}`}
                  className="kanji-test-page__result-other-link"
                >
                  <KanjiCard
                    kanji={item.kanji}
                    meaning={item.meaning}
                    reading={item.reading}
                    buttonText="Учить"
                    className="kanji-test-page__result-other-card"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="kanji-test-page__result-footer">
            <Footer />
          </div>
        </div>
      );
    }

    if (currentQuestion.type === 'drawing') {
      return (
        <div className="kanji-test-page__drawing">
          <div className="kanji-test-page__choice-layout">
            <div className="kanji-test-page__choice-left">
              <TestQuestion
                questionNumber={currentIndex + 1}
                totalQuestions={totalQuestions}
                title={currentQuestion.title}
              />
            </div>
            <div className="kanji-test-page__choice-right">
              {isReview && drawingResult != null && (
                <p className="kanji-test-page__drawing-review-result">
                  {drawingResult === 'correct' ? 'Правильно' : 'Неправильно'}
                </p>
              )}
              {!isReview && (
                <KanjiStrokeField kanji={character} onComplete={handleDrawingComplete} />
              )}
              {isReview && (
                <div className="kanji-test-page__drawing-review-placeholder" aria-hidden />
              )}
              <Button
              variant="main"
              size="big"
              onClick={handleNext}
              disabled={!canGoNext}
              className="kanji-test-page__next-btn"
            >
              {isLastQuestion ? (isReview ? 'К результату' : 'Показать результат') : 'Далее'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="kanji-test-page__choice">
        <div className="kanji-test-page__choice-layout">
          <div className="kanji-test-page__choice-left">
            <TestQuestion
              questionNumber={currentIndex + 1}
              totalQuestions={totalQuestions}
              title={currentQuestion.title}
            />
          </div>
          <div className="kanji-test-page__choice-right">
            {renderChoices(currentQuestion)}
            <Button
              variant="main"
              size="big"
              onClick={handleNext}
              disabled={!canGoNext}
              className="kanji-test-page__next-btn"
            >
              {isLastQuestion ? (isReview ? 'К результату' : 'Показать результат') : 'Далее'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const progressCounterText =
    mode === 'result' ? 'Тест завершён' : `${currentIndex + 1}/${totalQuestions}`;
  const filledSegments = mode === 'result' ? totalQuestions : currentIndex + 1;
  const showProgress = mode !== 'result';

  return (
    <div className={`kanji-test-page${mode === 'result' ? ' kanji-test-page--result' : ''}`}>
      <div className="kanji-test-page__center">
        <div className="kanji-test-page__spacer" aria-hidden />
        <div className="kanji-test-page__content">
          <div className="kanji-test-page__body">
            {renderQuestionContent()}
          </div>
        </div>
        <div className="kanji-test-page__spacer" aria-hidden />
      </div>

      {showProgress && (
      <div className="kanji-test-progress">
        <div className="kanji-test-progress__inner">
            <div className="kanji-test-progress__counter-box">
              <p className="kanji-test-progress__counter">{progressCounterText}</p>
            </div>
            <div className="kanji-test-progress__segments">
              {Array.from({ length: totalQuestions }, (_, i) => (
                <div
                  key={i}
                  className={`kanji-test-progress__segment ${i < filledSegments ? 'kanji-test-progress__segment--filled' : ''}`}
                  aria-hidden
                />
              ))}
            </div>
          </div>
      </div>
      )}
    </div>
  );
}

