/* eslint-disable no-console */
import axios from 'axios';
import BASE_URL from '../redux/constants/index';

export const postRequest = async (endpoint, data) => axios.post(`${BASE_URL}${endpoint}`,
  data);

export const putRequest = async (endpoint, data) => axios.put(`${BASE_URL}${endpoint}`,
  data);

export const getRequest = async endpoint => axios.get(`${BASE_URL}${endpoint}`);

export const statusRequest = response => {
  if (response !== null) {
    return true;
  }
  return false;
};

export const setHeader = token => {
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
};
