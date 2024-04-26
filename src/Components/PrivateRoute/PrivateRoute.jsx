import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";

const PrivateRoute = () => {
    // const user = useSelector((state) => state.user.user);

   const [user] =  useAuthState(auth);

    // Check if user is authenticated
    if (!user) {
        // If not authenticated, redirect to the root route ("/")
        return <Navigate to="/" replace />;
    } else {
        // If authenticated, render child routes
        return <Outlet />;
    }
};

export default PrivateRoute;
