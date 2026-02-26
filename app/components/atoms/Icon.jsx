import { 
  ArrowUp, 
  Checkmark, 
  Clip, 
  Cross, 
  Pause, 
  Play1, 
  Play2, 
  Question, 
  Search 
} from './icons';

export default function Icon({ 
  name, 
  size = 24, 
  color = "currentColor", 
  bgColor,
  iconColor,
  strokeColor,
  className = "" 
}) {
  const icons = {
    arrowup: ArrowUp,
    checkmark: Checkmark,
    clip: Clip,
    cross: Cross,
    pause: Pause,
    play1: Play1,
    play2: Play2,
    question: Question,
    search: Search,
  };

  const SelectedIcon = icons[name.toLowerCase()];

  if (!SelectedIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  if (name.toLowerCase() === 'pause') {
    return <SelectedIcon 
      size={size} 
      bgColor={bgColor || "#1C1B1B"} 
      iconColor={iconColor || "#F8F8F8"} 
      className={className} 
    />;
  }

  if (name.toLowerCase() === 'play1') {
    return <SelectedIcon 
      size={size} 
      color={iconColor || "#F8F8F8"} 
      strokeColor={strokeColor || "#1C1B1B"} 
      className={className} 
    />;
  }

  if (name.toLowerCase() === 'play2') {
    return <SelectedIcon 
      size={size} 
      bgColor={bgColor || "#1C1B1B"} 
      iconColor={iconColor || "#F8F8F8"} 
      className={className} 
    />;
  }

  return <SelectedIcon size={size} color={color} className={className} />;
}
