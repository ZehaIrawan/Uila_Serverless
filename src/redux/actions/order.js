import api from '../../utils/api';
import {  GET_ORDER } from './types';

export const getOrder = () => async (dispatch) => {
  try {
    const res = await api.get('/order');

    dispatch({
      type: GET_ORDER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
