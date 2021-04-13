import { Wrapper } from './styles';

type TextProps = {
  children?: React.ReactNode | JSX.Element | string;
  className?: string;
  variant?: 'display' | 'headline' | 'title' | 'subheader' | 'body' | 'caption';
  color?: 'client' | 'productOwner' | 'developer' | 'admin' | string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  display?: 'initial' | 'block' | 'inline';
  gutterBottom?: boolean;
  lineThrough?: boolean;
  weight?: 'initial' | 'normal' | 'bold' | number;
};

const Text = ({
  children,
  variant = 'body',
  className,
  ...props
}: TextProps) => {
  return (
    <Wrapper className={`${variant} ${className}`} {...props}>
      {children}
    </Wrapper>
  );
};

export default Text;
