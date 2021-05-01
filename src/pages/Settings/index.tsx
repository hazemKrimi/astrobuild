import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import { useMutation, useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import { roleVar, userVar } from '../../graphql/state';
import {
  Box,
  Button,
  Text,
  SectionSelector,
  Input,
  Select,
  Alert,
} from '../../components';
import { Wrapper } from './styles';
import { ArrowLeft, Profile, Security } from '../../assets';
import {
  UpdateUserInfoMutation,
  UpdateUserPasswordMutation,
  UpdateUserInfoMutationVariables,
  UpdateUserPasswordMutationVariables,
} from '../../graphql/types';
import { UPDATE_USER_INFO, UPDATE_USER_PASSWORD } from '../../graphql/auth.api';

const Settings = () => {
  const history = useHistory();
  const role = useReactiveVar(roleVar);
  const currentUser = useReactiveVar(userVar);

  const [selectedSection, setSelectedSection] = useState<
    'general' | 'security'
  >('general');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const [updateUserInfo, { loading: generalLoading }] = useMutation<
    UpdateUserInfoMutation,
    UpdateUserInfoMutationVariables
  >(UPDATE_USER_INFO, {
    onCompleted({ updateUserInfo: user }) {
      userVar(user);
      generalForm.setFieldValue('firstName', user.firstName);
      generalForm.setFieldValue('lastName', user.lastName);
      generalForm.setFieldValue('prefix', user.phone.prefix);
      generalForm.setFieldValue('number', user.phone.number);
      generalForm.setFieldValue('place', user.address.place);
      generalForm.setFieldValue('city', user.address.city);
      generalForm.setFieldValue('zip', user.address.zip);
      generalForm.setFieldValue('country', user.address.country);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  const generalForm = useFormik({
    initialValues: {
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      prefix: currentUser?.phone.prefix || '',
      number: currentUser?.phone.number || '',
      place: currentUser?.address.place || '',
      city: currentUser?.address.city || '',
      zip: currentUser?.address.zip || '',
      country: currentUser?.address.country || '',
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
    onSubmit: ({
      firstName,
      lastName,
      prefix,
      number,
      place,
      city,
      country,
      zip,
    }) =>
      updateUserInfo({
        variables: {
          id: currentUser?.id!,
          email: currentUser?.email!,
          firstName,
          lastName,
          phone: { prefix, number },
          address: { place, city, country, zip },
        },
      }),
  });

  const [updateUserPassword, { loading: securityLoading }] = useMutation<
    UpdateUserPasswordMutation,
    UpdateUserPasswordMutationVariables
  >(UPDATE_USER_PASSWORD, {
    onCompleted({ updateUserPassword: user }) {
      userVar(user);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  const securityForm = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string()
        .required('Password is required')
        .min(6, 'Password is 6 characters minimum'),
      newPassword: Yup.string()
        .notOneOf(
          [Yup.ref('oldPassword')],
          'New password should not be old password'
        )
        .required('New password is required')
        .min(6, 'New password is 6 characters minimum'),
      confirmNewPassword: Yup.string().oneOf(
        [Yup.ref('newPassword')],
        "Confirm new password doesn't match with new password"
      ),
    }),
    onSubmit: ({ oldPassword, newPassword }) =>
      updateUserPassword({
        variables: {
          id: currentUser?.id!,
          password: { oldPassword, newPassword },
        },
      }),
  });

  return (
    <Wrapper>
      <Box>
        <Button
          text='Back'
          color={role || 'client'}
          size='small'
          onClick={() => history.goBack()}
          iconLeft={<ArrowLeft />}
        />
        <Text variant='headline' weight='bold'>
          Settings
        </Text>
      </Box>
      <Box
        display='grid'
        gridTemplateColumns='0.5fr 2fr'
        columnGap='25px'
        marginTop='1rem'
      >
        <Box display='grid' rowGap='0.5rem' gridTemplateRows='50px'>
          <SectionSelector
            icon={<Profile />}
            color={role || 'client'}
            text='General'
            selected={selectedSection === 'general'}
            onClick={() => setSelectedSection('general')}
          />
          <SectionSelector
            icon={<Security />}
            color={role || 'client'}
            text='Security'
            selected={selectedSection === 'security'}
            onClick={() => setSelectedSection('security')}
          />
        </Box>
        <Box
          background='white'
          boxShadow='1px 1px 10px 0px rgba(50, 59, 105, 0.25)'
          borderRadius='10px'
          width='100%'
          padding='30px'
        >
          <Box
            display='grid'
            gridTemplateColumns='auto 1fr'
            columnGap='1rem'
            alignItems='center'
            marginBottom='50px'
          >
            <Text variant='subheader' weight='bold'>
              {selectedSection === 'general' ? 'General' : 'Security'}
            </Text>
            {error && <Alert color='error' text={error} />}
            {success && (
              <Alert color='success' text='Account updated successfully' />
            )}
          </Box>
          {selectedSection === 'general' && (
            <form onSubmit={generalForm.handleSubmit}>
              <Box
                display='grid'
                gridTemplateColumns='auto'
                rowGap='0.5rem'
                position='relative'
              >
                <Input
                  name='firstName'
                  label='First Name'
                  value={generalForm.values.firstName}
                  onChange={generalForm.handleChange}
                  onBlur={generalForm.handleBlur}
                  error={!!generalForm.errors.firstName}
                  errorMessage={generalForm.errors.firstName}
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  value={generalForm.values.lastName}
                  onChange={generalForm.handleChange}
                  onBlur={generalForm.handleBlur}
                  error={!!generalForm.errors.lastName}
                  errorMessage={generalForm.errors.lastName}
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
                    onChange={generalForm.handleChange}
                    onBlur={generalForm.handleBlur}
                    value={generalForm.values.prefix}
                  />
                  <Input
                    name='number'
                    type='tel'
                    label='Phone'
                    onChange={generalForm.handleChange}
                    onBlur={generalForm.handleBlur}
                    value={generalForm.values.number}
                  />
                </Box>
                <Input
                  name='place'
                  label='Address'
                  onChange={generalForm.handleChange}
                  onBlur={generalForm.handleBlur}
                  value={generalForm.values.place}
                />
                <Input
                  name='city'
                  label='City'
                  onChange={generalForm.handleChange}
                  onBlur={generalForm.handleBlur}
                  value={generalForm.values.city}
                />
                <Box
                  display='grid'
                  gridTemplateColumns='2fr 1fr'
                  columnGap='10px'
                >
                  <Input
                    name='country'
                    label='Country'
                    onChange={generalForm.handleChange}
                    onBlur={generalForm.handleBlur}
                    value={generalForm.values.country}
                  />
                  <Input
                    name='zip'
                    label='Zip Code'
                    onChange={generalForm.handleChange}
                    onBlur={generalForm.handleBlur}
                    value={generalForm.values.zip}
                  />
                </Box>
                <Box
                  marginTop='0.5rem'
                  display='grid'
                  gridTemplateColumns='repeat(2, auto)'
                  justifyContent='flex-end'
                >
                  <Button
                    variant='primary-action'
                    color='client'
                    text='Save'
                    type='submit'
                    loading={generalLoading}
                    disabled={generalLoading}
                  />
                </Box>
              </Box>
            </form>
          )}
          {selectedSection === 'security' && (
            <form onSubmit={securityForm.handleSubmit}>
              <Box
                display='grid'
                gridTemplateColumns='auto'
                rowGap='0.5rem'
                position='relative'
              >
                <Input
                  name='oldPassword'
                  label='Old Password'
                  type='password'
                  value={securityForm.values.oldPassword}
                  onChange={securityForm.handleChange}
                  onBlur={securityForm.handleBlur}
                  error={!!securityForm.errors.oldPassword}
                  errorMessage={securityForm.errors.oldPassword}
                />
                <Input
                  name='newPassword'
                  label='New Password'
                  type='password'
                  value={securityForm.values.newPassword}
                  onChange={securityForm.handleChange}
                  onBlur={securityForm.handleBlur}
                  error={!!securityForm.errors.newPassword}
                  errorMessage={securityForm.errors.newPassword}
                />
                <Input
                  name='confirmNewPassword'
                  label='Confirm New Password'
                  type='password'
                  value={securityForm.values.confirmNewPassword}
                  onChange={securityForm.handleChange}
                  onBlur={securityForm.handleBlur}
                  error={!!securityForm.errors.confirmNewPassword}
                  errorMessage={securityForm.errors.confirmNewPassword}
                />
                <Box
                  marginTop='0.5rem'
                  display='flex'
                  justifyContent='space-between'
                >
                  <Button variant='text' color='error' text='Delete Account' />
                  <Button
                    variant='primary-action'
                    color='client'
                    text='Save'
                    type='submit'
                    loading={securityLoading}
                    disabled={securityLoading}
                  />
                </Box>
              </Box>
            </form>
          )}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Settings;
