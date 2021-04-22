import { useEffect, useRef, useState } from 'react';
import { Wrapper } from './styles';
import { Text } from '..';

type ContextMenuProps = {
  className?: string;
  items: Array<{ label: string; action: () => void }>;
  component: string;
};

const ContextMenu = ({ items, component, className }: ContextMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openMenu = () => setOpen(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    (document.querySelector(`#${component}`) as HTMLElement)?.addEventListener(
      'mouseenter',
      openMenu
    );

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      (document.querySelector(
        `#${component}`
      ) as HTMLElement)?.removeEventListener('mouseenter', openMenu);
    };

    // eslint-disable-next-line
  }, [ref]);

  return (
    <Wrapper
      ref={ref}
      className={className}
      top={
        (document.querySelector(`#${component}`) as HTMLElement)?.offsetTop + 30
      }
      left={
        (document.querySelector(`#${component}`) as HTMLElement)?.offsetLeft +
        10
      }
    >
      {open && (
        <ul>
          {items.map(({ label, action }) => (
            // eslint-disable-next-line
            <li
              onClick={() => {
                setOpen(false);
                action();
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
