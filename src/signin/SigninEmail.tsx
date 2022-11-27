import { Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

type signinEmailProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export default function SigninEmail({ email, setEmail }: signinEmailProps) {
  const { t } = useTranslation("auth");
  return (
    <div>
      <div className="title">{t("email")}</div>
      <div className="textfield">
        <TextField
          autoFocus
          variant="outlined"
          InputProps={{
            style: {
              backgroundColor: "#ffffff",
            },
          }}
          name="email"
          style={{ width: "100%" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
}
