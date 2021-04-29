import { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { ProtectedRoute, AuthRoute } from './components';
import { tokenVar } from './graphql/state';
import {
  AdditionalInfo,
  ForgotPassword,
  Login,
  RecoverAccount,
  Signup,
  Main,
} from './pages';

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) tokenVar(token);
  }, []);

  return (
    <Switch>
      <ProtectedRoute path='/' exact>
        <Main />
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
  );
};

export default App;
