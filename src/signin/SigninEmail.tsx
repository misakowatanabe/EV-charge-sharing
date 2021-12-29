import { Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";

type signinEmailProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export default function SigninEmail({ email, setEmail }: signinEmailProps) {
  return (
    <div>
      <div className="title">Email</div>
      <div className="textfield-title">
        <TextField
          autoFocus
          variant="outlined"
          name="email"
          style={{ width: "100%" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
}
