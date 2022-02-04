import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../context/Hooks";
import { selectMessageData } from "../context/slices/MessageDataSlice";
import SendMessageButton from "../buttons/SendMessageButton";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import ChatCreatedAt from "./ChatCreatedAt";
import Message from "./Message";
import { nanoid } from "nanoid";
import { ENDPOINT } from "../Config";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

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
    const findChat = async () => {
      const foundChatWithMatchedNP = allChatsRelatedToUser.find(
        (chat) => chat.chatId === matchedNP
      );
      return await Promise.resolve(foundChatWithMatchedNP);
    };

    findChat().then((foundChatWithMatchedNP) => {
      if (foundChatWithMatchedNP !== undefined) {
        var createdAt = new Date(
          foundChatWithMatchedNP!.createdAt!
        ).toLocaleString("en-GB", {
          hour12: false,
        });
        setChatCreatedAt(createdAt);
      }
    });

    const filterChat = async () => {
      const chatWithMatchedNP = allChatsRelatedToUser.filter(
        (chat) => chat.chatId === matchedNP
      );
      return await Promise.resolve(chatWithMatchedNP);
    };

    filterChat().then((chatWithMatchedNP) => {
      if (chatWithMatchedNP) {
        const messagesContents = chatWithMatchedNP.map((messagesData) =>
          messagesData.messages.map((message) => {
            const createdAt = new Date(message!.createdAt!).toLocaleString(
              "en-GB",
              {
                hour12: false,
              }
            );
            return (
              <div key={message.createdAt}>
                <Message
                  createdAt={createdAt}
                  messageWrittenBy={message.writtenBy}
                  userNP={userNP}
                  messageContent={message.content}
                />
              </div>
            );
          })
        );
        setMessagesWithMatchedUser(messagesContents);
      }
    });
  }, [allChatsRelatedToUser, matchedNP, userNP]);

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
    <div style={{ marginBottom: "80px" }}>
      <TopBar>Chatting with {matchedNP}</TopBar>
      {chatCreatedAt && (
        <ChatCreatedAt>Created at {chatCreatedAt}</ChatCreatedAt>
      )}
      <div>{messagesWithMatchedUser}</div>
      <BottomBar>
        <form noValidate autoComplete="off" onSubmit={handleMessageSubmit}>
          <div
            className="textfield-body"
            style={{ margin: "10px 0px 10px 0px" }}
          >
            <Grid
              container
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Grid item xs>
                <TextField
                  placeholder="Type message"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    style: {
                      backgroundColor: "#ffffff",
                      borderRadius: "10px",
                    },
                  }}
                  multiline
                  rows={2}
                  name="letter"
                  style={{ width: "100%" }}
                  value={messageLetters || ""}
                  onChange={(e) => setMessageLetters(e.target.value)}
                />
              </Grid>
              <Grid item xs="auto" style={{ marginLeft: "15px" }}>
                <SendMessageButton disabled={!validateForm()}>
                  Send
                </SendMessageButton>
              </Grid>
            </Grid>
          </div>
        </form>
      </BottomBar>
    </div>
  );
}
