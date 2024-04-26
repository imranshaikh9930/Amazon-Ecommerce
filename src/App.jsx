import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Signin from "./Components/SignIn/Signin";
import Login from "./Components/Login/Login";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgot from "./Components/Forgot/Forgot";
import Cart from "./Components/Cart/Cart";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Order from "./Components/Order/Order";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";

function App() {
 
  return (
    <>
    <ToastContainer 
        position="top-center"
      />
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path = "/" element={<Products/>}/>
        
        <Route element={<PrivateRoute/>}>
        <Route path="/orders" element={<Order/>}/>
         <Route path="/cart" element={<Cart/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        </Route> 
      </Routes>
    </Router>
    </>
  )
}

export default App
