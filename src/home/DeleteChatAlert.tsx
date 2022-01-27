import { useState, Dispatch, SetStateAction } from "react";
import DeleteChat from "./DeleteChat";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

type DeleteChatAlertProps = {
  checked: string[];
  setChecked: Dispatch<SetStateAction<string[]>>;
};

export default function DeleteChatAlert({
  checked,
  setChecked,
}: DeleteChatAlertProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  var checkedChat = checked.map((item) => {
    return <li key={item}>{item}</li>;
  });

  return (
    <div>
      <ListItem
        button
        onClick={handleClickOpen}
        style={{ padding: "15px 12px" }}
        disabled={!checked[0]}
      >
        <ListItemIcon style={{ minWidth: "40px" }}>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText
          primary={<div style={{ fontSize: "0.875rem" }}>Delete Chat</div>}
        />
      </ListItem>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" component="div">
            <div>Are you sure you delete the chat below?</div>
            <div>
              You will delete all messages inside the chat once you delete it.
            </div>
            <ul>{checkedChat}</ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <DeleteChat setOpen={setOpen} setChecked={setChecked} />
        </DialogActions>
      </Dialog>
    </div>
  );
}
