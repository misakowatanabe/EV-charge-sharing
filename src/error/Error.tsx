import { NavLink } from "react-router-dom";
import ErrorLayout from "../layout/ErrorLayout";

const Error = () => (
  <ErrorLayout>
    <h1>Sorry, something went wrong :(</h1>
    <NavLink to="/signin">Go Home</NavLink>
  </ErrorLayout>
);

export default Error;
