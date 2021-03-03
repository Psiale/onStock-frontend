/* eslint-disable no-console */
import axios from 'axios';
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
  console.log(axios.defaults.headers);
  getRequest(endpoint).then(response => {
    const { data } = response.data;
    console.log(data);
    dispatch(fetchBusinessRequest(data));
  }).catch(error => {
    console.log(error);
    dispatch(fetchRequestFailed(error));
  });
};

export default fetchGetProducts;
