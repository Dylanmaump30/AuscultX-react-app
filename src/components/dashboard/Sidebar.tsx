import Button from "@mui/material/Button";
import { GrStorage } from "react-icons/gr";
import { DiGoogleAnalytics } from "react-icons/di";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { PrivateRoutes } from "../../routes";

const menuItems = [
  {
    path: `/private/${PrivateRoutes.DASHBOARD}`,
    icon: <DiGoogleAnalytics />,
    label: "Results",
  },
  {
    path: `/private/${PrivateRoutes.STORAGE}`,
    icon: <GrStorage />,
    label: "Storage",
  },
];

const Sidebar = ({ items = menuItems }) => {
  const location = useLocation();

  return (
    <div className="sidebar">
      {items.map(({ path, icon, label }, index) => {
        const isActive = location.pathname === path;

        return (
          <li key={index} className={isActive ? "active" : ""}>
            <Link to={path}>
              <Button
                className={`w-100 sidebar-btn ${isActive ? "active" : ""}`}
              >
                <span className="icon">
                  {icon} {label}
                </span>
                <span className="arrow">
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>
        );
      })}
    </div>
  );
};

export default Sidebar;
