export default function Question({ className = "", size = 40, color = "#1C1B1B" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="1" y="1" width="38" height="38" stroke={color} strokeWidth="2"/>
      <path 
        d="M16 27.5H19.5V31H16V27.5ZM16 10V13.5H23V17H16V24H19.5V20.5H26.5V10H16Z" 
        fill={color}
      />
    </svg>
  );
}