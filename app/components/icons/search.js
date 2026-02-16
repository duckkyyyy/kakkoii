export default function Search({ className = "", size = 40, color = "#1C1B1B" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 41 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M23.8789 8.8916L28.9922 15.9277V24.623L23.8789 31.6592L15.6094 34.3467L7.33887 31.6592L2.22754 24.623V15.9277L7.33887 8.8916L15.6094 6.2041L23.8789 8.8916Z" 
        stroke={color} 
        strokeWidth="2.92683"
      />
      <path 
        d="M27.3203 28.0801L39.6679 35.6258" 
        stroke={color} 
        strokeWidth="2.92683"
      />
    </svg>
  );
}