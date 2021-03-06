import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../context/Hooks";
import { selectMessageData } from "../context/slices/MessageDataSlice";
import { useAppDispatch } from "../context/Hooks";
import { updateSnackbarData } from "../context/slices/SnackbarDataSlice";
import SendMessageButton from "../reusableComponents/SendMessageButton";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import ChatCreatedAt from "./ChatCreatedAt";
import Message from "./Message";
import { callApiCreate, callApiOpenChat } from "../reusableFunction/callApi";
import getFormattedDate from "../reusableFunction/getFormattedDate";
import { nanoid } from "nanoid";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function Chat() {
  let { userNP } = useParams();
  let { matchedNP } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const allChatsRelatedToUser = useAppSelector(selectMessageData);

  const [chatCreatedAt, setChatCreatedAt] = useState("");
  const [chatStatus, setChatStatus] = useState("");
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

      if (chatWithMatchedNP[0]) {
        setChatStatus(chatWithMatchedNP[0].status);
      }

      if (chatStatus === "Not read yet") {
        const data = {
          userNP: userNP,
          matchedNP: matchedNP,
          status: "Read",
        };

        const result = await callApiOpenChat(data);
        if (result === false) {
          navigate("/error");
        }
      }

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
  }, [allChatsRelatedToUser, matchedNP, userNP, navigate, chatStatus]);

  const [messageLetters, setMessageLetters] = useState("");
  const data = {
    userNP: userNP,
    matchedNP: matchedNP,
    messageId: nanoid(8),
    message: messageLetters,
    createdAt: Date.now(),
    status: "Not read yet",
  };

  function validateForm() {
    return messageLetters.length > 0;
  }

  const handleMessageSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setMessageLetters("");

    const result = await callApiCreate(data);
    if (result === false) {
      dispatch(
        updateSnackbarData({
          snackState: true,
          severity: "error",
          message: `Error occured, please try again`,
        })
      );
    }
  };

  return (
    <div style={{ marginBottom: "80px" }}>
      <TopBar>Chatting with {matchedNP}</TopBar>
      {chatCreatedAt && (
        <ChatCreatedAt>Chat created: {chatCreatedAt}</ChatCreatedAt>
      )}
      <div>{messagesWithMatchedUser}</div>
      {chatStatus === "Deleted" && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          The chat has been deleted.
        </div>
      )}
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
                <SendMessageButton
                  disabled={!validateForm() || chatStatus === "Deleted"}
                >
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
