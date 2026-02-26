import Container from '../atoms/Container'; 

const paddingMap = { '1': 8, '2': 16, '3': 24, '4': 32, '5': 40, '6': 48, '7': 56, '8': 64 };
const bgMap = { white: 'var(--color-white)', gray: 'var(--color-gray)', black: 'var(--color-black)' };

export default function Section({ 
  children, 
  className = '', 
  paddingTop = '5', 
  paddingBottom = '5', 
  bgColor = 'white' 
}) {
  const pt = paddingMap[paddingTop] ?? 40;
  const pb = paddingMap[paddingBottom] ?? 40;
  const bg = bgMap[bgColor] ?? bgMap.white;

  return (
    <section 
      className={`section ${className}`}
      style={{ paddingTop: pt, paddingBottom: pb, backgroundColor: bg }}
    >
      <Container>
        {children}
      </Container>
    </section>
  );
}
