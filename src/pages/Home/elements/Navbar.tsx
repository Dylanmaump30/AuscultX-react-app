import { Link } from "react-router-dom";
import { PublicRoutes } from "../../../routes";
import "../../../styles/navbar.css";
import { logo } from "../../../routes";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={PublicRoutes.HOME} className="navbar-logo">
          <img src={logo.logo} alt="AuscultX Logo" className="logo-image" />
          <span className="logo-text">AuscultX</span>
        </Link>

        <div className="navbar-menu">
          <Link to={PublicRoutes.HOME} className="btn-nav ">
            Home
          </Link>
          <Link to={`/${PublicRoutes.ABOUT}`} className="btn-nav ">
            About Us
          </Link>
          <Link to={`/${PublicRoutes.LOGIN}`} className="btn-nav">
            Login
          </Link>
          <Link to={`/${PublicRoutes.REGISTER}`} className="btn-nav-register">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
