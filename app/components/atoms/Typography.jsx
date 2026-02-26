const variantToClass = {
  'h1': 'typo typo-h1',
  'h2': 'typo typo-h2',
  'h3': 'typo typo-h3',
  'h4': 'typo typo-h4',
  '32-semi': 'typo typo-32-semi',
  '32-medium': 'typo typo-32-medium',
  '28-semi': 'typo typo-28-semi',
  '28-medium': 'typo typo-28-medium',
  '24-semi': 'typo typo-24-semi',
  '24-medium': 'typo typo-24-medium',
  '24-regular': 'typo typo-24-regular',
  '20-semi': 'typo typo-20-semi',
  '20-medium': 'typo typo-20-medium',
  '20-regular': 'typo typo-20-regular',
  '16-medium': 'typo typo-16-medium',
  '16-regular': 'typo typo-16-regular',
};

export default function Typography({ 
  children, 
  className = '', 
  variant = '16-regular' 
}) {
  const variantClass = variantToClass[variant] || variantToClass['16-regular'];
  return (
    <div className={`${variantClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
