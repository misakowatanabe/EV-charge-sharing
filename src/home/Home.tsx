import { useState } from "react";
import Messages from "./Messages";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { ENDPOINT } from "../Config";

export default function Home() {
  const [number, setNumber] = useState("");
  const [responseData, setResponseData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (number !== "") {
      const numberPlateForSearch = { data: number.toUpperCase() };
      try {
        await fetch(`${ENDPOINT}/search`, {
          method: "POST",
          body: JSON.stringify(numberPlateForSearch),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }).then((res) => {
          res.json().then((data) => {
            setResponseData(data.message);
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        setNumber("");
      }
    } else {
      setErrorMessage("Please fill out this field");
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
              placeholder="Search licence number. e.g. AAA111"
              InputProps={{
                style: {
                  backgroundColor: "#ffffff",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <Button type="submit" className="search-button">
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
                setErrorMessage("");
                setResponseData("");
              }}
              error={error}
              helperText={errorMessage ? errorMessage : " "}
            />
          </div>
        </form>
        <div style={{ textAlign: "center", fontSize: "20px" }}>
          {responseData}
        </div>
        <Messages />
      </Box>
    </div>
  );
}
