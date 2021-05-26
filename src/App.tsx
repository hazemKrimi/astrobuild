import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import {
  ProtectedRoute,
  AuthRoute,
  Navbar,
  Sidebar,
  Spinner,
} from './components';
import { roleVar, tokenVar, userVar } from './graphql/state';
import {
  AdditionalInfo,
  ForgotPassword,
  Login,
  RecoverAccount,
  Signup,
  Project,
  Users,
  Settings,
  UserSettings,
  CreateUser,
  Template,
  Feature,
  Category,
  Prototype,
  AddCategory,
  AddFeature,
  CategorySettings,
  FeatureSettings,
} from './pages';
import { GetUserByIdQuery, GetUserByIdQueryVariables } from './graphql/types';
import { GET_USER_BY_ID } from './graphql/auth.api';

const App = () => {
  const token = useReactiveVar(tokenVar);
  const role = useReactiveVar(roleVar);
  const currentUser = useReactiveVar(userVar);

  const [getUserById, { loading }] = useLazyQuery<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >(GET_USER_BY_ID, {
    onCompleted({ getUserById: user }) {
      userVar(user);
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
    },
  });

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');

    if (localStorageToken) {
      const { id } = jwtDecode<{ id: string; role: string }>(localStorageToken);

      getUserById({ variables: { id } });
      tokenVar(localStorageToken);
    }

    // eslint-disable-next-line
  }, []);

  return !loading ? (
    <>
      {token && currentUser?.firstName && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}
      <Switch>
        <ProtectedRoute path='/' exact>
          {role !== 'admin' ? (
            <Redirect to='/project' />
          ) : (
            <Redirect to='/clients' />
          )}
        </ProtectedRoute>
        <ProtectedRoute path='/project' exact>
          <Project />
        </ProtectedRoute>
        <ProtectedRoute path='/project/:id' exact>
          <Project />
        </ProtectedRoute>
        <ProtectedRoute path='/template' exact>
          <Template />
        </ProtectedRoute>
        <ProtectedRoute path='/template/:id' exact>
          <Template />
        </ProtectedRoute>
        <ProtectedRoute path='/feature' exact>
          <Feature />
        </ProtectedRoute>
        <ProtectedRoute path='/feature/:id' exact>
          <Feature />
        </ProtectedRoute>
        <ProtectedRoute path='/add-feature' exact>
          <AddFeature />
        </ProtectedRoute>
        <ProtectedRoute path='/feature-settings/:id' exact>
          <FeatureSettings />
        </ProtectedRoute>
        <ProtectedRoute path='/category' exact>
          <Category />
        </ProtectedRoute>
        <ProtectedRoute path='/category/:id' exact>
          <Category />
        </ProtectedRoute>
        <ProtectedRoute path='/add-category' exact>
          <AddCategory />
        </ProtectedRoute>
        <ProtectedRoute path='/category-settings/:id' exact>
          <CategorySettings />
        </ProtectedRoute>
        <ProtectedRoute path='/prototype/:id' exact>
          <Prototype />
        </ProtectedRoute>
        <ProtectedRoute path='/clients' exact>
          <Users />
        </ProtectedRoute>
        <ProtectedRoute path='/product-owners' exact>
          <Users />
        </ProtectedRoute>
        <ProtectedRoute path='/developers' exact>
          <Users />
        </ProtectedRoute>
        <ProtectedRoute path='/create-user/:role' exact>
          <CreateUser />
        </ProtectedRoute>
        <ProtectedRoute path='/user-settings/:id' exact>
          <UserSettings />
        </ProtectedRoute>
        <ProtectedRoute path='/settings' exact>
          <Settings />
        </ProtectedRoute>
        <AuthRoute path='/login' exact>
          <Login />
        </AuthRoute>
        <AuthRoute path='/signup' exact>
          <Signup />
        </AuthRoute>
        <ProtectedRoute path='/additional-info' exact>
          <AdditionalInfo />
        </ProtectedRoute>
        <AuthRoute path='/forgot-password' exact>
          <ForgotPassword />
        </AuthRoute>
        <AuthRoute path='/recover-account' exact>
          <RecoverAccount />
        </AuthRoute>
      </Switch>
    </>
  ) : (
    <Spinner fullScreen color={role || 'client'} />
  );
};

export default App;
