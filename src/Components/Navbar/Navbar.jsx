import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "../../redux/userSlice";
import logo from "../../assets/logo.png"

// eslint-disable-next-line react/prop-types
const Navbar = ({ handleSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const basket = useSelector((state) => state.basket.basket);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const userDoc = await getDoc(doc(db, "users", user.uid));
  //       const userData = userDoc.data();
  //       dispatch(
  //         setUser({
  //           name: userData.name,
  //           email: userData.email,
  //           uid: userData.uid,
  //         })
  //       );
  //       navigate("/");
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out !");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <nav className="bg-black max-w-screen h-full flex justify-between items-center text-white p-3 gap-3">
        <NavLink className="text-xl" to={"/"}>
        <img src={logo} alt="" className="w-[100px] object-contain mx-auto mt-[18px] "/>
        </NavLink>

        {/* Search Input */}
        <div className="flex flex-1 items-center h-10 bg-white w-1/2 gap-2 rounded-r-lg">
          <input
            type="text"
            placeholder="Search Products...."
            className="border border-0 text-black outline-0 w-[100%] px-4 md:w-[100%]  "
            onChange={handleSearch}
          />
          <div className="bg-yellow-500 h-[100%] p-3 rounded-r-lg">
            <FaSearch className="text-black h-[100%]" />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          {mobileMenuOpen ? (
            <FaTimes
              className="text-white text-2xl"
              onClick={() => setMobileMenuOpen(false)}
            />
          ) : (
            <FaBars
              className="text-white text-2xl"
              onClick={() => setMobileMenuOpen(true)}
            />
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between gap-6 p-2 ">
          {user ? (
            <>
              <span>
                Hello {user.name} <br />
                <button onClick={handleLogout}>Logout</button>
              </span>
            </>
          ) : (
            <>
              <NavLink to={"/login"}>Login</NavLink>
            </>
          )}
          <NavLink to={"/orders"}>Orders</NavLink>
          <div className="md:relative">
            <NavLink to={"/cart"}>
              <FaShoppingCart className="w-6 h-6 text-yellow-500" />
            </NavLink>
            <p className="absolute -top-3 -right-1 bg-red-600 rounded-full w-5 text-center">
              {basket.length}
            </p>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[100%] left-0 z-0 w-full bg-black text-white transition-transform ">
            <ul className="flex flex-col items-center gap-4 py-4">
              {user ? (
                <li>
                  Hello {user.name}
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
              )}
              <li>
                <NavLink to={"/orders"}>Orders</NavLink>
              </li>
            </ul>
          </div>
        )}

        <div className="fixed bottom-[2.5rem] right-4 bg-black p-2 rounded-full md:hidden">
          <NavLink to={"/cart"}>
            <FaShoppingCart className="w-6 h-6 text-yellow-500" />
          </NavLink>
          <p className="absolute -top-3 -right-1 bg-red-600 rounded-full w-5 text-center">
            {basket.length}
          </p>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
