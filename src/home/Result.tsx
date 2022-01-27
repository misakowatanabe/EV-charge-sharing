import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";
import { getAuth } from "firebase/auth";
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
  setNumber: Dispatch<SetStateAction<string>>;
  matchedNP: string;
};

export default function Result({
  setOpen,
  open,
  responseData,
  setNumber,
  matchedNP,
}: resultProps) {
  const auth = getAuth();
  var userNP = auth.currentUser!.displayName!;

  const handleCancel = () => {
    setOpen(false);
    setNumber("");
  };

  const handleCreateChat = () => {
    setOpen(false);
    setNumber("");
  };

  var button;
  if (responseData.includes("was found")) {
    button = (
      <NavLink to={`/chat/${userNP}/${matchedNP}`}>
        <SendMessageButton onClick={handleCreateChat}>
          Send Message
        </SendMessageButton>
      </NavLink>
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
