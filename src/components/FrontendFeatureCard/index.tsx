import { Handle, Position } from 'reactflow';
import { Box, Text } from '..';
import { FeatureOutput } from '../../graphql/types';

type FrontendFeatureCardProps = {
  data: FeatureOutput;
  isConnectable?: boolean;
  className?: string;
};

const FrontendFeatureCard = ({
  data,
  isConnectable = false,
  className,
}: FrontendFeatureCardProps) => {
  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
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
        textAlign='left'
      >
        <Box display='flex' flexDirection='row' alignItems='center'>
          <Box flexGrow='1'>
            <Text variant='title' weight='bold'>
              {data.name}
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
          {data.wireframes?.map((wireframe) => (
            <img
              src={wireframe.src}
              alt={wireframe.name}
              key={wireframe.id}
              style={{ width: '100px', height: 'auto', marginRight: '10px' }}
            />
          ))}
        </Box>
      </Box>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </>
  );
};

export default FrontendFeatureCard;
