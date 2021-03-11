/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useLayoutEffect } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { fetchRawMaterialRequest } from '../../redux/actions/data';
import { colorProgression } from '../../helpers';

const RawMaterialComponent = ({ rawMaterial }) => {
  useLayoutEffect(() => {
    fetchRawMaterialRequest();
  }, []);
  console.log(`raw material: ${rawMaterial.name}`);
  const handleOnClick = () => {
    console.log('updating');
  };
  const percentage = (1000 / rawMaterial.total_amount) * 100;
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
          <button type="button" onClick={handleOnClick}>
            update
          </button>
        </>
      ) : <p> not working </p>}
    </>
  );
};

RawMaterialComponent.propTypes = {
  rawMaterial: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string,
    owner_id: Proptypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({
  rawMaterial: state.dataStore.raw_material,
});

const mapDispatchToProps = dispatch => ({
  fetchRawMaterialRequest: () => dispatch(fetchRawMaterialRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialComponent);

// (rawMaterial.total_amount === rawMaterial.remaining_amount)
//               ? [{ angle: rawMaterial.remaining_amount, color: 'green' }]
//               : [{ angle: rawMaterial.remaining_amount, color: 'green' },
//                 { angle: rawMaterial.total_amount, color: 'purple' }]
