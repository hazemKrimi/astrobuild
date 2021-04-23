import { Box, Button, Input, Select, Text } from '../../../components';
import { theme } from '../../../themes';
import { Wrapper } from './styles';

const AdditionalInfo = () => {
  return (
    <Wrapper>
      <Box
        display='grid'
        alignItems='center'
        justifyContent='center'
        padding='100px 300px'
      >
        <Box
          background={theme.colors.white.main}
          padding='80px 175px'
          borderRadius='5px'
        >
          <Box marginBottom='35px' textAlign='center'>
            <Text variant='headline' weight='bold'>
              Tell us more about yourself
            </Text>
          </Box>
          <Box
            display='grid'
            gridTemplateColumns='auto'
            rowGap='0.5rem'
            position='relative'
          >
            <Input
              name='firstName'
              label='First Name'
              value=''
              onChange={() => {}}
            />
            <Input
              name='lastName'
              label='Last Name'
              value=''
              onChange={() => {}}
            />
            <Box
              display='grid'
              gridTemplateColumns='1fr 1.5fr'
              columnGap='10px'
            >
              <Select
                name='coutryConde'
                label='Country Code'
                options={[{ value: '+216', label: '+216' }]}
                onChange={() => {}}
                value=''
              />
              <Input
                name='phone'
                type='tel'
                label='Phone'
                value=''
                onChange={() => {}}
              />
            </Box>
            <Input
              name='address'
              label='Address'
              value=''
              onChange={() => {}}
            />
            <Input
              name='country'
              label='Country'
              value=''
              onChange={() => {}}
            />
            <Box display='grid' gridTemplateColumns='2fr 1fr' columnGap='10px'>
              <Input name='city' label='City' value='' onChange={() => {}} />
              <Input
                name='zipCode'
                label='Zip Code'
                value=''
                onChange={() => {}}
              />
            </Box>
            <Box marginTop='0.5rem'>
              <Button
                fullWidth
                variant='primary-action'
                color='client'
                text='Done'
                onClick={() => {}}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default AdditionalInfo;
