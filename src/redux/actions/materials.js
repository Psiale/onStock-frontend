import { getRequest, postRequest } from '../../api/helpers';
import { ADD_MATERIAL, SHOW_MATERIALS, UPDATE_MATERIAL } from '../constants/materials';
import setError from './error';

export const addMaterial = materials => ({
  type: ADD_MATERIAL,
  materials,
});

export const showMaterials = materials => ({
  type: SHOW_MATERIALS,
  materials,
});

export const updateMaterial = material => ({
  type: UPDATE_MATERIAL,
  material,
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
    const res = await postRequest(endpoint, postParams);
    dispatch(addMaterial(res.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
