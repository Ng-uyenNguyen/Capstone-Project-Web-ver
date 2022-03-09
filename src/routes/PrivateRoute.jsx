import { useLocation, Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
  //context here
  let { user } = true;
  let location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
}