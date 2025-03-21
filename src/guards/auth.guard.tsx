import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PublicRoutes } from "../routes";
import Home from "../pages/Home/Home";

interface Props {
  privateValidation: boolean;
}

export const AuthGuard = ({ privateValidation }: Props) => {
  const userState = useSelector((store: AppStore) => store.user);
  const location = useLocation();

  if (location.pathname === "/") {
    return <Home />;
  }

  if (!userState.name && privateValidation) {
    return <Navigate replace to={PublicRoutes.LOGIN} />;
  }

  return <Outlet />;
};

export default AuthGuard;
