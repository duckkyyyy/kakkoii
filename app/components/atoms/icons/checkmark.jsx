export default function Checkmark({ className = "", size = 40, color = "currentColor" }) {
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M15.6285 26.7677L33.3731 9L35.8828 11.5063L15.6301 31.7852L5 21.1551L7.50793 18.647L15.6285 26.7677Z" 
        fill={color}
      />
    </svg>
  );
}
