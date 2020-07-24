import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

const Register = () => {
  return (
    <div className="flex h-screen">
      <div className="w-full lg:w-1/3 flex flex-col justify-center items-center mx-12">
        <Link to="/" className="self-center">
          <h1 className="text-primary font-extrabold text-3xl  w-full sm:w-64">
            Uila!
          </h1>
        </Link>

        <h1 className="text-2xl font-bold self-center w-full sm:w-64 ">
          Sign up to Uila!
        </h1>
        <form className="w-full sm:w-64">
          <div className="mt-6">
            <h2 className="font-bold text-base">Email</h2>
            <input
              className="bg-gray-200 rounded-md py-2 px-2 w-full focus:outline-none"
              type="email"
            />
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-base">Password</h2>
            <input
              className="bg-gray-200 rounded-md py-2 px-2  w-full focus:outline-none"
              type="password"
            />
          </div>

          <div className="mt-4">
            <h2 className="font-bold text-base">Confirm your Password</h2>
            <input
              className="bg-gray-200 rounded-md py-2 px-2  w-full focus:outline-none"
              type="password"
            />
          </div>

          <p className="text-sm text-center mt-4">
            By clicking Sign Up, you agree to our<br></br>
            Terms and Privacy Policy.
          </p>

          <input
            type="submit"
            className="focus:outline-none bg-primary text-white mt-6 font-semibold text-lg py-2 px-12 rounded-lg w-full"
            value="Sign up"
          />
        </form>

        <p className="mt-6">
          Already a member? <Link to="/login">Sign in</Link>
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
          <h1 className="text-4xl font-extrabold">The food you love, delivered.</h1>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated:state.isAuthenticated
})

export default connect(mapStateToProps)(Register);
