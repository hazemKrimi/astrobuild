import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { Protected, Public, Navbar, Sidebar, Spinner } from './components';
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
        <Route
          path='/'
          element={
            <Protected>
              {role !== 'admin' ? (
                <Navigate to='/project' />
              ) : (
                <Navigate to='/clients' />
              )}
            </Protected>
          }
        />
        <Route
          path='/project'
          element={
            <Protected>
              <Project />
            </Protected>
          }
        />
        <Route
          path='/project/:id'
          element={
            <Protected>
              <Project />
            </Protected>
          }
        />
        <Route
          path='/payments/:id'
          element={
            <Protected>
              <Payments />
            </Protected>
          }
        />
        <Route
          path='/add-project'
          element={
            <Protected>
              <AddProject />
            </Protected>
          }
        />
        <Route
          path='/project-settings/:id'
          element={
            <Protected>
              <UpdateProject />
            </Protected>
          }
        />
        <Route
          path='/support-messaging/:project'
          element={
            <Protected>
              <SupportMessaging />
            </Protected>
          }
        />
        <Route
          path='/support-messaging/:project/:id'
          element={
            <Protected>
              <SupportMessaging />
            </Protected>
          }
        />
        <Route
          path='/template'
          element={
            <Protected>
              <Template />
            </Protected>
          }
        />
        <Route
          path='/template/:id'
          element={
            <Protected>
              <Template />
            </Protected>
          }
        />
        <Route
          path='/add-template'
          element={
            <Protected>
              <AddTemplate />
            </Protected>
          }
        />
        <Route
          path='/template-settings/:id'
          element={
            <Protected>
              <TemplateSettings />
            </Protected>
          }
        />
        <Route
          path='/add-template'
          element={
            <Protected>
              <AddTemplate />
            </Protected>
          }
        />
        <Route
          path='/feature'
          element={
            <Protected>
              <Feature />
            </Protected>
          }
        />
        <Route
          path='/feature/:id'
          element={
            <Protected>
              <Feature />
            </Protected>
          }
        />
        <Route
          path='/add-feature'
          element={
            <Protected>
              <AddFeature />
            </Protected>
          }
        />
        <Route
          path='/feature-settings/:id'
          element={
            <Protected>
              <FeatureSettings />
            </Protected>
          }
        />
        <Route
          path='/category'
          element={
            <Protected>
              <Category />
            </Protected>
          }
        />
        <Route
          path='/category/:id'
          element={
            <Protected>
              <Category />
            </Protected>
          }
        />
        <Route
          path='/add-category'
          element={
            <Protected>
              <AddCategory />
            </Protected>
          }
        />
        <Route
          path='/category-settings/:id'
          element={
            <Protected>
              <CategorySettings />
            </Protected>
          }
        />
        <Route
          path='/prototype/:id'
          element={
            <Protected>
              <Prototype />
            </Protected>
          }
        />
        <Route
          path='/clients'
          element={
            <Protected>
              <Users />
            </Protected>
          }
        />
        <Route
          path='/product-owners'
          element={
            <Protected>
              <Users />
            </Protected>
          }
        />
        <Route
          path='/developers'
          element={
            <Protected>
              <Users />
            </Protected>
          }
        />
        <Route
          path='/create-user/:role'
          element={
            <Protected>
              <CreateUser />
            </Protected>
          }
        />
        <Route
          path='/user-settings/:id'
          element={
            <Protected>
              <UserSettings />
            </Protected>
          }
        />
        <Route
          path='/settings'
          element={
            <Protected>
              <Settings />
            </Protected>
          }
        />
        <Route
          path='/login'
          element={
            <Public>
              <Login />
            </Public>
          }
        />
        <Route
          path='/signup'
          element={
            <Public>
              <Signup />
            </Public>
          }
        />
        <Route
          path='/additional-info'
          element={
            <Protected>
              <AdditionalInfo />
            </Protected>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <Public>
              <ForgotPassword />
            </Public>
          }
        />
        <Route
          path='/recover-account'
          element={
            <Public>
              <RecoverAccount />
            </Public>
          }
        />
      </Routes>
    </>
  ) : (
    <Spinner fullScreen color={role || 'client'} />
  );
};

export default App;
