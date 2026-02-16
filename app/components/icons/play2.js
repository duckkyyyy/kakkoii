export default function Play2({ className = "", size = 40, bgColor = "#1C1B1B", iconColor = "#F8F8F8" }) {
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
      <g clipPath="url(#clip0_274_97)">
        <path 
          d="M17.5 26.6673H19.1667L25.8333 20.0007L19.1667 13.334L17.5 13.334V26.6673Z" 
          fill={iconColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_274_97">
          <rect width="13.3333" height="13.3333" fill="white" transform="translate(13.332 13.334)"/>
        </clipPath>
      </defs>
    </svg>
  );
}