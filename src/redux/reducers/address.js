import { GET_ADDRESS,ADD_USER_ADDRESS,SELECT_ADDRESS } from '../actions/types';

const initialState = {
  address: [],
  loading: true,
  error: {},
  selected:{}
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
       return{
         ...state,
         address: [payload, ...state.address],
       }
     case SELECT_ADDRESS:
       return{
         ...state,
         selected:[payload]
       }
    default:
      return state;
  }
};

export default address;
