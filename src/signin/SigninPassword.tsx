import { useState, Dispatch, SetStateAction } from "react";
import PasswordToggleButton from "../reusableComponents/PasswordToggleButton";
import TextField from "@mui/material/TextField";

type signinPasswordProps = {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};

export default function SigninPassword({
  password,
  setPassword,
}: signinPasswordProps) {
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <div>
      <div className="password-text-container">
        <div>Password</div>
        <PasswordToggleButton
          passwordShown={passwordShown}
          setPasswordShown={setPasswordShown}
        />
      </div>
      <div className="textfield">
        <TextField
          variant="outlined"
          InputProps={{
            style: {
              backgroundColor: "#ffffff",
            },
          }}
          name="password"
          type={passwordShown ? "text" : "password"}
          style={{ width: "100%" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
}
