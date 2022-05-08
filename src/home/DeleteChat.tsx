import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../context/Hooks";
import { updateSnackbarData } from "../context/slices/SnackbarDataSlice";
import Button from "@mui/material/Button";
import { ENDPOINT } from "../Config";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteChat = () => {
    checked.map((matchedNP) => {
      const messageData = {
        userNP: userNP,
        matchedNP: matchedNP,
      };

      try {
        fetch(`${ENDPOINT}/deleteChat`, {
          method: "DELETE",
          body: JSON.stringify(messageData),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }).then((res) => {
          res.json().then((res) => {
            if (res.message === 200) {
              dispatch(
                updateSnackbarData({
                  snackState: true,
                  severity: "success",
                  message: "The chat has been deleted",
                })
              );
            } else if (res.message === 500) {
              dispatch(
                updateSnackbarData({
                  snackState: true,
                  severity: "error",
                  message: "Error occurred, could not delete the chat",
                })
              );
              navigate("/error");
            }
          });
        });
      } catch (error) {
        navigate("/error");
      }

      return null;
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
