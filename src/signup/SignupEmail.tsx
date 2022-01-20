import { Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";

type signupEmailProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export default function SignupEmail({ email, setEmail }: signupEmailProps) {
  return (
    <div>
      <div className="title">Email</div>
      <div className="textfield">
        <TextField
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
