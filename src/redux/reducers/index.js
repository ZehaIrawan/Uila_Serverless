import { combineReducers } from 'redux';
import auth from './auth';
import product from './product'
import cart from './cart'

export default combineReducers({
  auth,
  product,
  cart
});