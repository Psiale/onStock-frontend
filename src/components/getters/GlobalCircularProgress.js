/* eslint-disable no-console */
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Proptypes from 'prop-types';
import { colorProgression } from '../../helpers';
// import { colorProgression } from '../../helpers';
// import styles from '../../containers/RawMaterialsListComponent.module.css';

const GlobalCircularProgressComponent = ({ rawMaterial, width }) => {
  const percentage = (rawMaterial.remaining_amount / rawMaterial.total_amount) * 100;

  console.log(`this is the raw material: ${rawMaterial.id}, ${rawMaterial.remaining_amount} `);
  return (
    <>
      <CircularProgressbar
            // I have to pass the raw remaining value here
        value={rawMaterial.remaining_amount}
        strokeWidth={4}
        styles={{
          // Customize the root svg element
          root: {
            width,
          },
          // Customize the path, i.e. the "completed progress"
          path: {
            // Path color
            stroke: colorProgression(percentage),
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
            // Customize transition animation
            transition: 'stroke-dashoffset 0.5s ease 0s',
            // Rotate the path
            transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: '#d6d6d6',
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
            // Rotate the trail
            transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
          },
          // Customize the text
          text: {
            // Text color
            fill: (percentage > 0) ? 'black' : 'red',
            // Text size
            fontSize: '16px',
          },
          // Customize background - only used when the `background` prop is true
          background: {
            fill: '#3e98c7',
          },
        }}
              // remaining amount - total amount
        text={(percentage > 0) ? `${percentage.toFixed(1)}%` : 'Out of Stock'}
        minValue={0}
        maxValue={rawMaterial.total_amount}
      />
    </>
  );
};

GlobalCircularProgressComponent.propTypes = {
  width: Proptypes.string,
  rawMaterial: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    total_amount: Proptypes.number,
    remaining_amount: Proptypes.number,
  }),
};

GlobalCircularProgressComponent.defaultProps = {
  rawMaterial: {
    id: 0,
    name: 'default name',
    total_amount: 2000,
    remaining_amount: 2000,
  },
  width: '100%',
};

export default GlobalCircularProgressComponent;
