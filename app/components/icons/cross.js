export default function Cross({ className = "", size = 40, color = "currentColor" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_278_542)">
        <path 
          d="M30.6018 32.9665L20.0018 22.3499L9.40182 32.9665L7.03516 30.5999L17.6518 19.9999L7.03516 9.39987L9.40182 7.0332L20.0018 17.6499L30.6018 7.04987L32.9518 9.39987L22.3518 19.9999L32.9518 30.5999L30.6018 32.9665Z" 
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_278_542">
          <rect width="40" height="40" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}