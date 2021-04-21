import { Wrapper } from './styles';
import { Text } from '..';

type TextAreaProps = {
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
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({
  color = 'client',
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  errorMessage,
  ...props
}: TextAreaProps) => {
  return (
    <Wrapper label={label} error={error} color={color} {...props}>
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
      <div className='textarea'>
        <textarea
          rows={10}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </Wrapper>
  );
};

export default TextArea;
