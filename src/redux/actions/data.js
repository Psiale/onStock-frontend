/* eslint-disable no-console */
import { GET_BUSINESS } from '../constants/data';
import { getRequest } from '../../api/helpers';

const fetchBusinessRequest = data => ({
  type: GET_BUSINESS,
  payload: data,
});

const fetchRequestFailed = error => ({
  type: 'REQUEST_FAILED',
  payload: error,
});

const fetchGetProducts = endpoint => async dispatch => {
  getRequest(endpoint).then(response => {
    console.log(response.data);
    dispatch(fetchBusinessRequest(response.data));
  }).catch(error => {
    console.log(error);
    dispatch(fetchRequestFailed(error));
  });
};

export default fetchGetProducts;
