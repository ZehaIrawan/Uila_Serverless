import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearCart,
  decreaseCart,
  getCart,
  increaseCart,
  removeCart,
} from '../redux/actions/cart';
import CartItem from './CartItem';
import Navbar from './Navbar';

const Cart = ({
  getCart,
  loading,
  cart,
  increaseCart,
  decreaseCart,
  removeCart,
  clearCart,
}) => {
  useEffect(() => {
    getCart();
  }, [getCart]);

  if (loading) {
    return (
      <Fragment>
        <Navbar />
        Loading...
      </Fragment>
    );
  }

  let total = 0;
  cart.cart.map((item) => {
    return (total += parseFloat(item.product.price) * parseInt(item.quantity));
  });
  if (cart.cart.length === 0)
    return (
      <Fragment>
        <Navbar />
        <h3 style={{ textAlign: 'center' }}> Your cart is empty</h3>
        <button
          onClick={() => {
            clearCart(cart.cart);
          }}
          className="total theme-button"
        >
          Clear Cart
        </button>
      </Fragment>
    );

  return (
    <Fragment>
      <Navbar />
      {cart.cart.map((cart) => (
        <CartItem
          key={cart.id}
          cart_id={cart.id}
          title={cart.product.title}
          img={cart.product.image}
          price={cart.product.price}
          product_id={cart.product_id}
          quantity={cart.quantity}
          increaseCart={increaseCart}
          decreaseCart={decreaseCart}
          removeCart={removeCart}
          cart={cart}
        />
      ))}
      <button
        onClick={() => {
          clearCart(cart.cart);
        }}
      >
        Clear Cart
      </button>
      <h3>Total: ${total}</h3>
      <button>
        <Link to="/shipping">Checkout</Link>
      </button>
    </Fragment>
  );
};

const mapStateToProp = (state) => ({
  cart: state.cart,
  loading: state.cart.loading,
});

export default connect(mapStateToProp, {
  getCart,
  increaseCart,
  decreaseCart,
  clearCart,
  removeCart,
})(Cart);
