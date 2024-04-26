import React, { useEffect, useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { doc,getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import  {setUser} from "../../redux/userSlice";
import {useDispatch  } from "react-redux"; 
import { auth,db } from '../../firebase';

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch  = useDispatch();
  const navigate = useNavigate();



  
  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      dispatch(
        setUser({
          name: userData.name,
          email: userData.email,
          uid: userData.uid,
        })
      );
      alert('Successfully Logged In');
      navigate('/');
    } catch (error) {
      alert(error.message); // Handle login errors
    }
  };
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
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
     
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleLogin}>
          Log In
        </button>
        <NavLink to={"/forgot"} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </NavLink>
      </div>
    </form>
    <div className="text-center text-gray-500 text-xs">
   Don't Have an Account. <NavLink to={"/signin"} className='text-blue-700 font-bold '>Signup</NavLink> 
    </div>
  </div>
  </div>
  )
}

export default Login