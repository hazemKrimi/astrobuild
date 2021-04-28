import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Login as LoginIllustration, Logo } from '../../../assets';
import { Box, Button, Input, Text, Alert } from '../../../components';
import { CONFIRM_USER_RESET_PASSWORD } from '../../../graphql/auth.api';
import {
  ConfirmUserResetPasswordMutation,
  ConfirmUserResetPasswordMutationVariables,
} from '../../../graphql/types';
import { theme } from '../../../themes';
import { Wrapper } from './styles';

const RecoverAccount = () => {
  const params = new URLSearchParams(window.location.search);
  const history = useHistory();
  const [error, setError] = useState<string>('');

  const [confirmResetPassword, { loading }] = useMutation<
    ConfirmUserResetPasswordMutation,
    ConfirmUserResetPasswordMutationVariables
  >(CONFIRM_USER_RESET_PASSWORD, {
    onCompleted() {
      history.push('/login');
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  const form = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string()
        .required('New password is required')
        .min(6, 'new Password is 6 characters minimum'),
      confirmNewPassword: Yup.string().oneOf(
        [Yup.ref('newPassword')],
        "Passwords don't match"
      ),
    }),
    onSubmit: ({ newPassword }) => {
      confirmResetPassword({
        // eslint-disable-next-line
        variables: { id: params.get('code')!, password: newPassword },
      });
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
              Recover Account
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
                label='New Password'
                name='newPassword'
                value={form.values.newPassword}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.errors.newPassword}
                errorMessage={form.errors.newPassword}
              />
              <Input
                label='Confirm New Password'
                name='confirmNewPassword'
                value={form.values.confirmNewPassword}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.errors.confirmNewPassword}
                errorMessage={form.errors.confirmNewPassword}
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
                  text='Recover Account'
                  type='submit'
                  loading={loading}
                  disabled={loading}
                />
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

export default RecoverAccount;
