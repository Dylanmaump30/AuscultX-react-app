import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdMenuOpen, MdOutlineMenu } from "react-icons/md";
import MyAccount from "./MyAccount";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { logo, PrivateRoutes } from "../../routes";
const Header = () => {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const themeMode = context.themeMode;
  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    }
  }, [themeMode]);
  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="all-elements row d-flex align-items-center w-100">
          <div className="col-4 col-sm-2">
            <Link
              to={`/${PrivateRoutes.PRIVATE}`}
              replace
              className="logo-container  d-flex align-items-center "
            >
              <img src={logo.logo} alt="LungTrack Logo" />
              <span className="ms-2">AuscultX</span>
            </Link>
          </div>
          <div className="menu col-sm-2 d-flex align-items-center">
            <Button
              className="menu-button rounded-circle me-2"
              onClick={() =>
                context.setIsToggleSidebar(!context.isToggleSidebar)
              }
            >
              {context.isToggleSidebar === true ? (
                <MdMenuOpen />
              ) : (
                <MdOutlineMenu />
              )}
            </Button>
          </div>
          <div className="acc col-sm-8 d-flex align-items-center justify-content-end">
            <Button
              className="rounded-circle me-2"
              onClick={() => context.setThemeMode(!context.themeMode)}
            >
              {context.themeMode === false ? (
                <MdOutlineLightMode />
              ) : (
                <MdDarkMode />
              )}
            </Button>
            <MyAccount />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
