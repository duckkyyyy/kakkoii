import Image from 'next/image';
import Button from '../atoms/Button';
import Container from '../atoms/Container';
import Typography from '../atoms/Typography';
import styles from './MascotErrorPage.module.css';

const KAI_CONFUSED = '/images/kai/kai-confused.png';

export default function MascotErrorPage({ code, title, description, onRetry }) {
  const heading = `${code} — ${title}`;

  return (
    <Container className={styles.wrap}>
      <div className={styles.root}>
        <Image
          src={KAI_CONFUSED}
          alt=""
          width={280}
          height={196}
          className={styles.mascot}
          unoptimized
        />
        <div className={styles.copy}>
          <Typography variant="28-semi" as="h1">
            {heading}
          </Typography>
          <Typography variant="20-regular" className={styles.desc} as="p">
            {description}
          </Typography>
        </div>
        {onRetry ? (
          <Button variant="main" size="big" onClick={onRetry}>
            Попробовать снова
          </Button>
        ) : null}
        <Button href="/" variant={onRetry ? 'secondary' : 'main'} size="big">
          Вернуться на главную
        </Button>
      </div>
    </Container>
  );
}
