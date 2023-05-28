import { Box, Text } from '..';
import { CategoryOutput } from '../../graphql/types';
import { theme } from '../../themes';

type CategoryCardProps = {
  category: CategoryOutput;
  selectable?: boolean;
  selected?: boolean;
  toggleSelect?: () => void;
  color: 'client' | 'productOwner' | 'developer' | 'admin';
};

const CategoryCard = ({
  category,
  selectable = false,
  selected = false,
  toggleSelect = () => {},
  color,
}: CategoryCardProps) => {
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
            {category.name}
          </Text>
        </Box>
      </Box>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box flexGrow='1'>
          <Text variant='body'>{category.description}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryCard;
