import { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { ProtectedRoute, AuthRoute, Navbar, Sidebar } from './components';
import { roleVar, tokenVar } from './graphql/state';
import {
  AdditionalInfo,
  ForgotPassword,
  Login,
  RecoverAccount,
  Signup,
  Project,
  Settings,
} from './pages';

const App = () => {
  const token = useReactiveVar(tokenVar);
  const role = useReactiveVar(roleVar);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');

    if (localStorageToken) tokenVar(localStorageToken);
  }, []);

  return (
    <>
      {token && (
        <>
          <Navbar withSidebar={role !== 'admin'} />
          {role !== 'admin' && <Sidebar />}
        </>
      )}
      <Switch>
        <ProtectedRoute path='/' exact>
          <Project />
        </ProtectedRoute>
        <ProtectedRoute path='/project' exact>
          <Project />
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
        <AuthRoute path='/additional-info' exact>
          <AdditionalInfo />
        </AuthRoute>
        <AuthRoute path='/forgot-password' exact>
          <ForgotPassword />
        </AuthRoute>
        <AuthRoute path='/recover-account' exact>
          <RecoverAccount />
        </AuthRoute>
      </Switch>
    </>
  );
};

export default App;
