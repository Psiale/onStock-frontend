import { ADD_BUSINESS, SHOW_BUSINESS } from '../constants/business';

export const addBusiness = business => ({
  type: ADD_BUSINESS,
  business,
});

export const showBusiness = business => ({
  type: SHOW_BUSINESS,
  business,
});

