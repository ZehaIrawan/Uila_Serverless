import api from '../../utils/api';
import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_CART,
  GET_CART,
  INCREASE_CART,
  REMOVE_CART,
} from './types';
import {setAlert} from './alert'

// Get all products
export const getCart = () => async (dispatch) => {
  try {
    const res = await api.get(`/cart`);
    dispatch({
      type: GET_CART,
      payload: res.data[0],
    });
  } catch (err) {
    console.log(err);
  }
};

// Add an item to cart
export const addToCart = (id, quantity) => async (dispatch) => {
  const params = {
    cart_items: {
      product: id,
      quantity,
    },
  };

  try {
    const res = await api.post(`cart`, params);
    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
    dispatch(setAlert('Product added to cart!', 'bg-green-600'));
  } catch (err) {
    console.log(err);
  }
};

// Remove item from cart
export const removeCart = (id) => async (dispatch) => {
  try {
    await api.delete(`/cart/${id}`);
    dispatch({
      type: REMOVE_CART,
      payload: id,
    });
    dispatch(setAlert('Product removed!', 'bg-green-600'));
  } catch (err) {
    console.log(err);
  }
};

// Increase quantity for an item in the cart
export const increaseCart = (id, quantity) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  quantity = {
    quantity,
  };

  try {
    const res = await api.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/cart_items/${id}`,
      quantity,
      config,
    );

    dispatch({
      type: INCREASE_CART,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Decrease quantity for an item in the cart
export const decreaseCart = (id, quantity) => async (dispatch) => {

  quantity = {
    quantity,
  };

  try {
    const res = await api.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/cart_items/${id}`,
      quantity,
    );

    dispatch({
      type: DECREASE_CART,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//Clear items from cart
export const clearCart = (cart) => async (dispatch) => {
  for (let i = 0; i < cart.length; i++) {
    try {
      await api.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/cart_items/${cart[i].id}`,
      );
      dispatch({
        type: CLEAR_CART,
        payload: cart.id,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

// Update Cart
export const updateCart = (id, quantity) => async (dispatch) => {
  const params = {
    cart_items: {
      product: {
        _id: id,
      },
      quantity,
    },
  };

  try {
    const res = await api.put(`cart`, params);

    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Update Cart
export const selectAddress = (address_id) => async (dispatch) => {
  const params = {
    address:address_id
  };

  try {
    const res = await api.put(`cart`, params);

    dispatch({
      type:GET_CART,
      payload: res.data[0],
    });
  } catch (err) {
    console.log(err);
  }
};
