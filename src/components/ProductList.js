import React, { Fragment, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { connect } from 'react-redux';
import { addToCart,updateCart } from '../redux/actions/cart';
import {
  filterProducts,
  getProductCategories,
  getProducts,
  resetFilterProducts,
} from '../redux/actions/product';
import Footer from './Footer';
import Navbar from './Navbar';
import Product from './Product';

const ProductList = ({
  getProducts,
  loading,
  product,
  filteredProducts,
  resetFilterProducts,
  filterProducts,
  getProductCategories,
  categories,
  addToCart,
  isAuthenticated,
  cart,
  updateCart
}) => {
  useEffect(() => {
    getProducts();
    getProductCategories();
  }, [getProducts, getProductCategories]);

  useEffect(() => {
    resetFilterProducts();
  }, []);

  const [isActive, setIsActive] = useState(0);

  const [searchKeyword, setSearchKeyword] = useState('');

  const skeletonNumber = 6;

  if (loading) {
    return (
      <Fragment>
        <Navbar />
        <div className="px-8 sm:px-24 md:px-16 py-5">
          <div className="flex flex-col sm:flex-row justify-between my-6">
            <Skeleton width={250} height={35} className=" mt-12 lg:mt-0" />

            <div className="flex flex-col items-end order-first sm:order-last  ">
              <div>
                <Skeleton width={400} height={25} />
              </div>
              <Skeleton width={200} height={25} />
            </div>
          </div>

          <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid gap-8">
            {[...Array(skeletonNumber)].map((e, i) => (
              <div key={i}>
                <SkeletonTheme color="#eeeeee">
                  <Skeleton className="rounded-lg" height={220}></Skeleton>
                  <Skeleton width={150} className="mt-4"></Skeleton>
                  <Skeleton count={2} className="mt-4" />
                </SkeletonTheme>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar></Navbar>
      <div className="px-8 sm:px-24 md:px-16 py-5">
        <div className="flex justify-between my-6 flex-col lg:flex-row">
          <div className="bg-gray-200 rounded-lg w-full sm:w-64 mt-12 lg:mt-0 h-10 pr-6">
            <img
              onClick={() => alert('Whoa! This feature is not ready')}
              className="h-8 inline ml-2"
              alt="search-icon"
              src="https://img.icons8.com/ios-filled/50/000000/search.png"
            />
            <input
              type="text"
              name=""
              placeholder="What are you craving?"
              className="inline bg-gray-200 pt-2 ml-2 focus:outline-none "
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            ></input>
          </div>

          <div className="order-first lg:order-last">
            <p className="text-xl" style={{ fontFamily: 'EB Garamond' }}>
              <span>“</span> All you need is love. But a little chocolate now
              and then doesn't hurt.<span> ”</span>
              <br></br>
              <span
                style={{ fontFamily: 'Open Sans Condensed' }}
                className="text-primary font-semibold flex-end absolute right-0 mr-24"
              >
                Charles M. Schulz
              </span>
            </p>
          </div>
        </div>

        <button
          className={
            isActive === 0
              ? 'border-black  text-white rounded-lg m-4 py-1 px-4 bg-custom-sort bg-primary focus:outline-none shadow-lg'
              : 'border-gray-900 border-1 rounded-lg m-4 py-1 px-4 bg-custom-sort bg-gray-200 focus:outline-none shadow-lg'
          }
          onClick={() => {
            resetFilterProducts();
            setIsActive(0);
          }}
        >
          All ({product.length})
        </button>

        {categories.map((category) => {
          let count = 0;

          product.forEach((p) => {
            if (p.category === category._id) count += 1;
          });

          return (
            <button
              className={
                isActive === category._id
                  ? 'border-black  text-white rounded-lg m-4 py-1 px-4 bg-custom-sort bg-primary focus:outline-none shadow-lg'
                  : 'border-gray-900 border-1 rounded-lg m-4 py-1 px-4 bg-gray-200 focus:outline-none shadow-lg'
              }
              key={category._id}
              onClick={() => {
                filterProducts(category._id);
                setIsActive(category._id);
              }}
            >
              {category.title} ({count})
            </button>
          );
        })}

        <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid gap-8">
          {filteredProducts.map((product) => (
            <Product
              key={product._id}
              id={product._id}
              img={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              addToCart={addToCart}
              isAuthenticated={isAuthenticated}
              cart={cart}
              updateCart={updateCart}
            />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product.products,
  loading: state.product.loading,
  filteredProducts: state.product.filteredProducts,
  categories: state.product.categories,
  isAuthenticated: state.auth.isAuthenticated,
  cart:state.cart.cart
});

export default connect(mapStateToProps, {
  getProducts,
  filterProducts,
  resetFilterProducts,
  getProductCategories,
  addToCart,
  updateCart
})(ProductList);
