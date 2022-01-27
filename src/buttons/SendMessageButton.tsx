import { FC } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

type sendMessageButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  disabled?: boolean;
};

const SendMessageButton: FC<sendMessageButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <div style={{ margin: "20px 0px 0px 0px" }}>
      <Button
        type="submit"
        onClick={onClick}
        variant="contained"
        disabled={disabled}
        style={
          disabled
            ? { padding: "10px 14px 10px 25px", borderRadius: "25px" }
            : {
                backgroundColor: "#1976d2",
                padding: "10px 14px 10px 25px",
                borderRadius: "25px",
              }
        }
      >
        {children}
        <SendIcon sx={{ fontSize: "20px", margin: "0px 5px 0px 11px" }} />
      </Button>
    </div>
  );
};
export default SendMessageButton;
