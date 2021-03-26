/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import { postRequest } from '../../api/helpers';
import { saveItem } from '../../helpers';

import { SET_CURRENT_USER, INITIAL_STATE } from '../constants/auth';
import { setBusinessInitialState } from './business';

import setError from './error';
import setFetching from './fetching';
import { signOutMaterials } from './materials';

const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  currentUser,
});

const setInitialState = () => ({
  type: INITIAL_STATE,
});

export const signUp = signUpParams => async dispatch => {
  dispatch(setFetching(true));
  try {
    const res = await postRequest('signup', signUpParams);
    const authToken = res.data;
    saveItem('token', authToken.auth_token);
    dispatch(setCurrentUser(signUpParams));
    const user = { email: signUpParams.email, password: signUpParams.password };
    saveItem('user', JSON.stringify(user));
    localStorage.removeItem('businessID');
    dispatch(setFetching(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setFetching(false));
  }
};

export const logIn = loginParams => async dispatch => {
  dispatch(setFetching(true));
  try {
    const res = await postRequest('sessions', loginParams);
    const authToken = res.data;
    saveItem('token', authToken.auth_token);
    dispatch(setCurrentUser(loginParams));
    const user = { email: loginParams.email, password: loginParams.password };
    saveItem('user', JSON.stringify(user));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setFetching(false));
  }
};

export const signOut = () => dispatch => {
  dispatch(setInitialState());
  dispatch(setBusinessInitialState());
  dispatch(setFetching(false));
  localStorage.removeItem('token');
  localStorage.removeItem('businessID');
  localStorage.removeItem('user');
  signOutMaterials();
};
