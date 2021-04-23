import { Redirect, Route, Switch } from 'react-router-dom';
import {
  AdditionalInfo,
  ForgotPassword,
  Login,
  RecoverAccount,
  Signup,
} from './pages';

const App = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <Redirect to='/login' />
      </Route>
      <Route path='/login' exact>
        <Login />
      </Route>
      <Route path='/signup' exact>
        <Signup />
      </Route>
      <Route path='/additional-info' exact>
        <AdditionalInfo />
      </Route>
      <Route path='/forgot-password' exact>
        <ForgotPassword />
      </Route>
      <Route path='/recover-account' exact>
        <RecoverAccount />
      </Route>
    </Switch>
  );
};

export default App;
