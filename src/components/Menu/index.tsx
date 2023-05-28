import { useEffect, useRef, useState } from 'react';
import { Wrapper } from './styles';
import { Text } from '..';

type MenuProps = {
  className?: string;
  items: Array<{
    icon: React.FunctionComponentElement<React.SVGProps<SVGSVGElement>>;
    avoid?: boolean;
    label: string;
    action?: () => void;
  }>;
  component: string;
};

const Menu = ({ items, component, className }: MenuProps) => {
  const [open, setOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const parentComponentRef = useRef<HTMLDivElement>();

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    parentComponentRef.current = document.querySelector(`#${component}`) as HTMLDivElement;

    parentComponentRef.current?.addEventListener('mouseenter', openMenu);
    componentRef.current?.addEventListener('mouseleave', closeMenu);

    return () => {
      parentComponentRef.current?.removeEventListener('mouseenter', openMenu);
      componentRef.current?.removeEventListener('mouseleave', closeMenu);
    };
  }, []);

  return (
    <Wrapper
      ref={componentRef}
      className={className}
      top={
        (parentComponentRef.current as HTMLDivElement)?.getBoundingClientRect().top + 30
      }
      left={
        (parentComponentRef.current as HTMLDivElement)?.getBoundingClientRect()?.left
      }
    >
      {open && (
        <ul>
          {items.map(({ icon, label, avoid, action }) => (
            <li
              onClick={() => {
                if (action) {
                  setOpen(false);
                  action();
                }
              }}
              key={label}
            >
              <span className={`icon ${avoid ? 'avoid' : ''}`}>{icon}</span>
              <Text color={avoid ? 'error' : undefined}>{label}</Text>
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

export default Menu;
