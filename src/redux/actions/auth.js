/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import { postRequest } from '../../api/helpers';
import { saveItem } from '../../helpers';

import {
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
