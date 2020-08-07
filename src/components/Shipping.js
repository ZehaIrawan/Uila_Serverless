import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAddress,createAddress } from '../redux/actions/address';
import {selectAddress} from '../redux/actions/cart'
import Navbar from './Navbar';

const Shipping = ({ address, getAddress,createAddress,selectAddress,loading }) => {
  useEffect(() => {
    getAddress();
  }, [getAddress]);

  const [formData, setFormData] = useState({
    newtitle: '',
    newAddress: '',
  });



  const { newTitle, newAddress } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    createAddress(newTitle,newAddress)
  };

  const emptyAddress = (
    <div>
      Select you address : 1. 2. 3. === You dont have address, please add one
      Shipping ==== Form to add payment
      <Link to="/payment">Continue to payment</Link>
    </div>
  );

  const userAddress = (
    <div>
      <h1 className="text-lg font-semibold">Select a delivery address</h1>
      <select  onChange={e => selectAddress(address[address.findIndex(a =>a.address === e.target.value )]._id)}>
        {address.map((e) => {
          return (
            <option key={e._id} >
              {e.address}
            </option>
          );
        })}
      </select>

      <h1 className="text-lg font-bold">Add a new address</h1>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mt-4">
          <h2 className="text-base">Address Label</h2>
          <input
            className="bg-gray-200 rounded-md py-2 px-2 focus:outline-none"
            type="text"
            name="newTitle"
            value={newTitle || ''}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mt-4">
          <h2 className="text-base">Your Address</h2>
          <input
            className="bg-gray-200 rounded-md py-2 px-2 focus:outline-none"
            type="text"
            name="newAddress"
            value={newAddress}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="submit"
          className="focus:outline-none bg-primary text-white my-6 font-semibold text-base py-2 px-2 rounded-lg"
          value="Submit"
        />
      </form>

      <Link
        className="shadow-lg mt-2 bg-primary text-white px-2 py-1 rounded-lg focus:outline-none font-medium mb-6 mr-6"
        to="/payment"
      >
        Continue to payment
      </Link>
    </div>
  );

  if (loading) {
  return (<div>
    <Navbar></Navbar>
    Loading...
    </div>)
  }

  return (
    <Fragment>
      <Navbar></Navbar>
      <div>{address.length < 1 ? emptyAddress : userAddress}</div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  address: state.address.address,
  loading:state.address.loading
});

export default connect(mapStateToProps, { getAddress,createAddress,selectAddress })(Shipping);
