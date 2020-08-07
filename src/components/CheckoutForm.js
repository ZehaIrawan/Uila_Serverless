import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { connect } from 'react-redux';
import { initiateCheckout } from '../redux/actions/payment';
import {setAlert} from '../redux/actions/alert'

const CheckoutForm = ({ success, initiateCheckout, cart, address,loading }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      initiateCheckout({
        id,
        amount: cart.total.toString().split('.').join(''),
        description: cart.cart[0].product.title,
      });
    }
  };


  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Review Your Order</h1>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        {cart.cart.map((e) => {
          return (
            <div key={e._id}>
              <h1>{e.product.title}</h1>
              <img src={e.product.image} alt="" className="w-24" />
              <h1>{e.quantity}</h1>
              <h1>{`$ ${e.product.price}`}</h1>
            </div>
          );
        })}

        <h1>Delivery Address</h1>
        <p>{address.title}</p>
        <p>{address.address}</p>
        <CardElement hidePostalCode={true} />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

const mapStateToProp = (state) => ({
  cart: state.cart,
  address: state.cart.address,
  loading: state.cart.loading,
});

export default connect(mapStateToProp, { initiateCheckout })(CheckoutForm);
