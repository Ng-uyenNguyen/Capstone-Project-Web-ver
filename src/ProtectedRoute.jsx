import { Navigate, Outlet } from "react-router-dom";
export const useAuth = () => {
  const user = localStorage.getItem("userAuth");
  console.log(user);
  if (user && user === "true") {
    return true;
  }
  return false;
};
const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth === true ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
