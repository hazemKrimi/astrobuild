import { Wrapper } from './styles';

type SidebarItemProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
  size?: 'small' | 'medium' | 'big';
  text: string;
  onClick: () => void;
};

const SidebarItem = ({
  color,
  size = 'medium',
  text,
  onClick,
}: SidebarItemProps) => {
  return (
    <Wrapper color={color} size={size} onClick={onClick}>
      {text}
    </Wrapper>
  );
};

export default SidebarItem;
