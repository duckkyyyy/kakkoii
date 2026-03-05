'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container, KanjiCard, Typography } from '../components';

const KANJI_LIST = [
  { kanji: '日', meaning: 'День, солнце', reading: 'nichi, jitsu' },
  { kanji: '一', meaning: 'Один', reading: 'ichi, hito(tsu)' },
  { kanji: '国', meaning: 'Страна', reading: 'koku, kuni' },
  { kanji: '人', meaning: 'Человек', reading: 'jin, hito' },
  { kanji: '年', meaning: 'Год', reading: 'nen, toshi' },
  { kanji: '大', meaning: 'Большой, огромный', reading: 'dai, oo(ki)' },
  { kanji: '十', meaning: 'Десять', reading: 'juu, tou' },
  { kanji: '二', meaning: 'Два', reading: 'ni, futa(tsu)' },
  { kanji: '本', meaning: 'Книга, настоящее', reading: 'hon, moto' },
  { kanji: '中', meaning: 'Внутри, центр', reading: 'chuu, naka' },
  { kanji: '長', meaning: 'Длинный, лидер', reading: 'chou, naga(i)' },
  { kanji: '出', meaning: 'Выходить, покидать', reading: 'shutsu, de(ru)' },
];

export default function KanjiPage() {
  return (
    <div className="kanji-page">
      <Container>
        <section className="kanji-hero">
          <div className="kanji-hero__illus">
            <Image
              src="/images/kai/kai-confused.png"
              alt=""
              width={200}
              height={140}
              className="kanji-hero__img"
              unoptimized
            />
          </div>
          <div className="kanji-hero__text">
            <Typography variant="28-semi" className="kanji-hero__title">
              Покорите кандзи без лишней сложности. Наша система позволяет глубоко изучить каждый иероглиф и сразу применить знания на практике.
            </Typography>
            <ol className="kanji-hero__list typo-24-medium">
              <li>Найди нужный иероглиф.</li>
              <li>Изучи его карточку: все значения, чтения и примеры употребления.</li>
              <li>Попрактикуйся на специальных упражнениях, чтобы закрепить его в памяти.</li>
            </ol>
          </div>
        </section>

        <div className="kanji-page__grid">
          {KANJI_LIST.map((item) => (
            <Link
              key={item.kanji}
              href={`/kanji/${encodeURIComponent(item.kanji)}`}
              className="kanji-page__card-link"
            >
              <KanjiCard
                kanji={item.kanji}
                meaning={item.meaning}
                reading={item.reading}
                buttonText="Учить"
                className="kanji-page__card"
              />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
