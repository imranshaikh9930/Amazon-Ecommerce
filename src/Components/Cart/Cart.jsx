import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

import { RemoveCart } from "../../redux/cartSlice";
const Cart = () => {
  const products = useSelector((state) => state.basket.basket);
  const subtotal = useSelector((state) =>
    state.basket.basket.reduce(
      (subtotal, product) => subtotal + product.price * product.quantity,
      0
    )
  );

  
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();


  console.log(cart)

  useEffect(() => {
    setCart(products);
  }, [products, dispatch]);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     setUser(uid); // Assuming setUser is a state setter function
  //     // You might want to dispatch an action here to update user state in Redux
  //   } else {
  //     setUser(null); // Assuming setUser is a state setter function
  //     // You might want to dispatch an action here to clear user state in Redux
  //   }
  // });

  // UseEffect to fetch cart data when the component mounts
  // useEffect(() => {
  //   if (user) {
  //     const fetchCartData = async () => {
  //       try {
  //         // Construct a query to fetch cart data for the current user
  //         const q = query(collection(db, 'cart'), where('userId', '==', user));

  //         // Execute the query
  //         const querySnapshot = await getDocs(q);

  //         // Extract the data from the query snapshot
  //         const data = querySnapshot.docs.map(doc => ({
  //           id: doc.id,
  //           ...doc.data()
  //         }));

  //         // Update the cart state with the fetched data
  //         setCart(data);
  //       } catch (error) {
  //         console.error('Error fetching cart data:', error);
  //       }
  //     };

  //     // Call the fetchCartData function
  //     fetchCartData();
  //   }
  // }, [user]);

  const handleRemoveProduct = (id) => {
    dispatch(RemoveCart({ id }));

    console.log(cart);
  };

  console.log("cart", cart);

  return (
    <>
    <Navbar  cart= {cart }/>
    <div className="mx-auto flex flex-col justify-between md:flex-row">
      <div className="md:w-3/4"> {/* Adjust width as needed */}
        <h1 className=" text-3xl md:text-4xl text-center font-bold text-gray-900 dark:text-white p-4 mt-[4rem] md:mt-[4.6rem]">
          Your Shopping Cart
        </h1>
  
        <div className="flex flex-col gap-4 items-center justify-center">
          {cart.map((prod) => (
            <div key={prod.id} className="max-w-max flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img
                className="object-cover w-1/2 rounded-t-lg h-full my-2 md:h-full md:w-36 md:rounded-none md:rounded-lg"
                src={prod.image}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {prod.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {prod.description}
                </p>
                <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
                ₹{prod.price}
                </p>
                <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
                  Quantity: {prod.quantity}
                </p>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => handleRemoveProduct(prod.id)}
                >
                  Remove Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      <div className="md:w-1/4 bg-white rounded p-4 mt-0 md:mt-20 text-center ">
        <div className="text-xs xl:text-sm text-green-800 mb-2 ">
          Your order qualifies for <span className="font-bold">FREE DELIVERY</span>. Delivery Details
        </div>
        <div className="text-base xl:text-lg mb-4">
          Subtotal ({subtotal.toFixed(2)} items): <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
        </div>
        <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </>
  
  );
};

export default Cart;
