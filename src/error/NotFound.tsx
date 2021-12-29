import { NavLink } from "react-router-dom";
import ErrorLayout from "../layout/ErrorLayout";

const NotFound = () => (
  <ErrorLayout>
    <h1>404 - Not Found :(</h1>
    <NavLink to="/signin">Go Home</NavLink>
  </ErrorLayout>
);

export default NotFound;
