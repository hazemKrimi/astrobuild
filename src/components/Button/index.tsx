import Spinner from '../Spinner';

import { Wrapper } from './styles';

type ButtonProps = {
  color: 'client' | 'productOwner' | 'developer' | 'admin' | 'error';
  size?: 'small' | 'big';
  variant?: 'primary-action' | 'secondary-action' | 'outlined' | 'text';
  type?: 'submit' | 'button' | 'reset';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  text: string;
  onClick?: () => void;
};

const Button = ({
  color,
  size = 'small',
  variant = 'text',
  type = 'button',
  iconLeft,
  iconRight,
  fullWidth = false,
  loading = false,
  disabled = false,
  text,
  onClick,
}: ButtonProps) => {
  return (
    <Wrapper
      color={color}
      size={size}
      variant={variant}
      type={type}
      iconLeft={iconLeft || undefined}
      iconRight={iconRight || undefined}
      fullWidth={fullWidth}
      load={loading}
      disabled={disabled}
      onClick={onClick}
    >
      {iconLeft && <span className='icon left'>{iconLeft}</span>}
      {text}
      {iconRight && !loading && <span className='icon right'>{iconRight}</span>}
      {loading && (
        <span>
          <Spinner color='white' />
        </span>
      )}
    </Wrapper>
  );
};

export default Button;
