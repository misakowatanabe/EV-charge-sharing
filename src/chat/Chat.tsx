import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../context/Hooks";
import { selectMessageData } from "../context/slices/MessageDataSlice";
import SendMessageButton from "../buttons/SendMessageButton";
import { nanoid } from "nanoid";
import { ENDPOINT } from "../Config";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

export default function Chat() {
  let { userNP } = useParams();
  let { matchedNP } = useParams();

  const navigate = useNavigate();

  const allChatsRelatedToUser = useAppSelector(selectMessageData);

  const [chatCreatedAt, setChatCreatedAt] = useState("");
  const [messagesWithMatchedUser, setMessagesWithMatchedUser] = useState<
    JSX.Element[][]
  >([]);

  useEffect(() => {
    if (allChatsRelatedToUser[0]) {
      const chatWithMatchedNP = allChatsRelatedToUser.find(
        (chat) => chat.chatId === matchedNP
      );
      var createdAt = new Date(chatWithMatchedNP!.createdAt).toLocaleString(
        "en-GB",
        {
          hour12: false,
        }
      );
      setChatCreatedAt(createdAt);
    }

    const chatWithMatchedNP = allChatsRelatedToUser.filter(
      (chat) => chat.chatId === matchedNP
    );

    const messagesContents = chatWithMatchedNP.map((messagesData) =>
      messagesData.messages.map((message) => {
        return (
          <div key={message.createdAt}>
            <Paper
              sx={{
                margin: { xs: "10px 0px", sm: "10px 0px" },
                padding: "10px 20px",
                height: "auto",
                width: { xs: "100%", sm: "350px" },
                minWidth: { sm: "292px" },
                position: "relative",
              }}
            >
              {message.content}
            </Paper>
          </div>
        );
      })
    );
    setMessagesWithMatchedUser(messagesContents);
  }, [allChatsRelatedToUser, matchedNP]);

  const [messageLetters, setMessageLetters] = useState("");
  const messageData = {
    userNP: userNP,
    matchedNP: matchedNP,
    messageId: nanoid(8),
    message: messageLetters,
    createdAt: Date.now(),
  };

  function validateForm() {
    return messageLetters.length > 0;
  }

  const handleMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageLetters("");
    try {
      fetch(`${ENDPOINT}/create`, {
        method: "POST",
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
  };

  return (
    <div>
      <div>Chat</div>
      <div>{userNP}</div>
      <div>{matchedNP}</div>
      <div style={{ textAlign: "center", fontSize: "0.875rem" }}>
        Created at {chatCreatedAt}
      </div>
      <div>{messagesWithMatchedUser}</div>
      <form noValidate autoComplete="off" onSubmit={handleMessageSubmit}>
        <div className="textfield-body">
          <TextField
            placeholder="Type here ..."
            variant="outlined"
            InputProps={{
              style: {
                backgroundColor: "#ffffff",
              },
            }}
            multiline
            rows={4}
            name="letter"
            style={{ width: "100%" }}
            value={messageLetters || ""}
            onChange={(e) => setMessageLetters(e.target.value)}
          />
          <SendMessageButton disabled={!validateForm()}>Send</SendMessageButton>
        </div>
      </form>
    </div>
  );
}
