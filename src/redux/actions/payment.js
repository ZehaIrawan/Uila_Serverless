import api from '../../utils/api';
import { INITIATE_CHECKOUT,PAYMENT_ERROR } from './types';
import {setAlert} from './alert'


// Create Payment
export const initiateCheckout = (orderDetails) => async (dispatch) => {
  try {
    const res = await api.post(`/payment`, orderDetails);

    dispatch({
      type: INITIATE_CHECKOUT,
      payload: res.formData,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'bg-red-600'));
  }
};
