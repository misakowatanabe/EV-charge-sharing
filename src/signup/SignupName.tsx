import { Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";

type signupNameProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
};

export default function SignupName({ name, setName }: signupNameProps) {
  return (
    <div>
      <div className="title">User Name</div>
      <div className="textfield">
        <TextField
          autoFocus
          variant="outlined"
          InputProps={{
            style: {
              backgroundColor: "#ffffff",
            },
          }}
          name="name"
          style={{ width: "100%" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  );
}
