import { Google, Signup as SignupIllustration, Logo } from '../../../assets';
import { Box, Button, Input, Link, Text } from '../../../components';
import { theme } from '../../../themes';
import { Wrapper } from './styles';

const Signup = () => {
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
            Signup
          </Text>
          <Box
            display='grid'
            gridTemplateColumns='auto'
            alignItems='center'
            rowGap='0.5rem'
            padding='1.563rem 0rem'
          >
            <Input label='Email' name='email' value='' onChange={() => {}} />
            <Input
              label='Password'
              name='password'
              type='password'
              value=''
              onChange={() => {}}
            />
            <Box
              display='grid'
              gridTemplateColumns='auto'
              marginTop='0.5rem'
              rowGap='1rem'
            >
              <Button
                variant='primary-action'
                fullWidth
                color='client'
                text='Signup'
                onClick={() => {}}
              />
              <Button
                variant='secondary-action'
                fullWidth
                color='client'
                text='Signup with Google'
                iconLeft={<Google />}
                onClick={() => {}}
              />
            </Box>
            <Box display='flex' flexDirection='row'>
              <Box flexGrow='1'>
                <Text variant='body' display='inline'>
                  Already have an account ?{' '}
                </Text>
                <Link href='/login'>Login</Link>
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
            <SignupIllustration />
          </Box>
          <Box>
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

export default Signup;
