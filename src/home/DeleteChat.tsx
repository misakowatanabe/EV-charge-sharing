import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
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
            } else if (res.message === 500) {
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
