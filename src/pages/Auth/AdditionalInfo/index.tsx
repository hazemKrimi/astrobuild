import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useReactiveVar } from '@apollo/client';
import { Box, Button, Input, Select, Text, Alert } from '../../../components';
import { theme } from '../../../themes';
import { Wrapper } from './styles';
import {
  UpdateUserInfoMutation,
  UpdateUserInfoMutationVariables,
} from '../../../graphql/types';
import { UPDATE_USER_INFO } from '../../../graphql/auth.api';
import { userVar } from '../../../graphql/state';

const AdditionalInfo = () => {
  const history = useHistory();
  const [error, setError] = useState<string>('');
  const currentUser = useReactiveVar(userVar);

  const [updateUserInfo, { loading }] = useMutation<
    UpdateUserInfoMutation,
    UpdateUserInfoMutationVariables
  >(UPDATE_USER_INFO, {
    onCompleted({ updateUserInfo: user }) {
      userVar(user);
      history.push('/');
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  const form = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      prefix: '',
      number: '',
      place: '',
      city: '',
      zip: '',
      country: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      prefix: Yup.string().required('Prefix is required'),
      number: Yup.number().required('Number is required'),
      place: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
    }),
    onSubmit: (
      { firstName, lastName, prefix, number, place, city, country, zip },
      { resetForm }
    ) => {
      try {
        updateUserInfo({
          variables: {
            id: currentUser?.id!,
            email: currentUser?.email!,
            firstName,
            lastName,
            phone: { prefix, number },
            address: { place, city, country, zip },
          },
        });
      } catch (err) {
        setError(err.message);
        setTimeout(() => setError(''), 3000);
      } finally {
        resetForm();
      }
    },
  });

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
          <form onSubmit={form.handleSubmit}>
            <Box
              display='grid'
              gridTemplateColumns='auto'
              rowGap='0.5rem'
              position='relative'
            >
              <Input
                name='firstName'
                label='First Name'
                value={form.values.firstName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.errors.firstName}
                errorMessage={form.errors.firstName}
              />
              <Input
                name='lastName'
                label='Last Name'
                value={form.values.lastName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.errors.lastName}
                errorMessage={form.errors.lastName}
              />
              <Box
                display='grid'
                gridTemplateColumns='1fr 1.5fr'
                columnGap='10px'
              >
                <Select
                  name='prefix'
                  label='Country Code'
                  options={[
                    { value: '+216', label: '+216' },
                    { value: '+213', label: '+213' },
                  ]}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.prefix}
                />
                <Input
                  name='number'
                  type='tel'
                  label='Phone'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.number}
                />
              </Box>
              <Input
                name='place'
                label='Address'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.place}
              />
              <Input
                name='city'
                label='City'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.city}
              />
              <Box
                display='grid'
                gridTemplateColumns='2fr 1fr'
                columnGap='10px'
              >
                <Input
                  name='country'
                  label='Country'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.country}
                />
                <Input
                  name='zip'
                  label='Zip Code'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.zip}
                />
              </Box>
              <Box marginTop='0.5rem'>
                <Button
                  fullWidth
                  variant='primary-action'
                  color='client'
                  text='Done'
                  type='submit'
                  loading={loading}
                  disabled={loading}
                />
              </Box>
              {error && <Alert color='error' text={error} />}
            </Box>
          </form>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default AdditionalInfo;
