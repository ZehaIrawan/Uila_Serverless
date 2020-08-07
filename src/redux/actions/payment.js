import api from '../../utils/api';
import { INITIATE_CHECKOUT } from './types';

// Add Product
export const initiateCheckout = (orderDetails) => async (dispatch) => {
  console.log('sss');
  try {
    const res = await api.post(`/payment`, orderDetails);

    dispatch({
      type: INITIATE_CHECKOUT,
      payload: res.formData,
    });
  } catch (err) {
    console.log(err);
  }
};
