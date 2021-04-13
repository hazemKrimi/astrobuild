import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <div />
      </Route>
    </Switch>
  );
};

export default App;
