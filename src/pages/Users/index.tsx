import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation, useLazyQuery, useReactiveVar } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router';
import { roleVar } from '../../graphql/state';
import { Add, Delete, Edit, Empty } from '../../assets';
import {
  Box,
  Button,
  Spinner,
  Text,
  Modal,
  Input,
  Alert,
} from '../../components';
import { Wrapper } from './styles';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetAllUsersQuery,
  GetAllUsersQueryVariables,
  UserResponseModel,
} from '../../graphql/types';
import { GET_ALL_USERS } from '../../graphql/admin.api';
import { DELETE_USER } from '../../graphql/auth.api';

const Users = () => {
  const role = useReactiveVar(roleVar);
  const history = useHistory();
  const location = useLocation();
  const [users, setUsers] = useState<Array<UserResponseModel>>();
  const [userToDelete, setUserToDelete] = useState<UserResponseModel>();
  const [error, setError] = useState<string>('');
  const [deleteAccountModal, setDeleteAccountModal] = useState<boolean>(false);

  const [getUsers, { loading }] = useLazyQuery<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >(GET_ALL_USERS, {
    onCompleted({ getAllUsers }) {
      const userRole =
        location.pathname === '/clients'
          ? 'Client'
          : location.pathname === '/product-owners'
          ? 'ProductOwner'
          : 'Developer';
      setUsers(getAllUsers.filter((user) => user.role === userRole));
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    getUsers();

    // eslint-disable-next-line
  }, [location.pathname]);

  const [deleteUser] = useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(DELETE_USER, {
    onCompleted() {
      setUsers(users?.filter((user) => user.id !== userToDelete?.id));
      setUserToDelete(undefined);
      setDeleteAccountModal(false);
    },
    onError({ graphQLErrors }) {
      setDeleteAccountModal(false);
      setError(graphQLErrors[0]?.extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  const deleteAccountForm = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password is 6 characters minimum'),
    }),
    onSubmit: ({ password }, { resetForm }) => {
      try {
        deleteUser({ variables: { id: userToDelete?.id!, password } });
      } finally {
        resetForm();
      }
    },
  });

  return role === 'admin' ? (
    <>
      {!loading ? (
        <>
          {deleteAccountModal && (
            <Modal
              color={role || 'client'}
              title='Delete Account'
              description='Enter password to confirm account deletion.
            If you delete your account you cannot recover any of your projects.'
              onClose={() => setDeleteAccountModal(false)}
              onConfirm={deleteAccountForm.handleSubmit}
            >
              <Input
                type='password'
                placeholder='Password'
                name='password'
                value={deleteAccountForm.values.password}
                onChange={deleteAccountForm.handleChange}
                onBlur={deleteAccountForm.handleBlur}
                color={role || 'client'}
                error={
                  deleteAccountForm.touched.password &&
                  !!deleteAccountForm.errors.password
                }
                errorMessage={deleteAccountForm.errors.password}
              />
            </Modal>
          )}
          {users && users.length > 0 ? (
            <Wrapper color={role} empty={false}>
              <Box width='100%' height='100vh' alignItems='center'>
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='center'
                  marginBottom='20px'
                >
                  <Box flexGrow={!error ? '1' : undefined}>
                    <Text variant='headline' weight='bold'>
                      {location.pathname === '/clients'
                        ? 'Clients'
                        : location.pathname === '/product-owners'
                        ? 'Product Owners'
                        : 'Developers'}
                    </Text>
                  </Box>
                  {error && (
                    <Box flexGrow='1' marginLeft='55px' marginRight='55px'>
                      <Alert color='error' text={error} />
                    </Box>
                  )}
                  <Button
                    color={role || 'client'}
                    variant='primary-action'
                    text={`New ${
                      location.pathname === '/clients'
                        ? 'Client'
                        : location.pathname === '/product-owners'
                        ? 'Product Owner'
                        : 'Developer'
                    }`}
                    iconLeft={<Add />}
                    onClick={() =>
                      history.push(
                        `/create-user/${
                          location.pathname === '/clients'
                            ? 'Client'
                            : location.pathname === '/product-owners'
                            ? 'ProductOwner'
                            : 'Developer'
                        }`
                      )
                    }
                  />
                </Box>
                <Box
                  padding='15px 20px'
                  borderRadius='10px'
                  boxShadow='1px 1px 10px 0px rgba(50, 59, 105, 0.25)'
                  display='grid'
                  gridTemplateColumns='repeat(5, 1fr)'
                  alignItems='center'
                  justifyContent='flex-start'
                  className='table-head'
                  marginBottom='20px'
                  columnGap='3rem'
                >
                  <Text variant='title'>First Name</Text>
                  <Text variant='title'>Last Name</Text>
                  <Text variant='title'>Email </Text>
                  <Text variant='title'>Phone </Text>
                  <Box justifySelf='flex-end'>
                    <Text variant='title'>Actions</Text>
                  </Box>
                </Box>
                <Box padding='10px 0px'>
                  {users.map((user) => (
                    <Box
                      key={user.id}
                      padding='15px 20px'
                      borderRadius='10px'
                      boxShadow='1px 1px 10px 0px rgba(50, 59, 105, 0.25)'
                      display='grid'
                      gridTemplateColumns='repeat(5, 1fr)'
                      alignItems='center'
                      justifyContent='flex-start'
                      marginBottom='20px'
                      columnGap='3rem'
                    >
                      <Text variant='headline' weight='bold'>
                        {user.firstName}
                      </Text>
                      <Text variant='headline' weight='bold'>
                        {user.lastName}
                      </Text>
                      <Text variant='headline' weight='bold'>
                        {user.email}
                      </Text>
                      <Text variant='headline' weight='bold'>
                        +{user.phone.prefix}
                        {user.phone.number}
                      </Text>
                      <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        justifySelf='flex-end'
                      >
                        <Box
                          onClick={() =>
                            history.push(`/user-settings/${user.id}`)
                          }
                          marginRight='15px'
                          cursor='pointer'
                        >
                          <Edit />
                        </Box>
                        <Box
                          onClick={() => {
                            setUserToDelete(user);
                            setDeleteAccountModal(true);
                          }}
                          cursor='pointer'
                        >
                          <Delete />
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Wrapper>
          ) : (
            <Wrapper color={role} empty>
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                marginBottom='20px'
                padding='35px 45px 0px 120px'
              >
                <Box flexGrow='1'>
                  <Text variant='headline' weight='bold'>
                    {location.pathname === '/clients'
                      ? 'Clients'
                      : location.pathname === '/product-owners'
                      ? 'Product Owners'
                      : 'Developers'}
                  </Text>
                </Box>
                <Button
                  color={role || 'client'}
                  variant='primary-action'
                  text={`New ${
                    location.pathname === '/clients'
                      ? 'Client'
                      : location.pathname === '/product-owners'
                      ? 'Product Owner'
                      : 'Developer'
                  }`}
                  iconLeft={<Add />}
                  onClick={() =>
                    history.push(
                      `/create-user/${
                        location.pathname === '/clients'
                          ? 'Client'
                          : location.pathname === '/product-owners'
                          ? 'ProductOwner'
                          : 'Developer'
                      }`
                    )
                  }
                />
              </Box>
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
          )}
        </>
      ) : (
        <Spinner fullScreen color={role || 'client'} />
      )}
    </>
  ) : (
    <Redirect to='/clients' />
  );
};

export default Users;
