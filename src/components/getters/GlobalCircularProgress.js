/* eslint-disable no-console */
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Proptypes from 'prop-types';
import { colorProgression } from '../../helpers';

const GlobalCircularProgressComponent = ({ rawMaterial, width }) => {
  const percentage = (rawMaterial.remaining_amount / rawMaterial.total_amount) * 100;

  return (
    <>
      <CircularProgressbar
        value={rawMaterial.remaining_amount}
        strokeWidth={4}
        styles={{
          root: {
            width,
          },
          path: {
            stroke: colorProgression(percentage),
            strokeLinecap: 'butt',
            transition: 'stroke-dashoffset 0.5s ease 0s',
            transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
          },
          trail: {
            stroke: '#d6d6d6',
            strokeLinecap: 'butt',
            transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
          },
          text: {
            fill: (percentage > 0) ? 'black' : 'red',
            fontSize: '16px',
          },
          background: {
            fill: '#3e98c7',
          },
        }}
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
