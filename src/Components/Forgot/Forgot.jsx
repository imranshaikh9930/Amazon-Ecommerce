import { useState } from 'react'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase';
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
const Forgot = () => {

    const [email,setEmail] = useState("");
    
    const navigate = useNavigate();

    const handleForgot = ()=>{
        sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/login");
        toast.success("Check Your Gmail");
       
      })
      .catch((error) => {
        toast.error(error.message);
        
      });
    }
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
    <div className="w-full max-w-xs">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Username" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleForgot}>
          Reset
        </button>
        
      </div>
    </form>
  
  </div>
  </div>
  )
}

export default Forgot