import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Signup as SignupIllustration, Logo } from '../../../assets';
import { Box, Button, Input, Link, Text, Alert } from '../../../components';
import { theme } from '../../../themes';
import { Wrapper } from './styles';
import {
  SignupMutation,
  SignupMutationVariables,
} from '../../../graphql/types';
import { SIGNUP } from '../../../graphql/auth.api';
import { roleVar, tokenVar, userVar } from '../../../graphql/state';

const Signup = () => {
  const history = useHistory();
  const [error, setError] = useState<string>('');

  const [signup, { loading }] = useMutation<
    SignupMutation,
    SignupMutationVariables
  >(SIGNUP, {
    onCompleted({ signup: { token, user } }) {
      roleVar('client');
      tokenVar(token);
      userVar(user);
      localStorage.setItem('token', token);
      history.push('/additional-info');
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
      signup({ variables: { email, password } });
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
              Signup
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
                error={form.touched.email && !!form.errors.email}
                errorMessage={form.errors.email}
              />
              <Input
                label='Password'
                name='password'
                type='password'
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.touched.password && !!form.errors.password}
                errorMessage={form.errors.password}
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
                  type='submit'
                  color='client'
                  text='Signup'
                  loading={loading}
                  disabled={loading}
                />
                {/* <Button
                  variant='secondary-action'
                  fullWidth
                  color='client'
                  text='Signup with Google'
                  iconLeft={<Google />}
                /> */}
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
