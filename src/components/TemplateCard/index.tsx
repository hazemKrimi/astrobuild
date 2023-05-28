import { Box, Text } from '..';
import { TemplateOutput } from '../../graphql/types';
import { theme } from '../../themes';

type TemplateCardProps = {
  template: TemplateOutput;
  selectable?: boolean;
  selected?: boolean;
  toggleSelect?: () => void;
  color: 'client' | 'productOwner' | 'developer' | 'admin';
};

const TemplateCard = ({
  template,
  selectable = false,
  selected = false,
  toggleSelect = () => {},
  color,
}: TemplateCardProps) => {
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
            {template.name}
          </Text>
        </Box>
      </Box>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box flexGrow='1'>
          <Text variant='body'>{template.description}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default TemplateCard;
