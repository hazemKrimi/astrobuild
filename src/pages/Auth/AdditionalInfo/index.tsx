import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import {
  Box,
  Button,
  Input,
  Select,
  Text,
  Alert,
  Spinner,
} from '../../../components';
import { theme } from '../../../themes';
import { Wrapper } from './styles';
import {
  GetCountryCodesQuery,
  GetCountryCodesQueryVariables,
  UpdateUserInfoMutation,
  UpdateUserInfoMutationVariables,
} from '../../../graphql/types';
import { GET_COUNTRY_CODES, UPDATE_USER_INFO } from '../../../graphql/auth.api';
import { userVar } from '../../../graphql/state';

const AdditionalInfo = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const currentUser = useReactiveVar(userVar);
  const { data: countryCodes, loading: countryCodesLoading } = useQuery<
    GetCountryCodesQuery,
    GetCountryCodesQueryVariables
  >(GET_COUNTRY_CODES);

  const [updateUserInfo, { loading }] = useMutation<
    UpdateUserInfoMutation,
    UpdateUserInfoMutationVariables
  >(UPDATE_USER_INFO, {
    onCompleted({ updateUserInfo: user }) {
      userVar(user);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info as string);
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
      number: Yup.number()
        // prettier-ignore
        .typeError('Phone must be a number')
        .required('Phone is required'),
      place: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      zip: Yup.number()
        // prettier-ignore
        .typeError('Zip must be a number')
        .required('Zip is required'),
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
            id: currentUser?.id!,
            email: currentUser?.email!,
            firstName,
            lastName,
            phone: { prefix, number },
            address: { place, city, country, zip },
            role: currentUser?.role!,
          },
        },
      }),
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
          {!countryCodesLoading ? (
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
                  error={form.touched.firstName && !!form.errors.firstName}
                  errorMessage={form.errors.firstName}
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  value={form.values.lastName}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.touched.lastName && !!form.errors.lastName}
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
                    options={
                      countryCodes?.getCountryCode
                        ? [
                            {
                              value: '',
                              label: 'Choose',
                            },
                            ...countryCodes.getCountryCode.map(
                              ({ prefix, country }) => ({
                                value: prefix,
                                label: `+${prefix} (${country})`,
                              })
                            ),
                          ]
                        : [
                            {
                              value: '',
                              label: 'Choose',
                            },
                            { value: '216', label: '+216' },
                          ]
                    }
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.prefix}
                    error={form.touched.prefix && !!form.errors.prefix}
                    errorMessage={form.errors.prefix}
                  />
                  <Input
                    name='number'
                    type='tel'
                    label='Phone'
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.number}
                    error={form.touched.number && !!form.errors.number}
                    errorMessage={form.errors.number}
                  />
                </Box>
                <Input
                  name='place'
                  label='Address'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.place}
                  error={form.touched.place && !!form.errors.place}
                  errorMessage={form.errors.place}
                />
                <Input
                  name='city'
                  label='City'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.city}
                  error={form.touched.city && !!form.errors.city}
                  errorMessage={form.errors.city}
                />
                <Box
                  display='grid'
                  gridTemplateColumns='2fr 1fr'
                  columnGap='10px'
                >
                  <Select
                    name='country'
                    label='Country'
                    options={
                      countryCodes?.getCountryCode
                        ? [
                            {
                              value: '',
                              label: 'Choose',
                            },
                            ...countryCodes.getCountryCode.map(
                              ({ country }) => ({
                                value: country,
                                label: country,
                              })
                            ),
                          ]
                        : [
                            {
                              value: '',
                              label: 'Choose',
                            },
                            { value: 'Tunisia', label: 'Tunisia' },
                          ]
                    }
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.country}
                    error={form.touched.country && !!form.errors.country}
                    errorMessage={form.errors.country}
                  />
                  <Input
                    name='zip'
                    label='Zip Code'
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.zip}
                    error={form.touched.zip && !!form.errors.zip}
                    errorMessage={form.errors.zip}
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
          ) : (
            <Spinner fullScreen />
          )}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default AdditionalInfo;
