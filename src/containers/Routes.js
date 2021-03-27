import { HashRouter, Switch, Route } from 'react-router-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import RawMaterialsListComponent from './RawMaterialsListComponent';
import Auth from './Auth';
import Home from './Home';
import styles from './Routes.module.css';
import { retrieveItem } from '../helpers';
import { logIn } from '../redux/actions/auth';
import { setHeader } from '../api/helpers';

const Routes = ({ logIn }) => {
  if (localStorage.user) {
    setHeader(retrieveItem('token'));
    const retrieve = JSON.parse(retrieveItem('user'));
    logIn(retrieve);
  }
  return (
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
};

Routes.propTypes = {
  logIn: Proptypes.func.isRequired,
};

const mapStateTopProps = dispatch => ({
  logIn: loginParams => dispatch(logIn(loginParams)),
});

export default connect(null, mapStateTopProps)(Routes);
