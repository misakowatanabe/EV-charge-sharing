import { Dispatch, SetStateAction } from "react";
import { getAuth } from "firebase/auth";
import Button from "@mui/material/Button";
import { ENDPOINT } from "../Config";

type DeleteChatProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setChecked: Dispatch<SetStateAction<string[]>>;
};

export default function DeleteChat({ setOpen, setChecked }: DeleteChatProps) {
  const auth = getAuth();

  const handleDeleteChat = () => {
    console.log("delete chat");
    setOpen(false);
    setChecked([]);
  };

  return (
    <Button onClick={handleDeleteChat} autoFocus className="signout-button">
      Delete chat
    </Button>
  );
}
