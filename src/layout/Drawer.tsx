import { FC, ReactNode } from "react";
import CommonDrawer from "@mui/material/Drawer";

type drawerProps = {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
  drawer: JSX.Element;
  props: { window?: () => Window; children?: ReactNode; };
};

const Drawer: FC<drawerProps> = ({
  mobileOpen,
  handleDrawerToggle,
  drawer,
  props,
}) => {
  const drawerWidth = 240;

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <CommonDrawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </CommonDrawer>
      <CommonDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </CommonDrawer>
    </div>
  );
};
export default Drawer;
