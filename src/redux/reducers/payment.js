import { PAYMENT_ERROR,SET_ALERT } from '../actions/types';


const initialState = {
  paymentStatus: '',
};

const payment = ({ state = initialState, action }) => {
  const { type, payload } = action;
  switch (type) {
    case PAYMENT_ERROR:

    default:
      return state;
  }
};
