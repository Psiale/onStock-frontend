import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Proptypes from 'prop-types';
import { colorProgression } from '../../helpers';

const GlobalCircularProgressComponent = ({ rawMaterial }) => {
  const percentage = (rawMaterial.remaining_amount / rawMaterial.total_amount) * 100;
  return (
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
        text={`${percentage}%`}
        minValue={0}
        maxValue={rawMaterial.total_amount}
      />
    </>
  );
};

GlobalCircularProgressComponent.propTypes = {
  rawMaterial: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    total_amount: Proptypes.string,
    remaining_amount: Proptypes.number,
  }).isRequired,
};

export default GlobalCircularProgressComponent;
