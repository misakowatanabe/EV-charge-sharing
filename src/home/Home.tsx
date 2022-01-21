import Search from "./Search";
import Messages from "./Messages";
import { Box } from "@mui/system";

export default function Home() {
  return (
    <div>
      <div style={{ textAlign: "center" }}>Search</div>
      <Box
        sx={{
          justifyContent: "center",
          maxWidth: "360px",
          margin: "auto",
        }}
      >
        <Search />
        <Messages />
      </Box>
    </div>
  );
}
