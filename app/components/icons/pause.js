export default function Pause({ className = "", size = 40, bgColor = "#1C1B1B", iconColor = "#F8F8F8" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" fill={bgColor}/>
      <path 
        d="M15 14H18.3333V26H15V14ZM21.6667 14V26H25V14H21.6667Z" 
        fill={iconColor}
      />
    </svg>
  );
}