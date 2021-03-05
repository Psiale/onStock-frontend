import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductsListComponent from '../components/ProductsListComponent';
import RawMaterialsListComponent from '../components/RawMaterialsListComponent';
import Auth from './Auth';
import Home from './Home';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Auth} />
      <Route path="/dashboard" component={Home} />
      <Route path="/business/raw_materials" component={RawMaterialsListComponent} />
      <Route path="/business/products" component={ProductsListComponent} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
