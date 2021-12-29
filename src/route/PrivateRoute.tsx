import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserAuthData } from "../context/slices/UserAuthDataSlice";
import PrivateLayout from "../layout/PrivateLayout";

const PrivateRoute = () => {
  const userAuthData = useSelector(selectUserAuthData);

  if (userAuthData) {
    return (
      <div>
        <PrivateLayout>
          <Outlet />
        </PrivateLayout>
      </div>
    );
  }

  return <Navigate replace to="/signin" />;
};
export default PrivateRoute;
