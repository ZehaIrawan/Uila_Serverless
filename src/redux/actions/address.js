import api from '../../utils/api';
import { GET_ADDRESS } from './types';

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
