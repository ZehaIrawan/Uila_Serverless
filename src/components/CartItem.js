import React from 'react';
import { connect } from 'react-redux';
import {updateCart} from '../redux/actions/cart'

const CartItem = ({
  title,
  quantity,
  product,
  product_id,
  img,
  price,
  cart_id,
  removeCart,
  increaseCart,
  decreaseCart,
  cart,
  updateCart
}) => {
  const changeQuantity = (e) => {
    // console.log(e);
  };

  return (
    <div className="ml-32">
      <div>
        <div className="flex mt-12">
          <img src={img} alt="product" className="mr-12 rounded-lg w-32" />
          <div>
            <h1 className="font-bold">{title}</h1>

            <h4 className="text-primary font-bold">$ {price}</h4>
          </div>
        </div>
        <button onClick={() => updateCart(product_id, quantity - 1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            x="0"
            y="0"
            viewBox="0 0 48 48"
          >
            <path
              fill="#4caf50"
              d="M44 24c0 11.045-8.955 20-20 20S4 35.045 4 24 12.955 4 24 4s20 8.955 20 20z"
            ></path>
            <path fill="#fff" d="M14 21h20v6H14v-6z"></path>
          </svg>
        </button>
        <input
          className="pl-4 w-10 focus:outline-none"
          type="integer"
          onChange={changeQuantity(quantity)}
          placeholder={quantity}
        ></input>
        <button onClick={() =>updateCart(
                 product_id,
                  quantity+1
                )}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            x="0"
            y="0"
            viewBox="0 0 48 48"
          >
            <path
              fill="#4caf50"
              d="M44 24c0 11.045-8.955 20-20 20S4 35.045 4 24 12.955 4 24 4s20 8.955 20 20z"
            ></path>
            <path fill="#fff" d="M21 14h6v20h-6V14z"></path>
            <path fill="#fff" d="M14 21h20v6H14v-6z"></path>
          </svg>
        </button>
        <button
        className="focus:outline-none"
          onClick={() => {
            removeCart(product_id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            x="0"
            y="0"
            viewBox="0 0 172 172"
          >
            <g
              fill="none"
              strokeMiterlimit="10"
              fontFamily="none"
              fontSize="none"
              fontWeight="none"
              textAnchor="none"
              style={{ mixBlendMode: 'normal' }}
            >
              <path
                d="M0 172V0h172v172z"
                transform="matrix(.7 0 0 .7 25.8 25.8)"
              ></path>
              <path
                fill="#ccc"
                d="M74.533 17.2a5.734 5.734 0 00-5.811 5.733H34.4a5.734 5.734 0 100 11.467h103.2a5.734 5.734 0 100-11.467h-34.322a5.734 5.734 0 00-5.811-5.733zM34.4 45.867V137.6c0 6.335 5.131 11.467 11.467 11.467h80.266c6.336 0 11.467-5.132 11.467-11.467V45.867z"
                transform="matrix(.7 0 0 .7 25.8 25.8)"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

const mapStateToProp = (state) => ({
  product: state.product.products,
});

export default connect(mapStateToProp, {updateCart})(CartItem);
