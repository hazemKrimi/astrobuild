import { Wrapper } from './styles';

type IconButtonProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
  size?: 'small' | 'medium' | 'big';
  icon?: React.ReactNode;
  onClick: () => void;
};

const IconButton = ({
  color,
  size = 'medium',
  icon,
  onClick,
}: IconButtonProps) => {
  return (
    <Wrapper color={color} size={size} onClick={onClick}>
      {icon}
    </Wrapper>
  );
};

export default IconButton;
