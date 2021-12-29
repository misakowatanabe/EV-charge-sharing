import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import SignoutDialog from "../signout/SignoutDialog";

export default function DrawerContents() {
  const items = [
    { text: "Home", link: "/", icon: <HomeIcon /> },
    { text: "Account", link: "/account", icon: <PersonIcon /> },
    { text: "Setting", link: "/setting", icon: <SettingsIcon /> },
  ];

  return (
     <List>
      {items.map(({ text, link, icon }) => (
        <NavLink to={`${link}`} key={`${text}`}>
          <ListItem button style={{ padding: "10px 30px" }}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </NavLink>
      ))}
      <SignoutDialog />
    </List>
  );
}
