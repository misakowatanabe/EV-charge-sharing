import { FC } from "react";

const ErrorLayout: FC = ({ children }) => {
  return (
    <div
      className="Login"
      style={{
        textAlign: "center",
        margin: "100px auto 100px auto",
        color: "#383838",
      }}
    >
      {children}
    </div>
  );
};
export default ErrorLayout;
