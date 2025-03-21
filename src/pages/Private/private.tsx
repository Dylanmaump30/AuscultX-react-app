import { Navigate, Route } from "react-router-dom";
import { PrivateRoutes } from "../../routes";
import RoutesWithNotFound from "../../utilities/routes-with-not-found";
import { lazy, Suspense } from "react";
import Loading from "../../components/loading/loading";
const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const Storage = lazy(() => import("../Storage/Storage"));

function Private() {
  return (
    <Suspense fallback={<Loading />}>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
        <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
        <Route path={PrivateRoutes.STORAGE} element={<Storage />} />
      </RoutesWithNotFound>
    </Suspense>
  );
}

export default Private;
