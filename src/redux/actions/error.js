import SET_ERROR from '../constants/error';

const setError = error => ({
  type: SET_ERROR,
  error,
});

export default setError;
