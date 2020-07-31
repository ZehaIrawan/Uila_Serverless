import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct } from '../redux/actions/product';

const Upload = ({ addProduct, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    price: 0,
    image: '',
  });

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      const base64 = reader.result.split(',').pop();
      const parsedImage = `${dataURL}${base64}`;
      setFormData({ ...formData, image: parsedImage });
    };

    reader.abort();
    reader.readAsDataURL(e.target.files[0]);
  };

  const { category, title, description, price } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    addProduct(formData);
  };

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
            <h2 className="font-bold text-base">Category</h2>
            <input
              className="bg-gray-200 rounded-md py-2 px-2  w-full focus:outline-none"
              type="text"
              name="category"
              value={category}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-base">Title</h2>
            <input
              className="bg-gray-200 rounded-md py-2 px-2  w-full focus:outline-none"
              type="text"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="mt-4">
            <h2 className="font-bold text-base">Description</h2>
            <input
              className="bg-gray-200 rounded-md py-2 px-2  w-full focus:outline-none"
              type="text"
              name="description"
              value={description}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="mt-4">
            <h2 className="font-bold text-base">Price</h2>
            <input
              className="bg-gray-200 rounded-md py-2 px-2  w-full focus:outline-none"
              type="number"
              name="price"
              value={price}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="mt-4">
            <h2 className="font-bold text-base">Upload Image</h2>
            <input type="file" name="image" onChange={(e) => handleImage(e)} />
          </div>

          <input
            type="submit"
            className="focus:outline-none bg-primary text-white mt-6 font-semibold text-lg py-2 px-12 rounded-lg w-full"
            value="Post Product!"
          />
        </form>
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addProduct })(Upload);
