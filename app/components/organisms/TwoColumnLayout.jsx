import Grid from '../atoms/Grid';
import Column from '../atoms/Column';

export default function TwoColumnLayout({ 
  leftContent, 
  rightContent,
  leftSpan = 6,
  rightSpan = 6,
  className = '' 
}) {
  return (
    <Grid cols={12} gap="20px">
      <Column desktop={leftSpan}>
        {leftContent}
      </Column>
      <Column desktop={rightSpan}>
        {rightContent}
      </Column>
    </Grid>
  );
}
