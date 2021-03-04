/* eslint-disable no-console */
import { GET_BUSINESS, SET_BUSINESS } from '../constants/data';
import { getRequest, postRequest } from '../../api/helpers';

const fetchBusinessRequest = data => ({
  type: GET_BUSINESS,
  payload: data,
});

const fetchRequestFailed = error => ({
  type: 'REQUEST_FAILED',
  payload: error,
});

const fetchBusinessRequestPost = data => ({
  type: SET_BUSINESS,
  payload: data,
});

export const fetchGetData = endpoint => async dispatch => {
  getRequest(endpoint).then(response => {
    console.log(response.data);
    dispatch(fetchBusinessRequest(response.data));
  }).catch(error => {
    console.log(error);
    dispatch(fetchRequestFailed(error));
  });
};

export const fetchPostData = (endpoint, data) => async dispatch => {
  postRequest(endpoint, data).then(response => {
    console.log(response.data);
    dispatch(fetchBusinessRequestPost(response.data));
  }).catch(error => {
    console.log(error);
    dispatch(fetchRequestFailed(error));
  });
};
