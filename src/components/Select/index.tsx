import { Wrapper } from './styles';

import Text from '../Text';

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
  options: Array<{ value: string | number; label: string }>;
  value: string;
  selected?: string | number;
  name: string;
  label?: string;
  fullWidth?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
};

const Select = ({
  color = 'client',
  label,
  name,
  value,
  selected = undefined,
  options,
  onChange,
  onBlur,
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
        <div>
          <select
            value={selected || value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Wrapper>
  );
};

export default Select;
