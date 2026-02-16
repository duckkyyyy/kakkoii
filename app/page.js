'use client';

import Container from './components/Container';
import Section from './components/Section';
import Typography from './components/Typography';
import Tag from './components/Tag';
import Button from './components/Button';

export default function Home() {
  return (
    <main>
      <Section>
        <Container>
          <div className="flex flex-wrap gap-4 items-start mb-5">
            <Tag size="big">Большой тег</Tag>
            <Tag size="medium">Средний тег</Tag>
            <Tag size="small">Маленький тег</Tag>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-wrap gap-4 items-start">
            <Button variant="main" size="big">Main Big</Button>
            <Button variant="main" size="small">Main Small</Button>
            <Button variant="secondary" size="big">Secondary Big</Button>
            <Button variant="secondary" size="small">Secondary Small</Button>
            <Button variant="main" size="big" disabled>Main Big Disabled</Button>
            <Button variant="main" size="small" disabled>Main Small Disabled</Button>
            <Button variant="secondary" size="big" disabled>Secondary Big Disabled</Button>
            <Button variant="secondary" size="small" disabled>Secondary Small Disabled</Button>
            <Button variant="main" size="big" className="w-full">На всю ширину</Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}