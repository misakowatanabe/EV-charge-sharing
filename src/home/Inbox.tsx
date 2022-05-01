import { FC } from "react";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";

const Inbox: FC = ({ children }) => {
  return (
    <div>
      <Box
        sx={{
          justifyContent: "center",
          maxWidth: "360px",
          margin: "auto",
        }}
      >
        <Paper>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              borderRadius: "8px",
            }}
          >
            {children}
          </List>
        </Paper>
      </Box>
    </div>
  );
};
export default Inbox;
