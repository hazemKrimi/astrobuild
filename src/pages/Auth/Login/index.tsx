import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { tokenVar, roleVar, userVar } from '../../../graphql/state';
import { Login as LoginIllustration, Logo } from '../../../assets';
import { Alert, Box, Button, Input, Link, Text } from '../../../components';
import { theme } from '../../../themes';
import { Wrapper } from './styles';
import { LOGIN } from '../../../graphql/auth.api';
import { LoginMutation, LoginMutationVariables } from '../../../graphql/types';

const Login = () => {
  const history = useHistory();
  const [error, setError] = useState<string>('');

  const [login, { loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN, {
    onCompleted({ login: { user, token } }) {
      switch (user.role) {
        case 'Client':
          roleVar('client');
          break;
        case 'ProductOwner':
          roleVar('productOwner');
          break;
        case 'Developer':
          roleVar('developer');
          break;
        case 'Admin':
          roleVar('admin');
          break;
        default:
          break;
      }
      tokenVar(token);
      userVar(user);
      localStorage.setItem('token', token);
      history.push('/');
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password is 6 characters minimum'),
    }),
    onSubmit: ({ email, password }) => {
      login({ variables: { email, password } });
    },
  });

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
          </Box>
          <Box
            display='grid'
            gridTemplateColumns='auto 1fr'
            columnGap='1rem'
            alignItems='center'
          >
            <Text variant='headline' weight='bold'>
              Login
            </Text>
            {error && <Alert color='error' text={error} />}
          </Box>
          <form onSubmit={form.handleSubmit}>
            <Box
              display='grid'
              gridTemplateColumns='auto'
              alignItems='center'
              rowGap='0.5rem'
              padding='1.563rem 0rem'
            >
              <Input
                label='Email'
                name='email'
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.errors.email}
                errorMessage={form.errors.email}
              />
              <Input
                label='Password'
                name='password'
                type='password'
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.errors.password}
                errorMessage={form.errors.password}
              />
              <Box textAlign='right'>
                <Link href='/forgot-password'>Forgot Password</Link>
              </Box>
              <Box display='grid' gridTemplateColumns='auto' rowGap='1rem'>
                <Button
                  variant='primary-action'
                  fullWidth
                  color='client'
                  text='Login'
                  type='submit'
                  loading={loading}
                  disabled={loading}
                />
                {/* <Button
                  variant='secondary-action'
                  fullWidth
                  color='client'
                  text='Login with Google'
                  iconLeft={<Google />}
                /> */}
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
          </form>
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

export default Login;
