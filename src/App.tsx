import { Route, Switch } from 'react-router-dom';
import { Button } from './components';
// import { Add } from './assets';
import GlobalStyles from './GlobalStyles';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route path='/' exact>
          <div style={{ margin: '2rem', width: '95vw' }}>
            <Button
              color='client'
              // size='big'
              variant='outlined'
              text='Button'
              // fullWidth
              // iconLeft={<Add />}
              onClick={() => {}}
            />
          </div>
        </Route>
      </Switch>
    </>
  );
};

export default App;
