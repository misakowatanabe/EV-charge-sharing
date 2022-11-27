import { useState } from "react";
import Signout from "./Signout";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";

export default function SignoutAlert() {
  const { t } = useTranslation(["auth", "common"]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem
        button
        onClick={handleClickOpen}
        style={{ padding: "10px 30px" }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm sign out"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("SignoutConfirm")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>
            {t("cancel", { ns: "common" })}
          </Button>
          <Signout />
        </DialogActions>
      </Dialog>
    </div>
  );
}
