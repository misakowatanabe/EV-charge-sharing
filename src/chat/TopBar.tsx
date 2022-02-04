import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const TopBar: FC = ({ children }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ marginTop: { xs: "56px", sm: "63px" }, background: "#ffffff" }}
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

export default TopBar;
