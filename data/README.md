# Данные: статьи, кандзи, тесты

Из этих JSON всё подтягивается в приложение: список материалов, страницы статей, страницы кандзи и тесты.

---

## Структура папок

```
data/
├── README.md                 ← этот файл
├── articles/
│   ├── schema.json           ← схема статьи
│   ├── tests_schema.json     ← схема теста в конце статьи
│   ├── index.json            ← список статей (для ленты материалов)
│   ├── lexicon_example.json  ← пример статьи типа «лексика»
│   ├── grammar_example.json  ← пример «грамматика»
│   ├── reading_example.json  ← пример «чтение»
│   ├── audition_example.json ← пример «аудирование»
│   └── [slug].json           ← полный контент статьи по slug
├── kanji/
│   ├── schema.json           ← схема кандзи
│   ├── index.json            ← список кандзи (для страницы /kanji)
│   ├── [character].json      ← полные данные кандзи (например 日.json)
│   └── tests/
│       ├── schema.json       ← схема теста по кандзи
│       └── [character].json  ← 8 вопросов теста (например 日.json)
```

---

## Статьи (articles)

У каждой статьи **5 контент-блоков** и в конце **один тест**.

### Типы статей

| Тип          | Описание блоков | Тест в конце |
|-------------|------------------|--------------|
| **lexicon** | Заголовок + 4 параграфа в каждом блоке. Параграф — строка или `{ "bold": "…", "text": "…" }`. | Выбор варианта (choice) |
| **grammar** | То же + в блоке может быть плашка **construction** (грамматическая конструкция). | Drag&drop слов (grammar) |
| **reading** | **Один блок** с японским текстом: **readingBlock** — `{ id, paragraphs }`. Каждый параграф = массив сегментов `{ type: "text"|"word", value, translation? }`. Плюс **vocabWords** — карточки со словами. | Choice |
| **audition** | Введение, блок **видео** (videoPlaceholder), **vocabWords** (карточки). При необходимости можно добавить до 5 блоков текста в **blocks**. | Choice |

### Поля статьи (общие)

- **slug** — уникальный URL (например `chasticy-wa-i-ga`).
- **type** — `lexicon` | `grammar` | `reading` | `audition`.
- **title**, **image**, **cover** (обложка статьи — путь к картинке, например `/images/covers/ramen.jpg`), **backHref**, **toc**, **links**, **introduction**.
- **tags** — ровно **два тега**: `[тип, дополнительный]`. Первый — тип статьи (**Лексика** | **Грамматика** | **Чтение** | **Аудирование**), второй — дополнительный тег (Сленг, Манга, Еда, Аниме и т.д.).
- **blocks** — ровно 5 блоков для lexicon/grammar; для reading используется один **readingBlock** `{ id, paragraphs }`, плюс **vocabWords**.
- **test** — объект теста (см. ниже).
- **related** — массив похожих статей: `{ slug, image, tags, title, description }` (у каждой тоже два тега).

### Тест статьи (test)

- **Лексика / чтение / аудирование** — один вопрос с выбором ответа:
  - `type: "choice"`
  - `question`, `image`, `choices[]`, `correctChoiceIndex`.

- **Грамматика** — собрать предложение из слов:
  - `type: "grammar"`
  - `instruction`, `sentence`, `image`, `correctWords[]`, `distractors[]`.

Схемы: `articles/schema.json`, `articles/tests_schema.json`.

---

## Кандзи (kanji)

У каждого кандзи:

1. **Карточка**: перевод (**meaning**), два чтения (**onyomi**, **kunyomi** — каждое с полями `jp` и `romaji`), подсказки **onyomiTip**, **kunyomiTip**.
2. **Три блока примеров слов**:
   - **onyomiWords** — слова с онъёми: `{ word, reading, translation }`.
   - **kunyomiWords** — слова с кунъёми.
   - **specialReadings** — особые чтения (например 今日 → きょう).
3. **Примеры предложений** — **sentences**: `{ reading, jp, ru }`.
4. **Блок видео** — **video**: `{ title }` (название аниме/серии), `{ phrase, phraseReading, translation }` (фраза с чтением и переводом).

Файл кандзи: `kanji/[character].json` (например `kanji/日.json`). Схема: `kanji/schema.json`.

---

## Тесты по кандзи (kanji/tests)

У каждого кандзи тест из **8 типов вопросов** (один вопрос на тип):

| № | type             | Описание |
|---|------------------|----------|
| 1 | **meaning**      | Выбрать значение кандзи |
| 2 | **onyomi**       | Выбрать правильное онъёми-чтение |
| 3 | **kunyomi**      | Выбрать правильное кунъёми-чтение |
| 4 | **wordTranslation** | Перевод слова с этим кандзи (choices, correctChoiceIndex) |
| 5 | **wordReading**  | Как читается слово (например 日本) |
| 6 | **specialReading** | В каком слове кандзи читается указанным образом (например び) |
| 7 | **audio**        | Послушать фразу, выбрать перевод (можно с example: { jp, ru }) |
| 8 | **drawing**      | Нарисовать кандзи по порядку черт (без choices) |

Файл теста: `kanji/tests/[character].json`. Схема: `kanji/tests/schema.json`.

---

## Индексы

- **articles/index.json** — массив карточек для ленты материалов: `slug`, `type`, `title`, `image`, `tags`, `description`, `cols`.
- **kanji/index.json** — массив для списка кандзи: `character`, `meaning`, `reading`.

Полный контент статьи подгружается по `slug` из `articles/[slug].json`, кандзи — из `kanji/[character].json`, тест кандзи — из `kanji/tests/[character].json`.
