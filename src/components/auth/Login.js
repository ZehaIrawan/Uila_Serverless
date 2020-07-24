import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../redux/actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex h-screen">
      <div className="w-full lg:w-1/3 flex flex-col justify-center items-center mx-12">
        <Link to="/" className="self-center">
          <h1 className="text-primary font-extrabold text-3xl  w-full sm:w-64">
            Uila!
          </h1>
        </Link>

        <h1 className="text-2xl font-bold self-center w-full sm:w-64 ">
          Sign in to Uila!
        </h1>
        <form onSubmit={(e) => onSubmit(e)} className="w-full sm:w-64">
          <div className="mt-6">
            <h2 className="font-bold text-base">Email</h2>
            <input
             className="bg-gray-200 rounded-md py-2 px-2  w-full focus:outline-none"
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-base">Password</h2>
            <input
              className="bg-gray-200 rounded-md py-2 px-2  w-full focus:outline-none"
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>

          <input
            type="submit"
            className="focus:outline-none bg-primary text-white mt-6 font-semibold text-lg py-2 px-12 rounded-lg w-full"
            value="Sign in"
          />
        </form>
        <p className="mt-6">
          Dont have an account?
          <Link to="/register">
            <span className="text-blue"> Sign Up</span>
          </Link>
        </p>
      </div>
      <div
        className="w-full lg:w-2/3 hidden lg:block bg-cover relative"
        style={{ backgroundImage: `url('https://i.imgur.com/uxW5U5Q.jpg')` }}
      >
        <div
          className="text-white bg-black opacity-75 absolute py-2 px-2 rounded-lg"
          style={{ top: '60%', left: '20%' }}
        >
          <h1 className="text-4xl font-extrabold">
            The food you love, delivered.
          </h1>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
