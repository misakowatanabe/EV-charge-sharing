import { useState, useEffect, useRef } from "react";
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
import { format } from "date-fns";

export default function Chat() {
  let { userNP } = useParams();
  let { matchedNP } = useParams();

  const navigate = useNavigate();

  const allChatsRelatedToUser = useAppSelector(selectMessageData);

  const [chatCreatedAt, setChatCreatedAt] = useState("");
  const [messagesWithMatchedUser, setMessagesWithMatchedUser] = useState<
    JSX.Element[][]
  >([]);

  const [initialLoadingEnd, setInitialLoadingEnd] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (null !== messagesEndRef.current) {
      if (initialLoadingEnd) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        messagesEndRef.current.scrollIntoView();
      }
      setInitialLoadingEnd(true);
    }
  };
  useEffect(scrollToBottom, [messagesWithMatchedUser, initialLoadingEnd]);

  const getFormattedDate = (createdAt: number) => {
    const epocAWeekAgo = Date.now() - 604800000;
    const epocADayAgo = Date.now() - 86400000;
    var formatedCreatedAt;
    if (createdAt <= epocAWeekAgo) {
      formatedCreatedAt = format(new Date(createdAt), "MMMM do H:mma");
    } else {
      if (createdAt <= epocADayAgo) {
        formatedCreatedAt = format(new Date(createdAt), "eeee H:mma");
      } else {
        formatedCreatedAt = format(new Date(createdAt), "'Today' H:mma");
      }
    }
    return formatedCreatedAt;
  };

  useEffect(() => {
    const findChat = async () => {
      const foundChatWithMatchedNP = allChatsRelatedToUser.find(
        (chat) => chat.chatId === matchedNP
      );
      return await Promise.resolve(foundChatWithMatchedNP);
    };

    findChat().then((foundChatWithMatchedNP) => {
      if (foundChatWithMatchedNP !== undefined) {
        const createdAt = getFormattedDate(foundChatWithMatchedNP!.createdAt!);
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
            return (
              <div key={message.createdAt}>
                <Message
                  createdAt={getFormattedDate(message!.createdAt!)}
                  messageWrittenBy={message.writtenBy}
                  userNP={userNP}
                  messageContent={message.content}
                />
                <div ref={messagesEndRef} />
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
        <ChatCreatedAt>Chat created: {chatCreatedAt}</ChatCreatedAt>
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
