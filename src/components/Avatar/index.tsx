import { Wrapper } from './styles';

type AvatarProps = {
  className?: string;
  color?: 'client' | 'productOwner' | 'developer' | 'admin' | string;
  size?: 'small' | 'big';
  text: string;
};

const Avatar = ({ color, size = 'small', text, className }: AvatarProps) => {
  return (
    <Wrapper color={color} size={size} className={className}>
      {text[0]}
    </Wrapper>
  );
};

export default Avatar;
