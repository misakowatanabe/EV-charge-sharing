import { FC } from "react";

const ChatCreatedAt: FC = ({ children }) => {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "0.875rem",
        margin: "70px 0px 50px 0px",
      }}
    >
      {children}
    </div>
  );
};

export default ChatCreatedAt;
