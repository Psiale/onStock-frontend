import { getRequest, postRequest } from '../../api/helpers';
import { saveItem } from '../../helpers';
import { ADD_BUSINESS, HAS_BUSINESS, SHOW_BUSINESS } from '../constants/business';
import setError from './error';
import setFetching from './fetching';

export const addBusiness = business => ({
  type: ADD_BUSINESS,
  business,
});

export const showBusiness = business => ({
  type: SHOW_BUSINESS,
  business,
});

export const getBusinessID = () => ({
  type: HAS_BUSINESS,
});

export const setBusinessInitialState = () => ({
  type: 'INITIAL_STATE',
});

export const getBusiness = endpoint => async dispatch => {
  try {
    const res = await getRequest(endpoint);
    saveItem('businessID', res.data.id);
    dispatch(addBusiness(res.data));
    setFetching(false);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const postBusiness = (endpoint, postParams) => async dispatch => {
  try {
    const res = await postRequest(endpoint, postParams);
    saveItem('businessID', res.data.id);
    dispatch(showBusiness(res.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
