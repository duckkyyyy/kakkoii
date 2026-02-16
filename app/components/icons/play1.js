export default function Play1({ className = "", size = 40, color = "#F8F8F8", strokeColor = "#1C1B1B" }) {
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
        d="M13.084 4.33398L28.7461 19.9961L13.084 35.6592H10.332V4.33398H13.084Z" 
        fill={color} 
        stroke={strokeColor} 
        strokeWidth="2"
      />
    </svg>
  );
}