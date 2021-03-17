import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

const NavBar = ({ initialState }) => {
  const history = useHistory();
  const handleOnClick = () => {
    initialState();
    history.push('/');
  };
  return (
    <>
      <button type="button" onClick={handleOnClick}> Sign out</button>
    </>
  );
};

NavBar.propTypes = {
  initialState: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  initialState: () => dispatch({ type: 'DEFAULT' }),
});

export default connect(null, mapDispatchToProps)(NavBar);
