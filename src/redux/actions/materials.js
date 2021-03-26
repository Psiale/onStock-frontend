import { getRequest, postRequest, putRequest } from '../../api/helpers';
import { ADD_MATERIAL, SHOW_MATERIALS } from '../constants/materials';
import setError from './error';

export const addMaterial = material => ({
  type: ADD_MATERIAL,
  material,
});

export const showMaterials = materials => ({
  type: SHOW_MATERIALS,
  materials,
});

export const getRawMaterials = endpoint => async dispatch => {
  try {
    const res = await getRequest(endpoint);
    dispatch(showMaterials(res.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const postRawMaterials = (endpoint, postParams) => async dispatch => {
  try {
    await postRequest(endpoint, postParams);
    dispatch(addMaterial(postParams));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const putRawMaterial = (endpoint, putParams) => async dispatch => {
  try {
    await putRequest(endpoint, putParams);
    dispatch(addMaterial(putParams));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
