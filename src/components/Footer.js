import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-8 pt-8 px-8 sm:px-20 pb-16 sm:pb-20 bg-black text-white">
      <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid gap-8 justify-between border-b-2 pb-12 mb-8">
        <div className="flex flex-col justify-between">
        <h1 className="text-primary font-extrabold text-3xl  w-full sm:w-64">
            Uila!
          </h1>

          <div className="flex mt-6 sm:mt-0">
            <a
              href="https://www.apple.com/ios/app-store/"
              target="blank"
              rel="noopener noreferrer"
            >
              <img
                className="h-10 pr-6"
                src="https://i.imgur.com/XYAHGao.png"
                alt=""
              />
            </a>

            <a
              href="https://play.google.com/store"
              target="blank"
              rel="noopener noreferrer"
            >
              <img
                className="h-10"
                src="https://i.imgur.com/FuSWv7Y.png"
                alt=""
              />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Our Location</h3>
          <p>77th Sudirman Street</p>
          <p> (between 5th and 6th Avenues)</p>
          <p> East Java, ID 10019</p>
        </div>

        <div>
          <h3 className="font-semibold  mb-4">Built with</h3>
          <ul>
            <li className="hover:underline">
              <a
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>
            </li>
            <li className="hover:underline">
              <a
                href="https://icons8.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Icons8
              </a>
            </li>
            <li className="hover:underline">
              <a
                href="https://rubyonrails.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ruby on Rails
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between flex-col sm:flex-row">
        <ul className="flex">
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="h-6"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
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
                  <path d="M0 172V0h172v172z"></path>
                  <path
                    fill="#fff"
                    d="M172.215 35.905a70.76 70.76 0 01-20.33 5.577c7.31-4.381 12.926-11.315 15.56-19.565a71.028 71.028 0 01-22.468 8.573 35.289 35.289 0 00-25.813-11.167c-19.538 0-35.381 15.83-35.381 35.368 0 2.768.322 5.469.927 8.062-29.401-1.478-55.457-15.56-72.912-36.966a35.237 35.237 0 00-4.784 17.79c0 12.27 6.235 23.1 15.736 29.456a35.341 35.341 0 01-16.031-4.435v.444c0 17.146 12.201 31.43 28.366 34.695a35.395 35.395 0 01-9.312 1.237c-2.284 0-4.501-.215-6.665-.645 4.515 14.042 17.576 24.295 33.043 24.577-12.094 9.487-27.345 15.13-43.927 15.13a69.55 69.55 0 01-8.426-.497c15.642 10.052 34.24 15.897 54.22 15.897 65.065 0 100.648-53.898 100.648-100.634 0-1.531-.04-3.077-.094-4.582a71.91 71.91 0 0017.643-18.315z"
                  ></path>
                </g>
              </svg>
            </a>
          </li>

          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="h-6"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
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
                  <path d="M0 172V0h172v172z"></path>
                  <path
                    fill="#fff"
                    d="M55.04 10.32c-24.656 0-44.72 20.064-44.72 44.72v61.92c0 24.656 20.064 44.72 44.72 44.72h61.92c24.656 0 44.72-20.064 44.72-44.72V55.04c0-24.656-20.064-44.72-44.72-44.72zm0 6.88h61.92c20.938 0 37.84 16.902 37.84 37.84v61.92c0 20.938-16.902 37.84-37.84 37.84H55.04c-20.937 0-37.84-16.902-37.84-37.84V55.04c0-20.937 16.903-37.84 37.84-37.84zm72.24 20.64a6.88 6.88 0 100 13.76 6.88 6.88 0 000-13.76zM86 48.16c-20.858 0-37.84 16.982-37.84 37.84 0 20.858 16.982 37.84 37.84 37.84 20.858 0 37.84-16.982 37.84-37.84 0-20.858-16.982-37.84-37.84-37.84zm0 6.88c17.14 0 30.96 13.82 30.96 30.96S103.14 116.96 86 116.96 55.04 103.14 55.04 86 68.86 55.04 86 55.04z"
                  ></path>
                </g>
              </svg>
            </a>
          </li>

          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="h-6"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
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
                  <path d="M0 172V0h172v172z"></path>
                  <path
                    fill="#fff"
                    d="M86 10.32c-41.796 0-75.68 33.884-75.68 75.68 0 37.943 27.95 69.271 64.37 74.744V106.06H55.964V86.165H74.69V72.928c0-21.916 10.678-31.538 28.893-31.538 8.724 0 13.337.647 15.521.943v17.365h-12.425c-7.733 0-10.434 7.33-10.434 15.593v10.874h22.663l-3.075 19.894H96.244v54.847c36.939-5.012 65.436-36.595 65.436-74.906 0-41.796-33.884-75.68-75.68-75.68z"
                  ></path>
                </g>
              </svg>
            </a>
          </li>
        </ul>

        <ul className="flex mt-6 sm:mt-0 ">
          <li className="mr-6 hover:underline">
            <a href="/">Privacy Policy</a>
          </li>
          <li className="mr-6 hover:underline">
            <a href="/">Terms</a>
          </li>
          <li className="mr-6 hover:underline">
            <a href="/">Uila! by Zeha</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
