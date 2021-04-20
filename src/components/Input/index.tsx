import { Text } from '..';
import { Upload } from '../../assets';
import { Wrapper } from './styles';

type InputProps = {
  className?: string;
  color?:
    | 'client'
    | 'productOwner'
    | 'developer'
    | 'admin'
    | 'success'
    | 'warning'
    | 'error'
    | 'black'
    | 'white';
  error?: boolean;
  errorMessage?: string;
  value: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'file' | 'number';
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  type = 'text',
  color = 'client',
  label,
  value,
  onChange,
  error,
  errorMessage,
  ...props
}: InputProps) => {
  return (
    <Wrapper label={label} error={error} type={type} color={color} {...props}>
      <div className='info'>
        {label && (
          <Text variant='body' weight='bold' className='label'>
            {label}
          </Text>
        )}
        {error && errorMessage && (
          <Text variant='body' color='error' className='error-message'>
            {errorMessage}
          </Text>
        )}
      </div>
      <div className='input'>
        {type === 'file' && (
          <span className='icon left'>
            <Upload />
          </span>
        )}
        <input type={type} value={value} onChange={onChange} accept='image/*' />
      </div>
    </Wrapper>
  );
};

export default Input;
