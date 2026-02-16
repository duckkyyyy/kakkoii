export default function Typography({ 
  children, 
  className = '', 
  variant = '16-regular' 
}) {
  const baseClasses = 'text-black leading-[120%]';
  
  const variantClasses = {
    'h1': 'text-[60px] md:text-[32px] font-bold',
    'h2': 'text-[48px] md:text-[26px] font-semibold',
    'h3': 'text-[40px] md:text-[22px] font-bold',
    'h4': 'text-[32px] md:text-[18px] font-bold',
    
    '32-semi': 'text-[32px] font-semibold',
    '32-medium': 'text-[32px] font-medium',
    '28-semi': 'text-[28px] font-semibold',
    '28-medium': 'text-[28px] font-medium',
    '24-semi': 'text-[24px] font-semibold',
    '24-medium': 'text-[24px] font-medium',
    '24-regular': 'text-[24px] font-normal',
    '20-semi': 'text-[20px] font-semibold',
    '20-medium': 'text-[20px] font-medium',
    '20-regular': 'text-[20px] font-normal',
    '16-medium': 'text-[16px] font-medium',
    '16-regular': 'text-[16px] font-normal',
  };
  
  const variantClass = variantClasses[variant] || variantClasses['16-regular'];
  
  return (
    <div className={`${baseClasses} ${variantClass} ${className}`}>
      {children}
    </div>
  );
}