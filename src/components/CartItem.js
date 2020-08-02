import React from 'react';
import { connect } from 'react-redux';

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
}) => {
  const changeQuantity = (e) => {
    // console.log(e);
  };

  return (
    <div className="ml-32">
      <div>
        <div className="flex mt-12">
          <img src={img} width="200" alt="" className="mr-12 rounded-lg"/>
          <h1>{title}</h1>
        </div>
        <h4>$ {price}</h4>
        <input
          type="integer"
          onChange={changeQuantity(quantity)}
          placeholder={quantity}
        ></input>
        <button onClick={() => decreaseCart(cart_id, quantity - 1)}>-</button>
        <button onClick={() => increaseCart(cart_id, quantity + 1)}>+</button>
        <button onClick={() => removeCart(cart_id)}>Delete</button>
      </div>
    </div>
  );
};

const mapStateToProp = (state) => ({
  product: state.product.products,
});

export default connect(mapStateToProp, {})(CartItem);
