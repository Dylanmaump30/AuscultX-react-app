import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";

interface Props {
  children: ReactNode;
}

function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default RoutesWithNotFound;
