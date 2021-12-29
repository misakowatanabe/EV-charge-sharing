import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserAuthData } from "../context/slices/UserAuthDataSlice";
import PublicLayout from "../layout/PublicLayout";

const PublicRoute = () => {
  const userAuthData = useSelector(selectUserAuthData);

  if (!userAuthData) {
    return (
      <div className="Login">
        <PublicLayout>
          <Outlet />
        </PublicLayout>
      </div>
    );
  }

  return <Navigate replace to="/" />;
};
export default PublicRoute;
