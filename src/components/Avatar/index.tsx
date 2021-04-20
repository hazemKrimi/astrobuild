import { Wrapper } from './styles';

type AvatarProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin' | string;
  size?: 'small' | 'big';
  text: string;
};

const Avatar = ({ color, size = 'small', text }: AvatarProps) => {
  return (
    <Wrapper color={color} size={size}>
      {text}
    </Wrapper>
  );
};

export default Avatar;
