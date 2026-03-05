'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container, Typography, ArrowUp, Question } from '../../components';

const KANJI_DETAIL = {
  '日': {
    meaning: 'День, солнце; счетчик для дней',
    onyomi: { jp: 'ニチ、ジツ', romaji: 'nichi, jitsu' },
    kunyomi: { jp: 'ひ、-び、-か', romaji: 'hi, -bi, -ka' },
    onyomiTip: 'Китайское чтение. Используется преимущественно в сложных словах, состоящих из двух и более иероглифов.',
    kunyomiTip: 'Японское чтение. Используется в одиночных иероглифах, глаголах, прилагательных.',
    kunyomiWords: [
      { word: '同日', reading: 'どうじつ', translation: 'тот же день' },
      { word: '前日', reading: 'ぜんじつ', translation: 'предыдущий день' },
      { word: '毎日', reading: 'まいにち', translation: 'каждый день' },
      { word: '翌日', reading: 'よくじつ', translation: 'следующий день' },
      { word: '日時', reading: 'にちじ', translation: 'дата и время' },
      { word: '休日', reading: 'きゅうじつ', translation: 'отпуск' },
      { word: '日曜', reading: 'にちよう', translation: 'воскресенье' },
      { word: '日本', reading: 'にほん', translation: 'Япония' },
      { word: '日本人', reading: 'にほんじん', translation: 'японец' },
      { word: '日本語', reading: 'にほんご', translation: 'японский язык' },
    ],
    onyomiWords: [
      { word: '日', reading: 'ひ', translation: 'день' },
      { word: '記念日', reading: 'きねんび', translation: 'годовщина' },
    ],
    specialReadings: [
      { word: '今日', reading: 'きょう', translation: 'сегодня' },
      { word: '明日', reading: 'あした', translation: 'завтра' },
      { word: '昨日', reading: 'きのう', translation: 'вчера' },
    ],
    sentences: [
      { reading: 'まいにち、にほんごをべんきょうします', jp: '毎日、日本語を勉強します', ru: 'Я учу японский каждый день' },
      { reading: 'あしたあなたはなにをするのですか', jp: '明日あなたは何をするのですか', ru: 'Что ты делаешь завтра?' },
      { reading: 'にほんのなかであなたはどこにいきたいですか', jp: '日本の中であなたはどこに行きたいですか', ru: 'Куда ты хочешь поехать в Японии?' },
      { reading: 'わたしはすうじつかんやすみます', jp: '私は数日間休みます', ru: 'Я возьму отгул на пару дней' },
    ],
  },
  '一': {
    meaning: 'Один; единица',
    onyomi: { jp: 'イチ、イツ', romaji: 'ichi, itsu' },
    kunyomi: { jp: 'ひと(つ)', romaji: 'hito(tsu)' },
    onyomiTip: 'Китайское чтение. Часто в составных числах и словах.',
    kunyomiTip: 'Японское чтение. В счётчиках и как «один».',
    kunyomiWords: [
      { word: '一人', reading: 'ひとり', translation: 'один человек' },
      { word: '一日', reading: 'いちにち', translation: 'один день' },
    ],
    onyomiWords: [
      { word: '一月', reading: 'いちがつ', translation: 'январь' },
      { word: '一年', reading: 'いちねん', translation: 'один год' },
      { word: '一番', reading: 'いちばん', translation: 'номер один, самый' },
      { word: '一生', reading: 'いっしょう', translation: 'вся жизнь' },
      { word: '一緒', reading: 'いっしょ', translation: 'вместе' },
    ],
    specialReadings: [],
    sentences: [
      { reading: 'いちばんすきなえはどれですか', jp: '一番好きな絵はどれですか', ru: 'Какая картина тебе больше всего нравится?' },
      { reading: 'わたしはひとりでにほんにいきました', jp: '私は一人で日本に行きました', ru: 'Я поехал в Японию один' },
    ],
  },
  '国': {
    meaning: 'Страна, государство',
    onyomi: { jp: 'コク', romaji: 'koku' },
    kunyomi: { jp: 'くに', romaji: 'kuni' },
    onyomiTip: 'Китайское чтение. В сложных словах про страны и государство.',
    kunyomiTip: 'Японское чтение. «Страна» как отдельное слово.',
    kunyomiWords: [
      { word: '国', reading: 'くに', translation: 'страна' },
      { word: '外国', reading: 'がいこく', translation: 'заграница' },
    ],
    onyomiWords: [
      { word: '中国', reading: 'ちゅうごく', translation: 'Китай' },
      { word: 'アメリカ', reading: 'アメリカ', translation: 'Америка' },
      { word: '国語', reading: 'こくご', translation: 'родной язык' },
      { word: '国際', reading: 'こくさい', translation: 'международный' },
      { word: '日本国', reading: 'にほんこく', translation: 'государство Япония' },
    ],
    specialReadings: [],
    sentences: [
      { reading: 'くにのりょうりがたべたい', jp: '国の料理が食べたい', ru: 'Хочу попробовать блюда своей страны' },
      { reading: 'ちゅうごくにいったことがあります', jp: '中国に行ったことがあります', ru: 'Я бывал в Китае' },
    ],
  },
  '人': {
    meaning: 'Человек, люди',
    onyomi: { jp: 'ジン、ニン', romaji: 'jin, nin' },
    kunyomi: { jp: 'ひと', romaji: 'hito' },
    onyomiTip: 'Китайское чтение. В словах о людях, национальности, профессиях.',
    kunyomiTip: 'Японское чтение. «Человек» как отдельное слово.',
    kunyomiWords: [
      { word: '人', reading: 'ひと', translation: 'человек' },
      { word: '日本人', reading: 'にほんじん', translation: 'японец' },
      { word: '外国人', reading: 'がいこくじん', translation: 'иностранец' },
    ],
    onyomiWords: [
      { word: '人生', reading: 'じんせい', translation: 'жизнь' },
      { word: '大人', reading: 'おとな', translation: 'взрослый' },
      { word: '一人', reading: 'ひとり', translation: 'один человек' },
      { word: '二人', reading: 'ふたり', translation: 'двое' },
    ],
    specialReadings: [
      { word: '大人', reading: 'おとな', translation: 'взрослый' },
      { word: '一人', reading: 'ひとり', translation: 'один человек' },
    ],
    sentences: [
      { reading: 'あのひとはだれですか', jp: 'あの人は誰ですか', ru: 'Кто тот человек?' },
      { reading: 'にほんじんのともだちがいます', jp: '日本人の友達がいます', ru: 'У меня есть друг-японец' },
    ],
  },
  '年': {
    meaning: 'Год; возраст',
    onyomi: { jp: 'ネン', romaji: 'nen' },
    kunyomi: { jp: 'とし', romaji: 'toshi' },
    onyomiTip: 'Китайское чтение. В датах, возрасте, годах.',
    kunyomiTip: 'Японское чтение. «Год» в разговорной речи.',
    kunyomiWords: [
      { word: '年', reading: 'とし', translation: 'год' },
      { word: '今年', reading: 'ことし', translation: 'этот год' },
      { word: '去年', reading: 'きょねん', translation: 'прошлый год' },
    ],
    onyomiWords: [
      { word: '一年', reading: 'いちねん', translation: 'один год' },
      { word: '毎年', reading: 'まいとし', translation: 'каждый год' },
      { word: '新年', reading: 'しんねん', translation: 'Новый год' },
      { word: '年代', reading: 'ねんだい', translation: 'десятилетие, эпоха' },
      { word: '年間', reading: 'ねんかん', translation: 'в течение года' },
    ],
    specialReadings: [
      { word: '今年', reading: 'ことし', translation: 'этот год' },
      { word: '去年', reading: 'きょねん', translation: 'прошлый год' },
    ],
    sentences: [
      { reading: 'ことしのなつににほんへいきます', jp: '今年の夏に日本へ行きます', ru: 'Этим летом поеду в Японию' },
      { reading: 'なんさいですか — じゅうろくさいです', jp: '何歳ですか — 十六歳です', ru: 'Сколько тебе лет? — Шестнадцать' },
    ],
  },
  '大': {
    meaning: 'Большой, огромный',
    onyomi: { jp: 'ダイ、タイ', romaji: 'dai, tai' },
    kunyomi: { jp: 'おお(きい)', romaji: 'oo(ki)' },
    onyomiTip: 'Китайское чтение. В сложных словах со значением «большой», «великий».',
    kunyomiTip: 'Японское чтение. «Большой» как прилагательное.',
    kunyomiWords: [
      { word: '大きい', reading: 'おおきい', translation: 'большой' },
      { word: '大人', reading: 'おとな', translation: 'взрослый' },
    ],
    onyomiWords: [
      { word: '大学', reading: 'だいがく', translation: 'университет' },
      { word: '大好き', reading: 'だいすき', translation: 'очень нравится' },
      { word: '大丈夫', reading: 'だいじょうぶ', translation: 'всё в порядке' },
      { word: '大会', reading: 'たいかい', translation: 'соревнование, конференция' },
      { word: '大阪', reading: 'おおさか', translation: 'Осака' },
    ],
    specialReadings: [
      { word: '大人', reading: 'おとな', translation: 'взрослый' },
      { word: '大阪', reading: 'おおさか', translation: 'Осака' },
    ],
    sentences: [
      { reading: 'このりんごはおおきいです', jp: 'この林檎は大きいです', ru: 'Это яблоко большое' },
      { reading: 'にほんごがだいすきです', jp: '日本語が大好きです', ru: 'Я очень люблю японский язык' },
    ],
  },
  '十': {
    meaning: 'Десять',
    onyomi: { jp: 'ジュウ、ジッ', romaji: 'juu, ji' },
    kunyomi: { jp: 'とお', romaji: 'too' },
    onyomiTip: 'Китайское чтение. В числах и составных словах.',
    kunyomiTip: 'Японское чтение. «Десять» в счётчиках.',
    kunyomiWords: [
      { word: '十', reading: 'とお', translation: 'десять' },
      { word: '十日', reading: 'とおか', translation: 'десять дней' },
    ],
    onyomiWords: [
      { word: '十月', reading: 'じゅうがつ', translation: 'октябрь' },
      { word: '十分', reading: 'じゅっぷん', translation: 'десять минут' },
      { word: '十円', reading: 'じゅうえん', translation: 'десять иен' },
      { word: '二十', reading: 'にじゅう', translation: 'двадцать' },
      { word: '三十', reading: 'さんじゅう', translation: 'тридцать' },
    ],
    specialReadings: [],
    sentences: [
      { reading: 'じゅうじにねます', jp: '十時に寝ます', ru: 'Ложусь спать в десять' },
      { reading: 'じゅっぷんまってください', jp: '十分待ってください', ru: 'Подождите, пожалуйста, десять минут' },
    ],
  },
  '二': {
    meaning: 'Два; второй',
    onyomi: { jp: 'ニ、ジ', romaji: 'ni, ji' },
    kunyomi: { jp: 'ふた(つ)', romaji: 'futa(tsu)' },
    onyomiTip: 'Китайское чтение. В числах и составных словах.',
    kunyomiTip: 'Японское чтение. В счётчиках.',
    kunyomiWords: [
      { word: '二つ', reading: 'ふたつ', translation: 'два (штуки)' },
      { word: '二人', reading: 'ふたり', translation: 'двое' },
    ],
    onyomiWords: [
      { word: '二月', reading: 'にがつ', translation: 'февраль' },
      { word: '二日', reading: 'ふつか', translation: 'второе число; два дня' },
      { word: '二十', reading: 'にじゅう', translation: 'двадцать' },
      { word: '第二', reading: 'だいに', translation: 'второй (по счёту)' },
      { word: '二階', reading: 'にかい', translation: 'второй этаж' },
    ],
    specialReadings: [
      { word: '二人', reading: 'ふたり', translation: 'двое' },
    ],
    sentences: [
      { reading: 'にがつにたびにいきます', jp: '二月に旅に行きます', ru: 'В феврале поеду в путешествие' },
      { reading: 'ふたりでいっしょにべんきょうします', jp: '二人で一緒に勉強します', ru: 'Учимся вместе вдвоём' },
    ],
  },
  '本': {
    meaning: 'Книга; корень; настоящее (при счётчиках — штуки для длинных предметов)',
    onyomi: { jp: 'ホン', romaji: 'hon' },
    kunyomi: { jp: 'もと', romaji: 'moto' },
    onyomiTip: 'Китайское чтение. В словах про книги, основы, счётчики.',
    kunyomiTip: 'Японское чтение. «Основа», «корень».',
    kunyomiWords: [
      { word: '本', reading: 'ほん', translation: 'книга' },
      { word: '日本', reading: 'にほん', translation: 'Япония' },
    ],
    onyomiWords: [
      { word: '日本語', reading: 'にほんご', translation: 'японский язык' },
      { word: '本屋', reading: 'ほんや', translation: 'книжный магазин' },
      { word: '本当', reading: 'ほんとう', translation: 'правда, настоящий' },
      { word: '基本', reading: 'きほん', translation: 'основа, базовый' },
      { word: '本日', reading: 'ほんじつ', translation: 'сегодня (офиц.)' },
    ],
    specialReadings: [],
    sentences: [
      { reading: 'このほんはおもしろいです', jp: 'この本は面白いです', ru: 'Эта книга интересная' },
      { reading: 'にほんごのほんをよんでいます', jp: '日本語の本を読んでいます', ru: 'Читаю книгу на японском' },
    ],
  },
  '中': {
    meaning: 'Внутри, центр; середина',
    onyomi: { jp: 'チュウ', romaji: 'chuu' },
    kunyomi: { jp: 'なか', romaji: 'naka' },
    onyomiTip: 'Китайское чтение. В словах «в процессе», «внутри чего-то».',
    kunyomiTip: 'Японское чтение. «Внутри», «середина».',
    kunyomiWords: [
      { word: '中', reading: 'なか', translation: 'внутри, середина' },
      { word: '家中', reading: 'いえじゅう', translation: 'по всему дому' },
    ],
    onyomiWords: [
      { word: '中国', reading: 'ちゅうごく', translation: 'Китай' },
      { word: '途中', reading: 'とちゅう', translation: 'по дороге' },
      { word: '集中', reading: 'しゅうちゅう', translation: 'концентрация' },
      { word: '中学校', reading: 'ちゅうがっこう', translation: 'средняя школа' },
      { word: '一日中', reading: 'いちにちじゅう', translation: 'целый день' },
    ],
    specialReadings: [],
    sentences: [
      { reading: 'はこのなかになにがありますか', jp: '箱の中に何がありますか', ru: 'Что внутри коробки?' },
      { reading: 'べんきょうちゅうです', jp: '勉強中です', ru: 'Я сейчас учусь' },
    ],
  },
  '長': {
    meaning: 'Длинный; лидер; глава',
    onyomi: { jp: 'チョウ', romaji: 'chou' },
    kunyomi: { jp: 'なが(い)', romaji: 'naga(i)' },
    onyomiTip: 'Китайское чтение. В словах про длину, руководство.',
    kunyomiTip: 'Японское чтение. «Длинный» как прилагательное.',
    kunyomiWords: [
      { word: '長い', reading: 'ながい', translation: 'длинный' },
      { word: '校長', reading: 'こうちょう', translation: 'директор школы' },
    ],
    onyomiWords: [
      { word: '長所', reading: 'ちょうしょ', translation: 'достоинство' },
      { word: '社長', reading: 'しゃちょう', translation: 'директор компании' },
      { word: '成長', reading: 'せいちょう', translation: 'рост, развитие' },
      { word: '長方形', reading: 'ちょうほうけい', translation: 'прямоугольник' },
      { word: '長寿', reading: 'ちょうじゅ', translation: 'долголетие' },
    ],
    specialReadings: [],
    sentences: [
      { reading: 'このみちはながいです', jp: 'この道は長いです', ru: 'Эта дорога длинная' },
      { reading: 'しゃちょうにあったことがあります', jp: '社長に会ったことがあります', ru: 'Я встречался с директором' },
    ],
  },
  '出': {
    meaning: 'Выходить; покидать; выезжать',
    onyomi: { jp: 'シュツ、スイ', romaji: 'shutsu, sui' },
    kunyomi: { jp: 'で(る)、だ(す)', romaji: 'de(ru), da(su)' },
    onyomiTip: 'Китайское чтение. В словах про выход, выезд, появление.',
    kunyomiTip: 'Японское чтение. В глаголах «выходить», «выпускать».',
    kunyomiWords: [
      { word: '出る', reading: 'でる', translation: 'выходить' },
      { word: '出す', reading: 'だす', translation: 'вынимать, отправлять' },
    ],
    onyomiWords: [
      { word: '出口', reading: 'でぐち', translation: 'выход' },
      { word: '出発', reading: 'しゅっぱつ', translation: 'отправление' },
      { word: '出張', reading: 'しゅっちょう', translation: 'командировка' },
      { word: '提出', reading: 'ていしゅつ', translation: 'сдача (работы)' },
      { word: '出席', reading: 'しゅっせき', translation: 'присутствие' },
    ],
    specialReadings: [],
    sentences: [
      { reading: 'でぐちはどこですか', jp: '出口はどこですか', ru: 'Где выход?' },
      { reading: 'あしたしゅっぱつします', jp: '明日出発します', ru: 'Завтра выезжаю' },
    ],
  },
};

