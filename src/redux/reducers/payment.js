import { PAYMENT_SUCCESS } from '../actions/types';


const initialState = {
  paymentStatus: '',
};

export default function ( state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PAYMENT_SUCCESS:
      return{
        ...state,
        paymentStatus:'success'
      }
    default:
      return state;
  }
};
