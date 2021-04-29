import { useReactiveVar } from '@apollo/client';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { tokenVar, userVar } from '../../graphql/state';

const AuthRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const token = useReactiveVar(tokenVar);
  const user = useReactiveVar(userVar);

  return (
    <Route
      {...rest}
      render={() =>
        !token || !user?.firstName ? children : <Redirect to='/' />
      }
    />
  );
};

export default AuthRoute;
