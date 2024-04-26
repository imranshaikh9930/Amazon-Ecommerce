/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AddToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

const Product = ({ products }) => {
  const [userId, setUserId] = useState("");
  const [rating, setRating] = useState(0); // Initialize rating state with 0

  const dispatch = useDispatch();
  const prod = useSelector((state) => state.basket.basket);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      } else {
        setUserId(""); // Handle case when user is signed out
      }
    });
  }, []);

  // Update rating state when products.rating.rate changes
  useEffect(() => {
    if (products.rating && products.rating.rate) {
      setRating(products.rating.rate);
    }
  }, [products.rating]);

  const handleProduct = async (products) => {
    dispatch(AddToCart(products));
    try {
      toast.success('Product added to cart');
    } catch (error) {
      console.error('Error handling product:', error);
      toast.error('Error adding product to cart');
    }
  };

  return (
    <div className="w-full max-w-sm h-96  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <NavLink to={`/product/${products.id}`}>
        <img className="p-8 rounded-t-lg w-36 h-44 object-cover mx-auto md:w-48 md:h-60" src={products.image} alt="product image" />
      </NavLink>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">{products.title}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          {/* Rating */}
          {/* {Array.from(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))} */}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{products.price}</span>
          <button href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleProduct(products)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
