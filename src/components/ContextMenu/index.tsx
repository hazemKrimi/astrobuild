import { useEffect, useRef, useState } from 'react';

import { Wrapper } from './styles';

import Text from '../Text';

type ContextMenuProps = {
  className?: string;
  items: Array<{ label: string; action?: () => void }>;
  component: string;
};

const ContextMenu = ({ items, component, className }: ContextMenuProps) => {
  const [open, setOpen] = useState(false);
  const parentComponentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    parentComponentRef.current = document.querySelector(`#${component}`) as HTMLDivElement;

    const openMenu = () => setOpen(true);
    const closeMenu = () => setOpen(false);

    parentComponentRef.current?.addEventListener(
      'mouseenter',
      openMenu
    );
    parentComponentRef.current?.addEventListener(
      'mouseleave',
      closeMenu
    );

    return () => {
      parentComponentRef.current?.removeEventListener('mouseenter', openMenu);
      parentComponentRef.current?.removeEventListener('mouseleave', closeMenu);
    };
  }, [component]);

  return (
    <Wrapper
      className={className}
      top={(parentComponentRef.current as HTMLDivElement)?.getBoundingClientRect().top + 30}
      left={(parentComponentRef.current as HTMLDivElement)?.getBoundingClientRect().left + 10}
    >
      {open && (
        <ul>
          {items.map(({ label, action }) => (
            <li
              onClick={() => {
                if (action) {
                  setOpen(false);
                  action();
                }
              }}
              key={label}
            >
              <Text variant='caption'>{label}</Text>
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

export default ContextMenu;
