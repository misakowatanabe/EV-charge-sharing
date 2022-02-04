import Paper from "@mui/material/Paper";

type messageProps = {
  createdAt: string;
  messageWrittenBy: string | undefined;
  userNP: string | undefined;
  messageContent: string | undefined;
};

const Message = ({
  createdAt,
  messageWrittenBy,
  userNP,
  messageContent,
}: messageProps) => {
  return (
    <Paper
      sx={
        messageWrittenBy === userNP
          ? {
              margin: "0px 0px 40px auto",
              padding: "10px 20px",
              height: "auto",
              width: "fit-content",
              maxWidth: "70%",
              whiteSpace: "pre-wrap",
            }
          : {
              margin: "0px auto 40px 0px",
              padding: "10px 20px",
              height: "auto",
              width: "fit-content",
              maxWidth: "70%",
              whiteSpace: "pre-wrap",
            }
      }
    >
      <div
        style={{
          fontSize: "0.875rem",
          textAlign: "left",
          margin: "-35px 0px 0px -18px",
        }}
      >
        {createdAt}
      </div>
      <div style={{ marginTop: "15px" }}>{messageContent}</div>
    </Paper>
  );
};

export default Message;
