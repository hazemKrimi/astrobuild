import { JSX } from 'react';
import { theme } from '../../themes';

import Box from '../Box';
import Button from '../Button';
import Text from '../Text';

import { Wrapper } from './styles';

type ModalProps = {
  color: 'client' | 'productOwner' | 'developer' | 'admin';
  title: string;
  description: string;
  children?: React.ReactNode | JSX.Element | string;
  onConfirm: () => void;
  onClose: () => void;
};

const Modal = ({
  color,
  title,
  description,
  children,
  onConfirm,
  onClose,
}: ModalProps) => {
  return (
    <Wrapper>
      <Box
        background={theme.colors.white.main}
        borderRadius='10px'
        padding='20px'
        display='grid'
        gridTemplateRows='auto'
        alignItems='center'
        rowGap='1rem'
      >
        <Text variant='headline' weight='bold' color={color}>
          {title}
        </Text>
        <Text variant='body' color={theme.colors.black.main}>
          {description}
        </Text>
        {children}
        <Box
          display='grid'
          gridTemplateColumns='repeat(2, auto)'
          justifyContent='flex-end'
          columnGap='1rem'
        >
          <Button color={color} text='Confirm' onClick={onConfirm} />
          <Button color={color} text='Cancel' onClick={onClose} />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Modal;
