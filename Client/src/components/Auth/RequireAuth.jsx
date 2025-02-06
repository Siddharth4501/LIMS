import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const userData=JSON.parse(localStorage.getItem("userData") || '{}');
  console.log(allowedRoles,"allowedRoles")
  const location = useLocation();

  return isLoggedIn &&  userData && userData?.Active_Status===true && allowedRoles.find((myRole) => userData.roles.some((role)=>role.designation===myRole)) ? (
    <Outlet />
    
  ) : isLoggedIn &&  userData && userData?.Active_Status===true ? (
    <Navigate to={"/denied"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
