import { GET_BUSINESS, SET_BUSINESS } from '../constants/data';
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
    const { data } = response.data;
    dispatch(fetchBusinessRequest(data));
  }).catch(error => dispatch(fetchRequestFailed(error)));
};

export default fetchGetProducts;
