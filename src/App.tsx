import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { Routes, Navigate } from 'react-router-dom';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import {
  ProtectedRoute,
  PublicRoute,
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
  AddTemplate,
  CategorySettings,
  FeatureSettings,
  TemplateSettings,
  AddProject,
  UpdateProject,
  Payments,
  SupportMessaging,
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
      <Routes>
        <ProtectedRoute path='/'>
          {role !== 'admin' ? (
            <Navigate to='/project' />
          ) : (
            <Navigate to='/clients' />
          )}
        </ProtectedRoute>
        <ProtectedRoute path='/project'>
          <Project />
        </ProtectedRoute>
        <ProtectedRoute path='/project/:id'>
          <Project />
        </ProtectedRoute>
        <ProtectedRoute path='/payments/:id'>
          <Payments />
        </ProtectedRoute>
        <ProtectedRoute path='/add-project'>
          <AddProject />
        </ProtectedRoute>
        <ProtectedRoute path='/project-settings/:id'>
          <UpdateProject />
        </ProtectedRoute>
        <ProtectedRoute path='/support-messaging/:project'>
          <SupportMessaging />
        </ProtectedRoute>
        <ProtectedRoute path='/support-messaging/:project/:id'>
          <SupportMessaging />
        </ProtectedRoute>
        <ProtectedRoute path='/template'>
          <Template />
        </ProtectedRoute>
        <ProtectedRoute path='/template/:id'>
          <Template />
        </ProtectedRoute>
        <ProtectedRoute path='/add-template'>
          <AddTemplate />
        </ProtectedRoute>
        <ProtectedRoute path='/template-settings/:id'>
          <TemplateSettings />
        </ProtectedRoute>
        <ProtectedRoute path='/add-template'>
          <AddTemplate />
        </ProtectedRoute>
        <ProtectedRoute path='/feature'>
          <Feature />
        </ProtectedRoute>
        <ProtectedRoute path='/feature/:id'>
          <Feature />
        </ProtectedRoute>
        <ProtectedRoute path='/add-feature'>
          <AddFeature />
        </ProtectedRoute>
        <ProtectedRoute path='/feature-settings/:id'>
          <FeatureSettings />
        </ProtectedRoute>
        <ProtectedRoute path='/category'>
          <Category />
        </ProtectedRoute>
        <ProtectedRoute path='/category/:id'>
          <Category />
        </ProtectedRoute>
        <ProtectedRoute path='/add-category'>
          <AddCategory />
        </ProtectedRoute>
        <ProtectedRoute path='/category-settings/:id'>
          <CategorySettings />
        </ProtectedRoute>
        <ProtectedRoute path='/prototype/:id'>
          <Prototype />
        </ProtectedRoute>
        <ProtectedRoute path='/clients'>
          <Users />
        </ProtectedRoute>
        <ProtectedRoute path='/product-owners'>
          <Users />
        </ProtectedRoute>
        <ProtectedRoute path='/developers'>
          <Users />
        </ProtectedRoute>
        <ProtectedRoute path='/create-user/:role'>
          <CreateUser />
        </ProtectedRoute>
        <ProtectedRoute path='/user-settings/:id'>
          <UserSettings />
        </ProtectedRoute>
        <ProtectedRoute path='/settings'>
          <Settings />
        </ProtectedRoute>
        <PublicRoute path='/login'>
          <Login />
        </PublicRoute>
        <PublicRoute path='/signup'>
          <Signup />
        </PublicRoute>
        <ProtectedRoute path='/additional-info'>
          <AdditionalInfo />
        </ProtectedRoute>
        <PublicRoute path='/forgot-password'>
          <ForgotPassword />
        </PublicRoute>
        <PublicRoute path='/recover-account'>
          <RecoverAccount />
        </PublicRoute>
      </Routes>
    </>
  ) : (
    <Spinner fullScreen color={role || 'client'} />
  );
};

export default App;
