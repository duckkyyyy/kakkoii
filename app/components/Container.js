export default function Container({ children, className = '' }) {
  return (
    <div 
      className={`w-full mx-auto px-[40px] max-w-[1920px] ${className}`}
    >
      {children}
    </div>
  );
}