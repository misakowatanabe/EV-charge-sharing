import { Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";

type signupNumberPlateProps = {
  numberPlate: string;
  setNumberPlate: Dispatch<SetStateAction<string>>;
};

export default function SignupNumberPlate({
  numberPlate,
  setNumberPlate,
}: signupNumberPlateProps) {
  return (
    <div>
      <div className="title">Number Plate</div>
      <div className="textfield">
        <TextField
          variant="outlined"
          InputProps={{
            style: {
              backgroundColor: "#ffffff",
            },
          }}
          name="name"
          style={{ width: "100%" }}
          value={numberPlate}
          onChange={(e) => setNumberPlate(e.target.value)}
        />
      </div>
    </div>
  );
}
