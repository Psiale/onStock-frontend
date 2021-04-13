import React from 'react';
import renderer from 'react-test-renderer';
import ErrorHandler from '../../../components/ErrorHandler';

it('renders properly', () => {
  const tree = renderer.create(<ErrorHandler errorMessage="error" />).toJSON();
  expect(tree).toMatchSnapshot();
});
