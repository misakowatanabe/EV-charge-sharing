import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { selectMessageData } from "../context/slices/MessageDataSlice";
import { useAppDispatch, useAppSelector } from "../context/Hooks";
import { updateSnackbarData } from "../context/slices/SnackbarDataSlice";
import { callApiDeleteCollection } from "../reusableFunction/callApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Setting() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessageData);
  const test = messages.map((item) => item.chatId);
  console.log(test);

  const handleDeleteAccount = async () => {
    const userUid = auth.currentUser!.uid;
    const userNP = auth.currentUser!.displayName;
    if (userNP != null) {
      console.log(userNP);
      const data = {
        userUid: userUid,
        userNP: userNP,
        // matchedNP: matchedNP,
      };

      const result = await callApiDeleteCollection(data);
      console.log(result);
      if (result === false) {
        dispatch(
          updateSnackbarData({
            snackState: true,
            severity: "error",
            message: "Error occurred, could not delete collection",
          })
        );
      } else {
        dispatch(
          updateSnackbarData({
            snackState: true,
            severity: "success",
            message: "The chat has been deleted",
          })
        );
      }
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} autoFocus className="signout-button">
        Delete account
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm deleting account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you delete account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteAccount}
            autoFocus
            className="signout-button"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
