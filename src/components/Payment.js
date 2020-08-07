import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import Navbar from './Navbar';

const stripePromise = loadStripe(
  'pk_test_51HCKcKGugXNbyMGPDLaxk33eVxiW8psuO1t9KcfMPgHhKX8YXIWd5FdvPlWu9RzempR83fCQhFLiUdGLbSzNlVSM00GvRTkc3q',
);

const Payment = () => {
  const [status, setStatus] = React.useState('ready');

  if (status === 'success') {
    return <div>Congrats on your empanadas!</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <Navbar></Navbar>
      <CheckoutForm
        success={() => {
          setStatus('success');
        }}
      />
    </Elements>
  );
};

export default Payment;
