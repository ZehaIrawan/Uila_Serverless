import { GET_ADDRESS,ADD_USER_ADDRESS } from '../actions/types';

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
     case ADD_USER_ADDRESS:
       console.log(payload);
       return{
         ...state,
         address: [payload, ...state.address],
       }
    default:
      return state;
  }
};

export default address;
