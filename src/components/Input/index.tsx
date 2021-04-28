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
  label?: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'file' | 'number';
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = ({
  type = 'text',
  color = 'client',
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
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
        <div>
          {type === 'file' && (
            <span className='icon left'>
              <Upload />
            </span>
          )}
          <input
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            accept={type === 'file' ? 'image/*' : undefined}
            placeholder={placeholder}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Input;
