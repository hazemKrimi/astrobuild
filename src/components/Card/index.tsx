import Box from '../Box';
import Text from '../Text';

import { theme } from '../../themes';

type CardProps = {
  title: string;
	description: string;
  selectable?: boolean;
  selected?: boolean;
  toggleSelect?: () => void;
  color: 'client' | 'productOwner' | 'developer' | 'admin';
};

const Card = ({
  title,
	description,
  selectable = false,
  selected = false,
  toggleSelect = () => {},
  color,
}: CardProps) => {
  return (
    <Box
      padding='10px'
      background='white'
      boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
      border={selected ? `2px solid ${theme.colors[color].main}` : undefined}
      onClick={selectable ? toggleSelect : () => {}}
      display='grid'
      gridTemplateRows='auto'
      alignItems='center'
      rowGap='10px'
      borderRadius='10px'
      cursor='pointer'
    >
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box flexGrow='1'>
          <Text variant='title' weight='bold'>
            {title}
          </Text>
        </Box>
      </Box>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box flexGrow='1'>
          <Text variant='body'>{description}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
