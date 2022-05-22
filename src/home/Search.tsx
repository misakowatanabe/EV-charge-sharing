import { useState } from "react";
import { getAuth } from "firebase/auth";
import Result from "./Result";
import { callApiGet } from "../reusableFunction/callApi";
import { useAppDispatch } from "../context/Hooks";
import { updateSnackbarData } from "../context/slices/SnackbarDataSlice";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function Search() {
  const [number, setNumber] = useState("");
  const [responseData, setResponseData] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const auth = getAuth();
  const dispatch = useAppDispatch();

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNumber("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (number === "") {
      setErrorMessage("Please fill out this field");
      setError(true);
    } else if (number.toUpperCase() === auth.currentUser!.displayName) {
      setErrorMessage("Oops, that's yours");
      setError(true);
    } else {
      let result = await callApiGet(`${number.toUpperCase()}`);
      if (result === `Error occured, please try again`) {
        dispatch(
          updateSnackbarData({
            snackState: true,
            severity: "error",
            message: result,
          })
        );
      } else {
        setResponseData(result);
        setOpen(true);
      }
    }
  };

  return (
    <div>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
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
              endAdornment: (
                <InputAdornment position="end">
                  {number !== "" && (
                    <Button type="reset" className="search-button">
                      <CloseIcon />
                    </Button>
                  )}
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
      <Result
        setOpen={setOpen}
        open={open}
        responseData={responseData}
        setNumber={setNumber}
        matchedNP={number.toUpperCase()}
      />
    </div>
  );
}
