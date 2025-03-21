import Sidebar from "./Sidebar";
import Header from "./Header";
import { ReactNode, useContext } from "react";
import { MyContext } from "../../App";
interface Props {
  children?: ReactNode;
}
const MainLayout = ({ children }: Props) => {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { isToggleSidebar } = context;

  return (
    <div className="main-layout d-flex">
      <Header />
      <div className="sb d-flex" style={{ flex: 1 }}>
        <div className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""}`}>
          <Sidebar />
        </div>
        <div className={`content-wrapper ${isToggleSidebar ? "toggle" : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
