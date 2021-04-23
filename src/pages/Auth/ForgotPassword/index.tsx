import { Login as LoginIllustration, Logo } from '../../../assets';
import { Box, Button, Input, Link, Text } from '../../../components';
import { theme } from '../../../themes';
import { Wrapper } from './styles';

const ForgotPassword = () => {
  return (
    <Wrapper>
      <Box
        display='grid'
        gridTemplateColumns='1fr 1.25fr'
        height='100vh'
        overflow='hidden'
      >
        <Box padding='3.438rem 4.375rem'>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            marginBottom='3.125rem'
          >
            <Box marginRight='0.625rem'>
              <Logo />
            </Box>
            <Text variant='headline' weight='bold'>
              astrobuild
            </Text>
          </Box>
          <Text variant='headline' weight='bold'>
            Forgot Password
          </Text>
          <Box
            display='grid'
            gridTemplateColumns='auto'
            alignItems='center'
            rowGap='0.5rem'
            padding='1.563rem 0rem'
          >
            <Input label='Email' name='email' value='' onChange={() => {}} />
            <Input label='Code' name='code' value='' onChange={() => {}} />
            <Box
              display='grid'
              gridTemplateColumns='auto'
              rowGap='1rem'
              marginTop='0.5rem'
            >
              <Button
                variant='primary-action'
                fullWidth
                color='client'
                text='Receive Code'
                onClick={() => {}}
              />
            </Box>
            <Box display='flex' flexDirection='row'>
              <Box flexGrow='1'>
                <Text variant='body' display='inline'>
                  Don’t have an account ?{' '}
                </Text>
                <Link href='/signup'>Signup</Link>
              </Box>
              <Link href='/' color='gray'>
                Build a Project
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          background={theme.colors.client.main}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Box>
            <LoginIllustration />
          </Box>
          <Box marginTop='1.563rem'>
            <Text color='white' variant='headline' align='center'>
              Make your idea alive
            </Text>
          </Box>
          <Box marginTop='0.938rem'>
            <Text
              color='rgba(255, 255, 255, 0.6)'
              variant='subheader'
              align='center'
            >
              Create your dream software with no coding skills
            </Text>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default ForgotPassword;
