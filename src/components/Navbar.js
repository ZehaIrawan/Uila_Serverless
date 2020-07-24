import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/auth';
import { getCart } from '../redux/actions/cart';

const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  cart,
  getCart,
}) => {
  useEffect(() => {
    if (isAuthenticated) getCart();
  }, [getCart, isAuthenticated]);

  const [isOpen, setIsOpen] = useState(false);

  const authLinks = (
    <Fragment>
      <Link
        className="font-semibold text-lg sm:hover:bg-gray-300 rounded-lg mt-1 px-2 py-1"
        to="/products"
      >
        <h2>Our Menu</h2>
      </Link>

      <Link
        className="font-semibold text-lg sm:hover:bg-gray-300 rounded-lg mt-1 px-2 py-1"
        to="/"
      >
        <h2 onClick={logout}>Logout</h2>
      </Link>

      <Link
        className="font-semibold text-lg text-white mx-2 sm:mt-2"
        to="/cart"
      >
        <div className="flex bg-primary w-4/12 pl-2 py-1 sm:w-auto rounded-full sm:px-2">
          <img
            className="pr-1 h-8"
            src="https://img.icons8.com/material/50/ffffff/shopping-basket--v1.png"
            alt="cart-icon"
          />

          <h2 className="bg-primary"> ({cart.length})</h2>
        </div>
      </Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link
        className="font-semibold text-lg sm:hover:bg-gray-300 rounded-lg mt-1 px-2 py-1"
        to="/register"
      >
        <h2>Register</h2>
      </Link>
      <Link
        className="font-semibold text-lg sm:hover:bg-gray-300 rounded-lg mt-1 px-2 py-1"
        to="/login"
      >
        <h2>Login</h2>
      </Link>
    </Fragment>
  );

  return (
    <div className="sm:flex bg-white sm:justify-between shadow-lg sm:px-10">
      <nav className="flex items-center justify-between py-2 px-4 sm:px-8">
        <Link to="/">
          <h1 className="text-primary font-extrabold text-3xl  w-full sm:w-64">
            Uila!
          </h1>
        </Link>
        <button
          type="button"
          className="block text-primary focus:text-primary focus:outline-none sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-12 w-12 fill-current hover:text-black"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                fillRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            )}
          </svg>
        </button>
      </nav>
      {!loading && (
        <div
          className={
            isOpen
              ? 'block px-2 pl-6 sm:flex sm:items-center sm:justify-between'
              : 'hidden sm:block px-2 pl-6 sm:flex items-center sm:justify-between'
          }
        >
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, { logout, getCart })(Navbar);
