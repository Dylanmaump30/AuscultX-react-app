import { useNavigate } from "react-router-dom";
import { resetUser, UserKey } from "../../redux/states/user";
import { clearLocalStorage } from "../../utilities/localStorage.utility";
import { PublicRoutes } from "../../routes";
import { useDispatch } from "react-redux";

function logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(PublicRoutes.LOGIN, { replace: true });
  };
  return logOut;
}
export default logout;
