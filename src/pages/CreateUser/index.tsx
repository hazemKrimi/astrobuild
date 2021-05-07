import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Redirect, useHistory, useParams } from 'react-router';
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
import { ArrowLeft, Profile, Security } from '../../assets';
import {
  GetCountryCodesQuery,
  GetCountryCodesQueryVariables,
  CreateUserMutation,
  CreateUserMutationVariables,
} from '../../graphql/types';
import { GET_COUNTRY_CODES } from '../../graphql/auth.api';
import { CREATE_USER, GET_ALL_USERS } from '../../graphql/admin.api';

const CreateUser = () => {
  const history = useHistory();
  const { role: newUserRole } = useParams<{
    role: 'Client' | 'ProductOwner' | 'Developer';
  }>();
  const role = useReactiveVar(roleVar);
  const [newUser, setNewUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: {
      prefix: string;
      number: string;
    };
    address: {
      place: string;
      city: string;
      country: string;
      zip: string;
    };
    role: 'Client' | 'ProductOwner' | 'Developer';
  }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: {
      prefix: '',
      number: '',
    },
    address: {
      place: '',
      city: '',
      country: '',
      zip: '',
    },
    role: newUserRole,
  });

  const [selectedSection, setSelectedSection] = useState<
    'general' | 'security'
  >('general');
  const [error, setError] = useState<string>('');

  const [createUser, { loading: createUserLoading }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER, {
    onCompleted() {
      const location =
        newUserRole === 'Client'
          ? '/clients'
          : newUserRole === 'ProductOwner'
          ? '/product-owners'
          : '/developers';
      history.push(location);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
    refetchQueries: [{ query: GET_ALL_USERS }],
  });

  const generalForm = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
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
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
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
      email,
      prefix,
      number,
      place,
      city,
      country,
      zip,
    }) => {
      setNewUser({
        ...newUser,
        firstName,
        lastName,
        email,
        phone: { prefix, number },
        address: { place, city, country, zip },
      });
      setSelectedSection('security');
    },
    enableReinitialize: true,
  });

  const { data: countryCodes, loading: countryCodesLoading } = useQuery<
    GetCountryCodesQuery,
    GetCountryCodesQueryVariables
  >(GET_COUNTRY_CODES, {
    onCompleted({ getCountryCode }) {
      generalForm.setFieldValue('prefix', getCountryCode[0].prefix);
      generalForm.setFieldValue('country', getCountryCode[0].country);
    },
  });

  const securityForm = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password is 6 characters minimum'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf(
          [Yup.ref('password')],
          "Confirm new password doesn't match with new password"
        ),
    }),
    onSubmit: ({ password }) => {
      setNewUser({ ...newUser, password });
      createUser({ variables: { ...newUser } });
    },
  });

  return role === 'admin' ? (
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
          Create{' '}
          {newUserRole === 'ProductOwner' ? 'Product Owner' : newUserRole}
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
          />
          <SectionSelector
            icon={<Security />}
            color={role || 'client'}
            text='Security'
            selected={selectedSection === 'security'}
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
          </Box>
          {selectedSection === 'general' && (
            <>
              {!countryCodesLoading ? (
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
                    <Input
                      name='email'
                      label='Email'
                      color={role || 'client'}
                      value={generalForm.values.email}
                      onChange={generalForm.handleChange}
                      onBlur={generalForm.handleBlur}
                      error={
                        generalForm.touched.email && !!generalForm.errors.email
                      }
                      errorMessage={generalForm.errors.email}
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
                        text='Next'
                        type='submit'
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
                  name='password'
                  label='Password'
                  color={role || 'client'}
                  type='password'
                  value={securityForm.values.password}
                  onChange={securityForm.handleChange}
                  onBlur={securityForm.handleBlur}
                  error={
                    securityForm.touched.password &&
                    !!securityForm.errors.password
                  }
                  errorMessage={securityForm.errors.password}
                />
                <Input
                  name='confirmPassword'
                  label='Confirm Password'
                  color={role || 'client'}
                  type='password'
                  value={securityForm.values.confirmPassword}
                  onChange={securityForm.handleChange}
                  onBlur={securityForm.handleBlur}
                  error={
                    securityForm.touched.confirmPassword &&
                    !!securityForm.errors.confirmPassword
                  }
                  errorMessage={securityForm.errors.confirmPassword}
                />
                <Box
                  marginTop='0.5rem'
                  display='flex'
                  justifyContent='flex-end'
                >
                  <Box marginRight='15px' display='flex' alignItems='center'>
                    <Button
                      color={role || 'client'}
                      text='Previous'
                      type='submit'
                      onClick={() => setSelectedSection('general')}
                    />
                  </Box>
                  <Button
                    variant='primary-action'
                    color={role || 'client'}
                    text='Create'
                    type='submit'
                    loading={createUserLoading}
                    disabled={createUserLoading}
                  />
                </Box>
              </Box>
            </form>
          )}
        </Box>
      </Box>
    </Wrapper>
  ) : (
    <Redirect to='/' />
  );
};

export default CreateUser;
