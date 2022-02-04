import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const BottomBar: FC = ({ children }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        background: "#ffffff",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            marginLeft: { xs: "0px", sm: "240px" },
            color: "#111111",
            fontWeight: 400,
            fontSize: "1rem",
          }}
        >
          {children}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default BottomBar;
