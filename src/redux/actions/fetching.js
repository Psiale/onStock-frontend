import SET_FETCHING from '../constants/fetching';

const setFetching = isFetching => ({
  type: SET_FETCHING,
  isFetching,
});

export default setFetching;
