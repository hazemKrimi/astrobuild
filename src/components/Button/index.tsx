import { Wrapper } from './styles';

type ButtonProps = Omit<React.AllHTMLAttributes<HTMLButtonElement>, 'size'> & {
  color:
    | 'client'
    | 'productOwner'
    | 'developer'
    | 'admin'
    | 'success'
    | 'warning'
    | 'error'
    | 'black'
    | 'white';
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
      {iconLeft && <span className='icon left'>{iconLeft}</span>}
      {text}
      {iconRight && <span className='icon right'>{iconRight}</span>}
    </Wrapper>
  );
};

export default Button;
