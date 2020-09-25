import { GET_ORDER } from '../actions/types';

const initialState = {
 order: [],
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDER:
      return {
        ...state,
       order: [payload, ...state.order],
        loading: false,
      };
    default:
      return state;
  }
};


