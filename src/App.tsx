import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./pages/Register/Register";
import MainLayout from "./components/dashboard/MainLayout";
import { createContext, Suspense, useState, lazy } from "react";
import { AuthGuard } from "./guards";
import { PrivateRoutes, PublicRoutes } from "./routes";
import RoutesWithNotFound from "./utilities/routes-with-not-found";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Loading from "./components/loading/Loading";
const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import("./pages/Private/private"));

interface ContextProps {
  isToggleSidebar: boolean;
  setIsToggleSidebar: (value: boolean) => void;
  themeMode: boolean;
  setThemeMode: (value: boolean) => void;
}
const MyContext = createContext<ContextProps | undefined>(undefined);
function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [themeMode, setThemeMode] = useState(true);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    themeMode,
    setThemeMode,
  };
  return (
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <BrowserRouter>
          <MyContext.Provider value={values}>
            <RoutesWithNotFound>
              <Route path={PublicRoutes.HOME} element={<Home />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.REGISTER} element={<Register />} />
              <Route path={PublicRoutes.ABOUT} element={<About />} />
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route index element={<MainLayout />} />
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
            </RoutesWithNotFound>
          </MyContext.Provider>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
}

export default App;
export { MyContext };
