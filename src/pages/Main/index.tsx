import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { roleVar } from '../../graphql/state';
import { Navbar, Sidebar } from '../../components';
import { Project } from '..';

const Main = () => {
  const match = useRouteMatch();
  const role = useReactiveVar(roleVar);

  return (
    <>
      <Navbar withSidebar={role !== 'admin'} />
      {role !== 'admin' && <Sidebar />}
      <Switch>
        <Route path={`${match.path}/`} exact>
          <Project />
        </Route>
        <Route path={`${match.path}/project`} exact>
          <Project />
        </Route>
      </Switch>
    </>
  );
};

export default Main;
