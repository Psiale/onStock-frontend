import {
  ACCESS_REQUEST,
  REQUEST_FAILED,
  REQUEST_PENDING,
} from '../constants/auth';

export const fetchRequestFailed = error => ({
  type: REQUEST_FAILED,
  payload: error,
});

export const fetchAccessRequest = credentials => ({
  type: ACCESS_REQUEST,
  payload: credentials,
});
