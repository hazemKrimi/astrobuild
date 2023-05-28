import { Box, Text } from '..';
import { Backend } from '../../assets';
import { FeatureOutput } from '../../graphql/types';

type BackendFeatureCardProps = {
  feature: FeatureOutput;
};

const BackendFeatureCard = ({ feature }: BackendFeatureCardProps) => {
  return (
    <Box
      padding='15px 10px'
      background='white'
      boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
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
        <Box>
          <Backend />
        </Box>
      </Box>
    </Box>
  );
};

export default BackendFeatureCard;
