import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Home = () => (
  <>
    <p> Sup from Home</p>
  </>
);

// I need to change this mapStateToProps
const mapStateToProps = state => ({
  items: state.itemsStore.items,
  loading: state.itemsStore.loading,
  filter: state.filterStore.filter,
});

export default connect(mapStateToProps, null)(Home);
