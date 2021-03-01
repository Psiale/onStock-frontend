import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Home = ({ credentials }) => (
  <>
    <p>
      This are the credentials:
      {' '}
      {
    credentials
    }
    </p>
  </>
);

// I need to change this mapStateToProps
const mapStateToProps = state => ({
  auth_token: state.authStore.items,
  credentials: state.authStore.credentials,
});

Home.propTypes = {
  credentials: Proptypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Home);
