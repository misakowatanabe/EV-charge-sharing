import { FC } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

type sendMessageButtonProps = {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const SendMessageButton: FC<sendMessageButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <div style={{ margin: "20px 0px 0px 0px" }}>
      <Button
        onClick={onClick}
        variant="contained"
        style={{
          backgroundColor: "#1976d2",
          padding: "10px 17px 10px 28px",
          borderRadius: "25px",
          boxShadow: "none",
        }}
      >
        {children}
        <SendIcon sx={{ fontSize: "20px", margin: "0px 5px 0px 11px" }} />
      </Button>
    </div>
  );
};
export default SendMessageButton;
