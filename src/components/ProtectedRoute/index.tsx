import { useReactiveVar } from '@apollo/client';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { tokenVar } from '../../graphql/state';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const token = useReactiveVar(tokenVar);

  return (
    <Route
      {...rest}
      render={() => (token ? children : <Redirect to='/login' />)}
    />
  );
};

export default ProtectedRoute;
