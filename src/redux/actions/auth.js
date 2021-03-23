/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
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
  dispatch(setFetching(true));
  try {
    const res = await postRequest('signup', signUpParams);
    const authToken = res.data;
    saveItem('token', authToken.auth_token);
    dispatch(setCurrentUser(signUpParams));
    dispatch(setFetching(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const logIn = loginParams => async dispatch => {
  dispatch(setFetching(true));
  try {
    const res = await postRequest('sessions', loginParams);
    const authToken = res.data;
    saveItem('token', authToken.auth_token);
    dispatch(setCurrentUser(loginParams));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
