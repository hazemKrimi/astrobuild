import { Link as RouterLink } from 'react-router-dom';
import { Wrapper } from './styles';

type LinkProps = {
  href: string;
  children?: React.ReactNode | JSX.Element | string;
  color?:
    | 'client'
    | 'productOwner'
    | 'developer'
    | 'admin'
    | 'success'
    | 'warning'
    | 'error'
    | 'black'
    | 'white'
    | string;
  className?: string;
  iconLeft?: React.SVGProps<SVGSVGElement>;
  onClick?: () => void;
};

const Link = ({ href, children, iconLeft, ...props }: LinkProps) => {
  return (
    <Wrapper {...props}>
      <RouterLink to={href}>
        {iconLeft && <span className='icon left'>{iconLeft}</span>}
        {children}
      </RouterLink>
    </Wrapper>
  );
};

export default Link;
