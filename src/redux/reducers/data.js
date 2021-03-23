/* eslint-disable no-console */
import {
  SET_RAW_MATERIALS,
  GET_RAW_MATERIAL, SET_RAW_MATERIAL,
  PUT_RAW_MATERIAL,
} from '../constants/data';

const initialState = {
  raw_materials: [],

};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RAW_MATERIALS:
      console.log('set raw materials trigger');
      return {
        ...state,
        raw_materials: action.payload,
      };
    case GET_RAW_MATERIAL:
      console.log('get raw material trigger');
      return {
        ...state,
        raw_material: action.payload,
      };
    case SET_RAW_MATERIAL:
      console.log('set raw material trigger');
      return {
        ...state,
        raw_material: action.payload,
      };
    case PUT_RAW_MATERIAL:
      console.log('put request trigger');
      return {
        ...state,
        raw_materials: action.payload,
      };
    default: return state;
  }
};

export default dataReducer;
