import api from '../../utils/api';
import {  PAYMENT_SUCCESS } from './types';
import {setAlert} from './alert'


// Create Payment
export const initiateCheckout = (orderDetails) => async (dispatch) => {
  try {
    const res = await api.post(`/payment`, orderDetails);

    dispatch({
      type: PAYMENT_SUCCESS,
      payload: res.formData,
    });
    dispatch(setAlert('Payment Successful', 'bg-green-600'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'bg-red-600'));
  }
};
