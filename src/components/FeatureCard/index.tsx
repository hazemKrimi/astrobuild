import { Box, Text } from '..';
import { Backend, Frontend } from '../../assets';
import { FeatureOutput } from '../../graphql/types';

type FeatureCardProps = {
  feature: FeatureOutput;
  selectable?: boolean;
  selected?: boolean;
  toggleSelect?: () => void;
};

const FeatureCard = ({
  feature,
  selectable = false,
  selected = false,
  toggleSelect = () => {},
}: FeatureCardProps) => {
  return (
    <Box
      padding='10px'
      background='white'
      boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
      border={selected ? '2px solid #3CC13B' : undefined}
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
            {feature.name}
          </Text>
        </Box>
        <Box display='flex' flexDirection='row' alignItems='center'>
          <Box
            marginRight={
              feature.featureType === 'fullstack' ? '10px' : undefined
            }
          >
            {feature.featureType === 'frontend' ||
              (feature.featureType === 'fullstack' && <Frontend />)}
          </Box>
          <Box>
            {feature.featureType === 'backend' ||
              (feature.featureType === 'fullstack' && <Backend />)}
          </Box>
        </Box>
      </Box>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box flexGrow='1'>
          <Text variant='body'>{feature.description}</Text>
        </Box>
        <Box>
          <Text variant='title'>${feature.price}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default FeatureCard;
