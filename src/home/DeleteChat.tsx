import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../context/Hooks";
import { updateSnackbarData } from "../context/slices/SnackbarDataSlice";
import { callApiDeleteChat } from "../reusableFunction/callApi";
import Button from "@mui/material/Button";

type DeleteChatProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setChecked: Dispatch<SetStateAction<string[]>>;
  checked: string[];
  userNP: string;
};

export default function DeleteChat({
  setOpen,
  setChecked,
  checked,
  userNP,
}: DeleteChatProps) {
  const dispatch = useAppDispatch();

  const handleDeleteChat = () => {
    checked.map(async (matchedNP) => {
      const data = {
        userNP: userNP,
        matchedNP: matchedNP,
      };

      const result = await callApiDeleteChat(data);
      if (result === false) {
        dispatch(
          updateSnackbarData({
            snackState: true,
            severity: "error",
            message: "Error occurred, could not delete the chat",
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
      return;
    });

    setOpen(false);
    setChecked([]);
  };

  return (
    <Button onClick={handleDeleteChat} autoFocus className="signout-button">
      Delete chat
    </Button>
  );
}
