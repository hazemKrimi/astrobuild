import { Wrapper } from './styles';

type IconButtonProps = Omit<
  React.AllHTMLAttributes<HTMLButtonElement>,
  'size'
> & {
  color:
    | 'client'
    | 'productOwner'
    | 'developer'
    | 'admin'
    | 'success'
    | 'warning'
    | 'error';
  size?: 'small' | 'big';
  icon?: React.SVGProps<SVGSVGElement>;
  onClick: () => void;
};

const IconButton = ({
  color,
  size = 'small',
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
