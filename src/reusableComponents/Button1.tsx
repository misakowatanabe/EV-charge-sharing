import { FC } from "react";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type button1Props = {
  disabled: boolean;
};

const Button1: FC<button1Props> = ({ children, disabled }) => {
  return (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <Button
        type="submit"
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
        <KeyboardArrowRightIcon />
      </Button>
    </div>
  );
};
export default Button1;
