import { FaHome } from "react-icons/fa";
import { PublicRoutes } from "../../routes";
import "../../styles/notfound.css";

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="content">
        <div className="go-home">
          <FaHome className="icon" />
          <a href={PublicRoutes.HOME}>Home</a>
        </div>
        <img src="/images/notfound.jpg" />
      </div>
      <h1>It looks like the URL is incorrect or the page doesn't exist.</h1>
    </div>
  );
}
export default NotFound;
