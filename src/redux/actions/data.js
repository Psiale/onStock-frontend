/* eslint-disable no-console */
import {
  GET_BUSINESS, SET_BUSINESS, GET_RAW_MATERIALS, SET_RAW_MATERIALS,
  GET_RAW_MATERIAL, SET_RAW_MATERIAL, PUT_RAW_MATERIAL,
} from '../constants/data';
import { getRequest, postRequest, putRequest } from '../../api/helpers';
import { REQUEST_PENDING } from '../constants/auth';
import { saveItem } from '../../helpers';

const fetchBusinessRequest = data => ({
  type: GET_BUSINESS,
  payload: data,
});

const fetchBusinessRequestPost = data => ({
  type: SET_BUSINESS,
  payload: data,
});
const fetchRawMaterialsRequest = data => ({
  type: GET_RAW_MATERIALS,
  payload: data,
});

const fetchRawMaterialsRequestPost = data => ({
  type: SET_RAW_MATERIALS,
  payload: data,
});

export const fetchRawMaterialRequest = () => ({
  type: GET_RAW_MATERIAL,
});

export const fetchRawMaterialRequestPost = data => ({
  type: SET_RAW_MATERIAL,
  payload: data,
});

export const fetchRawMaterialRequestPut = data => ({
  type: PUT_RAW_MATERIAL,
  payload: data,
});

const fetchRequestFailed = error => ({
  type: 'REQUEST_FAILED',
  payload: error,
});
const fetchPending = () => ({
  type: REQUEST_PENDING,
});

export const fetchBusinessGetData = endpoint => async dispatch => {
  dispatch(fetchPending());
  getRequest(endpoint).then(response => {
    console.log(response.data);
    saveItem('businessID', response.data.id);
    dispatch(fetchBusinessRequest(response.data));
  }).catch(error => {
    console.log(error.message);
    dispatch(fetchRequestFailed(error));
  });
};

export const fetchPostData = (endpoint, data) => async dispatch => {
  dispatch(fetchPending());
  postRequest(endpoint, data).then(response => {
    console.log(response.data);
    saveItem('businessID', response.data.id);
    dispatch(fetchBusinessRequestPost(response.data));
  }).catch(error => {
    console.log(error.message);
    dispatch(fetchRequestFailed(error));
  });
};

export const fetchGetRawMaterials = endpoint => async dispatch => {
  dispatch(fetchPending());
  console.log('FETCH GET MATERIALS');
  getRequest(endpoint).then(response => {
    console.log(response.data);
    dispatch(fetchRawMaterialsRequest(response.data));
  }).catch(error => {
    console.log(error.message);
    dispatch(fetchRequestFailed(error));
  });
};

export const fetchPostRawMaterials = (endpoint, data) => async dispatch => {
  dispatch(fetchPending());
  // I have to verify the data type
  console.log(`this is the data ${data}`);
  postRequest(endpoint, data).then(response => {
    console.log(response.data);
    saveItem('hasMaterials', true);
    dispatch(fetchRawMaterialsRequestPost(response.data));
  }).catch(error => {
    console.log(error.message);
    dispatch(fetchRequestFailed(error));
  });
};

export const fetchPutRawMaterial = (endpoint, data) => async dispatch => {
  dispatch(fetchPending());
  // I have to verify the data type
  console.log(`this is the data ${data}`);
  putRequest(endpoint, data).then(response => {
    console.log(response.data);
    dispatch(fetchRawMaterialRequestPut(response.data));
  }).catch(error => {
    console.log(error.message);
    dispatch(fetchRequestFailed(error));
  });
};
