import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrder } from '../redux/actions/order';
import Navbar from './Navbar';

const Order = ({ order, getOrder ,loading}) => {
  useEffect(() => {
    getOrder();
  }, []);


  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div>
      <Navbar></Navbar>
      Order
      {order[0].map((e) => (
        <div key={e.paymentId}>
          <p>Invoice/{e.paymentId}</p>
          <h1>${e.total}</h1>
          <p>{e.status}</p>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.order,
  loading:state.order.loading
});

export default connect(mapStateToProps, { getOrder })(Order);
