import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const Modal = ({ isShowing, hide, isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(true);

  return isShowing && !isAuthenticated
    ? ReactDOM.createPortal(
        <React.Fragment>
          {isOpen ? (
            <button
              onClick={hide}
              tabIndex="-1"
              className="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"
            ></button>
          ) : null}

          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="bg-white w-64 h-48 absolute top-0 mt-2/6 sm:mt-56  py-4 px-6 rounded-lg text-center left-12 ml-auto mr-auto left-0 right-0">
              <div>
                <h1 className="font-bold">Ready to order?</h1>
                <p className="font-medium pt-4 text-base">
                  Sign in <br />
                  or
                  <br /> Sign up to get started
                </p>

                <div className="flex justify-around pt-4">
                  <button
                    type="button"
                    className="block bg-primary py-1 px-4 rounded-lg text-white focus:outline-none"
                    onClick={hide}
                  >
                    <span className="font-semibold">Not yet</span>
                  </button>

                  <Link
                    to="/login"
                    className="block bg-primary py-1 px-4 rounded-lg text-white"
                  >
                    <span className="font-semibold"> Let's go</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.getElementById('app'),
      )
    : null;
};

export default Modal;
