import { useState, Dispatch, SetStateAction } from "react";
import DeleteChat from "./DeleteChat";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";

type DeleteChatAlertProps = {
  checked: string[];
  setChecked: Dispatch<SetStateAction<string[]>>;
  userNP: string;
};

export default function DeleteChatAlert({
  checked,
  setChecked,
  userNP,
}: DeleteChatAlertProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="text"
        sx={{
          textTransform: "none",
          px: "16px",
          borderRadius: "18px",
          "&:hover": { borderRadius: "18px" },
        }}
        onClick={handleClickOpen}
        disabled={!checked[0]}
        startIcon={<DeleteIcon />}
      >
        Delete Chat
      </Button>
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
            <ul>
              {checked.map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <DeleteChat
            setOpen={setOpen}
            setChecked={setChecked}
            checked={checked}
            userNP={userNP}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
