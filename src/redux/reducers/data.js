/* eslint-disable no-console */
import { REQUEST_PENDING } from '../constants/auth';
import {
  GET_BUSINESS, SET_BUSINESS,
  GET_RAW_MATERIALS, SET_RAW_MATERIALS,
  GET_RAW_MATERIAL, SET_RAW_MATERIAL,
} from '../constants/data';

const initialState = {
  business: {
    id: null,
    name: "the business's name",
    avatar: 'default avatar',
    owner_id: null,
  },
  raw_materials: [],
  raw_material: '',
  error: '',
  loading: false,
  selectedMaterials: [],
};

const dataReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_BUSINESS:
      console.log('get business being trigger');
      return {
        ...state,
        business: action.payload,
        loading: false,
      };
    case SET_BUSINESS:
      console.log('set business being trigger');
      return {
        ...state,
        business: action.payload,
        loading: false,
      };

    case GET_RAW_MATERIALS:
      console.log('get raw materials trigger');
      return {
        ...state,
        raw_materials: action.payload,
      };

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
    case 'REQUEST_FAILED':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default: return state;
  }
};

export default dataReducer;
