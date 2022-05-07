import Search from "./Search";
import Messages from "./Messages";
import { Box } from "@mui/system";

export default function Home() {
  return (
    <Box
      sx={{
        justifyContent: "center",
        maxWidth: "360px",
        margin: "100px auto auto auto",
      }}
    >
      <Search />
      <Messages />
    </Box>
  );
}
