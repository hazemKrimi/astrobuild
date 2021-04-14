import { Wrapper } from './styles';

type InputProps = {
  className?: string;
  color?: 'client' | 'productOwner' | 'developer' | 'admin' | string;
  error?: boolean;
  errorMessage?: string;
  value: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'file' | 'number';
  placeholder?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  iconLeft?: React.SVGProps<SVGSVGElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, value, ...props }: InputProps) => {
  return (
    <Wrapper {...props}>
      <input type={type} value={value} />
    </Wrapper>
  );
};

export default Input;
