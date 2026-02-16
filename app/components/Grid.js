export default function Grid({ 
  children, 
  cols = 12, 
  gap = '20px',
  className = '' 
}) {
  return (
    <div 
      className={`grid grid-cols-12 gap-[20px] ${className}`}
    >
      {children}
    </div>
  );
}