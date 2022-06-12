import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserAuthData } from "../context/slices/UserAuthDataSlice";
import { selectLoadingData } from "../context/slices/LoadingDataSlice";
import PrivateLayout from "../layout/PrivateLayout";
import CircularProgress from "@mui/material/CircularProgress";

const PrivateRoute = () => {
  const userAuth = useSelector(selectUserAuthData);
  const loading = useSelector(selectLoadingData);

  if (loading === "loading") {
    return (
      <PrivateLayout>
        <div
          style={{ width: "100%", textAlign: "center", margin: "100px auto" }}
        >
          <CircularProgress />
        </div>
      </PrivateLayout>
    );
  }

  if (userAuth) {
    return (
      <PrivateLayout>
        <Outlet />
      </PrivateLayout>
    );
  }

  return <Navigate replace to="/signin" />;
};
export default PrivateRoute;
