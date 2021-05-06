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
  selected?: boolean;
  className?: string;
  iconLeft?: React.SVGProps<SVGSVGElement>;
  onClick?: () => void;
};

const Link = ({
  href,
  children,
  iconLeft,
  selected = false,
  ...props
}: LinkProps) => {
  return (
    <Wrapper {...props} selected={selected}>
      <RouterLink to={href}>
        {iconLeft && <span className='icon left'>{iconLeft}</span>}
        {children}
      </RouterLink>
    </Wrapper>
  );
};

export default Link;
