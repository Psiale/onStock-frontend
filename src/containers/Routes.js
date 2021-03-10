import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RawMaterialsListComponent from '../components/RawMaterialsListComponent';
import RawMaterialComponent from '../components/getters/RawMaterialComponent';
import Auth from './Auth';
import Home from './Home';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Auth} />
      <Route path="/dashboard" component={Home} />
      <Route path="/business/raw_materials" component={RawMaterialsListComponent} />
      <Route path="/rawMaterial/:id" component={RawMaterialComponent} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
