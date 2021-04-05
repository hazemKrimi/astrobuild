import { Route, Switch } from 'react-router';

const App = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <div></div>
      </Route>
    </Switch>
  );
};

export default App;
