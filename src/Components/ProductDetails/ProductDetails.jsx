
import { prod } from "../../data/jsonformatter";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { toast } from 'react-toastify';
import { AddToCart } from "../../redux/cartSlice";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = prod.find((product) => product.id === parseInt(id));

  const handleAddProduct  =(singleProduct)=>{

    dispatch(AddToCart(singleProduct));
    toast.success('Product added to cart');

  }
  // console.log(singleProduct);
  return (
    // div
    <div className="">
    <Navbar/>

    <div className="font-inter h-[calc(100vh-100px)] w-screen flex justify-start items-start p-10">
        <div className="flex flex-col items-center gap-6 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:max-w-[60%]">
            <img
                className="object-cover w-1/2 rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-lg"
                src={singleProduct.image}
                alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {singleProduct.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {singleProduct.description}
                </p>
                <p className="mb-3 text-gray-700 dark:text-gray-400 font-bold">
                    ₹{singleProduct.price}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Rating: {singleProduct.rating.rate}
                </p>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={()=>handleAddProduct(singleProduct)}
                >
                    Add to cart
                </button>
            </div>
        </div>
    </div> 
</div>

  );
};

export default ProductDetails;
