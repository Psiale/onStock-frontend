/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { fetchGetRawMaterials } from '../../redux/actions/data';
import { colorProgression } from '../../helpers';

const RawMaterialComponent = ({
  fetchGetRawMaterials,
  rawMaterial, business,
  isAuth,
}) => {
  useEffect(() => {
    fetchGetRawMaterials(`business/${business.id}/raw_materials`);
  }, []);
  const history = useHistory();
  const percentage = (rawMaterial.remaining_amount / rawMaterial.total_amount) * 100;
  if (isAuth === false) {
    return (
      <>
        <p> Missing Credentials</p>
        <button onClick={history.push('/')} type="button">
          Login / Signup
        </button>
      </>
    );
  }
  return (
    <>
      { (rawMaterial !== '') ? (
        <>
          <p> Raw Material on store </p>
          <CircularProgressbar
          // I have to pass the raw remaining value here
            value={rawMaterial.remaining_amount}
            strokeWidth={4}
            styles={(buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0.25,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'butt',

              // Text size
              textSize: '16px',

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: colorProgression(percentage),
              textColor: 'black',
              trailColor: '#d6d6d6',
            }))}
            // remaining amount - total amount
            text={(rawMaterial.total_amount !== rawMaterial.remaining_amount)
              ? (`${rawMaterial.remaining_amount}`)
              : `${percentage}%`}
            minValue={0}
            maxValue={rawMaterial.total_amount}
          />
        </>
      ) : <p> not working </p>}
    </>
  );
};

RawMaterialComponent.propTypes = {
  isAuth: Proptypes.bool.isRequired,
  rawMaterial: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string,
    owner_id: Proptypes.number,
  }).isRequired,
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
  fetchGetRawMaterials: Proptypes.func.isRequired,
};

const mapStateToProps = state => ({
  rawMaterial: state.dataStore.raw_material,
  business: state.dataStore.business,
  isAuth: state.authStore.is_auth,
});

const mapDispatchToProps = dispatch => ({
  fetchGetRawMaterials: endpoint => dispatch(fetchGetRawMaterials(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialComponent);
