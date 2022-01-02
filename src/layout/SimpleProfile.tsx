import { useAppSelector } from "../context/Hooks";
import { selectProfileData } from "../context/slices/ProfileDataSlice";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";

export default function SimpleProfile() {
  const profile = useAppSelector(selectProfileData);
  var name = profile.name;

  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{
          color: "#ffffff",
          fontWeight: 400,
          margin: "0 10px 0 auto",
          display: { xs: "none", sm: "block" },
        }}
      >
        {name}
      </Typography>
      <Avatar
        alt="Avatar"
        sx={{
          width: 40,
          height: 40,
          margin: { xs: "0 0 0 auto", sm: "0" },
        }}
      >
        <PersonIcon style={{ fontSize: "30px" }} />
      </Avatar>
    </>
  );
}
