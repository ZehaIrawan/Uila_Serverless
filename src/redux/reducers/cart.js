import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_CART,
  GET_CART,
  INCREASE_CART,
  REMOVE_CART,
} from '../actions/types';

const initialState = {
  cart: [],
  loading: true,
  error: {},
  total: 0,
};

const cart = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CART:
      return {
        ...state,
        cart: payload.cart_items,
        total: payload.total,
        loading: false,
      };
    case ADD_TO_CART:
      let newProduct = false;

      const productInCart = state.cart.map((item, index) => {
        if (item.id === payload.id) {
          newProduct = false;
          return {
            ...item,
            quantity: payload.quantity,
          };
        } else {
          newProduct = true;
        }
        return item;
      });
      if (newProduct) productInCart.push(payload);
      return {
        ...state,
        cart: productInCart,
        payload,
        total: payload.total,
        loading: false,
      };
    case REMOVE_CART:
      return {
        ...state,
        cart: state.cart.filter((cart) => cart.product._id !== payload),
        loading: false,
      };

    case INCREASE_CART:
      return {
        ...state,
        cart: state.cart.map((item, index) => {
          // Find the item with the matching id

          if (item._id === payload._id) {
            // Return a new object

            return {
              ...item, // copy the existing item
              quantity: payload.quantity,
            };
          }
          // Leave every other item unchanged

          return item;
        }),

        loading: false,
      };

    case DECREASE_CART:
      return {
        ...state,
        cart: state.cart.map((item, index) => {
          // Find the item with the matching id

          if (item._id === payload._id) {
            // Return a new object

            return {
              ...item, // copy the existing item
              quantity: payload.quantity,
            };
          }
          // Leave every other item unchanged

          return item;
        }),

        loading: false,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default cart;
