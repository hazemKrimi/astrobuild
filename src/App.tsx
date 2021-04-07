import { Route, Switch } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route path='/' exact>
          <h2>TEST</h2>
        </Route>
      </Switch>
    </>
  );
};

export default App;
