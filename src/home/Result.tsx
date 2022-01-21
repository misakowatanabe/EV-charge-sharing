import { Dispatch, SetStateAction } from "react";
import SendMessageButton from "../buttons/SendMessageButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type resultProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  responseData: string;
};

export default function Result({ setOpen, open, responseData }: resultProps) {
  const handleCancel = () => {
    setOpen(false);
  };

  const handleSendMessage = () => {
    setOpen(false);
  };

  var button;
  if (responseData.includes("was found")) {
    button = (
      <SendMessageButton onClick={handleSendMessage}>
        Send Message
      </SendMessageButton>
    );
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Result"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {responseData}
          </DialogContentText>
          {button}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>back</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
