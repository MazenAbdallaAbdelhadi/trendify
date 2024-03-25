import { selectCurrentToken } from "@/services/state/authSlice";
import { useAppSelector } from "@/services/state/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Private = () => {
  const location = useLocation();
  const token = useAppSelector(selectCurrentToken);

  return token !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default Private;
