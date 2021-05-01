import { useReactiveVar } from '@apollo/client';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { tokenVar } from '../../graphql/state';

const AuthRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const token = useReactiveVar(tokenVar);

  return (
    <Route {...rest} render={() => (!token ? children : <Redirect to='/' />)} />
  );
};

export default AuthRoute;
