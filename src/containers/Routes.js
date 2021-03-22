import { HashRouter, Switch, Route } from 'react-router-dom';
import RawMaterialsListComponent from './RawMaterialsListComponent';
import Auth from './Auth';
import Home from './Home';
import styles from './Routes.module.css';

const Routes = () => (
  <div className={styles.rootContainer}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/dashboard" component={Home} />
        <Route path="/business/raw_materials" component={RawMaterialsListComponent} />
      </Switch>
    </HashRouter>
  </div>
);

export default Routes;
