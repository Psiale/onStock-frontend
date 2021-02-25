import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './Auth';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Auth} />
      <Route />
    </Switch>
  </BrowserRouter>
);
