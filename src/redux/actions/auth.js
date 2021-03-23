/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import { postRequest } from '../../api/helpers';
import { saveItem } from '../../helpers';

import {
  ACCESS_REQUEST,
  LOGIN_REQUEST,
  REQUEST_FAILED,
  REQUEST_PENDING,
  REQUEST_SUCCEED,
  SET_CURRENT_USER,
} from '../constants/auth';

import setError from './error';
import setFetching from './fetching';

const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  currentUser,
});

export const signUp = signUpParams => async dispatch => {
  try {
    dispatch(setFetching(true));
    const res = await postRequest('signup', signUpParams);
    console.log(res);
    const authToken = res.data;
    saveItem('token', authToken.auth_token);
    dispatch(setCurrentUser(signUpParams));
    dispatch(setFetching(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const logIn = loginParams => async dispatch => {
  try {
    dispatch(setFetching(true));
    const res = await postRequest('sessions', loginParams);
    console.log(res);
    const authToken = res.data;
    saveItem('token', authToken.auth_token);
    dispatch(setCurrentUser(loginParams));
    dispatch(setFetching(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchRequestFailed = error => ({
  type: REQUEST_FAILED,
  payload: error,
});

export const fetchAccessRequest = (type, authToken, info) => {
  if (type === 'login') {
    return {
      type: LOGIN_REQUEST,
      payload: authToken,
      login_credentials: info,
    };
  }
  return {
    type: ACCESS_REQUEST,
    payload: authToken,
    credentials: info,
  };
};

export const getBusinessID = () => ({
  type: 'BUSINESS_EXIST',
});

export const fetchPending = () => ({
  type: REQUEST_PENDING,
});

export const fetchRequestSuccess = () => ({
  type: REQUEST_SUCCEED,
});

export const loginRequest = data => async dispatch => {
  dispatch(fetchPending());
  postRequest('sessions', data).then(response => {
    const authToken = response.data;
    saveItem('token', authToken.auth_token);
    dispatch(fetchRequestSuccess());
    dispatch(fetchAccessRequest('login', authToken, data));
  }).catch(error => {
    dispatch(fetchRequestFailed(error.message));
  });
};

export const signupRequest = data => async dispatch => {
  dispatch(fetchPending());
  postRequest('signup', data).then(response => {
    const authToken = response.data;
    saveItem('token', authToken.auth_token);
    dispatch(fetchRequestSuccess());
    dispatch(fetchAccessRequest('signup', authToken, data));
  }).catch(error => {
    dispatch(fetchRequestFailed(error.message));
  });
};
