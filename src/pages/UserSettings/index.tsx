import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import { roleVar } from '../../graphql/state';
import {
  Box,
  Button,
  Text,
  SectionSelector,
  Input,
  Select,
  Alert,
  Spinner,
} from '../../components';
import { Wrapper } from './styles';
import { ArrowLeft, Empty, Profile, Security } from '../../assets';
import {
  UpdateUserInfoMutation,
  UpdateUserPasswordMutation,
  UpdateUserInfoMutationVariables,
  UpdateUserPasswordMutationVariables,
  GetCountryCodesQuery,
  GetCountryCodesQueryVariables,
  GetUserByIdQuery,
  GetUserByIdQueryVariables,
  UserOutput,
} from '../../graphql/types';
import {
  GET_COUNTRY_CODES,
  GET_USER_BY_ID,
  UPDATE_USER_INFO,
  UPDATE_USER_PASSWORD,
} from '../../graphql/auth.api';

const UserSettings = () => {
  const navigate = useNavigate();
  const role = useReactiveVar(roleVar);
  const [userToEdit, setUserToEdit] = useState<UserOutput>();
  const { id } = useParams<{ id: string }>();
  const [selectedSection, setSelectedSection] = useState<
    'general' | 'security'
  >('general');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const { data: countryCodes, loading: countryCodesLoading } = useQuery<
    GetCountryCodesQuery,
    GetCountryCodesQueryVariables
  >(GET_COUNTRY_CODES);
  const { loading: userInfoLoading, error: userInforError } = useQuery<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >(GET_USER_BY_ID, {
    variables: {
      id: id as string,
    },
    onCompleted({ getUserById }) {
      setUserToEdit(getUserById);
    },
  });

  const [updateUserInfo, { loading: generalLoading }] = useMutation<
    UpdateUserInfoMutation,
    UpdateUserInfoMutationVariables
  >(UPDATE_USER_INFO, {
    onCompleted({ updateUserInfo: user }) {
      setUserToEdit(user);
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
      setError(graphQLErrors[0]?.extensions?.info as string);
      setTimeout(() => setError(''), 3000);
    },
  });

  const generalForm = useFormik({
    initialValues: {
      firstName: userToEdit?.firstName || '',
      lastName: userToEdit?.lastName || '',
      prefix: userToEdit?.phone.prefix || '',
      number: userToEdit?.phone.number || '',
      place: userToEdit?.address.place || '',
      city: userToEdit?.address.city || '',
      zip: userToEdit?.address.zip || '',
      country: userToEdit?.address.country || '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      prefix: Yup.string().required('Prefix is required'),
      // prettier-ignore
      number: Yup.number().typeError('Phone must be a number').required('Phone is required'),
      place: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      // prettier-ignore
      zip: Yup.number().typeError('Zip must be a number').required('Zip is required'),
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
          user: {
            id: userToEdit?.id!,
            email: userToEdit?.email!,
            firstName,
            lastName,
            phone: { prefix, number },
            address: { place, city, country, zip },
            role: userToEdit?.role!,
          },
        },
      }),
    enableReinitialize: true,
  });

  const [updateUserPassword, { loading: securityLoading }] = useMutation<
    UpdateUserPasswordMutation,
    UpdateUserPasswordMutationVariables
  >(UPDATE_USER_PASSWORD, {
    onCompleted({ updateUserPassword: user }) {
      setUserToEdit(user);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info as string);
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
        .required('Old password is required')
        .min(6, 'Old password is 6 characters minimum'),
      newPassword: Yup.string()
        .required('New password is required')
        .notOneOf(
          [Yup.ref('oldPassword')],
          'New password should not be old password'
        )
        .required('New password is required')
        .min(6, 'New password is 6 characters minimum'),
      confirmNewPassword: Yup.string()
        .required('Confirm new password is required')
        .oneOf(
          [Yup.ref('newPassword')],
          "Confirm new password doesn't match with new password"
        ),
    }),
    onSubmit: ({ oldPassword, newPassword }) =>
      updateUserPassword({
        variables: {
          id: userToEdit?.id!,
          password: { oldPassword, newPassword },
        },
      }),
  });

  if (role !== 'admin') return (
    <Navigate to='/' />
  )

  if (userInforError || !userToEdit) return (
    <Wrapper color={role}>
      <Box
        width='100%'
        height='100vh'
        display='grid'
        alignItems='center'
        justifyContent='center'
      >
        <Box>
          <Empty />
        </Box>
      </Box>
    </Wrapper>
  );

  return (
    <Wrapper>
      <Box>
        <Button
          text='Back'
          color={role || 'client'}
          size='small'
          onClick={() => navigate(-1)}
          iconLeft={<ArrowLeft />}
        />
        <Text variant='headline' weight='bold'>
          Edit
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
            <>
              {!countryCodesLoading && !userInfoLoading ? (
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
                      color={role || 'client'}
                      value={generalForm.values.firstName}
                      onChange={generalForm.handleChange}
                      onBlur={generalForm.handleBlur}
                      error={
                        generalForm.touched.firstName &&
                        !!generalForm.errors.firstName
                      }
                      errorMessage={generalForm.errors.firstName}
                    />
                    <Input
                      name='lastName'
                      label='Last Name'
                      color={role || 'client'}
                      value={generalForm.values.lastName}
                      onChange={generalForm.handleChange}
                      onBlur={generalForm.handleBlur}
                      error={
                        generalForm.touched.lastName &&
                        !!generalForm.errors.lastName
                      }
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
                        color={role || 'client'}
                        options={
                          countryCodes?.getCountryCode
                            ? countryCodes.getCountryCode.map(
                                ({ prefix, country }) => ({
                                  value: prefix,
                                  label: `+${prefix} (${country})`,
                                })
                              )
                            : [{ value: '216', label: '+216' }]
                        }
                        onChange={generalForm.handleChange}
                        onBlur={generalForm.handleBlur}
                        value={generalForm.values.prefix}
                        select={generalForm.values.prefix}
                        error={
                          generalForm.touched.prefix &&
                          !!generalForm.errors.prefix
                        }
                        errorMessage={generalForm.errors.prefix}
                      />
                      <Input
                        name='number'
                        type='tel'
                        label='Phone'
                        color={role || 'client'}
                        onChange={generalForm.handleChange}
                        onBlur={generalForm.handleBlur}
                        value={generalForm.values.number}
                        error={
                          generalForm.touched.number &&
                          !!generalForm.errors.number
                        }
                        errorMessage={generalForm.errors.number}
                      />
                    </Box>
                    <Input
                      name='place'
                      label='Address'
                      color={role || 'client'}
                      onChange={generalForm.handleChange}
                      onBlur={generalForm.handleBlur}
                      value={generalForm.values.place}
                      error={
                        generalForm.touched.place && !!generalForm.errors.place
                      }
                      errorMessage={generalForm.errors.place}
                    />
                    <Input
                      name='city'
                      label='City'
                      color={role || 'client'}
                      onChange={generalForm.handleChange}
                      onBlur={generalForm.handleBlur}
                      value={generalForm.values.city}
                      error={
                        generalForm.touched.city && !!generalForm.errors.city
                      }
                      errorMessage={generalForm.errors.city}
                    />
                    <Box
                      display='grid'
                      gridTemplateColumns='2fr 1fr'
                      columnGap='10px'
                    >
                      <Select
                        name='country'
                        label='Country'
                        color={role || 'client'}
                        options={
                          countryCodes?.getCountryCode
                            ? countryCodes.getCountryCode.map(
                                ({ country }) => ({
                                  value: country,
                                  label: country,
                                })
                              )
                            : [{ value: 'Tunisia', label: 'Tunisia' }]
                        }
                        onChange={generalForm.handleChange}
                        onBlur={generalForm.handleBlur}
                        value={generalForm.values.country}
                        select={generalForm.values.country}
                        error={
                          generalForm.touched.country &&
                          !!generalForm.errors.country
                        }
                        errorMessage={generalForm.errors.country}
                      />
                      <Input
                        name='zip'
                        label='Zip Code'
                        color={role || 'client'}
                        onChange={generalForm.handleChange}
                        onBlur={generalForm.handleBlur}
                        value={generalForm.values.zip}
                        error={
                          generalForm.touched.zip && !!generalForm.errors.zip
                        }
                        errorMessage={generalForm.errors.zip}
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
                        color={role || 'client'}
                        text='Save'
                        type='submit'
                        loading={generalLoading}
                        disabled={generalLoading}
                      />
                    </Box>
                  </Box>
                </form>
              ) : (
                <Box display='grid' alignItems='center' justifyContent='center'>
                  <Spinner color={role || 'client'} />
                </Box>
              )}
            </>
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
                  color={role || 'client'}
                  type='password'
                  value={securityForm.values.oldPassword}
                  onChange={securityForm.handleChange}
                  onBlur={securityForm.handleBlur}
                  error={
                    securityForm.touched.oldPassword &&
                    !!securityForm.errors.oldPassword
                  }
                  errorMessage={securityForm.errors.oldPassword}
                />
                <Input
                  name='newPassword'
                  label='New Password'
                  color={role || 'client'}
                  type='password'
                  value={securityForm.values.newPassword}
                  onChange={securityForm.handleChange}
                  onBlur={securityForm.handleBlur}
                  error={
                    securityForm.touched.newPassword &&
                    !!securityForm.errors.newPassword
                  }
                  errorMessage={securityForm.errors.newPassword}
                />
                <Input
                  name='confirmNewPassword'
                  label='Confirm New Password'
                  color={role || 'client'}
                  type='password'
                  value={securityForm.values.confirmNewPassword}
                  onChange={securityForm.handleChange}
                  onBlur={securityForm.handleBlur}
                  error={
                    securityForm.touched.confirmNewPassword &&
                    !!securityForm.errors.confirmNewPassword
                  }
                  errorMessage={securityForm.errors.confirmNewPassword}
                />
                <Box
                  marginTop='0.5rem'
                  display='flex'
                  justifyContent='flex-end'
                >
                  <Button
                    variant='primary-action'
                    color={role || 'client'}
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

export default UserSettings;
