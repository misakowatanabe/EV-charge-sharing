import { FC } from "react";
import { useState } from "react";
import DrawerContents from "./DrawerContents";
import Bar from "./Bar";
import Drawer from "./Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

const PrivateLayout: FC = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <DrawerContents />
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Bar handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawer={drawer}
          props={props}
        />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div>{props.children}</div>
      </Box>
    </Box>
  );
};

export default PrivateLayout;