export default function KanjiDetailPage() {
  const params = useParams();
  const character = decodeURIComponent(params?.character || '');
  const data = KANJI_DETAIL[character];

  if (!data) {
    return (
      <div className="kanji-detail-page">
        <Container>
          <div className="kanji-detail__not-found">
            <p className="kanji-detail__big-char">{character}</p>
            <Typography variant="24-medium">Данные для этого кандзи пока не добавлены.</Typography>
            <Link href="/kanji" className="kanji-detail__back-link">
              ← Вернуться к списку кандзи
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const { meaning, onyomi, kunyomi, kunyomiWords, onyomiWords, specialReadings, sentences } = data;

  return (
    <div className="kanji-detail-page">
      <Container>
        {/* Первый блок по макету: слева — назад + белый кандзи + чёрная кнопка; справа — значение + Onyomi | Kunyomi */}
        <div className="kanji-detail__top-row">
          <div className="kanji-detail__top-left">
            <Link href="/kanji" className="kanji-detail__back" aria-label="Назад к списку">
              <ArrowUp className="kanji-detail__back-arrow" size={40} color="var(--color-black)" />
            </Link>
            <div className="kanji-detail__panel kanji-detail__panel--kanji">
              <span className="kanji-detail__char" lang="ja">{character}</span>
            </div>
            <Link
              href={`/kanji/${encodeURIComponent(character)}/test`}
              className="kanji-detail__practice-bar"
            >
              <span className="kanji-detail__practice-text">Практиковать</span>
            </Link>
          </div>
          <div className="kanji-detail__top-right">
            <div className="kanji-detail__panel kanji-detail__panel--meaning">
              <h1 className="kanji-detail__meaning-title">{meaning}</h1>
            </div>
            <div className="kanji-detail__readings-top">
              <div className="kanji-detail__reading-card">
                <span className="kanji-detail__reading-label">
                  Onyomi
                  <span className="kanji-detail__reading-tooltip-trigger" tabIndex={0} aria-describedby="tooltip-onyomi">
                    <span className="kanji-detail__reading-question" aria-hidden><Question size={20} /></span>
                    <span className="kanji-detail__reading-tooltip" role="tooltip" id="tooltip-onyomi">
                      <span className="kanji-detail__reading-tooltip-inner">
                        {(() => {
                          const idx = data.onyomiTip.indexOf('. ');
                          const header = idx >= 0 ? data.onyomiTip.slice(0, idx + 1) : data.onyomiTip;
                          const body = idx >= 0 ? data.onyomiTip.slice(idx + 2) : '';
                          return body ? <><strong>{header}</strong> {body}</> : data.onyomiTip;
                        })()}
                      </span>
                    </span>
                  </span>
                </span>
                <div className="kanji-detail__reading-content">
                  <p className="kanji-detail__reading-jp" lang="ja">{onyomi.jp}</p>
                  <p className="kanji-detail__reading-romaji">{onyomi.romaji}</p>
                </div>
              </div>
              <div className="kanji-detail__reading-card">
                <span className="kanji-detail__reading-label">
                  Kunyomi
                  <span className="kanji-detail__reading-tooltip-trigger" tabIndex={0} aria-describedby="tooltip-kunyomi">
                    <span className="kanji-detail__reading-question" aria-hidden><Question size={20} /></span>
                    <span className="kanji-detail__reading-tooltip" role="tooltip" id="tooltip-kunyomi">
                      <span className="kanji-detail__reading-tooltip-inner">
                        {(() => {
                          const idx = data.kunyomiTip.indexOf('. ');
                          const header = idx >= 0 ? data.kunyomiTip.slice(0, idx + 1) : data.kunyomiTip;
                          const body = idx >= 0 ? data.kunyomiTip.slice(idx + 2) : '';
                          return body ? <><strong>{header}</strong> {body}</> : data.kunyomiTip;
                        })()}
                      </span>
                    </span>
                  </span>
                </span>
                <div className="kanji-detail__reading-content">
                  <p className="kanji-detail__reading-jp" lang="ja">{kunyomi.jp}</p>
                  <p className="kanji-detail__reading-romaji">{kunyomi.romaji}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Сетка 2×3 по макету: три карточки — Kunyomi чтения, Onyomi чтения, Особые чтения */}
        <div className="kanji-detail__main">
          <div className="kanji-detail__words-grid">
              <section className="kanji-detail__words-section">
                <h2 className="kanji-detail__words-title">Kunyomi чтения</h2>
                <ul className="kanji-detail__words-list">
                  {kunyomiWords.map((item) => (
                    <li key={item.word + item.reading}>
                      <span lang="ja">{item.word}</span> 【{item.reading}】 {item.translation}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="kanji-detail__words-section">
                <h2 className="kanji-detail__words-title">Onyomi чтения</h2>
                <ul className="kanji-detail__words-list">
                  {onyomiWords.map((item) => (
                    <li key={item.word + item.reading}>
                      <span lang="ja">{item.word}</span> 【{item.reading}】 {item.translation}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="kanji-detail__words-section">
                <h2 className="kanji-detail__words-title">Особые чтения</h2>
                <ul className="kanji-detail__words-list">
                  {specialReadings.map((item) => (
                    <li key={item.word + item.reading}>
                      <span lang="ja">{item.word}</span> 【{item.reading}】 {item.translation}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
        </div>

        {/* Блок примеров предложений на всю ширину */}
        <div className="kanji-detail__bottom">
          <section className="kanji-detail__sentences">
            <h2 className="kanji-detail__sentences-title">Примеры предложений</h2>
            <div className="kanji-detail__sentences-list">
              {sentences.map((s, i) => (
                <div key={i} className="kanji-detail__sentence-row">
                  <div className="kanji-detail__sentence-left">
                    {s.reading && (
                      <p className="kanji-detail__sentence-reading" lang="ja">{s.reading}</p>
                    )}
                    <p className="kanji-detail__sentence-jp" lang="ja">{s.jp}</p>
                  </div>
                  <p className="kanji-detail__sentence-ru">{s.ru}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
