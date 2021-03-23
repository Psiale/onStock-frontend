import { ADD_MATERIAL, SHOW_MATERIALS, UPDATE_MATERIAL } from '../constants/materials';

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
