import api from '../../utils/api';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/users'
    );
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await api.post(
      `/users/signup`,
      body,
      config,
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors);
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post(
      `/users/signin`,
      body,
      config,
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // dispatch(loadUser());
  } catch (err) {
    console.log(err);

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
