import { Wrapper } from './styles';

type SidebarItemProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
  size?: 'small' | 'medium' | 'big';
  selected?: boolean;
  text: string;
  onClick: () => void;
};

const SidebarItem = ({
  color,
  size = 'medium',
  selected = false,
  text,
  onClick,
}: SidebarItemProps) => {
  return (
    <Wrapper color={color} size={size} selected={selected} onClick={onClick}>
      {text}
    </Wrapper>
  );
};

export default SidebarItem;
