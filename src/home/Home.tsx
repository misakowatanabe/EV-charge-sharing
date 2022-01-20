import { useState } from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

export default function Home() {
  const [number, setNumber] = useState("");
  const [responseData, setResponseData] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (number !== "") {
      console.log(number.toUpperCase());
    } else {
      setResponseData("Please fill out this field");
      setError(true);
    }
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
              placeholder="Search licence number"
              InputProps={{
                style: {
                  backgroundColor: "#ffffff",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <Button type="submit" className="serach-button">
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
              name="search"
              style={{ width: "100%" }}
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
                setError(false);
                setResponseData("");
              }}
              error={error}
              helperText={responseData}
            />
          </div>
        </form>
      </Box>
    </div>
  );
}
