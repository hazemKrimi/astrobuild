import { Wrapper } from './styles';

type SectionSelectorProps = {
  icon: React.SVGProps<SVGSVGElement>;
  text: string;
  color: 'client' | 'productOwner' | 'developer' | 'admin';
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const SectionSelector = ({
  icon,
  text,
  color,
  selected = false,
  disabled = false,
  onClick,
}: SectionSelectorProps) => {
  return (
    <Wrapper
      color={color}
      icon={icon}
      selected={selected}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className='icon left'>{icon}</span>}
      {text}
    </Wrapper>
  );
};

export default SectionSelector;
