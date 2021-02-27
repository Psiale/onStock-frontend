import axios from 'axios';
import BASE_URL from '../redux/constants/index';

export const postRequest = async (endpoint, data) => axios.post(`${BASE_URL}${endpoint}`,
  data);

export const getRequest = async endpoint => axios.get(`${BASE_URL}${endpoint}`);
