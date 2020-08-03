import { GET_ADDRESS } from '../actions/types';

const initialState = {
  address: [],
  loading: true,
  error: {},
};

const address = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ADDRESS:
      return {
        ...state,
        address: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default address;
