export default function ArrowUp({ className = "", size = 40, color = "currentColor" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M21.0607 1.93934C20.4749 1.35355 19.5251 1.35355 18.9393 1.93934L9.3934 11.4853C8.80761 12.0711 8.80761 13.0208 9.3934 13.6066C9.97919 14.1924 10.9289 14.1924 11.5147 13.6066L20 5.12132L28.4853 13.6066C29.0711 14.1924 30.0208 14.1924 30.6066 13.6066C31.1924 13.0208 31.1924 12.0711 30.6066 11.4853L21.0607 1.93934ZM20 38H21.5V3H20H18.5V38H20Z" 
        fill={color}
      />
    </svg>
  );
}
