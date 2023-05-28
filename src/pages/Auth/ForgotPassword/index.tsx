import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Login as LoginIllustration, Logo } from '../../../assets';
import { Box, Button, Input, Link, Text, Alert } from '../../../components';
import { RESET_PASSWORD } from '../../../graphql/auth.api';
import {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from '../../../graphql/types';
import { theme } from '../../../themes';
import { Wrapper } from './styles';

const ForgotPassword = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const [resetPassword, { loading }] = useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(RESET_PASSWORD, {
    onCompleted() {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info as string);
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
    }),
    onSubmit: ({ email }) => {
      resetPassword({ variables: { email } });
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
              Forgot Password
            </Text>
            {error && <Alert color='error' text={error} />}
            {success && (
              <Alert
                color='success'
                text='Check your email to recover your account'
              />
            )}
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
                  type='submit'
                  text='Send Reset Link'
                  loading={loading}
                  disabled={loading}
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

export default ForgotPassword;
