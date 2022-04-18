import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAppSelector } from "../context/Hooks";
import { selectMessageData } from "../context/slices/MessageDataSlice";
import { selectProfileData } from "../context/slices/ProfileDataSlice";
import Inbox from "./Inbox";
import DeleteChatAlert from "./DeleteChatAlert";
import getFormattedDate from "../reusableFunction/getFormattedDate";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

export default function Messages() {
  const chats = useAppSelector(selectMessageData);
  const user = useAppSelector(selectProfileData);
  const auth = getAuth();
  const navigate = useNavigate();

  const [checked, setChecked] = useState<string[]>([]);

  const handleToggle = (chatId: string) => () => {
    const currentIndex = checked.indexOf(chatId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(chatId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleEnterChat = (chatId: string) => {
    navigate(`/chat/${auth.currentUser!.displayName}/${chatId}`);
  };

  if (chats.length === 0) {
    return (
      <Inbox>
        <ListItem disablePadding>
          <ListItemButton
            role={undefined}
            dense
            style={{ paddingTop: "0px", paddingBottom: "0px" }}
          >
            <ListItemIcon>
              <Checkbox edge="start" tabIndex={-1} disableRipple />
            </ListItemIcon>
            <ListItemText
              primary={<div>No chats</div>}
              style={{ padding: "15px 0px", margin: "0px" }}
            />
          </ListItemButton>
        </ListItem>
      </Inbox>
    );
  }

  return (
    <div>
      <Inbox>
        {chats.map((chat, index) => {
          const labelId = `checkbox-list-label-${chat.chatId}`;
          const chatAtTheEnd = chat.messages[chat.messages.length - 1];
          const createdAt = getFormattedDate(chatAtTheEnd.createdAt!);

          return (
            <Fragment key={chat.chatId}>
              <ListItem disablePadding>
                <ListItemButton
                  role={undefined}
                  dense
                  style={
                    chat.status === "Not read yet"
                      ? {
                          paddingTop: "0px",
                          paddingBottom: "0px",
                        }
                      : {
                          paddingTop: "0px",
                          paddingBottom: "0px",
                          backgroundColor: "#e7e7e7",
                        }
                  }
                  selected={checked.indexOf(chat.chatId) !== -1}
                >
                  <ListItemIcon>
                    <Checkbox
                      onClick={handleToggle(chat.chatId)}
                      edge="start"
                      checked={checked.indexOf(chat.chatId) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      style={{ margin: 0 }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <div>
                        <div>
                          <div
                            style={
                              chat.status === "Not read yet"
                                ? { fontWeight: 500 }
                                : { fontWeight: 400 }
                            }
                          >
                            {chat.chatId}
                          </div>
                          <div className="latest-chat">
                            {chatAtTheEnd.writtenBy === user.numberPlate
                              ? "You: "
                              : `${chatAtTheEnd.writtenBy}: `}
                            {chatAtTheEnd.content}
                          </div>
                        </div>
                        <div style={{ color: "#797979" }}>{createdAt}</div>
                      </div>
                    }
                    onClick={() => handleEnterChat(chat.chatId)}
                    style={{ padding: "15px 0px", margin: "0px" }}
                  />
                </ListItemButton>
              </ListItem>
              {index !== chats.length - 1 && (
                <Divider variant="fullWidth" component="li" />
              )}
            </Fragment>
          );
        })}
      </Inbox>
      <DeleteChatAlert checked={checked} setChecked={setChecked} />
    </div>
  );
}
