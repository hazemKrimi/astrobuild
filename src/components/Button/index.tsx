import { Wrapper } from './styles';

type ButtonProps = Omit<React.AllHTMLAttributes<HTMLButtonElement>, 'size'> & {
  color: 'client' | 'productOwner' | 'developer' | 'admin';
  size?: 'small' | 'big';
  variant?: 'primary-action' | 'secondary-action' | 'outlined' | 'text';
  iconLeft?: React.SVGProps<SVGSVGElement>;
  iconRight?: React.SVGProps<SVGSVGElement>;
  fullWidth?: boolean;
  text: string;
  onClick: () => void;
};

const Button = ({
  color,
  size = 'small',
  variant = 'text',
  iconLeft,
  iconRight,
  fullWidth = false,
  text,
  onClick,
}: ButtonProps) => {
  return (
    <Wrapper
      color={color}
      size={size}
      variant={variant}
      iconLeft={iconLeft || undefined}
      iconRight={iconRight || undefined}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {iconLeft && iconLeft}
      {text}
      {iconRight && iconRight}
    </Wrapper>
  );
};

export default Button;
