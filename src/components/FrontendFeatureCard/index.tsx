import { Box, Text } from '..';
import { FeatureOutput } from '../../graphql/types';

type FrontendFeatureCardProps = {
  feature: FeatureOutput;
  className?: string;
};

const FrontendFeatureCard = ({
  feature,
  className,
}: FrontendFeatureCardProps) => {
  return (
    <Box
      className={className}
      padding='10px'
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
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        padding='5px 20px'
      >
        {feature.wireframes?.map((wireframe) => (
          <img
            src={wireframe.src}
            alt={wireframe.name}
            key={wireframe.id}
            style={{ width: '100px', height: 'auto', marginRight: '10px' }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FrontendFeatureCard;
