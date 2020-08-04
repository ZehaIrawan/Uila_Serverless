import api from '../../utils/api';
import { GET_ADDRESS,ADD_USER_ADDRESS } from './types';

// Get User Adresss
export const getAddress = () => async (dispatch) => {
  try {
    const res = await api.get(`address`);
    dispatch({
      type: GET_ADDRESS,
      payload: res.data,
    });

    // dispatch(loadUser());
  } catch (err) {
    console.log(err);
  }
};


// Add user address
export const createAddress = (title,address) => async (dispatch) => {
  const params = {
      title,
      address
  };

  try {
    const res = await api.post(`address`, params);

    dispatch({
      type: ADD_USER_ADDRESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
