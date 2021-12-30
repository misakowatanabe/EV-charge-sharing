import { useState } from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";

export default function Home() {
  const [number, setNumber] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className="textfield">
            <TextField
              variant="outlined"
              name="search"
              style={{ width: "100%" }}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </form>
      </Box>
    </div>
  );
}
