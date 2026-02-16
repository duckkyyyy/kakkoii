export default function Column({ 
  children, 
  desktop = 1,      
  tablet = null,    
  mobile = null,    
  start = null,     
  className = '' 
}) {

  let colClasses = '';
  
  if (start) {
    colClasses = `col-start-${start} col-span-${desktop}`;
  } else {
    colClasses = `col-span-${desktop}`;
  }
  
  if (tablet) {
    colClasses += ` md:col-span-${tablet}`;
  }
  if (mobile) {
    colClasses += ` sm:col-span-${mobile}`;
  }
  
  return (
    <div className={`${colClasses} ${className}`}>
      {children}
    </div>
  );
}