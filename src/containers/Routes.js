import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import Home from './Home';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Auth} />
      <Route path="/dashboard" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
