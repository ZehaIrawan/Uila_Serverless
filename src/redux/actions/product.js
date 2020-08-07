import api from '../../utils/api';
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  FILTER_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_CATEGORIES,
  PRODUCT_ERROR,
  RESET_PRODUCT_FILTER,
  UPDATE_PRODUCT,
} from './types';

// Get PRODUGET_PRODUCTS
export const getProducts = () => async (dispatch) => {
  try {
    const res = await api.get(`/products`);

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Get Product Categories

export const getProductCategories = () => async (dispatch) => {
  try {
    const res = await api.get(`/categories`);

    dispatch({
      type: GET_PRODUCTS_CATEGORIES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Add Product
export const addProduct = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`/products`, formData);

    dispatch({
      type: ADD_PRODUCT,
      payload: res.formData,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { err },
    });
  }
};

// Delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.delete(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/products/${id}`,
    );

    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit Product
export const editProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_PRODUCT,
      payload: formData,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update Product

export const updateProduct = (id, formData) => async (dispatch) => {

  try {
    const res = await api.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/products${id}`,
      formData,
    );

    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Filter products by category
export const filterProducts = (categoryId) => ({
  type: FILTER_PRODUCT,
  payload: categoryId,
});

// Reset product filter
export const resetFilterProducts = (categoryId) => ({
  type: RESET_PRODUCT_FILTER,
  payload: categoryId,
});
