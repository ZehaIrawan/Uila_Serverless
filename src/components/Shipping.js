import React from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom'

const Shipping = () => {
  return (
    <div>
      <Navbar></Navbar>

      Select you address :

      1.
      2.
      3.
      ===
      You dont have address, please add one

      Shipping
      ====
      Form to add payment

      <Link to="/payment">Continue to payment</Link>
    </div>
  );
};

export default Shipping;
