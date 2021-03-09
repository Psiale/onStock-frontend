/* eslint-disable no-console */
import {
  GET_BUSINESS, SET_BUSINESS, GET_RAW_MATERIALS, SET_RAW_MATERIALS,
  GET_PRODUCTS, SET_PRODUCTS, SET_PRODUCT_RAW_MATERIALS,
} from '../constants/data';
import { getRequest, postRequest } from '../../api/helpers';
import { REQUEST_PENDING } from '../constants/auth';

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

const fetchRawMaterialsRequest = data => ({
  type: GET_RAW_MATERIALS,
  payload: data,
});

const fetchRawMaterialsRequestPost = data => ({
  type: SET_RAW_MATERIALS,
  payload: data,
});

const fetchProductsRequest = data => ({
  type: GET_PRODUCTS,
  payload: data,
});

const fetchProductsRequestPost = data => ({
  type: SET_PRODUCTS,
  payload: data,
});

const fetchProductRawMaterials = data => ({
  type: SET_PRODUCT_RAW_MATERIALS,
  payload: data,
});

const fetchPending = () => ({
  type: REQUEST_PENDING,
});

export const fetchGetData = endpoint => async dispatch => {
  dispatch(fetchPending());
  getRequest(endpoint).then(response => {
    console.log(response.data);
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
    dispatch(fetchBusinessRequestPost(response.data));
  }).catch(error => {
    console.log(error.message);
    dispatch(fetchRequestFailed(error));
  });
};

export const fetchGetRawMaterials = endpoint => async dispatch => {
  dispatch(fetchPending());
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
    dispatch(fetchRawMaterialsRequestPost(response.data));
  }).catch(error => {
    console.log(error.message);
    dispatch(fetchRequestFailed(error));
  });
};

export const fetchGetProducts = endpoint => async dispatch => {
  dispatch(fetchPending());
  getRequest(endpoint).then(response => {
    console.log(response.data);
    dispatch(fetchProductsRequest(response.data));
  }).catch(error => {
    console.log(error.message);
    dispatch(fetchRequestFailed(error));
  });
};

export const fetchPostProducts = (endpoint, data) => async dispatch => {
  dispatch(fetchPending());
  // I have to verify the data type
  console.log(`this is the data ${data}`);
  postRequest(endpoint, data).then(response => {
    console.log(response.data);
    dispatch(fetchProductsRequestPost(response.data));
  }).catch(error => {
    console.log(error.message);
    dispatch(fetchRequestFailed(error));
  });
};

export const fetchPostProductMaterials = (endpoint, data) => async dispatch => {
  dispatch(fetchPending());
  // I have to verify the data type
  console.log(`this is the data ${data}`);
  postRequest(endpoint, data).then(response => {
    console.log(response.data);
    dispatch(fetchProductRawMaterials(response.data));
  }).catch(error => {
    console.log(error.message);
    dispatch(fetchRequestFailed(error));
  });
};
