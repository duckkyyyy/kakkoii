import Container from './Container'; 

export default function Section({ 
  children, 
  className = '',
  paddingTop = '5', 
  paddingBottom = '5', 
  bgColor = 'white' 
}) {
  return (
    <section 
      className={`bg-${bgColor} pt-${paddingTop} pb-${paddingBottom} ${className}`}
    >
      <Container>
        {children}
      </Container>
    </section>
  );
}