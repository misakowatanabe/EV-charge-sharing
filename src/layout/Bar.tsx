import { NavLink } from "react-router-dom";
import SimpleProfile from "./SimpleProfile";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type barProps = {
  handleDrawerToggle: () => void;
};

export default function Bar({ handleDrawerToggle }: barProps) {
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <NavLink to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "#ffffff" }}
            >
              EV Charge Sharing
            </Typography>
          </NavLink>
          <SimpleProfile />
        </Toolbar>
      </AppBar>
    </div>
  );
}
