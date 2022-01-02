import { NavLink } from "react-router-dom";
import { useAppSelector } from "../context/Hooks";
import { selectProfileData } from "../context/slices/ProfileDataSlice";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
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
  const profile = useAppSelector(selectProfileData);
  var name = profile.name;

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
              style={{ color: "#ffffff" }}
            >
              EV Charge Sharing
            </Typography>
          </NavLink>
          <Typography
            variant="h6"
            component="div"
            style={{ color: "#ffffff", fontWeight: 400, margin: "0 10px 0 auto" }}
          >
            {name}
          </Typography>
          <Avatar alt="Avatar" sx={{ width: 40, height: 40 }}>
            <PersonIcon style={{ fontSize: "30px" }} />
          </Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
