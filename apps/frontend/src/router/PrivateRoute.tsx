import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { RootState } from "../redux/reducers";
import { route } from "../constants/routes";

const PrivateRoute = () => {
    const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

    return isSignedIn ? (
        <Outlet />
    ) : (
        <Navigate to={route.signIn.path} replace />
    );
};

export default PrivateRoute;
