import Grid from './Grid';
import Column from './Column';

export default function TwoColumnLayout({ 
  leftContent, 
  rightContent,
  leftSpan = 6,
  rightSpan = 6,
  className = '' 
}) {
  return (
    <Grid cols={12} gap="20px">
      <Column span={leftSpan}>
        {leftContent}
      </Column>
      <Column span={rightSpan}>
        {rightContent}
      </Column>
    </Grid>
  );
}