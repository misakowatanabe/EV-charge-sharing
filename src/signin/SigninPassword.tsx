import { useState, Dispatch, SetStateAction } from "react";
import PasswordToggleButton from "../reusableComponents/PasswordToggleButton";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

type signinPasswordProps = {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};

export default function SigninPassword({
  password,
  setPassword,
}: signinPasswordProps) {
  const { t } = useTranslation("auth");
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <div>
      <div className="password-text-container">
        <div>{t("password")}</div>
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
