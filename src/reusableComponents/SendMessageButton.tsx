import { FC } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

type sendMessageButtonProps = {
  disabled?: boolean;
};

const SendMessageButton: FC<sendMessageButtonProps> = ({
  children,
  disabled,
}) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled}
      style={
        disabled
          ? { padding: "11px 14px 11px 25px", borderRadius: "25px" }
          : {
              backgroundColor: "#1976d2",
              padding: "11px 14px 11px 25px",
              borderRadius: "25px",
            }
      }
    >
      {children}
      <SendIcon sx={{ fontSize: "20px", margin: "0px 5px 0px 11px" }} />
    </Button>
  );
};
export default SendMessageButton;
