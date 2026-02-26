export default function Column({ 
  children, 
  desktop = 1,      
  tablet = null,    
  mobile = null,    
  start = null,     
  className = '' 
}) {
  const colSpan = `col-span-${desktop}`;
  const colStart = start ? `col-start-${start}` : '';
  const mdSpan = tablet ? `md-col-span-${tablet}` : '';
  const smSpan = mobile ? `sm-col-span-${mobile}` : '';
  const classes = [colSpan, colStart, mdSpan, smSpan, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
