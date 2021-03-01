import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Home = ({ credentials }) => (
  <>
    <p>
      {
    credentials.email
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
  credentials: Proptypes.shape({
    name: Proptypes.string,
    email: Proptypes.string,
    password: Proptypes.string,
    password_confirmation: Proptypes.string,
  }),
};

Home.defaultProps = {
  credentials: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
};

export default connect(mapStateToProps, null)(Home);
