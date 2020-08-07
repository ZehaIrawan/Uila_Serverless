import { combineReducers } from 'redux';
import auth from './auth';
import product from './product'
import cart from './cart'
import address from './address'
import alert from './alert'

export default combineReducers({
  auth,
  product,
  cart,
  address,
  alert
});