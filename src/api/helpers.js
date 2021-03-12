/* eslint-disable no-console */
import axios from 'axios';
import BASE_URL from '../redux/constants/index';

export const postRequest = async (endpoint, data) => axios.post(`${BASE_URL}${endpoint}`,
  data);

export const putRequest = async (endpoint, data) => axios.put(`${BASE_URL}${endpoint}`,
  data);

export const getRequest = async endpoint => axios.get(`${BASE_URL}${endpoint}`);

export const statusRequest = response => {
  console.log(`this is the status request response: ${response}`);
  if (response !== null) {
    console.log(response);
    return true;
  }
  return false;
};
