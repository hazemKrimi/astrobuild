import { Wrapper } from './styles';

type AlertProps = {
  className?: string;
  color:
    | 'client'
    | 'productOwner'
    | 'developer'
    | 'admin'
    | 'success'
    | 'warning'
    | 'error';
  text: string;
};

const Alert = ({ text, ...props }: AlertProps) => {
  return <Wrapper {...props}>{text}</Wrapper>;
};

export default Alert;
