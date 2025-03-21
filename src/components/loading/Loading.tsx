import { logo } from "../../routes";
import "../../styles/loading.css";
function Loading() {
  return (
    <div className="loading">
      <div className="container">
        <img className="logo" src={logo.logoLoad} alt="Logo" />
        <div className="loader">
          <span></span>
        </div>
      </div>
    </div>
  );
}
export default Loading;
