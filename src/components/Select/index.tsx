import { Wrapper } from './styles';
import { Text } from '..';

type SelectProps = {
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
  options: Array<{ value: any; label: string }>;
  value: string;
  label?: string;
  fullWidth?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({
  color = 'client',
  label,
  value,
  options,
  onChange,
  error,
  errorMessage,
  ...props
}: SelectProps) => {
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
      <div className='select'>
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </Wrapper>
  );
};

export default Select;
