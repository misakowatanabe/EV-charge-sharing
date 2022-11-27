import { useState, Dispatch, SetStateAction } from "react";
import PasswordToggleButton from "../reusableComponents/PasswordToggleButton";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

type signupPasswordProps = {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
};

export default function SignupPassword({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: signupPasswordProps) {
  const { t } = useTranslation("auth");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

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
      <div className="password-text-container">
        <div>{t("confirmPassword")}</div>
        <PasswordToggleButton
          passwordShown={confirmPasswordShown}
          setPasswordShown={setConfirmPasswordShown}
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
          name="confirmPassword"
          type={confirmPasswordShown ? "text" : "password"}
          style={{ width: "100%" }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    </div>
  );
}
