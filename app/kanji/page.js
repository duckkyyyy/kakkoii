import Image from 'next/image';
import Link from 'next/link';
import { Container, KanjiCard, Typography } from '../components';
import kanjiIndex from '../../data/kanji/index.json';

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
            <Typography variant="28-semi" className="kanji-hero__title" as="p">
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
          {kanjiIndex.map((item) => (
            <Link
              key={item.character}
              href={`/kanji/${encodeURIComponent(item.character)}`}
              className="kanji-page__card-link"
            >
              <KanjiCard
                kanji={item.character}
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
