import { Route, Switch } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route path='/' exact>
          <div style={{ margin: '2rem', width: '95vw' }}></div>
        </Route>
      </Switch>
    </>
  );
};

export default App;
